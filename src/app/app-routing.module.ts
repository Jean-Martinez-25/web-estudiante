import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { TeamComponent } from './components/team/team.component';
import { ListEstudiantesComponent } from './components/estudiantes/list-estudiantes/list-estudiantes.component';
import { AgregarEditarEstudiantesComponent } from './components/estudiantes/agregar-editar-estudiantes/agregar-editar-estudiantes.component';
import { VerEstudiantesComponent } from './components/estudiantes/ver-estudiantes/ver-estudiantes.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'team', component: TeamComponent},
  {path: 'listEstudiante', component: ListEstudiantesComponent},
  {path: 'agregar-estudiante', component: AgregarEditarEstudiantesComponent},
  {path: 'editar-estudiante/:id', component: AgregarEditarEstudiantesComponent},
  {path: 'ver-estudiante/:id', component: VerEstudiantesComponent},
  {path: '**', redirectTo: 'inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
