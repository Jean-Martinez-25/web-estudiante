import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEstudiante, INota } from '../interfaces/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private myAppUrl: string = environment.endpoint;
  //Apis a utilizar
  private ApiEstudiante: string = 'api/Estudiante/';
  private ApiNota: string = 'api/Notas/'
  //Inyectamos a http para poder realizar las peticiones
  constructor(private http: HttpClient) { }

  getEstudiantes(): Observable<IEstudiante[]> {
    return this.http.get<IEstudiante[]>(`${this.myAppUrl}${this.ApiEstudiante}`);
  }
  getEstudiante(id: number): Observable<IEstudiante> {
    return this.http.get<IEstudiante>(`${this.myAppUrl}${this.ApiEstudiante}${id}`);
  }
  getNota(id: number): Observable<INota[]>{
    return this.http.get<INota[]>(`${this.myAppUrl}${this.ApiNota}${id}`);
  }
  addEstudiante(estudiante: IEstudiante): Observable<IEstudiante>{
    return this.http.post<IEstudiante>(`${this.myAppUrl}${this.ApiEstudiante}`, estudiante);
  }
  editEstudiante(id: number, estudiante: IEstudiante): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.ApiEstudiante}${id}`, estudiante);
  }
  deleteEstudiante(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.ApiEstudiante}${id}`);
  }
}
