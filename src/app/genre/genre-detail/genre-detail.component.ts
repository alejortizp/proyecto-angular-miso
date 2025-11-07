import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Genre } from '../genre';
import { Movie } from '../../movie/movie';
import { GenreService } from '../genre.service';

@Component({
  selector: 'app-genre-detail',
  templateUrl: './genre-detail.component.html',
  styleUrls: ['./genre-detail.component.css']
})
export class GenreDetailComponent implements OnInit {
  genre!: Genre;
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchText: string = '';
  genreId!: number;

  constructor(
    private route: ActivatedRoute,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    // ✅ CORRECCIÓN: Mejor manejo del parámetro de ruta
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('ID from route:', id);
      
      if (id) {
        this.genreId = parseInt(id, 10);
        console.log('Parsed genreId:', this.genreId);
        
        if (!isNaN(this.genreId)) {
          this.getGenreDetail();
        } else {
          console.error('Invalid genre ID:', id);
        }
      }
    });
  }

  getGenreDetail(): void {
    console.log('Fetching genre with ID:', this.genreId);
    
    this.genreService.getGenreById(this.genreId).subscribe({
      next: (data: Genre) => {
        console.log('Genre loaded:', data);
        this.genre = data;
      },
      error: (error) => {
        console.error('Error loading genre:', error);
      }
    });

    this.genreService.getMoviesByGenre(this.genreId).subscribe({
      next: (data: Movie[]) => {
        console.log('Movies received:', data);
        console.log('Number of movies:', data.length);
        this.movies = data.sort((a, b) => a.title.localeCompare(b.title));
        this.filteredMovies = [...this.movies];
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.movies = [];
        this.filteredMovies = [];
      }
    });
  }

  filterMovies(): void {
    const text = this.searchText.toLowerCase().trim();
    this.filteredMovies = this.movies.filter(m =>
      m.title.toLowerCase().includes(text)
    );
  }
}
