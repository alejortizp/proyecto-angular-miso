/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GenreDetailComponent } from './genre-detail.component';
import { GenreService } from '../genre.service';
import { Genre } from '../genre';
import { Movie } from '../../movie/movie';

describe('GenreDetailComponent', () => {
  let component: GenreDetailComponent;
  let fixture: ComponentFixture<GenreDetailComponent>;
  let mockGenreService: jasmine.SpyObj<GenreService>;
  let testGenreId: string;

  const mockGenre: Genre = new Genre(1, 'Action');

  const mockMovies: Movie[] = (() => {
    const a = new Movie();
    a.id = '1';
    a.title = 'Avatar';
    a.poster = 'avatar.jpg';
    a.duration = 120;
    a.country = 'USA';
    a.releaseDate = new Date('2009-12-18');
    a.popularity = 5;

    const b = new Movie();
    b.id = '2';
    b.title = 'Interstellar';
    b.poster = 'interstellar.jpg';
    b.duration = 169;
    b.country = 'USA';
    b.releaseDate = new Date('2014-11-07');
    b.popularity = 4;

    return [a, b];
  })();

  beforeEach(() => {
    mockGenreService = jasmine.createSpyObj('GenreService', [
      'getGenreById',
      'getMoviesByGenre'
    ]);

    TestBed.configureTestingModule({
      declarations: [GenreDetailComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        { provide: GenreService, useValue: mockGenreService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1'
              }
            }
          }
        }
      ]
    });

    fixture = TestBed.createComponent(GenreDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize genre and movies on ngOnInit', () => {
    mockGenreService.getGenreById.and.returnValue(of(mockGenre));
    mockGenreService.getMoviesByGenre.and.returnValue(of(mockMovies));

    component.ngOnInit();

    expect(component.genre).toEqual(mockGenre);
    expect(component.movies.length).toBe(2);
    expect(component.filteredMovies.length).toBe(2);
  });

  it('should get genreId from route params', () => {
    mockGenreService.getGenreById.and.returnValue(of(mockGenre));
    mockGenreService.getMoviesByGenre.and.returnValue(of(mockMovies));

    component.ngOnInit();

    expect(component.genreId).toBe(testGenreId); // String, no número
    expect(mockGenreService.getGenreById).toHaveBeenCalledWith(testGenreId);
  });

  it('should sort movies alphabetically by title', () => {
    const unsortedMovies: Movie[] = [...mockMovies].reverse();
    mockGenreService.getGenreById.and.returnValue(of(mockGenre));
    mockGenreService.getMoviesByGenre.and.returnValue(of(unsortedMovies));

    component.ngOnInit();

    expect(component.movies[0].title).toBe('Avatar');
    expect(component.movies[1].title).toBe('Interstellar');
  });

  it('should filter movies by search text', () => {
    mockGenreService.getGenreById.and.returnValue(of(mockGenre));
    mockGenreService.getMoviesByGenre.and.returnValue(of(mockMovies));
    component.ngOnInit();

    component.searchText = 'avatar';
    component.filterMovies();

    expect(component.filteredMovies.length).toBe(1);
    expect(component.filteredMovies[0].title).toBe('Avatar');
  });

  it('should filter movies case insensitively', () => {
    mockGenreService.getGenreById.and.returnValue(of(mockGenre));
    mockGenreService.getMoviesByGenre.and.returnValue(of(mockMovies));
    component.ngOnInit();

    component.searchText = 'INTERSTELLAR';
    component.filterMovies();

    expect(component.filteredMovies.length).toBe(1);
    expect(component.filteredMovies[0].title).toBe('Interstellar');
  });

  it('should return all movies when search text is empty', () => {
    mockGenreService.getGenreById.and.returnValue(of(mockGenre));
    mockGenreService.getMoviesByGenre.and.returnValue(of(mockMovies));
    component.ngOnInit();

    component.searchText = '';
    component.filterMovies();

    expect(component.filteredMovies.length).toBe(2);
  });

  it('should return empty array when no movies match search', () => {
    mockGenreService.getGenreById.and.returnValue(of(mockGenre));
    mockGenreService.getMoviesByGenre.and.returnValue(of(mockMovies));
    component.ngOnInit();

    component.searchText = 'xyz';
    component.filterMovies();

    expect(component.filteredMovies.length).toBe(0);
  });

  it('should trim whitespace from search text', () => {
    mockGenreService.getGenreById.and.returnValue(of(mockGenre));
    mockGenreService.getMoviesByGenre.and.returnValue(of(mockMovies));
    component.ngOnInit();

    component.searchText = '  avatar  ';
    component.filterMovies();

    expect(component.filteredMovies.length).toBe(1);
    expect(component.filteredMovies[0].title).toBe('Avatar');
  });

  it('should handle empty movies list', () => {
    mockGenreService.getGenreById.and.returnValue(of(mockGenre));
    mockGenreService.getMoviesByGenre.and.returnValue(of([]));

    component.ngOnInit();

    expect(component.movies.length).toBe(0);
    expect(component.filteredMovies.length).toBe(0);
  });

  it('should maintain original movies array after filtering', () => {
    mockGenreService.getGenreById.and.returnValue(of(mockGenre));
    mockGenreService.getMoviesByGenre.and.returnValue(of(mockMovies));
    component.ngOnInit();

    const originalLength = component.movies.length;

    component.searchText = 'avatar';
    component.filterMovies();

    expect(component.movies.length).toBe(originalLength);
    expect(component.filteredMovies.length).toBe(1);
  });

  it('should call getGenreById with correct id', () => {
    mockGenreService.getGenreById.and.returnValue(of(mockGenre));
    mockGenreService.getMoviesByGenre.and.returnValue(of(mockMovies));

    component.ngOnInit();

    expect(mockGenreService.getGenreById).toHaveBeenCalledWith(1);
  });

  it('should call getMoviesByGenre with correct id', () => {
    mockGenreService.getGenreById.and.returnValue(of(mockGenre));
    mockGenreService.getMoviesByGenre.and.returnValue(of(mockMovies));

    component.ngOnInit();

    expect(mockGenreService.getMoviesByGenre).toHaveBeenCalledWith(1);
  });
});
