import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAsignaturas } from '../interfaces/asignaturas';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {
  private myAppUrl = environment.endpoint;
  private api = 'api/Asignatura/'
  private extension = 'consulta-programa?idPrograma='
  private extension2 = '&semestre='
  constructor(private http: HttpClient) { }

  getAsignaturas(idPrograma: number, semestre: number): Observable<IAsignaturas[]>{
    return this.http.get<IAsignaturas[]>(`
    ${this.myAppUrl}${this.api}${this.extension}${idPrograma}${this.extension2}${semestre}
    `);
  }
}
