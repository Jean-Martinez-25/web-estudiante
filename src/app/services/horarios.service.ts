import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHorariosView, IPreviewHorario } from '../interfaces/horarios';
import { Ihorario } from '../interfaces/horarios';
import { ICargaAcademicaEstudiante, IRespuestaCargaAcademica } from '../interfaces/asignaturas';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private myAppUrl: string = environment.endpoint;
  //Apis a utilizar
  private ApiHorario: string = 'api/NewHorario/';
  private CargaAcademica: string = 'api/CargaAcademicaEstudiante';
  private Horario: string = 'consultar-horario'
  private HorarioDocente: string = 'consulta-horario-docente'
  private HorarioDocenteEnlace: string = 'consulta-horario-docente-enlace'
  constructor(private http: HttpClient) { }

  getHorario(id: number, semestre: number): Observable<IHorariosView[]>{
    return this.http.get<IHorariosView[]>(`${this.myAppUrl}${this.ApiHorario}${this.Horario}?idPrograma=${id}&semestre=${semestre}`);
  }
  consultarHorarios(idDia?: string, idSalon?: string, horaInicio?: string, grupo?: string, idInstructor?: string, codigoComun?: string): Observable<IPreviewHorario[]> {
    // Construir el objeto de parámetros
    let params = new HttpParams();
    if(idDia !== undefined && idDia.length != 0){
      params = params.set('idDia', idDia.toString());
    }
    if(idSalon !== undefined && idSalon.length != 0){
      params = params.set('idSalon', idSalon.toString());
    }
    if(horaInicio !== undefined && horaInicio.length != 0){
      params = params.set('horaInicio', horaInicio.toString());
    }
    if(grupo !== undefined && grupo.length != 0){
      params = params.set('grupo', grupo.toString());
    }
    if(idInstructor !== undefined && idInstructor.length != 0){
      params = params.set('IdInstructor', idInstructor.toString());
    }
    if(codigoComun !== undefined && codigoComun.length != 0){
      params = params.set('codigoComun', codigoComun.toString());
    }
    const url = (`${this.myAppUrl}${this.ApiHorario}${this.HorarioDocente}`);
    const url1 = (`${url}?${params.toString()}`);

    return this.http.get<IPreviewHorario[]>(url1);
  }

  consultarHorario(idDia?: string, idSalon?: string, horaInicio?: string, grupo?: string, idInstructor?: string, codigoComun?: string): Observable<IPreviewHorario[]> {
    // Construir el objeto de parámetros
    let params = new HttpParams();
    if(idDia !== undefined && idDia.length != 0){
      params = params.set('idDia', idDia.toString());
    }
    if(idSalon !== undefined && idSalon.length != 0){
      params = params.set('idSalon', idSalon.toString());
    }
    if(horaInicio !== undefined && horaInicio.length != 0){
      params = params.set('horaInicio', horaInicio.toString());
    }
    if(grupo !== undefined && grupo.length != 0){
      params = params.set('grupo', grupo.toString());
    }
    if(idInstructor !== undefined && idInstructor.length != 0){
      params = params.set('IdInstructor', idInstructor.toString());
    }
    if(codigoComun !== undefined && codigoComun.length != 0){
      params = params.set('codigoComun', codigoComun.toString());
    }
    const url = (`${this.myAppUrl}${this.ApiHorario}${this.HorarioDocenteEnlace}`);
    const url1 = (`${url}?${params.toString()}`);

    return this.http.get<IPreviewHorario[]>(url1);
  }
  addHorario(horario: Ihorario): Observable<Ihorario>{
    return this.http.post<Ihorario>(`${this.myAppUrl}${this.ApiHorario}`, horario);
  }
  agregarCargaAcademicaEstudiante(cargaEstudiante: ICargaAcademicaEstudiante): Observable<IRespuestaCargaAcademica>{
    return this.http.post<IRespuestaCargaAcademica>(`${this.myAppUrl}${this.CargaAcademica}`, cargaEstudiante);
  }
}
