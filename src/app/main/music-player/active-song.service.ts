import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ActiveSongService {
  currentSong: BehaviorSubject<any> = new BehaviorSubject('');

  constructor() {
  }

}

