import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {
    path: 'bases',
    component: MenuComponent,
    loadChildren: () => import('./components/bases/bases.module').then(m => m.BasesModule)
  },
  {
    path: 'persona',
    component: MenuComponent,
    loadChildren: () => import('./components/estudiantes/estudiantes.module').then(m => m.EstudianteModule)
  },
  {
    path: 'instructor',
    component: MenuComponent,
    loadChildren: () => import('./components/instructores/instructores.module').then(m => m.InstModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'horarios',
    component: MenuComponent,
    loadChildren: () => import('./components/horarios/horarios.module').then(m => m.HorariosModule)
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
