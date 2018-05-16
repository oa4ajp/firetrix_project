import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { IUser } from '../models/interface-user'
//import { NotifyService } from './notify.service';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/elementAt';

@Injectable()
export class AuthService {

  user: Observable<IUser | null>;
  userId: string; // current user uid

  constructor(private afAuth: AngularFireAuth,
              private rtdb: AngularFireDatabase,
              private router: Router/*,
              /*private notify: NotifyService*/)  {

    this.user = this.afAuth.authState
      .switchMap((user) => {
        if (user) {
          return this.rtdb.object(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });

      this.afAuth.authState
      .do(user => {
        if (user) {
            this.updateOnConnect(user.uid);
            this.updateOnDisconnect(user.uid);
        }
      })
      .subscribe();

      this.getUsersOnline();

  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
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
        //this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch((error) => this.handleError(error) );
  }

  //// Anonymous Auth ////
  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        //this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        //this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
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
      const userRef: AngularFireObject<IUser> = this.rtdb.object(`users/${user.uid}`);
      userRef.update({online: false});

      this.router.navigate(['login']);
    });
  }
  
  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    //this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  public updateUserData(user: IUser) {

    const userRef: AngularFireObject<IUser> = this.rtdb.object(`users/${user.uid}`);
    
    let dbDisplayName = null;
    userRef.valueChanges().first().subscribe(dbUser => {
      if(dbUser){
        dbDisplayName = dbUser['displayName'];
      }            

      const data: IUser = {
        uid: user.uid,
        email: user.email || null,
        displayName: user.displayName || dbDisplayName || 'nameless user',
        photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
        online: true
      };
      userRef.set(data);

    });
  } 

  public getUsersOnline(){

      //let basePath: string = '/items';
      //let items: FirebaseListObservable<Item[]> = null; 
      const listRef = this.rtdb.list<IUser>('users');

      return listRef.valueChanges();
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

}