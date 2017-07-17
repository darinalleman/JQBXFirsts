import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('angular2-spotify-token');
    this.router.navigate(['login']);
  }

}
