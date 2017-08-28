import {Component, OnInit} from '@angular/core';
import {ActiveSongService} from './active-song.service';
import {SpotifyService} from "../shared/spotify/angular2-spotify";

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {
  currentSong: any;

  constructor(private activeSongService: ActiveSongService, private spotifyService: SpotifyService) {
  }

  ngOnInit() {
    this.activeSongService.currentSong.subscribe(currentSong => {
      console.log(currentSong);
      if(currentSong.name){
        this.spotifyService.getTrack(currentSong.id).subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log(error);
          }
        );
      }

      this.currentSong = currentSong
    });
  }

}
