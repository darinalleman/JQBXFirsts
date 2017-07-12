import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {ApiService} from "../api/api.service";
import {SpotifyService} from "../spotify/angular2-spotify";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private apiService: ApiService, private spotifyService: SpotifyService) {}

  canActivate() {
    // if spotify is not logged in return false and go back to login screen otherwise return true
    // Implement later in the future
    if (localStorage.getItem('angular2-spotify-token')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
