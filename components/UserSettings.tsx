/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUI, useUser } from '../lib/state';
import Modal from './Modal';

interface TherapeuticModality {
  id: string;
  label: string;
}

const THERAPEUTIC_MODALITIES: TherapeuticModality[] = [
  { id: 'cbt', label: 'Cognitive Behavioral Therapy (CBT)' },
  { id: 'dbt', label: 'Dialectical Behavior Therapy (DBT)' },
  { id: 'psychodynamic', label: 'Psychodynamic Therapy' },
  { id: 'humanistic', label: 'Humanistic/Person-Centered' },
  { id: 'gestalt', label: 'Gestalt Therapy' },
  { id: 'emdr', label: 'EMDR' },
  { id: 'ifs', label: 'Internal Family Systems (IFS)' },
  { id: 'act', label: 'Acceptance & Commitment Therapy (ACT)' },
  { id: 'solution-focused', label: 'Solution-Focused Brief Therapy' },
  { id: 'narrative', label: 'Narrative Therapy' },
  { id: 'somatic', label: 'Somatic Therapy' },
  { id: 'art', label: 'Art Therapy' },
  { id: 'play', label: 'Play Therapy' },
  { id: 'family-systems', label: 'Family Systems Therapy' },
  { id: 'mindfulness', label: 'Mindfulness-Based Therapy' }
];

export default function UserSettings() {
  const { name, info, setName, setInfo } = useUser();
  const { setShowUserConfig } = useUI();
  const navigate = useNavigate();
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
    // Navigate to practice page which will show the client persona modal
    navigate('/practice');
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
              Your name <span className="text-earth/50 text-sm font-normal">(optional)</span>
            </label>
            <input
              id="user-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="What do you like to be called?"
              className="w-full px-5 py-3 bg-mist rounded-xl text-earth-dark placeholder-earth/50 font-primary text-base focus:outline-none focus:ring-2 focus:ring-sage focus:bg-white transition-colors"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="block font-primary text-earth-dark font-medium mb-3">
              Your therapeutic modalities
            </label>
            <p className="font-primary text-sm text-earth/70 mb-4">
              Select all that apply to your practice approach:
            </p>
            
            <div className="max-h-64 overflow-y-auto pr-2 -mr-2 space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {THERAPEUTIC_MODALITIES.map(modality => (
                  <motion.label
                    key={modality.id}
                    className={`
                      flex flex-row items-start gap-3 p-3 rounded-xl cursor-pointer transition-all
                      ${selectedModalities.includes(modality.id)
                        ? 'bg-sage/20 border-2 border-sage shadow-md'
                        : 'bg-mist hover:bg-lavender-light/30 border-2 border-transparent'
                      }
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={selectedModalities.includes(modality.id)}
                        onChange={() => toggleModality(modality.id)}
                        className={`
                          w-5 h-5 rounded border-2 mt-0.5
                          ${selectedModalities.includes(modality.id)
                            ? 'bg-sage border-sage accent-sage'
                            : 'border-earth/30 hover:border-sage'
                          }
                        `}
                      />
                    </div>
                    <span className={`font-primary text-sm flex-1 ${
                      selectedModalities.includes(modality.id) 
                        ? 'text-earth-dark font-semibold'
                        : 'text-earth'
                    }`}>{modality.label}</span>
                  </motion.label>
                ))}
              </div>
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
            className="w-full px-8 py-3 bg-primary text-white rounded-full font-primary font-semibold hover:bg-primary-dark transition-colors shadow-soft hover:shadow-medium text-center flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start
          </motion.button>
        </form>
      </div>
    </Modal>
  );
}
