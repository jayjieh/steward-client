import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseWrapper } from './entities/wrappers/response-wrapper';
export declare class StewardConfig {
    base_url: string;
    access_token?: string;
    headers?: HttpHeaders;
}
export declare class StewardClientService<T, E> {
    private http;
    private headers;
    token: string;
    base_url: string;
    constructor(http: HttpClient, config: StewardConfig);
    /**
     * Used to handle http post requests
     */
    post(endpoint: string, data: T): Observable<ResponseWrapper<E>>;
    /**
     * Used to handle http post requests
     */
    put(endpoint: string, data: T): Observable<ResponseWrapper<E>>;
    delete(endpoint: string, data: T): Observable<ResponseWrapper<E>>;
    get(endpoint: string, data?: Map<string, string>): Observable<ResponseWrapper<E>>;
    getFile(endpoint: string, data?: Map<string, string>): Observable<ResponseWrapper<E>>;
    postFormData(endpoint: string, data: T): Observable<ResponseWrapper<E>>;
    postFormDataMultipart(endpoint: string, data: T): Observable<ResponseWrapper<E>>;
    putFormDataMultiPart(endpoint: string, data: T): Observable<ResponseWrapper<E>>;
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
