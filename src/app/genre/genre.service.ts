import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Genre } from './genre';
import { Movie } from '../movie/movie';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private apiUrl = environment.baseUrl + 'genres';

  constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiUrl);
  }

  getGenreById(id: string | number): Observable<Genre> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((item: any) => new Genre(item.id, item.type))
    );
  }

  getMoviesByGenre(genreId: string | number): Observable<Movie[]> {
    return this.http.get<any>(`${this.apiUrl}/${genreId}`).pipe(
      map((genreData: any) => {
        // Extraer el array de películas del objeto género
        if (genreData.movies && Array.isArray(genreData.movies)) {
          return genreData.movies.map((item: any) => {
            const movie: Movie = new Movie();
            movie.id = item.id;
            movie.title = item.title;
            movie.poster = item.poster;
            movie.duration = item.duration;
            movie.country = item.country;
            movie.releaseDate = new Date(item.releaseDate);
            movie.popularity = item.popularity;
            return movie;
          });
        }
        return [];
      })
    );
  }
}