import { Component, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { Router } from '@angular/router';
import { DeleteApiService } from 'src/app/services/delete-api/delete-api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  @ViewChild(ProjectCreateComponent) createComp!: ProjectCreateComponent
  @ViewChild(ProjectEditComponent) editComp!: ProjectEditComponent

  projectsApi: any[] = []


  constructor(private mainService: MainService, private router:Router, private deleteService:DeleteApiService) {
    // console.log(this.createComp);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    forkJoin(mainService.getProjects()).subscribe(res=>{
      this.projectsApi = res[0]

    })
  }

  toDetails(id: any) {
    this.router.navigate(['details/'+id])
  }
  deleteRow(data: any) {
    const fun = 'this.mainService.deleteProject(' + JSON.stringify(data.id) + ')';
    this.deleteService.onCallDelete({
      dataName: '' + data.appName,
      func: fun,
    });
  }
}
