import { Component, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MainService } from 'src/app/services/main.service';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { Router } from '@angular/router';
import { DeleteApiService } from 'src/app/services/delete-api/delete-api.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PaginationControlsDirective } from 'ngx-pagination';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  @ViewChild(ProjectCreateComponent) createComp!: ProjectCreateComponent;
  @ViewChild(ProjectEditComponent) editComp!: ProjectEditComponent;
  @ViewChild('p', { static: true }) pa: PaginationControlsDirective | any;
itemPerPage = 5;

projectsApi: any[] = [];
config = {
    id: 'project-details',
    itemsPerPage: this.itemPerPage,
    currentPage: 1,
    totalItems: 0,
  };

  constructor(
    private mainService: MainService,
    private router: Router,
    private deleteService: DeleteApiService,
    private spinnerService: SpinnerService,
    private authService:AuthService
  ) {
    // console.log(this.createComp);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    
    
    spinnerService.onCallSpinner(true);
    forkJoin(mainService.getProjects()).subscribe(
      (res) => {
        this.projectsApi = res[0];
        if (authService.getUser().roleId != 1) {
          this.projectsApi = this.projectsApi.filter(data=>data.users_role.nik.includes(authService.getUser().lg_nik))
        }
        spinnerService.onCallSpinner(false);
      },
      (err) => {
        spinnerService.onCallSpinner(false);
      }
    );
  }

  toDetails(id: any) {
    this.router.navigate(['details/' + id]);
  }
  deleteRow(data: any) {
    const fun =
      'this.mainService.deleteProject(' + JSON.stringify(data.id) + ')';
    this.deleteService.onCallDelete({
      dataName: '' + data.appName,
      func: fun,
    });
  }
  changeItemPerPageSelect(value: any) {
    this.config.itemsPerPage = value;
    // console.log(this.config.itemsPerPage);
  }
}

