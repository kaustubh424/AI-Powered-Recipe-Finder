export function cancelSpeech(): void {
  window.speechSynthesis.cancel();
}

export function createUtterance(text: string, onEnd?: () => void): SpeechSynthesisUtterance {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 1;
  if (onEnd) {
    utterance.onend = onEnd;
  }
  return utterance;
}