import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import * as _ from "lodash";
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import {Router} from "@angular/router";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  public album: any;
  private saved: boolean;
  public options: any;
  public albumTracks: any;
  private playObject: any;
  private selectedRow: any;

  constructor(public spotifyService: SpotifyService, public router:Router) {
  }

  ngOnInit() {
    this.loadAlbum();
    this.checkAlbum();
  }

  loadAlbum() {
    this.options = {
      limit: 50
    };
    this.album = JSON.parse(localStorage.getItem('album'));
    this.spotifyService.getAlbumTracks(this.album.album.id, this.options).subscribe(
      data => {
        this.albumTracks = data.items;
        _.each(this.albumTracks, track => {
          track.duration_ms = moment(track.duration_ms).format('m:ss');
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  checkAlbum() {
    this.album = JSON.parse(localStorage.getItem('album'));
    this.spotifyService.userAlbumsContains(this.album.album.id).subscribe(
      data => {
        this.saved = data[0];
      },
      error => {
        console.log(error);
      }
    )
  }

  removeAlbum(album) {
    this.spotifyService.removeUserAlbums(album.id).subscribe(
      () => {
        this.checkAlbum();
      },
      error => {
        console.log(error);
      }
    )
  }

  saveAlbum(album) {
    this.spotifyService.saveUserAlbums(album.id).subscribe(
      () => {
        this.checkAlbum();
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

  setClickedRow(index, songUri) {
    this.selectedRow = index;
    this.startSong(songUri);
  };

}
