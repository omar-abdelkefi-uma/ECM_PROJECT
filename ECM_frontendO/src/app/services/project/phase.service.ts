import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Phase } from 'src/app/models/project/phase';
@Injectable({
  providedIn: 'root'
})
export class PhaseService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createPhase(Phase: Phase): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/phase/add`, Phase);
  }
  getPhasesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/phase/liste`);
  }
  getPhasesrefuse(idproject): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/phase/refused`, { idproject: idproject });
  }
  getPhase(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/phase/${id}`);
  }
  deletePhase(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/phase/delete/${id}`);
  }
  updatePhase(Phase: Phase): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/phase/update`, Phase);
  }
  updateListPhases(updatedPhases: Phase[]): Observable<Object> {
    debugger
    return this.http.put(`${this.baseUrl}` + '/phase/updateList', updatedPhases);
  }
  deletePhaseandtransformtasks(phase, idproject): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/phase/deletetr`, { phase: phase, idproject: idproject });
  }
  getPhasesByProject(idproject): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/phase/listebyproject`, { idproject: idproject });
  }
}
