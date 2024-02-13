import { Component, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DeleteApiService } from 'src/app/services/delete-api/delete-api.service';
import { MainService } from 'src/app/services/main.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { CreateUsersAioComponent } from './create-users-aio/create-users-aio.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  @ViewChild(CreateUsersAioComponent) createAioComp!: CreateUsersAioComponent;
  createDropdown = false;

  usersApi: any[] = [];

  constructor(
    private mainService: MainService,
    private spinnerService: SpinnerService,
    private deleteService: DeleteApiService
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
  deleteRow(data: any) {
    const fun =
      'this.mainService.deleteUsersRole(' + JSON.stringify(data.id) + ')';
    this.deleteService.onCallDelete({
      dataName: 'User (' + data.lg_nik +')',
      func: fun,
    });
  }
  
  showCreateModal(aio:boolean){
    if (aio) {
      this.createDropdown = false
      this.createAioComp.changeShow(true)
    }
  }
}
