import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";

@Component({
  selector: 'app-related-artists',
  templateUrl: './related-artists.component.html',
  styleUrls: ['./related-artists.component.scss']
})
export class RelatedArtistsComponent implements OnInit {
  public artist: any;
  public relatedArtists: any;

  constructor(public spotifyService: SpotifyService) {
  }

  ngOnInit() {
    this.loadRelatedArtists();
  }

  loadRelatedArtists() {
    this.artist = JSON.parse(localStorage.getItem('artist'));
    this.spotifyService.getRelatedArtists(this.artist.id).subscribe(
      data => {
        this.relatedArtists = data.artists;
      },
      error => {
        console.log(error);
      }
    )
  };

}
