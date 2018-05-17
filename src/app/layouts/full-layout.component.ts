import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/service/auth.service';
import { IUser } from '../core/models/interface-user';

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

  
  constructor(private authService: AuthService) {     
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
  
}
