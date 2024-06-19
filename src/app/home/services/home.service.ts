import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {ToastController} from '@ionic/angular/standalone'
import { Observable, catchError, of, tap } from 'rxjs';
import { characterDto } from '../models/characterDto.interface';
import { rickAndMortyResponse } from '../models/rickAndMortyResponse.interface';

const API = 'https://rickandmortyapi.com/api/'

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private http: HttpClient = inject(HttpClient);
  private toastController: ToastController = inject(ToastController);

  getCharacters(): Observable<rickAndMortyResponse>{
    return this.http.get<rickAndMortyResponse>(`${API}character`). pipe(tap((response)=>response),
    catchError((error)=> {
      this.handleError<rickAndMortyResponse>('Error al obtener los personajes', {} as rickAndMortyResponse);
      throw error;
    })
    );
  }

  buildCharacters(model: rickAndMortyResponse){
    return model.results.map((character) => ({
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      image: character.image
    }))
  }

  private handleError<T>(message: string, result?: T){
    return (): Observable<T> =>{
      this.showAlert(`${message}, vuelva a intentarlo mas tarde`, true);
      return of(result as T)
    }
  }

  async showAlert(message: string, error: boolean = false): Promise <void>{
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: error?  'danger' : 'success',
    });
    await toast.present();
  }
}
