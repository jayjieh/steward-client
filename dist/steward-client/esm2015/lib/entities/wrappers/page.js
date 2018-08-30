/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Datable page used to wrapper server content response
 * @template T
 */
export class Page {
    constructor() {
        /**
         * Number of items per page same as limit
         */
        this.size = 10;
        /**
         * Total items available on the server
         */
        this.totalElements = 0;
        /**
         * Total number of pages present
         */
        this.totalPages = 0;
        /**
         * Checks if is the first page
         */
        this.first = true;
        /**
         * Checks if it is the last page
         */
        this.last = false;
        /**
         * The actual page content
         */
        this.content = [];
        /**
         * Used to map sort parameters
         */
        this.sorted = new Sort();
        /**
         * Current page number
         */
        this.number = 0;
    }
}
if (false) {
    /**
     * Number of items per page same as limit
     * @type {?}
     */
    Page.prototype.size;
    /**
     * Total items available on the server
     * @type {?}
     */
    Page.prototype.totalElements;
    /**
     * Total number of pages present
     * @type {?}
     */
    Page.prototype.totalPages;
    /**
     * Checks if is the first page
     * @type {?}
     */
    Page.prototype.first;
    /**
     * Checks if it is the last page
     * @type {?}
     */
    Page.prototype.last;
    /**
     * The actual page content
     * @type {?}
     */
    Page.prototype.content;
    /**
     * Used to map sort parameters
     * @type {?}
     */
    Page.prototype.sorted;
    /**
     * Current page number
     * @type {?}
     */
    Page.prototype.number;
}
/**
 * used to map sort request
 */
export class Sort {
    constructor() {
        this.sorted = false;
        this.unsorted = true;
    }
}
if (false) {
    /** @type {?} */
    Sort.prototype.sorted;
    /** @type {?} */
    Sort.prototype.unsorted;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHQSxNQUFNOzs7OztvQkFJYSxFQUFFOzs7OzZCQUlPLENBQUM7Ozs7MEJBSUosQ0FBQzs7OztxQkFJTCxJQUFJOzs7O29CQUlMLEtBQUs7Ozs7dUJBSUQsRUFBRTs7OztzQkFJUCxJQUFJLElBQUksRUFBRTs7OztzQkFJUixDQUFDOztDQUNyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlELE1BQU07O3NCQUNnQixLQUFLO3dCQUNILElBQUk7O0NBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIERhdGFibGUgcGFnZSB1c2VkIHRvIHdyYXBwZXIgc2VydmVyIGNvbnRlbnQgcmVzcG9uc2VcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQYWdlPFQ+IHtcclxuICAgIC8qKlxyXG4gICAgICogTnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlIHNhbWUgYXMgbGltaXRcclxuICAgICAqL1xyXG4gICAgc2l6ZTogbnVtYmVyID0gMTA7XHJcbiAgICAvKipcclxuICAgICAqIFRvdGFsIGl0ZW1zIGF2YWlsYWJsZSBvbiB0aGUgc2VydmVyXHJcbiAgICAgKi9cclxuICAgIHRvdGFsRWxlbWVudHM6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIFRvdGFsIG51bWJlciBvZiBwYWdlcyBwcmVzZW50XHJcbiAgICAgKi9cclxuICAgIHRvdGFsUGFnZXM6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBpcyB0aGUgZmlyc3QgcGFnZVxyXG4gICAgICovXHJcbiAgICBmaXJzdDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBpdCBpcyB0aGUgbGFzdCBwYWdlXHJcbiAgICAgKi9cclxuICAgIGxhc3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGFjdHVhbCBwYWdlIGNvbnRlbnRcclxuICAgICAqL1xyXG4gICAgY29udGVudDogQXJyYXk8VD4gPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byBtYXAgc29ydCBwYXJhbWV0ZXJzXHJcbiAgICAgKi9cclxuICAgIHNvcnRlZDogU29ydCA9IG5ldyBTb3J0KCk7XHJcbiAgICAvKipcclxuICAgICAqIEN1cnJlbnQgcGFnZSBudW1iZXJcclxuICAgICAqL1xyXG4gICAgbnVtYmVyOiBudW1iZXIgPSAwO1xyXG59XHJcbi8qKlxyXG4gKiB1c2VkIHRvIG1hcCBzb3J0IHJlcXVlc3RcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTb3J0e1xyXG4gICAgc29ydGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICB1bnNvcnRlZDogYm9vbGVhbiA9IHRydWU7XHJcbn1cclxuIl19