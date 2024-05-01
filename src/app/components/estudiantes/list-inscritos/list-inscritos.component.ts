import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
//Angular Materials.
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
//Servicios
import { InscritosService } from 'src/app/services/inscritos.service';
import { InInscritos } from 'src/app/interfaces/inscritos';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-list-inscritos',
  templateUrl: './list-inscritos.component.html',
  styleUrls: ['./list-inscritos.component.css']
})
export class ListInscritosComponent implements OnInit, AfterViewInit{
  //Interfaz de Inscritos
  dataSource = new MatTableDataSource<InInscritos>;
  //Columnas de la tabla
  displayedColumns: string[] = ['idEstudiante', 'name', 'programa', 'semestre', 'vigencia', 'ver'];
  //Paginacion
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = "Items por página."
    }
  }
  ngOnInit(): void {
    this.obtenerInscritos();
  }
  //Inyección de dependencias
  constructor(private _inscritoService: InscritosService,
    private _alertService : AlertService){}
  obtenerInscritos(){
    this._inscritoService.getInscritos().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (e) => {
        this._alertService.mostrarMensajes("Opps.. Ha ocurrido un error al cargar los datos.");
      },
      complete: () => console.info("complete")
    });
  }
}
