/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './Modal';
import { useUI, useUser } from '@/lib/state';

// Common therapeutic modalities
const THERAPEUTIC_MODALITIES = [
  { id: 'cbt', label: 'Cognitive Behavioral Therapy (CBT)', category: 'Cognitive' },
  { id: 'dbt', label: 'Dialectical Behavior Therapy (DBT)', category: 'Behavioral' },
  { id: 'psychodynamic', label: 'Psychodynamic Therapy', category: 'Psychoanalytic' },
  { id: 'humanistic', label: 'Humanistic/Person-Centered', category: 'Humanistic' },
  { id: 'gestalt', label: 'Gestalt Therapy', category: 'Humanistic' },
  { id: 'emdr', label: 'EMDR', category: 'Trauma' },
  { id: 'ifs', label: 'Internal Family Systems (IFS)', category: 'Integrative' },
  { id: 'act', label: 'Acceptance & Commitment Therapy (ACT)', category: 'Behavioral' },
  { id: 'solution-focused', label: 'Solution-Focused Brief Therapy', category: 'Brief' },
  { id: 'narrative', label: 'Narrative Therapy', category: 'Postmodern' },
  { id: 'somatic', label: 'Somatic Therapy', category: 'Body-Based' },
  { id: 'art', label: 'Art Therapy', category: 'Expressive' },
  { id: 'play', label: 'Play Therapy', category: 'Expressive' },
  { id: 'family-systems', label: 'Family Systems Therapy', category: 'Systemic' },
  { id: 'mindfulness', label: 'Mindfulness-Based Therapy', category: 'Mind-Body' },
];

// Group modalities by category
const groupedModalities = THERAPEUTIC_MODALITIES.reduce((acc, modality) => {
  if (!acc[modality.category]) {
    acc[modality.category] = [];
  }
  acc[modality.category].push(modality);
  return acc;
}, {} as Record<string, typeof THERAPEUTIC_MODALITIES>);

export default function UserSettings() {
  const { name, info, setName, setInfo } = useUser();
  const { setShowUserConfig } = useUI();
  const [selectedModalities, setSelectedModalities] = useState<string[]>(() => {
    // Parse existing info to extract modalities if any
    return info ? info.split(',').map(m => m.trim()).filter(Boolean) : [];
  });

  function updateClient() {
    // Convert selected modalities to a comma-separated string
    const modalitiesString = selectedModalities
      .map(id => THERAPEUTIC_MODALITIES.find(m => m.id === id)?.label)
      .filter(Boolean)
      .join(', ');
    setInfo(modalitiesString);
    setShowUserConfig(false);
  }

  function toggleModality(modalityId: string) {
    setSelectedModalities(prev => 
      prev.includes(modalityId)
        ? prev.filter(id => id !== modalityId)
        : [...prev, modalityId]
    );
  }

  return (
    <Modal onClose={() => setShowUserConfig(false)}>
      <div className="max-w-3xl">
        <h2 className="font-nunito text-3xl font-bold text-earth-dark mb-4">
          Welcome to Session Ready
        </h2>
        
        <p className="font-primary text-earth mb-6 leading-relaxed">
          Session Ready is a therapist training tool designed to help aspiring and practicing therapists hone their client interaction skills in a simulated environment. It presents a variety of AI-driven client personas, allowing trainees to practice their interventions.
        </p>

        <form
          onSubmit={e => {
            e.preventDefault();
            updateClient();
          }}
          className="space-y-6"
        >
          <p className="font-primary text-sage-dark font-medium">
            Adding this optional info makes the experience more personalized:
          </p>

          <div>
            <label className="block font-primary text-earth-dark font-medium mb-2" htmlFor="user-name">
              Your name
            </label>
            <input
              id="user-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="What do you like to be called?"
              className="w-full px-5 py-3 bg-mist rounded-xl text-earth-dark placeholder-earth/50 font-primary text-base focus:outline-none focus:ring-2 focus:ring-sage focus:bg-white transition-colors"
              autoComplete="name"
              autoFocus
            />
          </div>

          <div>
            <label className="block font-primary text-earth-dark font-medium mb-3">
              Your therapeutic modalities
            </label>
            <p className="font-primary text-sm text-earth/70 mb-4">
              Select all that apply to your practice approach:
            </p>
            
            <div className="max-h-64 overflow-y-auto pr-2 -mr-2 space-y-4">
              {Object.entries(groupedModalities).map(([category, modalities]) => (
                <div key={category}>
                  <h4 className="font-primary text-sm font-semibold text-sage-dark mb-2">
                    {category}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {modalities.map(modality => (
                      <motion.label
                        key={modality.id}
                        className={`
                          flex items-center p-3 rounded-xl cursor-pointer transition-all
                          ${selectedModalities.includes(modality.id)
                            ? 'bg-sage-light border-2 border-sage text-earth-dark'
                            : 'bg-mist hover:bg-lavender-light/30 border-2 border-transparent'
                          }
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedModalities.includes(modality.id)}
                          onChange={() => toggleModality(modality.id)}
                          className="sr-only"
                        />
                        <div className="flex items-center gap-3 w-full">
                          <div className={`
                            w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all
                            ${selectedModalities.includes(modality.id)
                              ? 'bg-sage'
                              : 'bg-white border-2 border-earth/30'
                            }
                          `}>
                            <AnimatePresence>
                              {selectedModalities.includes(modality.id) && (
                                <motion.svg
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  className="w-3 h-3 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </motion.svg>
                              )}
                            </AnimatePresence>
                          </div>
                          <span className="font-primary text-sm">{modality.label}</span>
                        </div>
                      </motion.label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {selectedModalities.length > 0 && (
              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="font-primary text-sage-dark">
                  Selected: {selectedModalities.length}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedModalities([])}
                  className="font-primary text-earth hover:text-earth-dark underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          <motion.button 
            type="submit"
            className="w-full px-8 py-3 bg-sage text-white rounded-full font-primary font-semibold hover:bg-sage-dark transition-colors shadow-soft hover:shadow-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Let's begin!
          </motion.button>
        </form>
      </div>
    </Modal>
  );
}
