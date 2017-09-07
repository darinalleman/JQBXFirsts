import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../../../shared/spotify/angular2-spotify";
import {Router} from "@angular/router";
import * as _ from 'lodash';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public category: any;
  public categoryPlaylists: any;
  private options: any;
  public offset: any;
  public totalCategories: any;

  constructor(public spotifyService: SpotifyService, public router: Router) {
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
        console.log(data);
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
        console.log(data);
        this.categoryPlaylists = _.concat(this.categoryPlaylists, data.playlists.items);
      },
      error => {
        console.log(error);
      }
    );
  };

  goToPlaylist(playlist) {
    localStorage.setItem('playlist', JSON.stringify(playlist));
    this.router.navigate(['main/playlist'])
  };
}
