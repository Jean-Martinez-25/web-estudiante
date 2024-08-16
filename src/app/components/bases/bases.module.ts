import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasesRoutingModule } from './bases-routing.module';

import { InicioComponent } from './inicio/inicio.component';
import { TeamComponent } from './team/team.component';



@NgModule({
  declarations: [
    InicioComponent,
    TeamComponent,
    ],
    imports: [
      CommonModule,
      BasesRoutingModule
  ]
})
export class BasesModule { }
