import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SpotifyService} from '../../shared/spotify/angular2-spotify';
import { NavigationService } from '../../shared/navigation/navigation.service';
import {AuthService} from "../../shared/auth";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(public router: Router,
              public spotifyService: SpotifyService,
              private navigationService: NavigationService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
   this.navigationService.logout();
   this.auth.loggedOut.next(true);
  }

}
