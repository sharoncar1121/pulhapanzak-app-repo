import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  query,
  updateDoc,
  setDoc,
  where,
  getDocs,
  getDoc,
  orderBy
} from '@angular/fire/firestore';
import { photoDto } from '../../interfaces/photoDto';

const PATH = 'galleries';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);
  


  async getPhotosByQuery(): Promise<photoDto[]> {
    try {
      const photoQuery = query(
        this._collection,
        where('active', '==', true),
        orderBy('createdAt', 'desc')
      );
      const photoSnapshot = await getDocs(photoQuery);
      const photos: photoDto[] = [];

      photoSnapshot.forEach(doc => {
        photos.push(doc.data() as photoDto);
      });

      return photos;
    } catch (error) {
      console.error('Error fetching photos:', error);
      return [];
    }
  }
}
