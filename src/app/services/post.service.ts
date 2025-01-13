import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor() {}
  private http = inject(HttpClient);
  saveNewPost(postObj: any): Observable<any> {
    return this.http.post('http://localhost:3000/posts', postObj);
  }
}
