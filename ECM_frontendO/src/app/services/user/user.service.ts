import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient,) { }
  getPermissionByUsername2(token: string) {
    return this.http.get('http://localhost:8080/api/user/perissionByuserame',)
      .pipe(
        map(data => { return data; })
      )
  }
  getuser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/user/${id}`);
  }
  getuserList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/user/liste`);
  }
  adduser(user): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/user/create`, user);
  }
  deleteuser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/user/delete/${id}`);
  }
  updateuser(user: User): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/user/update`, user);
  }
}
