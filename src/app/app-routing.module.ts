import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { TeamComponent } from './components/team/team.component';
import { CrearHorariosComponent } from './components/horarios/crear-horarios/crear-horarios.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'team', component: TeamComponent},
  {
    path: 'persona',
    loadChildren: () => import('./components/estudiantes/estudiantes.module').then(m => m.PersonaModule)
  },
  {
    path: 'instructor',
    loadChildren: () => import('./components/instructores/instructores.module').then(m => m.PersonaModule)
  },

  {path: 'crear-horarios', component: CrearHorariosComponent},
  {path: '**', redirectTo: 'inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
