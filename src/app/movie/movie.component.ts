import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
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
  showSearch: boolean = false;
  showModal: boolean = false;
  selectedMovie: Movie | null = null;

  @ViewChild('searchWrapper', { static: false }) searchWrapper?: ElementRef;

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

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.showSearch) return;
    const wrapperEl = this.searchWrapper?.nativeElement as HTMLElement | undefined;
    if (wrapperEl && !wrapperEl.contains(event.target as Node)) {
      this.showSearch = false;
    }
  }

  openModal(movie: Movie): void {
    this.selectedMovie = movie;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedMovie = null;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.showModal) {
      this.closeModal();
    }
  }

  getActorNames(movie: Movie | null): string {
    if (!movie || !movie.actors || movie.actors.length === 0) return '';
    return movie.actors.map(a => a.name).join(', ');
  }
}


