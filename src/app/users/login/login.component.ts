import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MessageBox } from '../../core/models/message-box';
import { Constants } from '../../core/constants/constants';
import { AuthService } from '../../core/service/auth.service';
import * as firebase from 'firebase/app';
import { Observable, Subscription } from 'rxjs/Rx';
import { RandomDataService } from '../../core/service/random-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends MessageBox implements OnInit, OnDestroy {
  user: any = {};
  centerErrorMessage: boolean;
  isSpinnerVisible: boolean;
  public subscriptionMessageLoginCompleted: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private randDataService: RandomDataService
  ) 
  {
    super();
    this.user.username = '';
    this.user.password = '';
    this.isSpinnerVisible = false;    
  }

  ngOnInit() {    
    this.isUserLogged();      
    this.subscriptionMessageLoginCompleted = this.authService.getMessageLoginCompletedSubject().subscribe(loginCompletedMessage => {            
      this.afterSignIn();
    });

    this.randDataService.generateRandomData();

  }

  public ngOnDestroy(): void {
    this.subscriptionMessageLoginCompleted.unsubscribe();
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

  private handleError(error: any) {
    //console.error(error);    
    if(error.code == 'auth/account-exists-with-different-credential'){
      firebase.auth().fetchProvidersForEmail(error.email)
        .then(providers => {
          let provider = providers[0];

          if(providers[0] == 'password'){
            provider = 'Email/password';
          }

          let message = `An account already exists with the same email address but different sign-in credentials. Sign in using the ${provider} provider.`;

          this.isSpinnerVisible = false; 
          this.message = message;
          this.messageType = 'error-login';
          this.showMessage = true;
          this.centerErrorMessage = true;
        });
    }else{
      this.isSpinnerVisible = false; 
      this.message = error.message;
      this.messageType = 'error-login';
      this.showMessage = true;
      this.centerErrorMessage = true;
    }    
  }

  keyPressLogin(event: KeyboardEvent) {
    if (event.charCode === 13) {
      this.login();
    }
  }

  public isUserLogged(){
    this.authService.user.first().subscribe( user => {
      if(user){
         this.router.navigate(['dashboard']);
      }
    });
  }

  public signInWithGoogle() {
    this.authService.googleLogin()
    .then()
    .catch((error) => {
      this.handleError(error) 
    });
  }

  public signInWithFacebook() {
    this.authService.facebookLogin()
    .then()
    .catch((error) => this.handleError(error) );
  }

  public signInWithGithub(){
    this.authService.githubLogin()
    .then()
    .catch((error) => {
      //console.log(error);
      this.handleError(error) 
    });
  }

  public signInAnonymously(){
    this.authService.anonymousLogin()
    .then()
    .catch((error) => {
      //console.log(error);
      this.handleError(error) 
    });
  }

  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.    
    this.router.navigate(['dashboard']);
  }

  public registerUser(){
    this.router.navigate(['register']);
  }

}
