import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://8080-cafbdfcedbbcdbabbeadcadfaddeb.premiumproject.examly.io/api/Auth/";

  constructor(private http:HttpClient, private router:Router) { }

  httpheaders:HttpHeaders = new HttpHeaders({
    Accept:'application/json'
  })

  signUp(userObj:any)
  {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }

  login(loginObj:any)
  {
    return this.http.post<any>(`${this.baseUrl}login`, loginObj);
  }

  storeToken(tokenValue: string) {
    sessionStorage.setItem('token', tokenValue);

    setTimeout( ()=> {
      alert("Session logged out!");
      this.signOut();
    },900000);

  }

  reset(resetObj:any)
  {
    return this.http.put<any>(`${this.baseUrl}updatePassword`, resetObj, {headers:this.httpheaders});
  }

  getRole(email:string)
  {
    return this.http.get<string>(`${this.baseUrl}getRole/`+email, {headers:this.httpheaders});
  }

  getName(email:string)
  {
    return this.http.get<string>(`${this.baseUrl}getName/`+email, {headers:this.httpheaders});
  }

  getToken(){
    return sessionStorage.getItem('token')
  }

  isLoggedIn() : boolean {
    return !!sessionStorage.getItem('token')
  }

  signOut()
  {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }


  getUserByName(name:string)
  {
    return this.http.get<any>(`${this.baseUrl}getUserByName/`+name, {headers:this.httpheaders});
  }

  getIdByName(name:string)
  {
    return this.http.get<any>(`${this.baseUrl}getIdByName/`+name, {headers:this.httpheaders});
  }

  checkEmail(email:string)
  {
    return this.http.post<any>(`${this.baseUrl}CheckEmail/`+email, {headers:this.httpheaders});
  }

  getNameById(id:number)
  {
    return this.http.get<any>(`${this.baseUrl}getNameById/`+id, {headers:this.httpheaders});
  }

}
