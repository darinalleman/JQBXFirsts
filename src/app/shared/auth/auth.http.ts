import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';

@Injectable()
export class AuthHttp {

  constructor(private appConfig: AppConfig, private http: Http) {}

  private setOptions(token: string): RequestOptions {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });
    return options;
  }
}
