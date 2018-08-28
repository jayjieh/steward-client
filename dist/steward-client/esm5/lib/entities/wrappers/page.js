/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Datable page used to wrapper server content response
 * @template T
 */
var /**
 * Datable page used to wrapper server content response
 * @template T
 */
Page = /** @class */ (function () {
    function Page() {
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
    return Page;
}());
/**
 * Datable page used to wrapper server content response
 * @template T
 */
export { Page };
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
var /**
 * used to map sort request
 */
Sort = /** @class */ (function () {
    function Sort() {
        this.sorted = false;
        this.unsorted = true;
    }
    return Sort;
}());
/**
 * used to map sort request
 */
export { Sort };
if (false) {
    /** @type {?} */
    Sort.prototype.sorted;
    /** @type {?} */
    Sort.prototype.unsorted;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHQTs7OztBQUFBOzs7OztvQkFJbUIsRUFBRTs7Ozs2QkFJTyxDQUFDOzs7OzBCQUlKLENBQUM7Ozs7cUJBSUwsSUFBSTs7OztvQkFJTCxLQUFLOzs7O3VCQUlELEVBQUU7Ozs7c0JBSVAsSUFBSSxJQUFJLEVBQUU7Ozs7c0JBSVIsQ0FBQzs7ZUFuQ3RCO0lBb0NDLENBQUE7Ozs7O0FBakNELGdCQWlDQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlEOzs7QUFBQTs7c0JBQ3NCLEtBQUs7d0JBQ0gsSUFBSTs7ZUExQzVCO0lBMkNDLENBQUE7Ozs7QUFIRCxnQkFHQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBEYXRhYmxlIHBhZ2UgdXNlZCB0byB3cmFwcGVyIHNlcnZlciBjb250ZW50IHJlc3BvbnNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUGFnZTxUPiB7XHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciBvZiBpdGVtcyBwZXIgcGFnZSBzYW1lIGFzIGxpbWl0XHJcbiAgICAgKi9cclxuICAgIHNpemU6IG51bWJlciA9IDEwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUb3RhbCBpdGVtcyBhdmFpbGFibGUgb24gdGhlIHNlcnZlclxyXG4gICAgICovXHJcbiAgICB0b3RhbEVsZW1lbnRzOiBudW1iZXIgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUb3RhbCBudW1iZXIgb2YgcGFnZXMgcHJlc2VudFxyXG4gICAgICovXHJcbiAgICB0b3RhbFBhZ2VzOiBudW1iZXIgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgaXMgdGhlIGZpcnN0IHBhZ2VcclxuICAgICAqL1xyXG4gICAgZmlyc3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgaXQgaXMgdGhlIGxhc3QgcGFnZVxyXG4gICAgICovXHJcbiAgICBsYXN0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhY3R1YWwgcGFnZSBjb250ZW50XHJcbiAgICAgKi9cclxuICAgIGNvbnRlbnQ6IEFycmF5PFQ+ID0gW107XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gbWFwIHNvcnQgcGFyYW1ldGVyc1xyXG4gICAgICovXHJcbiAgICBzb3J0ZWQ6IFNvcnQgPSBuZXcgU29ydCgpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDdXJyZW50IHBhZ2UgbnVtYmVyXHJcbiAgICAgKi9cclxuICAgIG51bWJlcjogbnVtYmVyID0gMDtcclxufVxyXG4vKipcclxuICogdXNlZCB0byBtYXAgc29ydCByZXF1ZXN0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU29ydHtcclxuICAgIHNvcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgdW5zb3J0ZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG59XHJcbiJdfQ==