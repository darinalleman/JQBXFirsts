import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import {UtilityServiceService} from "../utility-service.service";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  public playlist: any;

  constructor(public spotifyService: SpotifyService, public utilityService: UtilityServiceService) {
  }

  ngOnInit() {
    this.loadPlaylist();
  }

  loadPlaylist() {
    this.playlist = JSON.parse(localStorage.getItem('playlist'));
    this.spotifyService.getPlaylist(this.playlist.owner.id, this.playlist.id).subscribe(
      data => {
        this.playlist = data;
      },
      error => {
        console.log(error)
      }
    );
  }
}
