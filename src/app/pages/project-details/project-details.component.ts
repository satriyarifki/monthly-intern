import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DeleteApiService } from 'src/app/services/delete-api/delete-api.service';
import { MainService } from 'src/app/services/main.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { ProjectDetailsCreateComponent } from './project-details-create/project-details-create.component';
import { ProjectDetailsEditComponent } from './project-details-edit/project-details-edit.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent {
  @ViewChild(ProjectDetailsCreateComponent)
  createComp!: ProjectDetailsCreateComponent;
  @ViewChild(ProjectDetailsEditComponent)
  editComp!: ProjectDetailsEditComponent;
  idParams = this.actRoute.snapshot.params['id'];

  searchInput: any = '';

  // API
  projectApi: any;

  constructor(
    private mainService: MainService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private deleteService: DeleteApiService,
    private spinnerService: SpinnerService,
    private authService: AuthService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    spinnerService.onCallSpinner(true);
    forkJoin(mainService.getProjectsById(this.idParams)).subscribe(
      (res) => {
        this.projectApi = res[0];
        if (!this.projectApi) {
          
          router.navigate(['/']);
        }
        if (
          authService.getUser().roleId != 1 &&
          !this.projectApi?.users_role.nik.includes(authService.getUser().lg_nik)
        ) {
          router.navigate(['/']);
        }
        spinnerService.onCallSpinner(false);
      },
      (err) => {
        console.log(err);
        spinnerService.onCallSpinner(false);
      }
    );
  }

  deleteRow(data: any) {
    const fun =
      'this.mainService.deleteProjectDetails(' + JSON.stringify(data.id) + ')';
    this.deleteService.onCallDelete({
      dataName: '(' + data.id + ') ' + data.feature,
      func: fun,
    });
  }
}
