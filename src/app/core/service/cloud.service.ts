import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions  } from '@angular/http';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { IUser } from '../models/interface-user'
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/elementAt';

@Injectable()
export class CloudService {
    private url: string;
    private apiUrl: string;

    constructor(private http: Http)  {
        this.url = environment.apiUrl;
        this.apiUrl = environment.firebase.authDomain;
    }

    public autoDestruction(){
        return this.http.get(`https://${this.apiUrl}/api/autoDestruction`);
    }

    public updateSocialNetworks(){
        return this.http.get(`${this.url}/updateSocialNetworks`);
    }

    public updateDailyTraffic(){
        return this.http.get(`${this.url}/updateDailyTraffic`);
    }
    
    public updateTraffic(){
        return this.http.get(`${this.url}/updateTraffic`);
    }    

    public updateSalesTraffic(){
        return this.http.get(`${this.url}/updateSalesTraffic`);
    }
    
    public updateProducts(){
        return this.http.get(`${this.url}/updateProducts`);
    }

    public updateSalesByDay(){
        return this.http.get(`${this.url}/updateSalesByDay`);
    }
    
}