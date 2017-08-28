import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../shared/spotify/angular2-spotify';
import * as _ from 'lodash';
import * as moment from 'moment';
import {Router} from "@angular/router";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public selectedDropdown: any;
  public searchQuery: string;
  public type: string;
  public returnedSearchData: any;
  public options: any;
  public hasQuery: boolean;
  public artists: any;
  public albums: any;
  public playlists: any;
  public tracks: any;
  public album: any;
  public offset: any;
  public tracksTotal: any;
  public noResults: boolean;
  private playObject: any;
  private selectedRow: any;
  public user: any;

  constructor(public spotifyService: SpotifyService, public router: Router) {
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
      this.spotifyService.search(this.searchQuery, this.type , this.options).subscribe(
        data => {
          if (data.artists.items.length === 0 && data.albums.items.length === 0 && data.playlists.items.length === 0 && data.tracks.items.length === 0) {
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

  goToPlaylist(playlist) {
    localStorage.setItem('playlist', JSON.stringify(playlist));
    this.router.navigate(['main/playlist'])
  }

  clearFieldsAndData() {
    this.returnedSearchData = {};
    this.artists = [];
    this.albums = [];
    this.playlists = [];
    this.tracks = [];
    localStorage.removeItem('searchQuery');
    this.hasQuery = false;
    this.searchQuery = '';
    this.noResults = false;
  };

  startSong(songUri) {
    this.playObject = {
      'uris': [songUri]
    };
    this.spotifyService.startResumePlayer(this.playObject).subscribe(
      () => {
      },
      error => {
        console.log(error);
      }
    )
  };

  setClickedRow(index, songUri) {
    this.selectedRow = index;
    this.startSong(songUri);
  };


  addToPlaylist(songURI, playlist) {
    this.spotifyService.addPlaylistTracks(playlist.owner.id, playlist.id, songURI).subscribe(
      () => {
        const dropdown = document.getElementById('dropdown');
        dropdown.classList.remove('is-active');
      },
      error => {
        console.log(error);
      }
    )
  }

}
