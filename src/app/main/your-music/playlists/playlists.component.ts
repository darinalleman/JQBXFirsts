import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../shared/spotify/angular2-spotify';
import * as _ from 'lodash';
import { NavigationService } from '../../../shared/navigation/navigation.service';
import {EditPlayListService} from "../../modals/edit-playlist-modal/edit-play-list-service";

@Component({
    selector: 'app-playlists',
    templateUrl: './playlists.component.html',
    styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
    offset: number;
    totalPlaylists: any;
    user: any;
    playlists: any;
    options: any;
     position = 'before';

    constructor(private spotifyService: SpotifyService, private navigationService: NavigationService,
                private editPlaylistService: EditPlayListService) {
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
                this.playlists = _.concat(this.playlists, data.items);
                document.getElementById('loadMorePlaylists').blur();
            },
            error => {
                console.log(error);
            }
        );
    }

    goToPlaylist(playlist) {
        this.navigationService.goToPlaylist(playlist);
        this.editPlaylistService.updated.next(false);

    }

    goToUser(id) {
        this.navigationService.goToUser(id);
    };

}
