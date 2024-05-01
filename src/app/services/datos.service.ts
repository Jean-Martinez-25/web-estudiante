import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPreviewHorario } from '../interfaces/horarios';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private datosSubject: BehaviorSubject<any> = new BehaviorSubject<any>({})
  datos$: Observable<any> = this.datosSubject.asObservable();

  enviarDatos(datos: any){
    this.datosSubject.next(datos);
  }
}
