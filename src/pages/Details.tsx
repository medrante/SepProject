import React from 'react';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonPage,
  IonContent
} from '@ionic/react';
import { useRouteMatch, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

interface SensorDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

// TODO: show sensor details with edit options
const Details: React.FC<SensorDetailPageProps> = ({ match }) => {
  const getDetails = () => {
    axios
      .get('/locations?ID={match.params.id}')
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/home' />
          </IonButtons>
          <IonTitle>Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        This should show the sensor details along with an edit option
      </IonContent>
    </IonPage>
  );
};

export default Details;
