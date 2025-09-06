import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSallesDashboard } from './admin-salles-dashboard';

describe('AdminSallesDashboard', () => {
  let component: AdminSallesDashboard;
  let fixture: ComponentFixture<AdminSallesDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSallesDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSallesDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
