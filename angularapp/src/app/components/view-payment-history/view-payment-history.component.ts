import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
 
@Component({
  selector: 'app-view-payment-history',
  templateUrl: './view-payment-history.component.html',
  styleUrls: ['./view-payment-history.component.css']
})
export class ViewPaymentHistoryComponent implements OnInit {
 
  uId: number = Number(sessionStorage.getItem("keyId"));
  uName: string;
  role: string = sessionStorage.getItem("keyRole");
 
  // name:string=sessionStorage.getItem("keyName");
 
  payments: any;
  payments1: any;
 
  constructor(private pService: PaymentService, private aService: AuthService) {
    console.log(this.uId)
 
 
 
    if (this.role == "Organizer") {
      this.pService.GetPaymentByUserId(this.uId)
        .subscribe(x => {
          this.payments = x;
          console.log(this.payments)
          var datePipe = new DatePipe("en-US");
          this.payments.paymentDate = datePipe.transform(this.payments.paymentDate,'dd/MM/yyyy')
        })
 
        this.pService.GetPayment()
        .subscribe(x => {
          this.payments1 = x;
          console.log(this.payments1)
        })
    }
 
    if (this.role == "Admin") {
      this.pService.GetPayment()
        .subscribe(x => {
          this.payments = x;
          console.log(this.payments)
          var datePipe = new DatePipe("en-US");
          this.payments.paymentDate = datePipe.transform(this.payments.paymentDate,'dd/MM/yyyy')
        })
 
       
    }
 
    // for (let i = 0; i < this.payments.length; i++) {
 
     
    // }
 
    this.aService.getNameById(this.uId)
    .subscribe(x=>{
      this.uName=x
    })
 
  }
 
  ngOnInit(): void {
  }
 
}