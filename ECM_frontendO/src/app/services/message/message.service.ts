import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../../models/message/Message'
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createMessage(Message: Message): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/message/add`, Message);
  }
  getMessagesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/message/liste`);
  }
  getMessage(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/message/${id}`);
  }
  deleteMessage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/message/delete/${id}`);
  }
  updateMessage(Message: Message): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/message/update`, Message);
  }
}
