import { Injectable } from '@angular/core';

@Injectable()
export class UtilityServiceService {
  public userData: Object;

  constructor() { }

  setUserData (data) {
      this.userData = data
  }

  getUserData () {
    return this.userData;
  }

}
