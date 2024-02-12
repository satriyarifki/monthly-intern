import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  createDropdown = false;

  usersApi: any[] = [];

  constructor(
    private mainService: MainService,
    private spinnerService: SpinnerService
  ) {
    spinnerService.onCallSpinner(true);
    forkJoin(mainService.getUsers()).subscribe(
      (res) => {
        this.usersApi = res[0];
        console.log(this.usersApi);
        spinnerService.onCallSpinner(false);
      },
      (err) => {
        spinnerService.onCallSpinner(false);
      }
    );
  }

  changeDropdown() {
    this.createDropdown = !this.createDropdown;
  }
}
