import { Injectable } from '@angular/core';
import {HttpClient,HttpClientModule } from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Film {
  id_film: number;
  titre: string;
  langue: string;
  description: String;
  genre : string;
}

@Injectable({
  providedIn: 'root'
})

export class FilmService {

  private apiUrl = 'http://localhost:8081/film/getAllFilm';

  constructor(private http: HttpClient) {}

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.apiUrl);
  }
}
