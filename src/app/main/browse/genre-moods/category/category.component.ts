import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../../../shared/spotify/angular2-spotify';
import * as _ from 'lodash';
import { NavigationService } from '../../../../shared/navigation/navigation.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: any;
  categoryPlaylists: any;
  options: any;
  offset: any;
  totalCategories: any;

  constructor(private spotifyService: SpotifyService, private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.offset = 0;
    this.loadCategory();
  }

  loadCategory() {
    this.options = {
      limit: 50
    };
    this.category = JSON.parse(localStorage.getItem('category'));
    this.spotifyService.getCategoryPlaylists(this.category.id, this.options).subscribe(
      data => {
        this.totalCategories = data.playlists.total;
        this.categoryPlaylists = data.playlists.items;
      },
      error => {
        console.log(error);
      }
    );
  }

  loadMoreCategories() {
    this.offset = this.offset + 50;
    this.options = {
      limit: 50,
      offset: this.offset
    };
    this.spotifyService.getCategoryPlaylists(this.category.id, this.options).subscribe(
      data => {
        this.categoryPlaylists = _.concat(this.categoryPlaylists, data.playlists.items);
      },
      error => {
        console.log(error);
      }
    );
  };

  goToPlaylist(playlist) {
    this.navigationService.goToPlaylist(playlist);
  };
}
