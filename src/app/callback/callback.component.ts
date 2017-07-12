import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SpotifyService} from "../shared/spotify/angular2-spotify";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent {

  public loading: boolean = false;
  public errorMessage: string;

  constructor(public router: Router, private spotifyService: SpotifyService) {
    let hash = window.location.hash;
    if (hash) {
      if (window.location.search.substring(1).indexOf('error') !== -1) {
        // login failure
        window.close();
      } else if (hash) {
        // login success
        let token = window.location.hash.split('&')[0].split('=')[1];
        localStorage.setItem('angular2-spotify-token', token);
      }
    } else {
      window.close();
    }
  }
}
