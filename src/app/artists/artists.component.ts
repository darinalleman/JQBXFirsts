import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import {Router} from "@angular/router";
import {LoadArtistService} from "../artist/load-artist.service";

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  public artists: any;
  public options: any;
  private type: string;

  constructor(public spotifyService: SpotifyService, public router: Router, private loadArtistService: LoadArtistService) {
  }

  ngOnInit() {
    this.getSavedArtists();
  }

  getSavedArtists() {
    this.options = {
      limit: 50
    };
    this.type = 'artist';
    this.spotifyService.getFollowedArtists(this.type, this.options).subscribe(
      data => {
        this.artists = data.artists.items;
      },
      error => {
        console.log(error);
      }
    )
  }

  goToArtist(artist) {
    this.loadArtistService.currentArtist.next(artist);
    this.router.navigate(['main/artist'])
  };

}
