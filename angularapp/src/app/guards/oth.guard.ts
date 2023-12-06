import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class OthGuard implements CanActivate {

  constructor(private auth:AuthService, private router:Router, private ts:ToastrService)
    {

    }

    role = sessionStorage.getItem("keyRole");

    canActivate():boolean{
    
      if(this.auth.isLoggedIn() && this.role == "Organizer")
      {
        return true;
      } 
      
      // else if(this.auth.isLoggedIn() && this.role == "Admin")
      // {
      //   alert("Error occured! Please try again.");
      //   this.router.navigate(['login']);
      //   return false;
      // }
  
      else
      {
        this.ts.error("User unauthorized! Please try again.");
        
        this.router.navigate(['/sorry']);
        return false;
      }
      
    }
  
}
