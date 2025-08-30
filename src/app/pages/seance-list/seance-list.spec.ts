import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeanceList } from './seance-list';

describe('SeanceList', () => {
  let component: SeanceList;
  let fixture: ComponentFixture<SeanceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeanceList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeanceList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
