import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorComponent } from './director.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule
  ],
  declarations: [DirectorComponent],
  exports: [DirectorComponent]
})
export class DirectorModule { }
