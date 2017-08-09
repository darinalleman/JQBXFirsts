import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../shared/spotify/angular2-spotify';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.scss']
})
export class NewReleasesComponent implements OnInit {
  public offset: any;
  public newReleases: any;
  public options: any;
  private album: any;
  public totalNewReleases: any;
  constructor(public spotifyService: SpotifyService, public router: Router) { }

  ngOnInit() {
    this.offset = 0;
    this.getNewReleases();
  }

  getNewReleases() {
    this.options = {
      limit: 50
    };
    this.spotifyService.getNewReleases().subscribe(
      data => {
        this.newReleases = data.albums.items;
        this.totalNewReleases = data.albums.total;
      },
      error => {
        console.log(error);
      }
    )
  }

  loadMoreNewReleases() {
    this.offset = this.offset + 20;
    this.options = {
      offset: this.offset,
      limit: 50
    };
    this.spotifyService.getNewReleases(this.options).subscribe(
      data => {
        this.newReleases = _.concat(this.newReleases, data.albums.items);
        document.getElementById('loadMoreNewReleases').blur();
      },
      error => {
        console.log(error);
      }
    )
  }

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
}
