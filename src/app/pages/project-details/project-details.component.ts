import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {
  idParams = this.actRoute.snapshot.params['id']

  // API
  projectApi:any

  constructor(private mainService: MainService, private actRoute: ActivatedRoute) {
    forkJoin(mainService.getProjectsById(this.idParams)).subscribe(res => {
      this.projectApi = res[0]
      console.log(this.projectApi);
    })
  }
}
