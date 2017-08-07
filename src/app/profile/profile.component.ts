import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SpotifyService} from "../shared/spotify/angular2-spotify";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: any;
  public type: string;
  public options: any;
  public userMusicData: any;
  constructor(public router: Router, public spotifyService: SpotifyService) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.loadUserPersonalizationData();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['home']);
  }

  loadUserPersonalizationData() {
    this.type = 'artists';
    this.options ={
      limit: 50
    };
    this.spotifyService.getUserTopArtistsAndTracks(this.type, this.options).subscribe(
      data => {
        this.userMusicData = data.items;
      },
      error => {
        console.log(error);
      }
    )
  };

  goToArtist(artist) {
    localStorage.setItem('artist', JSON.stringify(artist));
    this.router.navigate(['main/artist'])
  };
}
