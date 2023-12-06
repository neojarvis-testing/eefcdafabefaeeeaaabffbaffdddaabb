import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venue } from '../model/venue';

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  constructor(private http:HttpClient) { }

  httpoptions={headers: new HttpHeaders({'Content-type':'application/json'})}

  private url="https://8080-cafbdfcedbbcdbabbeadcadfaddeb.premiumproject.examly.io/api/Venue/"

  getAllVenues():Observable<Venue[]>{
    return this.http.get<Venue[]>(this.url,this.httpoptions)
  }

  addVenue(venueData:any):Observable<any>{
    return this.http.post<Venue>(this.url+"create",venueData,this.httpoptions)
  }

  deleteVenue(venueID:number):Observable<Venue>{
    return this.http.delete<Venue>(this.url +"delete/" +venueID)
  }

  editVenue(id :number,venue: Venue):Observable<any>{
    return this.http.put<any>(this.url + "update/" +id,venue,this.httpoptions)
  }

  getbyId(venueID:number):Observable<any>{
    return this.http.get<any>(this.url + "getById?id=" + venueID)
  }
}
