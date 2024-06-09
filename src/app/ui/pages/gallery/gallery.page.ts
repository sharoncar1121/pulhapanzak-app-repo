import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent} from '@ionic/angular/standalone';
import { GalleryService } from '../../services/gallery-services/gallery.service';
import { photoDto } from '../../interfaces/photoDto';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonCard, IonImg, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class GalleryPage  {
  private galleryService = inject(GalleryService);
  photos: photoDto[] = [];

  constructor() {
   }

   ngOnInit(): void {
    this.showPhotos();
    console.log('entra aqui')
  }

  showPhotos(): void {
    console.log('entra aqui')
    this.galleryService
      .getPhotosByQuery()
      .then((photos) => {
        this.photos = photos;
        console.log(photos);
        console.log('entra aqui en then')
      })
      .catch((error) => {
        console.error(error);
      });
  }

}
