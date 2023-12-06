import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/services/booking.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent implements OnInit {
  
  
  booking:any;

  constructor(private bService:BookingService, private ts:ToastrService, private r:Router) { }

  ngOnInit(): void {

    this.bService.ViewBooking().subscribe(
      x => 
      {
        this.booking = x;
        var datePipe = new DatePipe("en-US");
        this.booking.submissionDate = datePipe.transform(this.booking.submissionDate,'dd/MM/yyyy')
        this.booking.eventDate = datePipe.transform(this.booking.eventDate,'dd/MM/yyyy')
      }
    )

  }

  submit(f:NgForm, id:number){
    
    //this.ts.success("Updated!")
      this.bService.UpdateStatus(id, f.value.bookingStatus)

      .subscribe( x=> 
        {

          window.scrollTo({top:0, behavior:'smooth'});

          this.ts.success("Booking Status Updated! Kindly Refresh The Page!")
          console.log(id+", "+f.value.bookingStatus);
          
        })
  }

  DeleteBooking(bookingID:number){
    this.bService.DeleteBooking(bookingID)
    .subscribe(()=>{
      this.ts.warning("Booking Deleted! Kindly Refresh The Page!")
      this.r.navigate(['allBookings'])
    })
  }

}
