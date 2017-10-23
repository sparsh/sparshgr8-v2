import { Component, OnInit } from '@angular/core';

import { Resource } from '../../app.resource'
import { Router } from '@angular/router'
import { DesktopAppComponent } from '../desktop-app/desktop-app.component'
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
declare var ga: Function;
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {


  innerWidth: any;
  project: any = {};
  constructor(public resource: Resource,
    public desktopComponent: DesktopAppComponent,
    public db: AngularFireDatabase,
    public router: Router) {
    //call start progress bar

  }



  getArray(length: number): String[] {
    //console.log("star length is " + length);
    return new Array(length);
  }



  ngOnInit() {

        this.desktopComponent.setProgressbarVisibility(true);
        let urlArray = this.desktopComponent.getUrl().split("workDetailsInner");
        //console.log("the length is " + urlArray.length);
       
        if(urlArray.length >= 2)
          {
        var id = urlArray[1];
       // console.log("the id is " + id);
        //this.desktopComponent.setProgressbarVisibility(true);

        this.db.object('/workDetailsArray' + id, { preserveSnapshot: true }).subscribe(snapshot => {
          this.project = snapshot.val();
          this.desktopComponent.setProgressbarVisibility(false);
        });
      }
  }
  goback() {
      window.history.back();
  }


}

