import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import {Router} from "@angular/router";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  public albums: any;
  public options: any;
  constructor(public spotifyService: SpotifyService, public router: Router) {
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
  goToAlbum(album) {
    localStorage.setItem('album', JSON.stringify(album));
    this.router.navigate(['main/album'])
  }

}
