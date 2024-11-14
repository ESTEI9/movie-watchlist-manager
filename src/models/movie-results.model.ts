import { Movie } from "./movie.model";

export interface MovieResult {
    /**
     * @param page
     * The current page
     */
    page: number;
    /**
     * @param results
     * Array of movies
     */
    results: Movie[];
    total_pages: number;
    total_results: number;
}