/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GenreService } from './genre.service';

describe('Service: Genre', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GenreService]
    });
  });

  it('should ...', inject([GenreService], (service: GenreService) => {
    expect(service).toBeTruthy();
  }));
});
