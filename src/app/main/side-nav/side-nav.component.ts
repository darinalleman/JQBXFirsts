import {Component, ElementRef, OnInit, Renderer} from '@angular/core';
import {ControlPanelServiceService} from "../control-panel/control-panel-service.service";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(private controlPanelService: ControlPanelServiceService) { }

  ngOnInit() {
  }

  toggleControl() {
    this.controlPanelService.toggleControlPanel.next(true);
  }

}
