import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AddSongToPlaylistService {
  songToAddToPlaylist: BehaviorSubject<any> = new BehaviorSubject('');
  constructor() { }
}
