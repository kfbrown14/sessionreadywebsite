/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { create } from 'zustand';
import { 
  ClientPersona, 
  MalikAnxious,
  AikoGrieving,
  JordanTrauma,
  ZahraDepression,
  createNewPersona 
} from './presets/agents'; // Now imports ClientPersona and new presets

/**
 * User (Therapist)
 */
export type User = {
  name?: string; // Therapist's Name
  info?: string; // Therapist's Approach/Specialization
};

export const useUser = create<
  {
    setName: (name: string) => void;
    setInfo: (info: string) => void;
  } & User
>(set => ({
  name: '',
  info: '',
  setName: name => set({ name }),
  setInfo: info => set({ info }),
}));

/**
 * Client Personas
 */
function getPersonaById(id: string) {
  const { customPersonas, samplePersonas } = useClientPersonaStore.getState();
  return (
    customPersonas.find(persona => persona.id === id) ||
    samplePersonas.find(persona => persona.id === id)
  );
}

export const useClientPersonaStore = create<{
  currentPersona: ClientPersona;
  samplePersonas: ClientPersona[];
  customPersonas: ClientPersona[];
  setCurrentPersona: (persona: ClientPersona | string) => void;
  addPersona: (persona: ClientPersona) => void;
  updatePersona: (personaId: string, adjustments: Partial<ClientPersona>) => void;
}>(set => ({
  currentPersona: MalikAnxious, // Default to MalikAnxious
  samplePersonas: [
    // Detailed therapy scenarios
    MalikAnxious,
    AikoGrieving,
    JordanTrauma,
    ZahraDepression,
  ],
  customPersonas: [],

  addPersona: (persona: ClientPersona) => {
    set(state => ({
      customPersonas: [...state.customPersonas, persona],
      currentPersona: persona,
    }));
  },
  setCurrentPersona: (persona: ClientPersona | string) =>
    set({ currentPersona: typeof persona === 'string' ? getPersonaById(persona)! : persona }),
  updatePersona: (personaId: string, adjustments: Partial<ClientPersona>) => {
    let persona = getPersonaById(personaId);
    if (!persona) return;
    const updatedPersona = { ...persona, ...adjustments };
    set(state => ({
      samplePersonas: state.samplePersonas.map(p =>
        p.id === personaId ? updatedPersona : p
      ),
      customPersonas: state.customPersonas.map(p =>
        p.id === personaId ? updatedPersona : p
      ),
      currentPersona: state.currentPersona.id === personaId ? updatedPersona : state.currentPersona,
    }));
  },
}));

// Alias for backward compatibility if other files import useAgent directly.
// It's better to update imports to useClientPersonaStore.
export const useAgent = useClientPersonaStore;


/**
 * UI
 */
export const useUI = create<{
  showUserConfig: boolean;
  setShowUserConfig: (show: boolean) => void;
  showAgentEdit: boolean; // This will now control showing the "Edit Client Persona" modal
  setShowAgentEdit: (show: boolean) => void;
}>(set => ({
  showUserConfig: true, // Initially show therapist profile setup
  setShowUserConfig: (show: boolean) => set({ showUserConfig: show }),
  showAgentEdit: false,
  setShowAgentEdit: (show: boolean) => set({ showAgentEdit: show }),
}));
