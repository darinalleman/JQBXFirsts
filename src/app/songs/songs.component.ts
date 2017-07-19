import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import * as moment from 'moment';
import * as _ from "lodash";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  public tracks: any;
  public options: any;
  constructor(public spotifyService: SpotifyService) {
  }

  ngOnInit() {
    this.getSavedTracks();
  }

  getSavedTracks() {
    this.options = {
      limit: 50
    };
    this.spotifyService.getSavedUserTracks(this.options).subscribe(
      data => {
        this.tracks = data.items;
        _.each(this.tracks, track => {
          track.track.duration_ms = moment(track.track.duration_ms).format('m:ss')
        })
      },
      error => {
        console.log(error);
      }
    )
  }
}
