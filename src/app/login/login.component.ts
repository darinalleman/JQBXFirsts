import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../shared/api/api.service";
import {SpotifyService} from "../shared/spotify/angular2-spotify";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent {
  public loading: boolean = false;
  public errorMessage: string;

  constructor(public router: Router, private apiService: ApiService, private spotifyService: SpotifyService) {

  }

  public login() {
    this.spotifyService.login().subscribe(
      token => {
        console.log(token)
        this.router.navigate(['/home']);
      },
      err => {
        this.errorMessage = err;
        console.error(this.errorMessage);
      },
      () => { }
    );
  }

}
