import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {UtilityServiceService} from "../utility-service.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit,  OnDestroy {

  constructor(private utilService: UtilityServiceService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
  }
}
