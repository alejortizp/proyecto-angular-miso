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
      this.genres = data.sort((a, b) => a.type.localeCompare(b.type));
      this.filteredGenres = [...this.genres];
    });
  }

  filterGenres(): void {
    const text = this.searchText.toLowerCase().trim();
    this.filteredGenres = this.genres.filter(d =>
      d.type.toLowerCase().includes(text)
    );
  }
}