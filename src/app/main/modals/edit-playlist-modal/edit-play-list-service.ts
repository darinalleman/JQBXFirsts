import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class EditPlayListService {
  playlistToBeEdited: BehaviorSubject<any> = new BehaviorSubject('');
  playlistChanges: BehaviorSubject<any> = new BehaviorSubject('');
  constructor() { }

}
