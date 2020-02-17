import { useState, useEffect } from 'react';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { RecordingData, GenericResponse } from 'capacitor-voice-recorder';

export function useVoiceRecorder() {
  const { VoiceRecorder } = Plugins;

  const useRecorder = async () => {
    VoiceRecorder.canDeviceVoiceRecord().then((result: GenericResponse) =>
      console.log(result.value)
    );

    VoiceRecorder.requestAudioRecordingPermission().then(
      (result: GenericResponse) => console.log(result.value)
    );

    VoiceRecorder.hasAudioRecordingPermission.then((result: GenericResponse) =>
      console.log(result.value)
    );

    /**
     * In case of success the promise will resolve with {"value": true}
     * in case of an error the promise will reject with one of the following messages:
     * "MISSING_PERMISSION", "ALREADY_RECORDING", "CANNOT_RECORD_ON_THIS_PHONE" or "FAILED_TO_RECORD"
     */
    const startRecorder = await VoiceRecorder.startRecording()
      .then((result: GenericResponse) => console.log(result.value))
      .catch((error: any) => console.log(error));
  };
  // will print true / false based on the device ability to record

  /**
   * will prompt the user to give the required permission, after that
   * the function will print true / false based on the user response
   */

  // will print true / false based on the status of the recording permission

  /**
   * In case of success the promise will resolve with:
   * {"value": { recordDataBase64: string, msDuration: number, mimeType: string }},
   * the file will be in *.acc format.
   * in case of an error the promise will reject with one of the following messages:
   * "RECORDING_HAS_NOT_STARTED" or "FAILED_TO_FETCH_RECORDING"
   */

  return {
    useRecorder
  };
}
