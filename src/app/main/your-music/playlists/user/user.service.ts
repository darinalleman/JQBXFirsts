import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class UserService {
  user: BehaviorSubject<any> = new BehaviorSubject('');
  constructor() { }

}
