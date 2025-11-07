import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreListComponent } from './genre-list/genre-list.component';

/**
 * Rutas del módulo Genre
 */
const routes: Routes = [
  {
    path: 'genres',
    component: GenreListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenreRoutingModule { }
