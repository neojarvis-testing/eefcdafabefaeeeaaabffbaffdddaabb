import { Component, OnInit } from '@angular/core';
import { VenueService } from 'src/app/services/venue.service';
import { Venue } from 'src/app/model/venue';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getvenues',
  templateUrl: './getvenues.component.html',
  styleUrls: ['./getvenues.component.css']
})
export class GetvenuesComponent implements OnInit {

  venueData:Venue[]=[]
  constructor(private vs:VenueService, private route:Router) {
    this.vs.getAllVenues().subscribe(data=>{this.venueData.push(...data)})
   }

  ngOnInit(): void {
  }
  DeleteVenue(venueId:number){
    this.vs.deleteVenue(venueId).subscribe(()=>
    {
      alert("Record deleted!")
      
      this.route.navigate(['/dashboard']) 
    })
  }
}
