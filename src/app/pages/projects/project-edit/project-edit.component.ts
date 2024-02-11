import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
})
export class ProjectEditComponent {
  @Input() show: boolean = false;

  //APi
  deptsApi: any[] = [];
  usersApi: any[] = [];
  projectApi: any;

  form = this.formBuilder.group({
    id: 0,
    departmentId: 0,
    usersRoleId: 0,
    appName: '',
    progress: 0,
  });

  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private router: Router
  ) {
    forkJoin(
      mainService.getDepartments(),
      mainService.getUsersRole()
    ).subscribe((res) => {
      this.deptsApi = res[0];
      this.usersApi = res[1];
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.mainService.putProjects(this.form.value).subscribe((res) => {
      console.log(res);
      this.changeShow(false, null);
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl(this.router.url);
    });
  }

  changeShow(show: boolean, item: any) {
    if (show) {
      this.form.controls['id'].setValue(item.id);
      this.form.controls['departmentId'].setValue(item.departmentId);
      this.form.controls['usersRoleId'].setValue(item.usersRoleId);
      this.form.controls['appName'].setValue(item.appName);
      this.form.controls['progress'].setValue(item.progress);
    } else {
      this.form.reset();
    }
    this.show = show;
  }
}
