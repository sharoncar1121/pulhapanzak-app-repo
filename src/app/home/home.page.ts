import { Component, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonCard, IonCardContent, IonAvatar, IonItem, IonLabel} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { characterDto } from './models/characterDto.interface';
import { HomeService } from './services/home.service';
import { rickAndMortyResponse } from './models/rickAndMortyResponse.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, CommonModule, IonCard, IonCardContent, IonAvatar, IonItem,IonLabel ],
})
export class HomePage implements OnInit {

  characters: characterDto[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getCharacters().subscribe({
      next: (response: rickAndMortyResponse) => {
        this.characters = this.homeService.buildCharacters(response);
      },
      error: (err) => {
        console.error('Error fetching characters', err);
      }
    });
  }
  
}
