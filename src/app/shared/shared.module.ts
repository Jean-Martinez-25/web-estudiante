import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Angular_materials
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog'; 
@NgModule({
  declarations: [

  ],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class SharedModule { }
