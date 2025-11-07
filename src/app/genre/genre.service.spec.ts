/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GenreService } from './genre.service';
import { Genre } from './genre';
import { Movie } from '../movie/movie';
import { environment } from '../../environments/environment.development';

describe('Service: Genre', () => {
  let service: GenreService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.baseUrl + 'genres';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GenreService]
    });
    
    service = TestBed.inject(GenreService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([GenreService], (genreService: GenreService) => {
    expect(genreService).toBeTruthy();
  }));

  it('should retrieve all genres', () => {
    const mockGenres: Genre[] = [
      new Genre(1, 'Action'),
      new Genre(2, 'Comedy')
    ];

    service.getGenres().subscribe((genres: Genre[]) => {
      expect(genres.length).toBe(2);
      expect(genres).toEqual(mockGenres);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockGenres);
  });

  it('should retrieve a genre by id', () => {
    const mockGenre = { id: 1, type: 'Action' };

    service.getGenreById(1).subscribe((genre: Genre) => {
      expect(genre.id).toBe(1);
      expect(genre.type).toBe('Action');
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockGenre);
  });

  it('should retrieve movies by genre id', () => {
    const mockMovies = [
      {
        id: '1',
        title: 'Avatar',
        poster: 'avatar.jpg',
        duration: 120,
        country: 'USA',
        releaseDate: '2009-12-18',
        popularity: 5
      },
      {
        id: '2',
        title: 'Interstellar',
        poster: 'interstellar.jpg',
        duration: 169,
        country: 'USA',
        releaseDate: '2014-11-07',
        popularity: 4
      }
    ];

    service.getMoviesByGenre(1).subscribe((movies: Movie[]) => {
      expect(movies.length).toBe(2);
      expect(movies[0].title).toBe('Avatar');
      expect(movies[1].title).toBe('Interstellar');
    });

    const req = httpMock.expectOne(`${baseUrl}/1/movies`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });
});
