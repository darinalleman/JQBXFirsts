import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../shared/spotify/angular2-spotify';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  public playlist: any;
  public user: any;
  public followed: boolean;
  public options: any;
  public offset: any;
  public tracks: any;
  public tracksTotal: any;

  constructor(public spotifyService: SpotifyService) {
  }

  ngOnInit() {
    this.offset = 0;
    this.loadPlaylist();
    this.checkIfUserFollowsPlaylist();
  }

  loadPlaylist() {
    this.options = {
      limit: 100
    };
    this.playlist = JSON.parse(localStorage.getItem('playlist'));
    this.spotifyService.getPlaylist(this.playlist.owner.id, this.playlist.id, this.options).subscribe(
      data => {
        this.playlist = data;
        this.spotifyService.getPlaylistTracks(this.playlist.owner.id, this.playlist.id, this.options).subscribe(
          data => {
            this.tracks = data.items;
            this.tracksTotal = data.total;
            _.each(this.tracks, track => {
              track.track.duration_ms = moment(track.track.duration_ms).format('m:ss');
            });
          },
          error => {
            console.log(error);
          }
        )
      },
      error => {
        console.log(error)
      }
    );
  };

  loadMoreTracks() {
    this.offset = this.offset + 100;
    this.options = {
      limit: 100,
      offset: this.offset
    };

    this.spotifyService.getPlaylistTracks(this.playlist.owner.id, this.playlist.id, this.options).subscribe(
      data => {
        _.each(data.items, track => {
          track.track.duration_ms = moment(track.track.duration_ms).format('m:ss');
        });
        this.tracks = _.concat(this.tracks, data.items);
        document.getElementById('loadMorePlaylistTracks').blur();
      },
      error => {
        console.log(error);
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
  };

  followPlaylist() {
    this.spotifyService.followPlaylist(this.playlist.owner.id, this.playlist.id).subscribe(
      () => {
        this.checkIfUserFollowsPlaylist();
      },
      error => {
        console.log(error);
      }
    );
  };

  unfollowPlaylist() {
    this.spotifyService.unfollowPlaylist(this.playlist.owner.id, this.playlist.id).subscribe(
      () => {
        this.checkIfUserFollowsPlaylist();
      },
      error => {
        console.log(error);
      }
    );
  };

  closeEditModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('is-active');
  }

  toggleEditModal() {
    const modal = document.getElementById('modal');
    modal.classList.toggle('is-active');
  };

  saveChanges() {
    console.log('here', this.playlist.owner.id, this.playlist.id);
  }

}
