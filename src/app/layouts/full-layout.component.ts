import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/service/auth.service';
import { IUser } from '../core/models/interface-user';
import { CloudService } from '../core/service/cloud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
  public userDisplayName: string = '';
  public userPhotoUrl: string = '';
  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};  
  public loggedUser: IUser;
  
  constructor(private authService: AuthService, private cloudService: CloudService) {     
  }

  ngOnInit(): void {
    this.userDisplayName = '';
    this.userPhotoUrl = '';

    this.authService.user.subscribe(user => {
      if(user){
        this.userDisplayName = `Welcome, ${user.displayName}`;
        this.userPhotoUrl = user.photoURL;
        this.loggedUser = user;
      }
    });
  }

  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  logout() {
    this.authService.signOut(this.loggedUser);
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

}
