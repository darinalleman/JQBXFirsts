import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  public artist:any;

  constructor(public spotifyService:SpotifyService) {
  }

  ngOnInit() {
    this.loadArtist();
  }

  loadArtist() {
    this.spotifyService.getArtist(JSON.parse(localStorage.getItem('artist')).id).subscribe(
      data => {
        this.artist = data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
