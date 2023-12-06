import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VenueService } from 'src/app/services/venue.service';
 
@Component({
  selector: 'app-editvenue',
  templateUrl: './editvenue.component.html',
  styleUrls: ['./editvenue.component.css']
})
export class EditvenueComponent implements OnInit {
 
 
  venueId:number
  list:any
  venueForm:any
  currentDate: string;
  formatedDate:string;
  actualDate:Date;
 
  uname:any;
 
 
  constructor(private fb: FormBuilder, private vs:VenueService, private route: Router, private ar: ActivatedRoute,private datePipe:DatePipe, private ts:ToastrService)
  {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.formatedDate = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy HH:mm:ss', 'IST');
    this.actualDate = new Date(this.formatedDate);
   
  }
   
  ngOnInit(): void {
    const tid = this.ar.snapshot.paramMap.get('venueId');
    this.venueId = Number(tid)
    console.log("ar "+this.venueId);
 
    this.uname = localStorage.getItem("keyName")
 
   
 
    this.vs.getbyId(this.venueId).subscribe(x => this.list = x);
 
    this.venueForm = new FormGroup({
      'venueDetails':new FormControl('',Validators.required),
      'modifiedBy':new FormControl(this.uname,Validators.required),
      'modifiedAt':new FormControl('', Validators.required)
    })
  }
 
  saveData(venueForm : FormGroup)
  {
    this.list.venueDetails = venueForm.value.venueDetails
    
    
    this.vs.editVenue(this.list.venueId,this.list).subscribe({
      next:(res) => {
        
        this.route.navigate(['/VenueGet']);
        this.ts.success("Venue Edited Successfully!")
      },
      error:(err) => {
        this.ts.error(err.error.message);
      }
    })
  }
}