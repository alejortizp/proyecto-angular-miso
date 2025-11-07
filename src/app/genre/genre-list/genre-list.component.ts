import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from '../genre.model';
import { GenreService } from '../genre.service';

/**
 * Componente que muestra la lista de géneros disponibles
 * Implementa el patrón Maestro-Detalle
 */
@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {
  genres: Genre[] = [];
  selectedGenreId?: number;
  loading: boolean = false;
  error: string = '';

  constructor(
    private genreService: GenreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadGenres();
  }

  /**
   * Carga la lista de géneros desde el servicio
   */
  private loadGenres(): void {
    this.loading = true;
    this.error = '';
    
    this.genreService.getGenres().subscribe({
      next: (data: Genre[]) => {
        this.genres = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los géneros. Por favor, intente nuevamente.';
        this.loading = false;
        console.error('Error loading genres:', err);
      }
    });
  }

  /**
   * Selecciona un género para mostrar su detalle
   * @param genreId ID del género seleccionado
   */
  selectGenre(genreId: number): void {
    this.selectedGenreId = genreId;
  }

  /**
   * Navega al detalle completo del género en una vista separada
   * @param genreId ID del género
   */
  viewGenreDetail(genreId: number): void {
    this.router.navigate(['/genres', genreId]);
  }

  /**
   * Verifica si un género está seleccionado
   * @param genreId ID del género
   * @returns true si el género está seleccionado
   */
  isSelected(genreId: number): boolean {
    return this.selectedGenreId === genreId;
  }
}
