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
  IonImg,
  ToastController
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { checkmark, document, globe, imageOutline, add, keyOutline, atSharp, personOutline, personAddOutline, callOutline } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { minLengthValidator } from 'src/app/auth/validators';
import { userDto } from 'src/app/auth/interfaces/userDto';
import{ Camera, CameraResultType} from '@capacitor/camera'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [ IonContent,
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
    IonImg
  ]
})
export class ProfilePage  {

  profileForm: FormGroup;
  toastController: ToastController = inject(ToastController);
  private formBuilder: FormBuilder = inject(FormBuilder);
  imageSrc: string= ''

  constructor(private authService: AuthService, private router: Router) {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      DNI: [
        '',
        [
          Validators.required,
          minLengthValidator(12),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      phone: [
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
    return this.profileForm.valid;
  }


  get nameRequired(): boolean {
    const nameControl = this.profileForm.get('name');
    return nameControl ? (nameControl.touched && nameControl.hasError('required')) : false;
  }

  get birthRequired(): boolean {
    const nameControl = this.profileForm.get('birth');
    return nameControl ? (nameControl.touched && nameControl.hasError('required')) : false;
  }


  get dniRequired(): boolean {
    const dniControl = this.profileForm.get('DNI');
   return dniControl? (dniControl.touched && dniControl.hasError( 'required')) : false;
  }

  get dniValidate(): boolean {
    const dniControl = this.profileForm.get('DNI');
    return dniControl? (dniControl.touched && dniControl.hasError( 'minlength')) : false;
  }

  get dniValidatePattern(): boolean {
    const dniControl = this.profileForm.get('DNI');
   return dniControl? (dniControl.touched && dniControl.hasError( 'pattern')) : false;
  }

  get phoneRequired(): boolean {
    const phoneControl = this.profileForm.get('phone');
    return phoneControl? (phoneControl.touched && phoneControl.hasError('required')) : false;
  }

  get phoneValidate(): boolean {
    const phoneControl = this.profileForm.get('phone');
    return phoneControl? (phoneControl.touched && phoneControl.hasError( 'minlength')) : false;
  }

  get phonePattern(): boolean {
    const phoneControl = this.profileForm.get('phone');
    return phoneControl? (phoneControl.touched && phoneControl.hasError( 'pattern')) : false;

  }

  register():void{
   
    if (this.profileForm.valid) {
    const profile: userDto = this.profileForm?.value;
       console.log('Profile Data:', profile); 
        profile.photoUrl= '';
      this.showAlert('Perfil actualizado correctamente', false);
      
     }
  }

  async pickImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      saveToGallery: true,
      promptLabelHeader: 'Seleccionar una opción',
      promptLabelPicture: 'Tomar una foto',
      promptLabelPhoto: 'Elegir de galería',
    });

    if (!image) return;

    this.imageSrc = image.webPath ?? image.path ?? '';
  }

  logout(): void {
    this.authService.signOut().then(() => {
      this.showAlert('Se ha cerrado la sesión correctamente');
      this.router.navigate(['/login']); 
    }).catch((error) => {
      console.error('Error al cerrar sesión', error);
    });
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
