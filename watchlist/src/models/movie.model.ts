export class Movie {
    /**
     * @param adult
     * Whether the movie is an adult film
     */
    adult: boolean = false;
    /**
     * @param backdrop_path
     * The path of the image backdrop preceeded by '/'
     */
    backdrop_path: string = '/';
    /**
     * @param genre_ids
     * The IDs of the genres that the movie fits
     */
    genre_ids: number[] = [];
    /**
     * @param id
     * The ID of the film
     */
    id: number = 0;
    /**
     * @param original_language
     * The language that the film was originally created in
     */
    original_language: string = 'en-US';
    /**
     * @param original_title
     * The original title of the film in the original language
     */
    original_title: string = '';
    /**
     * @param overview
     * A small description of the film
     */
    overview: string = '';
    /**
     * @param popularity
     * The popularity rating of the film
     */
    popularity: number = 0;
    /**
     * @param poster_path
     * The poster's image URL preceeded by '/'
     */
    poster_path: string = '/';
    /**
     * @param release_date
     * The date when the film was released in YYYY-MM-DD
     */
    release_date: string = '0001-01-01';
    /**
     * @param title
     * The title of the film
     */
    title: string = '';
    /**
     * @param video
     * Whether the film is out on video
     */
    video: boolean = false;
    /**
     * @param vote_average
     * The average score out of 10
     */
    vote_average: number = 0;
    /**
     * @param vote_count
     * How many votes given to the film
     */
    vote_count: number = 0;
    /**
     * @param archived
     * Local parameter to track whether the movie has been archived
     */
    archived: boolean = false;

    constructor(params?: Partial<Movie>) {
        Object.assign(this, params);
    }
}