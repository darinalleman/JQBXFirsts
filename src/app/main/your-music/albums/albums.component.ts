import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../../shared/spotify/angular2-spotify";
import {Router} from "@angular/router";
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  public albums: any;
  public options: any;
  public offset: any;
  public albumsTotal: any;
  constructor(public spotifyService: SpotifyService, public router: Router) {
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
        document.getElementById("loadMoreAlbums").blur();
      },
      error => {
        console.log(error);
      }
    )
  };

  goToAlbum(album) {
    localStorage.setItem('album', JSON.stringify(album));
    this.router.navigate(['main/album'])
  }

}
