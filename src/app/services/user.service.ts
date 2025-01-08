import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  public createUser(dataObj:any){
    return this.http.post('http://localhost:3000/users',dataObj)
  }
}
