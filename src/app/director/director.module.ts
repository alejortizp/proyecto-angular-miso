import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorComponent } from './director.component';
import { DirectorDetailComponent } from './director-detail/director-detail.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule
  ],
  declarations: [
    DirectorComponent,
    DirectorDetailComponent
  ],
  exports: [
    DirectorComponent,
    DirectorDetailComponent
  ]
})
export class DirectorModule { }
