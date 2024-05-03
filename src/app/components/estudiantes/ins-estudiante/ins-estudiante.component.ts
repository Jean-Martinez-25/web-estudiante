import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { IEstudiante } from 'src/app/interfaces/estudiante';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { AlertService } from 'src/app/services/alert.service';
import { ProgramasService } from 'src/app/services/programas.service';
import { IPrograma } from 'src/app/interfaces/programa';
import { InInscritos } from 'src/app/interfaces/inscritos';
import { InscritosService } from 'src/app/services/inscritos.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-ins-estudiante',
  templateUrl: './ins-estudiante.component.html',
  styleUrls: ['./ins-estudiante.component.css']
})
export class InsEstudianteComponent implements OnInit{
  id: number;
  nombreEstudiante!: string;
  programas!: IPrograma[];
  datosEstudiante!: IEstudiante;
  formInscripcion: FormGroup;

  constructor (private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private _estudianteService: EstudiantesService,
    private _inscritoService: InscritosService,
    private _alertMensaje: AlertService,
    private router: Router,
    private _programaService: ProgramasService){
    this.formInscripcion = this.fb.group({
      idEstudiante: ['', Validators.required],
      idPrograma: ['', Validators.required],
      semestre: ['', Validators.required],
      vigencia: ['', Validators.required]
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
    this.obtenerProgramas();
    this.obtenerEstudiante(this.id)
  }

  obtenerProgramas(){
    this._programaService.getProgramas().subscribe(data => {
      this.programas = data;
    })
  }
  obtenerEstudiante(id: number){
    this._estudianteService.getEstudiante(id).subscribe(data => {
      this.datosEstudiante = data;
      this.nombreEstudiante = `${data.apellido} ${data.nombre}`;
      this.formInscripcion.patchValue({
        idEstudiante: data.idEstudiante,
        idPrograma: data.programa,
        vigencia: data.vigencia
      })
    })
  }
  InscribirEstudiante(){
    const datosInscrito : InInscritos = {
      idEstudiante : this.id,
      idPrograma : this.formInscripcion.value.idPrograma,
      semestre: this.formInscripcion.value.semestre,
      vigencia: this.formInscripcion.value.vigencia
    }
    this._inscritoService.postInscritos(datosInscrito).subscribe(data => {
      this._alertMensaje.mostrarMensajes(`El estudiante: ${this.nombreEstudiante} ha sido matriculado correctamente.`, "Close")
    })
    setTimeout(() => {
      this._inscritoService.getInscritos().subscribe(data => {
        this.router.navigate(['/persona/listado-aspirantes']);
      })
    }, 3000);
  }
}
