import { HttpClient } from '@angular/common/http';
import { Iinstructor } from '../interfaces/instructores';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private myApp: string = environment.endpoint;
  private apiDocente: string = 'api/Instructor/';
  constructor(private http: HttpClient) { }
  getInstructores(): Observable<Iinstructor[]>{
    return this.http.get<Iinstructor[]>(`${this.myApp}${this.apiDocente}`);
  }
  getInstructor(id: number): Observable<Iinstructor>{
    return this.http.get<Iinstructor>(`${this.myApp}${this.apiDocente}${id}`);
  }
  addInstructor(instructor: Iinstructor): Observable<Iinstructor>{
    return this.http.post<Iinstructor>(`${this.myApp}${this.apiDocente}`, instructor);
  }
  editInstructor(instructor: Iinstructor, id: number): Observable<void>{
    return this.http.put<void>(`${this.myApp}${this.apiDocente}${id}`, instructor);
  }
  deleteInstructor(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myApp}${this.apiDocente}${id}`);
  }
}
