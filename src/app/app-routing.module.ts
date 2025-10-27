import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectorComponent } from './director/director.component';

const routes: Routes = [
  { path: '', redirectTo: '/directors', pathMatch: 'full' },
  { path: 'directors', component: DirectorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
