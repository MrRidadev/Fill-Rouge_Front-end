import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from './film-service';
import { Salle } from './salle';
import {AuthService} from './auth';

export interface Seance {
  id: number;
  nomSeance: string;
  dateHeure: Date;
  film: Film;
  salle: Salle;
}

export interface SeanceRequest {
  nom_seance: string;
  dateHeure: string;
  filmId: number;
  salleId: number|undefined;
}

@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  private Urlapi = 'http://localhost:8087/seance/';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders() {
    const token = this.auth.getToken();
    console.log("séance"+token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getSeance(): Observable<Seance[]> {
    return this.http.get<Seance[]>(this.Urlapi + 'getAllSeance', {
      headers: this.getHeaders()
    });
  }

  addSeance(seance: SeanceRequest): Observable<any> {
    return this.http.post(`${this.Urlapi}addSeance`, seance, {
      headers: this.getHeaders()
    });
  }

  // Supprimer une séance
  deleteSeance(id: number): Observable<string> {
    return this.http.delete<string>(`${this.Urlapi}deleteSeance/${id}`, { responseType: 'text' as 'json',
      headers: this.getHeaders()
    });
  }


  updateSeance(id: number, seance: SeanceRequest): Observable<Seance> {
    return this.http.put<Seance>(
      `${this.Urlapi}updateSeance/${id}`,
      seance,
      { headers: this.getHeaders() }
    );
  }


}

