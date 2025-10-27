import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Movie } from './movie';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = environment.baseUrl + 'movies';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(items => items.map(item => {
        const movie: Movie = new Movie();
        movie.id = item.id;
        movie.title = item.title;
        movie.poster = item.poster;
        movie.duration = item.duration;
        movie.country = item.country;
        movie.releaseDate = new Date(item.releaseDate);
        movie.popularity = item.popularity;
        return movie;
      }))
    );
  }
}


