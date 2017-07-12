import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  awaitingRequest: boolean = false;
  message: string;

  constructor(private appConfig: AppConfig, private http: Http) {}

}
