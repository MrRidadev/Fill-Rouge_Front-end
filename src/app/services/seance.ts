import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Film} from './film-service';
import {Observable} from 'rxjs';
import {Salle} from './salle';

export interface Seance{
  id: number;
  nomSeance: String;
  dateHeure : Date;
  film: Film;
  salle : Salle;
}

export interface SeanceRequest {
  nom_seance: string;
  dateHeure: string;
  filmId: number;
  salleId: number;
}
@Injectable({
  providedIn: 'root'
})
export class Seance {

  private Urlapi ='http://localhost:8087/seance/';

  constructor(private http : HttpClient) { }

  getSeance(): Observable<Seance[]> {
    return this.http.get<Seance[]>(this.Urlapi+'getAllSeance');

  }
  addSeance(seance: SeanceRequest): Observable<any> {
    return this.http.post(`${this.Urlapi}addSeance`, seance);
  }


}
