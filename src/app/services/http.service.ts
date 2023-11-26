import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccupiedParkingSlot , AvailableParkingSlot,TemporaryParkingSlot} from '../interfaces/users';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:5000/'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  fetchOccupiedParkingSlots(): Observable<OccupiedParkingSlot[]> {
    return this.http.get<OccupiedParkingSlot[]>(`${apiUrl}OccupiedParkingSlots`);
  }

  fetchAvailableParkingSlots(): Observable<AvailableParkingSlot[]> {
    return this.http.get<AvailableParkingSlot[]>(`${apiUrl}users-on-leave`);
  }


  fetchTemporaryParkingSlots(): Observable<TemporaryParkingSlot[]> {
    return this.http.get<TemporaryParkingSlot[]>(`${apiUrl}temporary-users`);
  }


  applyForLeave(data: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}users-apply-onleave`, data);
  }

  bookParkingSlot(data: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}get-bookParkingSlot`, data);
  }
}
