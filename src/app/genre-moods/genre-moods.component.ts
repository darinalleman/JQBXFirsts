import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";

@Component({
  selector: 'app-genre-moods',
  templateUrl: './genre-moods.component.html',
  styleUrls: ['./genre-moods.component.scss']
})


export class GenreMoodsComponent implements OnInit {
  public categories: any;
  public options: any;
  constructor(public spotifyService: SpotifyService) { }

  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
    this.options = {
      limit: 50
    };
    this.spotifyService.getCategories(this.options).subscribe(
      data => {
        console.log(data);
        this.categories = data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
