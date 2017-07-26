import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import * as moment from 'moment';
import * as _ from "lodash";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  public playlist: any;
  public user: any;
  public followed: boolean;

  constructor(public spotifyService: SpotifyService) {
  }

  ngOnInit() {
    this.loadPlaylist();
     this.checkIfUserFollowsPlaylist();
  }

  loadPlaylist() {
    this.playlist = JSON.parse(localStorage.getItem('playlist'));
    this.spotifyService.getPlaylist(this.playlist.owner.id, this.playlist.id).subscribe(
      data => {
        this.playlist = data;
        _.each(this.playlist.tracks.items, track => {
          track.track.duration_ms = moment(track.track.duration_ms).format('m:ss');
        });
      },
      error => {
        console.log(error)
      }
    );
  };

  checkIfUserFollowsPlaylist() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.spotifyService.playlistFollowingContains(this.playlist.owner.id, this.playlist.id, this.user.id).subscribe(
      data => {
         this.followed = data[0];
      },
      error => {
        console.log(error);
      }
    )
  }

  followPlaylist() {
      this.spotifyService.followPlaylist(this.playlist.owner.id, this.playlist.id).subscribe(
        data => {
          this.checkIfUserFollowsPlaylist();
        },
        error => {
          console.log(error);
        }
      );
  };

  unfollowPlaylist() {
     this.spotifyService.unfollowPlaylist(this.playlist.owner.id, this.playlist.id).subscribe(
       data => {
         this.checkIfUserFollowsPlaylist();
       },
       error => {
         console.log(error);
       }
     );

  }
}
