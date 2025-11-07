import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Genre } from './genre';
import { Movie } from '../movie/movie';
import { GenreService } from './genre.service';

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
    this.genreId = Number(this.route.snapshot.paramMap.get('id'));
    this.getGenreDetail();
  }

  getGenreDetail(): void {
    this.genreService.getGenreById(this.genreId).subscribe((data: Genre) => {
      this.genre = data;
    });

    this.genreService.getMoviesByGenre(this.genreId).subscribe((data: Movie[]) => {
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