import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import {Router} from "@angular/router";
import * as _ from 'lodash';
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  offset: number;
  totalPlaylists: any;
  public user: any;
  public playlists: any;
  public options: any;
  private playlistDetails: any;
  private newPlaylistDescription: any;
  private newPlaylistName: any;

  constructor(public spotifyService: SpotifyService, public router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getUserPlaylists();
    this.offset = 0;
  }

  getUserPlaylists() {
    this.options = {
      limit: 50
    };
    this.spotifyService.getUserPlaylists(this.user.id, this.options).subscribe(
      data => {
        this.playlists = data.items;
        this.totalPlaylists = data.total;
      },
      error => {
        console.log(error);
      }
    )
  }

  loadMorePlaylists() {
    this.offset += 50;
    this.options = {
      limit: 50, offset: this.offset
    };
    this.spotifyService.getUserPlaylists(this.user.id, this.options).subscribe(
      data => {
        console.log(data);
        console.log(this.playlists.length, this.totalPlaylists);
        this.playlists = _.concat(this.playlists, data.items);
        document.getElementById('loadMorePlaylists').blur();
      },
      error => {
        console.log(error);
      }
    );
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

  goToUser(id) {
    this.userService.user.next(id);
    this.router.navigate(['main/user']);
  };

}
