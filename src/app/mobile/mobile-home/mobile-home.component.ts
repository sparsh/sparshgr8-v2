import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {DesktopAppComponent} from '../../desktop/desktop-app/desktop-app.component'
@Component({
  selector: 'app-mobile-home',
  templateUrl: './mobile-home.component.html',
  styleUrls: ['./mobile-home.component.scss']
})
export class MobileHomeComponent implements OnInit {

  constructor(public router:Router) {
  
   }

  ngOnInit() {
  }

}
