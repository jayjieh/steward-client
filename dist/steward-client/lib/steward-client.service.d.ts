import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseWrapper } from './entities/wrappers/response-wrapper';
import { Meta } from '@angular/platform-browser';
export declare class StewardConfig {
    base_url: string;
    access_token?: string;
    headers?: HttpHeaders;
    csrf: boolean;
}
export declare class StewardClientService<T, E> {
    private http;
    private config;
    private meta;
    private headers;
    token: string;
    base_url: string;
    csrf: string;
    private headersPlain;
    constructor(http: HttpClient, config: StewardConfig, meta: Meta);
    /**
     * Used to handle http post requests
     */
    post(endpoint: string, data: T): Observable<ResponseWrapper<E>>;
    postNoToken(endpoint: string, data: T): Observable<ResponseWrapper<E>>;
    postLogin(endpoint: string, data: T): Observable<any>;
    /**
     * Used to handle http post requests
     */
    put(endpoint: string, data: T): Observable<ResponseWrapper<E>>;
    delete(endpoint: string, data: T): Observable<ResponseWrapper<E>>;
    get(endpoint: string, data?: Map<string, string>): Observable<ResponseWrapper<E>>;
    /**
     * if
     * @param endpoint
     * @param data
     * @param headers
     */
    postFormData(endpoint: string, data: T, headers?: HttpHeaders): Observable<ResponseWrapper<E>>;
    postFormAuthorized(endpoint: string, data: T, headers?: HttpHeaders): Observable<ResponseWrapper<E>>;
    postFormDataMultipart(endpoint: string, data: T): Observable<ResponseWrapper<E>>;
    private getHttpParams(data);
    /**
     * Used to catch exception thrown by http client returns internal server error
     * if status 500 is encountered
     */
    private handleError<ResponseWrapper>();
    /**
     * Used to render action buttons
     */
    static renderMore(id: any): string;
    intiateDataTable(endpoint: string, data?: Map<string, string>): Observable<any>;
}
