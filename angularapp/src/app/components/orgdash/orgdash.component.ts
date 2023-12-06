import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/model/event';

@Component({
  selector: 'app-orgdash',
  templateUrl: './orgdash.component.html',
  styleUrls: ['./orgdash.component.css']
})
export class OrgdashComponent implements OnInit {

  eventData:Event[]=[]
  constructor(private es:EventService, private route:Router) {
    this.es.getAllEvent().subscribe(data=>{this.eventData.push(...data)})
   }
 
 
 
 ngOnInit() {
   
 }
 

}
