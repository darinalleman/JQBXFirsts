import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../../shared/spotify/angular2-spotify';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import {NavigationService} from '../../../shared/navigation/navigation.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})

export class AlbumsComponent implements OnInit {
  albums: any;
  options: any;
  offset: any;
  albumsTotal: any;

  constructor(public spotifyService: SpotifyService, public router: Router, private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.offset = 0;
    this.getSavedAlbums();
  }

  getSavedAlbums() {
    this.options = {
      limit: 50
    };
    this.spotifyService.getSavedUserAlbums(this.options).subscribe(
      data => {
        this.albumsTotal = data.total;
        this.albums = data.items
      },
      error => {
        console.log(error);
      }
    )
  };

  loadMoreAlbums() {
    this.offset = this.offset + 20;
    this.options = {
      offset: this.offset
    };

    this.spotifyService.getSavedUserAlbums(this.options).subscribe(
      data => {
        this.albums = _.concat(this.albums, data.items);
        document.getElementById('loadMoreAlbums').blur();
      },
      error => {
        console.log(error);
      }
    )
  };

  goToAlbum(album) {
    this.navigationService.goToAlbum(album);
  }

}
