import { Injectable } from '@angular/core';
import {HttpClient,HttpClientModule } from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Film {
  idFilm: number;
  titre: string;
  langue: string;
  description: String;
  genre : string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})

export class FilmService {
//afficher film
  private apiUrl = 'http://localhost:8087/film';

  constructor(private http: HttpClient) {}

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiUrl}/getAllFilm`);
  }

  // supprimer film by id

  deleteFilm(idFilm: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${idFilm}`);
  }
}
