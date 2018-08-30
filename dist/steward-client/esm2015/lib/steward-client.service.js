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
        this.base_url = "/";
        this.base_url = config.base_url;
        if (config.headers) {
            this.headers = config.headers.append('Content-Type', 'application/json; charset=utf-8');
        }
        else {
            this.headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8'
            });
        }
        if (config.access_token) {
            //append access token if the environment has access token
            this.headers = this.headers.append('Authorization', "Bearer " + config.access_token);
        }
    }
    /**
     * Used to handle http post requests
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    post(endpoint, data) {
        return this.http.post(this.base_url + endpoint, JSON.stringify(data), { headers: this.headers }).pipe(catchError(this.handleError()));
    }
    /**
     * Used to handle http post requests
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    put(endpoint, data) {
        return this.http.put(this.base_url + endpoint, JSON.stringify(data), { headers: this.headers }).pipe(catchError(this.handleError()));
    }
    /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    delete(endpoint, data) {
        return this.http.request('delete', this.base_url + endpoint, { headers: this.headers, body: JSON.stringify(data) }).pipe(catchError(this.handleError()));
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
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    postFormData(endpoint, data) {
        /** @type {?} */
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        return this.http.post(this.base_url + endpoint, formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(catchError(this.handleError()));
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
        return this.http.post(this.base_url + endpoint, formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(catchError(this.handleError()));
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
        return this.http.put(this.base_url + endpoint, formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(catchError(this.handleError()));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    getHttpParams(data) {
        if (data == undefined) {
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
            if (error.status == 500) {
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
/** @nocollapse */
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
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3N0ZXdhcmQtY2xpZW50LyIsInNvdXJjZXMiOlsibGliL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQXFCLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlGLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUV2RSxNQUFNO0NBSUw7Ozs7Ozs7Ozs7OztBQUdELE1BQU07Ozs7O0lBTUYsWUFBb0IsSUFBZ0IsRUFBRSxNQUFxQjtRQUF2QyxTQUFJLEdBQUosSUFBSSxDQUFZO3dCQUZqQixHQUFHO1FBR2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO1NBQzNGO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDO2dCQUMzQixjQUFjLEVBQUUsaUNBQWlDO2FBQ3BELENBQUMsQ0FBQztTQUNOO1FBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7O1lBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFF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Q0FBQyxDQUN0QyxDQUFDOzs7O1lBckpULFVBQVU7Ozs7WUFYRixVQUFVO1lBa0IrQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUmVzcG9uc2VXcmFwcGVyIH0gZnJvbSAnLi9lbnRpdGllcy93cmFwcGVycy9yZXNwb25zZS13cmFwcGVyJztcblxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDb25maWcge1xuICAgIGJhc2VfdXJsOiBzdHJpbmc7XG4gICAgYWNjZXNzX3Rva2VuPzogc3RyaW5nO1xuICAgIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDbGllbnRTZXJ2aWNlPFQsIEU+IHtcblxuICAgIHByaXZhdGUgaGVhZGVyczogSHR0cEhlYWRlcnM7XG4gICAgdG9rZW46IHN0cmluZztcbiAgICBiYXNlX3VybDogc3RyaW5nID0gXCIvXCI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIGNvbmZpZzogU3Rld2FyZENvbmZpZykge1xuICAgICAgICB0aGlzLmJhc2VfdXJsID0gY29uZmlnLmJhc2VfdXJsO1xuICAgICAgICBpZiAoY29uZmlnLmhlYWRlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy5hY2Nlc3NfdG9rZW4pIHsvL2FwcGVuZCBhY2Nlc3MgdG9rZW4gaWYgdGhlIGVudmlyb25tZW50IGhhcyBhY2Nlc3MgdG9rZW5cbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCBcIkJlYXJlciBcIiArIGNvbmZpZy5hY2Nlc3NfdG9rZW4pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gaGFuZGxlIGh0dHAgcG9zdCByZXF1ZXN0c1xuICAgICAqL1xuICAgIHBvc3QoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGhhbmRsZSBodHRwIHBvc3QgcmVxdWVzdHNcbiAgICAgKi9cbiAgICBwdXQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGRlbGV0ZShlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0KCdkZWxldGUnLCB0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzLCBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSB9KS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgcGFyYW1zOiB0aGlzLmdldEh0dHBQYXJhbXMoZGF0YSlcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBvcHRpb25zKS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG5cblxuICAgIGdldEZpbGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4pOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgcGFyYW1zOiB0aGlzLmdldEh0dHBQYXJhbXMoZGF0YSlcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlX3VybCArIGVuZHBvaW50ICsgJz9hY2Nlc3NfdG9rZW49JyArIHRoaXMudG9rZW4sIG9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHBvc3RGb3JtRGF0YShlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICAgICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIGZvcm1EYXRhLCB7IGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7ICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy50b2tlbiB9KSB9KS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwb3N0Rm9ybURhdGFNdWx0aXBhcnQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhW2tleV0uZm9yRWFjaChrMiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGsyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIGZvcm1EYXRhLCB7IGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7ICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy50b2tlbiB9KSB9KS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdXRGb3JtRGF0YU11bHRpUGFydChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICAgICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSkge1xuICAgICAgICAgICAgICAgIGRhdGFba2V5XS5mb3JFYWNoKGsyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgazIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBmb3JtRGF0YSwgeyBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoeyAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMudG9rZW4gfSkgfSkucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRIdHRwUGFyYW1zKGRhdGE6IE1hcDxzdHJpbmcsIHN0cmluZz4pOiBIdHRwUGFyYW1zIHtcbiAgICAgICAgaWYgKGRhdGEgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaHR0cFBhcmFtczogSHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIGRhdGEuZm9yRWFjaCgodmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGNhdGNoIGV4Y2VwdGlvbiB0aHJvd24gYnkgaHR0cCBjbGllbnQgcmV0dXJucyBpbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcbiAgICAgKiBpZiBzdGF0dXMgNTAwIGlzIGVuY291bnRlcmVkXG4gICAgICovXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcjxSZXNwb25zZVdyYXBwZXI+KCkge1xuICAgICAgICByZXR1cm4gKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSk6IE9ic2VydmFibGU8YW55PiA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBuZXcgUmVzcG9uc2VXcmFwcGVyKCk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpOyAvLyBsb2cgdG8gY29uc29sZSBpbnN0ZWFkXG4gICAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09IDUwMCkge1xuICAgICAgICAgICAgICAgIHJlcy5jb2RlID0gZXJyb3Iuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlcy5tZXNzYWdlID0gJ1NvcnJ5IGludGVybmFsIHNlcnZlciBlcnJvciBvY2N1cmVkIHBsZWFzZSB0cnkgYWdhaW4gbGF0ZXInO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXMuY29kZSA9IGVycm9yLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXMubWVzc2FnZSA9IGVycm9yLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgcmVzLmRhdGEgPSBlcnJvci5lcnJvci5kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9mKHJlcyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gcmVuZGVyIGFjdGlvbiBidXR0b25zXG4gICAgICovXG4gICAgc3RhdGljIHJlbmRlck1vcmUoaWQ6IGFueSkge1xuICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XFwnYWN0aW9ucy1idXR0b25zIGNlbnRlclxcJyBpZD1cXCcnICsgaWQgKyAnXFwnPjxpIGNsYXNzPVxcJ2ZhIGZhLWNoZWNrXFwnIHRpdGxlPVxcJ0FwcHJvdmVcXCc+PC9pPiA8aSBjbGFzcz1cXCdmYSBmYS1iYW5cXCcgdGl0bGU9XFwnRGVjbGluZVxcJz48L2k+PC9kaXY+JztcbiAgICB9XG5cbiAgICBwdWJsaWMgaW50aWF0ZURhdGFUYWJsZShlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPikge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgcGFyYW1zOiB0aGlzLmdldEh0dHBQYXJhbXMoZGF0YSlcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBvcHRpb25zKS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG59XG4iXX0=