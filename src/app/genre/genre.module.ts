import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { GenreListComponent } from './genre-list/genre-list.component';
import { GenreDetailComponent } from './genre-detail/genre-detail.component';
import { GenreService } from './genre.service';

/**
 * Módulo que agrupa los componentes y servicios relacionados con géneros
 */
@NgModule({
  declarations: [
    GenreListComponent,
    GenreDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    GenreService
  ],
  exports: [
    GenreListComponent,
    GenreDetailComponent
  ]
})
export class GenreModule { }
