import { TestBed } from '@angular/core/testing';

import { Repository } from './repository.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('Repository', () => {
  let service: Repository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler
      ]
    });
    service = TestBed.inject(Repository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
