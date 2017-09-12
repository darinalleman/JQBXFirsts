import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../../shared/spotify/angular2-spotify';
import {Router} from '@angular/router';
import { NavigationService } from '../../../shared/navigation/navigation.service';
import {EditPlayListService} from "../../modals/edit-playlist-modal/edit-play-list-service";

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  public featuredPlaylists: any;

  constructor(public spotifyService: SpotifyService, public router: Router, private navigationService: NavigationService,
              private editPlaylistService: EditPlayListService) {
  }

  ngOnInit() {
    this.getFeatured();
  }

  getFeatured() {
    this.spotifyService.getFeaturedPlaylists().subscribe(
      data => {
        this.featuredPlaylists = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  goToPlaylist(playlist) {
    this.navigationService.goToPlaylist(playlist);
    this.editPlaylistService.updated.next(false);
  };
}
