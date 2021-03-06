import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {GLOBAL} from './global';
import {Follow} from '../models/follow';


@Injectable({
  providedIn: 'root'
})
export class FollowService {
  public url:string;

  constructor(
    private httpClient: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  addFollow(token:string,follow:Follow): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
        .set('Authorization', token);
    let params = JSON.stringify(follow);
    return this.httpClient.post(`${this.url}/follow`,params,{headers});
  }

  deleteFollow(token:string, id:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
        .set('Authorization', token);
    return this.httpClient.delete(`${this.url}/follow/${id}`,{headers});
  }

  getFollowing(token:string, userId:string = null, page:number = 1 ): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
    .set('Authorization', token);
    let url = `${this.url}/following`;
    
    if(userId != null){
      url = `${this.url}/following/${userId}/${page}`;
    }
    return this.httpClient.get(url,{headers});
  }

  getFollowed(token:string, userId:string = null, page:number = 1 ): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
    .set('Authorization', token);
    let url = `${this.url}/followed`;
    
    if(userId != null){
      url = `${this.url}/followed/${userId}/${page}`;
    }
    return this.httpClient.get(url,{headers});
  }

  getMyFollows(token:string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
        .set('Authorization', token);
    return this.httpClient.get(`${this.url}/get-my-follows/true`,{headers});
  }

}
