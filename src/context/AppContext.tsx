import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AppContextType {
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  toggleMute: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMutedState] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element globally
    const audio = new Audio('/Warm-Memories-Emotional-Inspiring-Piano(chosic.com).mp3');
    audio.loop = true;
    audio.preload = 'none';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const setIsMuted = (muted: boolean) => {
    setIsMutedState(muted);
    if (audioRef.current) {
      if (muted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.warn('Audio playback failed or was blocked by browser autoplay policy:', err);
          // Revert mute state if blocked
          setIsMutedState(true);
        });
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <AppContext.Provider value={{ isMuted, setIsMuted, toggleMute }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
