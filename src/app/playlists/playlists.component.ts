import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  public user: any;
  public playlists: any[];

  constructor(public spotifyService: SpotifyService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getUserPlaylists();
  }

  ngOnInit() {
  }

  getUserPlaylists() {
    this.spotifyService.getUserPlaylists(this.user.id).subscribe(
      data => {
        this.playlists = data.items;
        console.log(this.playlists);
      },
      error => {
        console.log(error);
      }
    )
  }

}
