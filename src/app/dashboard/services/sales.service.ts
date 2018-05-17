
import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { SalesTraffic }     from '../models/sales-traffic'
import { SalesByDay }       from '../models/sales-by-day'
import { SalesByGender }    from '../models/sales-by-gender'
import { SalesByOrigin }    from '../models/sales-by-origin'
import { Product }          from '../models/product'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/elementAt';

@Injectable()
export class SalesService {

    constructor(private rtdb: AngularFireDatabase){
    }

    public getSalesTraffic(){
        return this.rtdb.list<SalesTraffic>('salesTraffic').valueChanges<SalesTraffic>();
    }    

    public getSalesByDay(){
        return this.rtdb.list<SalesByDay>('salesByDay').valueChanges<SalesByDay>();
    }      

    public getSalesByGender(){
        return this.rtdb.object<SalesByGender>('salesByGender').valueChanges<SalesByGender>();
    }

    public getSalesByOrigin(){
        return this.rtdb.list<SalesByOrigin>('salesByOrigin').valueChanges<SalesByOrigin>();
    }

    public getProducts(){
        return this.rtdb.list<Product>('products').valueChanges<Product>();
    }    

}