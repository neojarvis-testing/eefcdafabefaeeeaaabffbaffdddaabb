import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }
 
  httpoptions={headers: new HttpHeaders({'Content-type':'application/json'})}
 
  GetPayment():Observable<any>{
    return this.http.get<any>("https://8080-cafbdfcedbbcdbabbeadcadfaddeb.premiumproject.examly.io/api/Payment",this.httpoptions);
  }
 
  PostPayment(data:any):Observable<any>{
    return this.http.post<any>("https://8080-cafbdfcedbbcdbabbeadcadfaddeb.premiumproject.examly.io/api/Payment",data,this.httpoptions);
  }

  GetPaymentByUserId(id:number):Observable<any>{
    return this.http.get<any>("https://8080-cafbdfcedbbcdbabbeadcadfaddeb.premiumproject.examly.io/api/Payment/getById/"+id);
  }

}
