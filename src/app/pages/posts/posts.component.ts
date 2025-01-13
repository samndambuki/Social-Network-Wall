import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  StorageModule,
} from '@angular/fire/storage';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MaterialFileInputModule,
    StorageModule,
  ],
  providers: [UserService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  private storage = inject(Storage);
  constructor() {}
  ngOnInit() {
    if (this.userService.user == undefined || this.userService.user == null) {
      let str = localStorage.getItem('user');
      if (str != null) {
        this.userService.user = JSON.parse(str);
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
  selectedFile: any;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  uploadImage() {
    return new Promise((resolve, reject) => {
      let n = Date.now();
      const file = this.selectedFile;
      const filePath = `images/${n}`;
      const storageRef = ref(this.storage, filePath);
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            console.log(url);
            resolve(url);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  post() {
    if (this.selectedFile != undefined || this.selectedFile != null) {
      this.uploadImage()
        .then((imageURL) => {
          console.log(imageURL);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
