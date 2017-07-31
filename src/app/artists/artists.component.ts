import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import {Router} from "@angular/router";

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  public artists: any;
  public options: any;
  private type: string;

  constructor(public spotifyService: SpotifyService, public router: Router) {
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
    localStorage.setItem('artist', JSON.stringify(artist));
    this.router.navigate(['main/artist'])
  };

}
