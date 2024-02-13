import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertType } from 'src/app/services/alert/alert.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-create-users-aio',
  templateUrl: './create-users-aio.component.html',
  styleUrls: ['./create-users-aio.component.css']
})
export class CreateUsersAioComponent {

  @Input() show: boolean = false;

  //APi
  deptsApi: any[] = [];
  usersApi: any[] = [];

  form = this.formBuilder.group({
    nik: '',
    roleId: 0,
  });

  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private router: Router,
    private alertService: AlertService
  ) {
    forkJoin(
      mainService.getRoles(),
      mainService.getUsersRole()
    ).subscribe((res) => {
      this.deptsApi = res[0];
      this.usersApi = res[1];
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.mainService.postUsersRole(this.form.value).subscribe((res) => {
      console.log(res);
      this.alertService.onCallAlert('Create User AIO Success!', AlertType.Success)
      this.changeShow(false);
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl(this.router.url);
    });
  }

  changeShow(show: boolean) {
    this.show = show;
  }

  
}
