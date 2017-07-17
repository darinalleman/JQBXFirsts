import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  public albums: any;
  public options: any;
  constructor(public spotifyService: SpotifyService) {
  }

  ngOnInit() {
    this.getSavedAlbums();
  }

  getSavedAlbums() {
    this.options = {
      limit: 50
    };
    this.spotifyService.getSavedUserAlbums(this.options).subscribe(
        data => {
          console.log(data);
          this.albums = data.items
        },
      error => {
          console.log(error);
      }
    )
  };

}
