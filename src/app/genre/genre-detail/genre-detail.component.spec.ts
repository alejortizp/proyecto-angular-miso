import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimpleChange } from '@angular/core';
import { of, throwError } from 'rxjs';

import { GenreDetailComponent } from './genre-detail.component';
import { GenreService } from '../genre.service';
import { Genre } from '../genre.model';

describe('GenreDetailComponent', () => {
  let component: GenreDetailComponent;
  let fixture: ComponentFixture<GenreDetailComponent>;
  let genreService: jasmine.SpyObj<GenreService>;

  const mockGenre: Genre = {
    id: 1,
    name: 'Acción',
    description: 'Películas de acción'
  };

  const mockMovies = [
    { id: 1, title: 'Movie 1', genreId: 1 },
    { id: 2, title: 'Movie 2', genreId: 1 }
  ];

  beforeEach(async () => {
    const genreServiceSpy = jasmine.createSpyObj('GenreService', [
      'getGenreById',
      'getMoviesByGenreId'
    ]);

    await TestBed.configureTestingModule({
      declarations: [GenreDetailComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: GenreService, useValue: genreServiceSpy }
      ]
    }).compileComponents();

    genreService = TestBed.inject(GenreService) as jasmine.SpyObj<GenreService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load genre detail when genreId changes', () => {
    genreService.getGenreById.and.returnValue(of(mockGenre));
    genreService.getMoviesByGenreId.and.returnValue(of(mockMovies));

    component.genreId = 1;
    component.ngOnChanges({
      genreId: new SimpleChange(null, 1, true)
    });

    expect(genreService.getGenreById).toHaveBeenCalledWith(1);
    expect(genreService.getMoviesByGenreId).toHaveBeenCalledWith(1);
    expect(component.genre).toEqual(mockGenre);
    expect(component.movies).toEqual(mockMovies);
  });

  it('should handle error when loading genre detail', () => {
    genreService.getGenreById.and.returnValue(
      throwError(() => new Error('Error loading genre'))
    );
    genreService.getMoviesByGenreId.and.returnValue(of(mockMovies));

    component.genreId = 1;
    component.ngOnChanges({
      genreId: new SimpleChange(null, 1, true)
    });

    expect(component.error).toBeTruthy();
    expect(component.loading).toBeFalse();
  });

  it('should reload data', () => {
    genreService.getGenreById.and.returnValue(of(mockGenre));
    genreService.getMoviesByGenreId.and.returnValue(of(mockMovies));

    component.genreId = 1;
    component.reload();

    expect(genreService.getGenreById).toHaveBeenCalled();
    expect(genreService.getMoviesByGenreId).toHaveBeenCalled();
  });
});
