// Types for the Practice component and related functionality

// Re-export the existing ClientPersona type from agents
export type { ClientPersona, CLIENT_VOCAL_PROFILE } from '../lib/presets/agents';

export interface User {
  name?: string;
  info?: string;
}

export interface PracticeHeaderProps {
  onNavigateHome: () => void;
  onOpenSettings: () => void;
}

export interface PersonaButtonProps {
  persona: import('../lib/presets/agents').ClientPersona;
  isSelected: boolean;
  onSelect: () => void;
}

export interface ClientSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPersona: import('../lib/presets/agents').ClientPersona;
  samplePersonas: import('../lib/presets/agents').ClientPersona[];
  onSelectPersona: (persona: import('../lib/presets/agents').ClientPersona) => void;
}

export interface UsePracticeLogicReturn {
  showUserConfig: boolean;
  showAgentEdit: boolean;
  showClientSelector: boolean;
  currentPersona: import('../lib/presets/agents').ClientPersona;
  samplePersonas: import('../lib/presets/agents').ClientPersona[];
  connected: boolean;
  setCurrentPersona: (persona: import('../lib/presets/agents').ClientPersona) => void;
  handleNavigateHome: () => void;
  handleOpenSettings: () => void;
  handleCloseClientSelector: () => void;
  handleEndSession: () => void;
}

export interface LiveAPIContextValue {
  connected: boolean;
  client: any; // Replace with actual client type
  setConfig: (config: any) => void; // Replace with actual config type
  connect: () => void;
  disconnect: () => void;
}

export interface UIState {
  showUserConfig: boolean;
  setShowUserConfig: (show: boolean) => void;
  showAgentEdit: boolean;
  setShowAgentEdit: (show: boolean) => void;
}

export interface ClientPersonaStore {
  currentPersona: import('../lib/presets/agents').ClientPersona;
  samplePersonas: import('../lib/presets/agents').ClientPersona[];
  customPersonas: import('../lib/presets/agents').ClientPersona[];
  setCurrentPersona: (persona: import('../lib/presets/agents').ClientPersona | string) => void;
  addPersona: (persona: import('../lib/presets/agents').ClientPersona) => void;
  updatePersona: (personaId: string, adjustments: Partial<import('../lib/presets/agents').ClientPersona>) => void;
} 