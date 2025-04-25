import { useState, useEffect, useCallback } from 'react';

interface UseSpeechRecognitionProps {
  onResult?: (result: string) => void;
  onEnd?: () => void;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

// Type assertion to handle browser compatibility
const SpeechRecognitionAPI = (window.SpeechRecognition || 
                             (window as any).webkitSpeechRecognition) as SpeechRecognitionConstructor | undefined;

export const useSpeechRecognition = ({ onResult, onEnd }: UseSpeechRecognitionProps = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSupported, setIsSupported] = useState(!!SpeechRecognitionAPI);

  useEffect(() => {
    if (!SpeechRecognitionAPI) {
      setErrorMessage('Speech recognition is not supported in this browser');
      setIsSupported(false);
      return;
    }

    const recognitionInstance = new SpeechRecognitionAPI();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.addEventListener('result', (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      
      if (event.results[0].isFinal && onResult) {
        onResult(transcript);
      }
    });

    recognitionInstance.addEventListener('end', () => {
      setIsListening(false);
      if (onEnd) onEnd();
    });

    recognitionInstance.addEventListener('error', (event: any) => {
      setErrorMessage(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    });

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.abort();
      }
    };
  }, [onResult, onEnd]);

  const startListening = useCallback(() => {
    if (!recognition) return;
    
    setErrorMessage('');
    recognition.start();
    setIsListening(true);
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (!recognition) return;
    
    recognition.stop();
    setIsListening(false);
  }, [recognition]);

  return {
    isListening,
    startListening,
    stopListening,
    errorMessage,
    isSupported
  };
};