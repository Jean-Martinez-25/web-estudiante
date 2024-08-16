import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorariosRoutingModule } from './horarios-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearHorariosComponent } from './crear-horarios/crear-horarios.component';
import { FormularioHorariosComponent } from './formulario-horarios/formulario-horarios.component';
import { ListHorariosComponent } from './list-horarios/list-horarios.component';
import { PreviewHorariosComponent } from './preview-horarios/preview-horarios.component';
import { HorariosAsignaturasComponent } from './horarios-asignaturas/horarios-asignaturas.component';



@NgModule({
  declarations: [
    CrearHorariosComponent,
    FormularioHorariosComponent,
    ListHorariosComponent,
    PreviewHorariosComponent,
    HorariosAsignaturasComponent
  ],
  imports: [
    CommonModule,
    HorariosRoutingModule,
    SharedModule
  ]
})
export class HorariosModule { }
