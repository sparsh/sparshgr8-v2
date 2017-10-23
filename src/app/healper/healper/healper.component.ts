import { Component, OnInit } from '@angular/core';
import { Resource } from '../../app.resource'
@Component({
  selector: 'app-healper',
  templateUrl: './healper.component.html',
  styleUrls: ['./healper.component.scss']
})
export class HealperComponent implements OnInit {
   resource: Resource
  constructor() {

    this.resource = new Resource();
   }

  ngOnInit() {
  }

  getIndexFromRoute(route: string): number {

    for (var i = 0; i < this.resource.toolbarIconsArray.length; i++) {
      if (("/" + this.resource.toolbarIconsArray[i].routeLink) === route)
        return i;
    }
    return 0;

  }

  public detectmob() {
     return false;
    // console.log("inner width is " + window.outerWidth);
   // return window.outerWidth<550;
    
  } 

}
