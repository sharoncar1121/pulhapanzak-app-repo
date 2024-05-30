import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonText,
  IonInputPasswordToggle
} from '@ionic/angular/standalone';
import { loginDto } from '../../interfaces/loginDto';
import { addIcons } from 'ionicons';
import { checkmark, document, globe, imageOutline, add,  atCircleOutline, atSharp, keyOutline} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonInput,
    CommonModule,
    IonLabel,
    IonItem,
    IonButton,
    IonIcon,
    IonText,
    IonInputPasswordToggle
  ],
})
export class LoginPage {
  
  private formBuilder: FormBuilder = inject(FormBuilder);
  loginForm: FormGroup;

  constructor() { 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    addIcons({ checkmark, document, imageOutline, globe, add, atCircleOutline, atSharp, keyOutline });
  }

  get isFormValid(): boolean {
    return this.loginForm.valid;
  }

  get emailRequired(): boolean {
    const emailControl = this.loginForm.get('email');
   return emailControl? (emailControl.touched && emailControl.hasError( 'required')) : false;
  }

  get emailValidate(): boolean {
    const emailControl = this.loginForm.get('email');
    return emailControl? (emailControl.touched && emailControl.hasError( 'email')) : false;
  }

  get passwordRequired(): boolean {
    const passwordControl = this.loginForm.get('password');
    return passwordControl? (passwordControl.touched && passwordControl.hasError('required')) : false;
  }

  login():void{
    if(this.loginForm.valid){
      const login: loginDto ={
        correo: this.loginForm?.get('email')?.value,
        password: this.loginForm?.get('password')?.value,
      };
      console.log(login);
    }
  }

}
