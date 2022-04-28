import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeProject } from 'src/app/models/project/typeproject';
@Injectable({
  providedIn: 'root'
})
export class TypeprojectService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createTypeProject(TypeProject: TypeProject): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/typeproject/add`, TypeProject);
  }
  getTypeProjectsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/typeproject/liste`);
  }
  getTypeProject(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/typeproject/${id}`);
  }
  deleteTypeProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/typeproject/delete/${id}`);
  }
  updateTypeProject(TypeProject: TypeProject): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/typeproject/update`, TypeProject);
  }
}
