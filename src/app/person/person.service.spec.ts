/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PersonService } from './person.service';

describe('Service: Person', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonService]
    });
  });

  it('should ...', inject([PersonService], (service: PersonService) => {
    expect(service).toBeTruthy();
  }));
});
