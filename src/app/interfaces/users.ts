export interface OccupiedParkingSlot {
    _id: string;
    userId: {
      _id: string;
      name: string;
      number: string;
    };
    slotNumber: string;
    endDate: Date | string; // Modify this line
    leave: boolean;
    leaveStartDate?: Date | null;
    leaveEndDate?: Date | null;
    __v: number;
  }
  

 export interface AvailableParkingSlot {
    slotNumber: string;
    leaveStartDate:Date | string;
    leaveEndDate: Date | string;
 }


 
 export interface TemporaryParkingSlot {
    userName: string,
    slotNumber: string;
    startDate:Date | string;
    endDate: Date | string;
 }