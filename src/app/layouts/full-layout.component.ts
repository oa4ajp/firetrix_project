import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../core/service/auth.service';
import { IUser } from '../core/models/interface-user';
import { CloudService } from '../core/service/cloud.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit, OnDestroy {
  public userDisplayName: string = '';
  public userPhotoUrl: string = '';
  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};  
  public loggedUser: IUser;
  public subscriptionUser: Subscription;
  
  constructor(
    private authService: AuthService, 
    private cloudService: CloudService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userDisplayName = '';
    this.userPhotoUrl = '';

    this.subscriptionUser = this.authService.user.subscribe(user => {
      if(user){
        this.userDisplayName = `Welcome, ${user.displayName}`;
        this.userPhotoUrl = user.photoURL;
        this.loggedUser = user;
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscriptionUser.unsubscribe();
  }    

  logout() {
    this.authService.signOut(this.loggedUser);
  }

  public autodestruction(){
    this.cloudService.autoDestruction().subscribe( response => {
       this.logout();
    });
  }
  
  public updateSocialNetworks(){
    let subscription = this.cloudService.updateSocialNetworks().subscribe();
    //Verify the subscription is closed automatically
    /*
    window.setTimeout(() => {
      console.log("1 isUnsubscribed", subscription.closed);
    }, 4000 );
    */
  }

  public updateDailyTraffic(){
    this.cloudService.updateDailyTraffic().subscribe();
  }

  public updateTraffic(){
    this.cloudService.updateTraffic().subscribe();    
  }

  public updateSalesTraffic(){
    this.cloudService.updateSalesTraffic().subscribe();    
  }

  public updateProducts(){
    this.cloudService.updateProducts().subscribe();
  }

  public updateSalesByDay(){
    this.cloudService.updateSalesByDay().subscribe();    
  }   

  public updateSalesByOrigin(){
    this.cloudService.updateSalesByOrigin().subscribe();    
  }              

}
