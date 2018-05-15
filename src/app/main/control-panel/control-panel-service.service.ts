import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class ControlPanelServiceService {
  toggleControlPanel: BehaviorSubject<any> = new BehaviorSubject(false);
  constructor() { }

}
