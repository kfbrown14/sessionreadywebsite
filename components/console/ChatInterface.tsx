import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLiveAPIContext } from '../../contexts/LiveAPIContext';
import { useAgent } from '@/lib/state';

interface Message {
  id: string;
  role: 'therapist' | 'client';
  content: string;
  timestamp: Date;
  source?: 'text' | 'voice'; // Track if message came from text input or voice
}

interface ChatInterfaceProps {
  onClose?: () => void;
  onEndSession?: () => void;
  isPaused?: boolean;
}

const ChatInterface = memo(({ onClose, onEndSession, isPaused = false }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isClientSpeaking, setIsClientSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { client, connected } = useLiveAPIContext();
  const currentPersona = useAgent(state => state.currentPersona);

  // Common therapeutic prompts
  const quickPrompts = [
    { text: "How does that make you feel?", emoji: "🤔" },
    { text: "Can you tell me more about that?", emoji: "💭" },
    { text: "What do you think that means for you?", emoji: "🔍" },
    { text: "How long have you been experiencing this?", emoji: "⏰" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add initial greeting when connected
  useEffect(() => {
    if (connected && currentPersona && messages.length === 0) {
      const greeting: Message = {
        id: Date.now().toString(),
        role: 'client',
        content: currentPersona.initialGreeting || "Hello, I'm here for my session.",
        timestamp: new Date(),
        source: 'voice',
      };
      setMessages([greeting]);
    }
  }, [connected, currentPersona]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !connected || isPaused) return;

    // Add therapist message
    const therapistMessage: Message = {
      id: Date.now().toString(),
      role: 'therapist',
      content: inputText.trim(),
      timestamp: new Date(),
      source: 'text',
    };
    
    setMessages(prev => [...prev, therapistMessage]);
    setInputText('');
    setIsTyping(true);

    // Send to AI
    try {
      client.send(
        { text: inputText.trim() },
        true
      );
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputText(prompt);
  };

  // Listen for AI responses and other events
  useEffect(() => {
    if (!client) return;

    // Handle content (both voice transcripts and text responses)
    const handleContent = (data: any) => {
      if (data.modelTurn?.parts) {
        const textParts = data.modelTurn.parts.filter((p: any) => p.text);
        if (textParts.length > 0) {
          const content = textParts.map((p: any) => p.text).join(' ');
          
          // Check if we already have this message (to avoid duplicates)
          setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage?.role === 'client' && lastMessage?.content === content) {
              return prev; // Skip duplicate
            }
            
            const clientMessage: Message = {
              id: Date.now().toString(),
              role: 'client',
              content: content,
              timestamp: new Date(),
              source: 'voice', // AI responses are voice-based
            };
            return [...prev, clientMessage];
          });
          setIsTyping(false);
          setIsClientSpeaking(false);
        }
      }
    };

    // Handle when AI starts speaking (audio event)
    const handleAudio = () => {
      setIsClientSpeaking(true);
      setIsTyping(false);
    };

    // Handle interruption
    const handleInterrupted = () => {
      setIsClientSpeaking(false);
      setIsTyping(false);
    };

    // Handle turn complete
    const handleTurnComplete = () => {
      setIsClientSpeaking(false);
    };

    client.on('content', handleContent);
    client.on('audio', handleAudio);
    client.on('interrupted', handleInterrupted);
    client.on('turncomplete', handleTurnComplete);

    return () => {
      client.off('content', handleContent);
      client.off('audio', handleAudio);
      client.off('interrupted', handleInterrupted);
      client.off('turncomplete', handleTurnComplete);
    };
  }, [client]);

  // Listen for log events to capture user voice transcripts (when available)
  useEffect(() => {
    if (!client) return;

    const handleLog = (log: any) => {
      // Future: Check for user voice transcript events
      // This is where we would capture what the user says via voice
      if (log.type === 'user.speech' || log.type === 'client.voice') {
        // Add user voice message when this feature becomes available
        console.log('User voice log:', log);
      }
    };

    client.on('log', handleLog);
    return () => {
      client.off('log', handleLog);
    };
  }, [client]);

  if (!connected) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      
      {/* Chat Container */}
      <div 
        className="relative w-full max-w-2xl h-[750px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden"
        style={{
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-sage to-sage-dark text-white flex items-center gap-4">
          {currentPersona?.avatar ? (
            <img 
              src={currentPersona.avatar} 
              alt={currentPersona.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-white/30"
            />
          ) : (
            <div 
              className="w-14 h-14 rounded-full border-2 border-white/30"
              style={{ backgroundColor: currentPersona?.bodyColor || '#ccc' }}
            />
          )}
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{currentPersona?.name || 'Client'}</h3>
            <p className="text-sm opacity-90">
              {isClientSpeaking ? 'Speaking...' : 'Practice Session'}
            </p>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Status indicator */}
            <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
              <div className={`w-2 h-2 rounded-full ${isClientSpeaking ? 'bg-green-400 animate-pulse' : 'bg-white/50'}`} />
              <span className="text-xs font-medium">
                {isClientSpeaking ? 'Live' : 'Ready'}
              </span>
            </div>
            
            {/* End Session button */}
            <button
              onClick={onEndSession}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors flex items-center gap-2"
              aria-label="End session"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-sm font-medium">End Session</span>
            </button>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {isPaused && (
            <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg text-center">
              <p className="text-sm font-medium">Session is paused - AI responses are temporarily stopped</p>
            </div>
          )}
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'therapist' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'client' && (
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                    {currentPersona?.avatar ? (
                      <img 
                        src={currentPersona.avatar}
                        alt="Client"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div 
                        className="w-full h-full"
                        style={{ backgroundColor: currentPersona?.bodyColor || '#ccc' }}
                      />
                    )}
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-3 ${
                    message.role === 'therapist'
                      ? 'bg-sage text-white ml-4'
                      : 'bg-white text-gray-800 shadow-sm mr-4'
                  }`}
                >
                  <p className="text-base leading-relaxed">{message.content}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs opacity-60">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {message.source === 'voice' && (
                      <span className="text-xs opacity-60 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                        </svg>
                        voice
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {(isTyping || isClientSpeaking) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  {currentPersona?.avatar ? (
                    <img 
                      src={currentPersona.avatar}
                      alt="Client"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full"
                      style={{ backgroundColor: currentPersona?.bodyColor || '#ccc' }}
                    />
                  )}
                </div>
                <div className="bg-white rounded-lg px-4 py-3 shadow-sm">
                  {isClientSpeaking ? (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-sage rounded-full animate-pulse" />
                        <span className="w-2 h-2 bg-sage rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-sage rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-xs text-gray-500">Speaking...</span>
                    </div>
                  ) : (
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-3 border-t border-gray-200 bg-white">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleQuickPrompt(prompt.text)}
                className="flex-shrink-0 px-4 py-2 text-sm bg-sage-light/10 hover:bg-sage-light/20 rounded-full transition-colors flex items-center gap-2 text-earth-dark"
              >
                <span>{prompt.emoji}</span>
                <span>{prompt.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isPaused ? "Session is paused..." : "Type your therapeutic intervention..."}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-sage/50 text-base text-black"
              rows={2}
              disabled={!connected || isClientSpeaking || isPaused}
            />
            <button
              onClick={handleSendMessage}
              disabled={!connected || !inputText.trim() || isClientSpeaking || isPaused}
              className="px-6 py-2 bg-sage text-white rounded-lg hover:bg-sage-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            {isPaused 
              ? 'Session paused - Resume to continue'
              : isClientSpeaking 
              ? 'Client is speaking via voice...' 
              : 'Press Enter to send • Shift+Enter for new line'
            }
          </p>
        </div>
      </div>
    </motion.div>
  );
});

export default ChatInterface; 