import { Component } from '@angular/core';
import { HealperComponent } from './healper/healper/healper.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

constructor(public healper:HealperComponent)
{

}

}
