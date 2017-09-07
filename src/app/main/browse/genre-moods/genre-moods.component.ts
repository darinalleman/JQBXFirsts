import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../../shared/spotify/angular2-spotify";
import {Router} from "@angular/router";

@Component({
  selector: 'app-genre-moods',
  templateUrl: './genre-moods.component.html',
  styleUrls: ['./genre-moods.component.scss']
})


export class GenreMoodsComponent implements OnInit {
  public categories: any;
  public options: any;

  constructor(public spotifyService: SpotifyService, public router: Router) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.options = {
      limit: 50
    };
    this.spotifyService.getCategories(this.options).subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  goToCategory(category) {
    localStorage.setItem('category', JSON.stringify(category));
    this.router.navigate(['main/category'])
  }

}
