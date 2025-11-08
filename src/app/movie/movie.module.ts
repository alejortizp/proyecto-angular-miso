import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieComponent } from './movie.component';
import { MovieDetailComponent } from './movie-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [MovieComponent, MovieDetailComponent],
  exports: [MovieComponent]
})
export class MovieModule { }


