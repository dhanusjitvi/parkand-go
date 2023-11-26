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

    if (startDate !== this.getToday()) {
      
      Swal.fire({
        icon: 'error',
        title: 'Invalid Start Date',
        text: 'Start date must be today!',
      });
      return; 
    }

    if (startDate === endDate) {

      if (endTime < startTime) {
        // Show a SweetAlert alert for an invalid end time
        Swal.fire({
          icon: 'error',
          title: 'Invalid End Time',
          text: 'End time must be greater than or equal to start time!',
        });
        return; 
      }
    }


    if (endDate < startDate) {
      
      Swal.fire({
        icon: 'error',
        title: 'Invalid End Date',
        text: 'End date must be greater than or equal to start date!',
      });
      return; 
    }


    const leaveData = {
      slotNumber: this.selectedSlotNumber,
      startDate: startDate + ' ' + startTime,
      endDate: endDate + ' ' + endTime,
  
    };

   
    this.httpService.applyForLeave(leaveData).subscribe(
      (response: any) => {

        console.log('Leave application submitted successfully:', response);

 
        Swal.fire({
          icon: 'success',
          title: 'Leave Applied Successfully',
          text: 'Your leave has been applied successfully!',
        });

        
        this.updateTableWithNewLeaveStatus(this.selectedSlotNumber);

        this.closeLeaveModal();
      },
      (error) => {

        console.error('Error submitting leave application:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while applying for leave. Please try again later.',
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

  futureDateValidator(control: { value: string }): { [key: string]: boolean } | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    return selectedDate < currentDate ? { 'invalidDate': true } : null;
  }

  updateTableWithNewLeaveStatus(slotNumber: string): void {
   
    const slotToUpdate = this.occupiedParkingSlots.find(slot => slot.slotNumber === slotNumber);

    
    if (slotToUpdate) {
      slotToUpdate.leave = true;

      this.occupiedParkingSlots = [...this.occupiedParkingSlots];
    }
  }
}
