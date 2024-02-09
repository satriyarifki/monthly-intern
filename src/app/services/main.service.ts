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
  getProjects(): Observable<any> {
    return this.http.get(this.baseUrl + 'projects');
  }
  getProjectsById(id:any): Observable<any> {
    return this.http.get(this.baseUrl + 'projects/'+id);
  }
  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl + 'users');
  }
}
