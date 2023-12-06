import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/model/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-event',
  templateUrl: './get-event.component.html',
  styleUrls: ['./get-event.component.css']
})
export class GetEventComponent implements OnInit {

  eventData:Event[]=[]
  constructor(private es:EventService, private route:Router) {
    this.es.getAllEvent().subscribe(data=>{this.eventData.push(...data)})
   }

  ngOnInit() {
  }
  DeleteEvent(eventId:number){
    this.es.deleteEvent(eventId).subscribe(()=>
    {
      alert("Record deleted!")
      //this.eventData.splice(1)
      this.route.navigate(['/dashboard']) 
    })
  }
}
