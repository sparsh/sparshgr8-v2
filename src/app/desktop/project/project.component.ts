import { Component } from '@angular/core';
import { Resource } from '../../app.resource'
import { Router } from '@angular/router'
import { DesktopAppComponent } from '../desktop-app/desktop-app.component'
import { flipInY } from 'ng-animate';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { trigger, state, style, transition, animate, keyframes,useAnimation } from '@angular/animations';
declare var ga: Function;
@Component({

  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: [
    trigger('flipInY', [transition('* => *', useAnimation(flipInY))])

  ]
})

export class ProjectComponent {
  workDetailsArray: FirebaseListObservable<any>;
  innerWidth: any;
  url: any;
  front : boolean = true;
  constructor(public resource: Resource,
    public desktopComponent: DesktopAppComponent,
    af: AngularFireDatabase,
    public router: Router) {
    //call start progress bar
    this.desktopComponent.setProgressbarVisibility(true);
    this.workDetailsArray = af.list('/workDetailsArray', {
      query: {
        orderByChild: 'priority'
      }
    });
    this.workDetailsArray.subscribe(snapshot => {
      this.desktopComponent.setProgressbarVisibility(false);
    });

    this.url = this.router.url;
    this.innerWidth = (window.screen.width);

    this.router.events.subscribe((event) => {
      this.url = this.router.url;
    });
  }
  openWorkDetails(work) {
    //console.log("chaning work");
    this.desktopComponent.routeNavigate('workDetailsInner/' + work.$key);

  }
  // onMouseEnterWorkTile(index) {
  //           this.state = (this.state === 'flipInY' ? '' : 'flipInY');
  //           //console.log(" index is  " + index);
  //           this.front = !this.front;
    
  //         }

  // onMouseEnterWorkTile(index) {

  //   this.state = (this.state === 'small' ? 'large' : 'small');
  //   //console.log(" index is  " + index);
  //   this.hoveredWorkTileIndex = index;
  // }

  // onMouseLeaveWorkTile(index) {

  //   this.hoveredWorkTileIndex = null;
  // }

 

}
