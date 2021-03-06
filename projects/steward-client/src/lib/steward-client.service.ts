import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ResponseWrapper} from './entities/wrappers/response-wrapper';
import {Meta} from '@angular/platform-browser';

export class StewardConfig {
  base_url: string;
  access_token?: string;
  headers?: HttpHeaders;
  csrf: boolean;
}

@Injectable()
export class StewardClientService<T, E> {

  private headers: HttpHeaders;
  token: string;
  base_url = '/';
  csrf: string;

  private headersPlain: HttpHeaders;

  constructor(private http: HttpClient, private config: StewardConfig, private meta: Meta) {
    if (config.csrf == true) {
      this.csrf = this.meta.getTag('name=_csrf').content;
    }

    this.base_url = config.base_url;
    if (config.headers) {
      this.headers = config.headers;
    } else {
      if (config.csrf == true) {
        this.headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'X-CSRF-TOKEN': this.csrf
        });
      } else {
        this.headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        });
      }
    }
    if (config.access_token) {
      if (config.csrf == true) {
        this.headers = this.headers.append('X-CSRF-TOKEN', this.csrf);
      } else {
        this.headers = this.headers.append('Authorization', 'Bearer ' + config.access_token);
      }
    }

    if (config.csrf == true) {
      this.headersPlain = new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'X-CSRF-TOKEN': this.csrf
      });
    } else {
      this.headersPlain = new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      });
    }
  }

  /**
   * Used to handle http post requests
   */
  post(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.post(this.base_url + endpoint, JSON.stringify(data), {headers: this.headers.append('Content-Type', 'application/json; charset=utf-8')}).pipe(
      catchError(this.handleError<any>())
    );
  }

  postNoToken(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    if (this.config.csrf == true) {
      return this.http.post(this.base_url + endpoint, JSON.stringify(data), {headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8', 'X-CSRF-TOKEN': this.csrf})}).pipe(
        catchError(this.handleError<any>())
      );
    } else {
      return this.http.post(this.base_url + endpoint, JSON.stringify(data), {headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})}).pipe(
        catchError(this.handleError<any>())
      );
    }

  }

  postLogin(endpoint: string, data: T): Observable<any> {
    return this.http.post(endpoint, data, {
      headers: this.headersPlain
    }).pipe(
      catchError(this.handleError<any>())
    );
  }

  /**
   * Used to handle http post requests
   */
  put(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.put(this.base_url + endpoint, JSON.stringify(data), {headers: this.headers.append('Content-Type', 'application/json; charset=utf-8')}).pipe(
      catchError(this.handleError<any>())
    );
  }

  delete(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.request('delete', this.base_url + endpoint, {
      headers: this.headers.append('Content-Type', 'application/json; charset=utf-8'),
      body: JSON.stringify(data)
    }).pipe(
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

  /**
   * if
   * @param endpoint
   * @param data
   * @param headers
   */
  postFormData(endpoint: string, data: T, headers?: HttpHeaders): Observable<ResponseWrapper<E>> {
    const formData: FormData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    if (this.headers.get('Authorization') && (!headers)) {
      headers = this.headers;
    } else if (!headers) {
      headers = new HttpHeaders();
    }
    return this.http.post(this.base_url + endpoint, formData, {headers: headers}).pipe(
      catchError(this.handleError<any>())
    );
  }

  postFormAuthorized(endpoint: string, data: T, headers?: HttpHeaders): Observable<ResponseWrapper<E>> {
    return this.http.post(this.base_url + endpoint, data, {headers: this.headersPlain}).pipe(
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
    if (this.config.csrf == true) {
      return this.http.post(this.base_url + endpoint, formData, {headers: new HttpHeaders({'X-CSRF-TOKEN': this.csrf})}).pipe(
        catchError(this.handleError<any>())
      );
    } else {
      return this.http.post(this.base_url + endpoint, formData, {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('access_token')})}).pipe(
        catchError(this.handleError<any>())
      );
    }
  }

  private getHttpParams(data: Map<string, string>): HttpParams {
    if (data === undefined) {
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
      if (error.status === 500) {
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
