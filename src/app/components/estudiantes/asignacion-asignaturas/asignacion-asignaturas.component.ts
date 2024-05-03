import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InInscritos } from 'src/app/interfaces/inscritos';
import { HorariosService } from 'src/app/services/horarios.service';
import { InscritosService } from 'src/app/services/inscritos.service';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { ProgramasService } from 'src/app/services/programas.service';
import { IPrograma } from 'src/app/interfaces/programa';
import { SalonesService } from 'src/app/services/salones.service';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { ICargaAcademicaEstudiante, IAsignaturas } from 'src/app/interfaces/asignaturas';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { compileNgModule } from '@angular/compiler';
import { MESSAGES_CONTAINER_ID } from '@angular/cdk/a11y';

@Component({
  selector: 'app-asignacion-asignaturas',
  templateUrl: './asignacion-asignaturas.component.html',
  styleUrls: ['./asignacion-asignaturas.component.css']
})
export class AsignacionAsignaturasComponent {
  dataSource = new MatTableDataSource<IAsignaturas>;
  dataS = new MatTableDataSource<IAsignaturas>;
  displayedColumns: string[] = ['Nombre', 'Creditos', 'Semestre', 'Accion'];

  nombre? : string;
  idEstudiante?: number;
  semestre?: number;
  vigencia?: number;
  id: number;

  asignaturas!: IAsignaturas[];
  datosInscrito!: InInscritos;
  datosPrograma?: IPrograma;
  cargaEstudiante: ICargaAcademicaEstudiante[] = [];
  preview: IAsignaturas[] = [];

  constructor(private aRoute: ActivatedRoute,
    private _inscritoService: InscritosService,
    private _horarioService: HorariosService,
    private _alertService: AlertService,
    private _programaService: ProgramasService,
    private _salonesService: SalonesService,
    private _estudianteService: EstudiantesService,
    private _asignaturaService: AsignaturasService,
    private router: Router,
  ){
    this.id = Number(this.aRoute.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
    this.obtenerVigencia();
    this.obtenerInfoInscrito(this.id);
  }
  obtenerInfoInscrito(idEstudiante: number){
    this._inscritoService.getInscrito(idEstudiante).subscribe(data => {
      this.datosInscrito = data;
      this.semestre = data.semestre;
      this.idEstudiante = data.idEstudiante;
      this.obtenerAsignaturas(Number(data.idPrograma), data.semestre);
      this.obtenerPrograma(Number(data.idPrograma));
      this.obtenerNombre(this.idEstudiante);
    });
  }
  obtenerAsignaturas(idPrograma: number, semestre:number){
    this._asignaturaService.getAsignaturas(idPrograma, semestre).subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
      error: (e) =>{
        this._alertService.mostrarMensajes("Error al cargar asignaturas");
      },
      complete: () => console.info()
    })
  }
  obtenerVigencia(){
    this._salonesService.getVigencia().subscribe(data => {
      this.vigencia = data[0].vigencia!;
      this.obtenerCargaAcademica(this.id, data[0].vigencia)
    });
  }
  obtenerPrograma(idPrograma: number){
    this._programaService.getPrograma(idPrograma).subscribe(data => {
      this.datosPrograma = data;
    })
  }
  obtenerNombre(id: number){
    this._estudianteService.getEstudiante(id).subscribe(data => {
      this.nombre = `${data.apellido} ${data.nombre}`;
    })
  }
  obtenerCargaAcademica(idEstudiante: number, vigencia: number){
    this._horarioService.obtenerCargaAcademicaEstudiante(idEstudiante, vigencia).subscribe(data => {
      if(data.length > 0){
        for(let item of data){
          this.actualizar(item);
        }
      }
    });
  }
  agregarHorario(datos: IAsignaturas){
    let attr: ICargaAcademicaEstudiante = {
      idEstudiante : this.id,
      idPrograma: Number(datos.idPrograma),
      idAsignatura: Number(datos.id),
      vigencia: Number(this.vigencia),
    }
    if(this.cargaEstudiante.length >= 1){
      let asignaturaEncontrada = false;
      for(let item of this.cargaEstudiante){
        if(attr.idAsignatura == item.idAsignatura){
          asignaturaEncontrada = true;
          break;
        }
      }
      if(asignaturaEncontrada){
        this._alertService.mostrarMensajes(`Al parecer ya seleccionaste la asignatura ${datos.nombre}`);
      }else{
        this.agregar(datos, attr);
      }
    }
    else{
      this.agregar(datos, attr);
    }

  }
  remove(element: any, index: number){
    this.preview.splice(index, 1);
    this.cargaEstudiante.splice(index, 1);
    this.dataS.data = this.preview;
  }
  agregar(datos: IAsignaturas, attr: ICargaAcademicaEstudiante){
    this.cargaEstudiante.push(attr);
    this.preview.push(datos)
    this.dataS.data = this.preview;
  }
  actualizar(datos: IAsignaturas){
    this.preview.push(datos)
    this.dataS.data = this.preview;
  }
  finalizar(){
    let contador : number = 0;
    for(let item of this.cargaEstudiante){
      this._horarioService.agregarCargaAcademicaEstudiante(item).subscribe(data => {

      })
      contador++;
    }
    if(contador > 1){
      this._alertService.mostrarMensajes(`Se asignó al almuno ${this.nombre} (${contador}) asignaturas.`);
    }else if(contador == 1){
      this._alertService.mostrarMensajes(`Se asignó al almuno ${this.nombre} (${contador}) asignatura.`);
    }
    setTimeout(() => {
      this._inscritoService.getInscritos().subscribe(data => {
        this.router.navigate(['/persona/listado-inscritos']);
      })
    }, 3000);
  }
}
