import { Component, ViewChild } from '@angular/core';
import { PaginationControlsDirective } from 'ngx-pagination';
import { forkJoin } from 'rxjs';
import { DeleteApiService } from 'src/app/services/delete-api/delete-api.service';
import { MainService } from 'src/app/services/main.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { CreateUsersAioComponent } from './create-users-aio/create-users-aio.component';
import { CreateUsersNewComponent } from './create-users-new/create-users-new.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  @ViewChild(CreateUsersAioComponent) createAioComp!: CreateUsersAioComponent;
  @ViewChild(CreateUsersNewComponent) createNewComp!: CreateUsersNewComponent;
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;

  createDropdown = false;

  itemPerPage = 5

  usersApi: any[] = [];

  config = {
      id: 'userPaginate',
      itemsPerPage: this.itemPerPage,
      currentPage: 1,
      totalItems: this.usersApi.length,
    };
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
    } else {
      this.createDropdown = false,
        this.createNewComp.changeShow(true)
    }
  }

  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    // console.log(this.config.itemsPerPage);
  }
}
