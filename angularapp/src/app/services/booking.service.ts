import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  public apiURL = "https://8080-cafbdfcedbbcdbabbeadcadfaddeb.premiumproject.examly.io/api/Booking"
  public http:HttpClient
 
  constructor(myHttp:HttpClient)
  {
    this.http = myHttp;
  }
 
  httpOptions = {headers:new HttpHeaders({'content-type':'application/json'})}
 
  AddBooking(bookingDetails : any):Observable<any>
  {
    return this.http.post<any>(this.apiURL+'/AddBooking',bookingDetails,this.httpOptions);
  }
 
  ViewBooking():Observable<any[]>
  {
    return this.http.get<any[]>(this.apiURL);
  }
 
  ViewBookingById(id:number):Observable<any>
  {
    return this.http.get<any>(this.apiURL+"/"+id, this.httpOptions);
  }
 
  DeleteBooking(id:number):Observable<any>
  {
    return this.http.delete<any>(this.apiURL+'/'+id);
  }
 
  EditBooking(id:number,data:any):Observable<any>{
    return this.http.put<any>(this.apiURL+"/"+id,data,this.httpOptions);
  }

  GetBookingsByUserId(id:number):Observable<any>
  {
    return this.http.get<any>(this.apiURL+"/getBookings/"+id, this.httpOptions);
  }

  UpdateStatus(id:number, statusId:number):Observable<any>{
    return this.http.put<any>(this.apiURL+"/UpdateStatus/"+id+"/"+statusId, this.httpOptions);
  }

}