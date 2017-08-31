import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import {Router} from "@angular/router";
import * as _ from 'lodash';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  public user: any;
  public playlists: any;
  public options: any;
  private playlistDetails: any;
  private newPlaylistDescription: any;
  private newPlaylistName: any;

  constructor(public spotifyService: SpotifyService, public router: Router) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getUserPlaylists();

  }

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

  goToPlaylist(playlist) {
    localStorage.setItem('playlist', JSON.stringify(playlist));
    this.router.navigate(['main/playlist'])
  }

  closeCreateModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('is-active');
  }

  toggleCreateModal() {
    const modal = document.getElementById('modal');
    modal.classList.toggle('is-active');
  };

  createNewPlaylist() {
    this.playlistDetails = {
      'description': this.newPlaylistDescription,
      'public': true,
      'name': this.newPlaylistName
    };
    this.spotifyService.createPlaylist(this.user.id, this.playlistDetails).subscribe(
      (data) => {
        this.playlists = _.concat(this.playlists, data);
        this.closeCreateModal();
      },
      error => {
        console.log(error);
      }
    )
  }

}
