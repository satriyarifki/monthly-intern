import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  createDropdown = false

  usersApi: any[] = [];

  constructor(private mainService: MainService) {
    forkJoin(mainService.getUsers()).subscribe((res) => {
      this.usersApi = res[0];
      console.log(this.usersApi);
    });
  }

  changeDropdown() {
    this.createDropdown = !this.createDropdown
  }
}
