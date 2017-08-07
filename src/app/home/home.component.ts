import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../shared/api/api.service";
import {SpotifyService} from "../shared/spotify/angular2-spotify";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loading: boolean = false;
  public errorMessage: string;
  public user: any;


  constructor(public router: Router, private apiService: ApiService, private spotifyService: SpotifyService, private toastrService: ToastrService) {
  }

  public login() {
    this.spotifyService.login().subscribe(
      token => {
        this.spotifyService.getCurrentUser()
          .subscribe(data => {
              localStorage.setItem('user', JSON.stringify(data));
              this.router.navigate(['main'])
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
  showSuccess() {
    this.toastrService.success('Hello world!', 'Toastr fun!');
  }

  ngOnInit() {

  }


}
