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
  private artistIds: [any];

  constructor(public spotifyService: SpotifyService, private loadArtistService: LoadArtistService) {
  }

  ngOnInit() {
    this.loadArtistService.currentArtist.subscribe(
      currentArtist => {
        if (currentArtist.id) {
          this.artistId = currentArtist.id;
          this.loadArtist(this.artistId);
          this.checkIfUserFollowsArtist(this.artistId);
          localStorage.setItem('artist', JSON.stringify(currentArtist));
        } else {
          this.artistId = JSON.parse(localStorage.getItem('artist')).id;
          this.loadArtist(this.artistId);
          this.checkIfUserFollowsArtist(this.artistId);
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
    this.artistIds = [this.artist.id];
    this.spotifyService.follow(this.type, this.artistIds).subscribe(
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
    this.artistIds = [this.artist.id];
    this.spotifyService.unfollow(this.type, this.artistIds).subscribe(
      () => {
        this.checkIfUserFollowsArtist(this.artist.id);
      },
      error => {
        console.log(error);
      }
    )
  }

}
