import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../shared/spotify/angular2-spotify';
import * as moment from 'moment';
import * as _ from 'lodash';
import {Router} from "@angular/router";
import {ActiveSongService} from "../music-player/active-song.service";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  public playlist: any;
  public playlistName: any;
  public playlistDescription: any;
  public user: any;
  public followed: boolean;
  public options: any;
  public offset: any;
  public tracks: any;
  public tracksTotal: any;
  public playlistDetails: any;
  public newPlaylistName: string;
  public newPlaylistDescription: string;
  public album: any;
  public updated: boolean;
  private playObject: any;
  public selectedRow: any;

  constructor(public spotifyService: SpotifyService, public router: Router, private activeSongService: ActiveSongService) {
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
    this.updated = false;
    this.playlist = JSON.parse(localStorage.getItem('playlist'));
    this.spotifyService.getPlaylist(this.playlist.owner.id, this.playlist.id, this.options).subscribe(
      data => {
        this.playlist = data;
        this.playlistName = this.playlist.name;
        this.playlistDescription = this.playlist.description;
        this.spotifyService.getPlaylistTracks(this.playlist.owner.id, this.playlist.id, this.options).subscribe(
          data => {
            this.tracks = data.items;
            this.tracksTotal = data.total;
            _.each(this.tracks, (track: any) => {
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
        _.each(data.items, (track: any) => {
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
    this.newPlaylistName = this.playlistName;
    this.newPlaylistDescription = this.playlistDescription;
    modal.classList.toggle('is-active');
  };

  saveChanges() {
    this.playlistDetails = {
      'description': this.newPlaylistDescription,
      'public': true,
      'name': this.newPlaylistName
    };

    this.spotifyService.updatePlaylistDetails(this.playlist.owner.id, this.playlist.id, this.playlistDetails).subscribe(
      () => {
        this.newPlaylistDescription = '';
        this.newPlaylistName = '';
        this.loadPlaylist();
        this.closeEditModal();
        this.showNotifcation();
        this.updated = true;
      },
      error => {
        this.updated = false;
        console.log(error);
      }
    )
  };

  goToArtist(artist) {
    localStorage.setItem('artist', JSON.stringify(artist));
    this.router.navigate(['main/artist'])
  };

  goToAlbum(album) {
    this.spotifyService.getAlbum(album.id).subscribe(
      data => {
        this.album = {
          album: data
        };
        localStorage.setItem('album', JSON.stringify(this.album));
        this.router.navigate(['main/album'])
      },
      error => {
        console.log(error);
      }
    );
  };

  hideNotifcation() {
    const hideNotification = document.getElementById('hidePlaylistUpdatedNotication');
    hideNotification.style.display = 'none';
  };

  showNotifcation() {
    const hideNotification = document.getElementById('hidePlaylistUpdatedNotication');
    if (hideNotification) {
      hideNotification.style.display = 'block';
    }
  };

  startSong(songUri) {
    this.playObject = {
      "uris": [songUri]
    };
    this.spotifyService.startResumePlayer(this.playObject).subscribe(
      () => {
      },
      error => {
        console.log(error);
      }
    )
  };

  setClickedRow(index, track) {
    this.selectedRow = index;
    this.startSong(track.track.uri);
    this.activeSongService.currentSong.next(track.track);
  };

}
