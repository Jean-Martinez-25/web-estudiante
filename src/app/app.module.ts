import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { TeamComponent } from './components/team/team.component';
import { ListEstudiantesComponent } from './components/estudiantes/list-estudiantes/list-estudiantes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { VerEstudiantesComponent } from './components/estudiantes/ver-estudiantes/ver-estudiantes.component';
import { AgregarEditarEstudiantesComponent } from './components/estudiantes/agregar-editar-estudiantes/agregar-editar-estudiantes.component';
import { ListInstructoresComponent } from './components/instructores/list-instructores/list-instructores.component';
import { VerInstructorComponent } from './components/instructores/ver-instructor/ver-instructor.component';
import { AgregarEditarInstructorComponent } from './components/instructores/agregar-editar-instructor/agregar-editar-instructor.component';
import { InsEstudianteComponent } from './components/estudiantes/ins-estudiante/ins-estudiante.component';
import { ListInscritosComponent } from './components/estudiantes/list-inscritos/list-inscritos.component';
import { CrearHorariosComponent } from './components/horarios/crear-horarios/crear-horarios.component';
import { FormularioHorariosComponent } from './components/horarios/formulario-horarios/formulario-horarios.component';
import { PreviewHorariosComponent } from './components/horarios/preview-horarios/preview-horarios.component';
import { ListHorariosComponent } from './components/horarios/list-horarios/list-horarios.component';
import { GaugeChartComponent } from './components/estudiantes/ver-estudiantes/gauge-chart/gauge-chart.component';
/*Extensiones agenas*/
import { NgChartsModule } from 'ng2-charts';
import { DatosPersonalesComponent } from './components/estudiantes/ver-estudiantes/datos-personales/datos-personales.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AsignacionHorarioComponent } from './components/estudiantes/asignacion-horario/asignacion-horario.component';
import { AsignacionAsignaturasComponent } from './components/estudiantes/asignacion-asignaturas/asignacion-asignaturas.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    TeamComponent,
    ListEstudiantesComponent,
    VerEstudiantesComponent,
    AgregarEditarEstudiantesComponent,
    GaugeChartComponent,
    DatosPersonalesComponent,
    ListInstructoresComponent,
    VerInstructorComponent,
    AgregarEditarInstructorComponent,
    InsEstudianteComponent,
    ListInscritosComponent,
    CrearHorariosComponent,
    FormularioHorariosComponent,
    PreviewHorariosComponent,
    ListHorariosComponent,
    AsignacionHorarioComponent,
    AsignacionAsignaturasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgChartsModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,

  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
