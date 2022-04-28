import { Injectable } from '@angular/core';
import { Society } from 'src/app/models/user/society';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocietyService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createSociety(Society: Society): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/society/add`, Society);
  }
  getSocietyList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/society/liste`);
  }
  getSociety(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/society/${id}`);
  }
  deleteSociety(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/society/delete/${id}`);
  }
  updateSociety(Society: Society): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/society/update`, Society);
  }
}
