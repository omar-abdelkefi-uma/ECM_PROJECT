import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project/project';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createProject(Project: Project): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/project/add`, Project);
  }
  getProjectsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/project/liste`);
  }
  getProject(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/project/${id}`);
  }
  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/project/delete/${id}`);
  }
  updateProject(Project: Project): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/project/update`, Project);
  }
}
