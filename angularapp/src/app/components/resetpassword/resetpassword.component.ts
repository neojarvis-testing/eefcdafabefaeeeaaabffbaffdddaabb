import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  resetForm!:FormGroup;
  emailvar:any;

  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router, private ts:ToastrService) { }

  ngOnInit() {

    this.emailvar = sessionStorage.getItem("keyEmail");

    this.resetForm = this.fb.group({
      email: [this.emailvar, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      cpassword: ['', Validators.required]
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

    onReset()
    {
      this.ts.success("Password Reset!")
      this.auth.reset(this.resetForm.value)
      .subscribe({
        next:(res) => {
          this.router.navigate(['/login']);
        },
        error:(err) => {
          alert(err.error.message);
        }
      })

    }

}
