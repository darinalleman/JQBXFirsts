import {Component, OnInit} from '@angular/core';
import {ActiveSongService} from './active-song.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {
  currentSong: any;

  constructor(private activeSongService: ActiveSongService) {
  }

  ngOnInit() {
    this.activeSongService.currentSong.subscribe(currentSong => this.currentSong = currentSong);
  }

}
