import { Component, AfterViewInit, OnInit,  ViewChild} from '@angular/core';
//Angular Materials.
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
//Interfaces
import { Iinstructor } from 'src/app/interfaces/instructores';
import { InstructorService } from 'src/app/services/instructor.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-list-instructores',
  templateUrl: './list-instructores.component.html',
  styleUrls: ['./list-instructores.component.css']
})
export class ListInstructoresComponent implements OnInit, AfterViewInit{
  constructor(private _InstructorServicio: InstructorService,
    private _MensajerService: AlertService){}
  //Tabla
  dataSource = new MatTableDataSource<Iinstructor>;
  displayedColumns : string[] = ["Id-instructor", "Nombre", "Telefono", "Correo", "Acciones"];
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    if(this.dataSource.data.length != 0) {
      this.paginator._intl.itemsPerPageLabel = "Items por página."
    }
  }
  ngOnInit(): void {
    this.obtenerInstructores();
  }
  obtenerInstructores(){
    this._InstructorServicio.getInstructores().subscribe({
      next: (data)=> {
        this.dataSource.data = data;
      },
      error: (e) => {
        this._MensajerService.mostrarMensajes("Hubo un error al cargar los datos", "Finalizar")
      },
      complete: () => console.info("complete")
    })
  }
  eliminarInstructor(id : number){
    this._InstructorServicio.deleteInstructor(id).subscribe(()=> {
      this.obtenerInstructores();
      this._MensajerService.mostrarMensajes("Docente eliminado.");
    })
  }
}
