import { useSpeak } from '@ionic/react-hooks/accessibility';
import { TextToSpeech } from '@ionic-native/text-to-speech';

export function useTTS() {
  const { speak } = useSpeak();

  const tts = async (text: string) => {
    speak({
      value: text
    });
  };

  return {
    tts
  };
}
