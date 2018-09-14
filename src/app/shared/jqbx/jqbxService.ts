
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Http, Headers, Response, Request} from '@angular/http';
import {Observable} from 'rxjs';
import {SafeResourceUrl} from '@angular/platform-browser';


interface HttpRequestOptions {
  method?: string;
  url: string;
  search?: Object;
  body?: Object;
  headers?: Headers;
}

@Injectable()
export class JQBXService {
  public apiBase: string;

  constructor(private http: Http) {
    //http://jqbx.fm/tracks/first/spotify:track:61egJrQMB26pi9farhhTLp
    this.apiBase = 'https://jqbx.fm/tracks/first/';
  }

  //#region albums

  /**
   * Gets an album
   * Pass in album id or spotify uri
   */
  getFirstData(uri: string) {
    return this.api({
      method: 'get',
      url: `${uri}`
    }).pipe(map(res => res));
  }

  
  //#region utils

  private toQueryString(obj: Object): string {
    let parts = [];
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
    }
    ;
    return parts.join('&');
  };


  private api(requestOptions: HttpRequestOptions) {
    return this.http.request(new Request({
      url: this.apiBase + requestOptions.url,
      method: requestOptions.method || 'get',
      search: this.toQueryString(requestOptions.search),
      body: JSON.stringify(requestOptions.body),
      headers: requestOptions.headers
    }));
  }

  //#endregion
}
