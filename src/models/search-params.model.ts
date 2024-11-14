/**
 * @class Search parameters for finding movies
 */
export class SearchParams {
    /**
     * @param include_adult
     * Whether the search should include adult films
     */
    include_adult?: boolean = false;
    include_video?: boolean = false;
    language?: string = 'en-US';
    /**
     * @param page
     * The page of results from the db
     * @default 1
     */
    page?: number;
    /**
     * @param sort_by
     * Structure by Movie prop, then .asc || .desc
     * @default popularity.desc
     */
    sort_by?: string;

    constructor(params: SearchParams) {
        Object.assign(this, params);
    }
}