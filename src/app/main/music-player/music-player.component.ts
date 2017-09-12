import { Component, OnInit } from '@angular/core';
import { ActiveSongService } from './active-song.service';
import { SpotifyService } from '../../shared/spotify/angular2-spotify';
import * as _ from 'lodash';


@Component({
    selector: 'app-music-player',
    templateUrl: './music-player.component.html',
    styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {
    repeatState: any;
    currentSong: any;
    isPlaying: boolean;
    shuffleState: boolean;
    devices: any;
    activeDevice: any;
    progressMs: any;
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
        this.getInfoOfCurrentPlayback();
        this.spotifyService.getCurrentPlayingTrack().subscribe(
            data => {
                 if(data === null) {
                   return false;
                 } else {
                   this.currentSong = data.item;
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
                this.isPlaying = true;
                this.currentSong = data;
            },
            error => {
                console.log(error);
            }
        );
    }

    getInfoOfCurrentPlayback() {
        this.spotifyService.getInfoOfCurrentPlayback().subscribe(
            data => {
                this.shuffleState = data.shuffle_state;
                this.progressMs = data.progress_ms;
                this.isPlaying = data.is_playing;
                this.repeatState = data.repeat_state;
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
                setTimeout(() => {
                    this.getCurrentPlayingTrack();
                }, 1000);
            },
            error => {
                console.log(error);
            }
        )
    }

    playPrevious() {
        this.spotifyService.previousPlayback().subscribe(
            () => {
                setTimeout(() => {
                    this.getCurrentPlayingTrack();
                }, 1000);
            },
            error => {
                console.log(error);
            }
        );
    }

}
