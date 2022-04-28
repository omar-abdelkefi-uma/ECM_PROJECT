import { Injectable } from '@angular/core';
//import
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from 'src/app/models/user/role';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createRole(role: Role): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/role/add`, role);
  }
  getRolesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/role/liste`);
  }
  getRole(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/role/${id}`);
  }
  deleteRole(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/role/delete/${id}`);
  }
  updateRole(role: Role): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/role/update`, role);
  }
}
