import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/services/booking.service';
import { EventService } from 'src/app/services/event.service';
import { PaymentService } from 'src/app/services/payment.service';
 
@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css']
})
export class CancelBookingComponent implements OnInit {
 
  event:any;
  amountToPayBack: number=0;
  amountPaid:number=0;
  charges:number=0;
  statusID:any;
 
  status:any;
 
  booking:any;
 
  uId:any;
  payment: any;
 
  twenty:number;
 
  bookID: number;
 
  constructor(private eService:EventService, private ar:ActivatedRoute,private r:Router,private bService:BookingService, private ts:ToastrService) {
 
   
    const eType=this.ar.snapshot.paramMap.get("eventType");
 
    const sId=this.ar.snapshot.paramMap.get("bookingStatus");
    this.statusID=Number(sId);
 
    const bId=this.ar.snapshot.paramMap.get("bookingID");
    this.bookID=Number(bId);
   
    this.eService.FindEventType(eType)
    .subscribe(x=>{
      this.event=x;
      this.charges=this.event.charges;
      console.log(this.event.charges);
 
      if(this.statusID==3||this.statusID==5){
        this.twenty=this.charges*0.2;
        this.amountPaid=this.twenty;
        this.amountToPayBack=this.twenty*0.6;
        console.log(this.amountPaid)
        console.log(this.amountToPayBack)
      }
 
      if(this.statusID==4||this.statusID==6){
        this.twenty=this.charges;
        this.amountPaid=this.twenty;
        this.amountToPayBack=this.twenty*0.6;
        console.log(this.amountPaid)
        console.log(this.amountToPayBack)
       
      }
 
 
    })
 
    // this.bService.ViewBookingById(this.bookID)
    // .subscribe(x=>{
    //   this.booking=x;
    //   this.status=this.booking.bookingStatus;
    //   console.log("s "+this.status)
    // })
 
    // this.pService.GetPaymentByUserId(this.uId)
    // .subscribe(x=>{
    //   this.payment=x;
    //   this.totalAmount=this.payment.totalAmount;
    //   this.amountToPay=this.payment.amountToPay
 
    //   console.log(this.payment);
 
    //   console.log(this.uId);
    // console.log(this.payment.totalAmount);
    // console.log(this.amountToPay);
    // })
 
   
 
 
  }
 
  ngOnInit(): void {
  }
 
  CancelBooking(){
    this.bService.DeleteBooking(this.bookID)
    .subscribe(()=>{
        this.ts.warning("Booking Cancelled!");
    })
    this.r.navigate(['viewBookings'])
 
  }
 
}