import { Component, OnInit } from '@angular/core';
import { Genre } from './genre';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  genres: Genre[] = [];

  constructor() { }

  ngOnInit() {
    // Datos de ejemplo - Estos vendrían de un servicio/API
    this.genres = [
      new Genre(1, 'Acción', 'Películas con escenas de acción intensa'),
      new Genre(2, 'Comedia', 'Películas divertidas y humorísticas'),
      new Genre(3, 'Drama', 'Películas con historias emotivas'),
      new Genre(4, 'Ciencia Ficción', 'Películas futuristas y tecnológicas'),
      new Genre(5, 'Terror', 'Películas de miedo y suspenso'),
      new Genre(6, 'Romance', 'Películas de amor y relaciones'),
      new Genre(7, 'Animación', 'Películas animadas para toda la familia'),
      new Genre(8, 'Thriller', 'Películas de suspenso psicológico'),
    ];
  }
}


import { Component, OnInit } from '@angular/core';
import { Genre } from './genre';
import { GenreService } from './genre.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {
  genres: Genre[] = [];
  filteredGenres: Genre[] = [];
  searchText: string = '';

  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(): void {
    this.genreService.getGenres().subscribe(data => {
      this.genres = data.sort((a, b) => a.name.localeCompare(b.name));
      this.filteredGenres = [...this.genres];
    });
  }

  filterGenres(): void {
    const text = this.searchText.toLowerCase().trim();
    this.filteredGenres = this.genres.filter(d =>
      d.name.toLowerCase().includes(text)
    );
  }
}