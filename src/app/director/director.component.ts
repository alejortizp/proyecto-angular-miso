import { Component, OnInit } from '@angular/core';
import { Director } from './director'; 
import { DirectorService } from './director.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {

  directors: Array<Director> = [];
  filteredDirectors: Array<Director> = [];
  searchText: string = '';

  constructor(private directorService: DirectorService) { }

  getDirectors() {
    this.directorService.getDirectors().subscribe(data => {
      // Ordenar alfabéticamente A → Z
      this.directors = data.sort((a, b) => a.name.localeCompare(b.name));
      this.filteredDirectors = [...this.directors]; // copia inicial
    });
  }

  filterDirectors() {
    const text = this.searchText.trim().toLowerCase();
    if (text === '') {
      this.filteredDirectors = [...this.directors]; // sin filtro
    } else {
      this.filteredDirectors = this.directors.filter(director =>
        director.name.toLowerCase().includes(text)
      );
    }
  }

  ngOnInit() {
    this.getDirectors();
  }
}
