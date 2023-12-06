import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  forgotForm!:FormGroup;

  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router, private ts:ToastrService) { }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

  }

    onReset()
    {
      
      sessionStorage.setItem("keyEmail", this.forgotForm.value.email)

      this.auth.checkEmail(this.forgotForm.value.email)
      .subscribe({
        next:(res) => {
          this.ts.success("Email verified!")
          this.router.navigate(['/reset']);
        },
        error:(err) => {
          this.ts.error("Email not found!")
        }
      })

    }

}
