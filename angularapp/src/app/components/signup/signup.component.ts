import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!:FormGroup;

  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router, private ts:ToastrService) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      userName:['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      cpassword: ['', Validators.required],
      userRole: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    },
    {
      validator:
      this.passwordMatch
    });

  }

  passwordMatch(group:FormGroup)
    {
      const password = group.get('password').value;
      const confirmpass = group.get('cpassword').value;
        
      return password === confirmpass ? null : {mismatch:true};

    }

  onSignUp()
  {
    if(this.signUpForm.valid)
    {
    
    this.auth.signUp(this.signUpForm.value)
    .subscribe({
      next:(res) => {
        this.ts.success("User Registered")
        this.signUpForm.reset();
        this.router.navigate(['login']);
      },
      error:(err) => {
        this.ts.error(err.error.message);
      }
    })
    }
    else 
    {
      console.log("Failure");
    }
  }

}
