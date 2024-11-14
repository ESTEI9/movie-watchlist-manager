import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MaterialModule } from '../../modules/material/material.module';
import { CommonModule } from '@angular/common';
import { MovieComponent } from '../movie/movie.component';
import { SearchComponent } from '../search/search.component';
import { DetailsComponent } from '../details/details.component';
import { AuthService } from '../../services/auth.service';
import { MockAuthService } from '../../mocks/auth.service.mock';
import { WatchlistService } from '../../services/watchlist.service';
import { MockWatchlistService } from '../../mocks/watchlist.service.mock';
import { provideStore } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, MaterialModule, CommonModule, MovieComponent, SearchComponent, DetailsComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: WatchlistService, useClass: MockWatchlistService },
        provideStore(),
        provideAnimationsAsync()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
