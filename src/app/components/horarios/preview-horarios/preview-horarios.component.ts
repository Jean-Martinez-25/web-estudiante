import { AfterViewInit, Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPreviewHorario } from 'src/app/interfaces/horarios';
import { AlertService } from 'src/app/services/alert.service';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-preview-horarios',
  templateUrl: './preview-horarios.component.html',
  styleUrls: ['./preview-horarios.component.css']
})

export class PreviewHorariosComponent implements OnInit{
  dataSource = new MatTableDataSource<IPreviewHorario>;
  displayedColumns: string[] = ['Dia', 'Hora', 'Salon', 'Asignatura', 'Docente', 'Grupo'];


  ngOnInit(): void {
    this.cargarDatos();
  }
  constructor(
    private datosService: DatosService,
    private _alertService: AlertService,
  ){}
  cargarDatos(){
    this.datosService.datos$.subscribe({
      next: (response) => {
          this.dataSource.data = response.data;
      },
      error: (e) => {
        this._alertService.mostrarMensajes("Hubo un error al cargar horarios.")
      },
      complete: () => console.info()
    });
  }
}
