import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AddSongToPlaylistService {
  songToAddToPlaylist: BehaviorSubject<any> = new BehaviorSubject('');
  toggleAddSongToPlaylist: BehaviorSubject<any> = new BehaviorSubject(false);
  constructor() { }
}
