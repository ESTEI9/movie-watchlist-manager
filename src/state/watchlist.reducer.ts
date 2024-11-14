import { createReducer, on } from "@ngrx/store";
import { Movie } from "../models/movie.model";
import { listAPIActions } from "./watchlist.action";

export const initialState: ReadonlyArray<Movie> = [];
export const listReducer = createReducer(
    initialState,
    on(listAPIActions.retrievedList, (_state, { movies }) => movies)
);