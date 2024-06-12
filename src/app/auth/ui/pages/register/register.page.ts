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
  IonInputPasswordToggle,
  IonToast,
  ToastController
} from '@ionic/angular/standalone';
import { userDto } from '../../../interfaces/userDto';

import { addIcons } from 'ionicons';
import { checkmark, document, globe, imageOutline, add, keyOutline, atSharp, personOutline, personAddOutline, callOutline } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { minLengthValidator } from 'src/app/auth/validators';

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
    IonInputPasswordToggle,
    RouterLink,
  ],
})
export class RegisterPage {
  private authService = inject(AuthService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private _router = inject(Router);
  registerForm: FormGroup;
  toastController: ToastController = inject(ToastController);

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
          minLengthValidator(12),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          minLengthValidator(7),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
    });

    addIcons({ checkmark, document, imageOutline, globe, add, keyOutline, atSharp, personOutline, personAddOutline, callOutline});
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
    const phoneControl = this.registerForm.get('phoneNumber');
    return phoneControl? (phoneControl.touched && phoneControl.hasError('required')) : false;
  }

  get phoneValidate(): boolean {
    const phoneControl = this.registerForm.get('phoneNumber');
    return phoneControl? (phoneControl.touched && phoneControl.hasError( 'minlength')) : false;
  }

  get phonePattern(): boolean {
    const phoneControl = this.registerForm.get('phoneNumber');
    return phoneControl? (phoneControl.touched && phoneControl.hasError( 'pattern')) : false;

  }

  register():void{
   
    if (this.registerForm.valid) {
    const user: userDto = this.registerForm?.value;
       user.photoUrl = '';
       console.log('User Data:', user); 
       this.authService
         .createUserWithEmailAndPassword(user)
       .then(() => {
          this.showAlert('Usuario registrado correctamente', false);
          this._router.navigate(['/tabs/home']);
         })
         .catch((error) => {
           console.error(error);
           this.showAlert('Error al registrar el usuario', true);
         });
     }
  }

  async showAlert(message: string, error: boolean = false): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      color: error ? 'danger' : 'success',
    });
    await toast.present();
  }
}
