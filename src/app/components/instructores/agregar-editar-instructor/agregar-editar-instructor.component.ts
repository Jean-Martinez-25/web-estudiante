import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iinstructor } from 'src/app/interfaces/instructores';
import { AlertService } from 'src/app/services/alert.service';
import { InstructorService } from 'src/app/services/instructor.service';

@Component({
  selector: 'app-agregar-editar-instructor',
  templateUrl: './agregar-editar-instructor.component.html',
  styleUrls: ['./agregar-editar-instructor.component.css']
})
export class AgregarEditarInstructorComponent implements OnInit{
  accion : string = "Agregar instructor";
  formInstructor : FormGroup;
  id: number;
  constructor(private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private _alertService: AlertService,
    private _instructorService: InstructorService){
    this.formInstructor = this.fb.group({
      idInstructor : ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      alias: ['', Validators.required],
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
    if(this.id != 0){
      this.accion = "Editar datos"
      console.log(this.id);
      this.obtenerInstructor(this.id)
    }
  }
  agregarEditarInstructor(){
    const instructor : Iinstructor = {
      idInstructor: this.formInstructor.value.idInstructor,
      nombre: this.formInstructor.value.nombre,
      apellido: this.formInstructor.value.apellido,
      aliasDocente: this.formInstructor.value.alias,
      telefono: this.formInstructor.value.telefono,
      email: this.formInstructor.value.email,
      idEstado: 1
    }
    if(this.id != 0){
      instructor.id = this.id;
      this.editarInstructor(instructor, this.id);
    }else{
      this.agregarInstructor(instructor);
    }

  }
  obtenerInstructor(id: number){
    this._instructorService.getInstructor(id).subscribe(data => {
      console.log(data);
      this.formInstructor.setValue({
        idInstructor : data.idInstructor,
        nombre : data.nombre,
        apellido: data.apellido,
        telefono: data.telefono,
        email: data.email,
        alias: data.aliasDocente
      });
    });
  }
  agregarInstructor(instructor : Iinstructor){
    this._instructorService.addInstructor(instructor).subscribe(data => {
      this._alertService.mostrarMensajes(`El docente ${data.nombre} ${data.apellido} ha sido agregado correctamente.`)
      this.finish();
    })
  }
  editarInstructor(instructor : Iinstructor, id : number){
    this._instructorService.editInstructor(instructor, id).subscribe(() => {
      this._alertService.mostrarMensajes(`El docente ${instructor.nombre} ${instructor.apellido} ha sido actualizado correctamente.`)
      this.finish();
    })
  }
  finish(){
    setTimeout(() => {
      this.router.navigate(['/instructor/listado-instructores']);
    }, 1500);
  }
}
