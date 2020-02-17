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
  let prop: any = props;
  let sensor: any = prop.sensor;
  let data: any = JSON.parse(sensor.params.data);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/home' />
          </IonButtons>
          <IonTitle>{data.location}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {data.sensor.map((m: any, idx: number) => (
          <IonList key={idx} lines='none'>
            <IonItem>
              <IonLabel>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <p>{m.location}</p>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <p>{m.message}</p>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <p>{m.username}</p>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonLabel>
            </IonItem>
          </IonList>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Details;
