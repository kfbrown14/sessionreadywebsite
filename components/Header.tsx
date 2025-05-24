/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useLiveAPIContext } from '@/contexts/LiveAPIContext';
import { ClientPersona, createNewPersona } from '@/lib/presets/agents'; // Updated import
import { useClientPersonaStore, useUI, useUser } from '@/lib/state'; // Updated import
import { clsx } from 'clsx';
import React, { useEffect, useState, useRef } from 'react'; // Added React and useRef

export default function Header() {
  const { showUserConfig, setShowUserConfig, setShowAgentEdit } = useUI();
  const { name } = useUser(); // Therapist's name
  const {
    currentPersona,
    setCurrentPersona,
    samplePersonas,
    customPersonas,
    addPersona,
  } = useClientPersonaStore(); // Updated to useClientPersonaStore
  const { disconnect } = useLiveAPIContext();

  const [showPersonaList, setShowPersonaList] = useState(false); // Renamed from showRoomList for clarity
  const personaDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        personaDropdownRef.current &&
        !personaDropdownRef.current.contains(event.target as Node)
      ) {
        setShowPersonaList(false);
      }
    };

    if (showPersonaList) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPersonaList]);

  function changePersona(persona: ClientPersona | string) {
    disconnect();
    setCurrentPersona(persona);
    setShowPersonaList(false); // Close dropdown after selection
  }

  function handleAddNewPersona() {
    const newPersona = createNewPersona({ name: 'New Client Persona' });
    addPersona(newPersona);
    // FIX: setCurrentPersona should be called to make the new persona the current one
    setCurrentPersona(newPersona);
    setShowAgentEdit(true); // Open edit modal for the new persona
    setShowPersonaList(false);
  }

  // FIX: Added JSX return statement to make Header a valid React component
  return (
    <header className="app-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#333', color: 'white' }}>
      <div className="header-left" style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowPersonaList(!showPersonaList);
            }}
            className="persona-selector-button"
            style={{ marginRight: '10px', padding: '8px 12px' }}
          >
            Client: {currentPersona?.name || 'Select Client'} ▼
          </button>
          {showPersonaList && (
            <div
              ref={personaDropdownRef}
              className="persona-dropdown"
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: '#444',
                border: '1px solid #555',
                borderRadius: '4px',
                zIndex: 1000,
                minWidth: '200px',
                padding: '10px',
                color: 'white',
              }}
            >
              <h4 style={{ marginTop: 0, marginBottom: '5px' }}>Sample Clients</h4>
              {samplePersonas.map((p) => (
                <button
                  key={p.id}
                  onClick={() => changePersona(p)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '5px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                  className={clsx({ 'active-persona': currentPersona?.id === p.id })}
                >
                  {p.name}
                </button>
              ))}
              <h4 style={{ marginTop: '10px', marginBottom: '5px' }}>Custom Clients</h4>
              {customPersonas.map((p) => (
                <button
                  key={p.id}
                  onClick={() => changePersona(p)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '5px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                  className={clsx({ 'active-persona': currentPersona?.id === p.id })}
                >
                  {p.name}
                </button>
              ))}
              {customPersonas.length === 0 && <p style={{fontSize: '0.9em', opacity: 0.7}}>No custom clients yet.</p>}
              <button
                onClick={handleAddNewPersona}
                style={{ display: 'block', width: '100%', textAlign: 'left', padding: '8px 5px', background: 'none', border: 'none', color: '#77b3ff', cursor: 'pointer', marginTop: '10px' }}
              >
                + Add New Client
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="header-title" style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
        Session Ready
      </div>
      <div className="header-right" style={{ display: 'flex', alignItems: 'center' }}>
        <span className="therapist-name" style={{ marginRight: '15px' }}>
          Therapist: {name || 'Guest'}
        </span>
        <button
          onClick={() => setShowUserConfig(true)}
          className="icon-button"
          aria-label="User Settings"
          title="User Settings"
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginRight: '10px', fontSize: '1.5rem' }}
        >
          {/* Placeholder for an icon, e.g., <SettingsIcon /> or <span className="material-icons">settings</span> */}
          ⚙️
        </button>
        <button
          onClick={() => {
            if (currentPersona) {
              setShowAgentEdit(true);
            }
          }}
          className="icon-button"
          disabled={!currentPersona}
          aria-label="Edit Client Persona"
          title="Edit Client Persona"
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem', opacity: currentPersona ? 1 : 0.5 }}
        >
          {/* Placeholder for an icon, e.g., <EditIcon /> or <span className="material-icons">edit</span> */}
          ✏️
        </button>
      </div>
    </header>
  );
}