import { Injectable } from '@angular/core';


export interface Salle{
  id : number;
  nom : string;
  capacite : number;
}
@Injectable({
  providedIn: 'root'
})
export class Salle {

  constructor() { }
}
