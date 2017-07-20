import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.scss']
})
export class NewReleasesComponent implements OnInit {
public newReleases: any;
public options: any;
  constructor(public spotifyService: SpotifyService) { }

  ngOnInit() {
    this.getNewReleases();
  }

  getNewReleases(){
    this.spotifyService.getNewReleases().subscribe(
      data => {
        this.newReleases = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }
}
