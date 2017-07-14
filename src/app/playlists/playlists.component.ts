import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import * as _ from "lodash";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  public user: any;
  public playlists: any;
  public options: any;
  public retrievedPlaylist: any;

  constructor(public spotifyService: SpotifyService) {
  }

  ngOnInit() {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.getUserPlaylists();

  }

  showPlaylist(playlist){
    this.spotifyService.getPlaylist(playlist.owner.id, playlist.id).subscribe(
      data => {
        console.log(data.tracks);
         this.retrievedPlaylist = data;
      },
      error => {
        console.log(error);
      }
    )
  };

  getUserPlaylists() {
    this.options = {
      limit: 40
    };
    this.spotifyService.getUserPlaylists(this.user.id, this.options).subscribe(
      data => {
          this.playlists = data.items;
      },
      error => {
        console.log(error);
      }
    )
  }

}
