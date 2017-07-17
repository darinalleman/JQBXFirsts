import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";

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
        console.log(data);
        this.tracks = data.items;
      },
      error => {
        console.log(error);
      }
    )
  }
}
