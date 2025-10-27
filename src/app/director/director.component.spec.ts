/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DirectorComponent } from './director.component';
import { DirectorService } from './director.service';
import { Director } from './director';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('DirectorComponent', () => {
  let component: DirectorComponent;
  let fixture: ComponentFixture<DirectorComponent>;
  let mockDirectorService: jasmine.SpyObj<DirectorService>;

  const mockDirectors: Director[] = [
    new Director('Quentin Tarantino', 'photo1.jpg', 'USA', new Date('1980-01-01'), 'Biography 1'),
    new Director('Stiven Spilberg', 'photo2.jpg', 'UK', new Date('1985-05-15'), 'Biography 2'),
    new Director('Vince Gilligan', 'photo3.jpg', 'Canada', new Date('1990-10-20'), 'Biography 3')
  ];

  beforeEach(async () => {
    mockDirectorService = jasmine.createSpyObj('DirectorService', ['getDirectors']);

    await TestBed.configureTestingModule({
      declarations: [DirectorComponent], 
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: DirectorService, useValue: mockDirectorService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DirectorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize Directors list', () => {
    mockDirectorService.getDirectors.and.returnValue(of(mockDirectors));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.directors.length).toBe(3);
    expect(component.filteredDirectors.length).toBe(3);
  });

  it('should filter Directors by search text', () => {
    mockDirectorService.getDirectors.and.returnValue(of(mockDirectors));
    component.ngOnInit();
    fixture.detectChanges();

    component.searchText = 'tarantino';
    component.filterDirectors();

    expect(component.filteredDirectors.length).toBe(1);
    expect(component.filteredDirectors[0].name).toBe('Quentin Tarantino');
  });

  it('should filter Directors case insensitively', () => {
    mockDirectorService.getDirectors.and.returnValue(of(mockDirectors));
    component.ngOnInit();
    fixture.detectChanges();

    component.searchText = 'sPILbErg';
    component.filterDirectors();

    expect(component.filteredDirectors.length).toBe(1);
    expect(component.filteredDirectors[0].name).toBe('Stiven Spilberg');
  });

  it('should return all Directors when search text is empty', () => {
    mockDirectorService.getDirectors.and.returnValue(of(mockDirectors));
    component.ngOnInit();
    fixture.detectChanges();

    component.searchText = '';
    component.filterDirectors();

    expect(component.filteredDirectors.length).toBe(3);
  });

  it('should return empty array when no Directors match search', () => {
    mockDirectorService.getDirectors.and.returnValue(of(mockDirectors));
    component.ngOnInit();
    fixture.detectChanges();

    component.searchText = 'xyz';
    component.filterDirectors();

    expect(component.filteredDirectors.length).toBe(0);
  });
});
