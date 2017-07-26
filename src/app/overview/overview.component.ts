import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import * as moment from 'moment';
import * as _ from "lodash";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public artist: any;
  public user: any;
  public topTracks: any;
  constructor(public spotifyService: SpotifyService) { }

  ngOnInit() {
    this.loadTopTracks();
  }

  loadTopTracks(){
    this.artist = JSON.parse(localStorage.getItem('artist'));
    this.user = JSON.parse(localStorage.getItem('user'));
    this.spotifyService.getArtistTopTracks(this.artist.id, this.user.country).subscribe(
      data => {
        this.topTracks = data.tracks;
        console.log(this.topTracks);
        _.each(this.topTracks, track => {
          track.duration_ms = moment(track.duration_ms).format('m:ss');
        })
      },
      error => {
        console.log(error);
      }
    )
  }

}
