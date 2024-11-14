import { createReducer, on } from "@ngrx/store";
import { listActions, listAPIActions } from "./watchlist.action";
import { Movie } from "../models/movie.model";

export const initialState: ReadonlyArray<Movie> = [];

export const collectionReducer = createReducer(
    initialState,
    on(listActions.removeMovie, (state, { movie }) => 
        state.filter(m => m.id !== movie.id)
    ),
    on(listActions.addMovie, (state, { movie }) => {
        if(state.map(m => m.id).indexOf(movie.id) > -1) return state;
        return [...state, movie];
    }),
    on(listActions.setMovies, (state, { movies }) => movies),
    on(listActions.moveMovie, (state, { movie }) => {
        const movieIndex = state.findIndex(m => m.id === movie.id);
        const clone = JSON.parse(JSON.stringify(state)).map((m: any) => new Movie(m) );
        if(movieIndex > -1) clone[movieIndex].archived = movie.archived;
        return clone;
    })
);

export const searchResultsReducer = createReducer(
    initialState,
    on(listAPIActions.setResults, (state, { movies }) =>  movies)
)