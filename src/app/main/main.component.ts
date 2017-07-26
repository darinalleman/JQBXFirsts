import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {UtilityServiceService} from "../utility-service.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit,  OnDestroy {
  show: any;
  subscription: Subscription;

  constructor(private utilService: UtilityServiceService) {
    // subscribe to home component messages
    this.subscription = this.utilService.getPlayer().subscribe(
      show => {
        console.log(show);
        this.show = show;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
