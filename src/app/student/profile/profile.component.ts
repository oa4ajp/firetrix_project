import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../../core/constants/constants';
import { AuthService } from '../../core/service/auth.service';
import * as firebase from 'firebase/app';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-student-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {           
  }

  public ngOnDestroy(): void {
  }  

  private handleError(error: any) {
    //console.error(error);       
  }

}
