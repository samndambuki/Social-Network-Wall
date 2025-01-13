import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { TopbarComponent } from './components/topbar/topbar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseTestService } from './services/firebase-test.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopbarComponent, RouterModule, HttpClientModule],
  providers: [FirebaseTestService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  constructor(private firebaseTest: FirebaseTestService) {
    this.testFirebase();
  }

  async testFirebase() {
    const result = await this.firebaseTest.testConnection();
    console.log('Firebase connection test:', result ? 'SUCCESS' : 'FAILED');
  }
}
