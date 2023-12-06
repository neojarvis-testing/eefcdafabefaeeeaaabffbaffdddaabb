import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Booking } from 'src/app/model/booking';
import { EventService } from 'src/app/services/event.service';
import { VenueService } from 'src/app/services/venue.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
 
@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {

  eventList:any;

  venueList:any;
 
  bookingService : BookingService
  bookingForm : FormGroup
  myBooking:Booking
  
  user:any;
  uName:string=sessionStorage.getItem("keyName");

  myDate = new Date();
  currentDate: string;
  formatedDate:string;
  actualDate:Date;
  
  constructor(myBookingService:BookingService, private eService:EventService, private vService:VenueService,private uSevice:AuthService, private router:Router, private fb:FormBuilder, private ts:ToastrService, private datePipe:DatePipe)
  {

    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.formatedDate = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy HH:mm:ss', 'IST');
    this.actualDate = new Date(this.formatedDate);

    this.eService.getAllEvent()
    .subscribe(x=>{
      this.eventList=x;
      console.log(this.eventList);
    })

    this.vService.getAllVenues()
    .subscribe(x=>{
      this.venueList=x;
      console.log(this.venueList);
    })

    this.uSevice.getUserByName(this.uName)
    .subscribe(x=>{
      this.user=x;
      console.log(this.user)
    })

    this.bookingService=myBookingService

  }

  uname:any;

  ngOnInit() {

    this.uname = sessionStorage.getItem("keyName")

    this.bookingForm = this.fb.group({
      
      userId: ['', Validators.required],
      userName:['',Validators.required],
      eventDate:['',Validators.required],
      submissionDate:[new Date().toISOString().split('T')[0], [Validators.required]],
      description:['', [Validators.required, Validators.maxLength(100)]],
      headCount:['',Validators.required],
      eventType:['', Validators.required],
      venueDetails:['', Validators.required],
      bookingStatus:[1],
      createBy: [this.uname,Validators.required],
      createAt: [this.actualDate, Validators.required]
    });

    this.bookingForm.setValidators(this.dateDifferenceValidator.bind(this));
        
  }

  dateDifferenceValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const submissionDate = formGroup.get('submissionDate').value;
    const eventDate = formGroup.get('eventDate').value;

    if (submissionDate && eventDate) {
      const submissionDateObj = new Date(submissionDate);
      const eventDateObj = new Date(eventDate);

      const differenceInDays = (eventDateObj.getTime() - submissionDateObj.getTime()) / (1000 * 3600 * 24);

      if (differenceInDays < 5) {
        formGroup.get('eventDate').setErrors({ dateDifferenceInvalid: true });
        return { dateDifferenceInvalid: true };
      }
    }

    formGroup.get('eventDate').setErrors(null);
    return null;
  }
 
  onSubmit()
  {
    window.scrollTo({top:0, behavior:'smooth'});

    if(this.bookingForm.valid)
    {

      this.myBooking = this.bookingForm.value
      console.log(this.myBooking);
      this.bookingService.AddBooking(this.myBooking).subscribe({
        next:(res) => {
          this.ts.success("Booking Added!");
          this.router.navigate(['/viewBookings']) 
        },
        error:(err) => {
          this.ts.error(err.error.message);
        }
      })
    }
    else{
      console.log("invalid data")
    }
  }
 
}