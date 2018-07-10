import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AppConfig} from '../config/app.config';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AuthService {
  loggedOut: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private appConfig: AppConfig, private http: Http) {}

}
