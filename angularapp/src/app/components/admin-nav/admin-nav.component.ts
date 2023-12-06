import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

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
