import { useSpeak } from '@ionic/react-hooks/accessibility';

// add text to mp3 function (node-gtts or nodtts)
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
