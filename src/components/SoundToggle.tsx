import React from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, VolumeX } from 'lucide-react';

export const SoundToggle: React.FC = () => {
  const { isMuted, toggleMute } = useApp();

  return (
    <button
      className="sound-toggle"
      onClick={toggleMute}
      aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
  );
};
