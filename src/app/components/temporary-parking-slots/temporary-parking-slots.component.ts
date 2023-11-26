import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { TemporaryParkingSlot } from 'src/app/interfaces/users';

@Component({
  selector: 'app-temporary-parking-slots',
  templateUrl: './temporary-parking-slots.component.html',
  styleUrls: ['./temporary-parking-slots.component.css']
})
export class TemporaryParkingSlotsComponent implements OnInit {
  temporaryParkingSlots: TemporaryParkingSlot[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.fetchTemporaryParkingSlots();
  }

  fetchTemporaryParkingSlots(): void {
    this.httpService.fetchTemporaryParkingSlots().subscribe(
      (data: TemporaryParkingSlot[]) => {
        this.temporaryParkingSlots = data;
      },
      error => {
        console.error('Error fetching temporary parking slots:', error);
      }
    );
  }
}
