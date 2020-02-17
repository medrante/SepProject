import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCol,
  IonIcon,
  IonLoading,
  IonAvatar,
  useIonViewWillEnter
} from '@ionic/react';
import axios from 'axios';
import * as Sensor from './../api/data.json';

interface ISensor {
  id: string;
  username: string;
  location: string;
  message: string;
}

interface Person {
  name: string;
  email: string;
  position: string;
  photo: string;
}

const API_URL = '../api/data.json';

const Home: React.FC = props => {
  const [sensor, setSensor] = useState<ISensor[]>([]);
  const [people, setPeople] = useState<Person[]>([]);

  useIonViewWillEnter(async () => {
    const result = await fetch('./api/data.json');
    const data = await result.json();
    setSensor(data);
  });

  useIonViewWillEnter(async () => {
    const result = await fetch('https://uifaces.co/api?limit=25', {
      headers: { 'x-API-KEY': '873771d7760b846d51d025ac5804ab' }
    });
    const data = await result.json();
    setPeople(data);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class='ion-text-center'>MENT</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Loading...'}
        /> */}
        <IonList>
          {sensor.map((sensor, idx) => (
            <SensorItem key={idx} sensor={sensor}></SensorItem>
          ))}
          {people.map((person, idx) => (
            <EmployeeItem key={idx} person={person} />
          ))}

          {/* <IonCard routerLink='/home/texttospeech'>
            <IonCardHeader>
              <IonCardTitle>Kitchen</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>Drink more water</IonCardContent>
          </IonCard>

          <IonCard routerLink='/home/texttospeech'>
            <IonCardHeader>
              <IonCardTitle>Bedroom</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>Blow out your candles</IonCardContent>
          </IonCard>
        </IonList>

        <IonList>
          {data.map((res, idx) => (
            <IonItem
              key={idx}
              onClick={() => {
                showDetail(res);
              }}>
              <IonAvatar slot='start'>
                <img src='assets/imgs/mint.jpg' alt='min' />
              </IonAvatar>
              <IonLabel>
                <h2>{res.location}</h2>
                <p>{res.message}</p>
                <p>{res.username}</p>
              </IonLabel>
            </IonItem>
          ))}   */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

const EmployeeItem: React.FC<{ person: Person }> = ({ person }) => {
  return (
    <IonItem>
      <IonAvatar slot='start'>
        <img src={person.photo} />
      </IonAvatar>
      <IonLabel>
        <h2>{person.name}</h2>
        <p>{person.position}</p>
      </IonLabel>
    </IonItem>
  );
};

const SensorItem: React.FC<{ sensor: ISensor }> = ({ sensor }) => {
  return (
    <IonItem>
      <IonCardHeader>
        <IonCardTitle>{sensor.location}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{sensor.message}</p>
      </IonCardContent>
    </IonItem>
  );
};

export default Home;
