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
            this.headers = this.headers.append('Content-Type', 'application/json; charset=utf-8');
        }
        else {
            this.headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8'
            });
        }
        if (config.access_token) {
            //append access token if the environment has access token
            console.debug("Found access token", config.access_token);
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
        console.debug("Found value:", value);
        return value;
    }
    /**
     * Used to find key value based on the key sequence provided
     * @param {?} data expects an object
     * @param {?} keys i.e. user.gender.type.type
     * @return {?}
     */
    getObjectValue(data, keys) {
        if (!(data instanceof Object)) {
            return data[keys.tail];
        }
        /** @type {?} */
        let value = null;
        Object.keys(data).forEach((key) => {
            if ((key === keys.front) && (key !== keys.tail) && (data[key] instanceof Object)) {
                keys.dequeue();
                value = Object.keys(this.getObjectValue(data[key], keys))[0];
            }
            else if (key === keys.tail) {
                value = Object.keys(data[key])[0];
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
                <option *ngFor="let o of control.controlType.options">{{o.text}}</option>
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQuanMubWFwIiwic291cmNlcyI6WyJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy93cmFwcGVycy9yZXNwb25zZS13cmFwcGVyLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvc3Rld2FyZC1jbGllbnQuc2VydmljZS50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50LmNvbXBvbmVudC50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy93cmFwcGVycy9tbGstZHluYW1pYy1jb250cm9sLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvbWxrLWRhdGF0YWJsZS9tbGstZGF0YXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogV3JhcHMgc2VydmVyIHJlc3BvbnNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVzcG9uc2VXcmFwcGVyPFQ+IHtcclxuICAgIC8qKlxyXG4gICAgICogSHR0cCBzdGF0dXMgY29kZSBlLmcuIDIwMFxyXG4gICAgICovXHJcbiAgICBjb2RlOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFNlcnZlciBtZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogQWN0dWFsIHJlc3BvbnNlIGRhdGFcclxuICAgICAqL1xyXG4gICAgZGF0YTogVDtcclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBSZXNwb25zZVdyYXBwZXIgfSBmcm9tICcuL2VudGl0aWVzL3dyYXBwZXJzL3Jlc3BvbnNlLXdyYXBwZXInO1xuXG5leHBvcnQgY2xhc3MgU3Rld2FyZENvbmZpZyB7XG4gICAgYmFzZV91cmw6IHN0cmluZztcbiAgICBhY2Nlc3NfdG9rZW4/OiBzdHJpbmc7XG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudFNlcnZpY2U8VCwgRT4ge1xuXG4gICAgcHJpdmF0ZSBoZWFkZXJzOiBIdHRwSGVhZGVycztcbiAgICB0b2tlbjogc3RyaW5nO1xuICAgIGJhc2VfdXJsOiBzdHJpbmcgPSBcIi9cIjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgY29uZmlnOiBTdGV3YXJkQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuYmFzZV91cmwgPSBjb25maWcuYmFzZV91cmw7XG4gICAgICAgIGlmIChjb25maWcuaGVhZGVycykge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy5hY2Nlc3NfdG9rZW4pIHsvL2FwcGVuZCBhY2Nlc3MgdG9rZW4gaWYgdGhlIGVudmlyb25tZW50IGhhcyBhY2Nlc3MgdG9rZW5cbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJGb3VuZCBhY2Nlc3MgdG9rZW5cIiwgY29uZmlnLmFjY2Vzc190b2tlbik7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgXCJCZWFyZXIgXCIgKyBjb25maWcuYWNjZXNzX3Rva2VuKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGhhbmRsZSBodHRwIHBvc3QgcmVxdWVzdHNcbiAgICAgKi9cbiAgICBwb3N0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBKU09OLnN0cmluZ2lmeShkYXRhKSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSkucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBoYW5kbGUgaHR0cCBwb3N0IHJlcXVlc3RzXG4gICAgICovXG4gICAgcHV0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkZWxldGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdCgnZGVsZXRlJywgdGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycywgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSkgfSkucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgb3B0aW9ucykucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICBnZXRGaWxlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCArICc/YWNjZXNzX3Rva2VuPScgKyB0aGlzLnRva2VuLCBvcHRpb25zKS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwb3N0Rm9ybURhdGEoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBmb3JtRGF0YSwgeyBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoeyAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMudG9rZW4gfSkgfSkucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcG9zdEZvcm1EYXRhTXVsdGlwYXJ0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgZGF0YVtrZXldLmZvckVhY2goazIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBrMik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBmb3JtRGF0YSwgeyBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoeyAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMudG9rZW4gfSkgfSkucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHV0Rm9ybURhdGFNdWx0aVBhcnQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhW2tleV0uZm9yRWFjaChrMiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGsyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgZm9ybURhdGEsIHsgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuIH0pIH0pLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SHR0cFBhcmFtcyhkYXRhOiBNYXA8c3RyaW5nLCBzdHJpbmc+KTogSHR0cFBhcmFtcyB7XG4gICAgICAgIGlmIChkYXRhID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgICAgICBkYXRhLmZvckVhY2goKHZhbHVlOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gaHR0cFBhcmFtcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBjYXRjaCBleGNlcHRpb24gdGhyb3duIGJ5IGh0dHAgY2xpZW50IHJldHVybnMgaW50ZXJuYWwgc2VydmVyIGVycm9yXG4gICAgICogaWYgc3RhdHVzIDUwMCBpcyBlbmNvdW50ZXJlZFxuICAgICAqL1xuICAgIHByaXZhdGUgaGFuZGxlRXJyb3I8UmVzcG9uc2VXcmFwcGVyPigpIHtcbiAgICAgICAgcmV0dXJuIChlcnJvcjogSHR0cEVycm9yUmVzcG9uc2UpOiBPYnNlcnZhYmxlPGFueT4gPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gbmV3IFJlc3BvbnNlV3JhcHBlcigpO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxuICAgICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PSA1MDApIHtcbiAgICAgICAgICAgICAgICByZXMuY29kZSA9IGVycm9yLnN0YXR1cztcbiAgICAgICAgICAgICAgICByZXMubWVzc2FnZSA9ICdTb3JyeSBpbnRlcm5hbCBzZXJ2ZXIgZXJyb3Igb2NjdXJlZCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzLmNvZGUgPSBlcnJvci5zdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzLm1lc3NhZ2UgPSBlcnJvci5lcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIHJlcy5kYXRhID0gZXJyb3IuZXJyb3IuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvZihyZXMpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHJlbmRlciBhY3Rpb24gYnV0dG9uc1xuICAgICAqL1xuICAgIHN0YXRpYyByZW5kZXJNb3JlKGlkOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVxcJ2FjdGlvbnMtYnV0dG9ucyBjZW50ZXJcXCcgaWQ9XFwnJyArIGlkICsgJ1xcJz48aSBjbGFzcz1cXCdmYSBmYS1jaGVja1xcJyB0aXRsZT1cXCdBcHByb3ZlXFwnPjwvaT4gPGkgY2xhc3M9XFwnZmEgZmEtYmFuXFwnIHRpdGxlPVxcJ0RlY2xpbmVcXCc+PC9pPjwvZGl2Pic7XG4gICAgfVxuXG4gICAgcHVibGljIGludGlhdGVEYXRhVGFibGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YT86IE1hcDxzdHJpbmcsIHN0cmluZz4pIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgb3B0aW9ucykucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3R3LXN0ZXdhcmQtY2xpZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8cD5cbiAgICAgIHN0ZXdhcmQtY2xpZW50IHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ2xpZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsIi8qKlxyXG4gKiBEYXRhYmxlIHBhZ2UgdXNlZCB0byB3cmFwcGVyIHNlcnZlciBjb250ZW50IHJlc3BvbnNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUGFnZTxUPiB7XHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciBvZiBpdGVtcyBwZXIgcGFnZSBzYW1lIGFzIGxpbWl0XHJcbiAgICAgKi9cclxuICAgIHNpemU6IG51bWJlciA9IDEwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUb3RhbCBpdGVtcyBhdmFpbGFibGUgb24gdGhlIHNlcnZlclxyXG4gICAgICovXHJcbiAgICB0b3RhbEVsZW1lbnRzOiBudW1iZXIgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUb3RhbCBudW1iZXIgb2YgcGFnZXMgcHJlc2VudFxyXG4gICAgICovXHJcbiAgICB0b3RhbFBhZ2VzOiBudW1iZXIgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgaXMgdGhlIGZpcnN0IHBhZ2VcclxuICAgICAqL1xyXG4gICAgZmlyc3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgaXQgaXMgdGhlIGxhc3QgcGFnZVxyXG4gICAgICovXHJcbiAgICBsYXN0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhY3R1YWwgcGFnZSBjb250ZW50XHJcbiAgICAgKi9cclxuICAgIGNvbnRlbnQ6IEFycmF5PFQ+ID0gW107XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gbWFwIHNvcnQgcGFyYW1ldGVyc1xyXG4gICAgICovXHJcbiAgICBzb3J0ZWQ6IFNvcnQgPSBuZXcgU29ydCgpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDdXJyZW50IHBhZ2UgbnVtYmVyXHJcbiAgICAgKi9cclxuICAgIG51bWJlcjogbnVtYmVyID0gMDtcclxufVxyXG4vKipcclxuICogdXNlZCB0byBtYXAgc29ydCByZXF1ZXN0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU29ydHtcclxuICAgIHNvcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgdW5zb3J0ZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG59XHJcbiIsIi8qKlxuICogUmVwcmVzZW50cyBkeW5hbWljIGh0bWwgY29udHJvbHMgKElucHV0LCBUZXh0QXJlYSBhbmQgU2VsZWN0KVxuICovXG5leHBvcnQgY2xhc3MgTWxrRHluYW1pY0NvbnRyb2w8VD4ge1xuICAgIC8qKlxuICAgICAqIENvbnRyb2wgbGFiZWxcbiAgICAgKi9cbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEljb24gdG8gYmUgYXBwZW5kZWQgYmVmb3JlIHRoZSBjb250cm9sIChzdXBwb3J0cyBjbGFzcyBkZWZpbmVkIGljb25zKVxuICAgICAqL1xuICAgIGljb246IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBjb250cm9sIChwcm92aWRlIHZhcmlhYmxlIHZhbGlkIG5hbWVzIGllLiBubyBzcGFjZXMgcHJlZmFyYWJseSBhcGkgY29ycmVzcG9uZGluZyBuYW1lcyBlLmcuIHVzZXJOYW1lKVxuICAgICAqL1xuICAgIG5hbWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgYWN0dWFsIGNvbnRyb2wgKE1sa0lucHV0LCBNbGtUZXh0QXJlYSAmIE1sa1NlbGVjdClcbiAgICAgKi9cbiAgICBjb250cm9sVHlwZTogVDtcbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIGZpZWxkIGlzIHJlcXVpcmVkXG4gICAgICovXG4gICAgaXNSZXF1aXJlZDogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBDb250cm9sIHBsYWNlaG9sZGVyXG4gICAgICovXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZyA9IFwiXCI7XG5cbiAgICBjb25zdHJ1Y3RvcihsYWJlbDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNvbnRyb2xUeXBlOiBULCBpY29uOiBzdHJpbmcgPSBcImZhIGZhLWZpbGUtdGV4dC1vXCIsXG4gICAgICAgIGlzUmVxdWlyZWQ6IGJvb2xlYW4gPSB0cnVlLCBwbGFjZWhvbGRlcjogc3RyaW5nID0gbnVsbCkge1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBjb250cm9sVHlwZTtcbiAgICAgICAgdGhpcy5pY29uID0gaWNvbjtcbiAgICAgICAgdGhpcy5pc1JlcXVpcmVkID0gaXNSZXF1aXJlZDtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyID8gcGxhY2Vob2xkZXIgOiBsYWJlbDtcbiAgICB9XG5cbn1cbi8qKlxuICogVXNlZCB0byByZXByZXNlbnQgaHRtbCBpbnB1dCB3aXRoIG9wdGlvbnM6XG4gKiB0eXBlOiBkZWZhdWx0IHRvIHRleHQsICBtYXhMZW5ndGgsIG1pbkxlbmd0aCwgbWluLCBtYXhcbiAqL1xuZXhwb3J0IGNsYXNzIE1sa0lucHV0e1xuICAgIC8qKlxuICAgICAqIFR5cGUgb2YgaW5wdXQgZS5nLiB0ZXh0LCBudW1iZXIsIGRhdGVcbiAgICAgKi9cbiAgICB0eXBlOiBzdHJpbmcgPSBcInRleHRcIjtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIGxlbmd0aCBvZiB0aGUgaW5wdXRcbiAgICAgKi9cbiAgICBtYXhMZW5ndGg6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIG1pbmltdW0gaW5wdXQgbGVuZ3RoXG4gICAgICovXG4gICAgbWluTGVuZ3RoOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBudW1iZXIgaW5wdXRzXG4gICAgICovXG4gICAgbWluOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBudW1iZXIgaW5wdXRzXG4gICAgICovXG4gICAgbWF4OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcgPSBcInRleHRcIikge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLm1pbkxlbmd0aCA9IHRoaXMubWluID0gMDtcbiAgICAgICAgdGhpcy5tYXhMZW5ndGggPSA0MDAwO1xuICAgICAgICB0aGlzLm1heCA9IDEwMDAwMDAwMDA7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgaHRtbCB0ZXh0YXJlYSBpbnB1dFxuICovXG5leHBvcnQgY2xhc3MgTWxrVGV4dGFyZWF7XG4gICAgLyoqXG4gICAgICogTnVtYmVyIHRleHRhcmVhIGNvbHVtbnNcbiAgICAgKi9cbiAgICBjb2xzPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIE51bWJlciBvZiB0ZXh0YXJlYSByb3dzXG4gICAgICovXG4gICAgcm93cz86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBtYXhpbXVtIGlucHV0IGxlbmd0aFxuICAgICAqL1xuICAgIG1heExlbmd0aDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIG1pbmltdW0gaW5wdXQgbGVuZ3RoXG4gICAgICovXG4gICAgbWluTGVuZ3RoOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb2xzOiBudW1iZXIgPSA1LCByb3dzOiBudW1iZXIgPSAxKXtcbiAgICAgICAgdGhpcy5jb2xzID0gY29scztcbiAgICAgICAgdGhpcy5yb3dzID0gcm93cztcbiAgICAgICAgdGhpcy5tYXhMZW5ndGggPSA0MDAwO1xuICAgICAgICB0aGlzLm1pbkxlbmd0aCA9IDBcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBodG1sIHNlbGVjdCBjb250cm9sXG4gKi9cbmV4cG9ydCBjbGFzcyBNbGtTZWxlY3Qge1xuICAgIC8qKlxuICAgICAqIFNlbGVjdCBvcHRpb25zXG4gICAgICovXG4gICAgb3B0aW9uczogQXJyYXk8TWxrU2VsZWN0T3B0aW9uPjtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEFycmF5PE1sa1NlbGVjdE9wdGlvbj4pe1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgTWxrU2VsZWN0T3B0aW9ue1xuICAgIC8qKlxuICAgICAqIE9wdGlvbiB2YWx1ZVxuICAgICAqL1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogT3B0aW9uIHRleHQvbGFiZWxcbiAgICAgKi9cbiAgICB0ZXh0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgPSBudWxsKXtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0ID8gdGV4dCA6IHZhbHVlO1xuICAgIH1cblxufVxuXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nRm9ybSwgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9wYWdlJztcbmltcG9ydCB7IE1sa0R5bmFtaWNDb250cm9sLCBNbGtJbnB1dCwgTWxrVGV4dGFyZWEsIE1sa1NlbGVjdCB9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL21say1keW5hbWljLWNvbnRyb2wnO1xuaW1wb3J0IHsgUmVzcG9uc2VXcmFwcGVyIH0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlcic7XG5pbXBvcnQgeyBTdGV3YXJkQ2xpZW50U2VydmljZSB9IGZyb20gJy4uL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YXRhYmxlQ29tcG9uZW50IH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuaW1wb3J0IHsgUXVldWUgfSBmcm9tICdxdWV1ZS10eXBlc2NyaXB0Jztcbi8vY29uc3QgeyBRdWV1ZSB9ID0gcmVxdWlyZSgncXVldWUtdHlwZXNjcmlwdCcpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzdHctbWxrLWRhdGF0YWJsZScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNhcmQgY2FyZC1vdXRsaW5lLWRlZmF1bHRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgICA8Zm9ybSAobmdTdWJtaXQpPVwicHJvY2Vzc0ZpbHRlcihmaWx0ZXJGb3JtKVwiIFtmb3JtR3JvdXBdPVwiZmlsdGVyRm9ybVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zICBtYi0zXCIgKm5nRm9yPVwibGV0IGNvbnRyb2wgb2YgZmlsdGVyQ29tcG9uZW50c1wiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZyb21cIj57e2NvbnRyb2wubGFiZWx9fTogPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0ICBmb3JtLWljb24tZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgICAgPGkgW2NsYXNzXT1cImNvbnRyb2wuaWNvblwiPjwvaT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICBcbiAgICAgICAgICAgICAgPHNlbGVjdCAqbmdJZj1cImlzU2VsZWN0KGNvbnRyb2wuY29udHJvbFR5cGUpXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLm5hbWVcIj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQgc2VsZWN0ZWQ+e3tjb250cm9sLnBsYWNlaG9sZGVyfX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBvIG9mIGNvbnRyb2wuY29udHJvbFR5cGUub3B0aW9uc1wiPnt7by50ZXh0fX08L29wdGlvbj5cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gIFxuICAgICAgICAgICAgICA8dGV4dGFyZWEgKm5nSWY9XCJpc1RleHRBcmVhKGNvbnRyb2wuY29udHJvbFR5cGUpXCIgW2NvbHNdPVwiY29udHJvbC5jb250cm9sVHlwZS5jb2xzXCIgW3Jvd3NdPVwiY29udHJvbC5jb250cm9sVHlwZS5yb3dzXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCJcbiAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCI+PC90ZXh0YXJlYT5cbiAgXG4gICAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cImlzSW5wdXQoY29udHJvbC5jb250cm9sVHlwZSlcIiBbdHlwZV09XCJjb250cm9sLmNvbnRyb2xUeXBlLnR5cGVcIiBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXG4gICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLm5hbWVcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkudG91Y2hlZFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdyZXF1aXJlZCcpXCI+e3tjb250cm9sLnBsYWNlaG9sZGVyfX0gaXMgcmVxdWlyZWQ8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21pbmxlbmd0aCcpXCI+TWluaW11bSBvZiB7e2NvbnRyb2wuY29udHJvbFR5cGUubWluTGVuZ3RofX0gY2hhcmFjdGVyczwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIHt7Y29udHJvbC5jb250cm9sVHlwZS5tYXhMZW5ndGh9fSBjaGFyYWN0ZXJzPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtaW4nKVwiPlNob3VsZCBiZSBncmVhdGVyIHRoYW4ge3tjb250cm9sLmNvbnRyb2xUeXBlLm1pbn19PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtYXgnKVwiPlNob3VsZCBiZSBsZXNzIHRoYW4ge3tjb250cm9sLmNvbnRyb2xUeXBlLm1heH19PC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyAgbWItM1wiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZyb21cIj5Gcm9tOiA8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgIGZvcm0taWNvbi1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNhbGVuZGFyLW9cIj48L2k+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgcGxhY2Vob2xkZXI9XCJGcm9tLi4uXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCJcbiAgICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJmcm9tXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLnRvdWNoZWRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2YgMTAwIGNoYXJhY3RlcnM8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zICBtYi0zXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZnJvbVwiPlRvOiA8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgIGZvcm0taWNvbi1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNhbGVuZGFyLW9cIj48L2k+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgcGxhY2Vob2xkZXI9XCJUby4uLlwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwidG9cIiB2YWx1ZT1cIlwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS50b3VjaGVkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDEwMCBjaGFyYWN0ZXJzPC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwic2VhcmNoXCI+U2VhcmNoOjwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLXByZXBlbmRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgZm9ybS1pY29uLWRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtc2VhcmNoXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxpbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJuZWVkbGVcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIiB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2guLi5cIiAoa2V5dXApPVwidXBkYXRlRmlsdGVyKCRldmVudClcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLnRvdWNoZWRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDIwMCBjaGFyYWN0ZXJzPC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHVsbC1yaWdodCBpbmxpbmUtYnV0dG9uc1wiPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCIgdHlwZT1cInJlc2V0XCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1yZXBlYXRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgICAgUmVzZXRcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXNtIHB1bGwtcmlnaHRcIiB0eXBlPVwic3VibWl0XCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1zb3J0LWFtb3VudC1hc2NcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgICAgRmlsdGVyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgXG4gIDxuZ3gtZGF0YXRhYmxlICN0YWJsZSBjbGFzcz1cImJvb3RzdHJhcFwiIFtoZWFkZXJIZWlnaHRdPVwiNTBcIiBbY29sdW1uTW9kZV09XCInZm9yY2UnXCIgW2Zvb3RlckhlaWdodF09XCI1MFwiIFtyb3dIZWlnaHRdPVwiJ2F1dG8nXCJcbiAgICBbcm93c109XCJwYWdlLmNvbnRlbnRcIiBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIiBbc2VsZWN0aW9uVHlwZV09XCInY2hlY2tib3gnXCIgKGFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50KVwiIChzZWxlY3QpPSdvblNlbGVjdCgkZXZlbnQpJ1xuICAgIFtjb3VudF09XCJwYWdlLnRvdGFsRWxlbWVudHNcIiBbb2Zmc2V0XT1cInBhZ2UubnVtYmVyXCIgW2V4dGVybmFsUGFnaW5nXT1cInRydWVcIiBbbGltaXRdPVwicGFnZS5zaXplXCIgKHBhZ2UpPVwibG9hZFBhZ2UoJGV2ZW50LCBudWxsKVwiPlxuICAgIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBbd2lkdGhdPVwiMzBcIiBbc29ydGFibGVdPVwiZmFsc2VcIiBbY2FuQXV0b1Jlc2l6ZV09XCJmYWxzZVwiIFtkcmFnZ2FibGVdPVwidHJ1ZVwiIFtyZXNpemVhYmxlXT1cImZhbHNlXCIgW2hlYWRlckNoZWNrYm94YWJsZV09XCJ0cnVlXCJcbiAgICAgIFtjaGVja2JveGFibGVdPVwidHJ1ZVwiICpuZ0lmPVwiZW5hYmxlQ2hlY2tib3hcIj5cbiAgICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxuICAgIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBbY2FuQXV0b1Jlc2l6ZV09XCIoYy5jYW5BdXRvUmVzaXplKSA/IGMuY2FuQXV0b1Jlc2l6ZSA6IHRydWVcIiBbbmFtZV09XCJjLmNvbHVtbk5hbWVcIiBbd2lkdGhdPVwiYy53aWR0aFwiXG4gICAgICBbc29ydGFibGVdPVwiKGMuc29ydGFibGUpID8gYy5zb3J0YWJsZSA6IHRydWVcIiBbZHJhZ2dhYmxlXT1cIihjLmRyYWdnYWJsZSkgPyBjLmRyYWdnYWJsZSA6IHRydWVcIiBbcmVzaXplYWJsZV09XCIoYy5yZXNpemVhYmxlKSA/IGMucmVzaXplYWJsZSA6IHRydWVcIlxuICAgICAgKm5nRm9yPVwibGV0IGMgb2YgY29sdW1uc1wiPlxuICAgICAgPG5nLXRlbXBsYXRlIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZSBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiIGxldC12YWx1ZT1cInZhbHVlXCIgbGV0LXJvdz1cInJvd1wiPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIHt7KGMuaXNEYXRlQ29sdW1uKT8gKGdldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSkgfCBkYXRlOidtZWRpdW0nKSA6IGdldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSl9fVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XG4gICAgPG5neC1kYXRhdGFibGUtY29sdW1uIFtuYW1lXT1cIm1vcmVBY3Rpb25zLm5hbWVcIiAqbmdJZj1cIm1vcmVBY3Rpb25zXCIgW3NvcnRhYmxlXT1cImZhbHNlXCIgW2NhbkF1dG9SZXNpemVdPVwiZmFsc2VcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtdmFsdWU9XCJ2YWx1ZVwiIGxldC1yb3c9XCJyb3dcIj5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLXByZXBlbmRcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBkcm9wZG93bi10b2dnbGVcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtbGlzdC11bFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj5cbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBtb3JlQWN0aW9ucy5hY3Rpb25zXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiIChjbGljayk9XCJvbkFjdGlvbkNsaWNrKHtpZDogcm93W21vcmVBY3Rpb25zLmlkRmllbGROYW1lXSwgYWN0aW9uTmFtZTogYWN0aW9uLmFjdGlvbk5hbWV9KVwiPnt7YWN0aW9uLmFjdGlvbk5hbWV9fTwvYT5cbiAgICAgICAgICAgICAgPCEtLSA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiI1wiPkFub3RoZXIgYWN0aW9uPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCIjXCI+U29tZXRoaW5nIGVsc2UgaGVyZTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJvbGU9XCJzZXBhcmF0b3JcIiBjbGFzcz1cImRyb3Bkb3duLWRpdmlkZXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiI1wiPlNlcGFyYXRlZCBsaW5rPC9hPiAtLT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XG4gICAgPCEtLSA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gbmFtZT1cIkRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtdmFsdWU9XCJ2YWx1ZVwiIGxldC1yb3c9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgIHt7dmFsdWV9fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XG4gICAgICAgICAgICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gbmFtZT1cIkFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZSBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiIGxldC12YWx1ZT1cInZhbHVlXCIgbGV0LXJvdz1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAge3t2YWx1ZX19XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj4gLS0+XG4gIDwvbmd4LWRhdGF0YWJsZT5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgTWxrRGF0YXRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgY29sdW1uczogQXJyYXk8TWxrRGF0YVRhYmxlQ29sdW1uPiA9IFtdO1xuICBASW5wdXQoKSBlbmFibGVDaGVja2JveDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGVuZHBvaW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1vcmVBY3Rpb25zOiBNbGtNb3JlQWN0aW9ucztcbiAgQE91dHB1dCgpIG9uQWN0aW9uc0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxNbGtNb3JlQWN0aW9uRGF0YT4oKVxuICBASW5wdXQoKSBmaWx0ZXJDb21wb25lbnRzOiBBcnJheTxNbGtEeW5hbWljQ29udHJvbDxhbnk+PiA9IFtdO1xuICBASW5wdXQoKSBwYXJhbXM6IE1hcDxzdHJpbmcsIGFueT47XG4gIHBhZ2U6IFBhZ2U8YW55PiA9IG5ldyBQYWdlKCk7XG4gIHNlbGVjdGVkID0gW107XG4gIEBWaWV3Q2hpbGQoRGF0YXRhYmxlQ29tcG9uZW50KSB0YWJsZTogRGF0YXRhYmxlQ29tcG9uZW50O1xuICBmaWx0ZXI6IE9iamVjdCA9IHt9O1xuICBmaWx0ZXJGb3JtOiBGb3JtR3JvdXA7XG4gIDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0ZXJ3YXJkU2VydmljZTogU3Rld2FyZENsaWVudFNlcnZpY2U8UmVzcG9uc2VXcmFwcGVyPFBhZ2U8YW55Pj4sIGFueT4pIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBmb3JtIGNvbnRyb2wgZnJvbSBmaWx0ZXJDb21wb25lbnRzIGFuZCBhbHNvIGFwcGVuZGluZyBkZWZhdWx0IGNvbnRyb2xzIGllLiBkYXRlIGZpbHRlciBhbmQgc2VhcmNoIGNvbnRyb2xzXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICBsZXQgZ3JvdXAgPSB7fTtcbiAgICB0aGlzLmZpbHRlckNvbXBvbmVudHMuZm9yRWFjaChjb21wID0+IHtcbiAgICAgIGxldCB2YWxpZGF0b3JzOiBBcnJheTxhbnk+ID0gW107XG4gICAgICBpZiAoY29tcC5pc1JlcXVpcmVkKSB7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICAgIH1cblxuICAgICAgaWYoY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIE1sa0lucHV0IHx8IGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBNbGtUZXh0YXJlYSl7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbkxlbmd0aChjb21wLmNvbnRyb2xUeXBlLm1pbkxlbmd0aCkpO1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5tYXhMZW5ndGgoY29tcC5jb250cm9sVHlwZS5tYXhMZW5ndGgpKTtcbiAgICAgIH1cblxuICAgICAgaWYoY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIE1sa0lucHV0KXtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4KGNvbXAuY29udHJvbFR5cGUubWF4KSk7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbihjb21wLmNvbnRyb2xUeXBlLm1pbikpO1xuICAgICAgfVxuICAgICAgZ3JvdXBbY29tcC5uYW1lXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgdmFsaWRhdG9ycylcbiAgICB9KTtcbiAgICAvL2FkZCBkZWZhdWx0IGNvbnRyb2xzXG4gICAgZ3JvdXBbJ2Zyb20nXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMTAwKSk7XG4gICAgZ3JvdXBbJ3RvJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDEwMCkpO1xuICAgIGdyb3VwWyduZWVkbGUnXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMjAwKSk7XG4gICAgdGhpcy5maWx0ZXJGb3JtID0gbmV3IEZvcm1Hcm91cChncm91cCk7XG4gICAgdGhpcy5sb2FkUGFnZSh7IG9mZnNldDogMCwgbGltaXQ6IHRoaXMucGFnZS5zaXplIH0sIG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZW1pdCBjbGljayBldmVudCBvZiB0aGUgYWN0aW9uc1xuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIG9uQWN0aW9uQ2xpY2soZXZlbnQ6IE1sa01vcmVBY3Rpb25EYXRhKSB7XG4gICAgdGhpcy5vbkFjdGlvbnNFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHNlcnZlciByZXF1ZXN0IG9mIGRhdGFibGVcbiAgICogQHBhcmFtIHBhZ2VJbmZvXG4gICAqIEBwYXJhbSBmaWx0ZXJzXG4gICAqL1xuICBsb2FkUGFnZShwYWdlSW5mbywgZmlsdGVycykge1xuICAgIGlmICghdGhpcy5lbmRwb2ludCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcmVxdWVzdDogTWFwPHN0cmluZywgYW55PjtcbiAgICBpZiAoZmlsdGVycykge1xuICAgICAgcmVxdWVzdCA9IGZpbHRlcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGlmKHRoaXMucGFyYW1zKXtcbiAgICAgIHRoaXMucGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpPT57XG4gICAgICAgIHJlcXVlc3Quc2V0KGtleSwgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJlcXVlc3Quc2V0KFwicGFnZVwiLCBwYWdlSW5mby5vZmZzZXQpO1xuICAgIHJlcXVlc3Quc2V0KFwic2l6ZVwiLCBwYWdlSW5mby5saW1pdCk7XG4gICAgdGhpcy5zdGVyd2FyZFNlcnZpY2UuZ2V0KHRoaXMuZW5kcG9pbnQsIHJlcXVlc3QpLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2UuY29kZSA9PSAyMDApIHtcbiAgICAgICAgdGhpcy5wYWdlID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gaGFuZGxlIHNlbGVjdCBvcHRpb25cbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBvblNlbGVjdChldmVudCkge1xuXG4gIH1cblxuICBvbkFjdGl2YXRlKGV2ZW50KSB7XG5cbiAgfVxuXG4gIHVwZGF0ZUZpbHRlcihldmVudCkge1xuXG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBwcm9jZXNzIHRhYmxlIGZpbHRlci4gSWYgZGF0ZSBmaWx0ZXIgaXMgbm90IHByb3ZpZGUgdGhlIGZyb20gdmFsdWUgaXMgXG4gICAqIHNldCB0byAyMDE4LTAxLTAxIGFuZCB0byB2YWx1ZSBpcyBzZXQgdG8gMSB5ZWFyIGZyb20gdG9kYXlcbiAgICogQHBhcmFtIGZvcm0gXG4gICAqL1xuICBwcm9jZXNzRmlsdGVyKGZvcm0pIHtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICBsZXQgZjogTWFwPFN0cmluZywgYW55PiA9IG5ldyBNYXAoT2JqZWN0LmVudHJpZXModGhpcy5maWx0ZXJGb3JtLnZhbHVlKSk7XG4gICAgLy92YWxpZGF0ZSBkYXRlIFxuICAgIGlmKCF0aGlzLmZpbHRlckZvcm0uZ2V0KCdmcm9tJykudG91Y2hlZCl7Ly9pZiBmcm9tIGlzIG5vdCBwb3B1bGF0ZWQgcmVtb3ZlIGZyb20gcmVxdWVzdFxuICAgICAgZi5kZWxldGUoJ2Zyb20nKTtcbiAgICAgIC8vIHRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS5zZXRWYWx1ZSgnMjAxOC0wMS0wMScpO1xuICAgIH1cbiAgICBpZighdGhpcy5maWx0ZXJGb3JtLmdldCgndG8nKS50b3VjaGVkKXsvL2lmIHRvIGlzIG5vdCBwb3B1bGF0ZWQgcmVtb3ZlIGZyb20gcmVxdWVzdFxuICAgICAgZi5kZWxldGUoJ3RvJyk7XG4gICAgICAvLyBsZXQgdG9EYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIC8vIHRvRGF0ZS5zZXREYXRlKHRvRGF0ZS5nZXRGdWxsWWVhcigpICsgMSk7XG4gICAgICAvLyB0aGlzLmZpbHRlckZvcm0uZ2V0KCd0bycpLnNldFZhbHVlKHRoaXMuZ2V0Rm9ybWF0dGVkRGF0ZSh0b0RhdGUpKTtcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRQYWdlKHsgb2Zmc2V0OiB0aGlzLnBhZ2UubnVtYmVyLCBsaW1pdDogdGhpcy5wYWdlLnNpemUgfSwgZik7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyBpbnB1dFxuICAgKiBAcGFyYW0gY29udHJvbFxuICAgKi9cbiAgaXNJbnB1dChjb250cm9sOiBhbnkpIHtcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIE1sa0lucHV0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgc2VsZWN0XG4gICAqIEBwYXJhbSBjb250cm9sXG4gICAqL1xuICBpc1NlbGVjdChjb250cm9sOiBhbnkpIHtcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIE1sa1NlbGVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIHRleHRhcmVhXG4gICAqL1xuICBpc1RleHRBcmVhKGNvbnRyb2w6IGFueSkge1xuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgTWxrVGV4dGFyZWE7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBmb3JtYXQgZGF0ZSB0byBzdHJpbmcgeXl5eS1NTS1kZFxuICAgKiBAcGFyYW0gZGF0ZVxuICAgKi9cbiAgZ2V0Rm9ybWF0dGVkRGF0ZShkYXRlKSB7XG4gICAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICB2YXIgbW9udGggPSAoMSArIGRhdGUuZ2V0TW9udGgoKSkudG9TdHJpbmcoKTtcbiAgICBtb250aCA9IG1vbnRoLmxlbmd0aCA+IDEgPyBtb250aCA6ICcwJyArIG1vbnRoO1xuXG4gICAgdmFyIGRheSA9IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgZGF5ID0gZGF5Lmxlbmd0aCA+IDEgPyBkYXkgOiAnMCcgKyBkYXk7XG5cbiAgICByZXR1cm4geWVhciArICctJyArIG1vbnRoICsgJy0nICsgZGF5O1xuICB9XG5cbiAgZ2V0RmllbGRWYWx1ZShkYXRhOiBPYmplY3QsIGZpZWxkOiBhbnkpe1xuICAgIHZhciBrOiBBcnJheTxzdHJpbmc+ID0gZmllbGQuc3BsaXQoXCIuXCIpO1xuICAgIHZhciBrZXlzID0gbmV3IFF1ZXVlPHN0cmluZz4oLi4uayk7XG4gICAgbGV0IHZhbHVlID0gdGhpcy5nZXRPYmplY3RWYWx1ZShkYXRhLCBrZXlzKTtcbiAgICBjb25zb2xlLmRlYnVnKFwiRm91bmQgdmFsdWU6XCIsIHZhbHVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBmaW5kIGtleSB2YWx1ZSBiYXNlZCBvbiB0aGUga2V5IHNlcXVlbmNlIHByb3ZpZGVkXG4gICAqIEBwYXJhbSBkYXRhIGV4cGVjdHMgYW4gb2JqZWN0XG4gICAqIEBwYXJhbSBrZXlzIGkuZS4gdXNlci5nZW5kZXIudHlwZS50eXBlXG4gICAqL1xuICBnZXRPYmplY3RWYWx1ZShkYXRhOiBhbnksIGtleXM6IFF1ZXVlPHN0cmluZz4pIHtcbiAgICBpZiAoIShkYXRhIGluc3RhbmNlb2YgT2JqZWN0KSkge1xuICAgICAgcmV0dXJuIGRhdGFba2V5cy50YWlsXTtcbiAgICB9XG4gICAgbGV0IHZhbHVlID0gbnVsbDtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICgoa2V5ID09PSBrZXlzLmZyb250KSAmJiAoa2V5ICE9PSBrZXlzLnRhaWwpICYmIChkYXRhW2tleV0gaW5zdGFuY2VvZiBPYmplY3QpKSB7XG4gICAgICAgIGtleXMuZGVxdWV1ZSgpO1xuICAgICAgICB2YWx1ZSA9IE9iamVjdC5rZXlzKHRoaXMuZ2V0T2JqZWN0VmFsdWUoZGF0YVtrZXldLCBrZXlzKSlbMF07XG4gICAgICB9IGVsc2UgaWYoa2V5ID09PSBrZXlzLnRhaWwpe1xuICAgICAgICB2YWx1ZSA9IE9iamVjdC5rZXlzKGRhdGFba2V5XSlbMF07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuXG4gIH1cblxufVxuLyoqXG4gKiBVc2VkIHRvIGRlZmluZSBkYXRhdGFibGUgY29sdW1ucyB3aXRoIGF0dHJpYnV0ZXMgKGNvbHVtbk5hbWUsIGZpZWxkTmFtZSwgd2lkdGgsIHNvcnRhYmxlLCBjYW5BdXRvUmVzaXplLFxuICogZHJhZ2dhYmxlLCByZXNpemFibGUsIGlzRGF0ZUNvbHVtbilcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNbGtEYXRhVGFibGVDb2x1bW4ge1xuICAvKipcbiAgICogY29sdW1uIHRpdGxlXG4gICAqL1xuICBjb2x1bW5OYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTZXJ2ZXIgc2lkZSByZXNwb25zZSBmaWVsZCBjb3JyZXNwb25kaW5nIHRvIHRoZSBjb2x1bW4gaS5lIGZ1bGxOYW1lIG1heSBjb3JyZXNwb25kIHRvIE5hbWUgY29sdW1uXG4gICAqL1xuICBmaWVsZE5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIFdpZHRoIG9mIHRoZSBjb2x1bW5cbiAgICovXG4gIHdpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogRW5hYmxlIHNvcnRpbmcgaW4gYSBjb2x1bW5cbiAgICovXG4gIHNvcnRhYmxlPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIE1ha2VzIGEgY29sdW1uIHJlc2l6YWJsZVxuICAgKi9cbiAgY2FuQXV0b1Jlc2l6ZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBFbmFibGVzIGEgY29sdW1uIHRvIGJlIGRyYWdnYWJsZVxuICAgKi9cbiAgZHJhZ2dhYmxlPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIE1ha2VzIGEgY29sdW1uIHJlc2l6YWJsZVxuICAgKi9cbiAgcmVzaXplYWJsZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBVc2VkIHRvIGVuYWJsZSBmb3JtYXRpbmcgdGltZXN0YW1wIHRvIHN0cmluZyBkYXRlXG4gICAqL1xuICBpc0RhdGVDb2x1bW4/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIFVzZWQgdG8gZGlzcGxheSBtb3JlIGFjdGlvbnMgY29sdW1uIGFuZCB0aGUgZW5kIG9mIHRoZSB0YWJsZVxuICovXG5leHBvcnQgY2xhc3MgTWxrTW9yZUFjdGlvbnMge1xuICAvKipcbiAgICogQWN0aW9uIENvbHVtbiBuYW1lIGUuZy4gTW9yZSBBY3Rpb25zXG4gICAqL1xuICBuYW1lOiBzdHJpbmcgPSBcIkFjdGlvbnNcIjtcbiAgLyoqXG4gICAqIEZpZWxkIG5hbWUgaWQgZnJvbSB0aGUgc2VydmVyIHJlc3BvbnNlIGUuZyB1c2VySWRcbiAgICovXG4gIGlkRmllbGROYW1lOiBzdHJpbmcgPSBcImlkXCI7XG4gIC8qKlxuICAgKiBBY3Rpb25zIGUuZy4gRWRpdCwgRGVsZXRlXG4gICAqL1xuICBhY3Rpb25zOiBBcnJheTxNbGtNb3JlQWN0aW9uRGF0YT47XG5cbiAgY29uc3RydWN0b3IoYWN0aW9uczogQXJyYXk8TWxrTW9yZUFjdGlvbkRhdGE+LCBpZD86IHN0cmluZywgbmFtZT86IHN0cmluZykge1xuICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnM7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlkRmllbGROYW1lID0gaWQ7XG4gIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1sa01vcmVBY3Rpb25EYXRhIHtcbiAgLyoqXG4gICAqIE5ldmVyIG1pbmQgdGhpcyBmaWVsZCBpdCB3aWxsIGJlIHVzZWQgYnkgdGhlIGxpYnJhcnlcbiAgICovXG4gIGlkPzogYW55O1xuICAvKipcbiAgICogQWN0aW9uIG5hbWUgZS5nLiBFZGl0LCBEZWxldGVcbiAgICovXG4gIGFjdGlvbk5hbWU6IGFueTtcbn0iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Rld2FyZENsaWVudENvbXBvbmVudCB9IGZyb20gJy4vc3Rld2FyZC1jbGllbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1sa0RhdGF0YWJsZUNvbXBvbmVudCB9IGZyb20gJy4vbWxrLWRhdGF0YWJsZS9tbGstZGF0YXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmd4RGF0YXRhYmxlTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU3Rld2FyZENvbmZpZyB9IGZyb20gJy4vc3Rld2FyZC1jbGllbnQuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE5neERhdGF0YWJsZU1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtTdGV3YXJkQ2xpZW50Q29tcG9uZW50LCBNbGtEYXRhdGFibGVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbU3Rld2FyZENsaWVudENvbXBvbmVudCwgTWxrRGF0YXRhYmxlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ2xpZW50TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBTdGV3YXJkQ29uZmlnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTdGV3YXJkQ2xpZW50TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbIHtwcm92aWRlOiBTdGV3YXJkQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnfSBdXG4gICAgfVxuICB9XG4gfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Q0FhQzs7Ozs7O0FDaEJEO0NBVUM7Ozs7QUFHRDs7Ozs7SUFNSSxZQUFvQixJQUFnQixFQUFFLE1BQXFCO1FBQXZDLFNBQUksR0FBSixJQUFJLENBQVk7d0JBRmpCLEdBQUc7UUFHbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO1NBQ3pGO2FBQU07WUFDSCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksV0FBVyxDQUFDO2dCQUMzQixjQUFjLEVBQUUsaUNBQWlDO2FBQ3BELENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFOztZQUNyQixPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3hGO0tBQ0o7Ozs7Ozs7SUFJRCxJQUFJLENBQUMsUUFBZ0IsRUFBRSxJQUFPO1FBQzFCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJ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