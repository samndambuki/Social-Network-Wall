import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { PostService } from '../../services/post.service';
import { SupabaseService } from '../../services/supabase.service';

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
    CommonModule,
    FormsModule,
  ],
  providers: [UserService, PostService, SupabaseService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  public postService = inject(PostService);
  public supabaseService = inject(SupabaseService);
  constructor() {
    this.testSupabase();
  }
  ngOnInit() {
    if (this.userService.user == undefined || this.userService.user == null) {
      let str = localStorage.getItem('user');
      if (str != null) {
        this.userService.user = JSON.parse(str);
      } else {
        this.router.navigate(['/login']);
      }
    }
    this.postService.gettAllPosts().subscribe({
      next: (res) => {
        this.posts = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  selectedFile: any;
  text = '';
  posts: Array<any> = [];

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  //post supabase
  async post() {
    try {
      let imageUrl = '';
      if (this.selectedFile) {
        imageUrl = await this.supabaseService.uploadImage(this.selectedFile);
      }

      const postObj = {
        username: this.userService.user.username,
        text: this.text,
        imageUrl,
        likes: [],
        comments: [],
      };

      this.posts.push(postObj);
      this.postService.saveNewPost(postObj).subscribe({
        next: (res) => {
          console.log('Post created successfully:', res);
          this.text = '';
          this.selectedFile = null;
        },
        error: (err) => {
          console.error('Error creating post:', err);
          this.posts.pop();
        },
      });
    } catch (error) {
      console.error('Error in post creation:', error);
    }
  }
  async testSupabase() {
    const isConnected = await this.supabaseService.testConnection();
    console.log('Supabase connection status:', isConnected);
  }
}
