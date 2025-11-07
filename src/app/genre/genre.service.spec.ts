import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GenreService } from './genre.service';
import { Genre } from './genre.model';

describe('GenreService', () => {
  let service: GenreService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/api/genres';

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all genres', () => {
    const mockGenres: Genre[] = [
      { id: 1, name: 'Acción', description: 'Películas de acción' },
      { id: 2, name: 'Comedia', description: 'Películas de comedia' }
    ];

    service.getGenres().subscribe(genres => {
      expect(genres.length).toBe(2);
      expect(genres).toEqual(mockGenres);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockGenres);
  });

  it('should get genre by id', () => {
    const mockGenre: Genre = { id: 1, name: 'Acción', description: 'Películas de acción' };

    service.getGenreById(1).subscribe(genre => {
      expect(genre).toEqual(mockGenre);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockGenre);
  });

  it('should get movies by genre id', () => {
    const mockMovies = [
      { id: 1, title: 'Movie 1', genreId: 1 },
      { id: 2, title: 'Movie 2', genreId: 1 }
    ];

    service.getMoviesByGenreId(1).subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne(`${apiUrl}/1/movies`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });
});
