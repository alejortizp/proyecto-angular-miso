/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { MovieComponent } from './movie.component';
import { MovieService } from './movie.service';
import { Movie } from './movie';
import { MovieDetailComponent } from './movie-detail.component';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let mockMovieService: jasmine.SpyObj<MovieService>;

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
    b.title = 'godzilla';
    b.poster = 'godzilla.jpg';
    b.duration = 90;
    b.country = 'Japan';
    b.releaseDate = new Date('1954-11-03');
    b.popularity = 3;

    const c = new Movie();
    c.id = '3';
    c.title = 'Interstellar';
    c.poster = 'interstellar.jpg';
    c.duration = 169;
    c.country = 'USA';
    c.releaseDate = new Date('2014-11-07');
    c.popularity = 4;

    return [a, b, c];
  })();

  beforeEach(() => {
    mockMovieService = jasmine.createSpyObj('MovieService', ['getMovies']);

    TestBed.configureTestingModule({
      declarations: [MovieComponent, MovieDetailComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: MovieService, useValue: mockMovieService }
      ]
    });

    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize movies list', () => {
    mockMovieService.getMovies.and.returnValue(of(mockMovies));

    component.ngOnInit();

    expect(component.movies.length).toBe(3);
    expect(component.filteredMovies.length).toBe(3);
  });

  it('should sort movies alphabetically by title on init', () => {
    mockMovieService.getMovies.and.returnValue(of(mockMovies));
    component.ngOnInit();
    const titles = component.movies.map(m => m.title);
    const sorted = [...titles].sort((a, b) => a.localeCompare(b));
    expect(titles).toEqual(sorted);
  });

  it('should filter movies by search text', () => {
    mockMovieService.getMovies.and.returnValue(of(mockMovies));
    component.ngOnInit();

    component.searchText = 'god';
    component.filterMovies();

    expect(component.filteredMovies.length).toBe(1);
    expect(component.filteredMovies[0].title).toContain('god');
  });

  it('should filter movies case insensitively', () => {
    mockMovieService.getMovies.and.returnValue(of(mockMovies));
    component.ngOnInit();

    component.searchText = 'AVATAR';
    component.filterMovies();

    expect(component.filteredMovies.length).toBe(1);
    expect(component.filteredMovies[0].title).toBe('Avatar');
  });

  it('should return all movies when search text is empty', () => {
    mockMovieService.getMovies.and.returnValue(of(mockMovies));
    component.ngOnInit();

    component.searchText = '';
    component.filterMovies();

    expect(component.filteredMovies.length).toBe(3);
  });

  it('should return empty array when no movies match search', () => {
    mockMovieService.getMovies.and.returnValue(of(mockMovies));
    component.ngOnInit();

    component.searchText = 'xyz';
    component.filterMovies();

    expect(component.filteredMovies.length).toBe(0);
  });

  it('should toggle search visibility', () => {
    expect(component.showSearch).toBeFalse();
    component.toggleSearch();
    expect(component.showSearch).toBeTrue();
    component.toggleSearch();
    expect(component.showSearch).toBeFalse();
  });

  it('should open and close detail modal via child output', () => {
    mockMovieService.getMovies.and.returnValue(of(mockMovies));
    component.ngOnInit();
    const m = component.movies[0];
    component.openModal(m);
    expect(component.selectedMovie).toBe(m);
    expect(component.showModal).toBeTrue();

    fixture.detectChanges();
    const childDebug = fixture.debugElement.children.find(de => de.componentInstance instanceof MovieDetailComponent);
    expect(childDebug).toBeDefined();
    childDebug?.triggerEventHandler('close', {});
    expect(component.selectedMovie).toBeNull();
    expect(component.showModal).toBeFalse();
  });
});


