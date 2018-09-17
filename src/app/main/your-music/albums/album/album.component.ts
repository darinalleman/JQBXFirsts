import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { SpotifyService } from '../../../../shared/spotify/angular2-spotify';
import { Router } from '@angular/router';
import { ActiveSongService } from '../../../music-player/active-song.service';
import { NavigationService } from '../../../../shared/navigation/navigation.service';
import { JQBXService } from '../../../../shared/jqbx/jqbx.service';


@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
    album: any;
    saved: boolean;
    options: any;
    albumTracks: any;
    selectedRow: any;

    constructor(public spotifyService: SpotifyService,
                public router: Router,
                private activeSongService: ActiveSongService,
                private navigationService: NavigationService,
                private jqbxService: JQBXService) {
    }

    ngOnInit() {
        this.loadAlbum();
        this.checkAlbum();
    }

    loadAlbum() {
        this.options = {
            limit: 50
        };
        this.album = JSON.parse(localStorage.getItem('album'));
        console.log(this.album);
        this.spotifyService.getAlbumTracks(this.album.album.id, this.options).subscribe(
            data => {
                this.albumTracks = data.items;
                _.each(this.albumTracks, (track: any) => {
                    track.duration_ms = moment(track.duration_ms).format('m:ss');
                });
            },
            error => {
                console.log(error);
            }
        )
    }

    checkAlbum() {
        this.album = JSON.parse(localStorage.getItem('album'));
        this.spotifyService.userAlbumsContains(this.album.album.id).subscribe(
            data => {
                this.saved = data[0];
            },
            error => {
                console.log(error);
            }
        )
    }

    removeAlbum(album) {
        this.spotifyService.removeUserAlbums(album.id).subscribe(
            () => {
                this.checkAlbum();
            },
            error => {
                console.log(error);
            }
        )
    }

    saveAlbum(album) {
        this.spotifyService.saveUserAlbums(album.id).subscribe(
            () => {
                this.checkAlbum();
            },
            error => {
                console.log(error);
            }
        )
    }

    goToArtist(artist) {
       this.navigationService.goToArtist(artist);
    };

    setClickedRow(index, track) {
        this.selectedRow = index;
        track.loading = true;
        this.jqbxService.getFirstData(track.uri).subscribe(data=>{
          if (data){
            if (data.user.username){
              track.firstUsername = data.user.username;
            }
            else if (data.track.username) {
              track.firstUsername = data.track.username;
            } 
            else {
              track.firstUsername = "Not yet played!"
            }
          }
          else {
            track.firstUsername = "Not yet played!";
          }
          track.loading = false;
        });
    };

}
