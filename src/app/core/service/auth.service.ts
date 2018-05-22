import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth,  } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { IUser } from '../models/interface-user'

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/elementAt';
import { Roles } from '../models/roles';

@Injectable()
export class AuthService {
  private messageLoginCompletedSubject = new Subject<string>();
  user: Observable<IUser | null>;
  userId: string = null;

  authState: any = null;

  constructor(private afAuth: AngularFireAuth,
              private rtdb: AngularFireDatabase,
              private router: Router/*,
              /*private notify: NotifyService*/)  {

    this.user = this.afAuth.authState
      .switchMap((user) => {
        if (user) {
          const uid: string = this.getUserId(user);          
          return this.rtdb.object(`users/${uid}`).valueChanges();
          
        } else {
          return Observable.of(null);

        }
      });

      this.afAuth.authState.subscribe((auth) => {
        this.authState = auth;
      });

      /*
      this.afAuth.authState
      .do(user => {
        if (user) {
            this.updateOnConnect(user.uid);
            this.updateOnDisconnect(user.uid);
        }
      })
      .subscribe();
      */

      this.getUsersOnline();
  }

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  getMessageLoginCompletedSubject(): Observable<any> {
    return this.messageLoginCompletedSubject.asObservable();
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {    
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {        

        let email = '';
        let photoURL = '';
        let displayName = '';
        let providerId = credential.credential.providerId;

        switch(providerId){
          case "github.com":
            email = credential.user.providerData[0].email;
            photoURL = credential.user.photoURL;
            displayName = credential.additionalUserInfo.username;          
            break;

          case "google.com":
            email = credential.additionalUserInfo.profile.email;
            photoURL = credential.user.photoURL;
            displayName = credential.user.displayName;   
            break;          
        }

        const uid: string = this.encondeFireBaseKey(email);

        const userData: IUser = {
            uid: uid,
            email: email || null,
            displayName: displayName,
            photoURL: photoURL || 'https://goo.gl/Fz9nrQ',
            online: true,
            roles:  { }
         };        

        return this.updateUserData(userData);
      });
  }

  //// Anonymous Auth ////
  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {        
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////
  emailSignUp(displayName:string, email: string, password: string) {
    const uid: string = this.encondeFireBaseKey(email);
    
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const userData: IUser = {
          uid: uid,
          email: user.email || null,
          displayName: displayName,
          photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
          online: true,
          roles:  { }
        };
        this.createUserData(userData); // if using firestore

        return new Promise<boolean>((resolve) => {
          resolve(true);
        });
      })
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();
/*
    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error));
      */
  }

  signOut(user: IUser) {      
    this.afAuth.auth.signOut().then(() => {    
      let uid: string =  null; 
      if(user.email == null){
        //Anonymous Login
        uid = user.uid;
      }else{
        uid = this.encondeFireBaseKey(user.email);
      }

      const userRef: AngularFireObject<IUser> = this.rtdb.object(`users/${uid}`);
      userRef.update({online: false});
      this.userId = null;

      this.router.navigate(['login']);
    });
  }
  
  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);    
  }

  // Sets user data to firestore after succesful login
  public createUserData(user: IUser) {

    const uid: string = this.encondeFireBaseKey(user.email);

    const userRef: AngularFireObject<IUser> = this.rtdb.object(`users/${uid}`);

    user.photoURL = user.photoURL || 'https://goo.gl/Fz9nrQ';
    user.online = true; //Teh user is redirected to dashboard as Logged In
    user.roles = { friend: true };

    userRef.set(user);

    this.userId =  uid;     

  }

  public updateUserData(user: IUser) {    
    const listRef = this.rtdb.list<IUser>('users');
          
    listRef.valueChanges<IUser>().first().map( users => 
        users.filter(userTmp => userTmp.email === user.email ) 
    ).toPromise().then( dbUsers => {
        let dbUser: IUser;
        //console.log(dbUsers);
        if(dbUsers.length == 0){
          dbUser = user;
        }else{
          dbUser = dbUsers[0];
        }                        

        let uid: string =  ''; 
        if(dbUser.email == null){
          //Anonymous Login
          uid = dbUser.uid;
        }else{
          uid = this.encondeFireBaseKey(dbUser.email);
        }
       
        const userRef: AngularFireObject<IUser> = this.rtdb.object(`users/${uid}`);

        let displayName: string = user.displayName != null ?  user.displayName : dbUser.displayName;

        const data: IUser = {
          uid: uid,
          email: user.email || null,
          displayName: displayName || 'nameless user',
          photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
          online: true,
          roles: dbUser.roles || { friend: true }
        };
        userRef.set(data);  

        this.userId = uid;     

        this.messageLoginCompletedSubject.next("");
    });

  } 

  public getUsersOnline(){
      const listRef = this.rtdb.list<IUser>('users');
      
      return listRef.valueChanges<IUser>().map( users => 
        users.filter(user => user.online == true)
      );

  }

  public getUsers(){
      const listRef = this.rtdb.list<IUser>('users');      
      return listRef.valueChanges<IUser>();      
  }  

 private updateOnConnect(userId: string) {   
  this.rtdb.object('.info/connected').valueChanges().elementAt(1)
    .do(connected => {
        //console.log(connected);
        const userRef: AngularFireObject<IUser> = this.rtdb.object(`users/${userId}`);    
        if(connected){
          userRef.update({online: true});
        }else{
          userRef.update({online: false});
        }
    })
    .subscribe()                  
  }

 private updateOnDisconnect(userId: string) {
    this.rtdb.database.ref()
      .child(`users/${userId}`)
      .onDisconnect()
      .update({online: false})
  }  

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  private encondeFireBaseKey(key: string){
    return key.replace(/\%/g, '%25')
      .replace(/\./g, '%2E')
      .replace(/\#/g, '%23')
      .replace(/\$/g, '%24')
      .replace(/\//g, '%2F')
      .replace(/\[/g, '%5B')
      .replace(/\]/g, '%5D');
  }

  private decodeFireBaseKey(key: string){
    //todo
  }  

  private getProviderEmail(user: any){
    let email = '';
    email = user.providerData[0].email;        
    return email;
  }

  private getUserId(user: any){
    let userId = '';

    if(user.providerData.length == 0){
      userId = user.uid;
    }else{
      userId = this.encondeFireBaseKey(this.getProviderEmail(user));
    }  
    return userId;
  }

}