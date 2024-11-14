import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { WatchlistService } from '../../services/watchlist.service';
import { Movie } from '../../models/movie.model';
import { MovieComponent } from '../movie/movie.component';
import { SearchComponent } from '../search/search.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Genre } from '../../models/genre.model';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { DetailsComponent } from "../details/details.component";
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { selectMovieCollection } from '../../state/watchlist.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, CommonModule, MovieComponent, SearchComponent, DetailsComponent],
  providers: [Store],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  watchList$ = new BehaviorSubject<Readonly<Movie[]>>([]);

  genres: Genre[] = [];
  queuedMovies: Movie[] = [];
  archivedMovies: Movie[] = [];
  currentMovie: Movie | undefined;
  loading: boolean = true;

  @ViewChild('drawer') drawer: MatDrawer | undefined;

  movies$;
  moviesCollection$;

  private _onDestroy = new Subject<void>();

  constructor(
    private auth: AuthService,
    private listService: WatchlistService,
    private snackbar: MatSnackBar,
    private store: Store
  ) {
    this.movies$ = this.store.select(selectMovieCollection);
    this.moviesCollection$ = this.store.select(selectMovieCollection);
  }

  async ngOnInit() {
    const connected = await this.auth.verifyMovieConnection();
    if(connected?.success) {
      this.genres = await this.getGenres();
      const movies = localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')!) as Movie[] : [];
      this.listService.setMovies(movies);
      this.collectionListener().subscribe();
      this.loading = false;
    }
  }

  async getGenres() {
    return await this.listService.getGenres() ?? [];
  }

  collectionListener() {
    return this.moviesCollection$.pipe(
      takeUntil(this._onDestroy),
      tap(state => {
        this.watchList$.next(state);
        this.queuedMovies = state.filter(lMovie => !lMovie.archived);
        this.archivedMovies = state.filter(lMovie => !!lMovie.archived);
      })
    )
  }

  async searchMovies(form: Partial<Movie>) {
    const movies = (await this.listService.searchMovies(form.title!))!.results.slice(0, 10);
    this.listService.setSearchResults(movies);
  }

  getLabel(pre: string, size: number) {
    return `${pre} (${size})`;
  }

  removeFromList(movie: Movie) {
    const newWatchList = this.watchList$.value.filter(listMovie => movie.id !== listMovie.id);
    this.watchList$.next(newWatchList);
    this.listService.removeMovie(movie);
    
    this.snackbar.open(`${movie.title} Removed`);
  }

  archiveMovie(movie: Movie) {
    const newMovie = structuredClone(movie);
    newMovie.archived = true;
    this.listService.moveMovie(newMovie);
    this.snackbar.open(`${movie.title} Archived`);
  }

  restoreMovie(movie: Movie) {
    const newMovie = structuredClone(movie);
    newMovie.archived = false;
    this.listService.moveMovie(newMovie);
    this.snackbar.open(`${newMovie.title} Restored`);
  }

  async addToList(movie: Movie) {
    const newMovie = structuredClone(movie);
    newMovie.archived = false;
    this.listService.addMovie(newMovie);
    this.snackbar.open(`${newMovie.title} Added`);
  }

  async viewDetails(movie: Movie) {
    this.currentMovie = movie;
    await this.drawer?.open();
    this.drawer?.openedChange.pipe(tap(open => { if(!open) this.currentMovie = undefined })).subscribe();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}
