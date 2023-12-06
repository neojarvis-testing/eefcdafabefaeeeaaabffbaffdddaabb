import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }

  httpoptions={headers: new HttpHeaders({'Content-type':'application/json'})}

  private url="https://8080-cafbdfcedbbcdbabbeadcadfaddeb.premiumproject.examly.io/api/Event"

  getAllEvent():Observable<Event[]>{
    return this.http.get<Event[]>(this.url,this.httpoptions)
  }
  
  // getEventId(eventId:number):Observable<any>{
  //   return this.http.get<any>("https://8080-abcccaacdefabcaaaceeafebeccaddbefddaf.premiumproject.examly.io/api/Event/getById?id=" +eventId)
  // }

  getById(id:number):Observable<any>{
    return this.http.get<any>("https://8080-cafbdfcedbbcdbabbeadcadfaddeb.premiumproject.examly.io/api/Event/getById?id="+id)
  }

  addEvent(eventData:any):Observable<any>{
    return this.http.post<Event>(this.url,eventData,this.httpoptions)
  }
  
  updateEvent(eventData:Event):Observable<Event>{
    return this.http.put<Event>("https://8080-cafbdfcedbbcdbabbeadcadfaddeb.premiumproject.examly.io/api/Event/"+eventData.eventId,eventData,this.httpoptions)
  }

  deleteEvent(eventId:number):Observable<Event>{
    return this.http.delete<Event>(this.url +"/" +eventId)
  }
  
  FindEventType(eventType:string):Observable<Event>{
    return this.http.get<Event>(this.url+"/EventTypes?eventType="+eventType)
  }

  
}