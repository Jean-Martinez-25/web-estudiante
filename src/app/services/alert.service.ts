import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _snackBar: MatSnackBar) { }
  mostrarMensajes(texto: string, boton: string = "Cerrar"){
    setTimeout(() => {
      this._snackBar.open(`${texto}`, `${boton}`, {
        duration: 4000,
        horizontalPosition: "right",
      });
    }, 1000);
  }
}
