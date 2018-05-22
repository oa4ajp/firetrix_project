import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { IRandomData } from '../models/interface-random-data';


@Injectable()
export class RandomDataService {

    public notLoggedData: Observable<IRandomData | null>;
    private dataTypeCodes: string[] = ['Logged', 'Anonymous', 'NotLogged'];

    constructor
    (
        private rtdb: AngularFireDatabase,
        private router: Router
    ){
        this.notLoggedData = this.rtdb.object(`randomData/${this.dataTypeCodes[2]}`).valueChanges();
    }

    //Call this method to generate the dada model on the Real time Database.
    //Call on init
    public generateRandomData(){
        

        const loggedData: IRandomData = {
            type: this.dataTypeCodes[0],
            numberList: [this.randomIntFromInterval(1, 100), this.randomIntFromInterval(1, 100)], 
            dateList: [this.randomDate(1,30), this.randomDate(30,60)],
            booleanList: [this.randomBoolean(), this.randomBoolean()]        
         }; 

        const anonymousData: IRandomData = {
            type: this.dataTypeCodes[1],
            numberList: [this.randomIntFromInterval(1, 100)],
            dateList: [this.randomDate(1,30)],
            booleanList: [this.randomBoolean()]        
         };          

        const notLoggedData: IRandomData = {
            type: this.dataTypeCodes[2],
            numberList: [this.randomIntFromInterval(1, 100)], 
            dateList: [],
            booleanList: []        
         };  

        this.rtdb.database.ref(`randomData/${this.dataTypeCodes[0]}`).set(loggedData);
        this.rtdb.database.ref(`randomData/${this.dataTypeCodes[1]}`).set(anonymousData);
        this.rtdb.database.ref(`randomData/${this.dataTypeCodes[2]}`).set(notLoggedData);
        
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