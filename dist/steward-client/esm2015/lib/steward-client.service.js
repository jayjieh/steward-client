/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResponseWrapper } from './entities/wrappers/response-wrapper';
export class StewardConfig {
}
if (false) {
    /** @type {?} */
    StewardConfig.prototype.base_url;
    /** @type {?} */
    StewardConfig.prototype.access_token;
    /** @type {?} */
    StewardConfig.prototype.headers;
}
/**
 * @template T, E
 */
export class StewardClientService {
    /**
     * @param {?} http
     * @param {?} config
     */
    constructor(http, config) {
        this.http = http;
        this.config = config;
        this.base_url = '/';
        this.base_url = config.base_url;
        if (config.headers) {
            // this.headers = config.headers.append('Content-Type', 'application/json; charset=utf-8');
            this.headers = config.headers;
        }
        else {
            this.headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8'
            });
        }
        if (config.access_token) {
            this.headers = this.headers.append('Authorization', 'Bearer ' + config.access_token);
        }
    }
    /**
     * Used to handle http post requests
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    post(endpoint, data) {
        return this.http.post(this.base_url + endpoint, JSON.stringify(data), { headers: this.headers.append('Content-Type', 'application/json; charset=utf-8') }).pipe(catchError(this.handleError()));
    }
    /**
     * Used to handle http post requests
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    put(endpoint, data) {
        return this.http.put(this.base_url + endpoint, JSON.stringify(data), { headers: this.headers.append('Content-Type', 'application/json; charset=utf-8') }).pipe(catchError(this.handleError()));
    }
    /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    delete(endpoint, data) {
        return this.http.request('delete', this.base_url + endpoint, { headers: this.headers.append('Content-Type', 'application/json; charset=utf-8'), body: JSON.stringify(data) }).pipe(catchError(this.handleError()));
    }
    /**
     * @param {?} endpoint
     * @param {?=} data
     * @return {?}
     */
    get(endpoint, data) {
        /** @type {?} */
        const options = {
            headers: this.headers,
            params: this.getHttpParams(data)
        };
        return this.http.get(this.base_url + endpoint, options).pipe(catchError(this.handleError()));
    }
    /**
     * @param {?} endpoint
     * @param {?=} data
     * @return {?}
     */
    getFile(endpoint, data) {
        /** @type {?} */
        const options = {
            params: this.getHttpParams(data)
        };
        return this.http.get(this.base_url + endpoint + '?access_token=' + this.token, options).pipe(catchError(this.handleError()));
    }
    /**
     * if
     * @param {?} endpoint
     * @param {?} data
     * @param {?=} headers
     * @return {?}
     */
    postFormData(endpoint, data, headers) {
        /** @type {?} */
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        if (this.headers.get('Authorization') && (!headers)) {
            headers = this.headers; // new HttpHeaders({'Authorization': 'Bearer ' + this.config.access_token});
        }
        else if (!headers) {
            headers = new HttpHeaders();
        }
        return this.http.post(this.base_url + endpoint, formData, { headers: headers }).pipe(catchError(this.handleError()));
    }
    /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    postFormDataMultipart(endpoint, data) {
        /** @type {?} */
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
                data[key].forEach(k2 => {
                    formData.append(key, k2);
                });
            }
            else {
                formData.append(key, data[key]);
            }
        });
        return this.http.post(this.base_url + endpoint, formData, { headers: this.headers }).pipe(catchError(this.handleError()));
    }
    /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    putFormDataMultiPart(endpoint, data) {
        /** @type {?} */
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
                data[key].forEach(k2 => {
                    formData.append(key, k2);
                });
            }
            else {
                formData.append(key, data[key]);
            }
        });
        return this.http.put(this.base_url + endpoint, formData, { headers: this.headers }).pipe(catchError(this.handleError()));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    getHttpParams(data) {
        if (data === undefined) {
            return new HttpParams();
        }
        /** @type {?} */
        let httpParams = new HttpParams();
        data.forEach((value, key) => {
            httpParams = httpParams.append(key, value);
        });
        return httpParams;
    }
    /**
     * Used to catch exception thrown by http client returns internal server error
     * if status 500 is encountered
     * @template ResponseWrapper
     * @return {?}
     */
    handleError() {
        return (error) => {
            /** @type {?} */
            const res = new ResponseWrapper();
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
    }
    /**
     * Used to render action buttons
     * @param {?} id
     * @return {?}
     */
    static renderMore(id) {
        return '<div class=\'actions-buttons center\' id=\'' + id + '\'><i class=\'fa fa-check\' title=\'Approve\'></i> <i class=\'fa fa-ban\' title=\'Decline\'></i></div>';
    }
    /**
     * @param {?} endpoint
     * @param {?=} data
     * @return {?}
     */
    intiateDataTable(endpoint, data) {
        /** @type {?} */
        const options = {
            headers: this.headers,
            params: this.getHttpParams(data)
        };
        return this.http.get(this.base_url + endpoint, options).pipe(catchError(this.handleError()));
    }
}
StewardClientService.decorators = [
    { type: Injectable },
];
StewardClientService.ctorParameters = () => [
    { type: HttpClient },
    { type: StewardConfig }
];
if (false) {
    /** @type {?} */
    StewardClientService.prototype.headers;
    /** @type {?} */
    StewardClientService.prototype.token;
    /** @type {?} */
    StewardClientService.prototype.base_url;
    /** @type {?} */
    StewardClientService.prototype.http;
    /** @type {?} */
    StewardClientService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFVBQVUsRUFBcUIsV0FBVyxFQUFFLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzVGLE9BQU8sRUFBYSxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUVyRSxNQUFNO0NBSUw7OztJQUhDLGlDQUFpQjs7SUFDakIscUNBQXNCOztJQUN0QixnQ0FBc0I7Ozs7O0FBSXhCLE1BQU07Ozs7O0lBTUosWUFBb0IsSUFBZ0IsRUFBVSxNQUFxQjtRQUEvQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUZuRSxhQUFRLEdBQUcsR0FBRyxDQUFDO1FBR2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ25CLDJGQUEyRjtZQUMzRixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDaEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQztnQkFDN0IsY0FBYyxFQUFFLGlDQUFpQzthQUNsRCxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDeEIs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OztJQUtELE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBTztRQUN2QixNQUFNLENBQUMsNkNBQTZDLEdBQUcsRUFBRSxHQUFHLHdHQUF3RyxDQUFDO0lBQ3ZLLENBQUM7Ozs7OztJQUVNLGdCQUFnQixDQUFDLFFBQWdCLEVBQUUsSUFBMEI7O2NBQzVELE9BQU8sR0FBRztZQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7U0FDakM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUMxRCxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBTyxDQUFDLENBQ3BDLENBQUM7SUFDSixDQUFDOzs7WUFyS0YsVUFBVTs7O1lBWEgsVUFBVTtZQWtCc0MsYUFBYTs7OztJQUpuRSx1Q0FBNkI7O0lBQzdCLHFDQUFjOztJQUNkLHdDQUFlOztJQUVILG9DQUF3Qjs7SUFBRSxzQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXN9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtjYXRjaEVycm9yfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1Jlc3BvbnNlV3JhcHBlcn0gZnJvbSAnLi9lbnRpdGllcy93cmFwcGVycy9yZXNwb25zZS13cmFwcGVyJztcblxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDb25maWcge1xuICBiYXNlX3VybDogc3RyaW5nO1xuICBhY2Nlc3NfdG9rZW4/OiBzdHJpbmc7XG4gIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDbGllbnRTZXJ2aWNlPFQsIEU+IHtcblxuICBwcml2YXRlIGhlYWRlcnM6IEh0dHBIZWFkZXJzO1xuICB0b2tlbjogc3RyaW5nO1xuICBiYXNlX3VybCA9ICcvJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgY29uZmlnOiBTdGV3YXJkQ29uZmlnKSB7XG4gICAgdGhpcy5iYXNlX3VybCA9IGNvbmZpZy5iYXNlX3VybDtcbiAgICBpZiAoY29uZmlnLmhlYWRlcnMpIHtcbiAgICAgIC8vIHRoaXMuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHRoaXMuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZy5hY2Nlc3NfdG9rZW4pIHsvLyBhcHBlbmQgYWNjZXNzIHRva2VuIGlmIHRoZSBlbnZpcm9ubWVudCBoYXMgYWNjZXNzIHRva2VuXG4gICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgY29uZmlnLmFjY2Vzc190b2tlbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gaGFuZGxlIGh0dHAgcG9zdCByZXF1ZXN0c1xuICAgKi9cbiAgcG9zdChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBKU09OLnN0cmluZ2lmeShkYXRhKSwge2hlYWRlcnM6IHRoaXMuaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyl9KS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gaGFuZGxlIGh0dHAgcG9zdCByZXF1ZXN0c1xuICAgKi9cbiAgcHV0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIHtoZWFkZXJzOiB0aGlzLmhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpfSkucGlwZShcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgKTtcbiAgfVxuXG4gIGRlbGV0ZShlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QoJ2RlbGV0ZScsIHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwge2hlYWRlcnM6IHRoaXMuaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyksIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpfSkucGlwZShcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgKTtcbiAgfVxuXG4gIGdldChlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIG9wdGlvbnMpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICk7XG4gIH1cblxuXG4gIGdldEZpbGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBwYXJhbXM6IHRoaXMuZ2V0SHR0cFBhcmFtcyhkYXRhKVxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlX3VybCArIGVuZHBvaW50ICsgJz9hY2Nlc3NfdG9rZW49JyArIHRoaXMudG9rZW4sIG9wdGlvbnMpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogaWZcbiAgICogQHBhcmFtIGVuZHBvaW50XG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBwYXJhbSBoZWFkZXJzXG4gICAqL1xuICBwb3N0Rm9ybURhdGEoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCwgaGVhZGVycz86IEh0dHBIZWFkZXJzKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuaGVhZGVycy5nZXQoJ0F1dGhvcml6YXRpb24nKSAmJiAoIWhlYWRlcnMpKSB7XG4gICAgICBoZWFkZXJzID0gdGhpcy5oZWFkZXJzOyAvLyBuZXcgSHR0cEhlYWRlcnMoeydBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy5jb25maWcuYWNjZXNzX3Rva2VufSk7XG4gICAgfSBlbHNlIGlmICghaGVhZGVycykge1xuICAgICAgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBmb3JtRGF0YSwge2hlYWRlcnM6IGhlYWRlcnN9KS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICApO1xuICB9XG5cbiAgcG9zdEZvcm1EYXRhTXVsdGlwYXJ0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSkge1xuICAgICAgICBkYXRhW2tleV0uZm9yRWFjaChrMiA9PiB7XG4gICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgazIpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgZm9ybURhdGEsIHtoZWFkZXJzOiB0aGlzLmhlYWRlcnN9KS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICApO1xuICB9XG5cbiAgcHV0Rm9ybURhdGFNdWx0aVBhcnQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhW2tleV0pKSB7XG4gICAgICAgIGRhdGFba2V5XS5mb3JFYWNoKGsyID0+IHtcbiAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBrMik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIGZvcm1EYXRhLCB7aGVhZGVyczogdGhpcy5oZWFkZXJzfSkucGlwZShcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SHR0cFBhcmFtcyhkYXRhOiBNYXA8c3RyaW5nLCBzdHJpbmc+KTogSHR0cFBhcmFtcyB7XG4gICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgfVxuICAgIGxldCBodHRwUGFyYW1zOiBIdHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICBkYXRhLmZvckVhY2goKHZhbHVlOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBjYXRjaCBleGNlcHRpb24gdGhyb3duIGJ5IGh0dHAgY2xpZW50IHJldHVybnMgaW50ZXJuYWwgc2VydmVyIGVycm9yXG4gICAqIGlmIHN0YXR1cyA1MDAgaXMgZW5jb3VudGVyZWRcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlRXJyb3I8UmVzcG9uc2VXcmFwcGVyPigpIHtcbiAgICByZXR1cm4gKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSk6IE9ic2VydmFibGU8YW55PiA9PiB7XG4gICAgICBjb25zdCByZXMgPSBuZXcgUmVzcG9uc2VXcmFwcGVyKCk7XG4gICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpOyAvLyBsb2cgdG8gY29uc29sZSBpbnN0ZWFkXG4gICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA1MDApIHtcbiAgICAgICAgcmVzLmNvZGUgPSBlcnJvci5zdGF0dXM7XG4gICAgICAgIHJlcy5tZXNzYWdlID0gJ1NvcnJ5IGludGVybmFsIHNlcnZlciBlcnJvciBvY2N1cmVkIHBsZWFzZSB0cnkgYWdhaW4gbGF0ZXInO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLmNvZGUgPSBlcnJvci5zdGF0dXM7XG4gICAgICAgIHJlcy5tZXNzYWdlID0gZXJyb3IuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgcmVzLmRhdGEgPSBlcnJvci5lcnJvci5kYXRhO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9mKHJlcyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIHJlbmRlciBhY3Rpb24gYnV0dG9uc1xuICAgKi9cbiAgc3RhdGljIHJlbmRlck1vcmUoaWQ6IGFueSkge1xuICAgIHJldHVybiAnPGRpdiBjbGFzcz1cXCdhY3Rpb25zLWJ1dHRvbnMgY2VudGVyXFwnIGlkPVxcJycgKyBpZCArICdcXCc+PGkgY2xhc3M9XFwnZmEgZmEtY2hlY2tcXCcgdGl0bGU9XFwnQXBwcm92ZVxcJz48L2k+IDxpIGNsYXNzPVxcJ2ZhIGZhLWJhblxcJyB0aXRsZT1cXCdEZWNsaW5lXFwnPjwvaT48L2Rpdj4nO1xuICB9XG5cbiAgcHVibGljIGludGlhdGVEYXRhVGFibGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4pIHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgcGFyYW1zOiB0aGlzLmdldEh0dHBQYXJhbXMoZGF0YSlcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgb3B0aW9ucykucGlwZShcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgKTtcbiAgfVxufVxuIl19