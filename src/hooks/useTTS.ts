import { useSpeak } from '@ionic/react-hooks/accessibility';
import { useState, useEffect } from 'react';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import {
  Plugins,
  FilesystemDirectory,
  Capacitor,
  FilesystemEncoding
} from '@capacitor/core';
import { RecordingData, GenericResponse } from 'capacitor-voice-recorder';

/* will be used to save the  file */
export interface AudioFile {
  filepath: string;
  base64?: string;
}

/* fix: need to implement voice recording:
 ** https://bitbucket.org/tchvu3/capacitor-voice-recorder/src/master/
 */

/* constant variable that will act as the key for the store */
const FILE_STORAGE_KEY = 'audioFiles';

// add text to mp3 function (node-gtts or nodtts)
export function useTTS() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);

  const { speak } = useSpeak();
  const { Device, VoiceRecorder, Filesystem } = Plugins;
  const { get, set } = useStorage();

  /* This is the text to speech implementation */
  const tts = async (text: string) => {
    const info = await Device.getInfo();

    /* Need this to implement for ios; tts plugin only works on browser for now */
    if (info.platform == 'ios') {
      console.log('In an ios device!!');
    }
    speak({
      value: text
    });
  };

  /* retreive data when hook loads */
  useEffect(() => {
    const loadSaved = async () => {
      const fileString = await get('audioFiles');
      const audioFiles = (fileString
        ? JSON.parse(fileString)
        : []) as AudioFile[];
      for (let audioFile of audioFiles) {
        const file = await Filesystem.readFile({
          path: audioFile.filepath,
          directory: FilesystemDirectory.Data
        });
        audioFile.base64 = `data:audio/aac;base64,${file.data}`;
      }
      setAudioFiles(audioFiles);
    };
    loadSaved();
  }, [get, Filesystem.readFile]);

  // implement voiceRecorder
  const startRecording = async () => {
    VoiceRecorder.startRecording()
      .then((result: GenericResponse) => console.log(result.value))
      .catch((error: any) => console.log(error));
  };

  /* stop recording
   ** const fileName = new Date().getTime() + '.acc';
   */
  const stopRecording = async () => {
    const result = await VoiceRecorder.stopRecording();
    const fileName = new Date().getTime() + '.jpeg';
    const newAudioFiles = [
      {
        filepath: fileName
      },
      ...audioFiles
    ];
    const res = await saveRecording(result, fileName);
    console.log('Successfully saved audio file');
    setAudioFiles(newAudioFiles);
    console.log(res);

    set(
      FILE_STORAGE_KEY,
      isPlatform('hybrid')
        ? JSON.stringify(newAudioFiles)
        : JSON.stringify(
            newAudioFiles.map(p => {
              // Don't save the base64 representation of the photo data,
              // since it's already saved on the Filesystem
              const fileCopy = { ...p };
              delete fileCopy.base64;
              return fileCopy;
            })
          )
    );
  };

  /* save recording to device */
  const saveRecording = async (audioFile: RecordingData, fileName: string) => {
    const base64Data = audioFile.value.recordDataBase64;
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });
    return getAudioFile(audioFile, fileName);
  };

  /*  return audio filename */
  const getAudioFile = async (
    audioFile: RecordingData,
    fileName: string
  ): Promise<AudioFile> => {
    return {
      filepath: fileName
    };
  };

  const saveToFile = async (inputData: string) => {
    await Filesystem.writeFile({
      path: 'data/data.json',
      data: inputData,
      directory: FilesystemDirectory.Data,
      encoding: FilesystemEncoding.UTF8
    });
  };

  const mkDir = async () => {
    try {
      await Filesystem.mkdir({
        path: 'secrets',
        directory: FilesystemDirectory.Data,
        recursive: false // like mkdir -p
      });
      console.log('Made directory');
    } catch (e) {
      console.error('Unable to make directory', e);
    }
  };

  const createFile = async () => {
    try {
      await mkDir();
      await Filesystem.writeFile({
        path: 'data/data.json',
        data: '[]',
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8
      });
      console.log('created file');
    } catch (e) {
      console.error('Unable to write file', e);
    }
  };

  const getContents = async () => {
    let contents = await Filesystem.readFile({
      path: 'data/data.json',
      directory: FilesystemDirectory.Data,
      encoding: FilesystemEncoding.UTF8
    });
    console.log(contents);
  };

  return {
    audioFiles,
    tts,
    startRecording,
    stopRecording,
    getContents
  };
}
