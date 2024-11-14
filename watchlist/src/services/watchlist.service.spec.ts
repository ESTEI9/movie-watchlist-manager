import { TestBed } from '@angular/core/testing';

import { WatchlistService } from './watchlist.service';
import { Repository } from './repository.service';
import { MockRepository } from '../mocks/repository.mock';
import { provideStore, Store } from '@ngrx/store';

describe('WatchlistService', () => {
  let service: WatchlistService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Repository, useClass: MockRepository },
        provideStore()
      ]
    });
    service = TestBed.inject(WatchlistService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
