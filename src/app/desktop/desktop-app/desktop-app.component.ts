import { Component, OnInit } from '@angular/core';
import { Resource } from '../../app.resource'
import { Router } from '@angular/router'
declare var ga: Function;
import { HealperComponent } from '../../healper/healper/healper.component'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
@Component({
  selector: 'app-desktop-app',
  templateUrl: './desktop-app.component.html',
  styleUrls: ['./desktop-app.component.scss'],
  animations: [
    trigger('myTabAnimation', [
      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(1)',
      })),
      transition('small <=> large', animate('800ms ease-in', keyframes([
        style({ opacity: 0, transform: 'translateY(-2%)', offset: 0 }),
        style({ opacity: 1, transform: 'translateY(2%)', offset: 0.5 }),
        style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
      ]))),

    ]),

  ]
})
export class DesktopAppComponent implements OnInit {
  showProgress: boolean = false;
  state: string = 'small';
  uniqueKey;
  myAwesomeCard: any;
  url: string;
  showFront: boolean = true;
  resource: Resource;
  helper: HealperComponent;

  constructor(protected router: Router) {
    this.resource = new Resource();
    this.helper = new HealperComponent();

  }
  selectedTab: number = 0;
  ngOnInit() {
    //console.log(Math.random().toString(36));
    this.uniqueKey = Math.random().toString(36).substr(2, 5);
    //console.log(this.uniqueKey);
    this.router.events.subscribe((event) => {
      this.url = this.router.url;
      this.setSelectedTab(this.helper.getIndexFromRoute(this.url));
      if (this.url.trim() != "/")
        this.scrollToElement();


    });
  }

  getUrl(): string {
    return this.url;
  }



  setSelectedTab(selectedTab: number) {
    this.selectedTab = selectedTab;

  }
  showSelectedTabData(index: number) {
    this.state = (this.state === 'small' ? 'large' : 'small');
    this.setSelectedTab(index);
    this.routeNavigate(this.resource.toolbarIconsArray[index].routeLink);
  }


  routeNavigate(path: string) {
    //console.log("path is " + path);
    this.scrollToElement();


    ga('set', 'page', path);
    ga('send', 'pageview');

    this.router.navigate([path]);
  }

  technologyClick(index: number) {
    this.state = (this.state === 'small' ? 'large' : 'small');
  }

  setProgressbarVisibility(visibility: boolean) {
    this.showProgress = visibility;
  }

  mail() {
    window.location.href = "mailto:sparshgr8@yahoo.com?subject=Hi!&20Regarding%20a%20new%20Project&body=project%20details";
  }

  scrollToElement() {

    var element = document.getElementById("tabs");
    element.scrollIntoView();
  }


}
