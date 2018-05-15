import { Component, OnInit } from '@angular/core';
import {ControlPanelServiceService} from "./control-panel-service.service";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  toggle: boolean;

  constructor(private controlPanelService: ControlPanelServiceService) {
    this.controlPanelService.toggleControlPanel.subscribe(
      toggle => {
        this.toggle = toggle;
      }
    );
  }

  ngOnInit() {
  }

  close() {
    this.controlPanelService.toggleControlPanel.next(false);
  }

}
