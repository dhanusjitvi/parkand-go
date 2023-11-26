import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryParkingSlotsComponent } from './temporary-parking-slots.component';

describe('TemporaryParkingSlotsComponent', () => {
  let component: TemporaryParkingSlotsComponent;
  let fixture: ComponentFixture<TemporaryParkingSlotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemporaryParkingSlotsComponent]
    });
    fixture = TestBed.createComponent(TemporaryParkingSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
