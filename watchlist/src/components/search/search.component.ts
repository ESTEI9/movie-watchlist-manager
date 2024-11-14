import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';
import { Movie } from '../../models/movie.model';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { Genre } from '../../models/genre.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectSearchResults } from '../../state/watchlist.selectors';

type MovieFormKeys = 'title';

type MovieForm = Record<MovieFormKeys, AbstractControl<any, any>>;

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, NgOptimizedImage],
  providers: [
    { provide: IMAGE_LOADER, useValue: (config: ImageLoaderConfig) => `https://image.tmdb.org/t/p/w200${config.src}` }
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnDestroy {

  @Input() watchList: BehaviorSubject<Readonly<Movie[]>> | undefined;
  @Input() genres: Genre[] = [];
  @Output() addMovie = new EventEmitter<Movie>();
  @Output() search = new EventEmitter<typeof this.form.value>();

  @ViewChild('input') inputEl: ElementRef<HTMLInputElement> | undefined;

  form = new FormGroup<MovieForm>({
    title: new FormControl<string | undefined>(undefined)
  });

  searchedMovies: Readonly<Movie[]> = [];
  newSearchedMovies: Movie[] = []
  currentSearchedMovies: Movie[] = [];
  loading: boolean = false;
  Math = Math;

  searchResults$

  private _onDestroy = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private store: Store
  ) {
    this.searchResults$ = this.store.select(selectSearchResults);
  }

  ngOnInit(): void {
    this.formListener().subscribe();
    this.watchListListener().subscribe();
    this.searchResultsListener().subscribe();
  }

  formListener() {
    return this.form.valueChanges.pipe(
      takeUntil(this._onDestroy),
      tap(() => this.loading = true),
      debounceTime(200),
      tap(async form => {
        this.search.emit(form);
      })
    );
  }

  watchListListener() {
    return this.watchList!.pipe(
      takeUntil(this._onDestroy),
      tap(() => {
        [this.currentSearchedMovies, this.newSearchedMovies] = this.sortSearchedMovies();
      })
    )
  }

  sortSearchedMovies() {
    const currentMovies: Movie[] = [];
    const newMovies: Movie[] = [];

    this.searchedMovies.forEach(movie => {
      const watchListMovie = this.watchList?.value.find(lMovie => lMovie.id === movie.id);
      if(watchListMovie) return currentMovies.push(watchListMovie);
      return newMovies.push(movie);
    });

    return [currentMovies, newMovies];
  }

  searchResultsListener() {
    return this.searchResults$.pipe(
      takeUntil(this._onDestroy),
      tap(results => {
        this.searchedMovies = results;
        [this.currentSearchedMovies, this.newSearchedMovies] = this.sortSearchedMovies();
        this.loading = false;
      })
    )
  }

  clear() {
    this.form.controls.title.setValue('', { emitEvent: false });
  }

  getGenre(id: number) {
    return this.genres.find(g => g.id === id)!.name;
  }

  viewPoster(path: string) {
    this.dialog.open(ImageDialog, { data: path, panelClass: 'poster-dialog' });
  }

  focus() {
    this.inputEl?.nativeElement.focus();
  }

  @HostListener('document:click', ['$event'])
  clickHandler(event: MouseEvent) {
    if(!(event.target as HTMLElement).closest('app-search') && !(event.target as HTMLElement).closest('.cdk-overlay-container')) {
      this.currentSearchedMovies = [];
      this.newSearchedMovies = [];
      this.form.controls.title.setValue('', { emitEvent: false });
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}

@Component({
  selector: '',
  standalone: true,
  imports: [MaterialModule, NgOptimizedImage],
  providers: [
    { provide: IMAGE_LOADER, useValue: (config: ImageLoaderConfig) => `https://image.tmdb.org/t/p/original${config.src}` }
  ],
  template: `
    <img [ngSrc]="path" fill/>
  `
})

class ImageDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public path: string
  ) { }
}
