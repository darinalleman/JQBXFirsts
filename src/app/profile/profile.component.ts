import { Component, OnInit } from '@angular/core';
import {UtilityServiceService} from "../utility-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: any;
  constructor(public utilityService: UtilityServiceService, public router: Router) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('angular2-spotify-token');
    this.router.navigate(['home']);
  }
}
