import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tmdbInterceptor } from '../interceptors/tmdb.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ActionReducer, MetaReducer, provideStore, StoreModule } from '@ngrx/store';
import { listReducer } from '../state/watchlist.reducer';
import { collectionReducer, searchResultsReducer } from '../state/collection.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

const reducers = { list: listReducer, movies: collectionReducer, searchResults: searchResultsReducer };

function localStorageSyncReducer(reducer: ActionReducer<any>) {
  return localStorageSync({keys: ['movies']})(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tmdbInterceptor])), provideAnimationsAsync(),
    provideStore(),
    importProvidersFrom([
        StoreModule.forRoot(reducers, { metaReducers })
  ])
]
};
