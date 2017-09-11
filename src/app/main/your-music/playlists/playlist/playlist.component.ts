import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../../../shared/spotify/angular2-spotify';
import * as moment from 'moment';
import * as _ from 'lodash';
import {ActiveSongService} from '../../../music-player/active-song.service';
import { UtilitiesService } from '../../../../shared/utilities/utilities.service';
import { NavigationService } from '../../../../shared/navigation/navigation.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  playlist: any;
  playlistName: any;
  playlistDescription: any;
  user: any;
  followed: boolean;
  options: any;
  offset: any;
  tracks: any;
  tracksTotal: any;
  playlistDetails: any;
  newPlaylistName: string;
  newPlaylistDescription: string;
  album: any;
  updated: boolean;
  playObject: any;
  selectedRow: any;
  isPlaying: any;

  constructor(private spotifyService: SpotifyService, private activeSongService: ActiveSongService,
              private utilities: UtilitiesService, private navigationService: NavigationService) {
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
        this.playlist.followers.total = this.utilities.numberWithCommas(this.playlist.followers.total);
        this.spotifyService.getPlaylistTracks(this.playlist.owner.id, this.playlist.id, this.options).subscribe(
          tracks => {
            this.tracks = tracks.items;
            this.tracksTotal = tracks.total;
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
    this.navigationService.goToArtist(artist);
  };

  goToAlbum(album) {
    this.spotifyService.getAlbum(album.id).subscribe(
      data => {
        this.album = {
          album: data
        };
        this.navigationService.goToAlbum(this.album);
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

  playPlaylist(playlist) {
    this.playObject = {
      'context_uri': playlist.uri
    };
    this.spotifyService.startResumePlayer(this.playObject).subscribe(
        () => {
          setTimeout(() => {
            this.spotifyService.getCurrentPlayingTrack().subscribe(
                data => {
                  this.isPlaying = data.is_playing;
                  this.activeSongService.currentSong.next(data.item);
                },
                error => {
                  console.log(error);
                }
            )
          }, 1000);
        },
        error => {
          console.log(error);
        }
    )
  };

}
