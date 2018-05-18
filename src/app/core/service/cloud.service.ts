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

    constructor(private http: Http)  {
        this.url = environment.apiUrl;
    }

    public updateSocialNetworks(){
        return this.http.get(`${this.url}/updateSocialNetworks`).toPromise();
    }
    
}