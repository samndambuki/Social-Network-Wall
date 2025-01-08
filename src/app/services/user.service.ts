import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:any;

  constructor(private http:HttpClient) { }

  //public to acces this method outside of this class
  // public createUser(dataObj:any){
  //   return new Promise((resolve,reject)=>{
  //     //post method returns an observable
  //     this.http.post('http://localhost:3000/users',dataObj).subscribe(
  //       //two callback functions as parameters
  //       (res)=>{
  //         resolve(res)
  //       },
  //       (err)=>{
  //         reject(err)
  //       }
  //     )
  //   })
  // }

  public createUser(dataObj:any):Observable<any>{
    return this.http.post('http://localhost:3000/users',dataObj)
  }

  // public getUser(email:string){
  //   return new Promise((resolve,reject)=>{
  //     // http get request will return an observable we need to subscribe
  //     this.http.get('http://localhost:3000/users?email='+email)
  //     //subscribe has two callback functions
  //    .subscribe(
  //     //if response - resove the promise
  //     (res)=>{resolve(res)},
  //     //if error - reject the promise
  //     (err)=>{reject(err)}
  //    )
  //   })
  // }

  public getUser(email:string):Observable<any>{
    return this.http.get('http://localhost:3000/users?email='+email)
  }
}
