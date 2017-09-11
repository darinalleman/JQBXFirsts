import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SpotifyService} from '../../shared/spotify/angular2-spotify';
import {LoadArtistService} from '../your-music/artists/artist/load-artist.service';
import { UtilitiesService } from '../../shared/utilities/utilities.service';

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
  constructor(public router: Router, public spotifyService: SpotifyService,  private loadArtistService: LoadArtistService, private utilieites: UtilitiesService) {
  }

  ngOnInit() {
    this.type = 'artists';
    this.user = JSON.parse(localStorage.getItem('user'));
    this.user.followers.total = this.utilieites.numberWithCommas(this.user.followers.total);
    this.loadUserPersonalizationData();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['home']);
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
    this.loadArtistService.currentArtist.next(artist);
    this.router.navigate(['main/artist'])
  };
}
