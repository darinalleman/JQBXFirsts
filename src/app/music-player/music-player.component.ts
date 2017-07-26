import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {
  public devices: any;
  public track: any;

  constructor(public spotifyService: SpotifyService) { }

  ngOnInit() {
    this.getUserDevices();
    this.getTrack();
  }
  getUserDevices() {
    this.spotifyService.getUserDevices().subscribe(
      data => {
        this.devices = data.devices;
      },
      error => {
        console.log(error)
      }
    )
  };

  getTrack() {
    this.track = JSON.parse(localStorage.getItem('song'));
    console.log(this.track);
  }
}
