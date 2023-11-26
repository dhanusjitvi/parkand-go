import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

interface TemporaryParkingSlot {
  userName: string;
  slotNumber: string;
  startDate: Date | string;
  endDate: Date | string;
}

@Component({
  selector: 'app-temporary-parking-slots',
  templateUrl: './temporary-parking-slots.component.html',
  styleUrls: ['./temporary-parking-slots.component.css']
})
export class TemporaryParkingSlotsComponent implements OnInit {
  temporaryParkingSlot: TemporaryParkingSlot | null = null;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.fetchTemporaryParkingSlot();
  }

  fetchTemporaryParkingSlot(): void {
    this.httpService.fetchTemporaryParkingSlots().subscribe(
      (data: any) => {
        if (data.userName) {
          // If data.userName is truthy, it means there is a temporary parking slot
          this.temporaryParkingSlot = {
            userName: data.userName,
            slotNumber: data.slotNumber,
            startDate: data.startDate,
            endDate: data.endDate
          };
        } else {
          // If data.userName is falsy, it means there is no temporary parking slot
          this.temporaryParkingSlot = null;
        }
      },
      error => {
        console.error('Error fetching temporary parking slot:', error);
      }
    );
  }
}
