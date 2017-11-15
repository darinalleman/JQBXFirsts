import {Component, ElementRef, OnInit, Renderer} from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  constructor(elementRef: ElementRef, renderer: Renderer) { }

  ngOnInit() {
  }

}
