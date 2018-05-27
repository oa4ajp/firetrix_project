import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { SocialNetwork } from '../models/social-network'
import { DashboardConstants } from 'app/dashboard/constants/dashboard.constants';

@Injectable()
export class SocialNetworkService {

    constructor(private rtdb: AngularFireDatabase){
    }

    public getSocialNetworks(){
        return this.rtdb.list<SocialNetwork>('socialNetworks').valueChanges<SocialNetwork>();
    }

    public setSocialNetworks(){
        let socialNetworkData: SocialNetwork[] = DashboardConstants.socialNetworkData;

        socialNetworkData.forEach(item => {
            let socialNetworkRef: AngularFireObject<SocialNetwork> = this.rtdb.object(`socialNetworks/${item.code}`);
            socialNetworkRef.set(item);
        });

    }    

}