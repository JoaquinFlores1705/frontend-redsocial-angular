import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {GLOBAL} from './global';
import {User} from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url:string;
  public identity:User;
  public stats:JSON;
  public token:string;
  
  
  constructor(private httpClient: HttpClient) { 
    this.url = GLOBAL.url;
  }

  register(user:User): Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');

    return this.httpClient.post(`${this.url}/register`, params,{headers:headers});
  }

  signup(user:User, gettoken= null): Observable<any>{
    let params:string;
    let headers = new HttpHeaders().set('Content-Type','application/json');

    if(gettoken != null){
      user.gettoken = gettoken;
    }

    params = JSON.stringify(user);
    return this.httpClient.post(`${this.url}/login`, params,{headers:headers});

  }

  getIdentity():User{
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity != undefined){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem('token');

    if(token != undefined){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  getStats(){
    let stats = JSON.parse(localStorage.getItem('stats'));
    if(stats != undefined){
      this.stats = stats;
    }else{
      this.stats = null;
    }

    return this.stats;
  }

  getCounters(userId = null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
        .set('Authorization', this.getToken());
    if(userId != null){
      return this.httpClient.get(`${this.url}/counters/${userId}`, {headers:headers});
    }else{
      return this.httpClient.get(`${this.url}/counters`, {headers:headers});
    }
  }

  updateUser(user:User): Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json')
        .set('Authorization', this.getToken());
    
    return this.httpClient.put(`${this.url}/update-user/${user._id}`,params, {headers});
  }

  getUsers(page:number = null):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
        .set('Authorization', this.getToken());
    return this.httpClient.get(`${this.url}/users/${page}`, {headers});
  }

  getUser(id:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
        .set('Authorization', this.getToken());
    return this.httpClient.get(`${this.url}/user/${id}`, {headers});
  }
}
