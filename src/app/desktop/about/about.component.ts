import { Component, OnInit } from '@angular/core';
import { Resource } from '../../app.resource'
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(public resource:Resource) { }

  ngOnInit() {
  }

}
