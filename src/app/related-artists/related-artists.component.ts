import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import {Router} from "@angular/router";
import {LoadArtistService} from "../artist/load-artist.service";

@Component({
  selector: 'app-related-artists',
  templateUrl: './related-artists.component.html',
  styleUrls: ['./related-artists.component.scss']
})
export class RelatedArtistsComponent implements OnInit {
  public artist: any;
  public relatedArtists: any;

  constructor(public spotifyService: SpotifyService, public router: Router ,private loadArtistService: LoadArtistService) {
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

  goToArtist(artist) {
    this.loadArtistService.currentArtist.next(artist);
    this.router.navigate(['main/artist']);
  };


}
