import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceDashboard } from './seance-dashboard';

describe('SeanceDashboard', () => {
  let component: SeanceDashboard;
  let fixture: ComponentFixture<SeanceDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeanceDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeanceDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
