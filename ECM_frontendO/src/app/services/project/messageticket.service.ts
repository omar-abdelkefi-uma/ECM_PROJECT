import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageTicket } from 'src/app/models/project/messageticket';
@Injectable({
  providedIn: 'root'
})
export class MessageticketService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createMessageTicket(MessageTicket: MessageTicket): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/messageticket/add`, MessageTicket);
  }
  getMessageTicketsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/messageticket/liste`);
  }
  getMessageTicket(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/messageticket/${id}`);
  }
  deleteMessageTicket(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/messageticket/delete/${id}`);
  }
  updateMessageTicket(MessageTicket: MessageTicket): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/messageticket/update`, MessageTicket);
  }
}
