import { Injectable, Component, EventEmitter, Input, Output, ViewChild, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Meta } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Queue } from 'queue-typescript';
import { DatePipe, CommonModule } from '@angular/common';
import { ExportAsService, ExportAsModule } from 'ngx-export-as';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Wraps server response
 * @template T
 */
class ResponseWrapper {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StewardConfig {
}
/**
 * @template T, E
 */
class StewardClientService {
    /**
     * @param {?} http
     * @param {?} config
     * @param {?} meta
     */
    constructor(http, config, meta) {
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
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    post(endpoint, data) {
        return this.http.post(this.base_url + endpoint, JSON.stringify(data), { headers: this.headers.append('Content-Type', 'application/json; charset=utf-8') }).pipe(catchError(this.handleError()));
    }
    /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    postNoToken(endpoint, data) {
        if (this.config.csrf == true) {
            return this.http.post(this.base_url + endpoint, JSON.stringify(data), { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'X-CSRF-TOKEN': this.csrf }) }).pipe(catchError(this.handleError()));
        }
        else {
            return this.http.post(this.base_url + endpoint, JSON.stringify(data), { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) }).pipe(catchError(this.handleError()));
        }
    }
    /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    postLogin(endpoint, data) {
        return this.http.post(endpoint, data, {
            headers: this.headersPlain
        }).pipe(catchError(this.handleError()));
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
        return this.http.request('delete', this.base_url + endpoint, {
            headers: this.headers.append('Content-Type', 'application/json; charset=utf-8'),
            body: JSON.stringify(data)
        }).pipe(catchError(this.handleError()));
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
            headers = this.headers;
        }
        else if (!headers) {
            headers = new HttpHeaders();
        }
        return this.http.post(this.base_url + endpoint, formData, { headers: headers }).pipe(catchError(this.handleError()));
    }
    /**
     * @param {?} endpoint
     * @param {?} data
     * @param {?=} headers
     * @return {?}
     */
    postFormAuthorized(endpoint, data, headers) {
        return this.http.post(this.base_url + endpoint, data, { headers: this.headersPlain }).pipe(catchError(this.handleError()));
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
        if (this.config.csrf == true) {
            return this.http.post(this.base_url + endpoint, formData, { headers: new HttpHeaders({ 'X-CSRF-TOKEN': this.csrf }) }).pipe(catchError(this.handleError()));
        }
        else {
            return this.http.post(this.base_url + endpoint, formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) }).pipe(catchError(this.handleError()));
        }
    }
    /**
     * @private
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
     * @private
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
    { type: StewardConfig },
    { type: Meta }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StewardClientComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
StewardClientComponent.decorators = [
    { type: Component, args: [{
                selector: 'stw-steward-client',
                template: `
    <p>
      steward-client works!
    </p>
  `,
                styles: []
            },] },
];
StewardClientComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Datable page used to wrapper server content response
 * @template T
 */
class Page {
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
/**
 * used to map sort request
 */
class Sort {
    /**
     * used to map sort request
     */
    constructor() {
        this.sorted = false;
        this.unsorted = true;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Represents dynamic html controls (Input, TextArea and Select)
 * @template T
 */
class MlkDynamicControl {
    /**
     * @param {?} label
     * @param {?} name
     * @param {?} controlType
     * @param {?=} icon
     * @param {?=} isRequired
     * @param {?=} placeholder
     */
    constructor(label, name, controlType, icon = "fa fa-file-text-o", isRequired = true, placeholder = null) {
        /**
         * Control placeholder
         */
        this.placeholder = "";
        this.label = label;
        this.name = name;
        this.controlType = controlType;
        this.icon = icon;
        this.isRequired = isRequired;
        this.placeholder = placeholder ? placeholder : label;
    }
}
/**
 * Used to represent html input with options:
 * type: default to text,  maxLength, minLength, min, max
 */
class MlkInput {
    /**
     * @param {?=} type
     */
    constructor(type = "text") {
        /**
         * Type of input e.g. text, number, date
         */
        this.type = "text";
        this.type = type;
        this.minLength = this.min = 0;
        this.maxLength = 4000;
        this.max = 1000000000;
    }
}
/**
 * Represents html textarea input
 */
class MlkTextarea {
    /**
     * @param {?=} cols
     * @param {?=} rows
     */
    constructor(cols = 5, rows = 1) {
        this.cols = cols;
        this.rows = rows;
        this.maxLength = 4000;
        this.minLength = 0;
    }
}
/**
 * Represents html select control
 */
class MlkSelect {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.options = options;
    }
}
class MlkSelectOption {
    /**
     * @param {?} value
     * @param {?=} text
     */
    constructor(value, text = null) {
        this.value = value;
        this.text = text ? text : value;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// const { Queue } = require('queue-typescript');
class MlkDatatableComponent {
    /**
     * @param {?} sterwardService
     * @param {?} datePipe
     * @param {?} exportAsService
     */
    constructor(sterwardService, datePipe, exportAsService) {
        this.sterwardService = sterwardService;
        this.datePipe = datePipe;
        this.exportAsService = exportAsService;
        this.tableRowHeight = 50;
        this.tableFooterHeight = 50;
        this.tableHeaderHeight = 50;
        this.verticalScrollActive = false;
        this.horizontalScrollActive = false;
        this.columns = [];
        this.enableCheckbox = false;
        this.enableFilterHeader = false;
        this.enableDefaultTableHeader = false;
        this.enableSummary = false;
        this.summaryPosition = '\'bottom\'';
        this.summaryHeight = '\'auto\'';
        this.onActionsEvent = new EventEmitter();
        this.filterComponents = [];
        this.page = new Page();
        this.selected = [];
        this.onSelected = new EventEmitter();
        this.filter = {};
        this.config = {
            type: 'pdf',
            elementId: 'myTable',
            options: {
                jsPDF: {
                    orientation: 'landscape'
                }
            }
        };
    }
    /**
     * @param {?} type
     * @param {?=} opt
     * @return {?}
     */
    exportAs(type, opt) {
        this.config.type = type;
        if (opt) {
            this.config.options.jsPDF.orientation = opt;
        }
        this.exportAsService.save(this.config, 'DataExport');
        // this.exportAsService.get(this.config).subscribe(content => {
        //   console.log(content);
        // });
    }
    /**
     * Generate form control from filterComponents and also appending default controls ie. date filter and search controls
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const group = {};
        this.filterComponents.forEach(comp => {
            /** @type {?} */
            const validators = [];
            if (comp.isRequired) {
                validators.push(Validators.required);
            }
            if (comp.controlType instanceof MlkInput || comp.controlType instanceof MlkTextarea) {
                validators.push(Validators.minLength(comp.controlType.minLength));
                validators.push(Validators.maxLength(comp.controlType.maxLength));
            }
            if (comp.controlType instanceof MlkInput) {
                validators.push(Validators.max(comp.controlType.max));
                validators.push(Validators.min(comp.controlType.min));
            }
            group[comp.name] = new FormControl('', validators);
        });
        // add default controls
        group['from'] = new FormControl('', Validators.maxLength(30));
        group['to'] = new FormControl('', Validators.maxLength(30));
        group['needle'] = new FormControl('', Validators.maxLength(200));
        this.filterForm = new FormGroup(group);
        this.loadPage({ offset: 0, limit: this.page.size }, null);
    }
    /**
     * Used to emit click event of the actions
     * @param {?} event
     * @return {?}
     */
    onActionClick(event) {
        this.onActionsEvent.emit(event);
    }
    /**
     * Process server request of datable
     * @param {?} pageInfo
     * @param {?} filters
     * @return {?}
     */
    loadPage(pageInfo, filters) {
        if (!this.endpoint) {
            return;
        }
        /** @type {?} */
        let request;
        if (filters) {
            request = filters;
        }
        else {
            request = new Map();
        }
        if (this.params) {
            this.params.forEach((value, key) => {
                request.set(key, value);
            });
        }
        request.set('page', pageInfo.offset);
        request.set('size', pageInfo.limit);
        this.sterwardService.get(this.endpoint, request).subscribe(response => {
            if (response.code === 200) {
                this.page = response.data;
            }
        });
    }
    /**
     * Used to handle select option
     * @param {?} __0
     * @return {?}
     */
    onSelect({ selected }) {
        console.log('Select Event', selected, this.selected);
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
        this.onSelected.emit(this.selected);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onActivate(event) {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateFilter(event) {
    }
    /**
     * Used to process table filter. If date filter is not provide the from value is
     * set to 2018-01-01 and to value is set to 1 year from today
     * @param {?} form
     * @return {?}
     */
    processFilter(form) {
        // @ts-ignore
        /** @type {?} */
        const f = new Map(Object.entries(this.filterForm.value));
        // validate date
        if (!this.filterForm.get('from').touched) {
            f.delete('from');
            // this.filterForm.get('from').setValue('2018-01-01');
        }
        else {
            // f.get('from').setValue(new Date(this.filterForm.get('from').value));
            /** @type {?} */
            const fd = new Date(this.filterForm.get('from').value);
            // f.set('from', fd.toISOString());
            f.set('from', this.datePipe.transform(fd, 'dd/MM/yyyy'));
        }
        if (!this.filterForm.get('to').touched) {
            f.delete('to');
            // let toDate = new Date();
            // toDate.setDate(toDate.getFullYear() + 1);
            // this.filterForm.get('to').setValue(this.getFormattedDate(toDate));
        }
        else {
            // f.get('to').setValue(new Date(this.filterForm.get('to').value));
            /** @type {?} */
            const td = new Date(this.filterForm.get('to').value);
            // f.set('to', td.toISOString());
            f.set('to', this.datePipe.transform(td, 'dd/MM/yyyy'));
        }
        this.loadPage({ offset: this.page.number, limit: this.page.size }, f);
    }
    /**
     * Used to check if miliki control is input
     * @param {?} control
     * @return {?}
     */
    isInput(control) {
        return control instanceof MlkInput;
    }
    /**
     * Used to check if miliki control is select
     * @param {?} control
     * @return {?}
     */
    isSelect(control) {
        return control instanceof MlkSelect;
    }
    /**
     * @return {?}
     */
    reset() {
        this.ngOnInit();
    }
    /**
     * Used to check if miliki control is textarea
     * @param {?} control
     * @return {?}
     */
    isTextArea(control) {
        return control instanceof MlkTextarea;
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    summaryFunc(cell) {
        return (``);
    }
    /**
     * Used to format date to string yyyy-MM-dd
     * @param {?} date
     * @return {?}
     */
    getFormattedDate(date) {
        /** @type {?} */
        const year = date.getFullYear();
        /** @type {?} */
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        /** @type {?} */
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return year + '-' + month + '-' + day;
    }
    /**
     * @param {?} data
     * @param {?} field
     * @return {?}
     */
    getFieldValue(data, field) {
        /** @type {?} */
        const k = field.split('.');
        /** @type {?} */
        const keys = new Queue(...k);
        /** @type {?} */
        const value = this.getObjectValue(data, keys);
        return value;
    }
    /**
     * Used to find key value based on the key sequence provided
     * @param {?} data expects an object
     * @param {?} keys i.e. user.gender.type.type
     * @return {?}
     */
    getObjectValue(data, keys) {
        if ((!(data instanceof Object)) || (keys.length === 1)) {
            return data[keys.tail];
        }
        /** @type {?} */
        let value = null;
        Object.keys(data).forEach((key) => {
            if ((key === keys.front) && (data[key] instanceof Object)) {
                value = this.getObjectValue(data[key], keys);
            }
            else if (key === keys.tail) {
                value = data[key];
            }
        });
        return value;
    }
}
MlkDatatableComponent.decorators = [
    { type: Component, args: [{
                selector: 'stw-mlk-datatable',
                template: `<div class="card card-outline-default" *ngIf="enableFilterHeader">
  <div class="card-body">
    <form (ngSubmit)="processFilter(filterForm)" [formGroup]="filterForm">

      <div class="row">
        <div class="col-md-3  mb-3" *ngFor="let control of filterComponents">
          <label>{{control.label}}: </label>
          <div class="input-group">
            <div class="input-group-append">
                <span class="input-group-text  form-icon-default">
                  <i [class]="control.icon"></i>
                </span>
            </div>

            <select *ngIf="isSelect(control.controlType)" class="form-control form-control-sm checking-field"
                    [formControlName]="control.name">
              <option value="" disabled selected>{{control.placeholder}}</option>
              <option *ngFor="let o of control.controlType.options">{{o.text}}</option>
            </select>

            <textarea *ngIf="isTextArea(control.controlType)" [cols]="control.controlType.cols"
                      [rows]="control.controlType.rows" class="form-control form-control-sm checking-field"
                      [placeholder]="control.placeholder" [formControlName]="control.name"></textarea>

            <input *ngIf="isInput(control.controlType)" [type]="control.controlType.type"
                   [placeholder]="control.placeholder" class="form-control form-control-sm checking-field"
                   [formControlName]="control.name"/>
          </div>
          <span class="help-block" *ngIf="filterForm.get(control.name).touched">
              <span class="text-danger"
                    *ngIf="filterForm.get(control.name).hasError('required')">{{control.placeholder}} is required</span>
              <span class="text-danger"
                    *ngIf="filterForm.get(control.name).hasError('minlength')">Minimum of {{control.controlType.minLength}}
                characters</span>
              <span class="text-danger"
                    *ngIf="filterForm.get(control.name).hasError('maxlength')">Maximum of {{control.controlType.maxLength}}
                characters</span>
              <span class="text-danger"
                    *ngIf="filterForm.get(control.name).hasError('min')">Should be greater than {{control.controlType.min}}</span>
              <span class="text-danger"
                    *ngIf="filterForm.get(control.name).hasError('max')">Should be less than {{control.controlType.max}}</span>
            </span>
        </div>
      </div>

      <div class="row" *ngIf="enableDefaultTableHeader">
        <div class="col-md-3 mb-3">
          <label>From: </label>
          <div class="input-group">
            <div class="input-group-append">
                <span class="input-group-text form-icon-default">
                  <i class="fa fa-calendar-o"></i>
                </span>
            </div>
            <input
              type="text"
              class="form-control form-control-sm checking-field"
              id="inputFromDate"
              formControlName="from"
              placeholder="From..."
              #dpfrom="bsDatepicker"
              bsDatepicker
              [outsideClick]="false"
              [bsConfig]="{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }"
              maxlength="30"
              required
              readonly
            />
            <div class="input-group-append">
              <button class="btn btn-primary" type="button" (click)="dpfrom.toggle()"
                      [attr.aria-expanded]="dpfrom.isOpen"><i class="fa fa-th"></i></button>
            </div>
          </div>
          <span class="help-block" *ngIf="filterForm.get('from').touched">
                <span class="text-danger"
                      *ngIf="filterForm.get('from').hasError('maxlength')">Maximum of 30 characters</span>
            </span>
        </div>
        <div class="col-md-3 mb-3">
          <label>To: </label>
          <div class="input-group">
            <div class="input-group-append">
                <span class="input-group-text form-icon-default">
                  <i class="fa fa-calendar-o"></i>
                </span>
            </div>
            <input
              type="text"
              class="form-control form-control-sm checking-field"
              id="inputToDate"
              formControlName="to"
              placeholder="To..."
              #dpto="bsDatepicker"
              bsDatepicker
              [outsideClick]="false"
              [bsConfig]="{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }"
              maxlength="30"
              required
              readonly
            />
            <div class="input-group-append">
              <button class="btn btn-primary" type="button" (click)="dpto.toggle()" [attr.aria-expanded]="dpto.isOpen">
                <i class="fa fa-th"></i></button>
            </div>
          </div>
          <span class="help-block" *ngIf="filterForm.get('to').touched">
                <span class="text-danger"
                      *ngIf="filterForm.get('to').hasError('maxlength')">Maximum of 30 characters</span>
            </span>
        </div>
        <div class="col-md-3 mb-3">
          <label>Search:</label>
          <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text form-icon-default">
                  <i class="fa fa-search"></i>
                </span>
            </div>
            <input formControlName="needle" class="form-control form-control-sm checking-field" type="text"
                   placeholder="Search..." (keyup)="updateFilter($event)"/>
          </div>
        </div>
        <span class="help-block" *ngIf="filterForm.get('from').touched">
              <span class="text-danger"
                    *ngIf="filterForm.get('from').hasError('maxlength')">Maximum of 200 characters</span>
          </span>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="pull-right inline-buttons">
            <button class="btn btn-warning btn-sm" type="reset" (click)="reset()">
              <i class="fa fa-repeat" aria-hidden="true"></i>
              Reset
            </button>
            <button class="btn btn-success btn-sm pull-right" type="submit">
              <i class="fa fa-filter" aria-hidden="true"></i>
              Filter
            </button>
          </div>
        </div>
      </div>

    </form>
  </div>
</div>


<div class="row">
  <div class="col-md-12">
    <div class="pull-left inline-buttons">
      <button class="btn btn-outline-success btn-sm pull-left" style="margin-right: 1em;" (click)="exportAs('pdf', 'landscape')">Export pdf</button>
      <button class="btn btn-outline-primary btn-sm pull-left" style="margin-right: 1em;" (click)="exportAs('csv')">Export csv</button>
      <button class="btn btn-outline-info btn-sm pull-left" style="margin-right: 1em;" (click)="exportAs('xml')">Export xml</button>
    </div>
  </div>
</div>

<ngx-datatable
  #table
  [rowHeight]="tableRowHeight"
  [footerHeight]="tableFooterHeight"
  [headerHeight]="tableHeaderHeight"
  [scrollbarV]="verticalScrollActive"
  [scrollbarH]="horizontalScrollActive"
  [summaryRow]="enableSummary"
  [summaryPosition]="summaryPosition"
  [summaryHeight]="summaryHeight"
  class="bootstrap"
  [columnMode]="'force'"
  [rows]="page.content"
  [selected]="selected"
  [selectionType]="'checkbox'"
  (activate)="onActivate($event)"
  (select)='onSelect($event)'
  [count]="page.totalElements"
  [offset]="page.number"
  [externalPaging]="true"
  [limit]="page.size"
  (page)="loadPage($event, null)"
  id="myTable">
  <ngx-datatable-column [summaryFunc]="summaryFunc" [width]="30" [sortable]="false" [canAutoResize]="false"
                        [draggable]="true" [resizeable]="false" [headerCheckboxable]="true"
                        [checkboxable]="true" *ngIf="enableCheckbox">
  </ngx-datatable-column>
  <ngx-datatable-column [summaryFunc]="summaryFunc" [width]="30" [sortable]="false" [canAutoResize]="false"
                        [draggable]="true" [resizeable]="false" [headerCheckboxable]="true"
                        *ngFor="let c of columns; index as i;">
    <ng-template let-column="column" ngx-datatable-header-template *ngIf="i==0">
      <strong>#</strong>
    </ng-template>
    <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-row="row" *ngIf="i==0">
        <span>
            {{rowIndex + 1}}
        </span>
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column [summaryFunc]="(c.summaryFunc) ? c.summaryFunc : summaryFunc"
                        [canAutoResize]="(c.canAutoResize) ? c.canAutoResize : true" [name]="c.columnName"
                        [width]="c.width"
                        [sortable]="(c.sortable) ? c.sortable : true" [draggable]="(c.draggable) ? c.draggable : true"
                        [resizeable]="(c.resizeable) ? c.resizeable : true"
                        *ngFor="let c of columns; index as i;">
    <ng-template let-column="column" ngx-datatable-header-template *ngIf="i==0">
      <strong>{{c.columnName}}</strong>
    </ng-template>
    <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row" *ngIf="i==0">
        <span>
            <ng-container *ngIf="c.isDateColumn; then t10"></ng-container>
            <ng-container *ngIf="c.isCurrencyColumn && c.currencyText; then t40"></ng-container>
            <ng-container *ngIf="c.isCurrencyColumn && !c.currencyText; then t70"></ng-container>
            <ng-container *ngIf="!c.isDateColumn && !c.isCurrencyColumn; then t70"></ng-container>

            <ng-template #t10>
                {{(getFieldValue(row, c.fieldName) | date:'medium')}}
            </ng-template>
            <ng-template #t40>
                {{(getFieldValue(row, c.fieldName) | currency:c.currencyText:'code')}}
            </ng-template>
            <ng-template #t70>
                {{getFieldValue(row, c.fieldName)}}
            </ng-template>
        </span>
    </ng-template>

    <ng-template let-column="column" ngx-datatable-header-template>
      <strong>{{c.columnName}}</strong>
    </ng-template>
    <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row">
        <span>
            <ng-container *ngIf="c.isDateColumn; then t10"></ng-container>
            <ng-container *ngIf="c.isCurrencyColumn && c.currencyText; then t40"></ng-container>
            <ng-container *ngIf="c.isCurrencyColumn && !c.currencyText; then t70"></ng-container>
            <ng-container *ngIf="!c.isDateColumn && !c.isCurrencyColumn; then t70"></ng-container>

            <ng-template #t10>
                {{(getFieldValue(row, c.fieldName) | date:'medium')}}
            </ng-template>
            <ng-template #t40>
                {{(getFieldValue(row, c.fieldName) | currency:c.currencyText:'code')}}
            </ng-template>
            <ng-template #t70>
                {{getFieldValue(row, c.fieldName)}}
            </ng-template>
        </span>
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column [summaryFunc]="summaryFunc" [name]="moreActions.name" *ngIf="moreActions" [sortable]="false"
                        [canAutoResize]="false">
    <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row">
        <span>
          <div class="input-group-prepend">
            <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
              <i class="fa fa-list-ul" aria-hidden="true"></i>
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" *ngFor="let action of moreActions.actions" href="javascript:;"
                 (click)="onActionClick({id: row[moreActions.idFieldName], actionName: action.actionName, actionRow: row})">{{action.actionName}}</a>
            </div>
          </div>
        </span>
    </ng-template>
  </ngx-datatable-column>
</ngx-datatable>
`,
                styles: [``]
            },] },
];
MlkDatatableComponent.ctorParameters = () => [
    { type: StewardClientService },
    { type: DatePipe },
    { type: ExportAsService }
];
MlkDatatableComponent.propDecorators = {
    tableRowHeight: [{ type: Input }],
    tableFooterHeight: [{ type: Input }],
    tableHeaderHeight: [{ type: Input }],
    verticalScrollActive: [{ type: Input }],
    horizontalScrollActive: [{ type: Input }],
    columns: [{ type: Input }],
    enableCheckbox: [{ type: Input }],
    endpoint: [{ type: Input }],
    enableFilterHeader: [{ type: Input }],
    enableDefaultTableHeader: [{ type: Input }],
    enableSummary: [{ type: Input }],
    summaryPosition: [{ type: Input }],
    summaryHeight: [{ type: Input }],
    moreActions: [{ type: Input }],
    onActionsEvent: [{ type: Output }],
    filterComponents: [{ type: Input }],
    params: [{ type: Input }],
    onSelected: [{ type: Output }],
    table: [{ type: ViewChild, args: [DatatableComponent,] }]
};
/**
 * Used to display more actions column and the end of the table
 */
class MlkMoreActions {
    /**
     * @param {?} actions
     * @param {?=} id
     * @param {?=} name
     */
    constructor(actions, id, name) {
        /**
         * Action Column name e.g. More Actions
         */
        this.name = 'Actions';
        /**
         * Field name id from the server response e.g userId
         */
        this.idFieldName = 'id';
        this.actions = actions;
        this.name = name;
        this.idFieldName = id;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StewardClientModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: StewardClientModule,
            providers: [{ provide: StewardConfig, useValue: config }]
        };
    }
}
StewardClientModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    NgxDatatableModule,
                    CommonModule,
                    BsDatepickerModule.forRoot(),
                    HttpClientModule,
                    ExportAsModule
                ],
                declarations: [StewardClientComponent, MlkDatatableComponent],
                exports: [StewardClientComponent, MlkDatatableComponent],
                providers: [DatePipe]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { StewardConfig, StewardClientService, StewardClientComponent, MlkDatatableComponent, MlkMoreActions, StewardClientModule, MlkDynamicControl, MlkInput, MlkTextarea, MlkSelect, MlkSelectOption, Page, Sort, ResponseWrapper };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQuanMubWFwIiwic291cmNlcyI6WyJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy93cmFwcGVycy9yZXNwb25zZS13cmFwcGVyLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvc3Rld2FyZC1jbGllbnQuc2VydmljZS50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50LmNvbXBvbmVudC50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy93cmFwcGVycy9tbGstZHluYW1pYy1jb250cm9sLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvbWxrLWRhdGF0YWJsZS9tbGstZGF0YXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogV3JhcHMgc2VydmVyIHJlc3BvbnNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVzcG9uc2VXcmFwcGVyPFQ+IHtcclxuICAgIC8qKlxyXG4gICAgICogSHR0cCBzdGF0dXMgY29kZSBlLmcuIDIwMFxyXG4gICAgICovXHJcbiAgICBjb2RlOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFNlcnZlciBtZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogQWN0dWFsIHJlc3BvbnNlIGRhdGFcclxuICAgICAqL1xyXG4gICAgZGF0YTogVDtcclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwSGVhZGVycywgSHR0cFBhcmFtc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQge09ic2VydmFibGUsIG9mfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtjYXRjaEVycm9yfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7UmVzcG9uc2VXcmFwcGVyfSBmcm9tICcuL2VudGl0aWVzL3dyYXBwZXJzL3Jlc3BvbnNlLXdyYXBwZXInO1xyXG5pbXBvcnQge01ldGF9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDb25maWcge1xyXG4gIGJhc2VfdXJsOiBzdHJpbmc7XHJcbiAgYWNjZXNzX3Rva2VuPzogc3RyaW5nO1xyXG4gIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcclxuICBjc3JmOiBib29sZWFuO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ2xpZW50U2VydmljZTxULCBFPiB7XHJcblxyXG4gIHByaXZhdGUgaGVhZGVyczogSHR0cEhlYWRlcnM7XHJcbiAgdG9rZW46IHN0cmluZztcclxuICBiYXNlX3VybCA9ICcvJztcclxuICBjc3JmOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgaGVhZGVyc1BsYWluOiBIdHRwSGVhZGVycztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGNvbmZpZzogU3Rld2FyZENvbmZpZywgcHJpdmF0ZSBtZXRhOiBNZXRhKSB7XHJcbiAgICBpZiAoY29uZmlnLmNzcmYgPT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmNzcmYgPSB0aGlzLm1ldGEuZ2V0VGFnKCduYW1lPV9jc3JmJykuY29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJhc2VfdXJsID0gY29uZmlnLmJhc2VfdXJsO1xyXG4gICAgaWYgKGNvbmZpZy5oZWFkZXJzKSB7XHJcbiAgICAgIHRoaXMuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNvbmZpZy5jc3JmID09IHRydWUpIHtcclxuICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICdYLUNTUkYtVE9LRU4nOiB0aGlzLmNzcmZcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc190b2tlbicpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChjb25maWcuYWNjZXNzX3Rva2VuKSB7XHJcbiAgICAgIGlmIChjb25maWcuY3NyZiA9PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5oZWFkZXJzLmFwcGVuZCgnWC1DU1JGLVRPS0VOJywgdGhpcy5jc3JmKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgY29uZmlnLmFjY2Vzc190b2tlbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoY29uZmlnLmNzcmYgPT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmhlYWRlcnNQbGFpbiA9IG5ldyBIdHRwSGVhZGVycyh7XHJcbiAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICdYLUNTUkYtVE9LRU4nOiB0aGlzLmNzcmZcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmhlYWRlcnNQbGFpbiA9IG5ldyBIdHRwSGVhZGVycyh7XHJcbiAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc190b2tlbicpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBoYW5kbGUgaHR0cCBwb3N0IHJlcXVlc3RzXHJcbiAgICovXHJcbiAgcG9zdChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7aGVhZGVyczogdGhpcy5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKX0pLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcG9zdE5vVG9rZW4oZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICBpZiAodGhpcy5jb25maWcuY3NyZiA9PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7aGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLCAnWC1DU1JGLVRPS0VOJzogdGhpcy5jc3JmfSl9KS5waXBlKFxyXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBKU09OLnN0cmluZ2lmeShkYXRhKSwge2hlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J30pfSkucGlwZShcclxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHBvc3RMb2dpbihlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChlbmRwb2ludCwgZGF0YSwge1xyXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnNQbGFpblxyXG4gICAgfSkucGlwZShcclxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGhhbmRsZSBodHRwIHBvc3QgcmVxdWVzdHNcclxuICAgKi9cclxuICBwdXQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7aGVhZGVyczogdGhpcy5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKX0pLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0KCdkZWxldGUnLCB0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIHtcclxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcclxuICAgIH0pLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgICAgcGFyYW1zOiB0aGlzLmdldEh0dHBQYXJhbXMoZGF0YSlcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIG9wdGlvbnMpLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogaWZcclxuICAgKiBAcGFyYW0gZW5kcG9pbnRcclxuICAgKiBAcGFyYW0gZGF0YVxyXG4gICAqIEBwYXJhbSBoZWFkZXJzXHJcbiAgICovXHJcbiAgcG9zdEZvcm1EYXRhKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQsIGhlYWRlcnM/OiBIdHRwSGVhZGVycyk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5oZWFkZXJzLmdldCgnQXV0aG9yaXphdGlvbicpICYmICghaGVhZGVycykpIHtcclxuICAgICAgaGVhZGVycyA9IHRoaXMuaGVhZGVycztcclxuICAgIH0gZWxzZSBpZiAoIWhlYWRlcnMpIHtcclxuICAgICAgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgZm9ybURhdGEsIHtoZWFkZXJzOiBoZWFkZXJzfSkucGlwZShcclxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwb3N0Rm9ybUF1dGhvcml6ZWQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCwgaGVhZGVycz86IEh0dHBIZWFkZXJzKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIGRhdGEsIHtoZWFkZXJzOiB0aGlzLmhlYWRlcnNQbGFpbn0pLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcG9zdEZvcm1EYXRhTXVsdGlwYXJ0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSkge1xyXG4gICAgICAgIGRhdGFba2V5XS5mb3JFYWNoKGsyID0+IHtcclxuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGsyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmICh0aGlzLmNvbmZpZy5jc3JmID09IHRydWUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgZm9ybURhdGEsIHtoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoeydYLUNTUkYtVE9LRU4nOiB0aGlzLmNzcmZ9KX0pLnBpcGUoXHJcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIGZvcm1EYXRhLCB7aGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NfdG9rZW4nKX0pfSkucGlwZShcclxuICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRIdHRwUGFyYW1zKGRhdGE6IE1hcDxzdHJpbmcsIHN0cmluZz4pOiBIdHRwUGFyYW1zIHtcclxuICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIG5ldyBIdHRwUGFyYW1zKCk7XHJcbiAgICB9XHJcbiAgICBsZXQgaHR0cFBhcmFtczogSHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XHJcbiAgICBkYXRhLmZvckVhY2goKHZhbHVlOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLmFwcGVuZChrZXksIHZhbHVlKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGh0dHBQYXJhbXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGNhdGNoIGV4Y2VwdGlvbiB0aHJvd24gYnkgaHR0cCBjbGllbnQgcmV0dXJucyBpbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcclxuICAgKiBpZiBzdGF0dXMgNTAwIGlzIGVuY291bnRlcmVkXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcjxSZXNwb25zZVdyYXBwZXI+KCkge1xyXG4gICAgcmV0dXJuIChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpOiBPYnNlcnZhYmxlPGFueT4gPT4ge1xyXG4gICAgICBjb25zdCByZXMgPSBuZXcgUmVzcG9uc2VXcmFwcGVyKCk7XHJcbiAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7IC8vIGxvZyB0byBjb25zb2xlIGluc3RlYWRcclxuICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNTAwKSB7XHJcbiAgICAgICAgcmVzLmNvZGUgPSBlcnJvci5zdGF0dXM7XHJcbiAgICAgICAgcmVzLm1lc3NhZ2UgPSAnU29ycnkgaW50ZXJuYWwgc2VydmVyIGVycm9yIG9jY3VyZWQgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlcic7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzLmNvZGUgPSBlcnJvci5zdGF0dXM7XHJcbiAgICAgICAgcmVzLm1lc3NhZ2UgPSBlcnJvci5lcnJvci5tZXNzYWdlO1xyXG4gICAgICAgIHJlcy5kYXRhID0gZXJyb3IuZXJyb3IuZGF0YTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gb2YocmVzKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIHJlbmRlciBhY3Rpb24gYnV0dG9uc1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZW5kZXJNb3JlKGlkOiBhbnkpIHtcclxuICAgIHJldHVybiAnPGRpdiBjbGFzcz1cXCdhY3Rpb25zLWJ1dHRvbnMgY2VudGVyXFwnIGlkPVxcJycgKyBpZCArICdcXCc+PGkgY2xhc3M9XFwnZmEgZmEtY2hlY2tcXCcgdGl0bGU9XFwnQXBwcm92ZVxcJz48L2k+IDxpIGNsYXNzPVxcJ2ZhIGZhLWJhblxcJyB0aXRsZT1cXCdEZWNsaW5lXFwnPjwvaT48L2Rpdj4nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGludGlhdGVEYXRhVGFibGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4pIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgICAgcGFyYW1zOiB0aGlzLmdldEh0dHBQYXJhbXMoZGF0YSlcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIG9wdGlvbnMpLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzdHctc3Rld2FyZC1jbGllbnQnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8cD5cclxuICAgICAgc3Rld2FyZC1jbGllbnQgd29ya3MhXHJcbiAgICA8L3A+XHJcbiAgYCxcclxuICBzdHlsZXM6IFtdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ2xpZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxufVxyXG4iLCIvKipcclxuICogRGF0YWJsZSBwYWdlIHVzZWQgdG8gd3JhcHBlciBzZXJ2ZXIgY29udGVudCByZXNwb25zZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFBhZ2U8VD4ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBOdW1iZXIgb2YgaXRlbXMgcGVyIHBhZ2Ugc2FtZSBhcyBsaW1pdFxyXG4gICAgICovXHJcbiAgICBzaXplOiBudW1iZXIgPSAxMDtcclxuICAgIC8qKlxyXG4gICAgICogVG90YWwgaXRlbXMgYXZhaWxhYmxlIG9uIHRoZSBzZXJ2ZXJcclxuICAgICAqL1xyXG4gICAgdG90YWxFbGVtZW50czogbnVtYmVyID0gMDtcclxuICAgIC8qKlxyXG4gICAgICogVG90YWwgbnVtYmVyIG9mIHBhZ2VzIHByZXNlbnRcclxuICAgICAqL1xyXG4gICAgdG90YWxQYWdlczogbnVtYmVyID0gMDtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGlzIHRoZSBmaXJzdCBwYWdlXHJcbiAgICAgKi9cclxuICAgIGZpcnN0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGl0IGlzIHRoZSBsYXN0IHBhZ2VcclxuICAgICAqL1xyXG4gICAgbGFzdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgYWN0dWFsIHBhZ2UgY29udGVudFxyXG4gICAgICovXHJcbiAgICBjb250ZW50OiBBcnJheTxUPiA9IFtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIG1hcCBzb3J0IHBhcmFtZXRlcnNcclxuICAgICAqL1xyXG4gICAgc29ydGVkOiBTb3J0ID0gbmV3IFNvcnQoKTtcclxuICAgIC8qKlxyXG4gICAgICogQ3VycmVudCBwYWdlIG51bWJlclxyXG4gICAgICovXHJcbiAgICBudW1iZXI6IG51bWJlciA9IDA7XHJcbn1cclxuLyoqXHJcbiAqIHVzZWQgdG8gbWFwIHNvcnQgcmVxdWVzdFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNvcnR7XHJcbiAgICBzb3J0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHVuc29ydGVkOiBib29sZWFuID0gdHJ1ZTtcclxufVxyXG4iLCIvKipcclxuICogUmVwcmVzZW50cyBkeW5hbWljIGh0bWwgY29udHJvbHMgKElucHV0LCBUZXh0QXJlYSBhbmQgU2VsZWN0KVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1sa0R5bmFtaWNDb250cm9sPFQ+IHtcclxuICAgIC8qKlxyXG4gICAgICogQ29udHJvbCBsYWJlbFxyXG4gICAgICovXHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJY29uIHRvIGJlIGFwcGVuZGVkIGJlZm9yZSB0aGUgY29udHJvbCAoc3VwcG9ydHMgY2xhc3MgZGVmaW5lZCBpY29ucylcclxuICAgICAqL1xyXG4gICAgaWNvbjogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBOYW1lIG9mIHRoZSBjb250cm9sIChwcm92aWRlIHZhcmlhYmxlIHZhbGlkIG5hbWVzIGllLiBubyBzcGFjZXMgcHJlZmFyYWJseSBhcGkgY29ycmVzcG9uZGluZyBuYW1lcyBlLmcuIHVzZXJOYW1lKVxyXG4gICAgICovXHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhY3R1YWwgY29udHJvbCAoTWxrSW5wdXQsIE1sa1RleHRBcmVhICYgTWxrU2VsZWN0KVxyXG4gICAgICovXHJcbiAgICBjb250cm9sVHlwZTogVDtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBmaWVsZCBpcyByZXF1aXJlZFxyXG4gICAgICovXHJcbiAgICBpc1JlcXVpcmVkOiBib29sZWFuO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb250cm9sIHBsYWNlaG9sZGVyXHJcbiAgICAgKi9cclxuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGxhYmVsOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY29udHJvbFR5cGU6IFQsIGljb246IHN0cmluZyA9IFwiZmEgZmEtZmlsZS10ZXh0LW9cIixcclxuICAgICAgICBpc1JlcXVpcmVkOiBib29sZWFuID0gdHJ1ZSwgcGxhY2Vob2xkZXI6IHN0cmluZyA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gY29udHJvbFR5cGU7XHJcbiAgICAgICAgdGhpcy5pY29uID0gaWNvbjtcclxuICAgICAgICB0aGlzLmlzUmVxdWlyZWQgPSBpc1JlcXVpcmVkO1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlciA/IHBsYWNlaG9sZGVyIDogbGFiZWw7XHJcbiAgICB9XHJcblxyXG59XHJcbi8qKlxyXG4gKiBVc2VkIHRvIHJlcHJlc2VudCBodG1sIGlucHV0IHdpdGggb3B0aW9uczpcclxuICogdHlwZTogZGVmYXVsdCB0byB0ZXh0LCAgbWF4TGVuZ3RoLCBtaW5MZW5ndGgsIG1pbiwgbWF4XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWxrSW5wdXR7XHJcbiAgICAvKipcclxuICAgICAqIFR5cGUgb2YgaW5wdXQgZS5nLiB0ZXh0LCBudW1iZXIsIGRhdGVcclxuICAgICAqL1xyXG4gICAgdHlwZTogc3RyaW5nID0gXCJ0ZXh0XCI7XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgbGVuZ3RoIG9mIHRoZSBpbnB1dFxyXG4gICAgICovXHJcbiAgICBtYXhMZW5ndGg6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBtaW5pbXVtIGlucHV0IGxlbmd0aFxyXG4gICAgICovXHJcbiAgICBtaW5MZW5ndGg6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBudW1iZXIgaW5wdXRzXHJcbiAgICAgKi9cclxuICAgIG1pbjogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIG51bWJlciBpbnB1dHNcclxuICAgICAqL1xyXG4gICAgbWF4OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nID0gXCJ0ZXh0XCIpIHtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMubWluTGVuZ3RoID0gdGhpcy5taW4gPSAwO1xyXG4gICAgICAgIHRoaXMubWF4TGVuZ3RoID0gNDAwMDtcclxuICAgICAgICB0aGlzLm1heCA9IDEwMDAwMDAwMDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGh0bWwgdGV4dGFyZWEgaW5wdXRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNbGtUZXh0YXJlYXtcclxuICAgIC8qKlxyXG4gICAgICogTnVtYmVyIHRleHRhcmVhIGNvbHVtbnNcclxuICAgICAqL1xyXG4gICAgY29scz86IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogTnVtYmVyIG9mIHRleHRhcmVhIHJvd3NcclxuICAgICAqL1xyXG4gICAgcm93cz86IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogVmFsaWRhdGUgbWF4aW11bSBpbnB1dCBsZW5ndGhcclxuICAgICAqL1xyXG4gICAgbWF4TGVuZ3RoOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFZhbGlkYXRlIG1pbmltdW0gaW5wdXQgbGVuZ3RoXHJcbiAgICAgKi9cclxuICAgIG1pbkxlbmd0aDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbHM6IG51bWJlciA9IDUsIHJvd3M6IG51bWJlciA9IDEpe1xyXG4gICAgICAgIHRoaXMuY29scyA9IGNvbHM7XHJcbiAgICAgICAgdGhpcy5yb3dzID0gcm93cztcclxuICAgICAgICB0aGlzLm1heExlbmd0aCA9IDQwMDA7XHJcbiAgICAgICAgdGhpcy5taW5MZW5ndGggPSAwXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGh0bWwgc2VsZWN0IGNvbnRyb2xcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNbGtTZWxlY3Qge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3Qgb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBvcHRpb25zOiBBcnJheTxNbGtTZWxlY3RPcHRpb24+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEFycmF5PE1sa1NlbGVjdE9wdGlvbj4pe1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWxrU2VsZWN0T3B0aW9ue1xyXG4gICAgLyoqXHJcbiAgICAgKiBPcHRpb24gdmFsdWVcclxuICAgICAqL1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogT3B0aW9uIHRleHQvbGFiZWxcclxuICAgICAqL1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBzdHJpbmcsIHRleHQ6IHN0cmluZyA9IG51bGwpe1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0ID8gdGV4dCA6IHZhbHVlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0Zvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtQYWdlfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9wYWdlJztcclxuaW1wb3J0IHtNbGtEeW5hbWljQ29udHJvbCwgTWxrSW5wdXQsIE1sa1NlbGVjdCwgTWxrVGV4dGFyZWF9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL21say1keW5hbWljLWNvbnRyb2wnO1xyXG5pbXBvcnQge1Jlc3BvbnNlV3JhcHBlcn0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlcic7XHJcbmltcG9ydCB7U3Rld2FyZENsaWVudFNlcnZpY2V9IGZyb20gJy4uL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQge0RhdGF0YWJsZUNvbXBvbmVudH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xyXG5pbXBvcnQge1F1ZXVlfSBmcm9tICdxdWV1ZS10eXBlc2NyaXB0JztcclxuaW1wb3J0IHtEYXRlUGlwZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtFeHBvcnRBc0NvbmZpZywgRXhwb3J0QXNTZXJ2aWNlLCBTdXBwb3J0ZWRFeHRlbnNpb25zfSBmcm9tICduZ3gtZXhwb3J0LWFzJztcclxuXHJcbi8vIGNvbnN0IHsgUXVldWUgfSA9IHJlcXVpcmUoJ3F1ZXVlLXR5cGVzY3JpcHQnKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc3R3LW1say1kYXRhdGFibGUnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNhcmQgY2FyZC1vdXRsaW5lLWRlZmF1bHRcIiAqbmdJZj1cImVuYWJsZUZpbHRlckhlYWRlclwiPlxyXG4gIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgIDxmb3JtIChuZ1N1Ym1pdCk9XCJwcm9jZXNzRmlsdGVyKGZpbHRlckZvcm0pXCIgW2Zvcm1Hcm91cF09XCJmaWx0ZXJGb3JtXCI+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zICBtYi0zXCIgKm5nRm9yPVwibGV0IGNvbnRyb2wgb2YgZmlsdGVyQ29tcG9uZW50c1wiPlxyXG4gICAgICAgICAgPGxhYmVsPnt7Y29udHJvbC5sYWJlbH19OiA8L2xhYmVsPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCAgZm9ybS1pY29uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgPGkgW2NsYXNzXT1cImNvbnRyb2wuaWNvblwiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8c2VsZWN0ICpuZ0lmPVwiaXNTZWxlY3QoY29udHJvbC5jb250cm9sVHlwZSlcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCI+XHJcbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkIHNlbGVjdGVkPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgbyBvZiBjb250cm9sLmNvbnRyb2xUeXBlLm9wdGlvbnNcIj57e28udGV4dH19PC9vcHRpb24+XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG5cclxuICAgICAgICAgICAgPHRleHRhcmVhICpuZ0lmPVwiaXNUZXh0QXJlYShjb250cm9sLmNvbnRyb2xUeXBlKVwiIFtjb2xzXT1cImNvbnRyb2wuY29udHJvbFR5cGUuY29sc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICBbcm93c109XCJjb250cm9sLmNvbnRyb2xUeXBlLnJvd3NcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiPjwvdGV4dGFyZWE+XHJcblxyXG4gICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJpc0lucHV0KGNvbnRyb2wuY29udHJvbFR5cGUpXCIgW3R5cGVdPVwiY29udHJvbC5jb250cm9sVHlwZS50eXBlXCJcclxuICAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCJcclxuICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCIvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkudG91Y2hlZFwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcigncmVxdWlyZWQnKVwiPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19IGlzIHJlcXVpcmVkPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWlubGVuZ3RoJylcIj5NaW5pbXVtIG9mIHt7Y29udHJvbC5jb250cm9sVHlwZS5taW5MZW5ndGh9fVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyczwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiB7e2NvbnRyb2wuY29udHJvbFR5cGUubWF4TGVuZ3RofX1cclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcnM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtaW4nKVwiPlNob3VsZCBiZSBncmVhdGVyIHRoYW4ge3tjb250cm9sLmNvbnRyb2xUeXBlLm1pbn19PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWF4JylcIj5TaG91bGQgYmUgbGVzcyB0aGFuIHt7Y29udHJvbC5jb250cm9sVHlwZS5tYXh9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIiAqbmdJZj1cImVuYWJsZURlZmF1bHRUYWJsZUhlYWRlclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCI+XHJcbiAgICAgICAgICA8bGFiZWw+RnJvbTogPC9sYWJlbD5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgZm9ybS1pY29uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhci1vXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXHJcbiAgICAgICAgICAgICAgaWQ9XCJpbnB1dEZyb21EYXRlXCJcclxuICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJmcm9tXCJcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkZyb20uLi5cIlxyXG4gICAgICAgICAgICAgICNkcGZyb209XCJic0RhdGVwaWNrZXJcIlxyXG4gICAgICAgICAgICAgIGJzRGF0ZXBpY2tlclxyXG4gICAgICAgICAgICAgIFtvdXRzaWRlQ2xpY2tdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgIFtic0NvbmZpZ109XCJ7IGRhdGVJbnB1dEZvcm1hdDogJ0RELU1NLVlZWVknLCBjb250YWluZXJDbGFzczogJ3RoZW1lLXJlZCcgfVwiXHJcbiAgICAgICAgICAgICAgbWF4bGVuZ3RoPVwiMzBcIlxyXG4gICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgcmVhZG9ubHlcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImRwZnJvbS50b2dnbGUoKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImRwZnJvbS5pc09wZW5cIj48aSBjbGFzcz1cImZhIGZhLXRoXCI+PC9pPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLnRvdWNoZWRcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2YgMzAgY2hhcmFjdGVyczwvc3Bhbj5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCI+XHJcbiAgICAgICAgICA8bGFiZWw+VG86IDwvbGFiZWw+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IGZvcm0taWNvbi1kZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXItb1wiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxyXG4gICAgICAgICAgICAgIGlkPVwiaW5wdXRUb0RhdGVcIlxyXG4gICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInRvXCJcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlRvLi4uXCJcclxuICAgICAgICAgICAgICAjZHB0bz1cImJzRGF0ZXBpY2tlclwiXHJcbiAgICAgICAgICAgICAgYnNEYXRlcGlja2VyXHJcbiAgICAgICAgICAgICAgW291dHNpZGVDbGlja109XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgW2JzQ29uZmlnXT1cInsgZGF0ZUlucHV0Rm9ybWF0OiAnREQtTU0tWVlZWScsIGNvbnRhaW5lckNsYXNzOiAndGhlbWUtcmVkJyB9XCJcclxuICAgICAgICAgICAgICBtYXhsZW5ndGg9XCIzMFwiXHJcbiAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgICByZWFkb25seVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiZHB0by50b2dnbGUoKVwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiZHB0by5pc09wZW5cIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdGhcIj48L2k+PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCd0bycpLnRvdWNoZWRcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgndG8nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDMwIGNoYXJhY3RlcnM8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgbWItM1wiPlxyXG4gICAgICAgICAgPGxhYmVsPlNlYXJjaDo8L2xhYmVsPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgZm9ybS1pY29uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1zZWFyY2hcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8aW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwibmVlZGxlXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCIgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2guLi5cIiAoa2V5dXApPVwidXBkYXRlRmlsdGVyKCRldmVudClcIi8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykudG91Y2hlZFwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDIwMCBjaGFyYWN0ZXJzPC9zcGFuPlxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHVsbC1yaWdodCBpbmxpbmUtYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nIGJ0bi1zbVwiIHR5cGU9XCJyZXNldFwiIChjbGljayk9XCJyZXNldCgpXCI+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1yZXBlYXRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgUmVzZXRcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuLXNtIHB1bGwtcmlnaHRcIiB0eXBlPVwic3VibWl0XCI+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1maWx0ZXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgRmlsdGVyXHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgIDwvZm9ybT5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG5cclxuPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJwdWxsLWxlZnQgaW5saW5lLWJ1dHRvbnNcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1zdWNjZXNzIGJ0bi1zbSBwdWxsLWxlZnRcIiBzdHlsZT1cIm1hcmdpbi1yaWdodDogMWVtO1wiIChjbGljayk9XCJleHBvcnRBcygncGRmJywgJ2xhbmRzY2FwZScpXCI+RXhwb3J0IHBkZjwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnkgYnRuLXNtIHB1bGwtbGVmdFwiIHN0eWxlPVwibWFyZ2luLXJpZ2h0OiAxZW07XCIgKGNsaWNrKT1cImV4cG9ydEFzKCdjc3YnKVwiPkV4cG9ydCBjc3Y8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1pbmZvIGJ0bi1zbSBwdWxsLWxlZnRcIiBzdHlsZT1cIm1hcmdpbi1yaWdodDogMWVtO1wiIChjbGljayk9XCJleHBvcnRBcygneG1sJylcIj5FeHBvcnQgeG1sPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG48bmd4LWRhdGF0YWJsZVxyXG4gICN0YWJsZVxyXG4gIFtyb3dIZWlnaHRdPVwidGFibGVSb3dIZWlnaHRcIlxyXG4gIFtmb290ZXJIZWlnaHRdPVwidGFibGVGb290ZXJIZWlnaHRcIlxyXG4gIFtoZWFkZXJIZWlnaHRdPVwidGFibGVIZWFkZXJIZWlnaHRcIlxyXG4gIFtzY3JvbGxiYXJWXT1cInZlcnRpY2FsU2Nyb2xsQWN0aXZlXCJcclxuICBbc2Nyb2xsYmFySF09XCJob3Jpem9udGFsU2Nyb2xsQWN0aXZlXCJcclxuICBbc3VtbWFyeVJvd109XCJlbmFibGVTdW1tYXJ5XCJcclxuICBbc3VtbWFyeVBvc2l0aW9uXT1cInN1bW1hcnlQb3NpdGlvblwiXHJcbiAgW3N1bW1hcnlIZWlnaHRdPVwic3VtbWFyeUhlaWdodFwiXHJcbiAgY2xhc3M9XCJib290c3RyYXBcIlxyXG4gIFtjb2x1bW5Nb2RlXT1cIidmb3JjZSdcIlxyXG4gIFtyb3dzXT1cInBhZ2UuY29udGVudFwiXHJcbiAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcclxuICBbc2VsZWN0aW9uVHlwZV09XCInY2hlY2tib3gnXCJcclxuICAoYWN0aXZhdGUpPVwib25BY3RpdmF0ZSgkZXZlbnQpXCJcclxuICAoc2VsZWN0KT0nb25TZWxlY3QoJGV2ZW50KSdcclxuICBbY291bnRdPVwicGFnZS50b3RhbEVsZW1lbnRzXCJcclxuICBbb2Zmc2V0XT1cInBhZ2UubnVtYmVyXCJcclxuICBbZXh0ZXJuYWxQYWdpbmddPVwidHJ1ZVwiXHJcbiAgW2xpbWl0XT1cInBhZ2Uuc2l6ZVwiXHJcbiAgKHBhZ2UpPVwibG9hZFBhZ2UoJGV2ZW50LCBudWxsKVwiXHJcbiAgaWQ9XCJteVRhYmxlXCI+XHJcbiAgPG5neC1kYXRhdGFibGUtY29sdW1uIFtzdW1tYXJ5RnVuY109XCJzdW1tYXJ5RnVuY1wiIFt3aWR0aF09XCIzMFwiIFtzb3J0YWJsZV09XCJmYWxzZVwiIFtjYW5BdXRvUmVzaXplXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2RyYWdnYWJsZV09XCJ0cnVlXCIgW3Jlc2l6ZWFibGVdPVwiZmFsc2VcIiBbaGVhZGVyQ2hlY2tib3hhYmxlXT1cInRydWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2hlY2tib3hhYmxlXT1cInRydWVcIiAqbmdJZj1cImVuYWJsZUNoZWNrYm94XCI+XHJcbiAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cclxuICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gW3N1bW1hcnlGdW5jXT1cInN1bW1hcnlGdW5jXCIgW3dpZHRoXT1cIjMwXCIgW3NvcnRhYmxlXT1cImZhbHNlXCIgW2NhbkF1dG9SZXNpemVdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbZHJhZ2dhYmxlXT1cInRydWVcIiBbcmVzaXplYWJsZV09XCJmYWxzZVwiIFtoZWFkZXJDaGVja2JveGFibGVdPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjIG9mIGNvbHVtbnM7IGluZGV4IGFzIGk7XCI+XHJcbiAgICA8bmctdGVtcGxhdGUgbGV0LWNvbHVtbj1cImNvbHVtblwiIG5neC1kYXRhdGFibGUtaGVhZGVyLXRlbXBsYXRlICpuZ0lmPVwiaT09MFwiPlxyXG4gICAgICA8c3Ryb25nPiM8L3N0cm9uZz5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXJvdz1cInJvd1wiICpuZ0lmPVwiaT09MFwiPlxyXG4gICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICB7e3Jvd0luZGV4ICsgMX19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxyXG4gIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBbc3VtbWFyeUZ1bmNdPVwiKGMuc3VtbWFyeUZ1bmMpID8gYy5zdW1tYXJ5RnVuYyA6IHN1bW1hcnlGdW5jXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2NhbkF1dG9SZXNpemVdPVwiKGMuY2FuQXV0b1Jlc2l6ZSkgPyBjLmNhbkF1dG9SZXNpemUgOiB0cnVlXCIgW25hbWVdPVwiYy5jb2x1bW5OYW1lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3dpZHRoXT1cImMud2lkdGhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbc29ydGFibGVdPVwiKGMuc29ydGFibGUpID8gYy5zb3J0YWJsZSA6IHRydWVcIiBbZHJhZ2dhYmxlXT1cIihjLmRyYWdnYWJsZSkgPyBjLmRyYWdnYWJsZSA6IHRydWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbcmVzaXplYWJsZV09XCIoYy5yZXNpemVhYmxlKSA/IGMucmVzaXplYWJsZSA6IHRydWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgYyBvZiBjb2x1bW5zOyBpbmRleCBhcyBpO1wiPlxyXG4gICAgPG5nLXRlbXBsYXRlIGxldC1jb2x1bW49XCJjb2x1bW5cIiBuZ3gtZGF0YXRhYmxlLWhlYWRlci10ZW1wbGF0ZSAqbmdJZj1cImk9PTBcIj5cclxuICAgICAgPHN0cm9uZz57e2MuY29sdW1uTmFtZX19PC9zdHJvbmc+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPG5nLXRlbXBsYXRlIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZSBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiIGxldC12YWx1ZT1cInZhbHVlXCIgbGV0LXJvdz1cInJvd1wiICpuZ0lmPVwiaT09MFwiPlxyXG4gICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYy5pc0RhdGVDb2x1bW47IHRoZW4gdDEwXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjLmlzQ3VycmVuY3lDb2x1bW4gJiYgYy5jdXJyZW5jeVRleHQ7IHRoZW4gdDQwXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjLmlzQ3VycmVuY3lDb2x1bW4gJiYgIWMuY3VycmVuY3lUZXh0OyB0aGVuIHQ3MFwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWMuaXNEYXRlQ29sdW1uICYmICFjLmlzQ3VycmVuY3lDb2x1bW47IHRoZW4gdDcwXCI+PC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI3QxMD5cclxuICAgICAgICAgICAgICAgIHt7KGdldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSkgfCBkYXRlOidtZWRpdW0nKX19XHJcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdDQwPlxyXG4gICAgICAgICAgICAgICAge3soZ2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKSB8IGN1cnJlbmN5OmMuY3VycmVuY3lUZXh0Oidjb2RlJyl9fVxyXG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI3Q3MD5cclxuICAgICAgICAgICAgICAgIHt7Z2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKX19XHJcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgICA8bmctdGVtcGxhdGUgbGV0LWNvbHVtbj1cImNvbHVtblwiIG5neC1kYXRhdGFibGUtaGVhZGVyLXRlbXBsYXRlPlxyXG4gICAgICA8c3Ryb25nPnt7Yy5jb2x1bW5OYW1lfX08L3N0cm9uZz5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXZhbHVlPVwidmFsdWVcIiBsZXQtcm93PVwicm93XCI+XHJcbiAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjLmlzRGF0ZUNvbHVtbjsgdGhlbiB0MTBcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImMuaXNDdXJyZW5jeUNvbHVtbiAmJiBjLmN1cnJlbmN5VGV4dDsgdGhlbiB0NDBcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImMuaXNDdXJyZW5jeUNvbHVtbiAmJiAhYy5jdXJyZW5jeVRleHQ7IHRoZW4gdDcwXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhYy5pc0RhdGVDb2x1bW4gJiYgIWMuaXNDdXJyZW5jeUNvbHVtbjsgdGhlbiB0NzBcIj48L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdDEwPlxyXG4gICAgICAgICAgICAgICAge3soZ2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKSB8IGRhdGU6J21lZGl1bScpfX1cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICN0NDA+XHJcbiAgICAgICAgICAgICAgICB7eyhnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpIHwgY3VycmVuY3k6Yy5jdXJyZW5jeVRleHQ6J2NvZGUnKX19XHJcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdDcwPlxyXG4gICAgICAgICAgICAgICAge3tnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpfX1cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XHJcbiAgPG5neC1kYXRhdGFibGUtY29sdW1uIFtzdW1tYXJ5RnVuY109XCJzdW1tYXJ5RnVuY1wiIFtuYW1lXT1cIm1vcmVBY3Rpb25zLm5hbWVcIiAqbmdJZj1cIm1vcmVBY3Rpb25zXCIgW3NvcnRhYmxlXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2NhbkF1dG9SZXNpemVdPVwiZmFsc2VcIj5cclxuICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtdmFsdWU9XCJ2YWx1ZVwiIGxldC1yb3c9XCJyb3dcIj5cclxuICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBkcm9wZG93bi10b2dnbGVcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxyXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxyXG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtbGlzdC11bFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+XHJcbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBtb3JlQWN0aW9ucy5hY3Rpb25zXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiXHJcbiAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQWN0aW9uQ2xpY2soe2lkOiByb3dbbW9yZUFjdGlvbnMuaWRGaWVsZE5hbWVdLCBhY3Rpb25OYW1lOiBhY3Rpb24uYWN0aW9uTmFtZSwgYWN0aW9uUm93OiByb3d9KVwiPnt7YWN0aW9uLmFjdGlvbk5hbWV9fTwvYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XHJcbjwvbmd4LWRhdGF0YWJsZT5cclxuYCxcclxuICBzdHlsZXM6IFtgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1sa0RhdGF0YWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgdGFibGVSb3dIZWlnaHQgPSA1MDtcclxuICBASW5wdXQoKSB0YWJsZUZvb3RlckhlaWdodCA9IDUwO1xyXG4gIEBJbnB1dCgpIHRhYmxlSGVhZGVySGVpZ2h0ID0gNTA7XHJcbiAgQElucHV0KCkgdmVydGljYWxTY3JvbGxBY3RpdmUgPSBmYWxzZTtcclxuICBASW5wdXQoKSBob3Jpem9udGFsU2Nyb2xsQWN0aXZlID0gZmFsc2U7XHJcbiAgQElucHV0KCkgY29sdW1uczogQXJyYXk8TWxrRGF0YVRhYmxlQ29sdW1uPiA9IFtdO1xyXG4gIEBJbnB1dCgpIGVuYWJsZUNoZWNrYm94ID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZW5kcG9pbnQ6IHN0cmluZztcclxuICBASW5wdXQoKSBlbmFibGVGaWx0ZXJIZWFkZXIgPSBmYWxzZTtcclxuICBASW5wdXQoKSBlbmFibGVEZWZhdWx0VGFibGVIZWFkZXIgPSBmYWxzZTtcclxuICBASW5wdXQoKSBlbmFibGVTdW1tYXJ5ID0gZmFsc2U7XHJcbiAgQElucHV0KCkgc3VtbWFyeVBvc2l0aW9uID0gJ1xcJ2JvdHRvbVxcJyc7XHJcbiAgQElucHV0KCkgc3VtbWFyeUhlaWdodCA9ICdcXCdhdXRvXFwnJztcclxuICBASW5wdXQoKSBtb3JlQWN0aW9uczogTWxrTW9yZUFjdGlvbnM7XHJcbiAgQE91dHB1dCgpIG9uQWN0aW9uc0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxNbGtNb3JlQWN0aW9uRGF0YT4oKTtcclxuICBASW5wdXQoKSBmaWx0ZXJDb21wb25lbnRzOiBBcnJheTxNbGtEeW5hbWljQ29udHJvbDxhbnk+PiA9IFtdO1xyXG4gIEBJbnB1dCgpIHBhcmFtczogTWFwPHN0cmluZywgYW55PjtcclxuICBwYWdlOiBQYWdlPGFueT4gPSBuZXcgUGFnZSgpO1xyXG4gIHNlbGVjdGVkID0gW107XHJcbiAgQE91dHB1dCgpIG9uU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XHJcbiAgQFZpZXdDaGlsZChEYXRhdGFibGVDb21wb25lbnQpIHRhYmxlOiBEYXRhdGFibGVDb21wb25lbnQ7XHJcbiAgZmlsdGVyOiBPYmplY3QgPSB7fTtcclxuICBmaWx0ZXJGb3JtOiBGb3JtR3JvdXA7XHJcbiAgZW1wdHlTdW1tYXJ5RnVuYzogKCkgPT4gbnVsbDtcclxuXHJcblxyXG4gIGNvbmZpZzogRXhwb3J0QXNDb25maWcgPSB7XHJcbiAgICB0eXBlOiAncGRmJyxcclxuICAgIGVsZW1lbnRJZDogJ215VGFibGUnLFxyXG4gICAgb3B0aW9uczoge1xyXG4gICAgICBqc1BERjoge1xyXG4gICAgICAgIG9yaWVudGF0aW9uOiAnbGFuZHNjYXBlJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RlcndhcmRTZXJ2aWNlOiBTdGV3YXJkQ2xpZW50U2VydmljZTxSZXNwb25zZVdyYXBwZXI8UGFnZTxhbnk+PiwgYW55PiwgcHJpdmF0ZSBkYXRlUGlwZTogRGF0ZVBpcGUsIHByaXZhdGUgZXhwb3J0QXNTZXJ2aWNlOiBFeHBvcnRBc1NlcnZpY2UpIHtcclxuICB9XHJcblxyXG5cclxuICBleHBvcnRBcyh0eXBlOiBTdXBwb3J0ZWRFeHRlbnNpb25zLCBvcHQ/OiBzdHJpbmcpIHtcclxuICAgIHRoaXMuY29uZmlnLnR5cGUgPSB0eXBlO1xyXG4gICAgaWYgKG9wdCkge1xyXG4gICAgICB0aGlzLmNvbmZpZy5vcHRpb25zLmpzUERGLm9yaWVudGF0aW9uID0gb3B0O1xyXG4gICAgfVxyXG4gICAgdGhpcy5leHBvcnRBc1NlcnZpY2Uuc2F2ZSh0aGlzLmNvbmZpZywgJ0RhdGFFeHBvcnQnKTtcclxuICAgIC8vIHRoaXMuZXhwb3J0QXNTZXJ2aWNlLmdldCh0aGlzLmNvbmZpZykuc3Vic2NyaWJlKGNvbnRlbnQgPT4ge1xyXG4gICAgLy8gICBjb25zb2xlLmxvZyhjb250ZW50KTtcclxuICAgIC8vIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2VuZXJhdGUgZm9ybSBjb250cm9sIGZyb20gZmlsdGVyQ29tcG9uZW50cyBhbmQgYWxzbyBhcHBlbmRpbmcgZGVmYXVsdCBjb250cm9scyBpZS4gZGF0ZSBmaWx0ZXIgYW5kIHNlYXJjaCBjb250cm9sc1xyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3QgZ3JvdXAgPSB7fTtcclxuICAgIHRoaXMuZmlsdGVyQ29tcG9uZW50cy5mb3JFYWNoKGNvbXAgPT4ge1xyXG4gICAgICBjb25zdCB2YWxpZGF0b3JzOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICAgIGlmIChjb21wLmlzUmVxdWlyZWQpIHtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgTWxrSW5wdXQgfHwgY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIE1sa1RleHRhcmVhKSB7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluTGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWluTGVuZ3RoKSk7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4TGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWF4TGVuZ3RoKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgTWxrSW5wdXQpIHtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5tYXgoY29tcC5jb250cm9sVHlwZS5tYXgpKTtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW4oY29tcC5jb250cm9sVHlwZS5taW4pKTtcclxuICAgICAgfVxyXG4gICAgICBncm91cFtjb21wLm5hbWVdID0gbmV3IEZvcm1Db250cm9sKCcnLCB2YWxpZGF0b3JzKTtcclxuICAgIH0pO1xyXG4gICAgLy8gYWRkIGRlZmF1bHQgY29udHJvbHNcclxuICAgIGdyb3VwWydmcm9tJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDMwKSk7XHJcbiAgICBncm91cFsndG8nXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMzApKTtcclxuICAgIGdyb3VwWyduZWVkbGUnXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMjAwKSk7XHJcbiAgICB0aGlzLmZpbHRlckZvcm0gPSBuZXcgRm9ybUdyb3VwKGdyb3VwKTtcclxuICAgIHRoaXMubG9hZFBhZ2Uoe29mZnNldDogMCwgbGltaXQ6IHRoaXMucGFnZS5zaXplfSwgbnVsbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGVtaXQgY2xpY2sgZXZlbnQgb2YgdGhlIGFjdGlvbnNcclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKi9cclxuICBvbkFjdGlvbkNsaWNrKGV2ZW50OiBNbGtNb3JlQWN0aW9uRGF0YSkge1xyXG4gICAgdGhpcy5vbkFjdGlvbnNFdmVudC5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2Nlc3Mgc2VydmVyIHJlcXVlc3Qgb2YgZGF0YWJsZVxyXG4gICAqIEBwYXJhbSBwYWdlSW5mb1xyXG4gICAqIEBwYXJhbSBmaWx0ZXJzXHJcbiAgICovXHJcbiAgbG9hZFBhZ2UocGFnZUluZm8sIGZpbHRlcnMpIHtcclxuICAgIGlmICghdGhpcy5lbmRwb2ludCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgcmVxdWVzdDogTWFwPHN0cmluZywgYW55PjtcclxuICAgIGlmIChmaWx0ZXJzKSB7XHJcbiAgICAgIHJlcXVlc3QgPSBmaWx0ZXJzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVxdWVzdCA9IG5ldyBNYXAoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnBhcmFtcykge1xyXG4gICAgICB0aGlzLnBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgICAgcmVxdWVzdC5zZXQoa2V5LCB2YWx1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVxdWVzdC5zZXQoJ3BhZ2UnLCBwYWdlSW5mby5vZmZzZXQpO1xyXG4gICAgcmVxdWVzdC5zZXQoJ3NpemUnLCBwYWdlSW5mby5saW1pdCk7XHJcbiAgICB0aGlzLnN0ZXJ3YXJkU2VydmljZS5nZXQodGhpcy5lbmRwb2ludCwgcmVxdWVzdCkuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcclxuICAgICAgaWYgKHJlc3BvbnNlLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgIHRoaXMucGFnZSA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gaGFuZGxlIHNlbGVjdCBvcHRpb25cclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKi9cclxuICBvblNlbGVjdCh7c2VsZWN0ZWR9KSB7XHJcbiAgICBjb25zb2xlLmxvZygnU2VsZWN0IEV2ZW50Jywgc2VsZWN0ZWQsIHRoaXMuc2VsZWN0ZWQpO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWQuc3BsaWNlKDAsIHRoaXMuc2VsZWN0ZWQubGVuZ3RoKTtcclxuICAgIHRoaXMuc2VsZWN0ZWQucHVzaCguLi5zZWxlY3RlZCk7XHJcbiAgICB0aGlzLm9uU2VsZWN0ZWQuZW1pdCh0aGlzLnNlbGVjdGVkKTtcclxuICB9XHJcblxyXG4gIG9uQWN0aXZhdGUoZXZlbnQpIHtcclxuXHJcbiAgfVxyXG5cclxuICB1cGRhdGVGaWx0ZXIoZXZlbnQpIHtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIHByb2Nlc3MgdGFibGUgZmlsdGVyLiBJZiBkYXRlIGZpbHRlciBpcyBub3QgcHJvdmlkZSB0aGUgZnJvbSB2YWx1ZSBpc1xyXG4gICAqIHNldCB0byAyMDE4LTAxLTAxIGFuZCB0byB2YWx1ZSBpcyBzZXQgdG8gMSB5ZWFyIGZyb20gdG9kYXlcclxuICAgKiBAcGFyYW0gZm9ybVxyXG4gICAqL1xyXG4gIHByb2Nlc3NGaWx0ZXIoZm9ybSkge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgY29uc3QgZjogTWFwPFN0cmluZywgYW55PiA9IG5ldyBNYXAoT2JqZWN0LmVudHJpZXModGhpcy5maWx0ZXJGb3JtLnZhbHVlKSk7XHJcbiAgICAvLyB2YWxpZGF0ZSBkYXRlXHJcbiAgICBpZiAoIXRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS50b3VjaGVkKSB7Ly8gaWYgZnJvbSBpcyBub3QgcG9wdWxhdGVkIHJlbW92ZSBmcm9tIHJlcXVlc3RcclxuICAgICAgZi5kZWxldGUoJ2Zyb20nKTtcclxuICAgICAgLy8gdGhpcy5maWx0ZXJGb3JtLmdldCgnZnJvbScpLnNldFZhbHVlKCcyMDE4LTAxLTAxJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBmLmdldCgnZnJvbScpLnNldFZhbHVlKG5ldyBEYXRlKHRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS52YWx1ZSkpO1xyXG4gICAgICBjb25zdCBmZCA9IG5ldyBEYXRlKHRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS52YWx1ZSk7XHJcbiAgICAgIC8vIGYuc2V0KCdmcm9tJywgZmQudG9JU09TdHJpbmcoKSk7XHJcbiAgICAgIGYuc2V0KCdmcm9tJywgdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZmQsICdkZC9NTS95eXl5JykpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmZpbHRlckZvcm0uZ2V0KCd0bycpLnRvdWNoZWQpIHsvLyBpZiB0byBpcyBub3QgcG9wdWxhdGVkIHJlbW92ZSBmcm9tIHJlcXVlc3RcclxuICAgICAgZi5kZWxldGUoJ3RvJyk7XHJcbiAgICAgIC8vIGxldCB0b0RhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAvLyB0b0RhdGUuc2V0RGF0ZSh0b0RhdGUuZ2V0RnVsbFllYXIoKSArIDEpO1xyXG4gICAgICAvLyB0aGlzLmZpbHRlckZvcm0uZ2V0KCd0bycpLnNldFZhbHVlKHRoaXMuZ2V0Rm9ybWF0dGVkRGF0ZSh0b0RhdGUpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGYuZ2V0KCd0bycpLnNldFZhbHVlKG5ldyBEYXRlKHRoaXMuZmlsdGVyRm9ybS5nZXQoJ3RvJykudmFsdWUpKTtcclxuICAgICAgY29uc3QgdGQgPSBuZXcgRGF0ZSh0aGlzLmZpbHRlckZvcm0uZ2V0KCd0bycpLnZhbHVlKTtcclxuICAgICAgLy8gZi5zZXQoJ3RvJywgdGQudG9JU09TdHJpbmcoKSk7XHJcbiAgICAgIGYuc2V0KCd0bycsIHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKHRkLCAnZGQvTU0veXl5eScpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvYWRQYWdlKHtvZmZzZXQ6IHRoaXMucGFnZS5udW1iZXIsIGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZX0sIGYpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyBpbnB1dFxyXG4gICAqIEBwYXJhbSBjb250cm9sXHJcbiAgICovXHJcbiAgaXNJbnB1dChjb250cm9sOiBhbnkpIHtcclxuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgTWxrSW5wdXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIHNlbGVjdFxyXG4gICAqIEBwYXJhbSBjb250cm9sXHJcbiAgICovXHJcbiAgaXNTZWxlY3QoY29udHJvbDogYW55KSB7XHJcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIE1sa1NlbGVjdDtcclxuICB9XHJcblxyXG4gIHJlc2V0KCkge1xyXG4gICAgdGhpcy5uZ09uSW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyB0ZXh0YXJlYVxyXG4gICAqL1xyXG4gIGlzVGV4dEFyZWEoY29udHJvbDogYW55KSB7XHJcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIE1sa1RleHRhcmVhO1xyXG4gIH1cclxuXHJcbiAgc3VtbWFyeUZ1bmMoY2VsbDogYW55KSB7XHJcbiAgICByZXR1cm4gKGBgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gZm9ybWF0IGRhdGUgdG8gc3RyaW5nIHl5eXktTU0tZGRcclxuICAgKiBAcGFyYW0gZGF0ZVxyXG4gICAqL1xyXG4gIGdldEZvcm1hdHRlZERhdGUoZGF0ZSkge1xyXG4gICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICBsZXQgbW9udGggPSAoMSArIGRhdGUuZ2V0TW9udGgoKSkudG9TdHJpbmcoKTtcclxuICAgIG1vbnRoID0gbW9udGgubGVuZ3RoID4gMSA/IG1vbnRoIDogJzAnICsgbW9udGg7XHJcblxyXG4gICAgbGV0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICBkYXkgPSBkYXkubGVuZ3RoID4gMSA/IGRheSA6ICcwJyArIGRheTtcclxuXHJcbiAgICByZXR1cm4geWVhciArICctJyArIG1vbnRoICsgJy0nICsgZGF5O1xyXG4gIH1cclxuXHJcbiAgZ2V0RmllbGRWYWx1ZShkYXRhOiBPYmplY3QsIGZpZWxkOiBhbnkpIHtcclxuICAgIGNvbnN0IGs6IEFycmF5PHN0cmluZz4gPSBmaWVsZC5zcGxpdCgnLicpO1xyXG4gICAgY29uc3Qga2V5cyA9IG5ldyBRdWV1ZTxzdHJpbmc+KC4uLmspO1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldE9iamVjdFZhbHVlKGRhdGEsIGtleXMpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBmaW5kIGtleSB2YWx1ZSBiYXNlZCBvbiB0aGUga2V5IHNlcXVlbmNlIHByb3ZpZGVkXHJcbiAgICogQHBhcmFtIGRhdGEgZXhwZWN0cyBhbiBvYmplY3RcclxuICAgKiBAcGFyYW0ga2V5cyBpLmUuIHVzZXIuZ2VuZGVyLnR5cGUudHlwZVxyXG4gICAqL1xyXG4gIGdldE9iamVjdFZhbHVlKGRhdGE6IGFueSwga2V5czogUXVldWU8c3RyaW5nPikge1xyXG4gICAgaWYgKCghKGRhdGEgaW5zdGFuY2VvZiBPYmplY3QpKSB8fCAoa2V5cy5sZW5ndGggPT09IDEpKSB7XHJcbiAgICAgIHJldHVybiBkYXRhW2tleXMudGFpbF07XHJcbiAgICB9XHJcbiAgICBsZXQgdmFsdWUgPSBudWxsO1xyXG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgIGlmICgoa2V5ID09PSBrZXlzLmZyb250KSAmJiAoZGF0YVtrZXldIGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgIHZhbHVlID0gdGhpcy5nZXRPYmplY3RWYWx1ZShkYXRhW2tleV0sIGtleXMpO1xyXG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0ga2V5cy50YWlsKSB7XHJcbiAgICAgICAgdmFsdWUgPSBkYXRhW2tleV07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG5cclxuICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogVXNlZCB0byBkZWZpbmUgZGF0YXRhYmxlIGNvbHVtbnMgd2l0aCBhdHRyaWJ1dGVzIChjb2x1bW5OYW1lLCBmaWVsZE5hbWUsIHdpZHRoLCBzb3J0YWJsZSwgY2FuQXV0b1Jlc2l6ZSxcclxuICogZHJhZ2dhYmxlLCByZXNpemFibGUsIGlzRGF0ZUNvbHVtbiwgaXNDdXJyZW5jeUNvbHVtbiwgY3VycmVuY3lUZXh0LCBzdW1tYXJ5RnVuYylcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWxrRGF0YVRhYmxlQ29sdW1uIHtcclxuICAvKipcclxuICAgKiBjb2x1bW4gdGl0bGVcclxuICAgKi9cclxuICBjb2x1bW5OYW1lOiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogU2VydmVyIHNpZGUgcmVzcG9uc2UgZmllbGQgY29ycmVzcG9uZGluZyB0byB0aGUgY29sdW1uIGkuZSBmdWxsTmFtZSBtYXkgY29ycmVzcG9uZCB0byBOYW1lIGNvbHVtblxyXG4gICAqL1xyXG4gIGZpZWxkTmFtZTogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIFdpZHRoIG9mIHRoZSBjb2x1bW5cclxuICAgKi9cclxuICB3aWR0aD86IG51bWJlcjtcclxuICAvKipcclxuICAgKiBFbmFibGUgc29ydGluZyBpbiBhIGNvbHVtblxyXG4gICAqL1xyXG4gIHNvcnRhYmxlPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBNYWtlcyBhIGNvbHVtbiByZXNpemFibGVcclxuICAgKi9cclxuICBjYW5BdXRvUmVzaXplPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBFbmFibGVzIGEgY29sdW1uIHRvIGJlIGRyYWdnYWJsZVxyXG4gICAqL1xyXG4gIGRyYWdnYWJsZT86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogTWFrZXMgYSBjb2x1bW4gcmVzaXphYmxlXHJcbiAgICovXHJcbiAgcmVzaXplYWJsZT86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBlbmFibGUgZm9ybWF0aW5nIHRpbWVzdGFtcCB0byBzdHJpbmcgZGF0ZVxyXG4gICAqL1xyXG4gIGlzRGF0ZUNvbHVtbj86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gZW5hYmxlIGZvcm1hdGluZyBzdHJpbmcgdG8gc3RyaW5nIGN1cnJlbmN5XHJcbiAgICovXHJcbiAgaXNDdXJyZW5jeUNvbHVtbj86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gc2V0IHRoZSBjdXJyZW5jeSBzdHJpbmdcclxuICAgKi9cclxuICBjdXJyZW5jeVRleHQ/OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHRvIGNhbGwgYXQgdGhlIHN1bW1hcnkgcm93XHJcbiAgICovXHJcbiAgc3VtbWFyeUZ1bmM/OiAoYW55OiBhbnlbXSkgPT4gYW55O1xyXG59XHJcblxyXG4vKipcclxuICogVXNlZCB0byBkaXNwbGF5IG1vcmUgYWN0aW9ucyBjb2x1bW4gYW5kIHRoZSBlbmQgb2YgdGhlIHRhYmxlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWxrTW9yZUFjdGlvbnMge1xyXG4gIC8qKlxyXG4gICAqIEFjdGlvbiBDb2x1bW4gbmFtZSBlLmcuIE1vcmUgQWN0aW9uc1xyXG4gICAqL1xyXG4gIG5hbWUgPSAnQWN0aW9ucyc7XHJcbiAgLyoqXHJcbiAgICogRmllbGQgbmFtZSBpZCBmcm9tIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgZS5nIHVzZXJJZFxyXG4gICAqL1xyXG4gIGlkRmllbGROYW1lID0gJ2lkJztcclxuICAvKipcclxuICAgKiBBY3Rpb25zIGUuZy4gRWRpdCwgRGVsZXRlXHJcbiAgICovXHJcbiAgYWN0aW9uczogQXJyYXk8TWxrTW9yZUFjdGlvbkRhdGE+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihhY3Rpb25zOiBBcnJheTxNbGtNb3JlQWN0aW9uRGF0YT4sIGlkPzogc3RyaW5nLCBuYW1lPzogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuaWRGaWVsZE5hbWUgPSBpZDtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1sa01vcmVBY3Rpb25EYXRhIHtcclxuICAvKipcclxuICAgKiBOZXZlciBtaW5kIHRoaXMgZmllbGQgaXQgd2lsbCBiZSB1c2VkIGJ5IHRoZSBsaWJyYXJ5XHJcbiAgICovXHJcbiAgaWQ/OiBhbnk7XHJcbiAgLyoqXHJcbiAgICogQWN0aW9uIG5hbWUgZS5nLiBFZGl0LCBEZWxldGVcclxuICAgKi9cclxuICBhY3Rpb25OYW1lOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGlvbiByb3cgOiB0aGUgY2xpY2tlZCByb3dcclxuICAgKi9cclxuICBhY3Rpb25Sb3c/OiBhbnk7XHJcbn1cclxuIiwiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7U3Rld2FyZENsaWVudENvbXBvbmVudH0gZnJvbSAnLi9zdGV3YXJkLWNsaWVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQge01sa0RhdGF0YWJsZUNvbXBvbmVudH0gZnJvbSAnLi9tbGstZGF0YXRhYmxlL21say1kYXRhdGFibGUuY29tcG9uZW50JztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGUsIERhdGVQaXBlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge05neERhdGF0YWJsZU1vZHVsZX0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xyXG5pbXBvcnQge1JlYWN0aXZlRm9ybXNNb2R1bGUsIEZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQge1N0ZXdhcmRDb25maWd9IGZyb20gJy4vc3Rld2FyZC1jbGllbnQuc2VydmljZSc7XHJcbmltcG9ydCB7QnNEYXRlcGlja2VyTW9kdWxlfSBmcm9tICduZ3gtYm9vdHN0cmFwL2RhdGVwaWNrZXInO1xyXG5pbXBvcnQge0V4cG9ydEFzTW9kdWxlfSBmcm9tICduZ3gtZXhwb3J0LWFzJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgTmd4RGF0YXRhYmxlTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgQnNEYXRlcGlja2VyTW9kdWxlLmZvclJvb3QoKSxcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBFeHBvcnRBc01vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbU3Rld2FyZENsaWVudENvbXBvbmVudCwgTWxrRGF0YXRhYmxlQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbU3Rld2FyZENsaWVudENvbXBvbmVudCwgTWxrRGF0YXRhYmxlQ29tcG9uZW50XSxcclxuICBwcm92aWRlcnM6IFtEYXRlUGlwZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDbGllbnRNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogU3Rld2FyZENvbmZpZykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IFN0ZXdhcmRDbGllbnRNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW3twcm92aWRlOiBTdGV3YXJkQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnfV1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBO0NBYUM7Ozs7OztBQ2hCRDtDQVlDOzs7O0FBR0Q7Ozs7OztJQVNFLFlBQW9CLElBQWdCLEVBQVUsTUFBcUIsRUFBVSxJQUFVO1FBQW5FLFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUx2RixhQUFRLEdBQUcsR0FBRyxDQUFDO1FBTWIsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtZQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQztTQUNwRDtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQy9CO2FBQU07WUFDTCxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDO29CQUM3QixjQUFjLEVBQUUsaUNBQWlDO29CQUNqRCxjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUk7aUJBQzFCLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUM7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