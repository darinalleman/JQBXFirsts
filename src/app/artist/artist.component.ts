import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import {ActivatedRoute} from '@angular/router';
import {LoadArtistService} from "./load-artist.service";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  public artist: any;
  public type: string;
  public isFollowing: boolean;
  private artistId: any;

  constructor(public spotifyService: SpotifyService, private loadArtistService: LoadArtistService) {
  }

  ngOnInit() {
    this.loadArtistService.currentArtist.subscribe(
      currentArtist => {
        console.log(currentArtist);
        if (currentArtist.id) {
          this.artistId = currentArtist.id;
          this.loadArtist(this.artistId);
          this.checkIfUserFollowsArtist(this.artistId);
          console.log('from observ')
        } else {
          this.artistId = JSON.parse(localStorage.getItem('artist')).id;
          this.loadArtist(this.artistId);
          this.checkIfUserFollowsArtist(this.artistId);
          console.log('from local')
        }
      });

  }

  loadArtist(id) {
    this.spotifyService.getArtist(id).subscribe(
      data => {
        this.artist = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  checkIfUserFollowsArtist(id) {
    this.type = 'artist';
    this.spotifyService.userFollowingContains(this.type, id).subscribe(
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
    this.spotifyService.follow(this.type, this.artistId.id).subscribe(
      () => {
        this.checkIfUserFollowsArtist(this.artist.id);
      },
      error => {
        console.log(error);
      }
    )
  }

  unfollowArtist() {
    this.type = 'artist';
    this.spotifyService.unfollow(this.type, this.artist.id).subscribe(
      () => {
        this.checkIfUserFollowsArtist(this.artist.id);
      },
      error => {
        console.log(error);
      }
    )
  }

}
