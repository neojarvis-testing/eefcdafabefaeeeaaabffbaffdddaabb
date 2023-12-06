import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/model/event';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventId: number
  list: any
  eventform: any


  constructor(private fb: FormBuilder, private es: EventService, private route: Router, private ar: ActivatedRoute, private datePipe:DatePipe, private ts:ToastrService) {
   
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.formatedDate = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy HH:mm:ss', 'IST');
    this.actualDate = new Date(this.formatedDate);

  }

  uname:any;

  currentDate: string;
  formatedDate:string;
  actualDate:Date;

  ngOnInit() {
    const tid = this.ar.snapshot.paramMap.get('eventId');
    this.eventId = Number(tid)
    console.log("ar "+this.eventId);

    // this.es.getEventId(this.eId)
    // .subscribe(
    //   (data) => {
    //     this.eventData = data;
    //     console.log(this.eventData)
    //   })

    this.es.getById(this.eventId)
    .subscribe(x=>{
      this.list=x;
      console.log(this.list)
    })


    // const tid=this.ar.snapshot.paramMap.get('id');
    // this.id=Number(tid);
    // this.http.ReadById(this.id)
    // .subscribe(res=>{
    //   this.list=res;
    // })


    // this.eventform = this.fb.group({
    //   eventId: [""],
    //   eventType: ["", Validators.required],
    //   description: ["", Validators.required],
    //   package: ["", Validators.required],
    //   participantCount: ["", Validators.required],
    //   charges: ["", Validators.required]
    // })

    this.uname = sessionStorage.getItem("keyName")
    
    this.eventform = new FormGroup({
      'eventId':new FormControl(''),
      'eventType':new FormControl('',Validators.required),
      'description':new FormControl('',[Validators.required, Validators.maxLength(100)]),
      'package':new FormControl('',Validators.required),
      'participantCount':new FormControl('',Validators.required),
      'bookingStatus':new FormControl('',Validators.required),
      'charges':new FormControl('',Validators.required),
      'modifiedBy':new FormControl(this.uname),
      'modifiedAt':new FormControl(this.actualDate)
    })


  }


  savedata(eventform: FormGroup): void {
    this.list = eventform.value
    console.log(this.list)

    this.es.updateEvent(this.list).subscribe(() => {this.ts.success("Records updated successfully")
      this.route.navigate(["/EventGet"])
  }
    )
    console.log(this.list)
  }

}
