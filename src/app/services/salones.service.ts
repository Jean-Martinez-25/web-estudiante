import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISalones, IVigencia } from '../interfaces/salones';

@Injectable({
  providedIn: 'root'
})
export class SalonesService {
  private myAppUrl: string = environment.endpoint;
  private apiSalones: string = 'api/Salones';
  private apiVigencia: string = 'api/Vigencia';
  constructor(private http: HttpClient) { }
  getSalones(): Observable<ISalones[]>{
    return this.http.get<ISalones[]>(`${this.myAppUrl}${this.apiSalones}`);
  }
  getVigencia(): Observable<IVigencia[]>{
    return this.http.get<IVigencia[]>(`${this.myAppUrl}${this.apiVigencia}`);
  }
}
