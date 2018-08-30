import { Injectable, Component, EventEmitter, Input, Output, ViewChild, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Queue } from 'queue-typescript';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Wraps server response
 * @template T
 */
class ResponseWrapper {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        if (this.headers.get("Authorization") && (!headers)) {
            headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
/** @nocollapse */
StewardClientComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Datable page used to wrapper server content response
 * @template T
 */
class Page {
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
    constructor() {
        this.sorted = false;
        this.unsorted = true;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MlkDatatableComponent {
    /**
     * @param {?} sterwardService
     */
    constructor(sterwardService) {
        this.sterwardService = sterwardService;
        this.columns = [];
        this.enableCheckbox = true;
        this.onActionsEvent = new EventEmitter();
        this.filterComponents = [];
        this.page = new Page();
        this.selected = [];
        this.filter = {};
    }
    ;
    /**
     * Generate form control from filterComponents and also appending default controls ie. date filter and search controls
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        let group = {};
        this.filterComponents.forEach(comp => {
            /** @type {?} */
            let validators = [];
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
        //add default controls
        group['from'] = new FormControl('', Validators.maxLength(100));
        group['to'] = new FormControl('', Validators.maxLength(100));
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
        request.set("page", pageInfo.offset);
        request.set("size", pageInfo.limit);
        this.sterwardService.get(this.endpoint, request).subscribe(response => {
            if (response.code == 200) {
                this.page = response.data;
            }
        });
    }
    /**
     * Used to handle select option
     * @param {?} event
     * @return {?}
     */
    onSelect(event) {
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
        /** @type {?} */
        let f = new Map(Object.entries(this.filterForm.value));
        //validate date
        if (!this.filterForm.get('from').touched) {
            //if from is not populated remove from request
            f.delete('from');
            // this.filterForm.get('from').setValue('2018-01-01');
        }
        if (!this.filterForm.get('to').touched) {
            //if to is not populated remove from request
            f.delete('to');
            // let toDate = new Date();
            // toDate.setDate(toDate.getFullYear() + 1);
            // this.filterForm.get('to').setValue(this.getFormattedDate(toDate));
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
     * Used to check if miliki control is textarea
     * @param {?} control
     * @return {?}
     */
    isTextArea(control) {
        return control instanceof MlkTextarea;
    }
    /**
     * Used to format date to string yyyy-MM-dd
     * @param {?} date
     * @return {?}
     */
    getFormattedDate(date) {
        /** @type {?} */
        var year = date.getFullYear();
        /** @type {?} */
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        /** @type {?} */
        var day = date.getDate().toString();
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
        var k = field.split(".");
        /** @type {?} */
        var keys = new Queue(...k);
        /** @type {?} */
        let value = this.getObjectValue(data, keys);
        return value;
    }
    /**
     * Used to find key value based on the key sequence provided
     * @param {?} data expects an object
     * @param {?} keys i.e. user.gender.type.type
     * @return {?}
     */
    getObjectValue(data, keys) {
        if ((!(data instanceof Object)) || (keys.length == 1)) {
            return data[keys.tail];
        }
        /** @type {?} */
        let value = null;
        Object.keys(data).forEach((key) => {
            if ((key == keys.front) && (data[key] instanceof Object)) {
                value = this.getObjectValue(data[key], keys);
            }
            else if (key == keys.tail) {
                value = data[key];
            }
        });
        return value;
    }
}
MlkDatatableComponent.decorators = [
    { type: Component, args: [{
                selector: 'stw-mlk-datatable',
                template: `<div class="card card-outline-default">
    <div class="card-body">
      <form (ngSubmit)="processFilter(filterForm)" [formGroup]="filterForm">
        <div class="row">
          <div class="col-md-3  mb-3" *ngFor="let control of filterComponents">
            <label for="from">{{control.label}}: </label>
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text  form-icon-default">
                  <i [class]="control.icon"></i>
                </span>
              </div>
  
              <select *ngIf="isSelect(control.controlType)" class="form-control form-control-sm checking-field" [formControlName]="control.name">
                <option value="" disabled selected>{{control.placeholder}}</option>
                <option *ngFor="let o of control.controlType.options" [value]="o.value">{{o.text}}</option>
              </select>
  
              <textarea *ngIf="isTextArea(control.controlType)" [cols]="control.controlType.cols" [rows]="control.controlType.rows" class="form-control form-control-sm checking-field"
                [placeholder]="control.placeholder" [formControlName]="control.name"></textarea>
  
              <input *ngIf="isInput(control.controlType)" [type]="control.controlType.type" [placeholder]="control.placeholder" class="form-control form-control-sm checking-field"
                [formControlName]="control.name" />
            </div>
            <span class="help-block" *ngIf="filterForm.get(control.name).touched">
              <span class="text-danger" *ngIf="filterForm.get(control.name).hasError('required')">{{control.placeholder}} is required</span>
              <span class="text-danger" *ngIf="filterForm.get(control.name).hasError('minlength')">Minimum of {{control.controlType.minLength}} characters</span>
              <span class="text-danger" *ngIf="filterForm.get(control.name).hasError('maxlength')">Maximum of {{control.controlType.maxLength}} characters</span>
              <span class="text-danger" *ngIf="filterForm.get(control.name).hasError('min')">Should be greater than {{control.controlType.min}}</span>
              <span class="text-danger" *ngIf="filterForm.get(control.name).hasError('max')">Should be less than {{control.controlType.max}}</span>
            </span>
          </div>
          <div class="col-md-3  mb-3">
            <label for="from">From: </label>
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text  form-icon-default">
                  <i class="fa fa-calendar-o"></i>
                </span>
              </div>
              <input type="date" placeholder="From..." class="form-control form-control-sm checking-field"
                formControlName="from" />
            </div>
            <span class="help-block" *ngIf="filterForm.get('from').touched">
                <span class="text-danger" *ngIf="filterForm.get('from').hasError('maxlength')">Maximum of 100 characters</span>
            </span>
          </div>
          <div class="col-md-3  mb-3">
            <label for="from">To: </label>
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text  form-icon-default">
                  <i class="fa fa-calendar-o"></i>
                </span>
              </div>
              <input type="date" placeholder="To..." class="form-control form-control-sm checking-field"
                formControlName="to" value="" />
            </div>
            <span class="help-block" *ngIf="filterForm.get('from').touched">
                <span class="text-danger" *ngIf="filterForm.get('from').hasError('maxlength')">Maximum of 100 characters</span>
            </span>
          </div>
          <div class="col-md-3 mb-3">
            <label for="search">Search:</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text form-icon-default">
                  <i class="fa fa-search"></i>
                </span>
              </div>
              <input formControlName="needle" class="form-control form-control-sm checking-field" type="text"
                placeholder="Search..." (keyup)="updateFilter($event)" />
            </div>
          </div>
          <span class="help-block" *ngIf="filterForm.get('from').touched">
              <span class="text-danger" *ngIf="filterForm.get('from').hasError('maxlength')">Maximum of 200 characters</span>
          </span>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="pull-right inline-buttons">
              <button class="btn btn-secondary btn-sm" type="reset">
                <i class="fa fa-repeat" aria-hidden="true"></i>
                Reset
              </button>
              <button class="btn btn-primary btn-sm pull-right" type="submit">
                <i class="fa fa-sort-amount-asc" aria-hidden="true"></i>
                Filter
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  
  <ngx-datatable #table class="bootstrap" [headerHeight]="50" [columnMode]="'force'" [footerHeight]="50" [rowHeight]="'auto'"
    [rows]="page.content" [selected]="selected" [selectionType]="'checkbox'" (activate)="onActivate($event)" (select)='onSelect($event)'
    [count]="page.totalElements" [offset]="page.number" [externalPaging]="true" [limit]="page.size" (page)="loadPage($event, null)">
    <ngx-datatable-column [width]="30" [sortable]="false" [canAutoResize]="false" [draggable]="true" [resizeable]="false" [headerCheckboxable]="true"
      [checkboxable]="true" *ngIf="enableCheckbox">
    </ngx-datatable-column>
    <ngx-datatable-column [canAutoResize]="(c.canAutoResize) ? c.canAutoResize : true" [name]="c.columnName" [width]="c.width"
      [sortable]="(c.sortable) ? c.sortable : true" [draggable]="(c.draggable) ? c.draggable : true" [resizeable]="(c.resizeable) ? c.resizeable : true"
      *ngFor="let c of columns">
      <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row">
        <span>
            {{(c.isDateColumn)? (getFieldValue(row, c.fieldName) | date:'medium') : getFieldValue(row, c.fieldName)}}
        </span>
      </ng-template>
    </ngx-datatable-column>
    <ngx-datatable-column [name]="moreActions.name" *ngIf="moreActions" [sortable]="false" [canAutoResize]="false">
      <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row">
        <span>
          <div class="input-group-prepend">
            <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              <i class="fa fa-list-ul" aria-hidden="true"></i>
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" *ngFor="let action of moreActions.actions" href="javascript:;" (click)="onActionClick({id: row[moreActions.idFieldName], actionName: action.actionName})">{{action.actionName}}</a>
              <!-- <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                            <div role="separator" class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Separated link</a> -->
            </div>
          </div>
        </span>
      </ng-template>
    </ngx-datatable-column>
    <!-- <ngx-datatable-column name="Description">
              <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row">
                <span>
                  {{value}}
                </span>
              </ng-template>
            </ngx-datatable-column>
            <ngx-datatable-column name="Actions">
              <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row">
                <span>
                  {{value}}
                </span>
              </ng-template>
            </ngx-datatable-column> -->
  </ngx-datatable>`,
                styles: [``]
            },] },
];
/** @nocollapse */
MlkDatatableComponent.ctorParameters = () => [
    { type: StewardClientService }
];
MlkDatatableComponent.propDecorators = {
    columns: [{ type: Input }],
    enableCheckbox: [{ type: Input }],
    endpoint: [{ type: Input }],
    moreActions: [{ type: Input }],
    onActionsEvent: [{ type: Output }],
    filterComponents: [{ type: Input }],
    params: [{ type: Input }],
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
        this.name = "Actions";
        /**
         * Field name id from the server response e.g userId
         */
        this.idFieldName = "id";
        this.actions = actions;
        this.name = name;
        this.idFieldName = id;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                    HttpClientModule
                ],
                declarations: [StewardClientComponent, MlkDatatableComponent],
                exports: [StewardClientComponent, MlkDatatableComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { StewardConfig, StewardClientService, StewardClientComponent, MlkDatatableComponent, MlkMoreActions, StewardClientModule, MlkDynamicControl, MlkInput, MlkTextarea, MlkSelect, MlkSelectOption, Page, Sort, ResponseWrapper };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQuanMubWFwIiwic291cmNlcyI6WyJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy93cmFwcGVycy9yZXNwb25zZS13cmFwcGVyLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvc3Rld2FyZC1jbGllbnQuc2VydmljZS50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50LmNvbXBvbmVudC50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy93cmFwcGVycy9tbGstZHluYW1pYy1jb250cm9sLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvbWxrLWRhdGF0YWJsZS9tbGstZGF0YXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogV3JhcHMgc2VydmVyIHJlc3BvbnNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVzcG9uc2VXcmFwcGVyPFQ+IHtcclxuICAgIC8qKlxyXG4gICAgICogSHR0cCBzdGF0dXMgY29kZSBlLmcuIDIwMFxyXG4gICAgICovXHJcbiAgICBjb2RlOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFNlcnZlciBtZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogQWN0dWFsIHJlc3BvbnNlIGRhdGFcclxuICAgICAqL1xyXG4gICAgZGF0YTogVDtcclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBSZXNwb25zZVdyYXBwZXIgfSBmcm9tICcuL2VudGl0aWVzL3dyYXBwZXJzL3Jlc3BvbnNlLXdyYXBwZXInO1xuXG5leHBvcnQgY2xhc3MgU3Rld2FyZENvbmZpZyB7XG4gICAgYmFzZV91cmw6IHN0cmluZztcbiAgICBhY2Nlc3NfdG9rZW4/OiBzdHJpbmc7XG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudFNlcnZpY2U8VCwgRT4ge1xuXG4gICAgcHJpdmF0ZSBoZWFkZXJzOiBIdHRwSGVhZGVycztcbiAgICB0b2tlbjogc3RyaW5nO1xuICAgIGJhc2VfdXJsOiBzdHJpbmcgPSBcIi9cIjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgY29uZmlnOiBTdGV3YXJkQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuYmFzZV91cmwgPSBjb25maWcuYmFzZV91cmw7XG4gICAgICAgIGlmIChjb25maWcuaGVhZGVycykge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnLmFjY2Vzc190b2tlbikgey8vYXBwZW5kIGFjY2VzcyB0b2tlbiBpZiB0aGUgZW52aXJvbm1lbnQgaGFzIGFjY2VzcyB0b2tlblxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5oZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIFwiQmVhcmVyIFwiICsgY29uZmlnLmFjY2Vzc190b2tlbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBoYW5kbGUgaHR0cCBwb3N0IHJlcXVlc3RzXG4gICAgICovXG4gICAgcG9zdChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gaGFuZGxlIGh0dHAgcG9zdCByZXF1ZXN0c1xuICAgICAqL1xuICAgIHB1dChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBKU09OLnN0cmluZ2lmeShkYXRhKSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSkucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZGVsZXRlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QoJ2RlbGV0ZScsIHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpIH0pLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldChlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMuZ2V0SHR0cFBhcmFtcyhkYXRhKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIG9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgZ2V0RmlsZShlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMuZ2V0SHR0cFBhcmFtcyhkYXRhKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQgKyAnP2FjY2Vzc190b2tlbj0nICsgdGhpcy50b2tlbiwgb3B0aW9ucykucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGlmXG4gICAgICogQHBhcmFtIGVuZHBvaW50IFxuICAgICAqIEBwYXJhbSBkYXRhIFxuICAgICAqIEBwYXJhbSBoZWFkZXJzIFxuICAgICAqL1xuICAgIHBvc3RGb3JtRGF0YShlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBULCBoZWFkZXJzPzogSHR0cEhlYWRlcnMpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYodGhpcy5oZWFkZXJzLmdldChcIkF1dGhvcml6YXRpb25cIikgJiYgKCFoZWFkZXJzKSl7XG4gICAgICAgICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHsgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuIH0pO1xuICAgICAgICB9IGVsc2UgaWYoIWhlYWRlcnMpe1xuICAgICAgICAgICAgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIGZvcm1EYXRhLCB7IGhlYWRlcnM6IGhlYWRlcnN9KS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwb3N0Rm9ybURhdGFNdWx0aXBhcnQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhW2tleV0uZm9yRWFjaChrMiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGsyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIGZvcm1EYXRhLCB7IGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7ICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy50b2tlbiB9KSB9KS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdXRGb3JtRGF0YU11bHRpUGFydChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICAgICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSkge1xuICAgICAgICAgICAgICAgIGRhdGFba2V5XS5mb3JFYWNoKGsyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgazIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBmb3JtRGF0YSwgeyBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoeyAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMudG9rZW4gfSkgfSkucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRIdHRwUGFyYW1zKGRhdGE6IE1hcDxzdHJpbmcsIHN0cmluZz4pOiBIdHRwUGFyYW1zIHtcbiAgICAgICAgaWYgKGRhdGEgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaHR0cFBhcmFtczogSHR0cFBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIGRhdGEuZm9yRWFjaCgodmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGNhdGNoIGV4Y2VwdGlvbiB0aHJvd24gYnkgaHR0cCBjbGllbnQgcmV0dXJucyBpbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcbiAgICAgKiBpZiBzdGF0dXMgNTAwIGlzIGVuY291bnRlcmVkXG4gICAgICovXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcjxSZXNwb25zZVdyYXBwZXI+KCkge1xuICAgICAgICByZXR1cm4gKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSk6IE9ic2VydmFibGU8YW55PiA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBuZXcgUmVzcG9uc2VXcmFwcGVyKCk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpOyAvLyBsb2cgdG8gY29uc29sZSBpbnN0ZWFkXG4gICAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09IDUwMCkge1xuICAgICAgICAgICAgICAgIHJlcy5jb2RlID0gZXJyb3Iuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlcy5tZXNzYWdlID0gJ1NvcnJ5IGludGVybmFsIHNlcnZlciBlcnJvciBvY2N1cmVkIHBsZWFzZSB0cnkgYWdhaW4gbGF0ZXInO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXMuY29kZSA9IGVycm9yLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXMubWVzc2FnZSA9IGVycm9yLmVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgcmVzLmRhdGEgPSBlcnJvci5lcnJvci5kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9mKHJlcyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gcmVuZGVyIGFjdGlvbiBidXR0b25zXG4gICAgICovXG4gICAgc3RhdGljIHJlbmRlck1vcmUoaWQ6IGFueSkge1xuICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XFwnYWN0aW9ucy1idXR0b25zIGNlbnRlclxcJyBpZD1cXCcnICsgaWQgKyAnXFwnPjxpIGNsYXNzPVxcJ2ZhIGZhLWNoZWNrXFwnIHRpdGxlPVxcJ0FwcHJvdmVcXCc+PC9pPiA8aSBjbGFzcz1cXCdmYSBmYS1iYW5cXCcgdGl0bGU9XFwnRGVjbGluZVxcJz48L2k+PC9kaXY+JztcbiAgICB9XG5cbiAgICBwdWJsaWMgaW50aWF0ZURhdGFUYWJsZShlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPikge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgICAgICAgcGFyYW1zOiB0aGlzLmdldEh0dHBQYXJhbXMoZGF0YSlcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBvcHRpb25zKS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzdHctc3Rld2FyZC1jbGllbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgc3Rld2FyZC1jbGllbnQgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDbGllbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiLyoqXHJcbiAqIERhdGFibGUgcGFnZSB1c2VkIHRvIHdyYXBwZXIgc2VydmVyIGNvbnRlbnQgcmVzcG9uc2VcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQYWdlPFQ+IHtcclxuICAgIC8qKlxyXG4gICAgICogTnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlIHNhbWUgYXMgbGltaXRcclxuICAgICAqL1xyXG4gICAgc2l6ZTogbnVtYmVyID0gMTA7XHJcbiAgICAvKipcclxuICAgICAqIFRvdGFsIGl0ZW1zIGF2YWlsYWJsZSBvbiB0aGUgc2VydmVyXHJcbiAgICAgKi9cclxuICAgIHRvdGFsRWxlbWVudHM6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIFRvdGFsIG51bWJlciBvZiBwYWdlcyBwcmVzZW50XHJcbiAgICAgKi9cclxuICAgIHRvdGFsUGFnZXM6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBpcyB0aGUgZmlyc3QgcGFnZVxyXG4gICAgICovXHJcbiAgICBmaXJzdDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBpdCBpcyB0aGUgbGFzdCBwYWdlXHJcbiAgICAgKi9cclxuICAgIGxhc3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGFjdHVhbCBwYWdlIGNvbnRlbnRcclxuICAgICAqL1xyXG4gICAgY29udGVudDogQXJyYXk8VD4gPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byBtYXAgc29ydCBwYXJhbWV0ZXJzXHJcbiAgICAgKi9cclxuICAgIHNvcnRlZDogU29ydCA9IG5ldyBTb3J0KCk7XHJcbiAgICAvKipcclxuICAgICAqIEN1cnJlbnQgcGFnZSBudW1iZXJcclxuICAgICAqL1xyXG4gICAgbnVtYmVyOiBudW1iZXIgPSAwO1xyXG59XHJcbi8qKlxyXG4gKiB1c2VkIHRvIG1hcCBzb3J0IHJlcXVlc3RcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTb3J0e1xyXG4gICAgc29ydGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICB1bnNvcnRlZDogYm9vbGVhbiA9IHRydWU7XHJcbn1cclxuIiwiLyoqXG4gKiBSZXByZXNlbnRzIGR5bmFtaWMgaHRtbCBjb250cm9scyAoSW5wdXQsIFRleHRBcmVhIGFuZCBTZWxlY3QpXG4gKi9cbmV4cG9ydCBjbGFzcyBNbGtEeW5hbWljQ29udHJvbDxUPiB7XG4gICAgLyoqXG4gICAgICogQ29udHJvbCBsYWJlbFxuICAgICAqL1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogSWNvbiB0byBiZSBhcHBlbmRlZCBiZWZvcmUgdGhlIGNvbnRyb2wgKHN1cHBvcnRzIGNsYXNzIGRlZmluZWQgaWNvbnMpXG4gICAgICovXG4gICAgaWNvbjogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGNvbnRyb2wgKHByb3ZpZGUgdmFyaWFibGUgdmFsaWQgbmFtZXMgaWUuIG5vIHNwYWNlcyBwcmVmYXJhYmx5IGFwaSBjb3JyZXNwb25kaW5nIG5hbWVzIGUuZy4gdXNlck5hbWUpXG4gICAgICovXG4gICAgbmFtZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBhY3R1YWwgY29udHJvbCAoTWxrSW5wdXQsIE1sa1RleHRBcmVhICYgTWxrU2VsZWN0KVxuICAgICAqL1xuICAgIGNvbnRyb2xUeXBlOiBUO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgZmllbGQgaXMgcmVxdWlyZWRcbiAgICAgKi9cbiAgICBpc1JlcXVpcmVkOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIENvbnRyb2wgcGxhY2Vob2xkZXJcbiAgICAgKi9cbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nID0gXCJcIjtcblxuICAgIGNvbnN0cnVjdG9yKGxhYmVsOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY29udHJvbFR5cGU6IFQsIGljb246IHN0cmluZyA9IFwiZmEgZmEtZmlsZS10ZXh0LW9cIixcbiAgICAgICAgaXNSZXF1aXJlZDogYm9vbGVhbiA9IHRydWUsIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBudWxsKSB7XG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jb250cm9sVHlwZSA9IGNvbnRyb2xUeXBlO1xuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xuICAgICAgICB0aGlzLmlzUmVxdWlyZWQgPSBpc1JlcXVpcmVkO1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXIgPyBwbGFjZWhvbGRlciA6IGxhYmVsO1xuICAgIH1cblxufVxuLyoqXG4gKiBVc2VkIHRvIHJlcHJlc2VudCBodG1sIGlucHV0IHdpdGggb3B0aW9uczpcbiAqIHR5cGU6IGRlZmF1bHQgdG8gdGV4dCwgIG1heExlbmd0aCwgbWluTGVuZ3RoLCBtaW4sIG1heFxuICovXG5leHBvcnQgY2xhc3MgTWxrSW5wdXR7XG4gICAgLyoqXG4gICAgICogVHlwZSBvZiBpbnB1dCBlLmcuIHRleHQsIG51bWJlciwgZGF0ZVxuICAgICAqL1xuICAgIHR5cGU6IHN0cmluZyA9IFwidGV4dFwiO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgbGVuZ3RoIG9mIHRoZSBpbnB1dFxuICAgICAqL1xuICAgIG1heExlbmd0aDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgbWluaW11bSBpbnB1dCBsZW5ndGhcbiAgICAgKi9cbiAgICBtaW5MZW5ndGg6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIG51bWJlciBpbnB1dHNcbiAgICAgKi9cbiAgICBtaW46IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIG51bWJlciBpbnB1dHNcbiAgICAgKi9cbiAgICBtYXg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZyA9IFwidGV4dFwiKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMubWluTGVuZ3RoID0gdGhpcy5taW4gPSAwO1xuICAgICAgICB0aGlzLm1heExlbmd0aCA9IDQwMDA7XG4gICAgICAgIHRoaXMubWF4ID0gMTAwMDAwMDAwMDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBodG1sIHRleHRhcmVhIGlucHV0XG4gKi9cbmV4cG9ydCBjbGFzcyBNbGtUZXh0YXJlYXtcbiAgICAvKipcbiAgICAgKiBOdW1iZXIgdGV4dGFyZWEgY29sdW1uc1xuICAgICAqL1xuICAgIGNvbHM/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogTnVtYmVyIG9mIHRleHRhcmVhIHJvd3NcbiAgICAgKi9cbiAgICByb3dzPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIG1heGltdW0gaW5wdXQgbGVuZ3RoXG4gICAgICovXG4gICAgbWF4TGVuZ3RoOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgbWluaW11bSBpbnB1dCBsZW5ndGhcbiAgICAgKi9cbiAgICBtaW5MZW5ndGg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGNvbHM6IG51bWJlciA9IDUsIHJvd3M6IG51bWJlciA9IDEpe1xuICAgICAgICB0aGlzLmNvbHMgPSBjb2xzO1xuICAgICAgICB0aGlzLnJvd3MgPSByb3dzO1xuICAgICAgICB0aGlzLm1heExlbmd0aCA9IDQwMDA7XG4gICAgICAgIHRoaXMubWluTGVuZ3RoID0gMFxuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGh0bWwgc2VsZWN0IGNvbnRyb2xcbiAqL1xuZXhwb3J0IGNsYXNzIE1sa1NlbGVjdCB7XG4gICAgLyoqXG4gICAgICogU2VsZWN0IG9wdGlvbnNcbiAgICAgKi9cbiAgICBvcHRpb25zOiBBcnJheTxNbGtTZWxlY3RPcHRpb24+O1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogQXJyYXk8TWxrU2VsZWN0T3B0aW9uPil7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBNbGtTZWxlY3RPcHRpb257XG4gICAgLyoqXG4gICAgICogT3B0aW9uIHZhbHVlXG4gICAgICovXG4gICAgdmFsdWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBPcHRpb24gdGV4dC9sYWJlbFxuICAgICAqL1xuICAgIHRleHQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBzdHJpbmcsIHRleHQ6IHN0cmluZyA9IG51bGwpe1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQgPyB0ZXh0IDogdmFsdWU7XG4gICAgfVxuXG59XG5cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdGb3JtLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UnO1xuaW1wb3J0IHsgTWxrRHluYW1pY0NvbnRyb2wsIE1sa0lucHV0LCBNbGtUZXh0YXJlYSwgTWxrU2VsZWN0IH0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvbWxrLWR5bmFtaWMtY29udHJvbCc7XG5pbXBvcnQgeyBSZXNwb25zZVdyYXBwZXIgfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9yZXNwb25zZS13cmFwcGVyJztcbmltcG9ydCB7IFN0ZXdhcmRDbGllbnRTZXJ2aWNlIH0gZnJvbSAnLi4vc3Rld2FyZC1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhdGFibGVDb21wb25lbnQgfSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gJ3F1ZXVlLXR5cGVzY3JpcHQnO1xuLy9jb25zdCB7IFF1ZXVlIH0gPSByZXF1aXJlKCdxdWV1ZS10eXBlc2NyaXB0Jyk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N0dy1tbGstZGF0YXRhYmxlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY2FyZCBjYXJkLW91dGxpbmUtZGVmYXVsdFwiPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbiAgICAgIDxmb3JtIChuZ1N1Ym1pdCk9XCJwcm9jZXNzRmlsdGVyKGZpbHRlckZvcm0pXCIgW2Zvcm1Hcm91cF09XCJmaWx0ZXJGb3JtXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgIG1iLTNcIiAqbmdGb3I9XCJsZXQgY29udHJvbCBvZiBmaWx0ZXJDb21wb25lbnRzXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZnJvbVwiPnt7Y29udHJvbC5sYWJlbH19OiA8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgIGZvcm0taWNvbi1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICA8aSBbY2xhc3NdPVwiY29udHJvbC5pY29uXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gIFxuICAgICAgICAgICAgICA8c2VsZWN0ICpuZ0lmPVwiaXNTZWxlY3QoY29udHJvbC5jb250cm9sVHlwZSlcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZCBzZWxlY3RlZD57e2NvbnRyb2wucGxhY2Vob2xkZXJ9fTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IG8gb2YgY29udHJvbC5jb250cm9sVHlwZS5vcHRpb25zXCIgW3ZhbHVlXT1cIm8udmFsdWVcIj57e28udGV4dH19PC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICBcbiAgICAgICAgICAgICAgPHRleHRhcmVhICpuZ0lmPVwiaXNUZXh0QXJlYShjb250cm9sLmNvbnRyb2xUeXBlKVwiIFtjb2xzXT1cImNvbnRyb2wuY29udHJvbFR5cGUuY29sc1wiIFtyb3dzXT1cImNvbnRyb2wuY29udHJvbFR5cGUucm93c1wiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXG4gICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiPjwvdGV4dGFyZWE+XG4gIFxuICAgICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJpc0lucHV0KGNvbnRyb2wuY29udHJvbFR5cGUpXCIgW3R5cGVdPVwiY29udHJvbC5jb250cm9sVHlwZS50eXBlXCIgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxuICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLnRvdWNoZWRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcigncmVxdWlyZWQnKVwiPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19IGlzIHJlcXVpcmVkPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtaW5sZW5ndGgnKVwiPk1pbmltdW0gb2Yge3tjb250cm9sLmNvbnRyb2xUeXBlLm1pbkxlbmd0aH19IGNoYXJhY3RlcnM8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiB7e2NvbnRyb2wuY29udHJvbFR5cGUubWF4TGVuZ3RofX0gY2hhcmFjdGVyczwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWluJylcIj5TaG91bGQgYmUgZ3JlYXRlciB0aGFuIHt7Y29udHJvbC5jb250cm9sVHlwZS5taW59fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWF4JylcIj5TaG91bGQgYmUgbGVzcyB0aGFuIHt7Y29udHJvbC5jb250cm9sVHlwZS5tYXh9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgIG1iLTNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmcm9tXCI+RnJvbTogPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0ICBmb3JtLWljb24tZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhci1vXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIHBsYWNlaG9sZGVyPVwiRnJvbS4uLlwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwiZnJvbVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS50b3VjaGVkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDEwMCBjaGFyYWN0ZXJzPC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyAgbWItM1wiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZyb21cIj5UbzogPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0ICBmb3JtLWljb24tZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhci1vXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIHBsYWNlaG9sZGVyPVwiVG8uLi5cIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxuICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInRvXCIgdmFsdWU9XCJcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykudG91Y2hlZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiAxMDAgY2hhcmFjdGVyczwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgbWItM1wiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInNlYXJjaFwiPlNlYXJjaDo8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IGZvcm0taWNvbi1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXNlYXJjaFwiPjwvaT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwibmVlZGxlXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCIgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCIgKGtleXVwKT1cInVwZGF0ZUZpbHRlcigkZXZlbnQpXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS50b3VjaGVkXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiAyMDAgY2hhcmFjdGVyczwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInB1bGwtcmlnaHQgaW5saW5lLWJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiIHR5cGU9XCJyZXNldFwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcmVwZWF0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICAgIFJlc2V0XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbSBwdWxsLXJpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtc29ydC1hbW91bnQtYXNjXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICAgIEZpbHRlclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIFxuICA8bmd4LWRhdGF0YWJsZSAjdGFibGUgY2xhc3M9XCJib290c3RyYXBcIiBbaGVhZGVySGVpZ2h0XT1cIjUwXCIgW2NvbHVtbk1vZGVdPVwiJ2ZvcmNlJ1wiIFtmb290ZXJIZWlnaHRdPVwiNTBcIiBbcm93SGVpZ2h0XT1cIidhdXRvJ1wiXG4gICAgW3Jvd3NdPVwicGFnZS5jb250ZW50XCIgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCIgW3NlbGVjdGlvblR5cGVdPVwiJ2NoZWNrYm94J1wiIChhY3RpdmF0ZSk9XCJvbkFjdGl2YXRlKCRldmVudClcIiAoc2VsZWN0KT0nb25TZWxlY3QoJGV2ZW50KSdcbiAgICBbY291bnRdPVwicGFnZS50b3RhbEVsZW1lbnRzXCIgW29mZnNldF09XCJwYWdlLm51bWJlclwiIFtleHRlcm5hbFBhZ2luZ109XCJ0cnVlXCIgW2xpbWl0XT1cInBhZ2Uuc2l6ZVwiIChwYWdlKT1cImxvYWRQYWdlKCRldmVudCwgbnVsbClcIj5cbiAgICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gW3dpZHRoXT1cIjMwXCIgW3NvcnRhYmxlXT1cImZhbHNlXCIgW2NhbkF1dG9SZXNpemVdPVwiZmFsc2VcIiBbZHJhZ2dhYmxlXT1cInRydWVcIiBbcmVzaXplYWJsZV09XCJmYWxzZVwiIFtoZWFkZXJDaGVja2JveGFibGVdPVwidHJ1ZVwiXG4gICAgICBbY2hlY2tib3hhYmxlXT1cInRydWVcIiAqbmdJZj1cImVuYWJsZUNoZWNrYm94XCI+XG4gICAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cbiAgICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gW2NhbkF1dG9SZXNpemVdPVwiKGMuY2FuQXV0b1Jlc2l6ZSkgPyBjLmNhbkF1dG9SZXNpemUgOiB0cnVlXCIgW25hbWVdPVwiYy5jb2x1bW5OYW1lXCIgW3dpZHRoXT1cImMud2lkdGhcIlxuICAgICAgW3NvcnRhYmxlXT1cIihjLnNvcnRhYmxlKSA/IGMuc29ydGFibGUgOiB0cnVlXCIgW2RyYWdnYWJsZV09XCIoYy5kcmFnZ2FibGUpID8gYy5kcmFnZ2FibGUgOiB0cnVlXCIgW3Jlc2l6ZWFibGVdPVwiKGMucmVzaXplYWJsZSkgPyBjLnJlc2l6ZWFibGUgOiB0cnVlXCJcbiAgICAgICpuZ0Zvcj1cImxldCBjIG9mIGNvbHVtbnNcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtdmFsdWU9XCJ2YWx1ZVwiIGxldC1yb3c9XCJyb3dcIj5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICB7eyhjLmlzRGF0ZUNvbHVtbik/IChnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpIHwgZGF0ZTonbWVkaXVtJykgOiBnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpfX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxuICAgIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBbbmFtZV09XCJtb3JlQWN0aW9ucy5uYW1lXCIgKm5nSWY9XCJtb3JlQWN0aW9uc1wiIFtzb3J0YWJsZV09XCJmYWxzZVwiIFtjYW5BdXRvUmVzaXplXT1cImZhbHNlXCI+XG4gICAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXZhbHVlPVwidmFsdWVcIiBsZXQtcm93PVwicm93XCI+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1zZWNvbmRhcnkgZHJvcGRvd24tdG9nZ2xlXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWxpc3QtdWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+XG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgbW9yZUFjdGlvbnMuYWN0aW9uc1wiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiAoY2xpY2spPVwib25BY3Rpb25DbGljayh7aWQ6IHJvd1ttb3JlQWN0aW9ucy5pZEZpZWxkTmFtZV0sIGFjdGlvbk5hbWU6IGFjdGlvbi5hY3Rpb25OYW1lfSlcIj57e2FjdGlvbi5hY3Rpb25OYW1lfX08L2E+XG4gICAgICAgICAgICAgIDwhLS0gPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgaHJlZj1cIiNcIj5Bbm90aGVyIGFjdGlvbjwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiI1wiPlNvbWV0aGluZyBlbHNlIGhlcmU8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3M9XCJkcm9wZG93bi1kaXZpZGVyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgaHJlZj1cIiNcIj5TZXBhcmF0ZWQgbGluazwvYT4gLS0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxuICAgIDwhLS0gPG5neC1kYXRhdGFibGUtY29sdW1uIG5hbWU9XCJEZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXZhbHVlPVwidmFsdWVcIiBsZXQtcm93PVwicm93XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICB7e3ZhbHVlfX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxuICAgICAgICAgICAgPG5neC1kYXRhdGFibGUtY29sdW1uIG5hbWU9XCJBY3Rpb25zXCI+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtdmFsdWU9XCJ2YWx1ZVwiIGxldC1yb3c9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgIHt7dmFsdWV9fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+IC0tPlxuICA8L25neC1kYXRhdGFibGU+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIE1sa0RhdGF0YWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGNvbHVtbnM6IEFycmF5PE1sa0RhdGFUYWJsZUNvbHVtbj4gPSBbXTtcbiAgQElucHV0KCkgZW5hYmxlQ2hlY2tib3g6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBlbmRwb2ludDogc3RyaW5nO1xuICBASW5wdXQoKSBtb3JlQWN0aW9uczogTWxrTW9yZUFjdGlvbnM7XG4gIEBPdXRwdXQoKSBvbkFjdGlvbnNFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8TWxrTW9yZUFjdGlvbkRhdGE+KClcbiAgQElucHV0KCkgZmlsdGVyQ29tcG9uZW50czogQXJyYXk8TWxrRHluYW1pY0NvbnRyb2w8YW55Pj4gPSBbXTtcbiAgQElucHV0KCkgcGFyYW1zOiBNYXA8c3RyaW5nLCBhbnk+O1xuICBwYWdlOiBQYWdlPGFueT4gPSBuZXcgUGFnZSgpO1xuICBzZWxlY3RlZCA9IFtdO1xuICBAVmlld0NoaWxkKERhdGF0YWJsZUNvbXBvbmVudCkgdGFibGU6IERhdGF0YWJsZUNvbXBvbmVudDtcbiAgZmlsdGVyOiBPYmplY3QgPSB7fTtcbiAgZmlsdGVyRm9ybTogRm9ybUdyb3VwO1xuICA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdGVyd2FyZFNlcnZpY2U6IFN0ZXdhcmRDbGllbnRTZXJ2aWNlPFJlc3BvbnNlV3JhcHBlcjxQYWdlPGFueT4+LCBhbnk+KSB7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgZm9ybSBjb250cm9sIGZyb20gZmlsdGVyQ29tcG9uZW50cyBhbmQgYWxzbyBhcHBlbmRpbmcgZGVmYXVsdCBjb250cm9scyBpZS4gZGF0ZSBmaWx0ZXIgYW5kIHNlYXJjaCBjb250cm9sc1xuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgbGV0IGdyb3VwID0ge307XG4gICAgdGhpcy5maWx0ZXJDb21wb25lbnRzLmZvckVhY2goY29tcCA9PiB7XG4gICAgICBsZXQgdmFsaWRhdG9yczogQXJyYXk8YW55PiA9IFtdO1xuICAgICAgaWYgKGNvbXAuaXNSZXF1aXJlZCkge1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgICB9XG5cbiAgICAgIGlmKGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBNbGtJbnB1dCB8fCBjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgTWxrVGV4dGFyZWEpe1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW5MZW5ndGgoY29tcC5jb250cm9sVHlwZS5taW5MZW5ndGgpKTtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4TGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWF4TGVuZ3RoKSk7XG4gICAgICB9XG5cbiAgICAgIGlmKGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBNbGtJbnB1dCl7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heChjb21wLmNvbnRyb2xUeXBlLm1heCkpO1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW4oY29tcC5jb250cm9sVHlwZS5taW4pKTtcbiAgICAgIH1cbiAgICAgIGdyb3VwW2NvbXAubmFtZV0gPSBuZXcgRm9ybUNvbnRyb2woJycsIHZhbGlkYXRvcnMpXG4gICAgfSk7XG4gICAgLy9hZGQgZGVmYXVsdCBjb250cm9sc1xuICAgIGdyb3VwWydmcm9tJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDEwMCkpO1xuICAgIGdyb3VwWyd0byddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgxMDApKTtcbiAgICBncm91cFsnbmVlZGxlJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDIwMCkpO1xuICAgIHRoaXMuZmlsdGVyRm9ybSA9IG5ldyBGb3JtR3JvdXAoZ3JvdXApO1xuICAgIHRoaXMubG9hZFBhZ2UoeyBvZmZzZXQ6IDAsIGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZSB9LCBudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGVtaXQgY2xpY2sgZXZlbnQgb2YgdGhlIGFjdGlvbnNcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBvbkFjdGlvbkNsaWNrKGV2ZW50OiBNbGtNb3JlQWN0aW9uRGF0YSkge1xuICAgIHRoaXMub25BY3Rpb25zRXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyBzZXJ2ZXIgcmVxdWVzdCBvZiBkYXRhYmxlXG4gICAqIEBwYXJhbSBwYWdlSW5mb1xuICAgKiBAcGFyYW0gZmlsdGVyc1xuICAgKi9cbiAgbG9hZFBhZ2UocGFnZUluZm8sIGZpbHRlcnMpIHtcbiAgICBpZiAoIXRoaXMuZW5kcG9pbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHJlcXVlc3Q6IE1hcDxzdHJpbmcsIGFueT47XG4gICAgaWYgKGZpbHRlcnMpIHtcbiAgICAgIHJlcXVlc3QgPSBmaWx0ZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBpZih0aGlzLnBhcmFtcyl7XG4gICAgICB0aGlzLnBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KT0+e1xuICAgICAgICByZXF1ZXN0LnNldChrZXksIHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXF1ZXN0LnNldChcInBhZ2VcIiwgcGFnZUluZm8ub2Zmc2V0KTtcbiAgICByZXF1ZXN0LnNldChcInNpemVcIiwgcGFnZUluZm8ubGltaXQpO1xuICAgIHRoaXMuc3RlcndhcmRTZXJ2aWNlLmdldCh0aGlzLmVuZHBvaW50LCByZXF1ZXN0KS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLmNvZGUgPT0gMjAwKSB7XG4gICAgICAgIHRoaXMucGFnZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGhhbmRsZSBzZWxlY3Qgb3B0aW9uXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgb25TZWxlY3QoZXZlbnQpIHtcblxuICB9XG5cbiAgb25BY3RpdmF0ZShldmVudCkge1xuXG4gIH1cblxuICB1cGRhdGVGaWx0ZXIoZXZlbnQpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gcHJvY2VzcyB0YWJsZSBmaWx0ZXIuIElmIGRhdGUgZmlsdGVyIGlzIG5vdCBwcm92aWRlIHRoZSBmcm9tIHZhbHVlIGlzIFxuICAgKiBzZXQgdG8gMjAxOC0wMS0wMSBhbmQgdG8gdmFsdWUgaXMgc2V0IHRvIDEgeWVhciBmcm9tIHRvZGF5XG4gICAqIEBwYXJhbSBmb3JtIFxuICAgKi9cbiAgcHJvY2Vzc0ZpbHRlcihmb3JtKSB7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgbGV0IGY6IE1hcDxTdHJpbmcsIGFueT4gPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKHRoaXMuZmlsdGVyRm9ybS52YWx1ZSkpO1xuICAgIC8vdmFsaWRhdGUgZGF0ZSBcbiAgICBpZighdGhpcy5maWx0ZXJGb3JtLmdldCgnZnJvbScpLnRvdWNoZWQpey8vaWYgZnJvbSBpcyBub3QgcG9wdWxhdGVkIHJlbW92ZSBmcm9tIHJlcXVlc3RcbiAgICAgIGYuZGVsZXRlKCdmcm9tJyk7XG4gICAgICAvLyB0aGlzLmZpbHRlckZvcm0uZ2V0KCdmcm9tJykuc2V0VmFsdWUoJzIwMTgtMDEtMDEnKTtcbiAgICB9XG4gICAgaWYoIXRoaXMuZmlsdGVyRm9ybS5nZXQoJ3RvJykudG91Y2hlZCl7Ly9pZiB0byBpcyBub3QgcG9wdWxhdGVkIHJlbW92ZSBmcm9tIHJlcXVlc3RcbiAgICAgIGYuZGVsZXRlKCd0bycpO1xuICAgICAgLy8gbGV0IHRvRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAvLyB0b0RhdGUuc2V0RGF0ZSh0b0RhdGUuZ2V0RnVsbFllYXIoKSArIDEpO1xuICAgICAgLy8gdGhpcy5maWx0ZXJGb3JtLmdldCgndG8nKS5zZXRWYWx1ZSh0aGlzLmdldEZvcm1hdHRlZERhdGUodG9EYXRlKSk7XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkUGFnZSh7IG9mZnNldDogdGhpcy5wYWdlLm51bWJlciwgbGltaXQ6IHRoaXMucGFnZS5zaXplIH0sIGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgaW5wdXRcbiAgICogQHBhcmFtIGNvbnRyb2xcbiAgICovXG4gIGlzSW5wdXQoY29udHJvbDogYW55KSB7XG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBNbGtJbnB1dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIHNlbGVjdFxuICAgKiBAcGFyYW0gY29udHJvbFxuICAgKi9cbiAgaXNTZWxlY3QoY29udHJvbDogYW55KSB7XG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBNbGtTZWxlY3Q7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyB0ZXh0YXJlYVxuICAgKi9cbiAgaXNUZXh0QXJlYShjb250cm9sOiBhbnkpIHtcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIE1sa1RleHRhcmVhO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZm9ybWF0IGRhdGUgdG8gc3RyaW5nIHl5eXktTU0tZGRcbiAgICogQHBhcmFtIGRhdGVcbiAgICovXG4gIGdldEZvcm1hdHRlZERhdGUoZGF0ZSkge1xuICAgIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgdmFyIG1vbnRoID0gKDEgKyBkYXRlLmdldE1vbnRoKCkpLnRvU3RyaW5nKCk7XG4gICAgbW9udGggPSBtb250aC5sZW5ndGggPiAxID8gbW9udGggOiAnMCcgKyBtb250aDtcblxuICAgIHZhciBkYXkgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpO1xuICAgIGRheSA9IGRheS5sZW5ndGggPiAxID8gZGF5IDogJzAnICsgZGF5O1xuXG4gICAgcmV0dXJuIHllYXIgKyAnLScgKyBtb250aCArICctJyArIGRheTtcbiAgfVxuXG4gIGdldEZpZWxkVmFsdWUoZGF0YTogT2JqZWN0LCBmaWVsZDogYW55KXtcbiAgICB2YXIgazogQXJyYXk8c3RyaW5nPiA9IGZpZWxkLnNwbGl0KFwiLlwiKTtcbiAgICB2YXIga2V5cyA9IG5ldyBRdWV1ZTxzdHJpbmc+KC4uLmspO1xuICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0T2JqZWN0VmFsdWUoZGF0YSwga2V5cyk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZmluZCBrZXkgdmFsdWUgYmFzZWQgb24gdGhlIGtleSBzZXF1ZW5jZSBwcm92aWRlZFxuICAgKiBAcGFyYW0gZGF0YSBleHBlY3RzIGFuIG9iamVjdFxuICAgKiBAcGFyYW0ga2V5cyBpLmUuIHVzZXIuZ2VuZGVyLnR5cGUudHlwZVxuICAgKi9cbiAgZ2V0T2JqZWN0VmFsdWUoZGF0YTogYW55LCBrZXlzOiBRdWV1ZTxzdHJpbmc+KSB7XG4gICAgaWYgKCghKGRhdGEgaW5zdGFuY2VvZiBPYmplY3QpKSB8fCAoa2V5cy5sZW5ndGggPT0gMSkpICB7XG4gICAgICByZXR1cm4gZGF0YVtrZXlzLnRhaWxdO1xuICAgIH1cbiAgICBsZXQgdmFsdWUgPSBudWxsO1xuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKChrZXkgPT0ga2V5cy5mcm9udCkgJiYgKGRhdGFba2V5XSBpbnN0YW5jZW9mIE9iamVjdCkpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmdldE9iamVjdFZhbHVlKGRhdGFba2V5XSwga2V5cyk7XG4gICAgICB9IGVsc2UgaWYoa2V5ID09IGtleXMudGFpbCl7XG4gICAgICAgIHZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2YWx1ZTtcblxuICB9XG5cbn1cbi8qKlxuICogVXNlZCB0byBkZWZpbmUgZGF0YXRhYmxlIGNvbHVtbnMgd2l0aCBhdHRyaWJ1dGVzIChjb2x1bW5OYW1lLCBmaWVsZE5hbWUsIHdpZHRoLCBzb3J0YWJsZSwgY2FuQXV0b1Jlc2l6ZSxcbiAqIGRyYWdnYWJsZSwgcmVzaXphYmxlLCBpc0RhdGVDb2x1bW4pXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWxrRGF0YVRhYmxlQ29sdW1uIHtcbiAgLyoqXG4gICAqIGNvbHVtbiB0aXRsZVxuICAgKi9cbiAgY29sdW1uTmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogU2VydmVyIHNpZGUgcmVzcG9uc2UgZmllbGQgY29ycmVzcG9uZGluZyB0byB0aGUgY29sdW1uIGkuZSBmdWxsTmFtZSBtYXkgY29ycmVzcG9uZCB0byBOYW1lIGNvbHVtblxuICAgKi9cbiAgZmllbGROYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBXaWR0aCBvZiB0aGUgY29sdW1uXG4gICAqL1xuICB3aWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIEVuYWJsZSBzb3J0aW5nIGluIGEgY29sdW1uXG4gICAqL1xuICBzb3J0YWJsZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBNYWtlcyBhIGNvbHVtbiByZXNpemFibGVcbiAgICovXG4gIGNhbkF1dG9SZXNpemU/OiBib29sZWFuO1xuICAvKipcbiAgICogRW5hYmxlcyBhIGNvbHVtbiB0byBiZSBkcmFnZ2FibGVcbiAgICovXG4gIGRyYWdnYWJsZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBNYWtlcyBhIGNvbHVtbiByZXNpemFibGVcbiAgICovXG4gIHJlc2l6ZWFibGU/OiBib29sZWFuO1xuICAvKipcbiAgICogVXNlZCB0byBlbmFibGUgZm9ybWF0aW5nIHRpbWVzdGFtcCB0byBzdHJpbmcgZGF0ZVxuICAgKi9cbiAgaXNEYXRlQ29sdW1uPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBVc2VkIHRvIGRpc3BsYXkgbW9yZSBhY3Rpb25zIGNvbHVtbiBhbmQgdGhlIGVuZCBvZiB0aGUgdGFibGVcbiAqL1xuZXhwb3J0IGNsYXNzIE1sa01vcmVBY3Rpb25zIHtcbiAgLyoqXG4gICAqIEFjdGlvbiBDb2x1bW4gbmFtZSBlLmcuIE1vcmUgQWN0aW9uc1xuICAgKi9cbiAgbmFtZTogc3RyaW5nID0gXCJBY3Rpb25zXCI7XG4gIC8qKlxuICAgKiBGaWVsZCBuYW1lIGlkIGZyb20gdGhlIHNlcnZlciByZXNwb25zZSBlLmcgdXNlcklkXG4gICAqL1xuICBpZEZpZWxkTmFtZTogc3RyaW5nID0gXCJpZFwiO1xuICAvKipcbiAgICogQWN0aW9ucyBlLmcuIEVkaXQsIERlbGV0ZVxuICAgKi9cbiAgYWN0aW9uczogQXJyYXk8TWxrTW9yZUFjdGlvbkRhdGE+O1xuXG4gIGNvbnN0cnVjdG9yKGFjdGlvbnM6IEFycmF5PE1sa01vcmVBY3Rpb25EYXRhPiwgaWQ/OiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pZEZpZWxkTmFtZSA9IGlkO1xuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNbGtNb3JlQWN0aW9uRGF0YSB7XG4gIC8qKlxuICAgKiBOZXZlciBtaW5kIHRoaXMgZmllbGQgaXQgd2lsbCBiZSB1c2VkIGJ5IHRoZSBsaWJyYXJ5XG4gICAqL1xuICBpZD86IGFueTtcbiAgLyoqXG4gICAqIEFjdGlvbiBuYW1lIGUuZy4gRWRpdCwgRGVsZXRlXG4gICAqL1xuICBhY3Rpb25OYW1lOiBhbnk7XG59IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0ZXdhcmRDbGllbnRDb21wb25lbnQgfSBmcm9tICcuL3N0ZXdhcmQtY2xpZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNbGtEYXRhdGFibGVDb21wb25lbnQgfSBmcm9tICcuL21say1kYXRhdGFibGUvbWxrLWRhdGF0YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neERhdGF0YWJsZU1vZHVsZSB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUsIEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFN0ZXdhcmRDb25maWcgfSBmcm9tICcuL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBOZ3hEYXRhdGFibGVNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbU3Rld2FyZENsaWVudENvbXBvbmVudCwgTWxrRGF0YXRhYmxlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1N0ZXdhcmRDbGllbnRDb21wb25lbnQsIE1sa0RhdGF0YWJsZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogU3Rld2FyZENvbmZpZykge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU3Rld2FyZENsaWVudE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogWyB7cHJvdmlkZTogU3Rld2FyZENvbmZpZywgdXNlVmFsdWU6IGNvbmZpZ30gXVxuICAgIH1cbiAgfVxuIH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBO0NBYUM7Ozs7OztBQ2hCRDtDQVVDOzs7O0FBR0Q7Ozs7O0lBTUksWUFBb0IsSUFBZ0IsRUFBRSxNQUFxQjtRQUF2QyxTQUFJLEdBQUosSUFBSSxDQUFZO3dCQUZqQixHQUFHO1FBR2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztTQUMzRjthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQztnQkFDM0IsY0FBYyxFQUFFLGlDQUFpQzthQUNwRCxDQUFDLENBQUM7U0FDTjtRQUNELElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTs7WUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN4RjtLQUNKOzs7Ozs7O0lBSUQsSUFBSSxDQUFDLFFBQWdCLEVBQUUsSUFBTztRQUMxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUNqRyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBTyxDQUFDLENBQ3RDLENBQUM7S0FDTDs7Ozs7OztJQUtELEdBQUcsQ0FBQyxRQUFnQixFQUFFLElBQU87UUFDekIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDaEcsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQU8sQ0FBQyxDQUN0QyxDQUFDO0tBQ0w7Ozs7OztJQUVELE1BQU0sQ0FBQyxRQUFnQixFQUFFLElBQU87UUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUNwSCxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBTyxDQUFDLENBQ3RDLENBQUM7S0FDTDs7Ozs7O0lBRUQsR0FBRyxDQUFDLFFBQWdCLEVBQUUsSUFBMEI7O1FBQzVDLE1BQU0sT0FBTyxHQUFHO1lBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztTQUNuQyxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3hELFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFPLENBQUMsQ0FDdEMsQ0FBQztLQUNMOzs7Ozs7SUFHRCxPQUFPLENBQUMsUUFBZ0IsRUFBRSxJQUEwQjs7UUFDaEQsTUFBTSxPQUFPLEdBQUc7WUFDWixNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7U0FDbkMsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLEdBQUcsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3hGLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFPLENBQUMsQ0FDdEMsQ0FBQztLQUNMOzs7Ozs7OztJQU9ELFlBQVksQ0FBQyxRQUFnQixFQUFFLElBQU8sRUFBRSxPQUFxQjs7UUFDekQsTUFBTSxRQUFRLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUc7WUFDMUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDbkMsQ0FBQyxDQUFDO1FBQ0gsSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFDO1lBQy9DLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLGVBQWUsRUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDMUU7YUFBTSxJQUFHLENBQUMsT0FBTyxFQUFDO1lBQ2YsT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7U0FDL0I7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FDL0UsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQU8sQ0FBQyxDQUN0QyxDQUFDO0tBQ0w7Ozs7OztJQUVELHFCQUFxQixDQUFDLFFBQWdCLEVBQUUsSUFBTzs7UUFDM0MsTUFBTSxRQUFRLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUc7WUFDMUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ2hCLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUM1QixDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDSCxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNuQztTQUNKLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksV0FBVyxDQUFDLEVBQUUsZUFBZSxFQUFFLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUNySSxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBTyxDQUFDLENBQ3RDLENBQUM7S0FDTDs7Ozs7O0lBRUQsb0JBQW9CLENBQUMsUUFBZ0IsRUFBRSxJQUFPOztRQUMxQyxNQUFNLFFBQVEsR0FBYSxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRztZQUMxQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDaEIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQzVCLENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUNILFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ25DO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxlQUFlLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ3BJLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFPLENBQUMsQ0FDdEMsQ0FBQztLQUNMOzs7OztJQUVPLGFBQWEsQ0FBQyxJQUF5QjtRQUMzQyxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7WUFDbkIsT0FBTyxJQUFJLFVBQVUsRUFBRSxDQUFDO1NBQzNCOztRQUNELElBQUksVUFBVSxHQUFlLElBQUksVUFBVSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWEsRUFBRSxHQUFXO1lBQ3BDLFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM5QyxDQUFDLENBQUM7UUFDSCxPQUFPLFVBQVUsQ0FBQzs7Ozs7Ozs7SUFNZCxXQUFXO1FBQ2YsT0FBTyxDQUFDLEtBQXdCOztZQUM1QixNQUFNLEdBQUcsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDOztZQUVsQyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFO2dCQUNyQixHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQ3hCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsNERBQTRELENBQUM7YUFDOUU7aUJBQU07Z0JBQ0gsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUN4QixHQUFHLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUNsQyxHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQy9CO1lBQ0QsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEIsQ0FBQzs7Ozs7OztJQUtOLE9BQU8sVUFBVSxDQUFDLEVBQU87UUFDckIsT0FBTyw2Q0FBNkMsR0FBRyxFQUFFLEdBQUcsd0dBQXdHLENBQUM7S0FDeEs7Ozs7OztJQUVNLGdCQUFnQixDQUFDLFFBQWdCLEVBQUUsSUFBMEI7O1FBQ2hFLE1BQU0sT0FBTyxHQUFHO1lBQ1osT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztTQUNuQyxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3hELFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFPLENBQUMsQ0FDdEMsQ0FBQzs7OztZQS9KVCxVQUFVOzs7O1lBWEYsVUFBVTtZQWtCK0IsYUFBYTs7Ozs7OztBQ25CL0Q7SUFhRSxpQkFBaUI7Ozs7SUFFakIsUUFBUTtLQUNQOzs7WUFkRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFOzs7O0dBSVQ7Z0JBQ0QsTUFBTSxFQUFFLEVBQUU7YUFDWDs7Ozs7Ozs7Ozs7OztBQ1BEOzs7OztvQkFJbUIsRUFBRTs7Ozs2QkFJTyxDQUFDOzs7OzBCQUlKLENBQUM7Ozs7cUJBSUwsSUFBSTs7OztvQkFJTCxLQUFLOzs7O3VCQUlELEVBQUU7Ozs7c0JBSVAsSUFBSSxJQUFJLEVBQUU7Ozs7c0JBSVIsQ0FBQzs7Q0FDckI7Ozs7QUFJRDs7c0JBQ3NCLEtBQUs7d0JBQ0gsSUFBSTs7Q0FDM0I7Ozs7Ozs7Ozs7QUN4Q0Q7Ozs7Ozs7OztJQTBCSSxZQUFZLEtBQWEsRUFBRSxJQUFZLEVBQUUsV0FBYyxFQUFFLE9BQWUsbUJBQW1CLEVBQ3ZGLGFBQXNCLElBQUksRUFBRSxjQUFzQixJQUFJOzs7OzJCQUhwQyxFQUFFO1FBSXBCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxHQUFHLFdBQVcsR0FBRyxLQUFLLENBQUM7S0FDeEQ7Q0FFSjs7Ozs7QUFLRDs7OztJQXNCSSxZQUFZLE9BQWUsTUFBTTs7OztvQkFsQmxCLE1BQU07UUFtQmpCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUM7S0FDekI7Q0FDSjs7OztBQUtEOzs7OztJQWtCSSxZQUFZLE9BQWUsQ0FBQyxFQUFFLE9BQWUsQ0FBQztRQUMxQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQTtLQUNyQjtDQUNKOzs7O0FBS0Q7Ozs7SUFNSSxZQUFZLE9BQStCO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0tBQzFCO0NBRUo7Ozs7OztJQVlHLFlBQVksS0FBYSxFQUFFLE9BQWUsSUFBSTtRQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDO0tBQ25DO0NBRUo7Ozs7OztBQ3JJRDs7OztJQThLRSxZQUFvQixlQUFzRTtRQUF0RSxvQkFBZSxHQUFmLGVBQWUsQ0FBdUQ7dUJBZDVDLEVBQUU7OEJBQ2IsSUFBSTs4QkFHWixJQUFJLFlBQVksRUFBcUI7Z0NBQ0wsRUFBRTtvQkFFM0MsSUFBSSxJQUFJLEVBQUU7d0JBQ2pCLEVBQUU7c0JBRUksRUFBRTtLQUtsQjs7Ozs7O0lBS0QsUUFBUTs7UUFDTixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUk7O1lBQ2hDLElBQUksVUFBVSxHQUFlLEVBQUUsQ0FBQztZQUNoQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3RDO1lBRUQsSUFBRyxJQUFJLENBQUMsV0FBVyxZQUFZLFFBQVEsSUFBSSxJQUFJLENBQUMsV0FBVyxZQUFZLFdBQVcsRUFBQztnQkFDakYsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNuRTtZQUVELElBQUcsSUFBSSxDQUFDLFdBQVcsWUFBWSxRQUFRLEVBQUM7Z0JBQ3RDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDdkQ7WUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQTtTQUNuRCxDQUFDLENBQUM7O1FBRUgsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0QsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDN0QsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUMzRDs7Ozs7O0lBTUQsYUFBYSxDQUFDLEtBQXdCO1FBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDOzs7Ozs7O0lBT0QsUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE9BQU87U0FDUjs7UUFDRCxJQUFJLE9BQU8sQ0FBbUI7UUFDOUIsSUFBSSxPQUFPLEVBQUU7WUFDWCxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQ25CO2FBQU07WUFDTCxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUcsSUFBSSxDQUFDLE1BQU0sRUFBQztZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUc7Z0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3pCLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRO1lBQ2pFLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQzthQUMzQjtTQUNGLENBQUMsQ0FBQztLQUVKOzs7Ozs7SUFNRCxRQUFRLENBQUMsS0FBSztLQUViOzs7OztJQUVELFVBQVUsQ0FBQyxLQUFLO0tBRWY7Ozs7O0lBRUQsWUFBWSxDQUFDLEtBQUs7S0FFakI7Ozs7Ozs7SUFPRCxhQUFhLENBQUMsSUFBSTs7UUFFaEIsSUFBSSxDQUFDLEdBQXFCLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOztRQUV6RSxJQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFDOztZQUN0QyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztTQUVsQjtRQUNELElBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUM7O1lBQ3BDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7U0FJaEI7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3ZFOzs7Ozs7SUFNRCxPQUFPLENBQUMsT0FBWTtRQUNsQixPQUFPLE9BQU8sWUFBWSxRQUFRLENBQUM7S0FDcEM7Ozs7OztJQU1ELFFBQVEsQ0FBQyxPQUFZO1FBQ25CLE9BQU8sT0FBTyxZQUFZLFNBQVMsQ0FBQztLQUNyQzs7Ozs7O0lBS0QsVUFBVSxDQUFDLE9BQVk7UUFDckIsT0FBTyxPQUFPLFlBQVksV0FBVyxDQUFDO0tBQ3ZDOzs7Ozs7SUFNRCxnQkFBZ0IsQ0FBQyxJQUFJOztRQUNuQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7O1FBRTlCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQztRQUM3QyxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7O1FBRS9DLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFFdkMsT0FBTyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0tBQ3ZDOzs7Ozs7SUFFRCxhQUFhLENBQUMsSUFBWSxFQUFFLEtBQVU7O1FBQ3BDLElBQUksQ0FBQyxHQUFrQixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztRQUN4QyxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDOztRQUNuQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QyxPQUFPLEtBQUssQ0FBQztLQUNkOzs7Ozs7O0lBT0QsY0FBYyxDQUFDLElBQVMsRUFBRSxJQUFtQjtRQUMzQyxJQUFJLENBQUMsRUFBRSxJQUFJLFlBQVksTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRztZQUN0RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEI7O1FBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRztZQUM1QixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLE1BQU0sQ0FBQyxFQUFFO2dCQUN4RCxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDOUM7aUJBQU0sSUFBRyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBQztnQkFDekIsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNuQjtTQUNGLENBQUMsQ0FBQztRQUNILE9BQU8sS0FBSyxDQUFDO0tBRWQ7OztZQW5WRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBZ0pPO2dCQUNqQixNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDYjs7OztZQXpKUSxvQkFBb0I7OztzQkEySjFCLEtBQUs7NkJBQ0wsS0FBSzt1QkFDTCxLQUFLOzBCQUNMLEtBQUs7NkJBQ0wsTUFBTTsrQkFDTixLQUFLO3FCQUNMLEtBQUs7b0JBR0wsU0FBUyxTQUFDLGtCQUFrQjs7Ozs7QUFpTy9COzs7Ozs7SUFjRSxZQUFZLE9BQWlDLEVBQUUsRUFBVyxFQUFFLElBQWE7Ozs7b0JBVjFELFNBQVM7Ozs7MkJBSUYsSUFBSTtRQU94QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztLQUN2QjtDQUVGOzs7Ozs7QUM5WkQ7Ozs7O0lBcUJFLE9BQU8sT0FBTyxDQUFDLE1BQXFCO1FBQ2xDLE9BQU87WUFDTCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFNBQVMsRUFBRSxDQUFFLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDLENBQUU7U0FDMUQsQ0FBQTtLQUNGOzs7WUFqQkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxXQUFXO29CQUNYLG1CQUFtQjtvQkFDbkIsa0JBQWtCO29CQUNsQixZQUFZO29CQUNaLGdCQUFnQjtpQkFDakI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsc0JBQXNCLEVBQUUscUJBQXFCLENBQUM7Z0JBQzdELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixFQUFFLHFCQUFxQixDQUFDO2FBQ3pEOzs7Ozs7Ozs7Ozs7Ozs7In0=