import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PriorityTask } from 'src/app/models/project/prioritytask';
@Injectable({
  providedIn: 'root'
})
export class PrioritytaskService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createPriorityTask(PriorityTask: PriorityTask): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/prioritytask/add`, PriorityTask);
  }
  getPriorityTasksList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/prioritytask/liste`);
  }
  getPriorityTask(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/prioritytask/${id}`);
  }
  deletePriorityTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/prioritytask/delete/${id}`);
  }
  updatePriorityTask(PriorityTask: PriorityTask): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/prioritytask/update`, PriorityTask);
  }
}
