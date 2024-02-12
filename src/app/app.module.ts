import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UsersComponent } from './pages/users/users.component';
import { ProjectCreateComponent } from './pages/projects/project-create/project-create.component';
import { ProjectEditComponent } from './pages/projects/project-edit/project-edit.component';
import { DeleteApiComponent } from './layouts/delete-api/delete-api.component';
import { ProjectDetailsCreateComponent } from './pages/project-details/project-details-create/project-details-create.component';
import { ProjectDetailsEditComponent } from './pages/project-details/project-details-edit/project-details-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './layouts/spinner/spinner.component';
import { CustomFilterPipe } from './pipe/custom-filter.pipe';
import { AlertComponent } from './layouts/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SidebarComponent,
    DashboardComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
    UsersComponent,
    ProjectCreateComponent,
    ProjectEditComponent,
    DeleteApiComponent,
    ProjectDetailsCreateComponent,
    ProjectDetailsEditComponent,
    SpinnerComponent,
    CustomFilterPipe,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
