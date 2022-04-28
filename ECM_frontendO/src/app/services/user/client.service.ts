import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Client } from 'src/app/models/user/client';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  getClient(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/client/${id}`);
  }
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient,) { }
  getClientList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/client/liste`);
  }
  addClient(client): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/client/create`, client);
  }
  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/client/delete/${id}`);
  }
  updateClient(Client: Client): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/client/update`, Client);
  }
}
