import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesInCinema } from './movies-in-cinema';

describe('MoviesInCinema', () => {
  let component: MoviesInCinema;
  let fixture: ComponentFixture<MoviesInCinema>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesInCinema]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesInCinema);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
