import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableParkingSlotsComponent } from './available-parking-slots.component';

describe('AvailableParkingSlotsComponent', () => {
  let component: AvailableParkingSlotsComponent;
  let fixture: ComponentFixture<AvailableParkingSlotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableParkingSlotsComponent]
    });
    fixture = TestBed.createComponent(AvailableParkingSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
