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
  gettAllPosts(): Observable<any> {
    return this.http.get('http://localhost:3000/posts');
  }
  updateLikes(postObj: any): Observable<any> {
    return this.http.put('http://localhost:3000/posts/' + postObj.id, postObj);
  }
  updateComments(postObj: any): Observable<any> {
    return this.http.put('http://localhost:3000/posts/' + postObj.id, postObj);
  }
}
