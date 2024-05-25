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
  IonText
} from '@ionic/angular/standalone';
import { userDto } from '../../interfaces/userDto';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
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
    IonText
  ],
})
export class RegisterPagePage {
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
  }

  get isFormValid(): boolean {
    return this.registerForm.valid;
  }


  get nameRequired(): boolean {
    const nameControl = this.registerForm.get('name');
    if (nameControl) {
      return nameControl.touched && nameControl.hasError('required');
    }
    return false;
  }

  get apellidoRequired(): boolean {
    const apellidoControl = this.registerForm.get('apellidos');
    if (apellidoControl) {
      return apellidoControl.touched && apellidoControl.hasError('required');
    }
    return false;
  }

  get emailRequired(): boolean {
    const emailControl = this.registerForm.get('email');
    if (emailControl) {
      return emailControl.touched && emailControl.hasError('required');
    }
    return false;
  }

  get emailValidate(): boolean {
    const emailControl = this.registerForm.get('email');
    if (emailControl) {
      return emailControl.touched && emailControl.hasError('email');
    }
    return false;
  }

  get passwordRequired(): boolean {
    const passwordControl = this.registerForm.get('password');
    if (passwordControl) {
      return passwordControl.touched && passwordControl.hasError('required');
    }
    return false;
  }

  get dniRequired(): boolean {
    const dniControl = this.registerForm.get('DNI');
    if (dniControl) {
      return dniControl.touched && dniControl.hasError('required');
    }
    return false;
  }

  get dniValidate(): boolean {
    const dniControl = this.registerForm.get('DNI');
    if (dniControl) {
      return dniControl.touched && dniControl.hasError('minlength');
    }
    return false;
  }

  get dniValidatePattern(): boolean {
    const dniControl = this.registerForm.get('DNI');
    if (dniControl) {
      return dniControl.touched && dniControl.hasError('pattern');
    }
    return false;
  }

  get phoneRequired(): boolean {
    const phoneControl = this.registerForm.get('phone');
    if (phoneControl) {
      return phoneControl.touched && phoneControl.hasError('required');
    }
    return false;
  }

  get phoneValidate(): boolean {
    const phoneControl = this.registerForm.get('phone');
    if (phoneControl) {
      return phoneControl.touched && phoneControl.hasError('minlenght');
    }
    return false;
  }

  get phonePattern(): boolean {
    const phoneControl = this.registerForm.get('phone');
    if (phoneControl) {
      return phoneControl.touched && phoneControl.hasError('pattern');
    }
    return false;
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
