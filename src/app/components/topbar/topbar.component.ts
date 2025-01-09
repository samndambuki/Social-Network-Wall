import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatMenuModule,MatButtonModule,HttpClientModule],
  providers:[UserService],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  constructor(public userService:UserService,private router:Router){}
  logout(){
    this.userService.user = undefined;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
