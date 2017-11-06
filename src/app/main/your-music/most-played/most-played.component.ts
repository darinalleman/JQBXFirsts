import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../../../shared/spotify/angular2-spotify";
import {NavigationService} from "../../../shared/navigation/navigation.service";

@Component({
  selector: 'app-most-played',
  templateUrl: './most-played.component.html',
  styleUrls: ['./most-played.component.scss']
})
export class MostPlayedComponent implements OnInit {
  options: any;
  mostPlayedArtists: any;
  type: string;

  constructor(private spotifyService: SpotifyService, private navigationService: NavigationService) { }

  ngOnInit() {
    this.type = 'artists';
    this.loadUserPersonalizationData();
  }

  loadUserPersonalizationData() {
    this.options = {
      limit: 50
    };
    this.spotifyService.getUserTopArtistsAndTracks(this.type, this.options).subscribe(
      data => {
        this.mostPlayedArtists = data.items;
      },
      error => {
        console.log(error);
      }
    )
  };

  goToArtist(artist) {
    this.navigationService.goToArtist(artist);
  };

}
