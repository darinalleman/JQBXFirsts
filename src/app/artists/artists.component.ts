import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  public artists: any;
  public options: any;

  constructor(public spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  getSavedArtists(){
    this.options = {
      limit: 50
    };
  }

}
