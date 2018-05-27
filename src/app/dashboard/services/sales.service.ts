
import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { SalesTraffic }     from '../models/sales-traffic'
import { SalesByDay }       from '../models/sales-by-day'
import { SalesByGender }    from '../models/sales-by-gender'
import { SalesByOrigin }    from '../models/sales-by-origin'
import { Product }          from '../models/product'

import { Observable } from 'rxjs/Observable'
import { DashboardConstants } from '../constants/dashboard.constants';

@Injectable()
export class SalesService {

    constructor(private rtdb: AngularFireDatabase){
    }

    public getSalesTraffic(){
        return this.rtdb.list<SalesTraffic>('salesTraffic').valueChanges<SalesTraffic>();
    }

    public setSalesTraffic(){
        const salesTrafficData: SalesTraffic[] = DashboardConstants.salesTrafficData;       
        
        salesTrafficData.forEach(item => {
            let salesTrafficRef: AngularFireObject<SalesTraffic> = this.rtdb.object(`salesTraffic/${item.code}`);
            salesTrafficRef.set(item);
        });
    }      

    public getSalesByDay(){
        return this.rtdb.list<SalesByDay>('salesByDay').valueChanges<SalesByDay>();
    }

    public setSalesByDay(){
        const salesByDayData: SalesByDay[] =  DashboardConstants.salesByDayData;       
        
        salesByDayData.forEach(item => {
            let salesTrafficRef: AngularFireObject<SalesByDay> = this.rtdb.object(`salesByDay/${item.code}`);
            salesTrafficRef.set(item);
        });        
    }       

    public getSalesByGender(){
        return this.rtdb.object<SalesByGender>('salesByGender').valueChanges<SalesByGender>();
    }

    public setSalesByGender(){
        const salesByGenderData: SalesByGender = {
            'female': '37',
            'male': '43'
        };        
        
        let salesTrafficRef: AngularFireObject<SalesByGender> = this.rtdb.object(`salesByGender`);
        salesTrafficRef.set(salesByGenderData);
    }    

    public getSalesByOrigin(){
        return this.rtdb.list<SalesByOrigin>('salesByOrigin').valueChanges<SalesByOrigin>();
    }

    public setSalesByOrigin(){
        let salesByOriginData: SalesByOrigin[] = DashboardConstants.salesByOriginData;
        
        salesByOriginData.forEach(item => {
            let salesByOriginRef: AngularFireObject<SalesByOrigin> = this.rtdb.object(`salesByOrigin/${item.code}`);
            salesByOriginRef.set(item);
        });

    }    

    public getProducts(){
        return this.rtdb.list<Product>('products').valueChanges<Product>();
    }

    public setProducts(){
        let productsData: Product[] = DashboardConstants.productsData;
        
        productsData.forEach(item => {
            let productsRef: AngularFireObject<Product> = this.rtdb.object(`products/${item.code}`);
            productsRef.set(item);
        });        

    }       

}