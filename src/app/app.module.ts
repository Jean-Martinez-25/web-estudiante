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
import { GaugeChartComponent } from './components/estudiantes/ver-estudiantes/gauge-chart/gauge-chart.component';
/*Extensiones agenas*/
import { NgChartsModule } from 'ng2-charts';
import { DatosPersonalesComponent } from './components/estudiantes/ver-estudiantes/datos-personales/datos-personales.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    TeamComponent,
    ListEstudiantesComponent,
    VerEstudiantesComponent,
    AgregarEditarEstudiantesComponent,
    GaugeChartComponent,
    DatosPersonalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgChartsModule,
    HttpClientModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
