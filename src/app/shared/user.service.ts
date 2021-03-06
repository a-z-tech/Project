import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    firstName: '',
    lastName: '',
    contactnumber: '',
    email: '',
    password: '' 
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }
  //Http Method

  postUser(user: User){
    return this.http.post(environment.apibaseUrl+'/register',user,this.noAuthHeader);
  }
  login(authCredentials) {
    return this.http.post(environment.apibaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }
  getUserProfile() {
    return this.http.get(environment.apibaseUrl + '/userProfile');
  }
  
// helper method
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
