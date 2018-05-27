import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Traffic } from '../models/traffic'
import { DailyTraffic } from '../models/daily-traffic'

import { Observable } from 'rxjs/Observable';
import Util from '../../core/utils/util';
import { DashboardConstants } from '../constants/dashboard.constants';

@Injectable()
export class TrafficService {

    constructor(private rtdb: AngularFireDatabase){
    }

    public getTraffic(){
        return this.rtdb.object('traffic').valueChanges<Traffic>();
    }

    public setTraffic(){
        const userRef: AngularFireObject<Traffic> = this.rtdb.object('traffic');
        
        const data: Traffic = DashboardConstants.trafficData        
        userRef.set(data); 
    }

    public getDailyTraffic(){
        return this.rtdb.list<DailyTraffic>('dailyTraffic').valueChanges<DailyTraffic>();
    }

    public setDailyTraffic(){
        for( let i = 1; i <= 30; i++){
            let dailyTrafficRef: AngularFireObject<DailyTraffic> = this.rtdb.object(`dailyTraffic/${i}`);
            
            let data: DailyTraffic = {
                'value': Util.randomIntFromInterval(1, 250).toString()
            }
            
            dailyTrafficRef.set(data);  
        }

    }

}