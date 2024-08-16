import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEstudiantesComponent } from './list-estudiantes/list-estudiantes.component';
import { ListInscritosComponent } from './list-inscritos/list-inscritos.component';
import { AgregarEditarEstudiantesComponent } from './agregar-editar-estudiantes/agregar-editar-estudiantes.component';
import { InsEstudianteComponent } from './ins-estudiante/ins-estudiante.component';
import { VerEstudiantesComponent } from './ver-estudiantes/ver-estudiantes.component';
import { AsignacionHorarioComponent } from './asignacion-horario/asignacion-horario.component';
import { AsignacionAsignaturasComponent } from './asignacion-asignaturas/asignacion-asignaturas.component';

const rutas: Routes = [
  {
    path: '',
    children: [
      {path: 'listado-aspirantes', component: ListEstudiantesComponent},
      {path: 'listado-inscritos', component: ListInscritosComponent},
      {path: 'agregar-aspirante', component: AgregarEditarEstudiantesComponent},
      {path: 'inscribir-aspirante/:id', component: InsEstudianteComponent},
      {path: 'editar-aspirante/:id', component: AgregarEditarEstudiantesComponent},
      {path: 'ver-aspirante/:id', component: VerEstudiantesComponent},
      {path: 'asignacion-horario/:id', component: AsignacionHorarioComponent},
      {path: 'asignacion-asignaturas/:id', component: AsignacionAsignaturasComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule]
})
export class EstudianteRoutingModule { }
