import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieComponent } from './movie.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [MovieComponent],
  exports: [MovieComponent]
})
export class MovieModule { }


