import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SpotifyService} from '../shared/spotify';
import {AuthService} from "../shared/auth";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;


  constructor(public router: Router,
              private spotifyService: SpotifyService,
              private auth: AuthService,
              private toasr: ToastrService) {
    this.auth.loggedOut.subscribe((success) => {
      if (success) {
        this.toasr.success('Successfully logged out.');
      }
    })
  }

  public login() {
    this.spotifyService.login();
  }

  ngOnInit() {

  }


}
