import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ppsutn-2ed7e',
        appId: '1:267759925710:web:6381a62635f81bc8bad39f',
        databaseURL: 'https://ppsutn-2ed7e-default-rtdb.firebaseio.com',
        storageBucket: 'ppsutn-2ed7e.appspot.com',
        apiKey: 'AIzaSyDf58JneS7B_Y1oyFvSp2nkbIDguE5lrmU',
        authDomain: 'ppsutn-2ed7e.firebaseapp.com',
        messagingSenderId: '267759925710',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAnimations(), // Agregado correctamente como proveedor independiente
  ],
};
