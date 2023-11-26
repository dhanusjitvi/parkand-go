// available-parking-slots.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ParkingUpdateService } from 'src/app/services/ParkingUpdateService';
import { AvailableParkingSlot } from 'src/app/interfaces/users';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-available-parking-slots',
  templateUrl: './available-parking-slots.component.html',
  styleUrls: ['./available-parking-slots.component.css'],
})
export class AvailableParkingSlotsComponent implements OnInit, OnDestroy {
  availableParkingSlots: AvailableParkingSlot[] = [];
  private updateSubscription!: Subscription;
  bookForm: FormGroup;
  currentDate: Date = new Date();
  isbookModalOpen: boolean = false;
  userName: string = '';
  selectedSlotNumber: string = '';

  constructor(
    private httpService: HttpService,
    private parkingUpdateService: ParkingUpdateService,
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      startDate: [
        this.getToday(),
        [Validators.required, this.futureDateValidator],
      ],
      startTime: ['', Validators.required],
      endDate: [
        this.getToday(),
        [Validators.required, this.futureDateValidator],
      ],
      endTime: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchAvailableParkingSlots();
    this.startPolling();

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
    console.log(`Booking parking slot ${parkingSlotNumber}`);
    this.selectedSlotNumber = parkingSlotNumber;
    this.openbookModal();
  }

  openbookModal(): void {
    this.bookForm.reset();
    this.isbookModalOpen = true;
  }

  closeBookingModal(): void {
    this.isbookModalOpen = false;
  }

  submitBookingForm(): void {
    if (
      !this.bookForm.get('userName')?.value ||
      !this.bookForm.get('startDate')?.value ||
      !this.bookForm.get('startTime')?.value ||
      !this.bookForm.get('endDate')?.value ||
      !this.bookForm.get('endTime')?.value ||
      !this.selectedSlotNumber
    ) {
      // Show a SweetAlert alert for missing fields
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Form',
        text: 'Please enter all fields.',
      });
      return; // Exit the function
    }
  
    const userName = this.bookForm.get('userName')?.value;
    const startDate = this.bookForm.get('startDate')?.value;
    const startTime = this.bookForm.get('startTime')?.value;
    const endDate = this.bookForm.get('endDate')?.value;
    const endTime = this.bookForm.get('endTime')?.value;
  
    // Assuming you have a service method to make the API call
    const leaveData = {
      slotNumber: this.selectedSlotNumber,
      userName: userName,
      startDate: startDate + ' ' + startTime,
      endDate: endDate + ' ' + endTime,
    };
  
    this.httpService.bookParkingSlot(leaveData).subscribe(
      (response: any) => {
        // Handle the response from the backend
        console.log('Leave application submitted successfully:', response);
  
        Swal.fire({
          icon: 'success',
          title: 'Leave Applied Successfully',
          text: 'Your leave has been applied successfully!',
        });
  
        this.closeBookingModal();
  
        // Fetch the updated available parking slots
        this.fetchAvailableParkingSlots();
      },
      (error) => {
        console.error('Error booking parking slot:', error);
  
        // Show a user-friendly error message
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed',
          text: 'An error occurred while booking the parking slot. Please try again.',
        });
      }
    );
  }
  

  getToday(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  futureDateValidator(control: {
    value: string;
  }): { [key: string]: boolean } | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    return selectedDate < currentDate ? { invalidDate: true } : null;
  }
}
