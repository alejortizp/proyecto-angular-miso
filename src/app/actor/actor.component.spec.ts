/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActorComponent } from './actor.component';
import { ActorService } from './actor.service';
import { Actor } from './actor';
import { of } from 'rxjs';

describe('ActorComponent', () => {
  let component: ActorComponent;
  let fixture: ComponentFixture<ActorComponent>;
  let mockActorService: jasmine.SpyObj<ActorService>;

  const mockActors: Actor[] = [
    new Actor('1','John Doe', 'photo1.jpg', 'USA', new Date('1980-01-01'), 'Biography 1'),
    new Actor('2','Jane Smith', 'photo2.jpg', 'UK', new Date('1985-05-15'), 'Biography 2'),
    new Actor('3','Alice Williams', 'photo3.jpg', 'Canada', new Date('1990-10-20'), 'Biography 3')
  ];

  beforeEach(() => {
    mockActorService = jasmine.createSpyObj('ActorService', ['getActors']);

    TestBed.configureTestingModule({
      declarations: [ActorComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ActorService, useValue: mockActorService }
      ]
    });

    fixture = TestBed.createComponent(ActorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize actors list', () => {
    mockActorService.getActors.and.returnValue(of(mockActors));

    component.ngOnInit();

    expect(component.actors.length).toBe(3);
    expect(component.filteredActors.length).toBe(3);
  });

  it('should filter actors by search text', () => {
    mockActorService.getActors.and.returnValue(of(mockActors));
    component.ngOnInit();

    component.searchText = 'john';
    component.filterActors();

    expect(component.filteredActors.length).toBe(1);
    expect(component.filteredActors[0].name).toBe('John Doe');
  });

  it('should filter actors case insensitively', () => {
    mockActorService.getActors.and.returnValue(of(mockActors));
    component.ngOnInit();

    component.searchText = 'JANE';
    component.filterActors();

    expect(component.filteredActors.length).toBe(1);
    expect(component.filteredActors[0].name).toBe('Jane Smith');
  });

  it('should return all actors when search text is empty', () => {
    mockActorService.getActors.and.returnValue(of(mockActors));
    component.ngOnInit();

    component.searchText = '';
    component.filterActors();

    expect(component.filteredActors.length).toBe(3);
  });

  it('should return empty array when no actors match search', () => {
    mockActorService.getActors.and.returnValue(of(mockActors));
    component.ngOnInit();

    component.searchText = 'xyz';
    component.filterActors();

    expect(component.filteredActors.length).toBe(0);
  });
});
