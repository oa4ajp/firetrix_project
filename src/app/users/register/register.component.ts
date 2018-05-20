import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../core/models/interface-user'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public submitted = false;
  public user: IUser;

  constructor(private router: Router) {
    this.user = {
        uid: '',
        displayName: '',
        email: '',
        password: '',
        photoURL: '',
        online: false,
        roles: {}
      }
   }

  onSubmit() { 
    this.submitted = true; 
  }

  // TODO: Remove this when we're done
  get diagnostic() { 
    return JSON.stringify(this.user); 
  }  

  public backToLogin(){
    this.router.navigate(['login']);
  }

}
