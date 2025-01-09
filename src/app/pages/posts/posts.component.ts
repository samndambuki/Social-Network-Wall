import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule,MatCardModule,MatFormFieldModule,CommonModule,MatIconModule,ReactiveFormsModule,MatButtonModule,MatInputModule],
  providers:[UserService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
private userService = inject(UserService);
private router = inject(Router);
constructor(){}
ngOnInit(){
  if(this.userService.user==undefined || this.userService.user==null){
    let str = localStorage.getItem('user');
    if(str!=null){
      this.userService.user = JSON.parse(str);
    }else{
      this.router.navigate(['/login']);
    }
  }
}
}
