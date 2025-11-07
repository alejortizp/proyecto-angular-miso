import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { GenreListComponent } from './genre-list.component';
import { GenreService } from '../genre.service';
import { Genre } from '../genre.model';

describe('GenreListComponent', () => {
  let component: GenreListComponent;
  let fixture: ComponentFixture<GenreListComponent>;
  let genreService: jasmine.SpyObj<GenreService>;

  const mockGenres: Genre[] = [
    { id: 1, name: 'Acción', description: 'Películas de acción' },
    { id: 2, name: 'Comedia', description: 'Películas de comedia' }
  ];

  beforeEach(async () => {
    const genreServiceSpy = jasmine.createSpyObj('GenreService', ['getGenres']);

    await TestBed.configureTestingModule({
      declarations: [GenreListComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: GenreService, useValue: genreServiceSpy }
      ]
    }).compileComponents();

    genreService = TestBed.inject(GenreService) as jasmine.SpyObj<GenreService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load genres on init', () => {
    genreService.getGenres.and.returnValue(of(mockGenres));
    
    fixture.detectChanges(); // triggers ngOnInit
    
    expect(component.genres).toEqual(mockGenres);
    expect(component.loading).toBeFalse();
  });

  it('should handle error when loading genres', () => {
    genreService.getGenres.and.returnValue(
      throwError(() => new Error('Error loading genres'))
    );
    
    fixture.detectChanges();
    
    expect(component.error).toBeTruthy();
    expect(component.loading).toBeFalse();
  });

  it('should select a genre', () => {
    component.selectGenre(1);
    expect(component.selectedGenreId).toBe(1);
  });

  it('should check if genre is selected', () => {
    component.selectedGenreId = 1;
    expect(component.isSelected(1)).toBeTrue();
    expect(component.isSelected(2)).toBeFalse();
  });
});
