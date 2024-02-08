import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  darkMode:Boolean = false
  @Output() setDarkMode = new EventEmitter<Boolean>();


  toggleTheme() {
    this.darkMode = !this.darkMode
    this.setDarkMode.emit(this.darkMode)
  }
}
