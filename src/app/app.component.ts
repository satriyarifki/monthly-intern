import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'monthly-report-intern';
  darkMode:Boolean = false;

  setDarkMode(dark: Boolean) {
    this.darkMode = dark
  }
  constructor(public router:Router){

  }
}
