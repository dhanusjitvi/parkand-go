import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

interface OccupiedParkingSlot {
  _id: string;
  userId: {
    _id: string;
    name: string;
    number: string;
  };
  slotNumber: string;
  endDate: Date;
  leave: boolean;
  __v: number;
}

@Component({
  selector: 'app-occupied-parking-slots',
  templateUrl: './occupied-parking-slots.component.html',
  styleUrls: ['./occupied-parking-slots.component.css'],
})
export class OccupiedParkingSlotsComponent implements OnInit {
  occupiedParkingSlots: OccupiedParkingSlot[] = [];
  leaveForm: FormGroup;
  isLeaveModalOpen: boolean = false;
  selectedSlotNumbers: string | undefined;
  selectedSlotNumber: string = ''; 

  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.leaveForm = this.fb.group({
      startDate: [this.getToday(), [Validators.required, this.futureDateValidator]],
      startTime: ['', Validators.required],
      endDate: [this.getToday(), [Validators.required, this.futureDateValidator]],
      endTime: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchOccupiedParkingSlots();
  }

  fetchOccupiedParkingSlots(): void {
    this.httpService.fetchOccupiedParkingSlots().subscribe(
      (response: any) => {
        if (response.status && response.OccupiedParkingSlots) {
          this.occupiedParkingSlots = response.OccupiedParkingSlots;
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching occupied parking slots:', error);
      }
    );
  }

  leaveParkingSlot(parkingSlotNumber: string): void {
    console.log(`Leaving parking slot ${parkingSlotNumber}`);
    this.selectedSlotNumber = parkingSlotNumber;
    this.openLeaveModal(); // Open the leave modal when leaving a parking slot
  }

  openLeaveModal(): void {
    this.leaveForm.reset();
    this.isLeaveModalOpen = true;
  }

  closeLeaveModal(): void {
    this.isLeaveModalOpen = false;
  }

  submitLeaveForm(): void {
    // Check if specific fields are not entered
    if (
      !this.leaveForm.get('startDate')?.value ||
      !this.leaveForm.get('startTime')?.value ||
      !this.leaveForm.get('endDate')?.value ||
      !this.leaveForm.get('endTime')?.value ||
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

    const startDate = this.leaveForm.get('startDate')?.value;
    const startTime = this.leaveForm.get('startTime')?.value;
    const endDate = this.leaveForm.get('endDate')?.value;
    const endTime = this.leaveForm.get('endTime')?.value;

    // Check if the start date is today
    if (startDate !== this.getToday()) {
      // Show a SweetAlert alert for an invalid start date
      Swal.fire({
        icon: 'error',
        title: 'Invalid Start Date',
        text: 'Start date must be today!',
      });
      return; // Exit the function
    }

    // Check if the user enters the same date
    if (startDate === endDate) {
      // Check if the end time is less than the start time
      if (endTime < startTime) {
        // Show a SweetAlert alert for an invalid end time
        Swal.fire({
          icon: 'error',
          title: 'Invalid End Time',
          text: 'End time must be greater than or equal to start time!',
        });
        return; // Exit the function
      }
    }

    // Check if the end date is greater than or equal to the start date
    if (endDate < startDate) {
      // Show a SweetAlert alert for an invalid end date
      Swal.fire({
        icon: 'error',
        title: 'Invalid End Date',
        text: 'End date must be greater than or equal to start date!',
      });
      return; // Exit the function
    }

    // Prepare the data to send to the backend
    const leaveData = {
      slotNumber: this.selectedSlotNumber,
      startDate: startDate + ' ' + startTime,
      endDate: endDate + ' ' + endTime,
      // Add other data if needed
    };

    // Call your API to submit leave data
    this.httpService.applyForLeave(leaveData).subscribe(
      (response: any) => {
        // Handle success response
        console.log('Leave application submitted successfully:', response);

        // Show SweetAlert success message
        Swal.fire({
          icon: 'success',
          title: 'Leave Applied Successfully',
          text: 'Your leave has been applied successfully!',
        });

        // Update the table with the new leave status
        this.updateTableWithNewLeaveStatus(this.selectedSlotNumber);

        // Close the modal when done
        this.closeLeaveModal();
      },
      (error) => {
        // Handle error response
        console.error('Error submitting leave application:', error);

        // Show SweetAlert error message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while applying for leave. Please try again later.',
        });
      }
    );
  }

  // Get today's date in 'YYYY-MM-DD' format
  getToday(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  // Custom validator for future dates
  futureDateValidator(control: { value: string }): { [key: string]: boolean } | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    return selectedDate < currentDate ? { 'invalidDate': true } : null;
  }

  // Function to update the table with the new leave status
  updateTableWithNewLeaveStatus(slotNumber: string): void {
    // Find the corresponding slot in the occupiedParkingSlots array
    const slotToUpdate = this.occupiedParkingSlots.find(slot => slot.slotNumber === slotNumber);

    // Update the leave status
    if (slotToUpdate) {
      slotToUpdate.leave = true;

      // If you are not fetching the data again from the server, you might need to manually trigger change detection
      // or update the view to reflect the changes
      // For example, if your data binding is not updating, you can do the following:
      this.occupiedParkingSlots = [...this.occupiedParkingSlots];
    }
  }
}
