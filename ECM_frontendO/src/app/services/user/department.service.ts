import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from 'src/app/models/user/department';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createDepartment(Department: Department): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/department/add`, Department);
  }
  getDepartmentList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/department/liste`);
  }
  getDepartment(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/department/${id}`);
  }
  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/department/delete/${id}`);
  }
  updateDepartment(Department: Department): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/department/update`, Department);
  }
}
