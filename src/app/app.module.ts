import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AvailableParkingSlotsComponent } from './components/available-parking-slots/available-parking-slots.component';
import { OccupiedParkingSlotsComponent } from './components/occupied-parking-slots/occupied-parking-slots.component';
import { TemporaryParkingSlotsComponent } from './components/temporary-parking-slots/temporary-parking-slots.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AvailableParkingSlotsComponent,
    OccupiedParkingSlotsComponent,
    TemporaryParkingSlotsComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzMessageModule,
    NzButtonModule,
    NzIconModule,
    NzSliderModule,
    ReactiveFormsModule,
    NzTableModule,
    NzDividerModule,
    NzToolTipModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
    
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
