import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Director } from '../director';
import { Movie } from '../../movie/movie';
import { DirectorService } from '../director.service';

@Component({
  selector: 'app-director-detail',
  templateUrl: './director-detail.component.html',
  styleUrls: ['./director-detail.component.css']
})
export class DirectorDetailComponent implements OnInit {
  director!: Director;
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  searchText: string = '';
  directorId!: string;

  constructor(
    private route: ActivatedRoute,
    private directorService: DirectorService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('ID from route:', id);
      
      if (id) {
        this.directorId = id;
        this.getDirectorDetail();
      } else {
        console.error('No director ID found in route');
      }
    });
  }

  getDirectorDetail(): void {
    console.log('Fetching director with ID:', this.directorId);

    this.directorService.getDirectorById(this.directorId).subscribe({
      next: (data: any) => {
        console.log('Director loaded:', data);
        this.director = data;

        this.movies = data.movies ? data.movies.sort((a: Movie, b: Movie) => a.title.localeCompare(b.title)) : [];
        this.filteredMovies = [...this.movies];
      },
      error: (error) => {
        console.error('Error loading director:', error);
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
