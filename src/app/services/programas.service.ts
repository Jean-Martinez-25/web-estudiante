import { Injectable } from '@angular/core';
import { IPrograma } from '../interfaces/programa';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {
  private myApp : string = environment.endpoint;
  private ApiPrograma: string = "api/Programas/";
  constructor(private http: HttpClient) { }
  getProgramas(): Observable<IPrograma[]>{
    return this.http.get<IPrograma[]>(`${this.myApp}${this.ApiPrograma}`);
  }
  getPrograma(id: number): Observable<IPrograma>{
    return this.http.get<IPrograma>(`${this.myApp}${this.ApiPrograma}${id}`);
  }
}
