import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() darkMode!: Boolean ;
  @Output() setDarkMode = new EventEmitter<Boolean>();

  constructor(
    private mainService: MainService,
    private authService: AuthService,
    public router: Router
  ) {}
  toggleTheme() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {

      localStorage.setItem('theme','dark')
    } else {
      localStorage.setItem('theme','')

    }
    this.setDarkMode.emit(this.darkMode);
  }

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl('login');
  }
}
