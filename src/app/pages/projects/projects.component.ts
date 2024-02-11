import { Component, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import { ProjectCreateComponent } from './project-create/project-create.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  @ViewChild(ProjectCreateComponent) createComp!: ProjectCreateComponent

  projectsApi: any[] = []


  constructor(private mainService: MainService) {

    forkJoin(mainService.getProjects()).subscribe(res=>{
      this.projectsApi = res[0]
      console.log(this.projectsApi);

    })
  }
}
