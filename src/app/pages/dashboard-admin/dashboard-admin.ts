import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SeanceDashboard} from '../seance-dashboard/seance-dashboard';
import {FilmDirectory} from '../film-directory/film-directory';

@Component({
  selector: 'app-dashboard-admin',
  imports: [
    RouterOutlet,
    SeanceDashboard,
    FilmDirectory,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './dashboard-admin.html',
  standalone: true,
  styleUrl: './dashboard-admin.css'
})


export class DashboardAdmin{




}
