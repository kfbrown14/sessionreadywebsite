/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
export const CLIENT_VOCAL_PROFILES = [
  'Aoede',
  'Charon',
  'Fenrir',
  'Kore',
  'Leda',
  'Orus',
  'Puck',
  'Zephyr',
] as const;

export type CLIENT_VOCAL_PROFILE = (typeof CLIENT_VOCAL_PROFILES)[number];

export type ClientPersona = {
  id: string;
  name: string;
  personality: string; // Represents Client Background & Presenting Issues
  bodyColor: string; // Represents a visual cue or demeanor indicator
  voice: CLIENT_VOCAL_PROFILE; // Represents client vocal tone
};

export const PERSONA_VISUAL_CUES = [ // Formerly AGENT_COLORS
  '#4285f4', // Blue
  '#ea4335', // Red
  '#fbbc04', // Yellow
  '#34a853', // Green
  '#fa7b17', // Orange
  '#f538a0', // Pink
  '#a142f4', // Purple
  '#24c1e0', // Teal
];

export const createNewPersona = (properties?: Partial<ClientPersona>): ClientPersona => {
  return {
    id: Math.random().toString(36).substring(2, 15),
    name: '',
    personality: '',
    bodyColor: PERSONA_VISUAL_CUES[Math.floor(Math.random() * PERSONA_VISUAL_CUES.length)],
    voice: Math.random() > 0.5 ? 'Charon' : 'Aoede', // Default voice
    ...properties,
  };
};

export const AnxiousAlex: ClientPersona = {
  id: 'anxious-alex',
  name: 'Anxious Alex',
  personality: `Alex (they/them), 28, graphic designer. Presents with generalized anxiety, chronic worry about work and social situations, difficulty concentrating, and occasional panic attacks. Reports feeling 'on edge' constantly. Struggles with perfectionism and fear of failure.`,
  bodyColor: '#a142f4', // Purple
  voice: 'Aoede',
};

export const GrievingGrace: ClientPersona = {
  id: 'grieving-grace',
  name: 'Grieving Grace',
  personality: `Grace (she/her), 62, retired teacher. Recently lost her spouse of 40 years. Presents with deep sadness, tearfulness, loss of interest in previously enjoyed activities, social withdrawal, and sleep disturbances. Expresses feelings of loneliness and difficulty imagining a future without her partner.`,
  bodyColor: '#ea4335', // Red
  voice: 'Fenrir',
};

export const DepressedDavid: ClientPersona = {
  id: 'depressed-david',
  name: 'Depressed David',
  personality: `David (he/him), 45, unemployed. Reports persistent low mood, fatigue, anhedonia, feelings of worthlessness, and recurrent thoughts of death (no active plan). Has history of depressive episodes. Finds it hard to motivate himself for daily tasks.`,
  bodyColor: '#25C1E0', // Teal
  voice: 'Charon',
};

export const StressedSam: ClientPersona = {
  id: 'stressed-sam',
  name: 'Stressed Sam',
  personality: `Sam (any pronouns), 32, startup founder. Presents with high stress levels, irritability, insomnia, and physical tension (headaches, muscle aches). Overwhelmed by long work hours, pressure to succeed, and difficulty maintaining work-life balance. Worries about letting their team down.`,
  bodyColor: '#34a853', // Green
  voice: 'Leda',
};

// For state.ts compatibility, ensure old names are still exported if directly imported elsewhere, or update imports.
// For now, we assume direct imports of these presets will be updated.
export { AnxiousAlex as Charlotte, GrievingGrace as Paul, DepressedDavid as Shane, StressedSam as Penny };
export { CLIENT_VOCAL_PROFILES as INTERLOCUTOR_VOICES };
export type { CLIENT_VOCAL_PROFILE as INTERLOCUTOR_VOICE };
export { PERSONA_VISUAL_CUES as AGENT_COLORS };
export type { ClientPersona as Agent };
export { createNewPersona as createNewAgent };
