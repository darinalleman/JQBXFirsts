import {Component, OnInit, HostListener} from '@angular/core';
import {SpotifyService} from '../../../shared/spotify/angular2-spotify';
import * as moment from 'moment';
import * as _ from 'lodash';
import {ActiveSongService} from '../../music-player/active-song.service';
import {NavigationService} from '../../../shared/navigation/navigation.service';
import {AddSongToPlaylistService} from '../../modals/add-to-playlist-modal/add-song-to-playlist.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  trackToAdd: any;
  tracks: any;
  options: any;
  offset: any;
  totalTracks: any;
  album: any;
  selectedRow: any;

  constructor(private spotifyService: SpotifyService,
              private activeSongService: ActiveSongService,
              private navigationService: NavigationService,
              private addSongToPlaylistService: AddSongToPlaylistService) {
  }

  ngOnInit() {
    this.offset = 0;
    this.getSavedTracks();
    this.addSongToPlaylistService.songToAddToPlaylist.subscribe(
      songBeingAdded => {
        this.trackToAdd = songBeingAdded;
      }
    )
  }

  getSavedTracks() {
    this.options = {
      limit: 50
    };
    this.spotifyService.getSavedUserTracks(this.options).subscribe(
      data => {
        this.tracks = data.items;
        this.totalTracks = data.total;
        _.each(this.tracks, (track: any) => {
          track.track.duration_ms = moment(track.track.duration_ms).format('m:ss')
        })
      },
      error => {
        console.log(error);
      }
    )
  }

  loadMoreTracks() {
    this.offset = this.offset + 50;
    this.options = {
      limit: 50,
      offset: this.offset
    };
    this.spotifyService.getSavedUserTracks(this.options).subscribe(
      data => {
        _.each(data.items, (track: any) => {
          track.track.duration_ms = moment(track.track.duration_ms).format('m:ss');
        });
        this.tracks = _.concat(this.tracks, data.items);
        document.getElementById('loadMoreSongsButton').blur();
      },
      error => {
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

  toggleAddToPlaylistModal(track) {
    this.addSongToPlaylistService.songToAddToPlaylist.next(track);
    this.addSongToPlaylistService.toggleAddSongToPlaylist.next(true);
  };

  setClickedRow(index, track) {
    this.selectedRow = index;
    this.activeSongService.currentSong.next(track.track);
  };

}
