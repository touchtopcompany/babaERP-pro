import { useCallback, useEffect, useRef, useState } from 'react';
import wmaSound from '@/assets/audio/wma-sound.mp3';

export function useAudioNotification() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const lastPlayTimeRef = useRef<number>(0);
  const debounceMs = 1000;

  /**
   * Initialize the audio element
   */
  const initializeAudio = useCallback(() => {
    if (isInitialized) return;

    try {
      const audio = new Audio(wmaSound);
      audio.preload = 'auto';
      audio.volume = 0.7;

      audio.addEventListener('error', (e) => {
        console.error('Failed to load notification audio:', e);
      });

      audioRef.current = audio;
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize audio notification:', error);
    }
  }, [isInitialized]);

  /**
   * Detect if the current tab is active
   */
  const isTabActive = useCallback(() => {
    return document.hasFocus() && !document.hidden;
  }, []);

  /**
   * Play notification sound
   */
  const playNotificationSound = useCallback(() => {
    const now = Date.now();

    if (now - lastPlayTimeRef.current < debounceMs) {
      console.log('Audio notification debounced (played recently)');
      return;
    }

    if (!isTabActive()) {
      console.log('Tab is not active, skipping audio notification');
      return;
    }

    initializeAudio();
    const audio = audioRef.current;

    if (!audio) {
      console.warn('Audio not initialized, cannot play notification sound');
      return;
    }

    try {
      lastPlayTimeRef.current = now;
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.error('Failed to play notification sound:', error);
      });
    } catch (error) {
      console.error('Error playing notification sound:', error);
    }
  }, [initializeAudio, isTabActive]);

  /**
   * Set volume (0.0 to 1.0)
   */
  const setVolume = useCallback((volume: number) => {
    const audio = audioRef.current;
    if (audio && volume >= 0 && volume <= 1) {
      audio.volume = volume;
    }
  }, []);

  /**
   * Cleanup resources
   */
  const cleanup = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    }
    setIsInitialized(false);
  }, []);

  /**
   * Clean up on unmount
   */
  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return {
    playNotificationSound,
    setVolume,
    cleanup,
    isInitialized
  };
}
