import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeTask } from 'src/app/models/project/typetask';
@Injectable({
  providedIn: 'root'
})
export class TypetaskService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createTypeTask(TypeTask: TypeTask): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/typetask/add`, TypeTask);
  }
  getTypeTasksList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/typetask/liste`);
  }
  getTypeTask(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/typetask/${id}`);
  }
  deleteTypeTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/typetask/delete/${id}`);
  }
  updateTypeTask(TypeTask: TypeTask): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/typetask/update`, TypeTask);
  }
}
