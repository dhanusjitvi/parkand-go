// available-parking-slots.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ParkingUpdateService } from 'src/app/services/ParkingUpdateService';
import { AvailableParkingSlot } from 'src/app/interfaces/users';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-available-parking-slots',
  templateUrl: './available-parking-slots.component.html',
  styleUrls: ['./available-parking-slots.component.css'],
})
export class AvailableParkingSlotsComponent implements OnInit, OnDestroy {
  availableParkingSlots: AvailableParkingSlot[] = [];
  private updateSubscription!: Subscription;
  currentDate: Date = new Date(); // Initialize with the current date and time
  showBookingModal: boolean = false;
  userName: string = '';
  bookingData: any = {};

  constructor(private httpService: HttpService, private parkingUpdateService: ParkingUpdateService) {}

  ngOnInit(): void {
    this.fetchAvailableParkingSlots();
    this.startPolling();

    // Update the current date and time every second
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  fetchAvailableParkingSlots(): void {
    this.httpService.fetchAvailableParkingSlots().subscribe(
      (data: AvailableParkingSlot[]) => {
        this.availableParkingSlots = data;
      },
      (error) => {
        console.error('Error fetching available parking slots:', error);
      }
    );
  }

  startPolling(): void {
    this.updateSubscription = this.parkingUpdateService.getUpdates().subscribe(
      (data: AvailableParkingSlot[]) => {
        // Handle updates, for example, update the availableParkingSlots array
        this.availableParkingSlots = data;
      },
      (error) => {
        console.error('Error fetching updates:', error);
      }
    );
  }

  stopPolling(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  bookParkingSlot(parkingSlotNumber: string): void {
    // Implement the logic for opening the booking modal
    console.log(`Booking parking slot ${parkingSlotNumber}`);
    this.showBookingModal = true;
  }

  closeBookingModal(): void {
    // Implement the logic for closing the booking modal
    this.showBookingModal = false;
  }

  submitBookingForm(): void {
    // Implement the logic for submitting the booking form
    console.log('Booking submitted successfully:', {
      userName: this.userName,
    });

    // Implement the API call to submit the booking data

    // Close the modal when done
    this.closeBookingModal();
  }
}
