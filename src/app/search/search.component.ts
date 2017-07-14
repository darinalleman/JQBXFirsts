import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../shared/spotify/angular2-spotify";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchQuery: string;
  public type: string;
  public returnedSearchData: any;
  public options: any;
  public hasQuery: boolean;
  public artists: any;
  public albums: any;
  public playlists: any;
  public tracks: any;

  constructor(public spotifyService: SpotifyService) { }

  ngOnInit() {
  }

  search(){
    this.type = 'album,artist,track,playlist';
    if(!this.searchQuery){
      this.hasQuery = false;
      return false;
    }else{
      this.hasQuery = true;
      this.spotifyService.search(this.searchQuery, this.type).subscribe(
        data => {
          console.log(data);
          this.returnedSearchData = data.items;
          this.artists = data.artists.items;
          this.albums = data.albums.items;
          this.playlists = data.playlists.items;
          this.tracks = data.tracks.items

        },
        error => {
          console.log(error);
        }
      )
    }

  }

}
