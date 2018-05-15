import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
  public userDisplayName: string = '';
  
  constructor(private authService: AuthService) { 
    this.userDisplayName = '';
  }

  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};

  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if(user){
        this.userDisplayName = `Welcome, ${user.displayName}`;
      }
    });
  }

  logout() {
    this.authService.signOut();
  }
  
}
