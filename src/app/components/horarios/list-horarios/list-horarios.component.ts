import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IHorariosView } from 'src/app/interfaces/horarios';
import { ISemestrePrograma } from 'src/app/interfaces/programa';
import { HorariosService } from 'src/app/services/horarios.service';
import { ProgramasService } from 'src/app/services/programas.service';

@Component({
  selector: 'app-list-horarios',
  templateUrl: './list-horarios.component.html',
  styleUrls: ['./list-horarios.component.css']
})
export class ListHorariosComponent implements OnInit, AfterViewInit{
  @Input() datos?: any;
  datosNew? : ISemestrePrograma;
  dataSource = new MatTableDataSource<IHorariosView>;

  displayedColumns: string[] = ['Dia', 'Nombre', 'Asignatura', 'Salon', 'Hora', 'Jornada'];
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

  constructor(private _programaService: ProgramasService,
    private _horarioService: HorariosService
  ){}

  ngOnInit(): void {
    this.infoPrograma(this.datos.id, this.datos.semestres);
  }

  infoPrograma(id: number, semestre: number){
    this._programaService.getPrograma(id).subscribe(data => {
      this.datosNew = {
        id: Number(data.id),
        nombre: data.nombre,
        semestres: Number(semestre)
      }
      this.obtenerHorarios(this.datosNew.id, this.datosNew.semestres)
    })
  }
  obtenerHorarios(id: number, semestre: number){
    this._horarioService.getHorario(id, semestre).subscribe(data => {
      this.dataSource.data = data;
      console.log(data);
    })
  }
}
