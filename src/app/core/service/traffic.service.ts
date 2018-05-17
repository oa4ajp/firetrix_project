import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Traffic } from '../models/traffic'
import { DailyTraffic } from '../models/daily-traffic'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/elementAt';

@Injectable()
export class TrafficService {

    constructor(
        private rtdb: AngularFireDatabase,
        private router: Router
    ){
    }

    public getTraffic(){
        return this.rtdb.object('traffic').valueChanges<Traffic>();
    }

    public getDailyTraffic(){
        return this.rtdb.list<DailyTraffic>('dailyTraffic').valueChanges<DailyTraffic>();
    }    

}