import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../core/models/interface-user';
import { MessageBox } from '../../core/models/message-box';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends MessageBox {
  public submitted = false;
  public user: IUser;
  public centerErrorMessage: boolean;

  constructor(private router: Router, private authService: AuthService) {
    super();
    this.centerErrorMessage = true;
    this.showMessage = false;

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
    this.showMessage = false; 

    this.authService.emailSignUp(this.user.displayName, this.user.email, this.user.password)
    .then(response => {      
      this.showMessage = false;
      if(response == true){
         this.router.navigate(['dashboard']);
      }
      
    })
    .catch((error) => {
      //console.log(error);
      this.message = error.message;
      this.messageType = 'error-login';
      this.showMessage = true; 
    });
  }

  // TODO: Remove this when we're done
  get diagnostic() { 
    return JSON.stringify(this.user); 
  }  

  public backToLogin(){
    this.router.navigate(['login']);
  }

}
