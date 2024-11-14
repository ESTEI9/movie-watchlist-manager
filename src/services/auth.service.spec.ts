import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Repository } from './repository.service';
import { MockRepository } from '../mocks/repository.mock';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Repository, useClass: MockRepository }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
