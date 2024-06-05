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
  ToastController,
  IonModal,
  AlertController
  
} from '@ionic/angular/standalone';
import { loginDto } from '../../../interfaces/loginDto';
import { addIcons } from 'ionicons';
import { checkmark, document, globe, imageOutline, add,  atCircleOutline, atSharp, keyOutline} from 'ionicons/icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';

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
    IonInputPasswordToggle,
    RouterLink,
    IonModal,
  ],
})
export class LoginPage {
  private _authService = inject(AuthService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private _router= inject(Router);
  private toastController = inject(ToastController)
  private alertController = inject(AlertController)
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
        email: this.loginForm?.get('email')?.value,
        password: this.loginForm?.get('password')?.value,
      };
      this._authService.signInWithEmailAndPassword(login).then(()=> {
          this._router.navigate(['/home']);
          this.showAlert('Ha iniciado sesión correctamente');
      }).catch((error)=>{
        this.showAlert('correo o contraseña inválido', true);
        console.log(error)
      })
    }
  }

  async showAlert(message: string, error:boolean = false): Promise<void>{
    const toast = await this.toastController.create({
        message: message,
        duration: 5000,
        position: 'bottom',
        color: error? 'danger' : 'success'
    });
    await toast.present();
  }

  async forgotPasswordAlert() {
    const alert = await this.alertController.create({
      header: 'Recuperar Contraseña',
      message: 'Por favor, introduce tu correo electrónico:',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo Electrónico'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Enviar',
          handler: async (data) => {
            const email = data.email;
            if (email) {
              try {
                await this._authService.sendPasswordResetEmail(email);
                this.showAlert('Se ha enviado un correo para restablecer tu contraseña.');
              } catch (error) {
                this.showAlert('No se pudo enviar el correo para restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.', true);
              }
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
