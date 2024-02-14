import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
const baseApi = environment.baseApi;

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private baseUrl = baseApi;

  constructor(private http: HttpClient) {}

  // Project
  getProjects(): Observable<any> {
    return this.http.get(this.baseUrl + 'projects');
  }
  getProjectsById(id:any): Observable<any> {
    return this.http.get(this.baseUrl + 'projects/'+id);
  }
  postProjects(body:any): Observable<any> {
    return this.http.post(this.baseUrl + 'projects',body);
  }
  putProjects(body:any): Observable<any> {
    return this.http.put(this.baseUrl + 'projects',body);
  }
  deleteProject(id:any): Observable<any> {
    return this.http.delete(this.baseUrl + 'projects/'+id);
  }

  // Project Details
  getProjectDetails(): Observable<any> {
    return this.http.get(this.baseUrl + 'project-details');
  }
  postProjectDetails(body:any): Observable<any> {
    return this.http.post(this.baseUrl + 'project-details',body);
  }
  putProjectDetails(body:any): Observable<any> {
    return this.http.put(this.baseUrl + 'project-details',body);
  }
  deleteProjectDetails(id:any): Observable<any> {
    return this.http.delete(this.baseUrl + 'project-details/'+id);
  }

  // Users
  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl + 'users');
  }
  getUsersRole(): Observable<any> {
    return this.http.get(this.baseUrl + 'users-role');
  }
  postUsersRole(body:any): Observable<any> {
    return this.http.post(this.baseUrl + 'users-role',body);
  }
  postNewUser(body:any): Observable<any> {
    return this.http.post(this.baseUrl + 'users',body);
  }
  deleteUsersRole(id:any): Observable<any> {
    return this.http.delete(this.baseUrl + 'users-role/'+id);
  }
  getRoles(): Observable<any> {
    return this.http.get(this.baseUrl + 'roles');
  }

  // Departments
  getDepartments(): Observable<any> {
    return this.http.get(this.baseUrl + 'departments');
  }
}
