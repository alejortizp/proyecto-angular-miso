import { Component, OnInit } from '@angular/core';
import { Director } from './director';
import { DirectorService } from './director.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {
  directors: Director[] = [];
  filteredDirectors: Director[] = [];
  searchText: string = '';

  constructor(private directorService: DirectorService) {}

  ngOnInit(): void {
    this.getDirectors();
  }

  getDirectors(): void {
    this.directorService.getDirectors().subscribe(data => {
      this.directors = data.sort((a, b) => a.name.localeCompare(b.name));
      this.filteredDirectors = [...this.directors];
    });
  }

  filterDirectors(): void {
    const text = this.searchText.toLowerCase().trim();
    this.filteredDirectors = this.directors.filter(d =>
      d.name.toLowerCase().includes(text)
    );
  }
}
