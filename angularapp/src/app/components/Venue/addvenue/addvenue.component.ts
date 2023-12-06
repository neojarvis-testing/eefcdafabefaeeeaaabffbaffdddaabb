import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VenueService } from 'src/app/services/venue.service';
import { DatePipe } from '@angular/common';
import { Venue } from 'src/app/model/venue';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addvenue',
  templateUrl: './addvenue.component.html',
  styleUrls: ['./addvenue.component.css']
})
export class AddvenueComponent implements OnInit {

  venueData:Venue

  myDate = new Date();
  venueform!: FormGroup;

  currentDate: string;
  formatedDate:string;
  actualDate:Date;

  constructor(private fb:FormBuilder,private vs:VenueService, private route:Router, private datePipe:DatePipe, private ts:ToastrService) {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.formatedDate = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy HH:mm:ss', 'IST');
    this.actualDate = new Date(this.formatedDate);
   }

   uname:any;

  ngOnInit(): void {
    this.uname = localStorage.getItem("keyName")
    
    this.venueform = new FormGroup({
      'venueDetails':new FormControl('',Validators.required),
      'createBy':new FormControl(this.uname,Validators.required),
      'createAt':new FormControl(this.actualDate, Validators.required)
  })
}

savedata(venueform:FormGroup):void{
  this.venueData=venueform.value
  
  console.log(this.venueData)
  this.vs.addVenue(this.venueData)
  .subscribe({
    next:(res) => {
      this.ts.success("Venue Added Successfully")
      this.route.navigate(['/VenueGet']);
    },
    error:(err) => {
      this.ts.error(err.error.message);
    }
  })
}

}
