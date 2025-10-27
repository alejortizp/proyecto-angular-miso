import { Component, OnInit } from '@angular/core';
import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchText: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data.sort((a, b) => a.title.localeCompare(b.title));
      this.filteredMovies = [...this.movies];
    });
  }

  filterMovies(): void {
    const text = this.searchText.toLowerCase().trim();
    this.filteredMovies = this.movies.filter(m =>
      m.title.toLowerCase().includes(text)
    );
  }
}


