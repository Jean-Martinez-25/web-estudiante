import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IEstudiante } from 'src/app/interfaces/estudiante';
//Angular Materials.
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
//Servicio
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-list-estudiantes',
  templateUrl: './list-estudiantes.component.html',
  styleUrls: ['./list-estudiantes.component.css']
})
export class ListEstudiantesComponent implements OnInit, AfterViewInit {
  //Tabla
  dataSource = new MatTableDataSource<IEstudiante>;
  displayedColumns: string[] = ['idEstudiante', 'name', 'programa', 'telefono', 'email', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  //Paginacion tabla//
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = "Items por página."
    }
  }
  ngOnInit(): void {
    this.obtenerEstudiantes();
  }

  constructor(private _estudianteService: EstudiantesService,
    private _alertService: AlertService) {

  }
  obtenerEstudiantes(){
    this._estudianteService.getEstudiantes().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (e) => {
        this._alertService.mostrarMensajes("Opps.. Ha ocurrido un error al cargar los datos.");
      },
      complete: () => console.info("complete")
    });
  }

  eliminarMascota(id: number){
    this._estudianteService.deleteEstudiante(id).subscribe({
      next: () => {
        this.obtenerEstudiantes();
        this._alertService.mostrarMensajes("Estudiante eliminado correctamente", "Finalizar");
      },
      error: (e) => {
        this._alertService.mostrarMensajes("Opps.. Ha ocurrido un error al cargar los datos.");
      },
      complete: () => console.info("complete")
    })
  }
}
