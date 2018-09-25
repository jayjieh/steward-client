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
    /**
     * Datable page used to wrapper server content response
     */
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
    /**
     * used to map sort request
     */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHQTs7Ozs7SUFIQTs7T0FFRztJQUNIO1FBQ0k7O1dBRUc7UUFDSCxTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCOztXQUVHO1FBQ0gsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUI7O1dBRUc7UUFDSCxlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCOztXQUVHO1FBQ0gsVUFBSyxHQUFZLElBQUksQ0FBQztRQUN0Qjs7V0FFRztRQUNILFNBQUksR0FBWSxLQUFLLENBQUM7UUFDdEI7O1dBRUc7UUFDSCxZQUFPLEdBQWEsRUFBRSxDQUFDO1FBQ3ZCOztXQUVHO1FBQ0gsV0FBTSxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7UUFDMUI7O1dBRUc7UUFDSCxXQUFNLEdBQVcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFBRCxXQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQzs7Ozs7Ozs7Ozs7SUE3Qkcsb0JBQWtCOzs7OztJQUlsQiw2QkFBMEI7Ozs7O0lBSTFCLDBCQUF1Qjs7Ozs7SUFJdkIscUJBQXNCOzs7OztJQUl0QixvQkFBc0I7Ozs7O0lBSXRCLHVCQUF1Qjs7Ozs7SUFJdkIsc0JBQTBCOzs7OztJQUkxQixzQkFBbUI7Ozs7O0FBS3ZCOzs7O0lBSEE7O09BRUc7SUFDSDtRQUNJLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsYUFBUSxHQUFZLElBQUksQ0FBQztJQUM3QixDQUFDO0lBQUQsV0FBQztBQUFELENBQUMsQUFIRCxJQUdDOzs7Ozs7O0lBRkcsc0JBQXdCOztJQUN4Qix3QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIERhdGFibGUgcGFnZSB1c2VkIHRvIHdyYXBwZXIgc2VydmVyIGNvbnRlbnQgcmVzcG9uc2VcbiAqL1xuZXhwb3J0IGNsYXNzIFBhZ2U8VD4ge1xuICAgIC8qKlxuICAgICAqIE51bWJlciBvZiBpdGVtcyBwZXIgcGFnZSBzYW1lIGFzIGxpbWl0XG4gICAgICovXG4gICAgc2l6ZTogbnVtYmVyID0gMTA7XG4gICAgLyoqXG4gICAgICogVG90YWwgaXRlbXMgYXZhaWxhYmxlIG9uIHRoZSBzZXJ2ZXJcbiAgICAgKi9cbiAgICB0b3RhbEVsZW1lbnRzOiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIFRvdGFsIG51bWJlciBvZiBwYWdlcyBwcmVzZW50XG4gICAgICovXG4gICAgdG90YWxQYWdlczogbnVtYmVyID0gMDtcbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgaXMgdGhlIGZpcnN0IHBhZ2VcbiAgICAgKi9cbiAgICBmaXJzdDogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGl0IGlzIHRoZSBsYXN0IHBhZ2VcbiAgICAgKi9cbiAgICBsYXN0OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogVGhlIGFjdHVhbCBwYWdlIGNvbnRlbnRcbiAgICAgKi9cbiAgICBjb250ZW50OiBBcnJheTxUPiA9IFtdO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gbWFwIHNvcnQgcGFyYW1ldGVyc1xuICAgICAqL1xuICAgIHNvcnRlZDogU29ydCA9IG5ldyBTb3J0KCk7XG4gICAgLyoqXG4gICAgICogQ3VycmVudCBwYWdlIG51bWJlclxuICAgICAqL1xuICAgIG51bWJlcjogbnVtYmVyID0gMDtcbn1cbi8qKlxuICogdXNlZCB0byBtYXAgc29ydCByZXF1ZXN0XG4gKi9cbmV4cG9ydCBjbGFzcyBTb3J0e1xuICAgIHNvcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHVuc29ydGVkOiBib29sZWFuID0gdHJ1ZTtcbn1cbiJdfQ==