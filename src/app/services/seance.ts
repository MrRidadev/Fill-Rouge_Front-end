import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Film} from './film-service';
import {Observable} from 'rxjs';
import {Salle} from './salle';

export interface Seance{
  idSeance: number;
  nomSeance: number;
  dateHeure : Date;
  film: Film;
  salle : Salle;
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
}
