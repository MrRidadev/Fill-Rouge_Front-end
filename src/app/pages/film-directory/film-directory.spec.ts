import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmDirectory } from './film-directory';

describe('FilmDirectory', () => {
  let component: FilmDirectory;
  let fixture: ComponentFixture<FilmDirectory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmDirectory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmDirectory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
