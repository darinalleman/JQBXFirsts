import {Component, OnInit} from '@angular/core';
import {ActiveSongService} from './active-song.service';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import * as _ from 'lodash';
import * as moment from 'moment';

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
  progressMs: any;
  playObject: any;
  songLength: any;

  constructor(private activeSongService: ActiveSongService, private spotifyService: SpotifyService) {
  }

  ngOnInit() {
    this.activeSongService.currentSong.subscribe(currentSong => {
      this.getDevices();
      if (!currentSong.name) {
        this.getInfoOfCurrentPlayback();
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
        this.songLength = data.item.duration_ms;
        if (this.isPlaying === true) {
          setInterval(() => {
            this.getInfoOfCurrentPlayback();
          }, 750);
        }
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
        this.songLength = data.duration_ms;
        this.isPlaying = true;
        setInterval(() => {
          this.getInfoOfCurrentPlayback();
        }, 750);
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
        this.progressMs = data.progress_ms;
      },
      error => {
        console.log(error);
      }
    )
  };

  getDevices() {
    this.spotifyService.getUserDevices().subscribe(
      data => {
        this.devices = data.devices;
        _.each(this.devices, (device: any) => {
          if (device.is_active) {
            this.activeDevice = device;
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

  resumePlayback() {
    this.playObject = {};
    this.spotifyService.startResumePlayer(this.playObject).subscribe(
      () => {
        this.isPlaying = true;
      },
      error => {
        console.log(error);
      }
    )
  };

  toggleShuffle(state) {
    this.shuffleState = state !== true;
    this.spotifyService.toggleShuffle(this.shuffleState).subscribe(
      () => {
      },
      error => {
        console.log(error);
      }
    )
  };

  playNext() {
    this.spotifyService.nextPlayback().subscribe(
      () => {
      },
      error => {
        console.log(error);
      }
    )
  }

  playPrevious() {
    this.spotifyService.previousPlayback().subscribe(
      () => {
      },
      error => {
        console.log(error);
      }
    );
  }

}
