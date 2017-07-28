import { Component, OnInit } from '@angular/core';
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

  constructor(public spotifyService: SpotifyService, public router: Router) { }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('searchQuery'))){
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
      this.spotifyService.search(this.searchQuery, this.type).subscribe(
        data => {
          this.returnedSearchData = data;
          this.artists = data.artists.items;
          this.albums = data.albums.items;
          this.playlists = data.playlists.items;
          this.tracks = data.tracks.items;
          _.each(this.tracks, track => {
            track.duration_ms = moment(track.duration_ms).format('m:ss');
          });

        },
        error => {
          console.log(error);
        }
      )
    }
  }
  loadMoreTracks() {
    this.options = {
      offset: 20
    };
    this.spotifyService.search(this.searchQuery, this.type, this.options).subscribe(
      data => {
      this.tracks = _.concat(this.tracks, data.tracks.items);
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
}
