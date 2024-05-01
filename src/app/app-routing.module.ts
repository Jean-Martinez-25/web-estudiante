import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { TeamComponent } from './components/team/team.component';
import { ListEstudiantesComponent } from './components/estudiantes/list-estudiantes/list-estudiantes.component';
import { AgregarEditarEstudiantesComponent } from './components/estudiantes/agregar-editar-estudiantes/agregar-editar-estudiantes.component';
import { VerEstudiantesComponent } from './components/estudiantes/ver-estudiantes/ver-estudiantes.component';
import { ListInstructoresComponent } from './components/instructores/list-instructores/list-instructores.component';
import { VerInstructorComponent } from './components/instructores/ver-instructor/ver-instructor.component';
import { AgregarEditarInstructorComponent } from './components/instructores/agregar-editar-instructor/agregar-editar-instructor.component';
import { InsEstudianteComponent } from './components/estudiantes/ins-estudiante/ins-estudiante.component';
import { ListInscritosComponent } from './components/estudiantes/list-inscritos/list-inscritos.component';
import { CrearHorariosComponent } from './components/horarios/crear-horarios/crear-horarios.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'team', component: TeamComponent},
  {
    path: 'persona',
    loadChildren: () => import('./components/estudiantes/estudiantes.module').then(m => m.PersonaModule)
  },
  {
    path: 'instructor',
    loadChildren: () => import('./components/instructores/instructores.module').then(m => m.PersonaModule)
  },

  {path: 'crear-horarios', component: CrearHorariosComponent},
  {path: '**', redirectTo: 'inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
