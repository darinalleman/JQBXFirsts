import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../../../../shared/spotify/angular2-spotify';
import * as moment from 'moment';
import * as _ from 'lodash';
import {Router} from '@angular/router';
import {ActiveSongService} from '../../../../music-player/active-song.service';
import { NavigationService } from '../../../../../shared/navigation/navigation.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  artist: any;
  user: any;
  topTracks: any;
  options: any;
  artistAlbums: any;
  singles: any;
  compilations: any;
  album: any;
  playObject: any;
  selectedRow: any;

  constructor(public spotifyService: SpotifyService, public router: Router,
              private activeSongService: ActiveSongService, private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.loadTopTracks();
    this.loadArtistAlbums();
    this.loadArtistSingles();
    this.loadCompliations();
  }

  loadTopTracks() {
    this.artist = JSON.parse(localStorage.getItem('artist'));
    this.user = JSON.parse(localStorage.getItem('user'));
    this.spotifyService.getArtistTopTracks(this.artist.id, this.user.country).subscribe(
      data => {
        this.topTracks = data.tracks;
        _.each(this.topTracks, (track: any) => {
          track.duration_ms = moment(track.duration_ms).format('m:ss');
        })
      },
      error => {
        console.log(error);
      }
    )
  }

  loadArtistAlbums() {
    this.options = {
      album_type: 'album',
      limit: 50
    };
    this.spotifyService.getArtistAlbums(this.artist.id, this.options).subscribe(
      data => {
        this.artistAlbums = data.items;
      },
      error => {
        console.log(error);
      }
    )
  }

  loadArtistSingles() {
    this.options = {
      album_type: 'single',
      limit: 50
    };
    this.spotifyService.getArtistAlbums(this.artist.id, this.options).subscribe(
      data => {
        this.singles = data.items;
      },
      error => {
        console.log(error);
      }
    )
  };

  loadCompliations() {
    this.options = {
      album_type: 'compilation',
      limit: 50
    };
    this.spotifyService.getArtistAlbums(this.artist.id, this.options).subscribe(
      data => {
        this.compilations = data.items;
      },
      error => {
        console.log(error);
      }
    )
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

  startSong(songUri) {
    this.playObject = {
      "uris": [songUri]
    };
    this.spotifyService.startResumePlayer(this.playObject).subscribe(
      () => {
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
