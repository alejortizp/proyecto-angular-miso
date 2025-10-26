import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreComponent } from './genre.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GenreComponent],
  exports: [GenreComponent]
})
export class GenreModule { }
