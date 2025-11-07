import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GenreComponent } from './genre.component';
import { GenreDetailComponent } from './genre-detail/genre-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    GenreComponent,
    GenreDetailComponent
  ],
  exports: [
    GenreComponent,
    GenreDetailComponent
  ]
})
export class GenreModule { }