import { Injectable } from '@angular/core';

@Injectable()
export class UtilityServiceService {
  public userData: Object;
  public playlist: any;

  constructor() { }

  setUserData (data) {
      this.userData = data
  }

  getUserData () {
    return this.userData;
  }

  setPlayList (playlist) {
      this.playlist = playlist
  }
  getPlaylist() {
    return this.playlist;
  }

}
