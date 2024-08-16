import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEstudiante } from 'src/app/interfaces/estudiante';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { AlertService } from 'src/app/services/alert.service';
import { ProgramasService } from 'src/app/services/programas.service';
import { IPrograma } from 'src/app/interfaces/programa';

@Component({
  selector: 'app-agregar-editar-estudiantes',
  templateUrl: './agregar-editar-estudiantes.component.html',
  styleUrls: ['./agregar-editar-estudiantes.component.css'],
})
export class AgregarEditarEstudiantesComponent implements OnInit {
  accion : string = "Agregar estudiante";
  formEstudiante: FormGroup;
  id: number;
  programas!: IPrograma[];

  constructor(private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private _alertService: AlertService,
    private _estudianteService: EstudiantesService,
    private _programaService: ProgramasService){

    this.formEstudiante = this.fb.group({
      idEstudiante: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      programa: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
      vigencia: ['', Validators.required],
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get("id"));
  }
  ngOnInit(): void {
    this.obtenerProgramas();
    if(this.id != 0){
      this.accion = "Editar datos";
      this.obtenerDatos(this.id);
    }
  }
  obtenerDatos(id:number){
      this._estudianteService.getEstudiante(id).subscribe(data => {
        this.formEstudiante.patchValue({
          idEstudiante: data.idEstudiante,
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono,
          email: data.email,
          programa: data.idPrograma,
          fechaNacimiento: data.fecha_nacimiento,
          vigencia: data.vigencia,
        });
      })
  }
  agregarEditarEstudiante(){
    //agregar los datos del formulario a la constante estudiante
    const estudiante: IEstudiante = {
      idEstudiante: this.formEstudiante.value.idEstudiante,
      nombre: this.formEstudiante.value.nombre,
      apellido: this.formEstudiante.value.apellido,
      idPrograma: Number(this.formEstudiante.value.programa),
      telefono: this.formEstudiante.value.telefono,
      email: this.formEstudiante.value.email,
      fecha_nacimiento: this.formEstudiante.value.fechaNacimiento,
      vigencia: this.formEstudiante.value.vigencia,
    }
    if(this.id != 0){
      estudiante.id = this.id;
      this.editarEstudiante(this.id, estudiante);

    }else{
      this.agregarEstudiante(estudiante);
    }


  }
  agregarEstudiante(estudiante: IEstudiante){
    this._estudianteService.addEstudiante(estudiante).subscribe((data) => {
      this._alertService.mostrarMensajes(`El estudiante ${data.nombre} ${data.apellido} ha sigo agregado correctamente.`, `Finish.`);
      this.finish();
    })
  }
  editarEstudiante(id: number, estudiante: IEstudiante){
    this._estudianteService.editEstudiante(id, estudiante).subscribe(() => {
      this._alertService.mostrarMensajes(`Los datos del estudiante ${estudiante.nombre} ${estudiante.apellido} ha sigo actualizados correctamente.`, `Finish.`);
      this.finish();
    })
  }
  obtenerProgramas(){
    this._programaService.getProgramas().subscribe(data => {
      this.programas = data;
    })
  }
  finish(){
    setTimeout(() => {
      this.router.navigate(['/persona/listado-aspirantes']);
    }, 1500);
  }
}
