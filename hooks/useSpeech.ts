import { useState, useCallback } from 'react';
import { cancelSpeech, createUtterance } from '../utils/speech';

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback((text: string) => {
    if (isSpeaking) {
      cancelSpeech();
      setIsSpeaking(false);
      return;
    }

    const utterance = createUtterance(text, () => setIsSpeaking(false));
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, [isSpeaking]);

  return { speak, isSpeaking };
}