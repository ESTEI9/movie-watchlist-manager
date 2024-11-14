import { Injectable } from '@angular/core';
import { MovieResult } from '../models/movie-results.model';
import { Repository } from './repository.service';
import { SearchParams } from '../models/search-params.model';
import { Genre } from '../models/genre.model';
import { Store } from '@ngrx/store';
import { listActions, listAPIActions } from '../state/watchlist.action';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  protected apiKey = '042c9fb718647dd3d806e3e6f45df38b';
  protected apiBase = 'https://api.themoviedb.org/3/';

  constructor(
    private repo: Repository,
    private store: Store
  ) { }

  async getWatchlist(params?: SearchParams) {
    return await this.repo.get<MovieResult>({ url: `${this.apiBase}discover/movie`, params });
  }

  async searchMovies(searchString: string) {
    return await this.repo.get<MovieResult>({ url: `${this.apiBase}search/movie?query=${searchString}&api_key=${this.apiKey}` });
  }

  async getGenres() {
    const results = await this.repo.get<{genres: Genre[] }>({ url: `${this.apiBase}genre/movie/list?api_key=${this.apiKey}` });
    return results?.genres;
  }

  setMovies(movies: Movie[]) {
    this.store.dispatch(listActions.setMovies({ movies }));
  }

  addMovie(movie: Movie) {
    this.store.dispatch(listActions.addMovie({ movie }));
  }

  removeMovie(movie: Movie) {
    this.store.dispatch(listActions.removeMovie({ movie }));
  }

  moveMovie(movie: Movie) {
    this.store.dispatch(listActions.moveMovie({ movie }));
  }

  setSearchResults(movies: Movie[]) {
    this.store.dispatch(listAPIActions.setResults({ movies }));
  }
}
