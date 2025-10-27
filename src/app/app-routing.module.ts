import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectorComponent } from './director/director.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MovieComponent },
  { path: 'directors', component: DirectorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
