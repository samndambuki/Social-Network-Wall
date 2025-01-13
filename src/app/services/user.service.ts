import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: any;

  constructor(private http: HttpClient) {}

  public createUser(dataObj: any): Observable<any> {
    return this.http.post('http://localhost:3000/users', dataObj);
  }

  public getUser(email: string): Observable<any> {
    return this.http.get('http://localhost:3000/users?email=' + email);
  }
}
