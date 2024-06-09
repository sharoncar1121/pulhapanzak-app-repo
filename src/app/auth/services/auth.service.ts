import { Injectable, inject } from '@angular/core';
import { Auth, User, UserCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';

import { loginDto } from '../interfaces/loginDto';
import { Firestore, 
  collection,
  deleteDoc,
  doc,
  query,
  updateDoc,
  setDoc,
  where,
  getDocs,
  getDoc, } from '@angular/fire/firestore';
import { userDto } from '../interfaces/userDto';

const PATH = 'users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth = inject(Auth)
  private _firestore= inject(Firestore)
  private _collection = collection(this._firestore, PATH);

  async getCurrentUser(): Promise<User|null>{
    return new Promise((resolve)=>{
      this._auth.onAuthStateChanged(user =>{
        resolve(user);
      });
    });
  }

  async isUserLoggedIn(): Promise<boolean>{
    const user = await this.getCurrentUser();
    console.log(!!user);
    return !!user;
  }

  async createUserWithEmailAndPassword(user: userDto): Promise<void> {
    const isUserLoggedIn = await this.isUserLoggedIn();
  if (isUserLoggedIn) {
      return Promise.reject('User is already logged in');
    }

    const response: UserCredential = await createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
    user.uid = response.user?.uid || '';
    return this.createUserInFirestore(user);
 }


  async signInWithEmailAndPassword(model: loginDto): Promise<UserCredential>{
    const isUserLoggedIn = await this.isUserLoggedIn();
    if(isUserLoggedIn){
      return Promise.reject('User is already logged in')
    }
    return await signInWithEmailAndPassword(this._auth, model.email, model.password)
  }

  async createUserInFirestore(user: userDto): Promise<void> {
    const userRef = doc(this._collection, user.uid);
    return setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      phoneNumber: user.phone,
      name: user.name,
      apellidos: user.apellidos,
      DNI: user.DNI,
      role: 'user',
      photoUrl: user.photoUrl,
    });
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this._auth, email);
    } catch (error) {
      console.error('Error al enviar correo de recuperación de contraseña:', error);
      throw error;
    }
  }

  signOut(): Promise<void> {
    return this._auth.signOut();
  }

}
