import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { EventService } from 'src/app/services/event.service';
import { PaymentService } from 'src/app/services/payment.service';
 
@Component({
  selector: 'app-payment-twenty',
  templateUrl: './payment-twenty.component.html',
  styleUrls: ['./payment-twenty.component.css']
})
export class PaymentTwentyComponent implements OnInit {
 
  user: any;
  uName: string = sessionStorage.getItem("keyName");
  // id:any;
  booking: any=[];
  bookID:number;
  totalAmount: number=0;
  amountToPay:number=0;
 
  event:any=[];
  paymentForm: any;
 
  constructor(private uSevice: AuthService, private pService: PaymentService,private r:Router,private ar:ActivatedRoute,private eService:EventService,private bService:BookingService, private fb:FormBuilder, private ts:ToastrService) {
   
    const eType=this.ar.snapshot.paramMap.get("eventType");
 
    const bId=this.ar.snapshot.paramMap.get("bookingID");
    this.bookID=Number(bId);
   
    this.eService.FindEventType(eType)
    .subscribe(x=>{
      this.event=x;
      this.amountToPay=this.event.charges*0.2;
      console.log(this.event);
    })
   
   
    console.log(eType);
 
    this.uSevice.getIdByName(this.uName)
      .subscribe(x => {
        this.user = x;
       
        sessionStorage.setItem("keyId", this.user)
      })
 
  }
 
  id:any = sessionStorage.getItem("keyId")
 
 
 
  ngOnInit(): void {
 
    this.paymentForm = this.fb.group({
     
      userId: ['', Validators.required],
      bookingID: ['', Validators.required],
      status:['',Validators.required],
      totalAmount:['',Validators.required],
      paymentDate:[new Date().toISOString().split('T')[0], [Validators.required]],
      amountToPay:['', [Validators.required]],
      modeOfPayment:['',Validators.required]
     
    });
   
  }
  // b:any=this.booking[0]
  // b:number=this.booking[0].bookingStatus;
  // if(this.b==1){
 
  // }
 
  // p:string="Pending"
  status:string="Verified"
  // b:string="Booked"
  // c:string="Confirmed"
  pay() {
    this.ts.success("Payment Done")
    this.pService.PostPayment(this.paymentForm.value)
    .subscribe(()=>{
      
      this.r.navigate(['viewBookings'])
    })
 
   
 
    this.bService.UpdateStatus(this.bookID,5)
    .subscribe(()=>{
      
    })
  }
 
}