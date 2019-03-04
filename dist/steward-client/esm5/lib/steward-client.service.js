/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResponseWrapper } from './entities/wrappers/response-wrapper';
import { Meta } from '@angular/platform-browser';
var StewardConfig = /** @class */ (function () {
    function StewardConfig() {
    }
    return StewardConfig;
}());
export { StewardConfig };
if (false) {
    /** @type {?} */
    StewardConfig.prototype.base_url;
    /** @type {?} */
    StewardConfig.prototype.access_token;
    /** @type {?} */
    StewardConfig.prototype.headers;
    /** @type {?} */
    StewardConfig.prototype.csrf;
}
/**
 * @template T, E
 */
var StewardClientService = /** @class */ (function () {
    function StewardClientService(http, config, meta) {
        this.http = http;
        this.config = config;
        this.meta = meta;
        this.base_url = '/';
        if (config.csrf == true) {
            this.csrf = this.meta.getTag('name=_csrf').content;
        }
        this.base_url = config.base_url;
        if (config.headers) {
            this.headers = config.headers;
        }
        else {
            if (config.csrf == true) {
                this.headers = new HttpHeaders({
                    'Content-Type': 'application/json; charset=utf-8',
                    'X-CSRF-TOKEN': this.csrf
                });
            }
            else {
                this.headers = new HttpHeaders({
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                });
            }
        }
        if (config.access_token) {
            if (config.csrf == true) {
                this.headers = this.headers.append('X-CSRF-TOKEN', this.csrf);
            }
            else {
                this.headers = this.headers.append('Authorization', 'Bearer ' + config.access_token);
            }
        }
        if (config.csrf == true) {
            this.headersPlain = new HttpHeaders({
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                'X-CSRF-TOKEN': this.csrf
            });
        }
        else {
            this.headersPlain = new HttpHeaders({
                'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            });
        }
    }
    /**
     * Used to handle http post requests
     */
    /**
     * Used to handle http post requests
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    StewardClientService.prototype.post = /**
     * Used to handle http post requests
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    function (endpoint, data) {
        return this.http.post(this.base_url + endpoint, JSON.stringify(data), { headers: this.headers.append('Content-Type', 'application/json; charset=utf-8') }).pipe(catchError(this.handleError()));
    };
    /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    StewardClientService.prototype.postNoToken = /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    function (endpoint, data) {
        return this.http.post(this.base_url + endpoint, JSON.stringify(data), { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) }).pipe(catchError(this.handleError()));
    };
    /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    StewardClientService.prototype.postLogin = /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    function (endpoint, data) {
        return this.http.post(endpoint, data, {
            headers: this.headersPlain
        }).pipe(catchError(this.handleError()));
    };
    /**
     * Used to handle http post requests
     */
    /**
     * Used to handle http post requests
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    StewardClientService.prototype.put = /**
     * Used to handle http post requests
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    function (endpoint, data) {
        return this.http.put(this.base_url + endpoint, JSON.stringify(data), { headers: this.headers.append('Content-Type', 'application/json; charset=utf-8') }).pipe(catchError(this.handleError()));
    };
    /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    StewardClientService.prototype.delete = /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    function (endpoint, data) {
        return this.http.request('delete', this.base_url + endpoint, {
            headers: this.headers.append('Content-Type', 'application/json; charset=utf-8'),
            body: JSON.stringify(data)
        }).pipe(catchError(this.handleError()));
    };
    /**
     * @param {?} endpoint
     * @param {?=} data
     * @return {?}
     */
    StewardClientService.prototype.get = /**
     * @param {?} endpoint
     * @param {?=} data
     * @return {?}
     */
    function (endpoint, data) {
        /** @type {?} */
        var options = {
            headers: this.headers,
            params: this.getHttpParams(data)
        };
        return this.http.get(this.base_url + endpoint, options).pipe(catchError(this.handleError()));
    };
    /**
     * if
     * @param endpoint
     * @param data
     * @param headers
     */
    /**
     * if
     * @param {?} endpoint
     * @param {?} data
     * @param {?=} headers
     * @return {?}
     */
    StewardClientService.prototype.postFormData = /**
     * if
     * @param {?} endpoint
     * @param {?} data
     * @param {?=} headers
     * @return {?}
     */
    function (endpoint, data, headers) {
        /** @type {?} */
        var formData = new FormData();
        Object.keys(data).forEach(function (key) {
            formData.append(key, data[key]);
        });
        if (this.headers.get('Authorization') && (!headers)) {
            headers = this.headers;
        }
        else if (!headers) {
            headers = new HttpHeaders();
        }
        return this.http.post(this.base_url + endpoint, formData, { headers: headers }).pipe(catchError(this.handleError()));
    };
    /**
     * @param {?} endpoint
     * @param {?} data
     * @param {?=} headers
     * @return {?}
     */
    StewardClientService.prototype.postFormAuthorized = /**
     * @param {?} endpoint
     * @param {?} data
     * @param {?=} headers
     * @return {?}
     */
    function (endpoint, data, headers) {
        return this.http.post(this.base_url + endpoint, data, { headers: this.headersPlain }).pipe(catchError(this.handleError()));
    };
    /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    StewardClientService.prototype.postFormDataMultipart = /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    function (endpoint, data) {
        /** @type {?} */
        var formData = new FormData();
        Object.keys(data).forEach(function (key) {
            if (Array.isArray(data[key])) {
                data[key].forEach(function (k2) {
                    formData.append(key, k2);
                });
            }
            else {
                formData.append(key, data[key]);
            }
        });
        if (this.config.csrf == true) {
            return this.http.post(this.base_url + endpoint, formData, { headers: new HttpHeaders({ 'X-CSRF-TOKEN': this.csrf }) }).pipe(catchError(this.handleError()));
        }
        else {
            return this.http.post(this.base_url + endpoint, formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) }).pipe(catchError(this.handleError()));
        }
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    StewardClientService.prototype.getHttpParams = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (data === undefined) {
            return new HttpParams();
        }
        /** @type {?} */
        var httpParams = new HttpParams();
        data.forEach(function (value, key) {
            httpParams = httpParams.append(key, value);
        });
        return httpParams;
    };
    /**
     * Used to catch exception thrown by http client returns internal server error
     * if status 500 is encountered
     */
    /**
     * Used to catch exception thrown by http client returns internal server error
     * if status 500 is encountered
     * @private
     * @template ResponseWrapper
     * @return {?}
     */
    StewardClientService.prototype.handleError = /**
     * Used to catch exception thrown by http client returns internal server error
     * if status 500 is encountered
     * @private
     * @template ResponseWrapper
     * @return {?}
     */
    function () {
        return function (error) {
            /** @type {?} */
            var res = new ResponseWrapper();
            //            console.error(error); // log to console instead
            if (error.status === 500) {
                res.code = error.status;
                res.message = 'Sorry internal server error occured please try again later';
            }
            else {
                res.code = error.status;
                res.message = error.error.message;
                res.data = error.error.data;
            }
            return of(res);
        };
    };
    /**
     * Used to render action buttons
     */
    /**
     * Used to render action buttons
     * @param {?} id
     * @return {?}
     */
    StewardClientService.renderMore = /**
     * Used to render action buttons
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return '<div class=\'actions-buttons center\' id=\'' + id + '\'><i class=\'fa fa-check\' title=\'Approve\'></i> <i class=\'fa fa-ban\' title=\'Decline\'></i></div>';
    };
    /**
     * @param {?} endpoint
     * @param {?=} data
     * @return {?}
     */
    StewardClientService.prototype.intiateDataTable = /**
     * @param {?} endpoint
     * @param {?=} data
     * @return {?}
     */
    function (endpoint, data) {
        /** @type {?} */
        var options = {
            headers: this.headers,
            params: this.getHttpParams(data)
        };
        return this.http.get(this.base_url + endpoint, options).pipe(catchError(this.handleError()));
    };
    StewardClientService.decorators = [
        { type: Injectable },
    ];
    StewardClientService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: StewardConfig },
        { type: Meta }
    ]; };
    return StewardClientService;
}());
export { StewardClientService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    StewardClientService.prototype.headers;
    /** @type {?} */
    StewardClientService.prototype.token;
    /** @type {?} */
    StewardClientService.prototype.base_url;
    /** @type {?} */
    StewardClientService.prototype.csrf;
    /**
     * @type {?}
     * @private
     */
    StewardClientService.prototype.headersPlain;
    /**
     * @type {?}
     * @private
     */
    StewardClientService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    StewardClientService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    StewardClientService.prototype.meta;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFVBQVUsRUFBcUIsV0FBVyxFQUFFLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzVGLE9BQU8sRUFBYSxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUNyRSxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFL0M7SUFBQTtJQUtBLENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFMRCxJQUtDOzs7O0lBSkMsaUNBQWlCOztJQUNqQixxQ0FBc0I7O0lBQ3RCLGdDQUFzQjs7SUFDdEIsNkJBQWM7Ozs7O0FBR2hCO0lBVUUsOEJBQW9CLElBQWdCLEVBQVUsTUFBcUIsRUFBVSxJQUFVO1FBQW5FLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUx2RixhQUFRLEdBQUcsR0FBRyxDQUFDO1FBTWIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3JELENBQUM7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDaEMsRUFBRSxDQUFD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QVU7OztnQkFiSCxVQUFVO2dCQXVCc0MsYUFBYTtnQkFuQjdELElBQUk7O0lBZ05aLDJCQUFDO0NBQUEsQUF2TUQsSUF1TUM7U0F0TVksb0JBQW9COzs7Ozs7SUFFL0IsdUNBQTZCOztJQUM3QixxQ0FBYzs7SUFDZCx3Q0FBZTs7SUFDZixvQ0FBYTs7Ozs7SUFFYiw0Q0FBa0M7Ozs7O0lBRXRCLG9DQUF3Qjs7Ozs7SUFBRSxzQ0FBNkI7Ozs7O0lBQUUsb0NBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHtPYnNlcnZhYmxlLCBvZn0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7Y2F0Y2hFcnJvcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge1Jlc3BvbnNlV3JhcHBlcn0gZnJvbSAnLi9lbnRpdGllcy93cmFwcGVycy9yZXNwb25zZS13cmFwcGVyJztcclxuaW1wb3J0IHtNZXRhfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ29uZmlnIHtcclxuICBiYXNlX3VybDogc3RyaW5nO1xyXG4gIGFjY2Vzc190b2tlbj86IHN0cmluZztcclxuICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XHJcbiAgY3NyZjogYm9vbGVhbjtcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudFNlcnZpY2U8VCwgRT4ge1xyXG5cclxuICBwcml2YXRlIGhlYWRlcnM6IEh0dHBIZWFkZXJzO1xyXG4gIHRva2VuOiBzdHJpbmc7XHJcbiAgYmFzZV91cmwgPSAnLyc7XHJcbiAgY3NyZjogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIGhlYWRlcnNQbGFpbjogSHR0cEhlYWRlcnM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBjb25maWc6IFN0ZXdhcmRDb25maWcsIHByaXZhdGUgbWV0YTogTWV0YSkge1xyXG4gICAgaWYgKGNvbmZpZy5jc3JmID09IHRydWUpIHtcclxuICAgICAgdGhpcy5jc3JmID0gdGhpcy5tZXRhLmdldFRhZygnbmFtZT1fY3NyZicpLmNvbnRlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5iYXNlX3VybCA9IGNvbmZpZy5iYXNlX3VybDtcclxuICAgIGlmIChjb25maWcuaGVhZGVycykge1xyXG4gICAgICB0aGlzLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChjb25maWcuY3NyZiA9PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcclxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAnWC1DU1JGLVRPS0VOJzogdGhpcy5jc3JmXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcclxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NfdG9rZW4nKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY29uZmlnLmFjY2Vzc190b2tlbikge1xyXG4gICAgICBpZiAoY29uZmlnLmNzcmYgPT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuaGVhZGVycy5hcHBlbmQoJ1gtQ1NSRi1UT0tFTicsIHRoaXMuY3NyZik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5oZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIGNvbmZpZy5hY2Nlc3NfdG9rZW4pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvbmZpZy5jc3JmID09IHRydWUpIHtcclxuICAgICAgdGhpcy5oZWFkZXJzUGxhaW4gPSBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAnWC1DU1JGLVRPS0VOJzogdGhpcy5jc3JmXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5oZWFkZXJzUGxhaW4gPSBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NfdG9rZW4nKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gaGFuZGxlIGh0dHAgcG9zdCByZXF1ZXN0c1xyXG4gICAqL1xyXG4gIHBvc3QoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBKU09OLnN0cmluZ2lmeShkYXRhKSwge2hlYWRlcnM6IHRoaXMuaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyl9KS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHBvc3ROb1Rva2VuKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIHtoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCd9KX0pLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcG9zdExvZ2luKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGVuZHBvaW50LCBkYXRhLCB7XHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVyc1BsYWluXHJcbiAgICB9KS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gaGFuZGxlIGh0dHAgcG9zdCByZXF1ZXN0c1xyXG4gICAqL1xyXG4gIHB1dChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIHtoZWFkZXJzOiB0aGlzLmhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpfSkucGlwZShcclxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBkZWxldGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QoJ2RlbGV0ZScsIHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwge1xyXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKVxyXG4gICAgfSkucGlwZShcclxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgICBwYXJhbXM6IHRoaXMuZ2V0SHR0cFBhcmFtcyhkYXRhKVxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgb3B0aW9ucykucGlwZShcclxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBpZlxyXG4gICAqIEBwYXJhbSBlbmRwb2ludFxyXG4gICAqIEBwYXJhbSBkYXRhXHJcbiAgICogQHBhcmFtIGhlYWRlcnNcclxuICAgKi9cclxuICBwb3N0Rm9ybURhdGEoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCwgaGVhZGVycz86IEh0dHBIZWFkZXJzKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XHJcbiAgICB9KTtcclxuICAgIGlmICh0aGlzLmhlYWRlcnMuZ2V0KCdBdXRob3JpemF0aW9uJykgJiYgKCFoZWFkZXJzKSkge1xyXG4gICAgICBoZWFkZXJzID0gdGhpcy5oZWFkZXJzO1xyXG4gICAgfSBlbHNlIGlmICghaGVhZGVycykge1xyXG4gICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBmb3JtRGF0YSwge2hlYWRlcnM6IGhlYWRlcnN9KS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHBvc3RGb3JtQXV0aG9yaXplZChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBULCBoZWFkZXJzPzogSHR0cEhlYWRlcnMpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgZGF0YSwge2hlYWRlcnM6IHRoaXMuaGVhZGVyc1BsYWlufSkucGlwZShcclxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwb3N0Rm9ybURhdGFNdWx0aXBhcnQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhW2tleV0pKSB7XHJcbiAgICAgICAgZGF0YVtrZXldLmZvckVhY2goazIgPT4ge1xyXG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgazIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMuY29uZmlnLmNzcmYgPT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBmb3JtRGF0YSwge2hlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7J1gtQ1NSRi1UT0tFTic6IHRoaXMuY3NyZn0pfSkucGlwZShcclxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgZm9ybURhdGEsIHtoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoeydBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc190b2tlbicpfSl9KS5waXBlKFxyXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEh0dHBQYXJhbXMoZGF0YTogTWFwPHN0cmluZywgc3RyaW5nPik6IEh0dHBQYXJhbXMge1xyXG4gICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgIH1cclxuICAgIGxldCBodHRwUGFyYW1zOiBIdHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgIGRhdGEuZm9yRWFjaCgodmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuYXBwZW5kKGtleSwgdmFsdWUpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaHR0cFBhcmFtcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gY2F0Y2ggZXhjZXB0aW9uIHRocm93biBieSBodHRwIGNsaWVudCByZXR1cm5zIGludGVybmFsIHNlcnZlciBlcnJvclxyXG4gICAqIGlmIHN0YXR1cyA1MDAgaXMgZW5jb3VudGVyZWRcclxuICAgKi9cclxuICBwcml2YXRlIGhhbmRsZUVycm9yPFJlc3BvbnNlV3JhcHBlcj4oKSB7XHJcbiAgICByZXR1cm4gKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSk6IE9ic2VydmFibGU8YW55PiA9PiB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IG5ldyBSZXNwb25zZVdyYXBwZXIoKTtcclxuICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxyXG4gICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA1MDApIHtcclxuICAgICAgICByZXMuY29kZSA9IGVycm9yLnN0YXR1cztcclxuICAgICAgICByZXMubWVzc2FnZSA9ICdTb3JyeSBpbnRlcm5hbCBzZXJ2ZXIgZXJyb3Igb2NjdXJlZCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXMuY29kZSA9IGVycm9yLnN0YXR1cztcclxuICAgICAgICByZXMubWVzc2FnZSA9IGVycm9yLmVycm9yLm1lc3NhZ2U7XHJcbiAgICAgICAgcmVzLmRhdGEgPSBlcnJvci5lcnJvci5kYXRhO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvZihyZXMpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gcmVuZGVyIGFjdGlvbiBidXR0b25zXHJcbiAgICovXHJcbiAgc3RhdGljIHJlbmRlck1vcmUoaWQ6IGFueSkge1xyXG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVxcJ2FjdGlvbnMtYnV0dG9ucyBjZW50ZXJcXCcgaWQ9XFwnJyArIGlkICsgJ1xcJz48aSBjbGFzcz1cXCdmYSBmYS1jaGVja1xcJyB0aXRsZT1cXCdBcHByb3ZlXFwnPjwvaT4gPGkgY2xhc3M9XFwnZmEgZmEtYmFuXFwnIHRpdGxlPVxcJ0RlY2xpbmVcXCc+PC9pPjwvZGl2Pic7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW50aWF0ZURhdGFUYWJsZShlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPikge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgICBwYXJhbXM6IHRoaXMuZ2V0SHR0cFBhcmFtcyhkYXRhKVxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgb3B0aW9ucykucGlwZShcclxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==