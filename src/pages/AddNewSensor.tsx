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
  IonList,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/react';
import axios from 'axios';
import { useTTS } from '../hooks/useTTS';
import { useHistory } from 'react-router-dom';
import find from 'local-devices';
import { mic, square } from 'ionicons/icons';

// TODO: connect with IP

const AddNewSensor: React.FC = props => {
  const [newUsername, setUsername] = useState('');
  const [newLocation, setLocation] = useState('');
  const [newMessage, setMessage] = useState('');
  const [newIp, setIp] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [newIcon, setIcon] = useState('{ mic }');

  const { tts, startRecording, stopRecording } = useTTS();
  const history = useHistory();
  let isRecording: boolean = false;

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

  // change mic icon to square to indcate that it is recording
  const showToggle = () => {
    if (newIcon == '{ mic }') {
      isRecording = true;
      setIcon('{ mic }');
    } else {
      isRecording = false;
      setIcon('{ mic }');
    }
  };

  // TODO: Record Audio
  const RecordAudio = async () => {
    const res = await startRecording();
  };

  // Stop Recording
  const StopRecording = async () => {
    const res = await stopRecording();
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
          <IonButton color='ment'>Record Audio</IonButton>
          <IonButton type='submit' color='ment'>
            Submit Me
          </IonButton>
          <IonButton color='ment' onClick={ScanIP}>
            Scan IP
          </IonButton>
        </form>

        <IonFab horizontal='center' vertical='bottom' className='ion-padding'>
          <IonFabButton color='ment'>
            <IonIcon
              icon={mic}
              onClick={() => {
                startRecording();
                showToggle();
              }}
            />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default AddNewSensor;
