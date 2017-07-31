import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  public artist:any;
  public type:string;
  public isFollowing:boolean;
  public sub: any;

  constructor(public spotifyService:SpotifyService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadArtist();
    this.checkIfUserFollowsArtist();
  }

  loadArtist() {
    this.spotifyService.getArtist(JSON.parse(localStorage.getItem('artist')).id).subscribe(
      data => {
        this.artist = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  checkIfUserFollowsArtist() {
    this.type = 'artist';
    this.spotifyService.userFollowingContains(this.type, JSON.parse(localStorage.getItem('artist')).id).subscribe(
      data => {
        this.isFollowing = data[0];
      },
      error => {
        console.log(error);
      }
    )
  };

  followArtist() {
    this.type = 'artist';
    this.spotifyService.follow(this.type,  JSON.parse(localStorage.getItem('artist')).id).subscribe(
      () => {
       this.checkIfUserFollowsArtist();
      },
      error => {
        console.log(error);
      }
    )
  }

  unfollowArtist() {
    this.type = 'artist';
    this.spotifyService.unfollow(this.type,  JSON.parse(localStorage.getItem('artist')).id).subscribe(
      () => {
       this.checkIfUserFollowsArtist();
      },
      error => {
        console.log(error);
      }
    )
  }

}
