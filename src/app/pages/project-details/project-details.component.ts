import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DeleteApiService } from 'src/app/services/delete-api/delete-api.service';
import { MainService } from 'src/app/services/main.service';
import { ProjectDetailsCreateComponent } from './project-details-create/project-details-create.component';
import { ProjectDetailsEditComponent } from './project-details-edit/project-details-edit.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {
  @ViewChild(ProjectDetailsCreateComponent) createComp!: ProjectDetailsCreateComponent
  @ViewChild(ProjectDetailsEditComponent) editComp!: ProjectDetailsEditComponent
  idParams = this.actRoute.snapshot.params['id']

  searchInput:any = ''

  // API
  projectApi:any

  constructor(private mainService: MainService, private actRoute: ActivatedRoute,private router:Router, private deleteService:DeleteApiService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    forkJoin(mainService.getProjectsById(this.idParams)).subscribe(res => {
      this.projectApi = res[0]
      console.log(this.projectApi);
    })
  }

  deleteRow(data: any) {
    const fun = 'this.mainService.deleteProjectDetails(' + JSON.stringify(data.id) + ')';
    this.deleteService.onCallDelete({
      dataName: '('+data.id + ') ' + data.feature,
      func: fun,
    });
  }
}
