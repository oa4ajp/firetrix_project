import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthorizationService {

  private authUrl = ``;
  private userInfoUrl = ``;

  constructor(private router: Router, private http: Http) { }

  public login(username: string, password: string) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options: RequestOptionsArgs =
      {
        headers: headers,
        body: `grant_type=password&username=${username}&password=${password}`,
        method: 'post'
      };

      return this.http.post(this.authUrl, {}, options)
      .map( result => {
          return result.json();
      })
    
  }

  public getUserInformationFromToken() {
    const userToken = localStorage.getItem('user-token');    

    let tokenType: string = JSON.parse(userToken || '{}').type;
    let accessToken: string = JSON.parse(userToken || '{}').token;
    let authorization: string = tokenType + ' ' + accessToken 

    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `${authorization}`  });	  
    const options: RequestOptionsArgs =
      {
        headers: headers,
        method: 'post'
      };

      return this.http.post(this.userInfoUrl, {}, options)
      .map( result => {
          return result.json();
      })

  }


  public getToken(): string {
    const user = localStorage.getItem('user');
    return JSON.parse(user || '{}').token;
  }

  public isUserLogged() {
    return localStorage.getItem('user') ? true : false;
  }

  public logout() {    
    localStorage.removeItem('user-token');
    localStorage.removeItem('user'); 
    this.router.navigate((['login']));
  }

  public getUserLogged(): User {
    const user = localStorage.getItem('user');
    return JSON.parse(user || '{}');
  }

  private handleError(data: any) {
    const error = JSON.parse(data._body);
    console.error('Error: ', error.error_description);
    return error.error_description;
  }

  public getAuthorizationToken(){
    const userToken = localStorage.getItem('user-token');    
    let tokenType: string = JSON.parse(userToken || '{}').type;
    let accessToken: string = JSON.parse(userToken || '{}').token;
    let authorizationToken = tokenType + ' ' + accessToken;
    return authorizationToken;      
  }

}

