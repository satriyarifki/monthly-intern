import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import { ProjectDetailsCreateComponent } from './project-details-create/project-details-create.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {
  @ViewChild(ProjectDetailsCreateComponent) createComp!: ProjectDetailsCreateComponent
  idParams = this.actRoute.snapshot.params['id']

  searchInput:any = ''

  // API
  projectApi:any

  constructor(private mainService: MainService, private actRoute: ActivatedRoute) {
    forkJoin(mainService.getProjectsById(this.idParams)).subscribe(res => {
      this.projectApi = res[0]
      console.log(this.projectApi);
    })
  }
}
