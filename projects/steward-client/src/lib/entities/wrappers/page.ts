/**
 * Datable page used to wrapper server content response
 */
export class Page<T> {
    /**
     * Number of items per page same as limit
     */
    size: number = 10;
    /**
     * Total items available on the server
     */
    totalElements: number = 0;
    /**
     * Total number of pages present
     */
    totalPages: number = 0;
    /**
     * Checks if is the first page
     */
    first: boolean = true;
    /**
     * Checks if it is the last page
     */
    last: boolean = false;
    /**
     * The actual page content
     */
    content: Array<T> = [];
    /**
     * Used to map sort parameters
     */
    sorted: Sort = new Sort();
    /**
     * Current page number
     */
    number: number = 0;
}
/**
 * used to map sort request
 */
export class Sort{
    sorted: boolean = false;
    unsorted: boolean = true;
}
