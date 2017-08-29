import {Component, OnInit} from '@angular/core';
import {ActiveSongService} from './active-song.service';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import * as _ from 'lodash';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {
  currentSong: any;
  isPlaying: boolean;
  shuffleState: boolean;
  devices: any;
  activeDevice: any;
  playObject: any;

  constructor(private activeSongService: ActiveSongService, private spotifyService: SpotifyService) {
  }

  ngOnInit() {
    this.activeSongService.currentSong.subscribe(currentSong => {
      this.getDevices();
      if (!currentSong.name) {
        this.getCurrentPlayingTrack();
      } else {
        this.getTrack(currentSong);
      }
    });
  }

  getCurrentPlayingTrack() {
    this.spotifyService.getCurrentPlayingTrack().subscribe(
      data => {
        this.currentSong = data.item;
        this.getInfoOfCurrentPlayback();
      },
      error => {
        console.log(error);
      }
    )
  }

  getTrack(currentSong) {
    this.spotifyService.getTrack(currentSong.id).subscribe(
      data => {
        this.currentSong = data;
        this.isPlaying = true;
      },
      error => {
        console.log(error);
      }
    );
  }

  getInfoOfCurrentPlayback() {
    this.spotifyService.getInfoOfCurrentPlayback().subscribe(
      data => {
        this.isPlaying = data.is_playing;
        this.shuffleState = data.shuffle_state;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  };

  getDevices() {
    this.spotifyService.getUserDevices().subscribe(
      data => {
        console.log(data);
        this.devices = data.devices;
        _.each(this.devices, (device: any) => {
          if (device.is_active) {
            this.activeDevice = device;
            console.log(this.activeDevice);
          }
        });
      },
      error => {
        console.log(error);
      }
    )
  };

  pausePlayback() {
    this.spotifyService.pausePlayback().subscribe(
      () => {
        this.isPlaying = false;
      },
      error => {
        console.log(error);
      }
    )
  };

  startResumePlayback() {
    this.playObject = {
      'uris': [this.currentSong.uri]
    };
    this.spotifyService.startResumePlayer(this.playObject).subscribe(
      data => {
        console.log(data);
        this.isPlaying = true;
      },
      error => {
        console.log(error);
      }
    )
  };

}
