import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as _ from "lodash";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  public album : any;
  constructor() { }

  ngOnInit() {
    this.loadAlbum();
  }

  loadAlbum() {
    this.album = JSON.parse(localStorage.getItem('album'));
    _.each(this.album.album.tracks.items, track => {
        console.log(track);
        track.duration_ms = moment(track.duration_ms).format('m:ss');
    });
  }

}
