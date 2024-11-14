import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { provideStore, Store } from '@ngrx/store';
import { listAPIActions } from '../../state/watchlist.action';
import { Movie } from '../../models/movie.model';
import { BehaviorSubject } from 'rxjs';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let store: Store;
  const movies: Readonly<Movie[]> = [
    {id: 1, title: 'Test'} as Movie,
    {id: 2, title: 'Test 2'} as Movie
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchComponent,
        CommonModule,
        MaterialModule,
        ReactiveFormsModule
      ],
      providers: [
        provideStore(),
        provideAnimationsAsync()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    store.dispatch(listAPIActions.setResults({ movies }));
    component.watchList = new BehaviorSubject(movies);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
