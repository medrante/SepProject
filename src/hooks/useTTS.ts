import { useSpeak } from '@ionic/react-hooks/accessibility';
import { Plugins } from '@capacitor/core';

// add text to mp3 function (node-gtts or nodtts)
export function useTTS() {
  const { speak } = useSpeak();
  const { Device } = Plugins;

  const tts = async (text: string) => {
    const info = await Device.getInfo();

    if (info.platform == 'ios') {
      alert('Hey!');
    }
    speak({
      value: text
    });
  };

  return {
    tts
  };
}
