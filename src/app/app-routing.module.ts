import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { onAuthGuard } from './services/guard/on-auth.guard';
import { outAuthGuard } from './services/guard/out-auth.guard';

const routes: Routes = [
  {path: '', component: ProjectsComponent, canActivate: [onAuthGuard]},
  {path: 'login', component:AuthComponent, }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
