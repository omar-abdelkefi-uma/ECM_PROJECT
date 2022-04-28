import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrator } from 'src/app/models/user/administrator';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient,) { }
  getadministrator(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/administrator/${id}`);
  }
  getadministratorList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/administrator/liste`);
  }
  addadministrator(administrator): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/administrator/create`, administrator);
  }
  deleteadministrator(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/administrator/delete/${id}`);
  }
  updateadministrator(administrator: Administrator): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/administrator/update`, administrator);
  }
}
