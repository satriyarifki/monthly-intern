import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent {
  @Input() show: boolean = false

  //APi
  deptsApi:any[] = []
 usersApi:any[] = []

  form = this.formBuilder.group({
    departmentId: 0,
    usersRoleId: 0,
    appName: '',
    progress: 0,
  })

  constructor(private formBuilder: FormBuilder, private mainService: MainService) {
    forkJoin(mainService.getDepartments(), mainService.getUsersRole()).subscribe(res => {
      console.log(res);
      this.deptsApi = res[0]
      this.usersApi = res[1]
    })
  }

  onSubmit() {
    console.log(this.form.value);
    this.mainService.postProjects(this.form.value).subscribe(res => {
      console.log(res);

    })
  }

  changeShow(show: boolean) {
    this.show = show
  }
}
