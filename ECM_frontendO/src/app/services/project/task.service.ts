import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/project/task';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createTask(Task: Task): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/task/add`, Task);
  }
  getTasksList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/task/liste`);
  }
  getTask(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/task/${id}`);
  }
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/task/delete/${id}`);
  }
  updateTask(Task: Task): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/task/update`, Task);
  }
  refuseTask(Task: Task, idproject): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/task/refuse`, { task: Task, idproject: idproject });
  }
  returnTask(Task: Task): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/task/return`, Task);
  }
}
