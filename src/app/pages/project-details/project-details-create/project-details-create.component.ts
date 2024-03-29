import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

const statusEnum = ['Undone', 'Ongoing', 'Done']

@Component({
  selector: 'app-project-details-create',
  templateUrl: './project-details-create.component.html',
  styleUrls: ['./project-details-create.component.css'],
})
export class ProjectDetailsCreateComponent {
  @Input() show: boolean = false;

  statusEnum:any[] = statusEnum

  //APi
  deptsApi: any[] = [];
  usersApi: any[] = [];

  form = this.formBuilder.group({
    projectId: 0,
    feature: '',
    update: '',
    status: 'Undone',
    doc: '',
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
    this.mainService.postProjectDetails(this.form.value).subscribe((res) => {
      console.log(res);
      this.changeShow(false,null);
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl(this.router.url);
    });
  }

  changeShow(show: boolean, id: any) {
    if (show) {
      this.form.controls['projectId'].setValue(id)
    } else {
      this.form.reset
    }
    this.show = show;
  }
}
