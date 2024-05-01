import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerInstructorComponent } from './ver-instructor/ver-instructor.component';
import { AgregarEditarInstructorComponent } from './agregar-editar-instructor/agregar-editar-instructor.component';
import { ListInstructoresComponent } from './list-instructores/list-instructores.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'listado-instructores', component: ListInstructoresComponent},
      {path: 'ver-instructor/:id', component: VerInstructorComponent},
      {path: 'agregar-instructor', component: AgregarEditarInstructorComponent},
      {path: 'editar-instructor/:id', component: AgregarEditarInstructorComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructoresRoutingModule { }
