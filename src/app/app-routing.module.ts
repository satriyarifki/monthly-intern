import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { onAuthGuard } from './services/guard/on-auth.guard';
import { outAuthGuard } from './services/guard/out-auth.guard';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: '', component: ProjectsComponent, canActivate: [onAuthGuard] },
  { path: 'login', component: AuthComponent, canActivate: [outAuthGuard] },
  {
    path: 'details/:id',
    component: ProjectDetailsComponent,
    canActivate: [onAuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [onAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
