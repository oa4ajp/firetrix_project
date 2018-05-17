import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { SocialNetwork } from '../models/social-network'

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/elementAt';

@Injectable()
export class SocialNetworkService {

    constructor(
        private rtdb: AngularFireDatabase,
        private router: Router
    ){
    }

    public getSocialNetworks(){
        return this.rtdb.list<SocialNetwork>('socialNetworks').valueChanges<SocialNetwork>();
    }

}