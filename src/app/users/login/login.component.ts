import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { MessageBox } from '../../core/models/message-box';
import { Constants } from '../../core/constants/constants';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends MessageBox implements OnInit, DoCheck {
  user: any = {};
  centerErrorMessage: boolean;
  isSpinnerVisible: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) 
  {
    super();
    this.user.username = '';
    this.user.password = '';
    this.isSpinnerVisible = false;    
  }
  ngOnInit() {    
    this.isUserLogged();        
  }
  ngDoCheck() {
  }

  login() {
    if(this.user.username.trim() === "" || this.user.password.trim() === "") {
      this.message = Constants.MESSAGE_USER_AND_PWD_REQUIRED;
      this.messageType = 'error-login';
      this.showMessage = true;
      this.centerErrorMessage = true;

    }else {  
      this.isSpinnerVisible = true;
      this.showMessage = false;
            
      //this.authService.emailSignUp(this.user.username, this.user.password);
      
      const encodedPassword = encodeURIComponent(this.user.password);
      
      this.authService.emailLogin(this.user.username, encodedPassword).then( 
      (response) => {
          if (response) {            
            //console.log(response);        
            this.authService.updateUserData(response);
        
            this.isSpinnerVisible = false;            
            this.router.navigate(['/dashboard']);   
          }
      }, error => {
        this.handleError(error);
      });      
    }       
  }

  private handleError(error: Error) {
    //console.error(error);
    this.isSpinnerVisible = false; 
    this.message = error.message;
    this.messageType = 'error-login';
    this.showMessage = true;
    this.centerErrorMessage = true;
  }

  keyPressLogin(event: KeyboardEvent) {
    if (event.charCode === 13) {
      this.login();
    }
  }

  public isUserLogged(){
    this.authService.user.subscribe( user => {
      if(user){
         this.router.navigate(['dashboard']);
      }
    });

  }

  public signInWithGoogle() {
    this.authService.googleLogin()
    .then(() => this.afterSignIn())
    .catch((error) => this.handleError(error) );
  }

  public signInWithFacebook() {
    this.authService.facebookLogin().then(() => this.afterSignIn())
    .catch((error) => this.handleError(error) );
  }

  public signInWithGithub(){
    this.authService.githubLogin()
    .then(() => this.afterSignIn())
    .catch((error) => this.handleError(error) );
  }

  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    this.router.navigate(['dashboard']);
  }

  public registerUser(){
    this.router.navigate(['register']);
  }


}
