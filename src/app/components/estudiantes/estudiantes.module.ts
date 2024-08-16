import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteRoutingModule } from './estudiantes-routing.module';
import { ListEstudiantesComponent } from './list-estudiantes/list-estudiantes.component';
//Angular material
import { AgregarEditarEstudiantesComponent } from './agregar-editar-estudiantes/agregar-editar-estudiantes.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { VerEstudiantesComponent } from './ver-estudiantes/ver-estudiantes.component';
import { AsignacionAsignaturasComponent } from './asignacion-asignaturas/asignacion-asignaturas.component';
import { AsignacionHorarioComponent } from './asignacion-horario/asignacion-horario.component';
import { InsEstudianteComponent } from './ins-estudiante/ins-estudiante.component';
import { ListInscritosComponent } from './list-inscritos/list-inscritos.component';

@NgModule({
  declarations: [
      ListEstudiantesComponent,
      AgregarEditarEstudiantesComponent,
      VerEstudiantesComponent,
      AsignacionAsignaturasComponent,
      AsignacionHorarioComponent,
      InsEstudianteComponent,
      ListInscritosComponent
    ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    SharedModule,
  ]
})
export class EstudianteModule { }
