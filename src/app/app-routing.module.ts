import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectorComponent } from './director/director.component';
import { MovieComponent } from './movie/movie.component';
import { ActorComponent } from './actor/actor.component';
import { GenreComponent } from './genre/genre.component';

const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: MovieComponent },
  { path: 'directors', component: DirectorComponent },
  { path: 'actors', component: ActorComponent },
  { path: 'genres', component: GenreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
