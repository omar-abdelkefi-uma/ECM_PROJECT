import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/models/project/ticket';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createTicket(Ticket: Ticket): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/ticket/add`, Ticket);
  }
  getTicketsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/ticket/liste`);
  }
  getTicket(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/ticket/${id}`);
  }
  deleteTicket(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/ticket/delete/${id}`);
  }
  updateTicket(Ticket: Ticket): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/ticket/update`, Ticket);
  }
}
