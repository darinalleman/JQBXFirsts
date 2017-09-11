import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../../shared/spotify/angular2-spotify';
import {Router} from '@angular/router';
import { NavigationService } from '../../../shared/navigation/navigation.service';

@Component({
  selector: 'app-genre-moods',
  templateUrl: './genre-moods.component.html',
  styleUrls: ['./genre-moods.component.scss']
})


export class GenreMoodsComponent implements OnInit {
   categories: any;
   options: any;

  constructor(public spotifyService: SpotifyService, public router: Router, private navigationService: NavigationService) {
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
    this.navigationService.goToCategory(category);
  }

}
