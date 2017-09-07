import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LoadArtistService {
  currentArtist: BehaviorSubject<any> = new BehaviorSubject('');

  constructor() { }

}
