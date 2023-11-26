import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupiedParkingSlotsComponent } from './occupied-parking-slots.component';

describe('OccupiedParkingSlotsComponent', () => {
  let component: OccupiedParkingSlotsComponent;
  let fixture: ComponentFixture<OccupiedParkingSlotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OccupiedParkingSlotsComponent]
    });
    fixture = TestBed.createComponent(OccupiedParkingSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
