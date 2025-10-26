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
      new Genre(1, 'Acción', 'Películas con escenas de acción intensa', 45),
      new Genre(2, 'Comedia', 'Películas divertidas y humorísticas', 38),
      new Genre(3, 'Drama', 'Películas con historias emotivas', 52),
      new Genre(4, 'Ciencia Ficción', 'Películas futuristas y tecnológicas', 28),
      new Genre(5, 'Terror', 'Películas de miedo y suspenso', 22),
      new Genre(6, 'Romance', 'Películas de amor y relaciones', 31),
      new Genre(7, 'Animación', 'Películas animadas para toda la familia', 19),
      new Genre(8, 'Thriller', 'Películas de suspenso psicológico', 26),
    ];
  }
}
