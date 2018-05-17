import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../shared/spotify/angular2-spotify';
import * as _ from 'lodash';
import * as moment from 'moment';
import {ActiveSongService} from '../music-player/active-song.service';
import {NavigationService} from '../../shared/navigation/navigation.service';
import {AddSongToPlaylistService} from '../modals/add-to-playlist-modal/add-song-to-playlist.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchQuery: string;
  type: string;
  returnedSearchData: any;
  options: any;
  hasQuery: boolean;
  artists: any;
  albums: any;
  playlists: any;
  tracks: any;
  album: any;
  offset: any;
  tracksTotal: any;
  noResults: boolean;
  selectedRow: any;
  user: any;

  constructor(private spotifyService: SpotifyService, private activeSongService: ActiveSongService,
              private navigationService: NavigationService, private addSongToPlaylistService: AddSongToPlaylistService) {
  }

  ngOnInit() {
    this.offset = 0;
    if (JSON.parse(localStorage.getItem('searchQuery'))) {
      this.searchQuery = JSON.parse(localStorage.getItem('searchQuery'));
      this.search();
    }
  }

  search() {
    this.type = 'album,artist,track,playlist';
    if (!this.searchQuery) {
      this.hasQuery = false;
      localStorage.setItem('searchQuery', JSON.stringify(''));
      return false;
    } else {
      this.hasQuery = true;
      localStorage.setItem('searchQuery', JSON.stringify(this.searchQuery));
      this.options = {
        limit: 12
      };
      this.spotifyService.search(this.searchQuery, this.type, this.options).subscribe(
        data => {
          console.log(data)
          if (data.artists.items.length === 0 &&
            data.albums.items.length === 0 &&
            data.playlists.items.length === 0 &&
            data.tracks.items.length === 0) {
            this.noResults = true;
          } else {
            this.noResults = false;
            this.returnedSearchData = data;
            this.artists = data.artists.items;
            this.albums = data.albums.items;
            this.playlists = data.playlists.items;
            this.tracks = data.tracks.items;
            this.tracksTotal = data.tracks.total;
            _.each(this.tracks, (track: any) => {
              track.duration_ms = moment(track.duration_ms).format('m:ss');
            });
          }
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  loadMoreTracks() {
    this.offset = this.offset + 20;
    this.options = {
      offset: this.offset
    };
    this.spotifyService.search(this.searchQuery, this.type, this.options).subscribe(
      data => {
        _.each(data.tracks.items, (track: any) => {
          track.duration_ms = moment(track.duration_ms).format('m:ss');
        });
        this.tracks = _.concat(this.tracks, data.tracks.items);
        document.getElementById('loadMoreSearchTracks').blur();
      },
      error => {
        console.log(error);
      }
    )
  }

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

  goToPlaylist(playlist) {
    this.navigationService.goToPlaylist(playlist);
  }

  clearFieldsAndData() {
    this.returnedSearchData = {};
    this.artists = [];
    this.albums = [];
    this.playlists = [];
    this.tracks = [];
    this.hasQuery = false;
    this.searchQuery = '';
    this.noResults = false;
    localStorage.removeItem('searchQuery');
  };

  setClickedRow(index, track) {
    this.selectedRow = index;
    this.activeSongService.currentSong.next(track);
  };

  toggleAddToPlaylistModal(track) {
    this.addSongToPlaylistService.songToAddToPlaylist.next(track);
    this.addSongToPlaylistService.toggleAddSongToPlaylist.next(true);
  };

}
