import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReservation } from './dashboard-reservation';

describe('DashboardReservation', () => {
  let component: DashboardReservation;
  let fixture: ComponentFixture<DashboardReservation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardReservation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardReservation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
