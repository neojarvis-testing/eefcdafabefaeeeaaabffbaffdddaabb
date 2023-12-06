import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sorry',
  templateUrl: './sorry.component.html',
  styleUrls: ['./sorry.component.css']
})
export class SorryComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  toSignup()
  {
    this.router.navigate(['/signup'])
  }

  toLogin()
  {
    this.router.navigate(['/login'])
  }

}
