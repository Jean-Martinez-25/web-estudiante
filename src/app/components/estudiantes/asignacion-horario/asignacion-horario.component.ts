import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InInscritos } from 'src/app/interfaces/inscritos';
import { HorariosService } from 'src/app/services/horarios.service';
import { InscritosService } from 'src/app/services/inscritos.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { IHorariosView, IPreviewHorario, CargaAcademicaEstudianteHorario } from 'src/app/interfaces/horarios';
import { AlertService } from 'src/app/services/alert.service';
import { MatSort } from '@angular/material/sort';
import { ProgramasService } from 'src/app/services/programas.service';
import { IPrograma } from 'src/app/interfaces/programa';
import { SalonesService } from 'src/app/services/salones.service';
import { IVigencia } from 'src/app/interfaces/salones';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-asignacion-horario',
  templateUrl: './asignacion-horario.component.html',
  styleUrls: ['./asignacion-horario.component.css']
})
export class AsignacionHorarioComponent implements OnInit, AfterViewInit{
  dataSource = new MatTableDataSource<IHorariosView>;
  dataS = new MatTableDataSource<IHorariosView>;
  displayedColumns: string[] = ['Dia', 'Hora', 'Salon', 'Asignatura', 'Cantidad', 'Accion'];
  displayedColumns2: string[] = ['Dia', 'Hora', 'Salon', 'Asignatura', 'Accion'];

  nombre? : string;
  idEstudiante?: number;
  idPrograma?: number;
  semestre?: number;
  vigencia?: number;
  id: number;

  datosInscrito!: InInscritos;
  datosHorario!: IHorariosView;
  datosPrograma?: IPrograma;
  idsAsignaturas: number[] = [];
  cargaEstudiante: CargaAcademicaEstudianteHorario[] = [];
  preview: IHorariosView[] = [];


  constructor(private aRoute: ActivatedRoute,
    private _inscritoService: InscritosService,
    private _horarioService: HorariosService,
    private _alertService: AlertService,
    private _programaService: ProgramasService,
    private _salonesService: SalonesService,
    private _estudianteService: EstudiantesService,
    private router: Router,
  ){
    this.id = Number(this.aRoute.snapshot.paramMap.get("id"));
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
      this.idPrograma = Number(data.idPrograma);
      this.obtenerPrograma(Number(data.idPrograma));
      this.obtenerNombre(this.idEstudiante);
    });
  }
  obtenerAsignaturasCae(idEstudiante: number, vigencia: number){
    this._horarioService.obtenerCargaAcademicaEstudiante(idEstudiante, vigencia).subscribe(data => {
      for(let item of data){
        this.idsAsignaturas.push(Number(item.id))
      }
      this.obtenerHorarioConCarga(this.idPrograma!, this.semestre!, this.idsAsignaturas);
    })
  }
  obtenerHorarioEstudiante(idEstudiante: number, vigencia: number){
    this._horarioService.obtenerHorarioEstudiante(idEstudiante, vigencia).subscribe(data => {
      if(data.length > 0){
        for(let item of data){
          this.actualizar(item);
        }
      }
    })
  }
  obtenerHorarioConCarga(idPrograma: number, semestre: number, codigosComun: number[]){
    this._horarioService.getHorariosConCarga(idPrograma, semestre, codigosComun).subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
      error: (e) => {
        this._alertService.mostrarMensajes("Hubo un error al cargar horarios.")
      },
      complete: () => console.info()
    })
  }
  obtenerVigencia(){
    this._salonesService.getVigencia().subscribe(data => {
      this.vigencia = data[0].vigencia!;
      this.obtenerAsignaturasCae(this.id, Number(this.vigencia));
      this.obtenerHorarioEstudiante(this.id, Number(this.vigencia));
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
  agregarHorario(datos: IHorariosView){
    let attr: CargaAcademicaEstudianteHorario = {
      idEstudiante : this.id,
      idPrograma: Number(datos.idPrograma),
      idDocente: Number(datos.idInstructor),
      idAsignatura: datos.idAsignatura,
      Vigencia: datos.vigencia,
      Semestre: Number(this.semestre),
      Jornada: 1,
      Grupo: datos.idGrupo,
      idSalon: datos.idSalon,
      idDia: Number(datos.idDia),
      HoraInicio: datos.horaInicio,
      HoraFin: datos.horaFin,
      idHorario: Number(datos.id)
    }
    let mostrarMensaje = false;
    let interferencia = false;
    //Que no se repita ni idHoraInicio en el idDia
    for(let item of this.preview){
      if(datos.horaInicio == item.horaInicio && datos.idDia == item.idDia){
        mostrarMensaje = true;
        interferencia = true;
        break;
      }else if(datos.idAsignatura == item.idAsignatura){
        mostrarMensaje = true;
        break;
      }
    }
    if(mostrarMensaje){
      if(interferencia){
        this._alertService.mostrarMensajes(`Ya asignaste una clase el dia ${datos.nombreDia} de ${datos.horario}.`);
      }else{
        this._alertService.mostrarMensajes(`Ya asignaste la clase de ${datos.asignatura}.`);
      }

    }else{
      this.agregar(attr, datos);
    }

  }
  remove(element: any, index: number){
    this.preview.splice(index, 1);
    this.cargaEstudiante.splice(index, 1);
    this.dataS.data = this.preview;
  }
  agregar(attr: CargaAcademicaEstudianteHorario, datos: IHorariosView){
    this.cargaEstudiante.push(attr);
    this.preview.push(datos)
    this.dataS.data = this.preview;
  }
  actualizar(datos: IHorariosView){
    this.preview.push(datos)
    this.dataS.data = this.preview;
  }
  finalizar(){
    let contador : number = 0;
    for(let item of this.cargaEstudiante){
      this._horarioService.agregarHorarioEstudiante(item).subscribe(data => {
      })
      contador++;
    }
    if(contador > 1){
      this._alertService.mostrarMensajes(`Se asignó al almuno ${this.nombre} (${contador}) asignaturas a su horario.`);
    }else if(contador == 1){
      this._alertService.mostrarMensajes(`Se asignó al almuno ${this.nombre} (${contador}) asignatura a su horario.`);
    }
    setTimeout(() => {
      this._inscritoService.getInscritos().subscribe(data => {
        this.router.navigate(['/persona/listado-inscritos']);
      })
    }, 3000);
  }
}
