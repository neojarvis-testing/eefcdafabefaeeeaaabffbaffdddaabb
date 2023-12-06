import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  eventData:Event

  eventform!: FormGroup;
  
  myDate = new Date();
  currentDate: string;
  formatedDate:string;
  actualDate:Date;
 
  constructor(private fb:FormBuilder,private es:EventService, private route:Router, private datePipe:DatePipe, private ts:ToastrService) {

    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.formatedDate = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy HH:mm:ss', 'IST');
    this.actualDate = new Date(this.formatedDate);

   }

   uname:any;

   ngOnInit() {
    this.uname = sessionStorage.getItem("keyName")
    
    this.eventform = new FormGroup({
      'eventType':new FormControl('',Validators.required),
      'description':new FormControl('',[Validators.required, Validators.maxLength(100)]),
      'package':new FormControl('',Validators.required),
      'participantCount':new FormControl('',Validators.required),
      'bookingStatus':new FormControl('',Validators.required),
      'charges':new FormControl('',Validators.required),
      'createBy':new FormControl(this.uname,Validators.required),
      'createAt':new FormControl(this.actualDate, Validators.required)
    })

  }
  // eventform=this.fb.group({
  //   eventType:["",Validators.required],
  //   description:["",Validators.required],
  //   package:["",Validators.required],
  //   participantCount:["",Validators.required],
  //   charges:["",Validators.required],
  //   createBy:[this.uname, Validators.required],
  //   createAt:["currentDateAndTime", Validators.required]
  // })
  savedata(eventform:FormGroup):void{
    this.eventData=eventform.value
    console.log(eventform.value)
  
    this.es.addEvent(this.eventData)
    .subscribe({
      next:(res) => {
        this.ts.success("Event Added Successfully")
        this.route.navigate(['/EventGet']);
      },
      error:(err) => {
        this.ts.error(err.error.message);
      }
    })
    
  }
  

}
