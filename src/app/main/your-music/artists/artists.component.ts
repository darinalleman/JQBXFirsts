import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../shared/spotify/angular2-spotify';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { NavigationService } from '../../../shared/navigation/navigation.service';

@Component({
    selector: 'app-artists',
    templateUrl: './artists.component.html',
    styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
    cursors: any;
    artists: Array<object>;
    options: any;
    type: string;
    totalArtists: number;

    constructor(public spotifyService: SpotifyService,
                public router: Router,
                private navigationService: NavigationService) {
    }

    ngOnInit() {
        this.getSavedArtists();
    }

    getSavedArtists() {
        this.options = {
            limit: 50
        };
        this.type = 'artist';
        this.spotifyService.getFollowedArtists(this.type, this.options).subscribe(
            data => {
                this.cursors = data.artists.cursors;
                this.artists = data.artists.items;
                this.totalArtists = data.artists.total;
            },
            error => {
                console.log(error);
            }
        )
    }

    goToArtist(artist) {
       this.navigationService.goToArtist(artist);
    };

    loadMoreArtists() {
        this.options = {
            limit: 20,
            after: this.cursors.after
        };
        this.spotifyService.getFollowedArtists(this.type, this.options).subscribe(
            data => {
                this.artists = _.concat(this.artists, data.artists.items);
                document.getElementById('loadMoreArtists').blur();
            },
            error => {
                console.log(error);
            }
        );
    };

}
