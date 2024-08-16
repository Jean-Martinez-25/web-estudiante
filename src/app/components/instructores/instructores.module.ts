import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructoresRoutingModule } from './instructores-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgregarEditarInstructorComponent } from './agregar-editar-instructor/agregar-editar-instructor.component';
import { ListInstructoresComponent } from './list-instructores/list-instructores.component';
import { VerInstructorComponent } from './ver-instructor/ver-instructor.component';


@NgModule({
  declarations: [
    AgregarEditarInstructorComponent,
    ListInstructoresComponent,
    VerInstructorComponent
  ],
  imports: [
    CommonModule,
    InstructoresRoutingModule,
    SharedModule
  ]
})
export class InstModule { }
