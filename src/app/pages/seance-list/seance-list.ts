import {Component, OnInit} from '@angular/core';
import {Seance} from '../../services/seance';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-seance-list',
  imports: [
    NgForOf
  ],
  templateUrl: './seance-list.html',
  styleUrl: './seance-list.css'
})
export class SeanceList implements OnInit {

  seances: Seance[] = [];

  constructor(private seanceService : Seance) {}

  ngOnInit() {
    this.loadSeances();
  }

  loadSeances() {
    this.seanceService.getSeance().subscribe((data) => {
      this.seances = data;
    })
  }

}
