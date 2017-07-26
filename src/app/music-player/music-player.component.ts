import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {
  private devices: any;

  constructor(public spotifyService: SpotifyService) { }

  ngOnInit() {
    this.getUserDevices();
  }

  getUserDevices() {
    this.spotifyService.getUserDevices().subscribe(
      data => {
        this.devices = data.devices;
        console.log(this.devices);
      },
      error => {
        console.log(error)
      }
    )
  };
}
