import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/storage'
import DateUtil from '../../core/utils/date-util';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-student-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public downloadUrl:string = '';
  public updatedDate: string = '';
  public siteUrl: string;
  public siteName: string;

  @ViewChild('linkDownload') linkDownload:ElementRef;
  @ViewChild('linkSite') linkSite:ElementRef;

  constructor() {
    this.siteUrl = `https://${environment.firebase.authDomain}`;
    this.siteName = environment.firebase.authDomain;
  }

  ngOnInit() {
    let storageRef = firebase.storage().ref();
    let fileRef = storageRef.child(`SourceCodeMendiola.rar`); 

    // Get metadata properties
    fileRef.getMetadata().then( metadata => {
      //console.log(metadata);
      this.downloadUrl = metadata.downloadURLs[0];      
      let date = new Date(metadata.updated);      
      this.updatedDate = DateUtil.getFormattedDate(date) ;
    }).catch( error => {
      console.log(error);
    });

  }
  
  public downloadSourceCode(event:Event){
    this.linkDownload.nativeElement.blur();
  }

  public goToSite(event:Event){
    this.linkSite.nativeElement.blur();
  }
  
  public ngOnDestroy(): void {
  }  

  private handleError(error: any) {
    //console.error(error);       
  }

}
