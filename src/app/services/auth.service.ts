import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {

  provider = new firebase.auth.GoogleAuthProvider();

  constructor(public afAuth: AngularFireAuth) {

  }

  loginWithGoogle() {

    return this.afAuth.auth.signInWithPopup(this.provider);
    // return this.afAuth.auth.signInWithPopup(this.provider).then((result) => console.log('Signin result', result))
    //     .catch((error) => console.error('Sigin error', error));
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  signUpWithEmail(email, password) {
    console.log('signUpWithEmail: ' + email + ' , ' + password);
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
}
