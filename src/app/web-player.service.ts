import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class WebPlayerService {
  private subject = new Subject<any>();
  constructor() { }

}
