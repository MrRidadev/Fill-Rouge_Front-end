import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

export interface Film {
  idFilm: number;
  titre: string;
  langue: string;
  description: string;
  genre: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = 'http://localhost:8087/film';

  constructor(private http: HttpClient, private auth: AuthService) {}

  // getHeaders adaptable selon le type
  private getHeaders(isFormData: boolean = false): HttpHeaders {
    const token = this.auth.getToken();
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    if (!isFormData) {
      headers = headers.set('Content-Type', 'application/json');
    }
    return headers;
  }

  // Récupérer films
  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiUrl}/getAllFilm`, {
      headers: this.getHeaders()
    });
  }

  // Supprimer film
  deleteFilm(idFilm: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${idFilm}`, {
      headers: this.getHeaders(),
      responseType: 'text'
    });
  }

  // Ajouter un film
  addFilm(formData: FormData): Observable<Film> {
    return this.http.post<Film>(`${this.apiUrl}/addFilm`, formData, {
      headers: this.getHeaders(true)
    });
  }

  // Mettre à jour un film
  updateFilm(id: number, formData: FormData): Observable<Film> {
    return this.http.put<Film>(`${this.apiUrl}/updateWithImage/${id}`, formData, {
      headers: this.getHeaders(true)
    });
  }

  // Compter les films
  countFilm(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/countFilm`, {
      headers: this.getHeaders()
    });
  }

  // Rechercher par titre
  searchByTitre(titre: string): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiUrl}/searchByTitre?titre=${titre}`, {
      headers: this.getHeaders()
    });
  }

// Rechercher par genre
  searchByGenre(genre: string): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiUrl}/searchByGenre?genre=${genre}`, {
      headers: this.getHeaders()
    });
  }

}
