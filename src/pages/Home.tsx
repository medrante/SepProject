import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  useIonViewWillEnter,
  IonFab,
  IonFabButton,
  IonButtons,
  IonButton,
  IonFooter,
  IonCardSubtitle
} from '@ionic/react';
import axios from 'axios';
import { addCircle } from 'ionicons/icons';
import { useFileStorage } from '../hooks/useFileStorage';

export interface ISensor {
  username: string;
  location: string;
  message: string;
  id: number;
}

// const { displayDetails } = goToDetails();

const Home: React.FC = props => {
  const [sensor, setSensor] = useState<ISensor[]>([]);

  const { saveToFile, getContents } = useFileStorage();

  useEffect(() => {
    axios.get('/locations').then(({ data }) => setSensor(data));
  }, []);

  // Initialize new file

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {sensor.map((sensor, idx) => (
            <SensorItem key={idx} sensor={sensor} />
          ))}
        </IonList>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButtons slot='end'>
            <IonButton routerLink='/addnewsensor'>
              <IonIcon slot='icon-only' icon={addCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

const SensorItem: React.FC<{ sensor: ISensor }> = ({ sensor }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          {sensor.location} (ID: {sensor.id})
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{sensor.message}</IonCardContent>
    </IonCard>
  );
};

export default Home;
