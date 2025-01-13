import { Injectable } from '@angular/core';
// import { Firestore, collection, addDoc } from 'firebase/firestore';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseTestService {
  // constructor() { }
  constructor(private firestore: Firestore) {}

  async testConnection() {
    try {
      const testCollection = collection(this.firestore, 'test');
      const docRef = await addDoc(testCollection, {
        test: true,
        timestamp: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);
      return true;
    } catch (e) {
      console.error('Error testing connection: ', e);
      return false;
    }
  }
}
