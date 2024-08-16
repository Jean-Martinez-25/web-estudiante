import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrearHorariosComponent } from './crear-horarios/crear-horarios.component';
import { HorariosAsignaturasComponent } from './horarios-asignaturas/horarios-asignaturas.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'crear-horarios', component: CrearHorariosComponent},
      {path: 'horarios-asignaturas', component: HorariosAsignaturasComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class HorariosRoutingModule { }
