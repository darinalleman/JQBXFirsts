import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class LoadArtistService {
  currentArtist: BehaviorSubject<any> = new BehaviorSubject('');

  constructor() { }

}
