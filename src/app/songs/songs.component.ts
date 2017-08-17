import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import * as moment from 'moment';
import * as _ from "lodash";
import {Router} from "@angular/router";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  public tracks: any;
  public options: any;
  public offset: any;
  public totalTracks: any;
  public album: any;
  public playObject: any;
  public selectedRow: any;

  constructor(public spotifyService: SpotifyService, public router: Router) {
  }

  ngOnInit() {
    this.offset = 0;
    this.getSavedTracks();
  }

  getSavedTracks() {
    this.options = {
      limit: 50
    };
    this.spotifyService.getSavedUserTracks(this.options).subscribe(
      data => {
        this.tracks = data.items;
        this.totalTracks = data.total;
        _.each(this.tracks, track => {
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
        _.each(data.items, track => {
          track.duration_ms = moment(track.duration_ms).format('m:ss');
        });
        this.tracks = _.concat(this.tracks, data.items);
        document.getElementById("loadMoreSongsButton").blur();
      },
      error => {
        console.log(error);
      }
    )
  };

  goToArtist(artist) {
    console.log(artist);
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
