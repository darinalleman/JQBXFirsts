import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: any;
  constructor(public router: Router) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['home']);
  }
}
