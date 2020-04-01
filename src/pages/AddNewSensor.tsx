import React, { useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonInput,
  IonLabel,
  IonList
} from '@ionic/react';
import axios from 'axios';
import { useTTS } from '../hooks/useTTS';
import { useHistory } from 'react-router-dom';
import find from 'local-devices';
import { RecordingData, GenericResponse } from 'capacitor-voice-recorder';
import { Plugins } from '@capacitor/core';

// TODO: connect with IP

const AddNewSensor: React.FC = props => {
  const [newUsername, setUsername] = useState('');
  const [newLocation, setLocation] = useState('');
  const [newMessage, setMessage] = useState('');
  const [newIp, setIp] = useState('');

  const [formErrors, setFormErrors] = useState({});

  const { tts } = useTTS();
  const history = useHistory();
  const { VoiceRecorder } = Plugins;

  const onSubmit = async () => {
    try {
      axios
        .post('/locations', {
          username: newUsername,
          location: newLocation,
          message: newMessage,
          IP: newIp
        })
        .then(res => {
          console.log(res.data);
        });

      tts(newMessage);
      alert('SUCCESS');
    } catch (e) {
      setFormErrors(e);
    }
    setUsername('');
    setLocation('');
    setMessage('');
    history.push('/');
  };
  // TODO: Add IP Scanner
  const ScanIP = () => {
    find().then(devices => {
      alert(devices);
    });
  };

  // TODO: Record Audio
  const RecordAudio = () => {
    VoiceRecorder.startRecording().then((result: GenericResponse) =>
      console.log(result.value)
    );

    VoiceRecorder.stopRecording().then((result: RecordingData) =>
      console.log(result.value)
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/home' />
          </IonButtons>
          <IonTitle>
            <p>Add New Sensor</p>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit();
          }}>
          <IonList>
            <IonItem>
              <IonLabel>username</IonLabel>
              <IonInput
                name='username'
                value={newUsername}
                onIonChange={(e: any) => setUsername(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>location</IonLabel>
              <IonInput
                name='location'
                value={newLocation}
                onIonChange={(e: any) => setLocation(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>message</IonLabel>
              <IonInput
                name='message'
                value={newMessage}
                onIonChange={(e: any) => setMessage(e.target.value)}
              />
            </IonItem>
          </IonList>
          <IonButton color='ment' onClick={RecordAudio}>
            Record Audio
          </IonButton>
          <IonButton type='submit' color='ment'>
            Submit Me
          </IonButton>
          <IonButton color='ment' onClick={ScanIP}>
            Scan IP
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddNewSensor;
