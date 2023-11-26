import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';


import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

interface status {
  shape: string,
  color: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('500ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class HomeComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

 


  ngOnInit() {

    

  }

 
  

  

  

}