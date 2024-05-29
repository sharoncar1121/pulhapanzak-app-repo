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
import { userDto } from '../../interfaces/userDto';

import { addIcons } from 'ionicons';
import { checkmark, document, globe, imageOutline, add } from 'ionicons/icons';

@Component({
  selector: 'app-register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
export class RegisterPage {
  private formBuilder: FormBuilder = inject(FormBuilder);
  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      DNI: [
        '',
        [
          Validators.required,
          Validators.minLength(13),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
    });

    addIcons({ checkmark, document, imageOutline, globe, add });
  }

  get isFormValid(): boolean {
    return this.registerForm.valid;
  }


  get nameRequired(): boolean {
    const nameControl = this.registerForm.get('name');
    return nameControl ? (nameControl.touched && nameControl.hasError('required')) : false;
  }

  get apellidoRequired(): boolean {
    const apellidoControl = this.registerForm.get('apellidos');
    return apellidoControl? (apellidoControl.touched && apellidoControl.hasError('required')) : false;
  }

  get emailRequired(): boolean {
    const emailControl = this.registerForm.get('email');
   return emailControl? (emailControl.touched && emailControl.hasError( 'required')) : false;
  }

  get emailValidate(): boolean {
    const emailControl = this.registerForm.get('email');
    return emailControl? (emailControl.touched && emailControl.hasError( 'email')) : false;
  }

  get passwordRequired(): boolean {
    const passwordControl = this.registerForm.get('password');
    return passwordControl? (passwordControl.touched && passwordControl.hasError('required')) : false;
  }

  get dniRequired(): boolean {
    const dniControl = this.registerForm.get('DNI');
   return dniControl? (dniControl.touched && dniControl.hasError( 'required')) : false;
  }

  get dniValidate(): boolean {
    const dniControl = this.registerForm.get('DNI');
    return dniControl? (dniControl.touched && dniControl.hasError( 'minlength')) : false;
  }

  get dniValidatePattern(): boolean {
    const dniControl = this.registerForm.get('DNI');
   return dniControl? (dniControl.touched && dniControl.hasError( 'pattern')) : false;
  }

  get phoneRequired(): boolean {
    const phoneControl = this.registerForm.get('phone');
    return phoneControl? (phoneControl.touched && phoneControl.hasError('required')) : false;
  }

  get phoneValidate(): boolean {
    const phoneControl = this.registerForm.get('phone');
    return phoneControl? (phoneControl.touched && phoneControl.hasError( 'minlength')) : false;
  }

  get phonePattern(): boolean {
    const phoneControl = this.registerForm.get('phone');
    return phoneControl? (phoneControl.touched && phoneControl.hasError( 'pattern')) : false;

  }

  register():void{
    if(this.registerForm.valid){
      const register: userDto ={
        name: this.registerForm?.get('name')?.value,
        apellidos: this.registerForm?.get('apellidos')?.value,
        correo: this.registerForm?.get('email')?.value,
        DNI: this.registerForm?.get('DNI')?.value,
        password: this.registerForm?.get('password')?.value,
        telefono: this.registerForm?.get('phone')?.value
      };
      console.log(register);
    }
  }
}
