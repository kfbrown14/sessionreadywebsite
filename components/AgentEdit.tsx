/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ClientPersona, // Use ClientPersona directly
  PERSONA_VISUAL_CUES, // Use new name directly
  CLIENT_VOCAL_PROFILES, // Use new name directly
  CLIENT_VOCAL_PROFILE,  // Use new name directly
} from '@/lib/presets/agents';
import Modal from './Modal';
import { useAgent, useUI } from '@/lib/state'; // useAgent is an alias for useClientPersonaStore

export default function EditAgent() { // Consider renaming component to EditClientPersona in future
  const agent = useAgent(state => state.currentPersona); // Correct selector
  const updateStorePersona = useAgent(state => state.updatePersona); // Correct selector and renamed
  const nameInput = useRef(null);
  const { setShowAgentEdit } = useUI();

  function onClose() {
    setShowAgentEdit(false);
  }

  function updateCurrentAgent(adjustments: Partial<ClientPersona>) {
    if (agent) { // Guard against agent being null/undefined
      updateStorePersona(agent.id, adjustments);
    }
  }

  if (!agent) {
    return (
      <Modal onClose={onClose}>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-3 border-sage border-t-transparent mx-auto mb-4" />
          <p className="font-primary text-earth">Loading client persona details...</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={() => onClose()}>
      <div className="max-w-2xl">
        <h2 className="font-secondary text-3xl font-bold text-earth-dark mb-6">
          Edit Client Persona
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div>
                <label className="block font-primary text-earth-dark font-medium mb-2">
                  Name
                </label>
                <input
                  className="w-full px-4 py-3 bg-mist rounded-xl text-earth-dark placeholder-earth/50 font-primary text-lg focus:outline-none focus:ring-2 focus:ring-sage"
                  type="text"
                  placeholder="Enter client name"
                  value={agent.name}
                  onChange={e => updateCurrentAgent({ name: e.target.value })}
                  ref={nameInput}
                  aria-label="Client Persona Name"
                />
              </div>

              <div>
                <label htmlFor="persona-personality" className="block font-primary text-earth-dark font-medium mb-2">
                  Background & Presenting Issues
                </label>
                <textarea
                  id="persona-personality"
                  value={agent.personality}
                  onChange={e => updateCurrentAgent({ personality: e.target.value })}
                  rows={7}
                  placeholder="Describe the client's background, current challenges, and reasons for seeking therapy."
                  className="w-full px-4 py-3 bg-mist rounded-xl text-earth-dark placeholder-earth/50 font-primary focus:outline-none focus:ring-2 focus:ring-sage resize-none"
                  aria-label="Client Persona Personality"
                />
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div>
              <p className="font-primary text-earth-dark font-medium mb-4 text-center">
                Visual Cue / Demeanor
              </p>
              <ul className="grid grid-cols-4 gap-3 justify-center max-w-xs mx-auto" role="radiogroup" aria-label="Client Persona Visual Cue">
                {PERSONA_VISUAL_CUES.map((color, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    role="radio"
                    aria-checked={color === agent.bodyColor}
                    tabIndex={color === agent.bodyColor ? 0 : -1}
                    onClick={() => updateCurrentAgent({ bodyColor: color })}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') updateCurrentAgent({ bodyColor: color }); }}
                  >
                    <button
                      type="button"
                      className={`w-12 h-12 rounded-full transition-all ${
                        color === agent.bodyColor ? 'ring-4 ring-sage ring-offset-2' : 'hover:ring-2 hover:ring-sage-light hover:ring-offset-2'
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Set visual cue to ${color}`}
                    />
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <label htmlFor="persona-voice" className="block font-primary text-earth-dark font-medium mb-2">
                Voice Tone
              </label>
              <select
                id="persona-voice"
                value={agent.voice}
                onChange={e => {
                  updateCurrentAgent({
                    voice: e.target.value as CLIENT_VOCAL_PROFILE,
                  });
                }}
                className="w-full px-4 py-3 bg-mist rounded-xl text-earth-dark font-primary focus:outline-none focus:ring-2 focus:ring-sage appearance-none cursor-pointer"
                aria-label="Client Persona Voice"
              >
                {CLIENT_VOCAL_PROFILES.map(voice => (
                  <option key={voice} value={voice}>
                    {voice}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <motion.button
            onClick={onClose}
            className="px-6 py-3 font-primary font-medium text-earth hover:text-earth-dark transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={onClose}
            className="px-8 py-3 bg-sage text-white rounded-full font-primary font-semibold hover:bg-sage-dark transition-colors shadow-soft hover:shadow-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Save Changes
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}