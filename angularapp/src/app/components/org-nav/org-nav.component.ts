import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-org-nav',
  templateUrl: './org-nav.component.html',
  styleUrls: ['./org-nav.component.css']
})
export class OrgNavComponent implements OnInit {

  constructor(private auth:AuthService, private ts:ToastrService) { }

  Uname = sessionStorage.getItem("keyName");

  ngOnInit(): void {
  }

  logout()
 {
   this.ts.info("Logged Out!")
   this.auth.signOut();
   
 }

 

}
