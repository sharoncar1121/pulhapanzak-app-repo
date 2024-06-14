import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Token, ActionPerformed,PushNotifications,PushNotificationSchema } from '@capacitor/push-notifications';
import { userDto } from './auth/interfaces/userDto';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit{
  constructor() {}

  private authService = inject(AuthService);
  user: userDto | null = null;

  initializePushNotifications(): void {
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        PushNotifications.register();
      }
    });

    PushNotifications.addListener('registration', (token: Token) => {
      if (this.user && this.user.uid) {
        this.user.deviceId = token.value;
        this.authService.updateUser(this.user);
      }
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

  ngOnInit(): void {
    this.authService.getUserLoggued().then((user) => {
      this.user = user;
      this.initializePushNotifications();
    });
  }
}
