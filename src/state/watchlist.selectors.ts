import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Movie } from "../models/movie.model";

export const selectMovies = createFeatureSelector<ReadonlyArray<Movie>>('list');
export const selectCollectionState = createFeatureSelector<ReadonlyArray<Movie>>('movies');
export const selectMovieCollection = createSelector(selectMovies, selectCollectionState, (list, movies) => {
    return movies;
});
export const selectSearchResultsCollection = createFeatureSelector<ReadonlyArray<Movie>>('searchResults')
export const selectSearchResults = createSelector(selectMovies, selectSearchResultsCollection, (list, searchResults) => {
    return searchResults;
})