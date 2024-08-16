import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-horarios-asignaturas',
  templateUrl: './horarios-asignaturas.component.html',
  styleUrls: ['./horarios-asignaturas.component.css']
})
export class HorariosAsignaturasComponent {
  asignaturas: any;
  buscarHorarios : FormGroup;

  constructor(private fb: FormBuilder){
    this.buscarHorarios = this.fb.group({
      asignatura: ['', Validators.required]
    })
  }
}
