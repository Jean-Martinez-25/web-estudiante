import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InInscritos } from 'src/app/interfaces/inscritos';
import { HorariosService } from 'src/app/services/horarios.service';
import { InscritosService } from 'src/app/services/inscritos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
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
export class AsignacionHorarioComponent implements OnInit{
  dataSource = new MatTableDataSource<IHorariosView>;
  dataS = new MatTableDataSource<IHorariosView>;
  displayedColumns: string[] = ['Dia', 'Hora', 'Salon', 'Asignatura', 'Docente', 'Accion'];

  nombre? : string;
  idEstudiante?: number;
  semestre?: number;
  vigencia?: number;
  id: number;

  datosInscrito!: InInscritos;
  datosHorario!: IHorariosView;
  datosPrograma?: IPrograma;
  cargaEstudainte: CargaAcademicaEstudianteHorario[] = [];
  preview: IHorariosView[] = [];


  constructor(private aRoute: ActivatedRoute,
    private _inscritoService: InscritosService,
    private _horarioService: HorariosService,
    private _alertService: AlertService,
    private _programaService: ProgramasService,
    private _salonesService: SalonesService,
    private _estudianteService: EstudiantesService,
  ){
    this.id = Number(this.aRoute.snapshot.paramMap.get("id"));
  }


  ngOnInit(): void {
    this.obtenerVigencia();
    this.obtenerInfoInscrito(this.id);
    this.obtenerHorarioConCarga([2,3,4])
  }
  obtenerInfoInscrito(idEstudiante: number){
    this._inscritoService.getInscrito(idEstudiante).subscribe(data => {
      this.datosInscrito = data;
      this.semestre = data.semestre;
      this.idEstudiante = data.idEstudiante;
      this.obtenerHorarioDiponible(Number(data.idPrograma), data.semestre);
      this.obtenerPrograma(Number(data.idPrograma));
      this.obtenerNombre(this.idEstudiante);
    });
  }
  obtenerHorarioDiponible(idPrograma: number, idSemestre: number){
    this._horarioService.getHorario(idPrograma, idSemestre).subscribe({
      next : (response) => {
        this.dataSource.data = response;
      },
      error: (e) => {
        this._alertService.mostrarMensajes("Hubo un error al cargar horarios.")
      },
      complete: () => console.info()
    })
  }
  obtenerHorarioConCarga(codigosComun: number[]){
    this._horarioService.getHorariosConCarga(4, 1, codigosComun).subscribe(data => {
      console.log(data);
    })
  }
  obtenerVigencia(){
    this._salonesService.getVigencia().subscribe(data => {
      this.vigencia = data[0].vigencia!;
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
      idInstructor: Number(datos.idInstructor),
      idAsignatura: datos.idAsignatura,
      Vigencia: datos.vigencia,
      Semestre: Number(this.semestre),
      Jornada: 1,
      Grupo: datos.idGrupo,
      idSalon: datos.idSalon,
      idDia: Number(datos.idDia),
      HoraInicio: datos.horaInicio,
      HoraFin: datos.horaFin,
    }
    console.log(datos);
    //Que no se repita ni idHoraInicio en el idDia
    for(let item of this.cargaEstudainte){
      if(datos.horaInicio == item.HoraInicio){

      }
    }
    this.cargaEstudainte.push(attr);
    this.preview.push(datos)
    this.dataS.data = this.preview;
  }
  remove(element: any, index: number){
    this.preview.splice(index, 1);
    this.cargaEstudainte.splice(index, 1);
    this.dataS.data = this.preview;
  }
}
