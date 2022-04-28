import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipient } from '../../models/message/Recipient'
@Injectable({
  providedIn: 'root'
})
export class RecipientService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createRecipient(Recipient: Recipient): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/Recipient/add`, Recipient);
  }
  getRecipientsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/Recipient/liste`);
  }
  getRecipient(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/Recipient/${id}`);
  }
  deleteRecipient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/Recipient/delete/${id}`);
  }
  updateRecipient(Recipient: Recipient): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/Recipient/update`, Recipient);
  }
}
