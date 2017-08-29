import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ActiveSongService {
  // TODO: make track class CHRIS!!!
  currentSong: BehaviorSubject<any> = new BehaviorSubject('');

  constructor() {
  }

}

