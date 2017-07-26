import {Injectable} from '@angular/core';
import {Subject, Observable} from "rxjs";

@Injectable()
export class UtilityServiceService {
  private subject = new Subject<any>();

  showPlayer(show: boolean) {
    this.subject.next({player: show});
  }

  clearPlayer() {
    this.subject.next();
  }

  getPlayer(): Observable<any> {
    return this.subject.asObservable();
  }
}
