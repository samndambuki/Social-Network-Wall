import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule} from '@angular/common';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers:[UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  //Reactive Forms - 2 reactive elements
  //Form Group - one or more form controls
  //Form Control - used for input  elements
  //we use formbuilder to create a form group

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(public userService:UserService,private snackBar:MatSnackBar,private router:Router) {}

//    login(){
//     const email = this.loginForm.value.email ?? '';
//     this.userService.getUser(email).then((res:any)=>{
//       if(res.length==0){
//         // this.snackBar.open('Account does not exist','OK',{duration:2000});
//         this.snackBar.open('Account does not exist', 'OK', { duration: 2000 }).afterDismissed().subscribe(() => {
//           this.router.navigate(['/posts']);
//         });
//         // this.router.navigate(['/posts']);
//       }else{
//         if(res[0].password === this.loginForm.value.password){
//           this.snackBar.open('Login successful','OK',{duration:2000})
//           this.userService.user=res[0];
//         }else{
//           this.snackBar.open('Incorrect password','OK',{duration:2000})
//         }
//     }
      
//  }).catch((err)=>{console.log(err)});}

login() {
  const email = this.loginForm.value.email ?? '';
  this.userService.getUser(email).subscribe(
    (res: any) => {
      if (res.length == 0) {
        this.snackBar.open('Account does not exist', 'OK', { duration: 2000 }).afterDismissed().subscribe(() => {
          this.router.navigate(['/posts']);
        });
      } else {
        if (res[0].password === this.loginForm.value.password) {
          this.snackBar.open('Login successful', 'OK', { duration: 2000 });
          this.userService.user = res[0];
          this.router.navigate(['/posts']);
        } else {
          this.snackBar.open('Incorrect password', 'OK', { duration: 2000 });
        }
      }
    },
    (err) => {
      console.log(err);
    }
  );
}


}
