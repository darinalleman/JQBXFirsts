import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../../shared/spotify/angular2-spotify';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ActiveSongService } from '../../../music-player/active-song.service';
import { UtilitiesService } from '../../../../shared/utilities/utilities.service';
import { NavigationService } from '../../../../shared/navigation/navigation.service';
import { EditPlayListService } from '../../../../shared/modals/edit-playlist-modal/edit-play-list-service';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
    playlist: any;
    user: any;
    followed: boolean;
    options: any;
    offset: any;
    tracks: any;
    tracksTotal: any;
    album: any;
    selectedRow: any;

    constructor(private spotifyService: SpotifyService, private activeSongService: ActiveSongService,
                private utilities: UtilitiesService, private navigationService: NavigationService,
                private editPlaylistService: EditPlayListService) {
    }

    ngOnInit() {
        this.offset = 0;
        this.loadPlaylist();
        this.checkIfUserFollowsPlaylist();
        this.editPlaylistService.playlistChanges.subscribe(
            changes => {
                this.playlist.name = changes.name;
                this.playlist.description = changes.description;
                this.playlist.public = changes.public;
            }
        );
    };

    loadPlaylist() {
        this.options = {
            limit: 100
        };
        this.playlist = JSON.parse(localStorage.getItem('playlist'));
        this.spotifyService.getPlaylist(this.playlist.owner.id, this.playlist.id, this.options).subscribe(
            data => {
                this.playlist = data;
                this.playlist.followers.total = this.utilities.numberWithCommas(this.playlist.followers.total);
                this.spotifyService.getPlaylistTracks(this.playlist.owner.id, this.playlist.id, this.options).subscribe(
                    tracks => {
                        this.tracks = tracks.items;
                        this.tracksTotal = tracks.total;
                        _.each(this.tracks, (track: any) => {
                            track.track.duration_ms = moment(track.track.duration_ms).format('m:ss');
                        });
                    },
                    error => {
                        console.log(error);
                    }
                )
            },
            error => {
                console.log(error)
            }
        );
    };

    loadMoreTracks() {
        this.offset = this.offset + 100;
        this.options = {
            limit: 100,
            offset: this.offset
        };

        this.spotifyService.getPlaylistTracks(this.playlist.owner.id, this.playlist.id, this.options).subscribe(
            data => {
                _.each(data.items, (track: any) => {
                    track.track.duration_ms = moment(track.track.duration_ms).format('m:ss');
                });
                this.tracks = _.concat(this.tracks, data.items);
                document.getElementById('loadMorePlaylistTracks').blur();
            },
            error => {
                console.log(error);
            }
        );
    };

    checkIfUserFollowsPlaylist() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.spotifyService.playlistFollowingContains(this.playlist.owner.id, this.playlist.id, this.user.id).subscribe(
            data => {
                this.followed = data[0];
            },
            error => {
                console.log(error);
            }
        )
    };

    followPlaylist() {
        this.spotifyService.followPlaylist(this.playlist.owner.id, this.playlist.id).subscribe(
            () => {
                this.checkIfUserFollowsPlaylist();
            },
            error => {
                console.log(error);
            }
        );
    };

    unfollowPlaylist() {
        this.spotifyService.unfollowPlaylist(this.playlist.owner.id, this.playlist.id).subscribe(
            () => {
                this.checkIfUserFollowsPlaylist();
            },
            error => {
                console.log(error);
            }
        );
    };

    goToArtist(artist) {
        this.navigationService.goToArtist(artist);
    };

    goToAlbum(album) {
        this.spotifyService.getAlbum(album.id).subscribe(
            data => {
                this.album = {
                    album: data
                };
                this.navigationService.goToAlbum(this.album);
            },
            error => {
                console.log(error);
            }
        );
    };


    setClickedRow(index, track) {
        this.selectedRow = index;
        this.activeSongService.currentSong.next(track.track);
    };

  goToUser(id) {
    this.navigationService.goToUser(id);
  };

    toggleEditModal(playlist) {
        this.editPlaylistService.playlistToBeEdited.next(playlist);
       this.editPlaylistService.toggleEditPlaylist.next(true);
    };

}
