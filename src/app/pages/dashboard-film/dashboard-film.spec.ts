import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFilm } from './dashboard-film';

describe('DashboardClient', () => {
  let component: DashboardFilm;
  let fixture: ComponentFixture<DashboardFilm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardFilm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardFilm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
