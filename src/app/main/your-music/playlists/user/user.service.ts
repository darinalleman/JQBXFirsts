import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class UserService {
  user: BehaviorSubject<any> = new BehaviorSubject('');
  constructor() { }

}
