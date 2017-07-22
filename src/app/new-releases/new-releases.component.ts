import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.scss']
})
export class NewReleasesComponent implements OnInit {
public newReleases: any;
public options: any;
  private album: any;
  constructor(public spotifyService: SpotifyService, public router: Router) { }

  ngOnInit() {
    this.getNewReleases();
  }

  getNewReleases(){
    this.spotifyService.getNewReleases().subscribe(
      data => {
        this.newReleases = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  goToAlbum(album) {
    this.spotifyService.getAlbum(album.id).subscribe(
      data => {
        this.album = {
          album: data
        };
        localStorage.setItem('album', JSON.stringify(this.album));
        this.router.navigate(['main/album'])
      },
      error => {
        console.log(error);
      }
    );
  };
}
