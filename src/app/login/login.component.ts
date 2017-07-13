import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../shared/api/api.service";
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import {UtilityServiceService} from "../utility-service.service";
import {routerNgProbeToken} from "@angular/router/src/router_module";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent {
  public loading: boolean = false;
  public errorMessage: string;
  public user: any;

  constructor(public router: Router, private apiService: ApiService, private spotifyService: SpotifyService, private utilityService: UtilityServiceService) {

  }

  public login() {
    this.spotifyService.login().subscribe(
      token => {
        console.log(token);
        this.spotifyService.getCurrentUser()
          .subscribe(data => {
              localStorage.setItem('user', JSON.stringify(data));
              this.router.navigate(['home'])
            },
            err => console.error(err));
      },
      err => {
        this.errorMessage = err;
        console.error(this.errorMessage);
      },
      () => {
      }
    );
  }

}
