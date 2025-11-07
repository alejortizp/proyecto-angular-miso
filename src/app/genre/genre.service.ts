import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from './genre.model';

/**
 * Servicio para gestionar las operaciones relacionadas con géneros
 */
@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private apiUrl = 'http://localhost:3000/api/genres'; // URL del API

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los géneros
   * @returns Observable con la lista de géneros
   */
  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.apiUrl);
  }

  /**
   * Obtiene un género específico por su ID
   * @param id Identificador del género
   * @returns Observable con el género solicitado
   */
  getGenreById(id: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene las películas asociadas a un género específico
   * @param genreId Identificador del género
   * @returns Observable con la lista de películas
   */
  getMoviesByGenreId(genreId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${genreId}/movies`);
  }
}
