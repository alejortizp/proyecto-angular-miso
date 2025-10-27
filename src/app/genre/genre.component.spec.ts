import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { GenreComponent } from './genre.component';
import { GenreService } from './genre.service';
import { Genre } from './genre';
import { of } from 'rxjs';

describe('GenreComponent', () => {
  let component: GenreComponent;
  let fixture: ComponentFixture<GenreComponent>;
  let mockGenreService: jasmine.SpyObj<GenreService>;

  const mockGenres: Genre[] = [
    new Genre(1, 'Rock'),
    new Genre(2, 'Jazz'),
    new Genre(3, 'Classical'),
    new Genre(4, 'Pop'),
    new Genre(5, 'Electronic')
  ];

  beforeEach(() => {
    mockGenreService = jasmine.createSpyObj('GenreService', ['getGenres']);

    TestBed.configureTestingModule({
      declarations: [GenreComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: GenreService, useValue: mockGenreService }
      ]
    });

    fixture = TestBed.createComponent(GenreComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize genres list', () => {
    mockGenreService.getGenres.and.returnValue(of(mockGenres));

    component.ngOnInit();

    expect(component.genres.length).toBe(5);
    expect(component.filteredGenres.length).toBe(5);
  });

  it('should sort genres alphabetically by type', () => {
    const unsortedGenres: Genre[] = [
      new Genre(1, 'Rock'),
      new Genre(2, 'Jazz'),
      new Genre(3, 'Classical')
    ];
    
    mockGenreService.getGenres.and.returnValue(of(unsortedGenres));

    component.ngOnInit();

    expect(component.genres[0].type).toBe('Classical');
    expect(component.genres[1].type).toBe('Jazz');
    expect(component.genres[2].type).toBe('Rock');
  });

  it('should filter genres by search text', () => {
    mockGenreService.getGenres.and.returnValue(of(mockGenres));
    component.ngOnInit();

    component.searchText = 'rock';
    component.filterGenres();

    expect(component.filteredGenres.length).toBe(1);
    expect(component.filteredGenres[0].type).toBe('Rock');
  });

  it('should filter genres case insensitively', () => {
    mockGenreService.getGenres.and.returnValue(of(mockGenres));
    component.ngOnInit();

    component.searchText = 'JAZZ';
    component.filterGenres();

    expect(component.filteredGenres.length).toBe(1);
    expect(component.filteredGenres[0].type).toBe('Jazz');
  });

  it('should return all genres when search text is empty', () => {
    mockGenreService.getGenres.and.returnValue(of(mockGenres));
    component.ngOnInit();

    component.searchText = '';
    component.filterGenres();

    expect(component.filteredGenres.length).toBe(5);
  });

  it('should return empty array when no genres match search', () => {
    mockGenreService.getGenres.and.returnValue(of(mockGenres));
    component.ngOnInit();

    component.searchText = 'xyz';
    component.filterGenres();

    expect(component.filteredGenres.length).toBe(0);
  });

  it('should trim whitespace from search text', () => {
    mockGenreService.getGenres.and.returnValue(of(mockGenres));
    component.ngOnInit();

    component.searchText = '  rock  ';
    component.filterGenres();

    expect(component.filteredGenres.length).toBe(1);
    expect(component.filteredGenres[0].type).toBe('Rock');
  });

  it('should filter genres with partial matches', () => {
    mockGenreService.getGenres.and.returnValue(of(mockGenres));
    component.ngOnInit();

    component.searchText = 'cla';
    component.filterGenres();

    expect(component.filteredGenres.length).toBe(1);
    expect(component.filteredGenres[0].type).toBe('Classical');
  });

  it('should maintain original genres array after filtering', () => {
    mockGenreService.getGenres.and.returnValue(of(mockGenres));
    component.ngOnInit();

    const originalLength = component.genres.length;
    
    component.searchText = 'rock';
    component.filterGenres();

    expect(component.genres.length).toBe(originalLength);
    expect(component.filteredGenres.length).toBe(1);
  });

  it('should filter multiple genres with common substring', () => {
    const genresWithCommonSubstring: Genre[] = [
      new Genre(1, 'Rock'),
      new Genre(2, 'Hard Rock'),
      new Genre(3, 'Progressive Rock'),
      new Genre(4, 'Jazz')
    ];
    
    mockGenreService.getGenres.and.returnValue(of(genresWithCommonSubstring));
    component.ngOnInit();

    component.searchText = 'rock';
    component.filterGenres();

    expect(component.filteredGenres.length).toBe(3);
  });

  it('should initialize with empty arrays', () => {
    expect(component.genres).toEqual([]);
    expect(component.filteredGenres).toEqual([]);
    expect(component.searchText).toBe('');
  });

  it('should call getGenres on ngOnInit', () => {
    mockGenreService.getGenres.and.returnValue(of(mockGenres));

    component.ngOnInit();

    expect(mockGenreService.getGenres).toHaveBeenCalled();
    expect(mockGenreService.getGenres).toHaveBeenCalledTimes(1);
  });

  it('should handle empty genres list from service', () => {
    mockGenreService.getGenres.and.returnValue(of([]));

    component.ngOnInit();

    expect(component.genres.length).toBe(0);
    expect(component.filteredGenres.length).toBe(0);
  });

  it('should not modify genres when filter finds no matches', () => {
    mockGenreService.getGenres.and.returnValue(of(mockGenres));
    component.ngOnInit();

    const genresBeforeFilter = [...component.genres];
    
    component.searchText = 'nonexistent';
    component.filterGenres();

    expect(component.genres).toEqual(genresBeforeFilter);
    expect(component.filteredGenres.length).toBe(0);
  });
});