import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Movie, YoutubeTrailer } from './movie';
import { Director } from '../director/director';
import { Actor } from '../actor/actor';
import { Genre } from '../genre/genre';
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
        // Map nested fields if present
        if (item.genre) {
          movie.genre = new Genre(0, item.genre.type);
        }
        if (item.director) {
          movie.director = new Director(
            item.director.id,
            item.director.name,
            item.director.photo,
            item.director.nationality,
            item.director.birthDate ? new Date(item.director.birthDate) : undefined as any,
            item.director.biography
          );
        }
        const actorList = item.actors ?? item.cast;
        if (Array.isArray(actorList)) {
          movie.actors = actorList.map((a: any) => new Actor(
            a.id,
            a.name,
            a.photo,
            a.nationality,
            a.birthDate ? new Date(a.birthDate) : undefined as any,
            a.biography
          ));
        }
        if (item.youtubeTrailer) {
          movie.youtubeTrailer = {
            id: item.youtubeTrailer.id,
            name: item.youtubeTrailer.name,
            url: item.youtubeTrailer.url,
            duration: item.youtubeTrailer.duration,
            channel: item.youtubeTrailer.channel
          } as YoutubeTrailer;
        }
        return movie;
      }))
    );
  }
}


