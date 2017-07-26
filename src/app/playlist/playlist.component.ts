import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import {UtilityServiceService} from "../utility-service.service";
import * as moment from 'moment';
import * as _ from "lodash";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  public playlist: any;

  constructor(public spotifyService: SpotifyService, public utilService: UtilityServiceService) {
  }

  ngOnInit() {
    this.loadPlaylist();
  }

  loadPlaylist() {
    this.playlist = JSON.parse(localStorage.getItem('playlist'));
    this.spotifyService.getPlaylist(this.playlist.owner.id, this.playlist.id).subscribe(
      data => {
        this.playlist = data;
        _.each(this.playlist.tracks.items, track => {
          track.track.duration_ms = moment(track.track.duration_ms).format('m:ss');
        });
      },
      error => {
        console.log(error)
      }
    );
  }

  showPlayer(): void {
    // send message to subscribers via observable subject
    this.utilService.showPlayer(true);
  }

  clearPlayer(): void {
    // clear message
    this.utilService.clearPlayer();
  }
}
