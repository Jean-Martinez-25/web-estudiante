import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPrograma, ISemestrePrograma } from 'src/app/interfaces/programa';
import { ISemestres } from 'src/app/interfaces/semestres';
import { ProgramasService } from 'src/app/services/programas.service';

@Component({
  selector: 'app-crear-horarios',
  templateUrl: './crear-horarios.component.html',
  styleUrls: ['./crear-horarios.component.css']
})
export class CrearHorariosComponent implements OnInit{
  idPrograma?: number;
  action: string = "Inicio";
  datos?: ISemestrePrograma;
  formBuscarPrograma: FormGroup;
  programas! : IPrograma[];
  programa!: IPrograma;
  semestres: ISemestres[] = [];

  constructor (private fb: FormBuilder,
    private _programaService: ProgramasService){
    this.formBuscarPrograma = this.fb.group({
      programa : ['', Validators.required],
      semestre : ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.obtenerProgramas();
  }
  obtenerProgramas(){
    this._programaService.getProgramas().subscribe(data => {
      this.programas = data;
    })
  }
  cargarHorarios(){
    this.cargarInfo();
    this.action = "Cargar horarios";
  }
  onChange(event: any){
    const idSeleccionada = event;
    this.semestres = [];
    if(idSeleccionada == 1 || idSeleccionada == 2 || idSeleccionada == 3 || idSeleccionada == 4){
      for(let i = 1; i<= 9; i++){
        this.semestres.push({id: i, name: `S-${i}`})
      }
    }else if(idSeleccionada == 5 || idSeleccionada == 6 || idSeleccionada == 7){
      for(let i = 1; i<= 6; i++){
        this.semestres.push({id: i, name: `S-${i}`})
      }
    }
  }
  refrescar(){
    this.action = "Inicio";
  }
  crearHorario(){
    this.cargarInfo();
    this.action = "Crear horarios";
  }
  cargarInfo(){
    const programa = this.formBuscarPrograma.value.programa;
    const semestre = this.formBuscarPrograma.value.semestre;
    this.datos = {
      id: programa,
      semestres: semestre,
    }
  }
}
