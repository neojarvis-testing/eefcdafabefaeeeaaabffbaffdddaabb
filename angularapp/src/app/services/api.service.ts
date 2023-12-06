import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl:string = "https://8080-cafbdfcedbbcdfabcaaaceeafebecebbffdafdefabcc.premiumproject.examly.io/api/Booking/";

  constructor(private http:HttpClient) { }

  book(userObj:any)
  {
    return this.http.post<any>(`${this.baseUrl}book`, userObj);
  }

  getBooking()
  {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  

}
