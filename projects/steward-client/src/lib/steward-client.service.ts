import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ResponseWrapper } from './entities/wrappers/response-wrapper';

export class StewardConfig {
    base_url: string;
    access_token?: string;
    headers?: HttpHeaders;
}

@Injectable()
export class StewardClientService<T, E> {

    private headers: HttpHeaders;
    token: string;
    base_url: string = "/";

    constructor(private http: HttpClient, config: StewardConfig) {
        this.base_url = config.base_url;
        if (config.headers) {
            this.headers = config.headers.append('Content-Type', 'application/json; charset=utf-8');
        } else {
            this.headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8'
            });
        }
        if (config.access_token) {//append access token if the environment has access token
            this.headers = this.headers.append('Authorization', "Bearer " + config.access_token);
        }
    }
    /**
     * Used to handle http post requests
     */
    post(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
        return this.http.post(this.base_url + endpoint, JSON.stringify(data), { headers: this.headers }).pipe(
            catchError(this.handleError<any>())
        );
    }

    /**
     * Used to handle http post requests
     */
    put(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
        return this.http.put(this.base_url + endpoint, JSON.stringify(data), { headers: this.headers }).pipe(
            catchError(this.handleError<any>())
        );
    }

    delete(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
        return this.http.request('delete', this.base_url + endpoint, { headers: this.headers, body: JSON.stringify(data) }).pipe(
            catchError(this.handleError<any>())
        );
    }

    get(endpoint: string, data?: Map<string, string>): Observable<ResponseWrapper<E>> {
        const options = {
            headers: this.headers,
            params: this.getHttpParams(data)
        };
        return this.http.get(this.base_url + endpoint, options).pipe(
            catchError(this.handleError<any>())
        );
    }


    getFile(endpoint: string, data?: Map<string, string>): Observable<ResponseWrapper<E>> {
        const options = {
            params: this.getHttpParams(data)
        };
        return this.http.get(this.base_url + endpoint + '?access_token=' + this.token, options).pipe(
            catchError(this.handleError<any>())
        );
    }

    postFormData(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
        const formData: FormData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        return this.http.post(this.base_url + endpoint, formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(
            catchError(this.handleError<any>())
        );
    }

    postFormDataMultipart(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
        const formData: FormData = new FormData();
        Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
                data[key].forEach(k2 => {
                    formData.append(key, k2);
                });
            } else {
                formData.append(key, data[key]);
            }
        });
        return this.http.post(this.base_url + endpoint, formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(
            catchError(this.handleError<any>())
        );
    }

    putFormDataMultiPart(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
        const formData: FormData = new FormData();
        Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
                data[key].forEach(k2 => {
                    formData.append(key, k2);
                });
            } else {
                formData.append(key, data[key]);
            }
        });
        return this.http.put(this.base_url + endpoint, formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(
            catchError(this.handleError<any>())
        );
    }

    private getHttpParams(data: Map<string, string>): HttpParams {
        if (data == undefined) {
            return new HttpParams();
        }
        let httpParams: HttpParams = new HttpParams();
        data.forEach((value: string, key: string) => {
            httpParams = httpParams.append(key, value);
        });
        return httpParams;
    }
    /**
     * Used to catch exception thrown by http client returns internal server error
     * if status 500 is encountered
     */
    private handleError<ResponseWrapper>() {
        return (error: HttpErrorResponse): Observable<any> => {
            const res = new ResponseWrapper();
            //            console.error(error); // log to console instead
            if (error.status == 500) {
                res.code = error.status;
                res.message = 'Sorry internal server error occured please try again later';
            } else {
                res.code = error.status;
                res.message = error.error.message;
                res.data = error.error.data;
            }
            return of(res);
        };
    }
    /**
     * Used to render action buttons
     */
    static renderMore(id: any) {
        return '<div class=\'actions-buttons center\' id=\'' + id + '\'><i class=\'fa fa-check\' title=\'Approve\'></i> <i class=\'fa fa-ban\' title=\'Decline\'></i></div>';
    }

    public intiateDataTable(endpoint: string, data?: Map<string, string>) {
        const options = {
            headers: this.headers,
            params: this.getHttpParams(data)
        };
        return this.http.get(this.base_url + endpoint, options).pipe(
            catchError(this.handleError<any>())
        );
    }
}
