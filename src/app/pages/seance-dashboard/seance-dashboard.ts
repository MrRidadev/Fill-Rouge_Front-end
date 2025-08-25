import {Component, OnInit} from '@angular/core';
import {Seance} from '../../services/seance';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-seance-dashboard',
  imports: [
    NgForOf
  ],
  templateUrl: './seance-dashboard.html',
  styleUrl: './seance-dashboard.css'
})
export class SeanceDashboard implements OnInit {

  seances: Seance[] = [];

  constructor(private seanceService : Seance) {}

  ngOnInit() {
    this.seanceService.getSeance().subscribe((data) => {
      this.seances = data;
    })
  }

}
