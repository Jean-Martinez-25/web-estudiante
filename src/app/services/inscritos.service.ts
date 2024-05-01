import { HttpClient } from '@angular/common/http';
import { InInscritos } from '../interfaces/inscritos';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InscritosService {
  private myApp = environment.endpoint;
  private myApi = "api/Inscritos/"
  constructor(private http: HttpClient) { }

  postInscritos(inscrito: InInscritos): Observable<InInscritos>{
    return this.http.post<InInscritos>(`${this.myApp}${this.myApi}`, inscrito);
  }
  getInscritos(): Observable<InInscritos[]>{
    return this.http.get<InInscritos[]>(`${this.myApp}${this.myApi}`);
  }
  getInscrito(id: number): Observable<InInscritos>{
    return this.http.get<InInscritos>(`${this.myApp}${this.myApi}${id}`);
  }
}
