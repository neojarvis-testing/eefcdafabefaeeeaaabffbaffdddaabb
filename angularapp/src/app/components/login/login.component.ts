import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router, private toast:ToastrService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    
  }

  onLogin()
  {
    if(this.loginForm.valid)
    {

      let roleValue:any;
      

    let uname:any;

    this.auth.getRole(this.loginForm.value.email)
    .subscribe(
      res => {
       
        roleValue = res;
      },
      err => 
      {
        
        roleValue = err;
      }
    )

    this.auth.getName(this.loginForm.value.email)
    .subscribe(
      res => {
       
        uname = res;
      },
      err => 
      {
        
        uname = err;
      }
    )

    this.auth.login(this.loginForm.value)
    .subscribe({
      next:(res) => {
        
        this.loginForm.reset();
        this.auth.storeToken(res.token);
       
      //  localStorage.setItem("keyRole", roleValue);
       
      //  localStorage.setItem("keyName", uname);
      //  localStorage.setItem("name2", uname);
      //  localStorage.setItem("name3", uname);

        sessionStorage.setItem("keyRole", roleValue);
        sessionStorage.setItem("keyName", uname);

        this.toast.success("Login Successful");

        if(roleValue == "Admin")
        {
          
          this.router.navigate(['dashboard'])
        }
        else if(roleValue == "Organizer")
        {
          
          this.router.navigate(['orgdash'])
        }
        
      },
      error:(err) => {
        this.toast.error("Login Failed");
       
      }
    })
    }
    else 
    {
      console.log("Failure");
    }
  }

}
