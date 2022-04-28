import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Employee } from 'src/app/models/user/Employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/employee/${id}`);
  }
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  getEmployees(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/allemployees/liste`);
  }
  getEmployeeswithoutmanager(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/employee/liste`);
  }
  getProjectMangers(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/projectmanager/liste`);
  }
  addEmployee(Employee): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/employee/create`, Employee);
  }
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/employee/delete/${id}`);
  }
  updateEmployee(Employee: Employee): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/employee/update`, Employee);
  }
}
