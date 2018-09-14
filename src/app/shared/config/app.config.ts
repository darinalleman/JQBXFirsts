
import {throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppConfig {

  private config: Object = null;

  constructor(private http: Http) {}

  /**
   * Use to get the data found in the config file
   */
  public get(key: any) {
    return this.config[key];
  }

  /**
   * This method loads "config.json" to get all variables
   */
  public load() {
    return new Promise((resolve, reject) => {
      this.http.get('config.json').pipe(
        map( res => res.json() ),
        catchError((error: any) => {
          console.error('Error reading configuration file');
          resolve(error);
          return observableThrowError(error.json().error || 'Server error');
        }),)
        .subscribe((responseData) => {
          this.config = responseData;
            resolve(true);
        });
    });
  }
}
