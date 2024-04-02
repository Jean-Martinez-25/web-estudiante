import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {IEstudiante, INota } from 'src/app/interfaces/estudiante';
import {MatGridListModule} from '@angular/material/grid-list';
import { ChartOptions, ChartType } from 'chart.js';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-ver-estudiantes',
  templateUrl: './ver-estudiantes.component.html',
  styleUrls: ['./ver-estudiantes.component.css']
})
export class VerEstudiantesComponent implements OnInit{

  id: number;
  name?: string;
  datosEstudiante!: IEstudiante;
  courses!: INota[];
  constructor(private _estudianteService: EstudiantesService ,private aRoute: ActivatedRoute){
    this.id = Number(this.aRoute.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
    this.obtenerEstudiante();
  }
  obtenerEstudiante(){
    this._estudianteService.getEstudiante(this.id).subscribe(data => {
      this.datosEstudiante = data;
      this.obtenerCursos();
      this.name = `${data.nombre} ${data.apellido}`;
    });
  }
  obtenerCursos(){
    this._estudianteService.getNota(this.datosEstudiante.idEstudiante).subscribe(data => {
      this.courses = data;
    })
  }
}
