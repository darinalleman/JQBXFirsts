import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../../shared/spotify/angular2-spotify';
import {AddSongToPlaylistService} from './add-song-to-playlist.service';

@Component({
  selector: 'app-add-to-playlist-modal',
  templateUrl: './add-to-playlist-modal.component.html',
  styleUrls: ['./add-to-playlist-modal.component.scss']
})
export class AddToPlaylistModalComponent implements OnInit {
  trackToAdd: any;
  user: any;
  totalPlaylists: any;
  playlists: any;
  options: any;

  constructor(private spotifyService: SpotifyService, private addSongToPlaylistService: AddSongToPlaylistService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loadPlaylists();
    this.addSongToPlaylistService.songToAddToPlaylist.subscribe(
      songBeingAdded => {
        this.trackToAdd = songBeingAdded;
      }
    )
  }

  closeAddToPlayListModal() {
    const modal = document.getElementById('addToPlaylistModal');
    modal.classList.remove('is-active');
  };

  addToPlaylist(playlist) {
    if (playlist.owner.id === this.user.id) {
      this.spotifyService.addPlaylistTracks(playlist.owner.id, playlist.id, this.trackToAdd.uri).subscribe(
        () => {
          this.closeAddToPlayListModal();
        },
        error => {
          console.log(error);
        }
      )
    } else {
      return false;
    }
  };

  loadPlaylists() {
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
  };

}
