import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../../shared/spotify/angular2-spotify';
import {EditPlayListService} from './edit-play-list-service';

@Component({
  selector: 'app-edit-playlist-modal',
  templateUrl: 'edit-playlist-modal.component.html',
  styleUrls: ['edit-playlist-modal.component.scss']
})
export class EditPlaylistModalComponent implements OnInit {
  newPlaylistDescription: any;
  newPlaylistName: any;
  playlistDetails: any;
  playlist: any;
  checked: string;
  isChecked: boolean;

  constructor(private spotifyService: SpotifyService, private editPlayListService: EditPlayListService) {
  }

  ngOnInit() {
    this.editPlayListService.playlistToBeEdited.subscribe(
      playlist => {
        this.playlist = playlist;
        this.newPlaylistDescription = playlist.description;
        this.newPlaylistName = playlist.name;
        if (this.playlist.public) {
          this.checked = 'checked';
          this.isChecked = true;
        } else {
          this.checked = '';
          this.isChecked = false;
        }
      }
    )
  }

  saveChanges() {
    this.playlistDetails = {
      'description': this.newPlaylistDescription,
      'public': this.isChecked,
      'name': this.newPlaylistName
    };

    this.spotifyService.updatePlaylistDetails(this.playlist.owner.id, this.playlist.id, this.playlistDetails).subscribe(
      () => {
        this.newPlaylistDescription = '';
        this.newPlaylistName = '';
        this.editPlayListService.updated.next(true);
        this.editPlayListService.playlistChanges.next(this.playlistDetails);
        this.closeEditModal();
      },
      error => {
        console.log(error);
      }
    )
  };

  toggleCheckbox() {
    this.isChecked = !this.isChecked;
  };

  closeEditModal() {
    const modal = document.getElementById('editPlaylistModal');
    modal.classList.remove('is-active');
  }

}
