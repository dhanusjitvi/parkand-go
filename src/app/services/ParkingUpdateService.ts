// parking-update.service.ts
import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class ParkingUpdateService {
  constructor(private httpService: HttpService) {}

  // Polling interval in milliseconds
  private pollingInterval = 5000; // 5 seconds

  // Observable that emits updates
  getUpdates(): Observable<any> {
    return interval(this.pollingInterval).pipe(
      switchMap(() => this.httpService.fetchAvailableParkingSlots())
    );
  }
}
