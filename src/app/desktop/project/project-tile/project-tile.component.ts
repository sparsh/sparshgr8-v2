import { Component, OnInit, Input } from '@angular/core';
import { flipInY } from 'ng-animate';
import { DesktopAppComponent } from '../../desktop-app/desktop-app.component'
import { trigger, state, style, transition, animate, keyframes, useAnimation } from '@angular/animations';

import { Resource } from '../../../app.resource'
@Component({
  selector: 'app-project-tile',
  templateUrl: './project-tile.component.html',
  styleUrls: ['./project-tile.component.scss'],
  animations: [
   
    trigger('flipInY', [
      state("flipFront",style({})),
      state("flipBack",style({})),
      transition('* => *', useAnimation(flipInY))])

  ]
})
export class ProjectTileComponent implements OnInit {
  @Input() work: any;
  @Input() index: number;
  changed: boolean = true;
  front: boolean = true;
  flipInY : any;
  constructor(public resource: Resource,
    public desktopComponent: DesktopAppComponent) { }

  ngOnInit() {
  }

  


  onMouseLeaveWorkTile() {
    if (!this.front) {
      this.flipInY = ((this.flipInY == 'flipFront') ?'flipBack':'flipFront');
      this.front = true;
    }
  }

  onMouseEnterWorkTile(index) {

    if (this.front) {

      this.flipInY = ((this.flipInY == 'flipFront') ?'flipBack':'flipFront');
      this.front = false;
    }

  }

 


}
