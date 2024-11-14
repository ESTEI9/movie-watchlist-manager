import { createActionGroup, props } from '@ngrx/store'
import { Movie } from '../models/movie.model';

export const listActions = createActionGroup({
    source: 'List',
    events: {
        'Add Movie': props<{ movie: Movie }>(),
        'Remove Movie': props<{ movie: Movie }>(),
        'Set Movies': props<{ movies: Movie[] }>(),
        'Move Movie': props<{ movie: Movie }>()
    }
});

export const listAPIActions = createActionGroup({
    source: 'List API',
    events: {
        'Retrieved List': props<{ movies: ReadonlyArray<Movie> }>(),
        'Set Results': props<{ movies: ReadonlyArray<Movie>}>()
    }
});