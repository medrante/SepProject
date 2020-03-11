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
import { Plugins } from '@capacitor/core';
import axios from 'axios';
import { useFileStorage } from '../hooks/useFileStorage';
import { useTTS } from '../hooks/useTTS';
//import { TextToSpeech } from '@ionic-native/text-to-speech';

const AddNewSensor: React.FC = props => {
  const [newUsername, setUsername] = useState('');
  const [newLocation, setLocation] = useState('');
  const [newMessage, setMessage] = useState('');

  const [formErrors, setFormErrors] = useState({});

  const { saveToFile } = useFileStorage();
  const { tts } = useTTS();

  /*   const onSubmit = () => {
    try {
      axios
        .post('/locations', {
          username: newUsername,
          location: newLocation,
          message: newMessage
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
  }; */

  const onSubmit = async () => {
    const newSensor = {
      username: newUsername,
      location: newLocation,
      message: newMessage
    };
    // await saveToFile(newSensor);
    tts(newMessage);
    alert('SUCCESS');
    setUsername('');
    setLocation('');
    setMessage('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/home' />
          </IonButtons>
          <IonTitle>Add New Sensor</IonTitle>
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
          <IonButton type='submit' color='secondary'>
            Submit Me
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddNewSensor;
