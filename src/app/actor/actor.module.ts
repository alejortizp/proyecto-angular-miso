import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActorComponent } from './actor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule
  ],
  declarations: [ActorComponent],
  exports: [ActorComponent]
})
export class ActorModule { }
