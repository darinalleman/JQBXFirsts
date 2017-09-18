import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SpotifyService} from '../../shared/spotify/angular2-spotify';
import { UtilitiesService } from '../../shared/utilities/utilities.service';
import { NavigationService } from '../../shared/navigation/navigation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  type: string;
  options: any;
  userMusicData: any;
  constructor(public router: Router, public spotifyService: SpotifyService,
              private utilieites: UtilitiesService, private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.type = 'artists';
    this.user = JSON.parse(localStorage.getItem('user'));
    this.user.followers.total = this.utilieites.numberWithCommas(this.user.followers.total);
    this.loadUserPersonalizationData();
  }

  logout() {
   this.navigationService.logout();
  }

  loadUserPersonalizationData() {
    this.options = {
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
    this.navigationService.goToArtist(artist);
  };
}
