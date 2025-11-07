import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Genre } from '../genre.model';
import { GenreService } from '../genre.service';

/**
 * Componente que muestra el detalle de un género específico
 * y las películas asociadas a ese género
 */
@Component({
  selector: 'app-genre-detail',
  templateUrl: './genre-detail.component.html',
  styleUrls: ['./genre-detail.component.scss']
})
export class GenreDetailComponent implements OnChanges {
  @Input() genreId!: number;
  
  genre?: Genre;
  movies: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private genreService: GenreService) { }

  /**
   * Detecta cambios en el Input genreId y carga los datos
   * @param changes Cambios detectados en los Inputs
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['genreId'] && this.genreId) {
      this.loadGenreDetail();
      this.loadMovies();
    }
  }

  /**
   * Carga los detalles del género seleccionado
   */
  private loadGenreDetail(): void {
    this.loading = true;
    this.error = '';
    
    this.genreService.getGenreById(this.genreId).subscribe({
      next: (data: Genre) => {
        this.genre = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el detalle del género.';
        this.loading = false;
        console.error('Error loading genre detail:', err);
      }
    });
  }

  /**
   * Carga las películas asociadas al género
   */
  private loadMovies(): void {
    this.genreService.getMoviesByGenreId(this.genreId).subscribe({
      next: (data: any[]) => {
        this.movies = data;
      },
      error: (err) => {
        console.error('Error loading movies for genre:', err);
        this.movies = [];
      }
    });
  }

  /**
   * Recarga los datos del género
   */
  reload(): void {
    this.loadGenreDetail();
    this.loadMovies();
  }
}
