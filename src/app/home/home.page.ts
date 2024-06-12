import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, ToastController} from '@ionic/angular/standalone';
import { AuthService } from '../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { userDto } from '../auth/interfaces/userDto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, CommonModule],
})
export class HomePage {

  private toastController = inject(ToastController)
  user: userDto | null = null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUserLoggued();
  }

 
  getUserLoggued(): void {
    this.authService.getUserLoggued().then((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.authService.signOut().then(() => {
      this.showAlert('Se ha cerrado la sesión correctamente');
      this.router.navigate(['/login']); 
    }).catch((error) => {
      console.error('Error al cerrar sesión', error);
    });
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
  
}
