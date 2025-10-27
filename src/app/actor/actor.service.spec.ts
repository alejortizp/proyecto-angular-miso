/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActorService } from './actor.service';

describe('Service: Actor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActorService]
    });
  });

  it('should ...', inject([ActorService], (service: ActorService) => {
    expect(service).toBeTruthy();
  }));
});
