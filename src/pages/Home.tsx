import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonList,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButtons,
  IonButton,
  IonFooter,
  IonFab,
  IonFabButton
} from '@ionic/react';
import { Link, match } from 'react-router-dom';
import axios from 'axios';
import { addCircle } from 'ionicons/icons';
import { useFileStorage } from '../hooks/useFileStorage';
import ment from '../theme/ment.png';

export interface ISensor {
  username: string;
  location: string;
  message: string;
  id: number;
  IP: string;
}

//TODO: Edit page

const Home: React.FC = props => {
  const [sensor, setSensor] = useState<ISensor[]>([]);

  useEffect(() => {
    axios.get('/locations').then(({ data }) => setSensor(data));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div>Home</div>
          </IonTitle>
        </IonToolbar>
        <IonFab horizontal='end' vertical='center' slot='fixed' edge>
          <IonFabButton color='light'>
            <img src={ment} />
          </IonFabButton>
        </IonFab>
      </IonHeader>

      <IonContent fullscreen className='ion-padding'>
        <IonList>
          {sensor.map((sensor, idx) => (
            <Link to={`/home/details/${sensor.id}`}>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    {sensor.location} (ID: {sensor.id})
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>{sensor.message}</IonCardContent>
              </IonCard>
            </Link>
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

export default Home;
