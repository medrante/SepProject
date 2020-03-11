import React, { useState, useEffect } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonList,
  IonItem,
  IonPage
} from '@ionic/react';

const Details: React.FC = props => {
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
    </IonPage>
  );
};

export default Details;
