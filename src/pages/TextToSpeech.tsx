import React from 'react';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from '@ionic/react';
import { Plugins } from '@capacitor/core';
// import {
//   RecordingData,
//   GenericResponse,
//   VoiceRecorder
// } from 'capacitor-voice-recorder';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

export class TextToAudio extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      isRecording: false,
      isPaused: true,
      audioFile: ''
    };
  }

  ttsSpeak() {
    // Import other required libraries
    const fs = require('fs');
    const util = require('util');
    // Creates a client
    const client = new TextToSpeechClient();
    async function quickStart() {
      // The text to synthesize
      const text = 'hello, world!';

      // Construct the request
      const request = {
        input: { text: text },
        // Select the language and SSML voice gender (optional)
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        // select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' }
      };

      // Performs the text-to-speech request
      // const response = await client.synthesizeSpeech(request);
      // Write the binary audio content to a local file
      const writeFile = util.promisify(fs.writeFile);
      // await writeFile('output.mp3', response.audioContent, 'binary');
      console.log('Audio content written to file: output.mp3');
    }
    return quickStart();
  }

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonBackButton defaultHref='/home' />
            </IonButtons>
            <IonTitle>Record Message</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class='ion-padding'>
          <IonButton onClick={() => this.ttsSpeak}>Start Recording</IonButton>
        </IonContent>
      </IonPage>
    );
  }
}
export default TextToAudio;
