import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../spotify/angular2-spotify';
import { EditPlayListService } from './edit-play-list-service';
import { ToastrService } from 'ngx-toastr';

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
    publicPrivate: string;
    toggle: boolean;

    constructor(private spotifyService: SpotifyService, private editPlayListService: EditPlayListService,
                private toastr: ToastrService) {
    }

    ngOnInit() {
        this.editPlayListService.playlistToBeEdited.subscribe(
            playlist => {
                this.playlist = playlist;
                this.newPlaylistDescription = playlist.description;
                this.newPlaylistName = playlist.name;
                if (this.playlist.public) {
                    this.checked = 'checked';
                    this.publicPrivate = 'Public';
                    this.isChecked = true;
                } else {
                    this.checked = '';
                    this.publicPrivate = 'Private';
                    this.isChecked = false;
                }
            }
        );

        this.editPlayListService.toggleEditPlaylist.subscribe(
          toggle => {
            this.toggle = toggle;
          }

        );
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
                this.editPlayListService.playlistChanges.next(this.playlistDetails);
                this.toastr.success('Playlist successfully updated');
                this.closeEditModal();
            },
            error => {
                console.log(error);
            }
        )
    };

    toggleCheckbox() {
        this.isChecked = !this.isChecked;
        if (this.isChecked === true) {
            this.publicPrivate = 'Public'
        } else {
            this.publicPrivate = 'Private'
        }
    };

    closeEditModal() {
       this.editPlayListService.toggleEditPlaylist.next(false);
    }

}
