/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import cn from 'classnames';

import { memo, ReactNode, useEffect, useRef, useState } from 'react';
import { AudioRecorder } from '../../../lib/audio-recorder';
import ChatInterface from '../ChatInterface';

import { useLiveAPIContext } from '../../../contexts/LiveAPIContext';
import { useUI } from '@/lib/state';

export type ControlTrayProps = {
  children?: ReactNode;
  onEndSession?: () => void;
};

function ControlTray({ children, onEndSession }: ControlTrayProps) {
  const [audioRecorder] = useState(() => new AudioRecorder());
  const [muted, setMuted] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const connectButtonRef = useRef<HTMLButtonElement>(null);

  const { showAgentEdit, showUserConfig } = useUI();
  const { client, connected, connect, disconnect, connecting, config, setPaused, paused } = useLiveAPIContext();

  // Stop the current agent if the user is editing the agent or user config
  useEffect(() => {
    if (showAgentEdit || showUserConfig) {
      if (connected) disconnect();
    }
  }, [showUserConfig, showAgentEdit, connected, disconnect]);

  useEffect(() => {
    if (!connected && connectButtonRef.current) {
      connectButtonRef.current.focus();
    }
  }, [connected]);

  useEffect(() => {
    const onData = (base64: string) => {
      // Don't send audio if paused
      if (!paused) {
        client.sendRealtimeInput([
          {
            mimeType: 'audio/pcm;rate=16000',
            data: base64,
          },
        ]);
      }
    };
    if (connected && !muted && audioRecorder) {
      audioRecorder.on('data', onData).start();
    } else {
      audioRecorder.stop();
    }
    return () => {
      audioRecorder.off('data', onData);
    };
  }, [connected, client, muted, audioRecorder, paused]);

  const handleConnect = async () => {
    try {
      setConnectionError(null);
      console.log('Attempting to connect with config:', config);
      
      if (!config || Object.keys(config).length === 0) {
        console.error('Config is empty or not set');
        setConnectionError('Configuration not ready. Please wait...');
        return;
      }
      
      await connect();
      console.log('Connection successful');
      setPaused(false); // Reset pause state on new connection
    } catch (error) {
      console.error('Connection error:', error);
      setConnectionError(error instanceof Error ? error.message : 'Failed to connect');
    }
  };

  const handlePauseToggle = () => {
    setPaused(!paused);
    if (!paused) {
      // When pausing, send a message to indicate pause
      if (connected) {
        client.send(
          { text: "[System: Session temporarily paused. Please wait.]" },
          true
        );
      }
    } else {
      // When resuming, send a message to continue
      if (connected) {
        client.send(
          { text: "[System: Session resumed. Please continue where we left off.]" },
          true
        );
      }
    }
  };

  return (
    <>
    <section className="control-tray">
      <nav className={cn('actions-nav', { disabled: !connected && !connecting })}>
        <button
          className={cn('action-button mic-button', { disabled: connecting || paused })}
          onClick={() => setMuted(!muted)}
          title={muted ? 'Unmute microphone' : 'Mute microphone'}
          disabled={connecting || paused}
        >
          {!muted ? (
            <span className="material-symbols-outlined filled">mic</span>
          ) : (
            <span className="material-symbols-outlined filled">mic_off</span>
          )}
        </button>
          
        {/* Chat toggle button */}
        <button
          className={cn('action-button', { 'connected': showChat, disabled: connecting })}
          onClick={() => setShowChat(!showChat)}
          title="Toggle chat interface"
          disabled={connecting}
        >
          <span className="material-symbols-outlined">
            {showChat ? 'close' : 'chat'}
          </span>
        </button>
        
        {/* Pause button - only show when connected */}
        {connected && (
          <button
            className={cn('action-button', { 'connected': paused })}
            onClick={handlePauseToggle}
            title={paused ? "Resume AI responses" : "Pause AI responses"}
          >
            <span className="material-symbols-outlined">
              {paused ? 'play_arrow' : 'pause'}
            </span>
          </button>
        )}
          
        {children}
      </nav>

      <div className={cn('connection-container', { connected, connecting })}>
        <div className="connection-button-container">
          <button
            ref={connectButtonRef}
            className={cn('action-button connect-toggle', { connected, connecting })}
            onClick={connected ? disconnect : handleConnect}
            disabled={connecting}
          >
            <span className="material-symbols-outlined filled">
              {connecting ? (
                <span 
                  className="material-symbols-outlined filled animate-spin"
                  style={{ animation: 'spin 1s linear infinite' }}
                >
                  refresh
                </span>
              ) : connected ? (
                'stop'
              ) : (
                'play_arrow'
              )}
            </span>
          </button>
        </div>
        <span className="text-indicator">
          {connectionError ? (
            <span style={{ color: 'var(--Red-500)' }}>{connectionError}</span>
          ) : paused ? (
            <span style={{ color: 'var(--Yellow-500)' }}>Paused</span>
          ) : connecting ? (
            'Connecting...'
          ) : connected ? (
            'Streaming'
          ) : (
            ''
          )}
        </span>
      </div>
    </section>

      {/* Chat Interface */}
      {showChat && <ChatInterface onClose={() => setShowChat(false)} onEndSession={onEndSession} isPaused={paused} />}
    </>
  );
}

export default memo(ControlTray);
