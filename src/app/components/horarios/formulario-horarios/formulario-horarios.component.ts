import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAsignaturas } from 'src/app/interfaces/asignaturas';
import { Iinstructor } from 'src/app/interfaces/instructores';
import { ISalones, IVigencia } from 'src/app/interfaces/salones';
import { AsignaturasService } from 'src/app/services/asignaturas.service';
import { InstructorService } from 'src/app/services/instructor.service';
import { SalonesService } from 'src/app/services/salones.service';
import { Horario, IHorario } from 'src/app/interfaces/hora.interfaces';
import { HorariosService } from 'src/app/services/horarios.service';
import { DatosService } from 'src/app/services/datos.service';
import { IPreviewHorario, Ihorario } from 'src/app/interfaces/horarios';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-formulario-horarios',
  templateUrl: './formulario-horarios.component.html',
  styleUrls: ['./formulario-horarios.component.css'],
})
export class FormularioHorariosComponent implements OnInit{
  @Input() datos: any;
  formHorario : FormGroup;
  instructores!: Iinstructor[];
  asignaturas!: IAsignaturas[];
  salones!: ISalones[];
  preview!: IPreviewHorario[];
  newpreview!: IPreviewHorario;
  dataSend!: IPreviewHorario[];
  horariosDisponibles!: IHorario[];
  horario!: Ihorario;
  horarios = Horario;

  modal: boolean = false;
  enlace: boolean= false;
  docenteO: boolean = false;
  salonO: boolean = false;
  cargarPreview: boolean = false;

  jornada?: number;
  vigencia!: number;

  constructor (private fb : FormBuilder,
    private _instructorService : InstructorService,
    private _asignaturaService : AsignaturasService,
    private _salonesService: SalonesService,
    private _horarioService: HorariosService,
    private datosService: DatosService,
    private _alertService: AlertService,
  ){
    this.formHorario = this.fb.group({
      IdInstructor: ['', Validators.required],
      IdGrupo: ['', Validators.required],
      CodigoComun: ['', Validators.required],
      IdDia: ['', Validators.required],
      HoraInicio: ['', Validators.required],
      HoraFin: ['', Validators.required],
      IdSalon: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.obtenerInstructores();
    this.obtenerAsignaturas(this.datos.id, this.datos.semestres);
    this.obtenerSalones();
    this.obtenerVigencia();
  }
  closeModal(): void {
    this.modal = false;
    this.enlace = false;
    this.salonO = false;
    this.docenteO = false;
  }
  filtrarHorariosDisponibles(idHoraInicio: number) {
    const index = this.horarios.findIndex(horario => horario.id == idHoraInicio);
    this.horariosDisponibles = this.horarios.filter((item, idx) => idx > index);
    this.previewHorario();
  }
  obtenerJornada(idHoraFin: number){
    if(idHoraFin >= 1 && idHoraFin <= 12){
      this.jornada = 1;
    }else if(idHoraFin >= 13 && idHoraFin <= 17){
      this.jornada = 2
    }else if(idHoraFin >= 18 && idHoraFin <= 24){
      this.jornada = 3
    }
  }
  validarFormulario(){
    const {IdDia, HoraInicio, HoraFin, IdInstructor, IdSalon, IdGrupo, CodigoComun} = this.formHorario.value;
    const partes = CodigoComun.split('-');
    const id = Number(partes[0]);
    const newCodigoComun = Number(partes[1]);
    const horarioConst : Ihorario = {
      IdInstructor: IdInstructor,
      IdGrupo: IdGrupo,
      CodigoComun: id,
      IdDia: IdDia,
      HoraInicio: HoraInicio,
      HoraFin: HoraFin,
      IdSalon: IdSalon,
      IdJornada: this.jornada!,
      Vigencia: this.vigencia,
      Semestre: this.datos.semestres,
      IdPrograma: this.datos.id,
    }
    this.horario = horarioConst;
    this._horarioService.consultarHorario(IdDia, '', HoraInicio, '', IdInstructor, '').subscribe(data => {
      this.preview = data;
      //Encontro una clase con el docente
      if(this.preview.length > 0){
        for(let item of this.preview){
          //Clase compartida
          if(item.idDia == IdDia
            && item.idHoraInicio == HoraInicio
            && item.idHoraFin == HoraFin
            && item.idSalon == IdSalon
            && item.idInstructor == IdInstructor
            && item.grupo == IdGrupo
            && item.codigoComun == newCodigoComun
            && item.idPrograma != this.datos.id){
              this.modal = true;
              this.enlace = true;
          }
          //Docente ocupado
          else if(item.idDia == IdDia && item.idHoraInicio == HoraInicio && item.idInstructor == IdInstructor
            || item.idSalon != IdSalon || item.grupo != IdGrupo || item.codigoComun != newCodigoComun){
            this.modal = true;
            this.docenteO = true;
            break;
          }
        }
      }//Salon ocupado
      else if(this.dataSend.length == 1 && this.preview.length == 0){
        this.preview = this.dataSend;
        this.modal = true;
        this.salonO = true;
      }else{
        this.agregarHorario(this.horario);
      }
    });
  }
  enlazarClases(){
    if(this.horario){
      this._horarioService.addHorario(this.horario).subscribe(data => {
        this._alertService.mostrarMensajes("Clase compartida asignada correctamente");
        this.closeModal();
      });
    }
  }
  agregarHorario(horario: Ihorario){
    this._horarioService.addHorario(horario).subscribe(data => {
      this._alertService.mostrarMensajes("Horario asignado correctamente");
    });
  }
  obtenerInstructores(){
    this._instructorService.getInstructores().subscribe(data => {
      this.instructores = data;
    });
  }
  obtenerAsignaturas(idPrograma: number, semestre:number){
    this._asignaturaService.getAsignaturas(idPrograma, semestre).subscribe(data => {
      this.asignaturas = data;
    })
  }
  obtenerSalones(){
    this._salonesService.getSalones().subscribe(data => {
      this.salones = data;
    });
  }
  obtenerVigencia(){
    this._salonesService.getVigencia().subscribe(data => {
      for(let item of data){
        this.vigencia = item.vigencia;
      }
    })
  }
  previewHorario(){
    const {IdSalon, IdDia, HoraInicio} = this.formHorario.value;
    if(IdSalon.length > 0 || IdDia.length > 0 || HoraInicio.length > 0){
      this.cargarPreview = true;
      this._horarioService.consultarHorarios(IdDia, IdSalon, HoraInicio, '', '', '').subscribe(data => {
        this.dataSend = data;
        this.datosService.enviarDatos({data});
      });
    }
  }

}
