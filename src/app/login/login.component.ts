import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { MessageBox } from '../core/models/message-box';
import { Constants } from '../core/constants/constants';
import { AuthorizationService } from '../core/service/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends MessageBox implements OnInit, DoCheck {
  user: any = {};
  centerErrorMessage: boolean;
  isSpinnerVisible: boolean;

  private users = [
    {
      firstname: 'Alfredo',
      lastname: 'Mendiola',
      userid: 'amendiola',
      officeId: '59e7a2ea2eeb2e4478e271b9',
      locationId: '59e7aa452eeb2e4478e271c3',
      password: '',
      isAdmin: false
    }];  

  constructor(private router: Router, private authService: AuthorizationService) {
    super();
    this.user.username = '';
    this.user.password = '';
    this.isSpinnerVisible = false;    
  }
  ngOnInit() {
    if (this.authService.isUserLogged()) {
      this.router.navigate(['dashboard']);
    }
  }
  ngDoCheck() {
  }
  login() {
    if(this.user.username.trim() === "" || this.user.password.trim() === "") {
      this.showMessage = true;
      this.message = Constants.MESSAGE_USER_AND_PWD_REQUIRED;
      this.messageType = 'error-login';
      this.showMessage = true;
      this.centerErrorMessage = true;
    }
    else {  
      this.isSpinnerVisible = true;
      this.showMessage = false;
      const encodedPassword = encodeURIComponent(this.user.password);

      this.getUserInformationFromTokenMock();
      /*
      this.authService.login(this.user.username, encodedPassword).subscribe( 
      (response) => {

          if (response && response.access_token) {
            localStorage.setItem('user-token', `{"token": "${response.access_token}","type": "${response.token_type}"}`);              
            this.getUserInformationFromToken();
            this.isSpinnerVisible = false;
          }

      }, error => {

        if (error && error._body) {
          const data = JSON.parse(error._body);
          if (data && data.error) {
            if(data.error == 'invalid_grant' && data.error_description == 'Unauthorize'){
              this.message = Constants.MESSAGE_UNAUTHORIZE_USER;
              this.messageType = 'error-login';
              this.showMessage = true;
              this.centerErrorMessage = true;
              this.isSpinnerVisible = false;

            } else if(data.error == 'unsupported_response_type' && data.error_description == 'TMS'){
              this.message = Constants.MESSAGE_TMS_ERROR;
              this.messageType = 'error-login';
              this.showMessage = true;
              this.centerErrorMessage = true;
              this.isSpinnerVisible = false;

            } else if(data.error == 'invalid_client' && data.error_description == 'TMS_USER_INACTIVE'){
              this.message = Constants.MESSAGE_TMS_USER_INACTIVE;
              this.messageType = 'error-login';
              this.showMessage = true;
              this.centerErrorMessage = true;
              this.isSpinnerVisible = false;
            }
          }
        }
      });
      */
    }       
  }

  getUserInformationFromToken(){
    this.authService.getUserInformationFromToken().subscribe( 
      (response) => {
          const user = response;
          if (user) {           
            localStorage.setItem('user',
            `{"name": "${user.firstname + ' ' + user.lastname}","userName": "${user.userid}","password": "","locationId": "${user.locationId}","officeId": "${user.officeId}", "isAdmin": ${user.isAdmin}}`);


            this.router.navigate(['dashboard']);           
          }
      }, error => {
        if (error && error._body) {
          const data = JSON.parse(error._body);
          if (data && data.error) {
            if(data.error == 'invalid_grant'){
              this.message = data.error_description;
              this.messageType = 'error-login';
              this.showMessage = true;
              this.centerErrorMessage = true;
            }
          }
        }
      }
    )
  }
  
  getUserInformationFromTokenMock(){
    const user = this.users[0];
    if (user) {           
      localStorage.setItem('user',
      `{"name": "${user.firstname + ' ' + user.lastname}","userName": "${user.userid}","password": "","locationId": "${user.locationId}","officeId": "${user.officeId}", "isAdmin": ${user.isAdmin}}`);

      this.router.navigate(['dashboard']);        
    }
  }

  keyPressLogin(event: KeyboardEvent) {
    if (event.charCode === 13) {
      this.login();
    }
  }

}
