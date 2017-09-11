import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { SpotifyService } from '../../../../shared/spotify/angular2-spotify';
import { Router } from '@angular/router';
import { ActiveSongService } from '../../../music-player/active-song.service';
import { LoadArtistService } from '../../artists/artist/load-artist.service';
import { NavigationService } from '../../../../shared/navigation/navigation.service';

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
    playObject: any;
    selectedRow: any;
    isPlaying: any;

    constructor(public spotifyService: SpotifyService, public router: Router,
                private activeSongService: ActiveSongService, private navigationService: NavigationService) {
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

    startSong(songUri) {
        this.playObject = {
            'uris': [songUri]
        };
        this.spotifyService.startResumePlayer(this.playObject).subscribe(
            () => {
            },
            error => {
                console.log(error);
            }
        )
    };

    playAlbum(album) {
        this.playObject = {
            'context_uri': album.uri
        };
        this.spotifyService.startResumePlayer(this.playObject).subscribe(
            () => {
                setTimeout(() => {
                    this.spotifyService.getCurrentPlayingTrack().subscribe(
                        data => {
                            this.isPlaying = data.is_playing;
                            this.activeSongService.currentSong.next(data.item);
                        },
                        error => {
                            console.log(error);
                        }
                    )
                }, 1000);
            },
            error => {
                console.log(error);
            }
        )
    };
    setClickedRow(index, track) {
        this.selectedRow = index;
        this.startSong(track.uri);
        this.activeSongService.currentSong.next(track);
    };

}
