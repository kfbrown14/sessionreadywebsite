/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useEffect, useRef, useState } from 'react';
import { Modality } from '@google/genai';
import { motion } from 'framer-motion';

import BasicFace from '../basic-face/BasicFace';
import { useLiveAPIContext } from '../../../contexts/LiveAPIContext';
import { createSystemInstructions } from '@/lib/prompts';
import { useAgent, useUser } from '@/lib/state'; // useAgent is an alias for useClientPersonaStore

// Import therapy room images
import modernRoom from '../../public/therapy_rooms/modern.jpg?url';
import organicRoom from '../../public/therapy_rooms/organic.jpg?url';
import defaultRoom from '../../public/therapy_rooms/default.jpg?url';

type TherapyRoom = 'modern' | 'organic' | 'default';

const roomBackgrounds: Record<TherapyRoom, string | null> = {
  modern: modernRoom,
  organic: organicRoom,
  default: defaultRoom,
};

export default function KeynoteCompanion() {
  const { client, connected, setConfig } = useLiveAPIContext();
  const faceCanvasRef = useRef<HTMLCanvasElement>(null);
  const user = useUser();
  const current = useAgent(state => state.currentPersona); // Correctly select currentPersona
  
  // Room selection state - defaults to persona preference or 'organic'
  const [selectedRoom, setSelectedRoom] = useState<TherapyRoom>(
    current?.therapyRoom || 'organic'
  );
  const [showRoomSelector, setShowRoomSelector] = useState(false);

  // Update room when persona changes
  useEffect(() => {
    if (current?.therapyRoom) {
      setSelectedRoom(current.therapyRoom);
    }
  }, [current?.therapyRoom]);

  // Set the configuration for the Live API
  useEffect(() => {
    if (!current) {
      console.log('KeynoteCompanion: No current persona, skipping config');
      return;
    }
    
    const newConfig = {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: current.voice },
        },
      },
      systemInstruction: {
        parts: [
          {
            text: createSystemInstructions(current, user),
          },
        ],
      },
    };
    
    console.log('KeynoteCompanion: Setting config with persona:', current.name, 'voice:', current.voice);
    console.log('KeynoteCompanion: Full config:', newConfig);
    setConfig(newConfig);
  }, [setConfig, user, current]);

  // Initiate the session when the Live API connection is established
  // Use the persona's initial greeting if available
  useEffect(() => {
    const beginSession = async () => {
      if (!connected || !current) {
        console.log('KeynoteCompanion: Not connected or no current persona, skipping begin session');
        return;
      }
      
      // If the persona has a specific initial greeting, use it
      const initialPrompt = current.initialGreeting 
        ? `Say: "${current.initialGreeting}"`
        : 'Greet the user and introduce yourself and your role.';
      
      console.log('KeynoteCompanion: Beginning session with prompt:', initialPrompt);
      
      client.send(
        {
          text: initialPrompt,
        },
        true
      );
    };
    beginSession();
  }, [client, connected, current]);

  if (!current) {
    return (
      <div className="keynote-companion" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px' }}>
        Loading client persona...
      </div>
    );
  }

  const therapyRoomBg = roomBackgrounds[selectedRoom];

  return (
    <div 
      className="keynote-companion"
      style={{
        backgroundImage: `url(${therapyRoomBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      {/* Room selector button */}
      <motion.button
        className="room-selector-button"
        onClick={() => setShowRoomSelector(!showRoomSelector)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '8px 16px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          color: 'white',
          fontSize: '14px',
          cursor: 'pointer',
          zIndex: 2,
        }}
      >
        🏠 Change Room
      </motion.button>

      {/* Room selector dropdown */}
      {showRoomSelector && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{
            position: 'absolute',
            top: '60px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            zIndex: 3,
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
            Select Therapy Room:
          </div>
          {Object.keys(roomBackgrounds).map((room) => (
            <button
              key={room}
              onClick={() => {
                setSelectedRoom(room as TherapyRoom);
                setShowRoomSelector(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 12px',
                marginBottom: '4px',
                background: selectedRoom === room ? '#007AFF' : 'transparent',
                color: selectedRoom === room ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (selectedRoom !== room) {
                  e.currentTarget.style.background = '#f0f0f0';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedRoom !== room) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {room.charAt(0).toUpperCase() + room.slice(1)}
            </button>
          ))}
        </motion.div>
      )}

      {/* Semi-transparent overlay to ensure avatar is visible */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(2px)',
      }} />
      
      {/* Avatar container with backdrop for better visibility */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        padding: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
      }}>
      <BasicFace canvasRef={faceCanvasRef!} color={current.bodyColor} />
      </div>
    </div>
  );
}