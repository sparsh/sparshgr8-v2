import { Component } from '@angular/core';
import { Resource } from '../../app.resource'
import { Router } from '@angular/router'
import { DesktopAppComponent } from '../desktop-app/desktop-app.component'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
declare var ga: Function;
@Component({

  templateUrl: './client-feedback.component.html',
  styleUrls : ['./client-feedback.component.scss']
})
export class ClientFeedbackComponent {
  clientFeedbackDetailsArray: FirebaseListObservable<any>;
  innerWidth: any;
  url: any;
  hoveredClientFeedbackTileIndex: number;
  static selectedClientFeedback: any;
  constructor(public resource: Resource,
    public desktopComponent: DesktopAppComponent,
    af: AngularFireDatabase,
    public router: Router) {
    //call start progress bar
    this.desktopComponent.setProgressbarVisibility(true);

      this.clientFeedbackDetailsArray = af.list('/clientFeedbackDetailsArray');
      this.clientFeedbackDetailsArray.subscribe(snapshot => {
         this.desktopComponent.setProgressbarVisibility(false);
        });
    this.url = this.router.url;
    this.innerWidth = (window.screen.width);

    this.router.events.subscribe((event) => {
      this.url = this.router.url;
    });
  }



  getArray(length:number) : String[]
  {
    //console.log("star length is " + length);
    return new Array(length);
  }

}
