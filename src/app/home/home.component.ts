import { Component, OnInit } from '@angular/core';
import {UtilityServiceService} from "../utility-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user: Object;
  constructor(public utilityService: UtilityServiceService) {
     this.user = JSON.parse(localStorage.getItem('user'));
  }
  ngOnInit() {
  }

}
