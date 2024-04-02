import { Component, Input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.css']
})
export class GaugeChartComponent {
  @Input() curso?: any;

  public gaugeChartData: ChartData<'doughnut'> = {
    labels: ['Nota'],
    datasets: [
      {
        data: [0, 100], // Inicialmente, el valor de la nota será 0
        backgroundColor: ['#5ea3a2', '#f4f9f9']
      }
    ]
  };

  public gaugeChartOptions: ChartOptions<'doughnut'> = {
    animation: true,
    circumference: 180,
    rotation: -90,
    cutout: '80%',
    plugins: {
      legend: {
        display: false
      }
    }
  };

  ngOnChanges() {
    if (this.curso) {
      let backgroundColor; // Color por defecto

      // Cambiar el color del fondo según el rango de notas
      if (this.curso.calificacion >= 0 && this.curso.calificacion <= 2.9) {
        backgroundColor = '#ff8080'; // Rojo oscuro
      } else if (this.curso.calificacion >= 3 && this.curso.calificacion <= 4.5) {
        backgroundColor = '#5ea3a2'; // Color actual
      } else if (this.curso.calificacion > 4.5 && this.curso.calificacion <= 5) {
        backgroundColor = '#7ed8b4'; // Verde oscuro
      }
      this.gaugeChartData.datasets[0].data = [this.curso.calificacion, 5 - this.curso.calificacion];
      this.gaugeChartData.datasets[0].backgroundColor = [backgroundColor, '#f4f9f9'];
    }
  }
}
