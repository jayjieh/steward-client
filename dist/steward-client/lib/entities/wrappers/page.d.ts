/**
 * Datable page used to wrapper server content response
 */
export declare class Page<T> {
    /**
     * Number of items per page same as limit
     */
    size: number;
    /**
     * Total items available on the server
     */
    totalElements: number;
    /**
     * Total number of pages present
     */
    totalPages: number;
    /**
     * Checks if is the first page
     */
    first: boolean;
    /**
     * Checks if it is the last page
     */
    last: boolean;
    /**
     * The actual page content
     */
    content: Array<T>;
    /**
     * Used to map sort parameters
     */
    sorted: Sort;
    /**
     * Current page number
     */
    number: number;
}
/**
 * used to map sort request
 */
export declare class Sort {
    sorted: boolean;
    unsorted: boolean;
}
