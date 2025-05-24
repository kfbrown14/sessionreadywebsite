import { useState, useEffect, useCallback, memo, lazy, Suspense, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from '../utils/performance-light';
import { motion, AnimatePresence } from 'framer-motion';
import { useLiveAPIContext } from '../contexts/LiveAPIContext';
import { useUI, useUser, useClientPersonaStore } from '../lib/state';
import ErrorScreen from '../components/demo/ErrorSreen';
import ControlTray from '../components/console/control-tray/ControlTray';
import PracticeErrorBoundary from '../components/PracticeErrorBoundary';
import type { ClientPersona } from '../lib/presets/agents';
import type { 
  PracticeHeaderProps, 
  PersonaButtonProps, 
  ClientSelectorModalProps, 
  UsePracticeLogicReturn 
} from '../types/practice.types';

// Lazy load heavy components
const KeynoteCompanion = lazy(() => import('../components/demo/keynote-companion/KeynoteCompanion'));
const UserSettings = lazy(() => import('../components/UserSettings'));
const AgentEdit = lazy(() => import('../components/AgentEdit'));

// Extracted header component
const PracticeHeader = memo<PracticeHeaderProps>(({ onNavigateHome, onOpenSettings }) => (
  <motion.header 
    className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-sage-light shadow-soft"
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <motion.button
        onClick={onNavigateHome}
        className="font-primary text-sage-dark hover:text-sage flex items-center gap-2 transition-colors rounded-full px-3 py-2 hover:bg-sage-light/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Navigate back to home"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline font-medium">Back to Home</span>
      </motion.button>
      
              <h1 className="font-nunito text-xl md:text-2xl font-bold text-earth-dark">Practice Session</h1>
      
      <motion.button
        onClick={onOpenSettings}
        className="font-primary text-sage-dark hover:text-sage transition-colors rounded-full px-4 py-2 hover:bg-sage-light/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open settings"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </motion.button>
    </div>
  </motion.header>
));

// Extracted persona button component
const PersonaButton = memo<PersonaButtonProps>(({ persona, isSelected, onSelect }) => (
  <motion.button
    onClick={onSelect}
    className={`p-6 rounded-2xl border-2 text-left transition-all shadow-soft hover:shadow-medium ${
      isSelected
        ? 'border-sage bg-sage-light/30'
        : 'border-lavender-light hover:border-lavender bg-white'
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    aria-label={`Select ${persona.name} persona`}
    aria-pressed={isSelected}
  >
    <div className="flex items-start gap-4">
      {/* Avatar - either custom image or colored circle */}
      {persona.avatar ? (
        <img 
          src={persona.avatar}
          alt={`${persona.name} avatar`}
          className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
        />
      ) : (
      <div 
        className="w-12 h-12 rounded-full flex-shrink-0"
        style={{ backgroundColor: persona.bodyColor + '40' }}
      />
      )}
      <div className="flex-1">
        <h3 className="font-nunito text-lg font-semibold text-earth-dark mb-2">{persona.name}</h3>
        {/* Show description if available, otherwise fall back to personality */}
        <p className="font-primary text-sm text-earth line-clamp-3">
          {persona.description || persona.personality}
        </p>
      </div>
    </div>
  </motion.button>
));

// Extracted client selector modal with search functionality
const ClientSelectorModal = memo<ClientSelectorModalProps>(({ 
  isOpen, 
  onClose, 
  currentPersona, 
  samplePersonas, 
  onSelectPersona 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSelectedBefore, setHasSelectedBefore] = useState(false);

  // Create debounced search handler
  const debouncedSearch = useMemo(
    () => debounce((term: string) => {
      setSearchTerm(term);
      setIsSearching(false);
    }, 300),
    []
  );

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsSearching(true);
    debouncedSearch(value);
  }, [debouncedSearch]);

  // Filter personas based on search
  const filteredPersonas = useMemo(() => {
    if (!searchTerm) return samplePersonas;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return samplePersonas.filter(persona => 
      persona.name.toLowerCase().includes(lowerSearchTerm) ||
      persona.personality.toLowerCase().includes(lowerSearchTerm) ||
      (persona.description && persona.description.toLowerCase().includes(lowerSearchTerm))
    );
  }, [samplePersonas, searchTerm]);

  const handleSelect = useCallback((persona: ClientPersona) => {
    onSelectPersona(persona);
    setHasSelectedBefore(true);
    onClose();
  }, [onSelectPersona, onClose]);

  // Clean up debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Track if user has made a selection before
  useEffect(() => {
    if (currentPersona && currentPersona.id) {
      setHasSelectedBefore(true);
    }
  }, [currentPersona]);

  // Early return AFTER all hooks
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-40 bg-storm/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="client-selector-title"
      >
        <motion.div 
          className="bg-white rounded-3xl shadow-medium p-8 max-w-3xl w-full max-h-[85vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <h2 id="client-selector-title" className="font-nunito text-3xl font-bold text-earth-dark mb-2">
            {hasSelectedBefore ? 'Choose a New Persona from the Waiting Room' : 'Select a Client Persona'}
          </h2>
          {hasSelectedBefore && (
            <p className="font-primary text-earth mb-6">
              Your previous session has ended. Select a new client to practice with.
            </p>
          )}
          
          {/* Search input */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search personas by name or background..."
                onChange={handleSearchChange}
                className="w-full px-5 py-3 bg-mist rounded-full text-earth-dark placeholder-earth/50 font-primary focus:outline-none focus:ring-2 focus:ring-sage pl-12"
                aria-label="Search client personas"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-earth/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {isSearching && (
              <p className="font-primary text-sm text-sage mt-2 ml-4">Searching...</p>
            )}
          </div>

          <div className="overflow-y-auto max-h-[50vh] pr-2 -mr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPersonas.length > 0 ? (
                filteredPersonas.map((persona) => (
                  <PersonaButton
                    key={persona.id}
                    persona={persona}
                    isSelected={currentPersona.id === persona.id}
                    onSelect={() => handleSelect(persona)}
                  />
                ))
              ) : (
                <p className="col-span-2 text-center text-earth/60 py-12 font-primary">
                  No personas found matching "{searchTerm}"
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex justify-end gap-4">
            {hasSelectedBefore && (
              <motion.button
                onClick={onClose}
                className="px-6 py-3 font-primary font-medium text-earth hover:text-earth-dark transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            )}
            <motion.button
              onClick={onClose}
              className="px-8 py-3 bg-primary text-white rounded-full font-primary font-semibold hover:bg-primary-dark transition-colors shadow-soft hover:shadow-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {hasSelectedBefore ? `Start Session with ${currentPersona.name}` : `Continue with ${currentPersona.name}`}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-3 border-sage border-t-transparent rounded-full"
    />
  </div>
);

// Custom hook for practice logic
const usePracticeLogic = (): UsePracticeLogicReturn => {
  const navigate = useNavigate();
  const { showUserConfig, showAgentEdit, setShowUserConfig } = useUI();
  const user = useUser();
  const { currentPersona, samplePersonas, setCurrentPersona } = useClientPersonaStore();
  const { connected, disconnect, connecting } = useLiveAPIContext();
  const [showClientSelector, setShowClientSelector] = useState(!connected);

  // Use effect to handle initial user config
  useEffect(() => {
    if (!user.name && !showUserConfig) {
      setShowUserConfig(true);
    }
  }, [user.name, showUserConfig, setShowUserConfig]);

  const handleNavigateHome = useCallback(() => navigate('/'), [navigate]);
  const handleOpenSettings = useCallback(() => setShowUserConfig(true), [setShowUserConfig]);
  const handleCloseClientSelector = useCallback(() => setShowClientSelector(false), []);
  
  const handleEndSession = useCallback(() => {
    // Disconnect if connected
    if (connected) {
      disconnect();
    }
    // Show client selector to choose a new scenario
    setShowClientSelector(true);
  }, [connected, disconnect]);

  return {
    showUserConfig,
    showAgentEdit,
    showClientSelector,
    currentPersona,
    samplePersonas,
    connected,
    connecting,
    setCurrentPersona: setCurrentPersona as (persona: ClientPersona) => void,
    handleNavigateHome,
    handleOpenSettings,
    handleCloseClientSelector,
    handleEndSession,
  };
};

function Practice() {
  const {
    showUserConfig,
    showAgentEdit,
    showClientSelector,
    currentPersona,
    samplePersonas,
    connected,
    connecting,
    setCurrentPersona,
    handleNavigateHome,
    handleOpenSettings,
    handleCloseClientSelector,
    handleEndSession,
  } = usePracticeLogic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-mist via-lavender-light/30 to-sage-light/20">
      <ErrorScreen />
      
      <PracticeHeader 
        onNavigateHome={handleNavigateHome}
        onOpenSettings={handleOpenSettings}
      />

      {/* Lazy loaded modals */}
      <Suspense fallback={null}>
        {showUserConfig && <UserSettings />}
        {showAgentEdit && <AgentEdit />}
      </Suspense>
      
      {/* Client Selector */}
      <ClientSelectorModal
        isOpen={showClientSelector && !connected}
        onClose={handleCloseClientSelector}
        currentPersona={currentPersona}
        samplePersonas={samplePersonas}
        onSelectPersona={setCurrentPersona}
      />

      {/* Main Practice Area */}
      <motion.div 
        className="pt-24 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-medium p-8 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-nunito text-2xl font-bold text-earth-dark">
                Session with {currentPersona.name}
              </h2>
              {connected && (
                <motion.button
                  onClick={handleEndSession}
                  className="px-6 py-2 bg-lavender text-white rounded-full font-primary font-medium hover:bg-lavender-dark transition-colors shadow-soft hover:shadow-medium flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  End Session
                </motion.button>
              )}
            </div>
            {connecting ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-sage border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <p className="font-primary text-lg text-earth-dark">Connecting to {currentPersona.name}...</p>
                  <p className="font-primary text-sm text-earth mt-2">Preparing your therapy session</p>
                </motion.div>
              </div>
            ) : (
              <Suspense fallback={<LoadingFallback />}>
                <KeynoteCompanion />
              </Suspense>
            )}
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-medium p-6">
            <ControlTray onEndSession={handleEndSession} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Export with error boundary wrapper
export default function PracticeWithErrorBoundary() {
  return (
    <PracticeErrorBoundary>
      <Practice />
    </PracticeErrorBoundary>
  );
} 