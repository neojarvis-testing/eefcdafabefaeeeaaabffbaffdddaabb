import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import {switchMap} from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {

  booking:any;
  user:any;
  uName:string=sessionStorage.getItem("keyName");
  uId:any;
  id:any = sessionStorage.getItem("keyId");


  constructor(private bService:BookingService,private uService:AuthService, private router:Router) {

    // this.uSevice.getIdByName(this.uName)
    // .subscribe(x=>{
    //   this.user=x;
    //   sessionStorage.setItem("keyId", this.user)
    // })
  }

  ngOnInit(): void {

    this.uService.getIdByName(this.uName)
      .pipe(
        switchMap(userId => {
          this.user = userId;
          sessionStorage.setItem("keyId", this.user);
          return this.bService.GetBookingsByUserId(userId);
        })
      )
      .subscribe(bookings => {
        this.booking = bookings;
        var datePipe = new DatePipe("en-US");
        this.booking.submissionDate = datePipe.transform(this.booking.submissionDate,'dd/MM/yyyy')
        this.booking.eventDate = datePipe.transform(this.booking.eventDate,'dd/MM/yyyy')
      });
  }

}