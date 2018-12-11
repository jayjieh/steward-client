/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Datable page used to wrapper server content response
 * @template T
 */
export class Page {
    /**
     * Datable page used to wrapper server content response
     */
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
    /**
     * used to map sort request
     */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHQSxNQUFNO0lBSE47O09BRUc7SUFDSDtRQUNJOztXQUVHO1FBQ0gsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQjs7V0FFRztRQUNILGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCOztXQUVHO1FBQ0gsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2Qjs7V0FFRztRQUNILFVBQUssR0FBWSxJQUFJLENBQUM7UUFDdEI7O1dBRUc7UUFDSCxTQUFJLEdBQVksS0FBSyxDQUFDO1FBQ3RCOztXQUVHO1FBQ0gsWUFBTyxHQUFhLEVBQUUsQ0FBQztRQUN2Qjs7V0FFRztRQUNILFdBQU0sR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzFCOztXQUVHO1FBQ0gsV0FBTSxHQUFXLENBQUMsQ0FBQztJQUN2QixDQUFDO0NBQUE7Ozs7OztJQTdCRyxvQkFBa0I7Ozs7O0lBSWxCLDZCQUEwQjs7Ozs7SUFJMUIsMEJBQXVCOzs7OztJQUl2QixxQkFBc0I7Ozs7O0lBSXRCLG9CQUFzQjs7Ozs7SUFJdEIsdUJBQXVCOzs7OztJQUl2QixzQkFBMEI7Ozs7O0lBSTFCLHNCQUFtQjs7Ozs7QUFLdkIsTUFBTTtJQUhOOztPQUVHO0lBQ0g7UUFDSSxXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGFBQVEsR0FBWSxJQUFJLENBQUM7SUFDN0IsQ0FBQztDQUFBOzs7SUFGRyxzQkFBd0I7O0lBQ3hCLHdCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBEYXRhYmxlIHBhZ2UgdXNlZCB0byB3cmFwcGVyIHNlcnZlciBjb250ZW50IHJlc3BvbnNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUGFnZTxUPiB7XHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciBvZiBpdGVtcyBwZXIgcGFnZSBzYW1lIGFzIGxpbWl0XHJcbiAgICAgKi9cclxuICAgIHNpemU6IG51bWJlciA9IDEwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUb3RhbCBpdGVtcyBhdmFpbGFibGUgb24gdGhlIHNlcnZlclxyXG4gICAgICovXHJcbiAgICB0b3RhbEVsZW1lbnRzOiBudW1iZXIgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUb3RhbCBudW1iZXIgb2YgcGFnZXMgcHJlc2VudFxyXG4gICAgICovXHJcbiAgICB0b3RhbFBhZ2VzOiBudW1iZXIgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgaXMgdGhlIGZpcnN0IHBhZ2VcclxuICAgICAqL1xyXG4gICAgZmlyc3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgaXQgaXMgdGhlIGxhc3QgcGFnZVxyXG4gICAgICovXHJcbiAgICBsYXN0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhY3R1YWwgcGFnZSBjb250ZW50XHJcbiAgICAgKi9cclxuICAgIGNvbnRlbnQ6IEFycmF5PFQ+ID0gW107XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gbWFwIHNvcnQgcGFyYW1ldGVyc1xyXG4gICAgICovXHJcbiAgICBzb3J0ZWQ6IFNvcnQgPSBuZXcgU29ydCgpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDdXJyZW50IHBhZ2UgbnVtYmVyXHJcbiAgICAgKi9cclxuICAgIG51bWJlcjogbnVtYmVyID0gMDtcclxufVxyXG4vKipcclxuICogdXNlZCB0byBtYXAgc29ydCByZXF1ZXN0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU29ydHtcclxuICAgIHNvcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgdW5zb3J0ZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG59XHJcbiJdfQ==