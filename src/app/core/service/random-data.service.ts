import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { IRandomData } from '../models/interface-random-data';


@Injectable()
export class RandomDataService {
    public randomData: Observable<IRandomData | null>;

    constructor
    (
        private rtdb: AngularFireDatabase,
        private router: Router
    ){
        this.randomData = this.rtdb.object('randomData').valueChanges();     
    }

    //Call this method to generate the dada model on the Real time Database.
    //Call on init
    public generateRandomData(){    
        const data: IRandomData = {
            numberList: [this.randomIntFromInterval(1, 100), this.randomIntFromInterval(1, 100)], 
            dateList: [this.randomDate(1,30), this.randomDate(30,60)],
            booleanList: [this.randomBoolean(), this.randomBoolean()]        
         }; 

        this.rtdb.database.ref(`randomData`).set(data);

    }

    public randomIntFromInterval(min, max){
        return Math.floor(Math.random()*(max-min+1)+min);   
    } 

    public randomBoolean(){
        const min = 0; 
        const max = 1;
        const intValue = Math.floor(Math.random()*(max-min+1)+min);

        return Boolean(intValue);
    } 

    public randomDate(min, max){
        const intValue = Math.floor(Math.random()*(max-min+1)+min);
        let randomDate:Date =  this.addDays(new Date(), intValue);        
        return randomDate.toISOString();
    }     

    public addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

}