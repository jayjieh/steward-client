import { Injectable, Component, EventEmitter, Input, Output, ViewChild, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { __spread } from 'tslib';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Queue } from 'queue-typescript';
import { DatePipe, CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Wraps server response
 * @template T
 */
var  /**
 * Wraps server response
 * @template T
 */
ResponseWrapper = /** @class */ (function () {
    /**
     * Wraps server response
     */
    function ResponseWrapper() {
    }
    return ResponseWrapper;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var StewardConfig = /** @class */ (function () {
    function StewardConfig() {
    }
    return StewardConfig;
}());
/**
 * @template T, E
 */
var StewardClientService = /** @class */ (function () {
    function StewardClientService(http, config) {
        this.http = http;
        this.config = config;
        this.base_url = '/';
        this.base_url = config.base_url;
        if (config.headers) {
            this.headers = config.headers;
        }
        else {
            this.headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            });
        }
        if (config.access_token) {
            this.headers = this.headers.append('Authorization', 'Bearer ' + config.access_token);
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
        return this.http.post(this.base_url + endpoint, formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) }).pipe(catchError(this.handleError()));
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
        { type: StewardConfig }
    ]; };
    return StewardClientService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var StewardClientComponent = /** @class */ (function () {
    function StewardClientComponent() {
    }
    /**
     * @return {?}
     */
    StewardClientComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    StewardClientComponent.decorators = [
        { type: Component, args: [{
                    selector: 'stw-steward-client',
                    template: "\n    <p>\n      steward-client works!\n    </p>\n  ",
                    styles: []
                },] },
    ];
    StewardClientComponent.ctorParameters = function () { return []; };
    return StewardClientComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Datable page used to wrapper server content response
 * @template T
 */
var  /**
 * Datable page used to wrapper server content response
 * @template T
 */
Page = /** @class */ (function () {
    /**
     * Datable page used to wrapper server content response
     */
    function Page() {
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
    return Page;
}());
/**
 * used to map sort request
 */
var  /**
 * used to map sort request
 */
Sort = /** @class */ (function () {
    /**
     * used to map sort request
     */
    function Sort() {
        this.sorted = false;
        this.unsorted = true;
    }
    return Sort;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Represents dynamic html controls (Input, TextArea and Select)
 * @template T
 */
var  /**
 * Represents dynamic html controls (Input, TextArea and Select)
 * @template T
 */
MlkDynamicControl = /** @class */ (function () {
    function MlkDynamicControl(label, name, controlType, icon, isRequired, placeholder) {
        if (icon === void 0) { icon = "fa fa-file-text-o"; }
        if (isRequired === void 0) { isRequired = true; }
        if (placeholder === void 0) { placeholder = null; }
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
    return MlkDynamicControl;
}());
/**
 * Used to represent html input with options:
 * type: default to text,  maxLength, minLength, min, max
 */
var  /**
 * Used to represent html input with options:
 * type: default to text,  maxLength, minLength, min, max
 */
MlkInput = /** @class */ (function () {
    function MlkInput(type) {
        if (type === void 0) { type = "text"; }
        /**
         * Type of input e.g. text, number, date
         */
        this.type = "text";
        this.type = type;
        this.minLength = this.min = 0;
        this.maxLength = 4000;
        this.max = 1000000000;
    }
    return MlkInput;
}());
/**
 * Represents html textarea input
 */
var  /**
 * Represents html textarea input
 */
MlkTextarea = /** @class */ (function () {
    function MlkTextarea(cols, rows) {
        if (cols === void 0) { cols = 5; }
        if (rows === void 0) { rows = 1; }
        this.cols = cols;
        this.rows = rows;
        this.maxLength = 4000;
        this.minLength = 0;
    }
    return MlkTextarea;
}());
/**
 * Represents html select control
 */
var  /**
 * Represents html select control
 */
MlkSelect = /** @class */ (function () {
    function MlkSelect(options) {
        this.options = options;
    }
    return MlkSelect;
}());
var MlkSelectOption = /** @class */ (function () {
    function MlkSelectOption(value, text) {
        if (text === void 0) { text = null; }
        this.value = value;
        this.text = text ? text : value;
    }
    return MlkSelectOption;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// const { Queue } = require('queue-typescript');
var MlkDatatableComponent = /** @class */ (function () {
    function MlkDatatableComponent(sterwardService, datePipe) {
        this.sterwardService = sterwardService;
        this.datePipe = datePipe;
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
    }
    /**
     * Generate form control from filterComponents and also appending default controls ie. date filter and search controls
     */
    /**
     * Generate form control from filterComponents and also appending default controls ie. date filter and search controls
     * @return {?}
     */
    MlkDatatableComponent.prototype.ngOnInit = /**
     * Generate form control from filterComponents and also appending default controls ie. date filter and search controls
     * @return {?}
     */
    function () {
        /** @type {?} */
        var group = {};
        this.filterComponents.forEach(function (comp) {
            /** @type {?} */
            var validators = [];
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
    };
    /**
     * Used to emit click event of the actions
     * @param event
     */
    /**
     * Used to emit click event of the actions
     * @param {?} event
     * @return {?}
     */
    MlkDatatableComponent.prototype.onActionClick = /**
     * Used to emit click event of the actions
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onActionsEvent.emit(event);
    };
    /**
     * Process server request of datable
     * @param pageInfo
     * @param filters
     */
    /**
     * Process server request of datable
     * @param {?} pageInfo
     * @param {?} filters
     * @return {?}
     */
    MlkDatatableComponent.prototype.loadPage = /**
     * Process server request of datable
     * @param {?} pageInfo
     * @param {?} filters
     * @return {?}
     */
    function (pageInfo, filters) {
        var _this = this;
        if (!this.endpoint) {
            return;
        }
        /** @type {?} */
        var request;
        if (filters) {
            request = filters;
        }
        else {
            request = new Map();
        }
        if (this.params) {
            this.params.forEach(function (value, key) {
                request.set(key, value);
            });
        }
        request.set('page', pageInfo.offset);
        request.set('size', pageInfo.limit);
        this.sterwardService.get(this.endpoint, request).subscribe(function (response) {
            if (response.code === 200) {
                _this.page = response.data;
            }
        });
    };
    /**
     * Used to handle select option
     * @param event
     */
    /**
     * Used to handle select option
     * @param {?} __0
     * @return {?}
     */
    MlkDatatableComponent.prototype.onSelect = /**
     * Used to handle select option
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var selected = _a.selected;
        console.log('Select Event', selected, this.selected);
        this.selected.splice(0, this.selected.length);
        (_b = this.selected).push.apply(_b, __spread(selected));
        this.onSelected.emit(this.selected);
        var _b;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MlkDatatableComponent.prototype.onActivate = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MlkDatatableComponent.prototype.updateFilter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
    };
    /**
     * Used to process table filter. If date filter is not provide the from value is
     * set to 2018-01-01 and to value is set to 1 year from today
     * @param form
     */
    /**
     * Used to process table filter. If date filter is not provide the from value is
     * set to 2018-01-01 and to value is set to 1 year from today
     * @param {?} form
     * @return {?}
     */
    MlkDatatableComponent.prototype.processFilter = /**
     * Used to process table filter. If date filter is not provide the from value is
     * set to 2018-01-01 and to value is set to 1 year from today
     * @param {?} form
     * @return {?}
     */
    function (form) {
        // @ts-ignore
        /** @type {?} */
        var f = new Map(Object.entries(this.filterForm.value));
        // validate date
        if (!this.filterForm.get('from').touched) {
            f.delete('from');
            // this.filterForm.get('from').setValue('2018-01-01');
        }
        else {
            // f.get('from').setValue(new Date(this.filterForm.get('from').value));
            /** @type {?} */
            var fd = new Date(this.filterForm.get('from').value);
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
            var td = new Date(this.filterForm.get('to').value);
            // f.set('to', td.toISOString());
            f.set('to', this.datePipe.transform(td, 'dd/MM/yyyy'));
        }
        this.loadPage({ offset: this.page.number, limit: this.page.size }, f);
    };
    /**
     * Used to check if miliki control is input
     * @param control
     */
    /**
     * Used to check if miliki control is input
     * @param {?} control
     * @return {?}
     */
    MlkDatatableComponent.prototype.isInput = /**
     * Used to check if miliki control is input
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return control instanceof MlkInput;
    };
    /**
     * Used to check if miliki control is select
     * @param control
     */
    /**
     * Used to check if miliki control is select
     * @param {?} control
     * @return {?}
     */
    MlkDatatableComponent.prototype.isSelect = /**
     * Used to check if miliki control is select
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return control instanceof MlkSelect;
    };
    /**
     * @return {?}
     */
    MlkDatatableComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.ngOnInit();
    };
    /**
     * Used to check if miliki control is textarea
     */
    /**
     * Used to check if miliki control is textarea
     * @param {?} control
     * @return {?}
     */
    MlkDatatableComponent.prototype.isTextArea = /**
     * Used to check if miliki control is textarea
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return control instanceof MlkTextarea;
    };
    /**
     * @param {?} cell
     * @return {?}
     */
    MlkDatatableComponent.prototype.summaryFunc = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        return ("");
    };
    /**
     * Used to format date to string yyyy-MM-dd
     * @param date
     */
    /**
     * Used to format date to string yyyy-MM-dd
     * @param {?} date
     * @return {?}
     */
    MlkDatatableComponent.prototype.getFormattedDate = /**
     * Used to format date to string yyyy-MM-dd
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var year = date.getFullYear();
        /** @type {?} */
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        /** @type {?} */
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return year + '-' + month + '-' + day;
    };
    /**
     * @param {?} data
     * @param {?} field
     * @return {?}
     */
    MlkDatatableComponent.prototype.getFieldValue = /**
     * @param {?} data
     * @param {?} field
     * @return {?}
     */
    function (data, field) {
        /** @type {?} */
        var k = field.split('.');
        /** @type {?} */
        var keys = new (Queue.bind.apply(Queue, __spread([void 0], k)))();
        /** @type {?} */
        var value = this.getObjectValue(data, keys);
        return value;
    };
    /**
     * Used to find key value based on the key sequence provided
     * @param data expects an object
     * @param keys i.e. user.gender.type.type
     */
    /**
     * Used to find key value based on the key sequence provided
     * @param {?} data expects an object
     * @param {?} keys i.e. user.gender.type.type
     * @return {?}
     */
    MlkDatatableComponent.prototype.getObjectValue = /**
     * Used to find key value based on the key sequence provided
     * @param {?} data expects an object
     * @param {?} keys i.e. user.gender.type.type
     * @return {?}
     */
    function (data, keys) {
        var _this = this;
        if ((!(data instanceof Object)) || (keys.length === 1)) {
            return data[keys.tail];
        }
        /** @type {?} */
        var value = null;
        Object.keys(data).forEach(function (key) {
            if ((key === keys.front) && (data[key] instanceof Object)) {
                value = _this.getObjectValue(data[key], keys);
            }
            else if (key === keys.tail) {
                value = data[key];
            }
        });
        return value;
    };
    MlkDatatableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'stw-mlk-datatable',
                    template: "<div class=\"card card-outline-default\" *ngIf=\"enableFilterHeader\">\n  <div class=\"card-body\">\n    <form (ngSubmit)=\"processFilter(filterForm)\" [formGroup]=\"filterForm\">\n\n      <div class=\"row\">\n        <div class=\"col-md-3  mb-3\" *ngFor=\"let control of filterComponents\">\n          <label>{{control.label}}: </label>\n          <div class=\"input-group\">\n            <div class=\"input-group-append\">\n                <span class=\"input-group-text  form-icon-default\">\n                  <i [class]=\"control.icon\"></i>\n                </span>\n            </div>\n\n            <select *ngIf=\"isSelect(control.controlType)\" class=\"form-control form-control-sm checking-field\"\n                    [formControlName]=\"control.name\">\n              <option value=\"\" disabled selected>{{control.placeholder}}</option>\n              <option *ngFor=\"let o of control.controlType.options\">{{o.text}}</option>\n            </select>\n\n            <textarea *ngIf=\"isTextArea(control.controlType)\" [cols]=\"control.controlType.cols\"\n                      [rows]=\"control.controlType.rows\" class=\"form-control form-control-sm checking-field\"\n                      [placeholder]=\"control.placeholder\" [formControlName]=\"control.name\"></textarea>\n\n            <input *ngIf=\"isInput(control.controlType)\" [type]=\"control.controlType.type\"\n                   [placeholder]=\"control.placeholder\" class=\"form-control form-control-sm checking-field\"\n                   [formControlName]=\"control.name\"/>\n          </div>\n          <span class=\"help-block\" *ngIf=\"filterForm.get(control.name).touched\">\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}} is required</span>\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of {{control.controlType.minLength}}\n                characters</span>\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of {{control.controlType.maxLength}}\n                characters</span>\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get(control.name).hasError('min')\">Should be greater than {{control.controlType.min}}</span>\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get(control.name).hasError('max')\">Should be less than {{control.controlType.max}}</span>\n            </span>\n        </div>\n      </div>\n\n      <div class=\"row\" *ngIf=\"enableDefaultTableHeader\">\n        <div class=\"col-md-3 mb-3\">\n          <label>From: </label>\n          <div class=\"input-group\">\n            <div class=\"input-group-append\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-calendar-o\"></i>\n                </span>\n            </div>\n            <input\n              type=\"text\"\n              class=\"form-control form-control-sm checking-field\"\n              id=\"inputFromDate\"\n              formControlName=\"from\"\n              placeholder=\"From...\"\n              #dpfrom=\"bsDatepicker\"\n              bsDatepicker\n              [outsideClick]=\"false\"\n              [bsConfig]=\"{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }\"\n              maxlength=\"30\"\n              required\n              readonly\n            />\n            <div class=\"input-group-append\">\n              <button class=\"btn btn-primary\" type=\"button\" (click)=\"dpfrom.toggle()\"\n                      [attr.aria-expanded]=\"dpfrom.isOpen\"><i class=\"fa fa-th\"></i></button>\n            </div>\n          </div>\n          <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n                <span class=\"text-danger\"\n                      *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 30 characters</span>\n            </span>\n        </div>\n        <div class=\"col-md-3 mb-3\">\n          <label>To: </label>\n          <div class=\"input-group\">\n            <div class=\"input-group-append\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-calendar-o\"></i>\n                </span>\n            </div>\n            <input\n              type=\"text\"\n              class=\"form-control form-control-sm checking-field\"\n              id=\"inputToDate\"\n              formControlName=\"to\"\n              placeholder=\"To...\"\n              #dpto=\"bsDatepicker\"\n              bsDatepicker\n              [outsideClick]=\"false\"\n              [bsConfig]=\"{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }\"\n              maxlength=\"30\"\n              required\n              readonly\n            />\n            <div class=\"input-group-append\">\n              <button class=\"btn btn-primary\" type=\"button\" (click)=\"dpto.toggle()\" [attr.aria-expanded]=\"dpto.isOpen\">\n                <i class=\"fa fa-th\"></i></button>\n            </div>\n          </div>\n          <span class=\"help-block\" *ngIf=\"filterForm.get('to').touched\">\n                <span class=\"text-danger\"\n                      *ngIf=\"filterForm.get('to').hasError('maxlength')\">Maximum of 30 characters</span>\n            </span>\n        </div>\n        <div class=\"col-md-3 mb-3\">\n          <label>Search:</label>\n          <div class=\"input-group\">\n            <div class=\"input-group-prepend\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-search\"></i>\n                </span>\n            </div>\n            <input formControlName=\"needle\" class=\"form-control form-control-sm checking-field\" type=\"text\"\n                   placeholder=\"Search...\" (keyup)=\"updateFilter($event)\"/>\n          </div>\n        </div>\n        <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 200 characters</span>\n          </span>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"pull-right inline-buttons\">\n            <button class=\"btn btn-warning btn-sm\" type=\"reset\" (click)=\"reset()\">\n              <i class=\"fa fa-repeat\" aria-hidden=\"true\"></i>\n              Reset\n            </button>\n            <button class=\"btn btn-success btn-sm pull-right\" type=\"submit\">\n              <i class=\"fa fa-filter\" aria-hidden=\"true\"></i>\n              Filter\n            </button>\n          </div>\n        </div>\n      </div>\n\n    </form>\n  </div>\n</div>\n\n<ngx-datatable\n  #table\n  [rowHeight]=\"tableRowHeight\"\n  [footerHeight]=\"tableFooterHeight\"\n  [headerHeight]=\"tableHeaderHeight\"\n  [scrollbarV]=\"verticalScrollActive\"\n  [scrollbarH]=\"horizontalScrollActive\"\n  [summaryRow]=\"enableSummary\"\n  [summaryPosition]=\"summaryPosition\"\n  [summaryHeight]=\"summaryHeight\"\n  class=\"bootstrap\"\n  [columnMode]=\"'force'\"\n  [rows]=\"page.content\"\n  [selected]=\"selected\"\n  [selectionType]=\"'checkbox'\"\n  (activate)=\"onActivate($event)\"\n  (select)='onSelect($event)'\n  [count]=\"page.totalElements\"\n  [offset]=\"page.number\"\n  [externalPaging]=\"true\"\n  [limit]=\"page.size\"\n  (page)=\"loadPage($event, null)\">\n  <ngx-datatable-column [summaryFunc]=\"summaryFunc\" [width]=\"30\" [sortable]=\"false\" [canAutoResize]=\"false\"\n                        [draggable]=\"true\" [resizeable]=\"false\" [headerCheckboxable]=\"true\"\n                        [checkboxable]=\"true\" *ngIf=\"enableCheckbox\">\n  </ngx-datatable-column>\n  <ngx-datatable-column [summaryFunc]=\"summaryFunc\" [width]=\"30\" [sortable]=\"false\" [canAutoResize]=\"false\"\n                        [draggable]=\"true\" [resizeable]=\"false\" [headerCheckboxable]=\"true\"\n                        *ngFor=\"let c of columns; index as i;\">\n    <ng-template let-column=\"column\" ngx-datatable-header-template *ngIf=\"i==0\">\n      <strong>#</strong>\n    </ng-template>\n    <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" *ngIf=\"i==0\">\n        <span>\n            {{rowIndex + 1}}\n        </span>\n    </ng-template>\n  </ngx-datatable-column>\n  <ngx-datatable-column [summaryFunc]=\"(c.summaryFunc) ? c.summaryFunc : summaryFunc\"\n                        [canAutoResize]=\"(c.canAutoResize) ? c.canAutoResize : true\" [name]=\"c.columnName\"\n                        [width]=\"c.width\"\n                        [sortable]=\"(c.sortable) ? c.sortable : true\" [draggable]=\"(c.draggable) ? c.draggable : true\"\n                        [resizeable]=\"(c.resizeable) ? c.resizeable : true\"\n                        *ngFor=\"let c of columns; index as i;\">\n    <ng-template let-column=\"column\" ngx-datatable-header-template *ngIf=\"i==0\">\n      <strong>{{c.columnName}}</strong>\n    </ng-template>\n    <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\" *ngIf=\"i==0\">\n        <span>\n            <ng-container *ngIf=\"c.isDateColumn; then t10\"></ng-container>\n            <ng-container *ngIf=\"c.isCurrencyColumn && c.currencyText; then t40\"></ng-container>\n            <ng-container *ngIf=\"c.isCurrencyColumn && !c.currencyText; then t70\"></ng-container>\n            <ng-container *ngIf=\"!c.isDateColumn && !c.isCurrencyColumn; then t70\"></ng-container>\n\n            <ng-template #t10>\n                {{(getFieldValue(row, c.fieldName) | date:'medium')}}\n            </ng-template>\n            <ng-template #t40>\n                {{(getFieldValue(row, c.fieldName) | currency:c.currencyText:'code')}}\n            </ng-template>\n            <ng-template #t70>\n                {{getFieldValue(row, c.fieldName)}}\n            </ng-template>\n        </span>\n    </ng-template>\n\n    <ng-template let-column=\"column\" ngx-datatable-header-template>\n      <strong>{{c.columnName}}</strong>\n    </ng-template>\n    <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n        <span>\n            <ng-container *ngIf=\"c.isDateColumn; then t10\"></ng-container>\n            <ng-container *ngIf=\"c.isCurrencyColumn && c.currencyText; then t40\"></ng-container>\n            <ng-container *ngIf=\"c.isCurrencyColumn && !c.currencyText; then t70\"></ng-container>\n            <ng-container *ngIf=\"!c.isDateColumn && !c.isCurrencyColumn; then t70\"></ng-container>\n\n            <ng-template #t10>\n                {{(getFieldValue(row, c.fieldName) | date:'medium')}}\n            </ng-template>\n            <ng-template #t40>\n                {{(getFieldValue(row, c.fieldName) | currency:c.currencyText:'code')}}\n            </ng-template>\n            <ng-template #t70>\n                {{getFieldValue(row, c.fieldName)}}\n            </ng-template>\n        </span>\n    </ng-template>\n  </ngx-datatable-column>\n  <ngx-datatable-column [summaryFunc]=\"summaryFunc\" [name]=\"moreActions.name\" *ngIf=\"moreActions\" [sortable]=\"false\"\n                        [canAutoResize]=\"false\">\n    <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n        <span>\n          <div class=\"input-group-prepend\">\n            <button class=\"btn btn-sm btn-outline-secondary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\"\n                    aria-haspopup=\"true\"\n                    aria-expanded=\"false\">\n              <i class=\"fa fa-list-ul\" aria-hidden=\"true\"></i>\n            </button>\n            <div class=\"dropdown-menu\">\n              <a class=\"dropdown-item\" *ngFor=\"let action of moreActions.actions\" href=\"javascript:;\"\n                 (click)=\"onActionClick({id: row[moreActions.idFieldName], actionName: action.actionName, actionRow: row})\">{{action.actionName}}</a>\n            </div>\n          </div>\n        </span>\n    </ng-template>\n  </ngx-datatable-column>\n</ngx-datatable>\n",
                    styles: [""]
                },] },
    ];
    MlkDatatableComponent.ctorParameters = function () { return [
        { type: StewardClientService },
        { type: DatePipe }
    ]; };
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
    return MlkDatatableComponent;
}());
/**
 * Used to display more actions column and the end of the table
 */
var  /**
 * Used to display more actions column and the end of the table
 */
MlkMoreActions = /** @class */ (function () {
    function MlkMoreActions(actions, id, name) {
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
    return MlkMoreActions;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var StewardClientModule = /** @class */ (function () {
    function StewardClientModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    StewardClientModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: StewardClientModule,
            providers: [{ provide: StewardConfig, useValue: config }]
        };
    };
    StewardClientModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        NgxDatatableModule,
                        CommonModule,
                        BsDatepickerModule.forRoot(),
                        HttpClientModule
                    ],
                    declarations: [StewardClientComponent, MlkDatatableComponent],
                    exports: [StewardClientComponent, MlkDatatableComponent],
                    providers: [DatePipe]
                },] },
    ];
    return StewardClientModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { StewardConfig, StewardClientService, StewardClientComponent, MlkDatatableComponent, MlkMoreActions, StewardClientModule, MlkDynamicControl, MlkInput, MlkTextarea, MlkSelect, MlkSelectOption, Page, Sort, ResponseWrapper };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQuanMubWFwIiwic291cmNlcyI6WyJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy93cmFwcGVycy9yZXNwb25zZS13cmFwcGVyLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvc3Rld2FyZC1jbGllbnQuc2VydmljZS50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50LmNvbXBvbmVudC50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy93cmFwcGVycy9tbGstZHluYW1pYy1jb250cm9sLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvbWxrLWRhdGF0YWJsZS9tbGstZGF0YXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogV3JhcHMgc2VydmVyIHJlc3BvbnNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVzcG9uc2VXcmFwcGVyPFQ+IHtcclxuICAgIC8qKlxyXG4gICAgICogSHR0cCBzdGF0dXMgY29kZSBlLmcuIDIwMFxyXG4gICAgICovXHJcbiAgICBjb2RlOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFNlcnZlciBtZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogQWN0dWFsIHJlc3BvbnNlIGRhdGFcclxuICAgICAqL1xyXG4gICAgZGF0YTogVDtcclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwSGVhZGVycywgSHR0cFBhcmFtc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQge09ic2VydmFibGUsIG9mfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtjYXRjaEVycm9yfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7UmVzcG9uc2VXcmFwcGVyfSBmcm9tICcuL2VudGl0aWVzL3dyYXBwZXJzL3Jlc3BvbnNlLXdyYXBwZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDb25maWcge1xyXG4gIGJhc2VfdXJsOiBzdHJpbmc7XHJcbiAgYWNjZXNzX3Rva2VuPzogc3RyaW5nO1xyXG4gIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudFNlcnZpY2U8VCwgRT4ge1xyXG5cclxuICBwcml2YXRlIGhlYWRlcnM6IEh0dHBIZWFkZXJzO1xyXG4gIHRva2VuOiBzdHJpbmc7XHJcbiAgYmFzZV91cmwgPSAnLyc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBjb25maWc6IFN0ZXdhcmRDb25maWcpIHtcclxuICAgIHRoaXMuYmFzZV91cmwgPSBjb25maWcuYmFzZV91cmw7XHJcbiAgICBpZiAoY29uZmlnLmhlYWRlcnMpIHtcclxuICAgICAgdGhpcy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXHJcbiAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzX3Rva2VuJylcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoY29uZmlnLmFjY2Vzc190b2tlbikgey8vIGFwcGVuZCBhY2Nlc3MgdG9rZW4gaWYgdGhlIGVudmlyb25tZW50IGhhcyBhY2Nlc3MgdG9rZW5cclxuICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5oZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgJyArIGNvbmZpZy5hY2Nlc3NfdG9rZW4pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBoYW5kbGUgaHR0cCBwb3N0IHJlcXVlc3RzXHJcbiAgICovXHJcbiAgcG9zdChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7aGVhZGVyczogdGhpcy5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKX0pLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBoYW5kbGUgaHR0cCBwb3N0IHJlcXVlc3RzXHJcbiAgICovXHJcbiAgcHV0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBKU09OLnN0cmluZ2lmeShkYXRhKSwge2hlYWRlcnM6IHRoaXMuaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyl9KS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZShlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdCgnZGVsZXRlJywgdGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCB7XHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyksXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICB9KS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldChlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBvcHRpb25zKS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGlmXHJcbiAgICogQHBhcmFtIGVuZHBvaW50XHJcbiAgICogQHBhcmFtIGRhdGFcclxuICAgKiBAcGFyYW0gaGVhZGVyc1xyXG4gICAqL1xyXG4gIHBvc3RGb3JtRGF0YShlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBULCBoZWFkZXJzPzogSHR0cEhlYWRlcnMpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMuaGVhZGVycy5nZXQoJ0F1dGhvcml6YXRpb24nKSAmJiAoIWhlYWRlcnMpKSB7XHJcbiAgICAgIGhlYWRlcnMgPSB0aGlzLmhlYWRlcnM7XHJcbiAgICB9IGVsc2UgaWYgKCFoZWFkZXJzKSB7XHJcbiAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIGZvcm1EYXRhLCB7aGVhZGVyczogaGVhZGVyc30pLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcG9zdEZvcm1EYXRhTXVsdGlwYXJ0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSkge1xyXG4gICAgICAgIGRhdGFba2V5XS5mb3JFYWNoKGsyID0+IHtcclxuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGsyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIGZvcm1EYXRhLCB7aGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NfdG9rZW4nKX0pfSkucGlwZShcclxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEh0dHBQYXJhbXMoZGF0YTogTWFwPHN0cmluZywgc3RyaW5nPik6IEh0dHBQYXJhbXMge1xyXG4gICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgIH1cclxuICAgIGxldCBodHRwUGFyYW1zOiBIdHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgIGRhdGEuZm9yRWFjaCgodmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuYXBwZW5kKGtleSwgdmFsdWUpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gaHR0cFBhcmFtcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gY2F0Y2ggZXhjZXB0aW9uIHRocm93biBieSBodHRwIGNsaWVudCByZXR1cm5zIGludGVybmFsIHNlcnZlciBlcnJvclxyXG4gICAqIGlmIHN0YXR1cyA1MDAgaXMgZW5jb3VudGVyZWRcclxuICAgKi9cclxuICBwcml2YXRlIGhhbmRsZUVycm9yPFJlc3BvbnNlV3JhcHBlcj4oKSB7XHJcbiAgICByZXR1cm4gKGVycm9yOiBIdHRwRXJyb3JSZXNwb25zZSk6IE9ic2VydmFibGU8YW55PiA9PiB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IG5ldyBSZXNwb25zZVdyYXBwZXIoKTtcclxuICAgICAgLy8gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTsgLy8gbG9nIHRvIGNvbnNvbGUgaW5zdGVhZFxyXG4gICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA1MDApIHtcclxuICAgICAgICByZXMuY29kZSA9IGVycm9yLnN0YXR1cztcclxuICAgICAgICByZXMubWVzc2FnZSA9ICdTb3JyeSBpbnRlcm5hbCBzZXJ2ZXIgZXJyb3Igb2NjdXJlZCBwbGVhc2UgdHJ5IGFnYWluIGxhdGVyJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXMuY29kZSA9IGVycm9yLnN0YXR1cztcclxuICAgICAgICByZXMubWVzc2FnZSA9IGVycm9yLmVycm9yLm1lc3NhZ2U7XHJcbiAgICAgICAgcmVzLmRhdGEgPSBlcnJvci5lcnJvci5kYXRhO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvZihyZXMpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gcmVuZGVyIGFjdGlvbiBidXR0b25zXHJcbiAgICovXHJcbiAgc3RhdGljIHJlbmRlck1vcmUoaWQ6IGFueSkge1xyXG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVxcJ2FjdGlvbnMtYnV0dG9ucyBjZW50ZXJcXCcgaWQ9XFwnJyArIGlkICsgJ1xcJz48aSBjbGFzcz1cXCdmYSBmYS1jaGVja1xcJyB0aXRsZT1cXCdBcHByb3ZlXFwnPjwvaT4gPGkgY2xhc3M9XFwnZmEgZmEtYmFuXFwnIHRpdGxlPVxcJ0RlY2xpbmVcXCc+PC9pPjwvZGl2Pic7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW50aWF0ZURhdGFUYWJsZShlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPikge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgICBwYXJhbXM6IHRoaXMuZ2V0SHR0cFBhcmFtcyhkYXRhKVxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgb3B0aW9ucykucGlwZShcclxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3N0dy1zdGV3YXJkLWNsaWVudCcsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxwPlxyXG4gICAgICBzdGV3YXJkLWNsaWVudCB3b3JrcyFcclxuICAgIDwvcD5cclxuICBgLFxyXG4gIHN0eWxlczogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDbGllbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiBEYXRhYmxlIHBhZ2UgdXNlZCB0byB3cmFwcGVyIHNlcnZlciBjb250ZW50IHJlc3BvbnNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUGFnZTxUPiB7XHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciBvZiBpdGVtcyBwZXIgcGFnZSBzYW1lIGFzIGxpbWl0XHJcbiAgICAgKi9cclxuICAgIHNpemU6IG51bWJlciA9IDEwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUb3RhbCBpdGVtcyBhdmFpbGFibGUgb24gdGhlIHNlcnZlclxyXG4gICAgICovXHJcbiAgICB0b3RhbEVsZW1lbnRzOiBudW1iZXIgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUb3RhbCBudW1iZXIgb2YgcGFnZXMgcHJlc2VudFxyXG4gICAgICovXHJcbiAgICB0b3RhbFBhZ2VzOiBudW1iZXIgPSAwO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgaXMgdGhlIGZpcnN0IHBhZ2VcclxuICAgICAqL1xyXG4gICAgZmlyc3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgaXQgaXMgdGhlIGxhc3QgcGFnZVxyXG4gICAgICovXHJcbiAgICBsYXN0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhY3R1YWwgcGFnZSBjb250ZW50XHJcbiAgICAgKi9cclxuICAgIGNvbnRlbnQ6IEFycmF5PFQ+ID0gW107XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gbWFwIHNvcnQgcGFyYW1ldGVyc1xyXG4gICAgICovXHJcbiAgICBzb3J0ZWQ6IFNvcnQgPSBuZXcgU29ydCgpO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDdXJyZW50IHBhZ2UgbnVtYmVyXHJcbiAgICAgKi9cclxuICAgIG51bWJlcjogbnVtYmVyID0gMDtcclxufVxyXG4vKipcclxuICogdXNlZCB0byBtYXAgc29ydCByZXF1ZXN0XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU29ydHtcclxuICAgIHNvcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgdW5zb3J0ZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBSZXByZXNlbnRzIGR5bmFtaWMgaHRtbCBjb250cm9scyAoSW5wdXQsIFRleHRBcmVhIGFuZCBTZWxlY3QpXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWxrRHluYW1pY0NvbnRyb2w8VD4ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb250cm9sIGxhYmVsXHJcbiAgICAgKi9cclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIEljb24gdG8gYmUgYXBwZW5kZWQgYmVmb3JlIHRoZSBjb250cm9sIChzdXBwb3J0cyBjbGFzcyBkZWZpbmVkIGljb25zKVxyXG4gICAgICovXHJcbiAgICBpY29uOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIE5hbWUgb2YgdGhlIGNvbnRyb2wgKHByb3ZpZGUgdmFyaWFibGUgdmFsaWQgbmFtZXMgaWUuIG5vIHNwYWNlcyBwcmVmYXJhYmx5IGFwaSBjb3JyZXNwb25kaW5nIG5hbWVzIGUuZy4gdXNlck5hbWUpXHJcbiAgICAgKi9cclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGFjdHVhbCBjb250cm9sIChNbGtJbnB1dCwgTWxrVGV4dEFyZWEgJiBNbGtTZWxlY3QpXHJcbiAgICAgKi9cclxuICAgIGNvbnRyb2xUeXBlOiBUO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIGZpZWxkIGlzIHJlcXVpcmVkXHJcbiAgICAgKi9cclxuICAgIGlzUmVxdWlyZWQ6IGJvb2xlYW47XHJcbiAgICAvKipcclxuICAgICAqIENvbnRyb2wgcGxhY2Vob2xkZXJcclxuICAgICAqL1xyXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IobGFiZWw6IHN0cmluZywgbmFtZTogc3RyaW5nLCBjb250cm9sVHlwZTogVCwgaWNvbjogc3RyaW5nID0gXCJmYSBmYS1maWxlLXRleHQtb1wiLFxyXG4gICAgICAgIGlzUmVxdWlyZWQ6IGJvb2xlYW4gPSB0cnVlLCBwbGFjZWhvbGRlcjogc3RyaW5nID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBjb250cm9sVHlwZTtcclxuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xyXG4gICAgICAgIHRoaXMuaXNSZXF1aXJlZCA9IGlzUmVxdWlyZWQ7XHJcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyID8gcGxhY2Vob2xkZXIgOiBsYWJlbDtcclxuICAgIH1cclxuXHJcbn1cclxuLyoqXHJcbiAqIFVzZWQgdG8gcmVwcmVzZW50IGh0bWwgaW5wdXQgd2l0aCBvcHRpb25zOlxyXG4gKiB0eXBlOiBkZWZhdWx0IHRvIHRleHQsICBtYXhMZW5ndGgsIG1pbkxlbmd0aCwgbWluLCBtYXhcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNbGtJbnB1dHtcclxuICAgIC8qKlxyXG4gICAgICogVHlwZSBvZiBpbnB1dCBlLmcuIHRleHQsIG51bWJlciwgZGF0ZVxyXG4gICAgICovXHJcbiAgICB0eXBlOiBzdHJpbmcgPSBcInRleHRcIjtcclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBsZW5ndGggb2YgdGhlIGlucHV0XHJcbiAgICAgKi9cclxuICAgIG1heExlbmd0aDogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIG1pbmltdW0gaW5wdXQgbGVuZ3RoXHJcbiAgICAgKi9cclxuICAgIG1pbkxlbmd0aDogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIG51bWJlciBpbnB1dHNcclxuICAgICAqL1xyXG4gICAgbWluOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgbnVtYmVyIGlucHV0c1xyXG4gICAgICovXHJcbiAgICBtYXg6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcgPSBcInRleHRcIikge1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5taW5MZW5ndGggPSB0aGlzLm1pbiA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXhMZW5ndGggPSA0MDAwO1xyXG4gICAgICAgIHRoaXMubWF4ID0gMTAwMDAwMDAwMDtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgaHRtbCB0ZXh0YXJlYSBpbnB1dFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1sa1RleHRhcmVhe1xyXG4gICAgLyoqXHJcbiAgICAgKiBOdW1iZXIgdGV4dGFyZWEgY29sdW1uc1xyXG4gICAgICovXHJcbiAgICBjb2xzPzogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBOdW1iZXIgb2YgdGV4dGFyZWEgcm93c1xyXG4gICAgICovXHJcbiAgICByb3dzPzogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZSBtYXhpbXVtIGlucHV0IGxlbmd0aFxyXG4gICAgICovXHJcbiAgICBtYXhMZW5ndGg6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogVmFsaWRhdGUgbWluaW11bSBpbnB1dCBsZW5ndGhcclxuICAgICAqL1xyXG4gICAgbWluTGVuZ3RoOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY29sczogbnVtYmVyID0gNSwgcm93czogbnVtYmVyID0gMSl7XHJcbiAgICAgICAgdGhpcy5jb2xzID0gY29scztcclxuICAgICAgICB0aGlzLnJvd3MgPSByb3dzO1xyXG4gICAgICAgIHRoaXMubWF4TGVuZ3RoID0gNDAwMDtcclxuICAgICAgICB0aGlzLm1pbkxlbmd0aCA9IDBcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgaHRtbCBzZWxlY3QgY29udHJvbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1sa1NlbGVjdCB7XHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdCBvcHRpb25zXHJcbiAgICAgKi9cclxuICAgIG9wdGlvbnM6IEFycmF5PE1sa1NlbGVjdE9wdGlvbj47XHJcblxyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogQXJyYXk8TWxrU2VsZWN0T3B0aW9uPil7XHJcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNbGtTZWxlY3RPcHRpb257XHJcbiAgICAvKipcclxuICAgICAqIE9wdGlvbiB2YWx1ZVxyXG4gICAgICovXHJcbiAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBPcHRpb24gdGV4dC9sYWJlbFxyXG4gICAgICovXHJcbiAgICB0ZXh0OiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZywgdGV4dDogc3RyaW5nID0gbnVsbCl7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQgPyB0ZXh0IDogdmFsdWU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Rm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9yc30gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge1BhZ2V9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UnO1xyXG5pbXBvcnQge01sa0R5bmFtaWNDb250cm9sLCBNbGtJbnB1dCwgTWxrU2VsZWN0LCBNbGtUZXh0YXJlYX0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvbWxrLWR5bmFtaWMtY29udHJvbCc7XHJcbmltcG9ydCB7UmVzcG9uc2VXcmFwcGVyfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9yZXNwb25zZS13cmFwcGVyJztcclxuaW1wb3J0IHtTdGV3YXJkQ2xpZW50U2VydmljZX0gZnJvbSAnLi4vc3Rld2FyZC1jbGllbnQuc2VydmljZSc7XHJcbmltcG9ydCB7RGF0YXRhYmxlQ29tcG9uZW50fSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XHJcbmltcG9ydCB7UXVldWV9IGZyb20gJ3F1ZXVlLXR5cGVzY3JpcHQnO1xyXG5pbXBvcnQge0RhdGVQaXBlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuLy8gY29uc3QgeyBRdWV1ZSB9ID0gcmVxdWlyZSgncXVldWUtdHlwZXNjcmlwdCcpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzdHctbWxrLWRhdGF0YWJsZScsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY2FyZCBjYXJkLW91dGxpbmUtZGVmYXVsdFwiICpuZ0lmPVwiZW5hYmxlRmlsdGVySGVhZGVyXCI+XHJcbiAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxyXG4gICAgPGZvcm0gKG5nU3VibWl0KT1cInByb2Nlc3NGaWx0ZXIoZmlsdGVyRm9ybSlcIiBbZm9ybUdyb3VwXT1cImZpbHRlckZvcm1cIj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgIG1iLTNcIiAqbmdGb3I9XCJsZXQgY29udHJvbCBvZiBmaWx0ZXJDb21wb25lbnRzXCI+XHJcbiAgICAgICAgICA8bGFiZWw+e3tjb250cm9sLmxhYmVsfX06IDwvbGFiZWw+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0ICBmb3JtLWljb24tZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgICA8aSBbY2xhc3NdPVwiY29udHJvbC5pY29uXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxzZWxlY3QgKm5nSWY9XCJpc1NlbGVjdChjb250cm9sLmNvbnRyb2xUeXBlKVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLm5hbWVcIj5cclxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQgc2VsZWN0ZWQ+e3tjb250cm9sLnBsYWNlaG9sZGVyfX08L29wdGlvbj5cclxuICAgICAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBvIG9mIGNvbnRyb2wuY29udHJvbFR5cGUub3B0aW9uc1wiPnt7by50ZXh0fX08L29wdGlvbj5cclxuICAgICAgICAgICAgPC9zZWxlY3Q+XHJcblxyXG4gICAgICAgICAgICA8dGV4dGFyZWEgKm5nSWY9XCJpc1RleHRBcmVhKGNvbnRyb2wuY29udHJvbFR5cGUpXCIgW2NvbHNdPVwiY29udHJvbC5jb250cm9sVHlwZS5jb2xzXCJcclxuICAgICAgICAgICAgICAgICAgICAgIFtyb3dzXT1cImNvbnRyb2wuY29udHJvbFR5cGUucm93c1wiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCI+PC90ZXh0YXJlYT5cclxuXHJcbiAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cImlzSW5wdXQoY29udHJvbC5jb250cm9sVHlwZSlcIiBbdHlwZV09XCJjb250cm9sLmNvbnRyb2xUeXBlLnR5cGVcIlxyXG4gICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxyXG4gICAgICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLm5hbWVcIi8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS50b3VjaGVkXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdyZXF1aXJlZCcpXCI+e3tjb250cm9sLnBsYWNlaG9sZGVyfX0gaXMgcmVxdWlyZWQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtaW5sZW5ndGgnKVwiPk1pbmltdW0gb2Yge3tjb250cm9sLmNvbnRyb2xUeXBlLm1pbkxlbmd0aH19XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJzPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIHt7Y29udHJvbC5jb250cm9sVHlwZS5tYXhMZW5ndGh9fVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyczwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21pbicpXCI+U2hvdWxkIGJlIGdyZWF0ZXIgdGhhbiB7e2NvbnRyb2wuY29udHJvbFR5cGUubWlufX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtYXgnKVwiPlNob3VsZCBiZSBsZXNzIHRoYW4ge3tjb250cm9sLmNvbnRyb2xUeXBlLm1heH19PC9zcGFuPlxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiICpuZ0lmPVwiZW5hYmxlRGVmYXVsdFRhYmxlSGVhZGVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIG1iLTNcIj5cclxuICAgICAgICAgIDxsYWJlbD5Gcm9tOiA8L2xhYmVsPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCBmb3JtLWljb24tZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNhbGVuZGFyLW9cIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCJcclxuICAgICAgICAgICAgICBpZD1cImlucHV0RnJvbURhdGVcIlxyXG4gICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cImZyb21cIlxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRnJvbS4uLlwiXHJcbiAgICAgICAgICAgICAgI2RwZnJvbT1cImJzRGF0ZXBpY2tlclwiXHJcbiAgICAgICAgICAgICAgYnNEYXRlcGlja2VyXHJcbiAgICAgICAgICAgICAgW291dHNpZGVDbGlja109XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgW2JzQ29uZmlnXT1cInsgZGF0ZUlucHV0Rm9ybWF0OiAnREQtTU0tWVlZWScsIGNvbnRhaW5lckNsYXNzOiAndGhlbWUtcmVkJyB9XCJcclxuICAgICAgICAgICAgICBtYXhsZW5ndGg9XCIzMFwiXHJcbiAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgICByZWFkb25seVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiZHBmcm9tLnRvZ2dsZSgpXCJcclxuICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiZHBmcm9tLmlzT3BlblwiPjxpIGNsYXNzPVwiZmEgZmEtdGhcIj48L2k+PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykudG91Y2hlZFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiAzMCBjaGFyYWN0ZXJzPC9zcGFuPlxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIG1iLTNcIj5cclxuICAgICAgICAgIDxsYWJlbD5UbzogPC9sYWJlbD5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgZm9ybS1pY29uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhci1vXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXHJcbiAgICAgICAgICAgICAgaWQ9XCJpbnB1dFRvRGF0ZVwiXHJcbiAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwidG9cIlxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVG8uLi5cIlxyXG4gICAgICAgICAgICAgICNkcHRvPVwiYnNEYXRlcGlja2VyXCJcclxuICAgICAgICAgICAgICBic0RhdGVwaWNrZXJcclxuICAgICAgICAgICAgICBbb3V0c2lkZUNsaWNrXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICBbYnNDb25maWddPVwieyBkYXRlSW5wdXRGb3JtYXQ6ICdERC1NTS1ZWVlZJywgY29udGFpbmVyQ2xhc3M6ICd0aGVtZS1yZWQnIH1cIlxyXG4gICAgICAgICAgICAgIG1heGxlbmd0aD1cIjMwXCJcclxuICAgICAgICAgICAgICByZXF1aXJlZFxyXG4gICAgICAgICAgICAgIHJlYWRvbmx5XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJkcHRvLnRvZ2dsZSgpXCIgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJkcHRvLmlzT3BlblwiPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS10aFwiPjwvaT48L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ3RvJykudG91Y2hlZFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCd0bycpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2YgMzAgY2hhcmFjdGVyczwvc3Bhbj5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCI+XHJcbiAgICAgICAgICA8bGFiZWw+U2VhcmNoOjwvbGFiZWw+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLXByZXBlbmRcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCBmb3JtLWljb24tZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXNlYXJjaFwiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxpbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJuZWVkbGVcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIiB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaC4uLlwiIChrZXl1cCk9XCJ1cGRhdGVGaWx0ZXIoJGV2ZW50KVwiLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS50b3VjaGVkXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2YgMjAwIGNoYXJhY3RlcnM8L3NwYW4+XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwdWxsLXJpZ2h0IGlubGluZS1idXR0b25zXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXdhcm5pbmcgYnRuLXNtXCIgdHlwZT1cInJlc2V0XCIgKGNsaWNrKT1cInJlc2V0KClcIj5cclxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXJlcGVhdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cclxuICAgICAgICAgICAgICBSZXNldFxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG4tc20gcHVsbC1yaWdodFwiIHR5cGU9XCJzdWJtaXRcIj5cclxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWZpbHRlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cclxuICAgICAgICAgICAgICBGaWx0ZXJcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgPC9mb3JtPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuXHJcbjxuZ3gtZGF0YXRhYmxlXHJcbiAgI3RhYmxlXHJcbiAgW3Jvd0hlaWdodF09XCJ0YWJsZVJvd0hlaWdodFwiXHJcbiAgW2Zvb3RlckhlaWdodF09XCJ0YWJsZUZvb3RlckhlaWdodFwiXHJcbiAgW2hlYWRlckhlaWdodF09XCJ0YWJsZUhlYWRlckhlaWdodFwiXHJcbiAgW3Njcm9sbGJhclZdPVwidmVydGljYWxTY3JvbGxBY3RpdmVcIlxyXG4gIFtzY3JvbGxiYXJIXT1cImhvcml6b250YWxTY3JvbGxBY3RpdmVcIlxyXG4gIFtzdW1tYXJ5Um93XT1cImVuYWJsZVN1bW1hcnlcIlxyXG4gIFtzdW1tYXJ5UG9zaXRpb25dPVwic3VtbWFyeVBvc2l0aW9uXCJcclxuICBbc3VtbWFyeUhlaWdodF09XCJzdW1tYXJ5SGVpZ2h0XCJcclxuICBjbGFzcz1cImJvb3RzdHJhcFwiXHJcbiAgW2NvbHVtbk1vZGVdPVwiJ2ZvcmNlJ1wiXHJcbiAgW3Jvd3NdPVwicGFnZS5jb250ZW50XCJcclxuICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxyXG4gIFtzZWxlY3Rpb25UeXBlXT1cIidjaGVja2JveCdcIlxyXG4gIChhY3RpdmF0ZSk9XCJvbkFjdGl2YXRlKCRldmVudClcIlxyXG4gIChzZWxlY3QpPSdvblNlbGVjdCgkZXZlbnQpJ1xyXG4gIFtjb3VudF09XCJwYWdlLnRvdGFsRWxlbWVudHNcIlxyXG4gIFtvZmZzZXRdPVwicGFnZS5udW1iZXJcIlxyXG4gIFtleHRlcm5hbFBhZ2luZ109XCJ0cnVlXCJcclxuICBbbGltaXRdPVwicGFnZS5zaXplXCJcclxuICAocGFnZSk9XCJsb2FkUGFnZSgkZXZlbnQsIG51bGwpXCI+XHJcbiAgPG5neC1kYXRhdGFibGUtY29sdW1uIFtzdW1tYXJ5RnVuY109XCJzdW1tYXJ5RnVuY1wiIFt3aWR0aF09XCIzMFwiIFtzb3J0YWJsZV09XCJmYWxzZVwiIFtjYW5BdXRvUmVzaXplXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2RyYWdnYWJsZV09XCJ0cnVlXCIgW3Jlc2l6ZWFibGVdPVwiZmFsc2VcIiBbaGVhZGVyQ2hlY2tib3hhYmxlXT1cInRydWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2hlY2tib3hhYmxlXT1cInRydWVcIiAqbmdJZj1cImVuYWJsZUNoZWNrYm94XCI+XHJcbiAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cclxuICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gW3N1bW1hcnlGdW5jXT1cInN1bW1hcnlGdW5jXCIgW3dpZHRoXT1cIjMwXCIgW3NvcnRhYmxlXT1cImZhbHNlXCIgW2NhbkF1dG9SZXNpemVdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbZHJhZ2dhYmxlXT1cInRydWVcIiBbcmVzaXplYWJsZV09XCJmYWxzZVwiIFtoZWFkZXJDaGVja2JveGFibGVdPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjIG9mIGNvbHVtbnM7IGluZGV4IGFzIGk7XCI+XHJcbiAgICA8bmctdGVtcGxhdGUgbGV0LWNvbHVtbj1cImNvbHVtblwiIG5neC1kYXRhdGFibGUtaGVhZGVyLXRlbXBsYXRlICpuZ0lmPVwiaT09MFwiPlxyXG4gICAgICA8c3Ryb25nPiM8L3N0cm9uZz5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXJvdz1cInJvd1wiICpuZ0lmPVwiaT09MFwiPlxyXG4gICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICB7e3Jvd0luZGV4ICsgMX19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxyXG4gIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBbc3VtbWFyeUZ1bmNdPVwiKGMuc3VtbWFyeUZ1bmMpID8gYy5zdW1tYXJ5RnVuYyA6IHN1bW1hcnlGdW5jXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2NhbkF1dG9SZXNpemVdPVwiKGMuY2FuQXV0b1Jlc2l6ZSkgPyBjLmNhbkF1dG9SZXNpemUgOiB0cnVlXCIgW25hbWVdPVwiYy5jb2x1bW5OYW1lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3dpZHRoXT1cImMud2lkdGhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbc29ydGFibGVdPVwiKGMuc29ydGFibGUpID8gYy5zb3J0YWJsZSA6IHRydWVcIiBbZHJhZ2dhYmxlXT1cIihjLmRyYWdnYWJsZSkgPyBjLmRyYWdnYWJsZSA6IHRydWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbcmVzaXplYWJsZV09XCIoYy5yZXNpemVhYmxlKSA/IGMucmVzaXplYWJsZSA6IHRydWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgYyBvZiBjb2x1bW5zOyBpbmRleCBhcyBpO1wiPlxyXG4gICAgPG5nLXRlbXBsYXRlIGxldC1jb2x1bW49XCJjb2x1bW5cIiBuZ3gtZGF0YXRhYmxlLWhlYWRlci10ZW1wbGF0ZSAqbmdJZj1cImk9PTBcIj5cclxuICAgICAgPHN0cm9uZz57e2MuY29sdW1uTmFtZX19PC9zdHJvbmc+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPG5nLXRlbXBsYXRlIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZSBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiIGxldC12YWx1ZT1cInZhbHVlXCIgbGV0LXJvdz1cInJvd1wiICpuZ0lmPVwiaT09MFwiPlxyXG4gICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYy5pc0RhdGVDb2x1bW47IHRoZW4gdDEwXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjLmlzQ3VycmVuY3lDb2x1bW4gJiYgYy5jdXJyZW5jeVRleHQ7IHRoZW4gdDQwXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjLmlzQ3VycmVuY3lDb2x1bW4gJiYgIWMuY3VycmVuY3lUZXh0OyB0aGVuIHQ3MFwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWMuaXNEYXRlQ29sdW1uICYmICFjLmlzQ3VycmVuY3lDb2x1bW47IHRoZW4gdDcwXCI+PC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI3QxMD5cclxuICAgICAgICAgICAgICAgIHt7KGdldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSkgfCBkYXRlOidtZWRpdW0nKX19XHJcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdDQwPlxyXG4gICAgICAgICAgICAgICAge3soZ2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKSB8IGN1cnJlbmN5OmMuY3VycmVuY3lUZXh0Oidjb2RlJyl9fVxyXG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI3Q3MD5cclxuICAgICAgICAgICAgICAgIHt7Z2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKX19XHJcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgICA8bmctdGVtcGxhdGUgbGV0LWNvbHVtbj1cImNvbHVtblwiIG5neC1kYXRhdGFibGUtaGVhZGVyLXRlbXBsYXRlPlxyXG4gICAgICA8c3Ryb25nPnt7Yy5jb2x1bW5OYW1lfX08L3N0cm9uZz5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXZhbHVlPVwidmFsdWVcIiBsZXQtcm93PVwicm93XCI+XHJcbiAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjLmlzRGF0ZUNvbHVtbjsgdGhlbiB0MTBcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImMuaXNDdXJyZW5jeUNvbHVtbiAmJiBjLmN1cnJlbmN5VGV4dDsgdGhlbiB0NDBcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImMuaXNDdXJyZW5jeUNvbHVtbiAmJiAhYy5jdXJyZW5jeVRleHQ7IHRoZW4gdDcwXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhYy5pc0RhdGVDb2x1bW4gJiYgIWMuaXNDdXJyZW5jeUNvbHVtbjsgdGhlbiB0NzBcIj48L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdDEwPlxyXG4gICAgICAgICAgICAgICAge3soZ2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKSB8IGRhdGU6J21lZGl1bScpfX1cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICN0NDA+XHJcbiAgICAgICAgICAgICAgICB7eyhnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpIHwgY3VycmVuY3k6Yy5jdXJyZW5jeVRleHQ6J2NvZGUnKX19XHJcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdDcwPlxyXG4gICAgICAgICAgICAgICAge3tnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpfX1cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XHJcbiAgPG5neC1kYXRhdGFibGUtY29sdW1uIFtzdW1tYXJ5RnVuY109XCJzdW1tYXJ5RnVuY1wiIFtuYW1lXT1cIm1vcmVBY3Rpb25zLm5hbWVcIiAqbmdJZj1cIm1vcmVBY3Rpb25zXCIgW3NvcnRhYmxlXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2NhbkF1dG9SZXNpemVdPVwiZmFsc2VcIj5cclxuICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtdmFsdWU9XCJ2YWx1ZVwiIGxldC1yb3c9XCJyb3dcIj5cclxuICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBkcm9wZG93bi10b2dnbGVcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxyXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxyXG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtbGlzdC11bFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+XHJcbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBtb3JlQWN0aW9ucy5hY3Rpb25zXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiXHJcbiAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQWN0aW9uQ2xpY2soe2lkOiByb3dbbW9yZUFjdGlvbnMuaWRGaWVsZE5hbWVdLCBhY3Rpb25OYW1lOiBhY3Rpb24uYWN0aW9uTmFtZSwgYWN0aW9uUm93OiByb3d9KVwiPnt7YWN0aW9uLmFjdGlvbk5hbWV9fTwvYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XHJcbjwvbmd4LWRhdGF0YWJsZT5cclxuYCxcclxuICBzdHlsZXM6IFtgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1sa0RhdGF0YWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgdGFibGVSb3dIZWlnaHQgPSA1MDtcclxuICBASW5wdXQoKSB0YWJsZUZvb3RlckhlaWdodCA9IDUwO1xyXG4gIEBJbnB1dCgpIHRhYmxlSGVhZGVySGVpZ2h0ID0gNTA7XHJcbiAgQElucHV0KCkgdmVydGljYWxTY3JvbGxBY3RpdmUgPSBmYWxzZTtcclxuICBASW5wdXQoKSBob3Jpem9udGFsU2Nyb2xsQWN0aXZlID0gZmFsc2U7XHJcbiAgQElucHV0KCkgY29sdW1uczogQXJyYXk8TWxrRGF0YVRhYmxlQ29sdW1uPiA9IFtdO1xyXG4gIEBJbnB1dCgpIGVuYWJsZUNoZWNrYm94ID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZW5kcG9pbnQ6IHN0cmluZztcclxuICBASW5wdXQoKSBlbmFibGVGaWx0ZXJIZWFkZXIgPSBmYWxzZTtcclxuICBASW5wdXQoKSBlbmFibGVEZWZhdWx0VGFibGVIZWFkZXIgPSBmYWxzZTtcclxuICBASW5wdXQoKSBlbmFibGVTdW1tYXJ5ID0gZmFsc2U7XHJcbiAgQElucHV0KCkgc3VtbWFyeVBvc2l0aW9uID0gJ1xcJ2JvdHRvbVxcJyc7XHJcbiAgQElucHV0KCkgc3VtbWFyeUhlaWdodCA9ICdcXCdhdXRvXFwnJztcclxuICBASW5wdXQoKSBtb3JlQWN0aW9uczogTWxrTW9yZUFjdGlvbnM7XHJcbiAgQE91dHB1dCgpIG9uQWN0aW9uc0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxNbGtNb3JlQWN0aW9uRGF0YT4oKTtcclxuICBASW5wdXQoKSBmaWx0ZXJDb21wb25lbnRzOiBBcnJheTxNbGtEeW5hbWljQ29udHJvbDxhbnk+PiA9IFtdO1xyXG4gIEBJbnB1dCgpIHBhcmFtczogTWFwPHN0cmluZywgYW55PjtcclxuICBwYWdlOiBQYWdlPGFueT4gPSBuZXcgUGFnZSgpO1xyXG4gIHNlbGVjdGVkID0gW107XHJcbiAgQE91dHB1dCgpIG9uU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XHJcbiAgQFZpZXdDaGlsZChEYXRhdGFibGVDb21wb25lbnQpIHRhYmxlOiBEYXRhdGFibGVDb21wb25lbnQ7XHJcbiAgZmlsdGVyOiBPYmplY3QgPSB7fTtcclxuICBmaWx0ZXJGb3JtOiBGb3JtR3JvdXA7XHJcbiAgZW1wdHlTdW1tYXJ5RnVuYzogKCkgPT4gbnVsbDtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RlcndhcmRTZXJ2aWNlOiBTdGV3YXJkQ2xpZW50U2VydmljZTxSZXNwb25zZVdyYXBwZXI8UGFnZTxhbnk+PiwgYW55PiwgcHJpdmF0ZSBkYXRlUGlwZTogRGF0ZVBpcGUpIHtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlbmVyYXRlIGZvcm0gY29udHJvbCBmcm9tIGZpbHRlckNvbXBvbmVudHMgYW5kIGFsc28gYXBwZW5kaW5nIGRlZmF1bHQgY29udHJvbHMgaWUuIGRhdGUgZmlsdGVyIGFuZCBzZWFyY2ggY29udHJvbHNcclxuICAgKi9cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IGdyb3VwID0ge307XHJcbiAgICB0aGlzLmZpbHRlckNvbXBvbmVudHMuZm9yRWFjaChjb21wID0+IHtcclxuICAgICAgY29uc3QgdmFsaWRhdG9yczogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICBpZiAoY29tcC5pc1JlcXVpcmVkKSB7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIE1sa0lucHV0IHx8IGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBNbGtUZXh0YXJlYSkge1xyXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbkxlbmd0aChjb21wLmNvbnRyb2xUeXBlLm1pbkxlbmd0aCkpO1xyXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heExlbmd0aChjb21wLmNvbnRyb2xUeXBlLm1heExlbmd0aCkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIE1sa0lucHV0KSB7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4KGNvbXAuY29udHJvbFR5cGUubWF4KSk7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluKGNvbXAuY29udHJvbFR5cGUubWluKSk7XHJcbiAgICAgIH1cclxuICAgICAgZ3JvdXBbY29tcC5uYW1lXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgdmFsaWRhdG9ycyk7XHJcbiAgICB9KTtcclxuICAgIC8vIGFkZCBkZWZhdWx0IGNvbnRyb2xzXHJcbiAgICBncm91cFsnZnJvbSddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgzMCkpO1xyXG4gICAgZ3JvdXBbJ3RvJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDMwKSk7XHJcbiAgICBncm91cFsnbmVlZGxlJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDIwMCkpO1xyXG4gICAgdGhpcy5maWx0ZXJGb3JtID0gbmV3IEZvcm1Hcm91cChncm91cCk7XHJcbiAgICB0aGlzLmxvYWRQYWdlKHtvZmZzZXQ6IDAsIGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZX0sIG51bGwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBlbWl0IGNsaWNrIGV2ZW50IG9mIHRoZSBhY3Rpb25zXHJcbiAgICogQHBhcmFtIGV2ZW50XHJcbiAgICovXHJcbiAgb25BY3Rpb25DbGljayhldmVudDogTWxrTW9yZUFjdGlvbkRhdGEpIHtcclxuICAgIHRoaXMub25BY3Rpb25zRXZlbnQuZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcm9jZXNzIHNlcnZlciByZXF1ZXN0IG9mIGRhdGFibGVcclxuICAgKiBAcGFyYW0gcGFnZUluZm9cclxuICAgKiBAcGFyYW0gZmlsdGVyc1xyXG4gICAqL1xyXG4gIGxvYWRQYWdlKHBhZ2VJbmZvLCBmaWx0ZXJzKSB7XHJcbiAgICBpZiAoIXRoaXMuZW5kcG9pbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGV0IHJlcXVlc3Q6IE1hcDxzdHJpbmcsIGFueT47XHJcbiAgICBpZiAoZmlsdGVycykge1xyXG4gICAgICByZXF1ZXN0ID0gZmlsdGVycztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlcXVlc3QgPSBuZXcgTWFwKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wYXJhbXMpIHtcclxuICAgICAgdGhpcy5wYXJhbXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xyXG4gICAgICAgIHJlcXVlc3Quc2V0KGtleSwgdmFsdWUpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlcXVlc3Quc2V0KCdwYWdlJywgcGFnZUluZm8ub2Zmc2V0KTtcclxuICAgIHJlcXVlc3Quc2V0KCdzaXplJywgcGFnZUluZm8ubGltaXQpO1xyXG4gICAgdGhpcy5zdGVyd2FyZFNlcnZpY2UuZ2V0KHRoaXMuZW5kcG9pbnQsIHJlcXVlc3QpLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XHJcbiAgICAgIGlmIChyZXNwb25zZS5jb2RlID09PSAyMDApIHtcclxuICAgICAgICB0aGlzLnBhZ2UgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGhhbmRsZSBzZWxlY3Qgb3B0aW9uXHJcbiAgICogQHBhcmFtIGV2ZW50XHJcbiAgICovXHJcbiAgb25TZWxlY3Qoe3NlbGVjdGVkfSkge1xyXG4gICAgY29uc29sZS5sb2coJ1NlbGVjdCBFdmVudCcsIHNlbGVjdGVkLCB0aGlzLnNlbGVjdGVkKTtcclxuXHJcbiAgICB0aGlzLnNlbGVjdGVkLnNwbGljZSgwLCB0aGlzLnNlbGVjdGVkLmxlbmd0aCk7XHJcbiAgICB0aGlzLnNlbGVjdGVkLnB1c2goLi4uc2VsZWN0ZWQpO1xyXG4gICAgdGhpcy5vblNlbGVjdGVkLmVtaXQodGhpcy5zZWxlY3RlZCk7XHJcbiAgfVxyXG5cclxuICBvbkFjdGl2YXRlKGV2ZW50KSB7XHJcblxyXG4gIH1cclxuXHJcbiAgdXBkYXRlRmlsdGVyKGV2ZW50KSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBwcm9jZXNzIHRhYmxlIGZpbHRlci4gSWYgZGF0ZSBmaWx0ZXIgaXMgbm90IHByb3ZpZGUgdGhlIGZyb20gdmFsdWUgaXNcclxuICAgKiBzZXQgdG8gMjAxOC0wMS0wMSBhbmQgdG8gdmFsdWUgaXMgc2V0IHRvIDEgeWVhciBmcm9tIHRvZGF5XHJcbiAgICogQHBhcmFtIGZvcm1cclxuICAgKi9cclxuICBwcm9jZXNzRmlsdGVyKGZvcm0pIHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIGNvbnN0IGY6IE1hcDxTdHJpbmcsIGFueT4gPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKHRoaXMuZmlsdGVyRm9ybS52YWx1ZSkpO1xyXG4gICAgLy8gdmFsaWRhdGUgZGF0ZVxyXG4gICAgaWYgKCF0aGlzLmZpbHRlckZvcm0uZ2V0KCdmcm9tJykudG91Y2hlZCkgey8vIGlmIGZyb20gaXMgbm90IHBvcHVsYXRlZCByZW1vdmUgZnJvbSByZXF1ZXN0XHJcbiAgICAgIGYuZGVsZXRlKCdmcm9tJyk7XHJcbiAgICAgIC8vIHRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS5zZXRWYWx1ZSgnMjAxOC0wMS0wMScpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gZi5nZXQoJ2Zyb20nKS5zZXRWYWx1ZShuZXcgRGF0ZSh0aGlzLmZpbHRlckZvcm0uZ2V0KCdmcm9tJykudmFsdWUpKTtcclxuICAgICAgY29uc3QgZmQgPSBuZXcgRGF0ZSh0aGlzLmZpbHRlckZvcm0uZ2V0KCdmcm9tJykudmFsdWUpO1xyXG4gICAgICAvLyBmLnNldCgnZnJvbScsIGZkLnRvSVNPU3RyaW5nKCkpO1xyXG4gICAgICBmLnNldCgnZnJvbScsIHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKGZkLCAnZGQvTU0veXl5eScpKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5maWx0ZXJGb3JtLmdldCgndG8nKS50b3VjaGVkKSB7Ly8gaWYgdG8gaXMgbm90IHBvcHVsYXRlZCByZW1vdmUgZnJvbSByZXF1ZXN0XHJcbiAgICAgIGYuZGVsZXRlKCd0bycpO1xyXG4gICAgICAvLyBsZXQgdG9EYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgLy8gdG9EYXRlLnNldERhdGUodG9EYXRlLmdldEZ1bGxZZWFyKCkgKyAxKTtcclxuICAgICAgLy8gdGhpcy5maWx0ZXJGb3JtLmdldCgndG8nKS5zZXRWYWx1ZSh0aGlzLmdldEZvcm1hdHRlZERhdGUodG9EYXRlKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBmLmdldCgndG8nKS5zZXRWYWx1ZShuZXcgRGF0ZSh0aGlzLmZpbHRlckZvcm0uZ2V0KCd0bycpLnZhbHVlKSk7XHJcbiAgICAgIGNvbnN0IHRkID0gbmV3IERhdGUodGhpcy5maWx0ZXJGb3JtLmdldCgndG8nKS52YWx1ZSk7XHJcbiAgICAgIC8vIGYuc2V0KCd0bycsIHRkLnRvSVNPU3RyaW5nKCkpO1xyXG4gICAgICBmLnNldCgndG8nLCB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybSh0ZCwgJ2RkL01NL3l5eXknKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sb2FkUGFnZSh7b2Zmc2V0OiB0aGlzLnBhZ2UubnVtYmVyLCBsaW1pdDogdGhpcy5wYWdlLnNpemV9LCBmKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgaW5wdXRcclxuICAgKiBAcGFyYW0gY29udHJvbFxyXG4gICAqL1xyXG4gIGlzSW5wdXQoY29udHJvbDogYW55KSB7XHJcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIE1sa0lucHV0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyBzZWxlY3RcclxuICAgKiBAcGFyYW0gY29udHJvbFxyXG4gICAqL1xyXG4gIGlzU2VsZWN0KGNvbnRyb2w6IGFueSkge1xyXG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBNbGtTZWxlY3Q7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHRoaXMubmdPbkluaXQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgdGV4dGFyZWFcclxuICAgKi9cclxuICBpc1RleHRBcmVhKGNvbnRyb2w6IGFueSkge1xyXG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBNbGtUZXh0YXJlYTtcclxuICB9XHJcblxyXG4gIHN1bW1hcnlGdW5jKGNlbGw6IGFueSkge1xyXG4gICAgcmV0dXJuIChgYCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGZvcm1hdCBkYXRlIHRvIHN0cmluZyB5eXl5LU1NLWRkXHJcbiAgICogQHBhcmFtIGRhdGVcclxuICAgKi9cclxuICBnZXRGb3JtYXR0ZWREYXRlKGRhdGUpIHtcclxuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgbGV0IG1vbnRoID0gKDEgKyBkYXRlLmdldE1vbnRoKCkpLnRvU3RyaW5nKCk7XHJcbiAgICBtb250aCA9IG1vbnRoLmxlbmd0aCA+IDEgPyBtb250aCA6ICcwJyArIG1vbnRoO1xyXG5cclxuICAgIGxldCBkYXkgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgZGF5ID0gZGF5Lmxlbmd0aCA+IDEgPyBkYXkgOiAnMCcgKyBkYXk7XHJcblxyXG4gICAgcmV0dXJuIHllYXIgKyAnLScgKyBtb250aCArICctJyArIGRheTtcclxuICB9XHJcblxyXG4gIGdldEZpZWxkVmFsdWUoZGF0YTogT2JqZWN0LCBmaWVsZDogYW55KSB7XHJcbiAgICBjb25zdCBrOiBBcnJheTxzdHJpbmc+ID0gZmllbGQuc3BsaXQoJy4nKTtcclxuICAgIGNvbnN0IGtleXMgPSBuZXcgUXVldWU8c3RyaW5nPiguLi5rKTtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRPYmplY3RWYWx1ZShkYXRhLCBrZXlzKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gZmluZCBrZXkgdmFsdWUgYmFzZWQgb24gdGhlIGtleSBzZXF1ZW5jZSBwcm92aWRlZFxyXG4gICAqIEBwYXJhbSBkYXRhIGV4cGVjdHMgYW4gb2JqZWN0XHJcbiAgICogQHBhcmFtIGtleXMgaS5lLiB1c2VyLmdlbmRlci50eXBlLnR5cGVcclxuICAgKi9cclxuICBnZXRPYmplY3RWYWx1ZShkYXRhOiBhbnksIGtleXM6IFF1ZXVlPHN0cmluZz4pIHtcclxuICAgIGlmICgoIShkYXRhIGluc3RhbmNlb2YgT2JqZWN0KSkgfHwgKGtleXMubGVuZ3RoID09PSAxKSkge1xyXG4gICAgICByZXR1cm4gZGF0YVtrZXlzLnRhaWxdO1xyXG4gICAgfVxyXG4gICAgbGV0IHZhbHVlID0gbnVsbDtcclxuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICBpZiAoKGtleSA9PT0ga2V5cy5mcm9udCkgJiYgKGRhdGFba2V5XSBpbnN0YW5jZW9mIE9iamVjdCkpIHtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuZ2V0T2JqZWN0VmFsdWUoZGF0YVtrZXldLCBrZXlzKTtcclxuICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGtleXMudGFpbCkge1xyXG4gICAgICAgIHZhbHVlID0gZGF0YVtrZXldO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuXHJcbiAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFVzZWQgdG8gZGVmaW5lIGRhdGF0YWJsZSBjb2x1bW5zIHdpdGggYXR0cmlidXRlcyAoY29sdW1uTmFtZSwgZmllbGROYW1lLCB3aWR0aCwgc29ydGFibGUsIGNhbkF1dG9SZXNpemUsXHJcbiAqIGRyYWdnYWJsZSwgcmVzaXphYmxlLCBpc0RhdGVDb2x1bW4sIGlzQ3VycmVuY3lDb2x1bW4sIGN1cnJlbmN5VGV4dCwgc3VtbWFyeUZ1bmMpXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE1sa0RhdGFUYWJsZUNvbHVtbiB7XHJcbiAgLyoqXHJcbiAgICogY29sdW1uIHRpdGxlXHJcbiAgICovXHJcbiAgY29sdW1uTmFtZTogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIFNlcnZlciBzaWRlIHJlc3BvbnNlIGZpZWxkIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGNvbHVtbiBpLmUgZnVsbE5hbWUgbWF5IGNvcnJlc3BvbmQgdG8gTmFtZSBjb2x1bW5cclxuICAgKi9cclxuICBmaWVsZE5hbWU6IHN0cmluZztcclxuICAvKipcclxuICAgKiBXaWR0aCBvZiB0aGUgY29sdW1uXHJcbiAgICovXHJcbiAgd2lkdGg/OiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogRW5hYmxlIHNvcnRpbmcgaW4gYSBjb2x1bW5cclxuICAgKi9cclxuICBzb3J0YWJsZT86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogTWFrZXMgYSBjb2x1bW4gcmVzaXphYmxlXHJcbiAgICovXHJcbiAgY2FuQXV0b1Jlc2l6ZT86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogRW5hYmxlcyBhIGNvbHVtbiB0byBiZSBkcmFnZ2FibGVcclxuICAgKi9cclxuICBkcmFnZ2FibGU/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIE1ha2VzIGEgY29sdW1uIHJlc2l6YWJsZVxyXG4gICAqL1xyXG4gIHJlc2l6ZWFibGU/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gZW5hYmxlIGZvcm1hdGluZyB0aW1lc3RhbXAgdG8gc3RyaW5nIGRhdGVcclxuICAgKi9cclxuICBpc0RhdGVDb2x1bW4/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGVuYWJsZSBmb3JtYXRpbmcgc3RyaW5nIHRvIHN0cmluZyBjdXJyZW5jeVxyXG4gICAqL1xyXG4gIGlzQ3VycmVuY3lDb2x1bW4/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIHNldCB0aGUgY3VycmVuY3kgc3RyaW5nXHJcbiAgICovXHJcbiAgY3VycmVuY3lUZXh0Pzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB0byBjYWxsIGF0IHRoZSBzdW1tYXJ5IHJvd1xyXG4gICAqL1xyXG4gIHN1bW1hcnlGdW5jPzogKGFueTogYW55W10pID0+IGFueTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVzZWQgdG8gZGlzcGxheSBtb3JlIGFjdGlvbnMgY29sdW1uIGFuZCB0aGUgZW5kIG9mIHRoZSB0YWJsZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1sa01vcmVBY3Rpb25zIHtcclxuICAvKipcclxuICAgKiBBY3Rpb24gQ29sdW1uIG5hbWUgZS5nLiBNb3JlIEFjdGlvbnNcclxuICAgKi9cclxuICBuYW1lID0gJ0FjdGlvbnMnO1xyXG4gIC8qKlxyXG4gICAqIEZpZWxkIG5hbWUgaWQgZnJvbSB0aGUgc2VydmVyIHJlc3BvbnNlIGUuZyB1c2VySWRcclxuICAgKi9cclxuICBpZEZpZWxkTmFtZSA9ICdpZCc7XHJcbiAgLyoqXHJcbiAgICogQWN0aW9ucyBlLmcuIEVkaXQsIERlbGV0ZVxyXG4gICAqL1xyXG4gIGFjdGlvbnM6IEFycmF5PE1sa01vcmVBY3Rpb25EYXRhPjtcclxuXHJcbiAgY29uc3RydWN0b3IoYWN0aW9uczogQXJyYXk8TWxrTW9yZUFjdGlvbkRhdGE+LCBpZD86IHN0cmluZywgbmFtZT86IHN0cmluZykge1xyXG4gICAgdGhpcy5hY3Rpb25zID0gYWN0aW9ucztcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmlkRmllbGROYW1lID0gaWQ7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNbGtNb3JlQWN0aW9uRGF0YSB7XHJcbiAgLyoqXHJcbiAgICogTmV2ZXIgbWluZCB0aGlzIGZpZWxkIGl0IHdpbGwgYmUgdXNlZCBieSB0aGUgbGlicmFyeVxyXG4gICAqL1xyXG4gIGlkPzogYW55O1xyXG4gIC8qKlxyXG4gICAqIEFjdGlvbiBuYW1lIGUuZy4gRWRpdCwgRGVsZXRlXHJcbiAgICovXHJcbiAgYWN0aW9uTmFtZTogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBBY3Rpb24gcm93IDogdGhlIGNsaWNrZWQgcm93XHJcbiAgICovXHJcbiAgYWN0aW9uUm93PzogYW55O1xyXG59XHJcbiIsImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1N0ZXdhcmRDbGllbnRDb21wb25lbnR9IGZyb20gJy4vc3Rld2FyZC1jbGllbnQuY29tcG9uZW50JztcclxuaW1wb3J0IHtNbGtEYXRhdGFibGVDb21wb25lbnR9IGZyb20gJy4vbWxrLWRhdGF0YWJsZS9tbGstZGF0YXRhYmxlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlLCBEYXRlUGlwZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtOZ3hEYXRhdGFibGVNb2R1bGV9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcclxuaW1wb3J0IHtSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHtTdGV3YXJkQ29uZmlnfSBmcm9tICcuL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQge0JzRGF0ZXBpY2tlck1vZHVsZX0gZnJvbSAnbmd4LWJvb3RzdHJhcC9kYXRlcGlja2VyJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgTmd4RGF0YXRhYmxlTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgQnNEYXRlcGlja2VyTW9kdWxlLmZvclJvb3QoKSxcclxuICAgIEh0dHBDbGllbnRNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1N0ZXdhcmRDbGllbnRDb21wb25lbnQsIE1sa0RhdGF0YWJsZUNvbXBvbmVudF0sXHJcbiAgZXhwb3J0czogW1N0ZXdhcmRDbGllbnRDb21wb25lbnQsIE1sa0RhdGF0YWJsZUNvbXBvbmVudF0sXHJcbiAgcHJvdmlkZXJzOiBbRGF0ZVBpcGVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ2xpZW50TW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IFN0ZXdhcmRDb25maWcpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBTdGV3YXJkQ2xpZW50TW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFt7cHJvdmlkZTogU3Rld2FyZENvbmZpZywgdXNlVmFsdWU6IGNvbmZpZ31dXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7Ozs7OztJQUFBO0tBYUM7SUFBRCxzQkFBQztDQUFBOzs7Ozs7QUNoQkQ7SUFNQTtLQUlDO0lBQUQsb0JBQUM7Q0FBQSxJQUFBOzs7O0FBRUQ7SUFPRSw4QkFBb0IsSUFBZ0IsRUFBVSxNQUFxQjtRQUEvQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUZuRSxhQUFRLEdBQUcsR0FBRyxDQUFDO1FBR2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDL0I7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUM7Z0JBQzdCLGNBQWMsRUFBRSxpQ0FBaUM7Z0JBQ2pELGVBQWUsRUFBRSxTQUFTLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7YUFDbEUsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN0RjtLQUNGOzs7Ozs7Ozs7O0lBS0QsbUNBQUk7Ozs7OztJQUFKLFVBQUssUUFBZ0IsRUFBRSxJQUFPO1FBQzVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsaUNBQWlDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUMzSixVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBTyxDQUFDLENBQ3BDLENBQUM7S0FDSDs7Ozs7Ozs7OztJQUtELGtDQUFHOzs7Ozs7SUFBSCxVQUFJLFFBQWdCLEVBQUUsSUFBTztRQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGlDQUFpQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FDMUosVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQU8sQ0FBQyxDQUNwQyxDQUFDO0tBQ0g7Ozs7OztJQUVELHFDQUFNOzs7OztJQUFOLFVBQU8sUUFBZ0IsRUFBRSxJQUFPO1FBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxFQUFFO1lBQzNELE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsaUNBQWlDLENBQUM7WUFDL0UsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1NBQzNCLENBQUMsQ0FBQyxJQUFJLENBQ0wsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQU8sQ0FBQyxDQUNwQyxDQUFDO0tBQ0g7Ozs7OztJQUVELGtDQUFHOzs7OztJQUFILFVBQUksUUFBZ0IsRUFBRSxJQUEwQjs7WUFDeEMsT0FBTyxHQUFHO1lBQ2QsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztTQUNqQztRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUMxRCxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBTyxDQUFDLENBQ3BDLENBQUM7S0FDSDs7Ozs7Ozs7Ozs7Ozs7SUFRRCwyQ0FBWTs7Ozs7OztJQUFaLFVBQWEsUUFBZ0IsRUFBRSxJQUFPLEVBQUUsT0FBcUI7O1lBQ3JELFFBQVEsR0FBYSxJQUFJLFFBQVEsRUFBRTtRQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDNUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDakMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ25ELE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3hCO2FBQU0sSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNuQixPQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztTQUM3QjtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUMsSUFBSSxDQUNoRixVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBTyxDQUFDLENBQ3BDLENBQUM7S0FDSDs7Ozs7O0lBRUQsb0RBQXFCOzs7OztJQUFyQixVQUFzQixRQUFnQixFQUFFLElBQU87O1lBQ3ZDLFFBQVEsR0FBYSxJQUFJLFFBQVEsRUFBRTtRQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDNUIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRTtvQkFDbEIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQzFCLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQzdKLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFPLENBQUMsQ0FDcEMsQ0FBQztLQUNIOzs7Ozs7SUFFTyw0Q0FBYTs7Ozs7SUFBckIsVUFBc0IsSUFBeUI7UUFDN0MsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxVQUFVLEVBQUUsQ0FBQztTQUN6Qjs7WUFDRyxVQUFVLEdBQWUsSUFBSSxVQUFVLEVBQUU7UUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQWEsRUFBRSxHQUFXO1lBQ3RDLFVBQVUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM1QyxDQUFDLENBQUM7UUFDSCxPQUFPLFVBQVUsQ0FBQztLQUNuQjs7Ozs7Ozs7Ozs7O0lBTU8sMENBQVc7Ozs7Ozs7SUFBbkI7UUFDRSxPQUFPLFVBQUMsS0FBd0I7O2dCQUN4QixHQUFHLEdBQUcsSUFBSSxlQUFlLEVBQUU7O1lBRWpDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztnQkFDeEIsR0FBRyxDQUFDLE9BQU8sR0FBRyw0REFBNEQsQ0FBQzthQUM1RTtpQkFBTTtnQkFDTCxHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQ3hCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7Z0JBQ2xDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDN0I7WUFDRCxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNoQixDQUFDO0tBQ0g7Ozs7Ozs7OztJQUtNLCtCQUFVOzs7OztJQUFqQixVQUFrQixFQUFPO1FBQ3ZCLE9BQU8sNkNBQTZDLEdBQUcsRUFBRSxHQUFHLHdHQUF3RyxDQUFDO0tBQ3RLOzs7Ozs7SUFFTSwrQ0FBZ0I7Ozs7O0lBQXZCLFVBQXdCLFFBQWdCLEVBQUUsSUFBMEI7O1lBQzVELE9BQU8sR0FBRztZQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7U0FDakM7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDMUQsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQU8sQ0FBQyxDQUNwQyxDQUFDO0tBQ0g7O2dCQTlJRixVQUFVOzs7Z0JBWEgsVUFBVTtnQkFrQnNDLGFBQWE7O0lBd0lyRSwyQkFBQztDQUFBOzs7Ozs7QUMzSkQ7SUFhRTtLQUFpQjs7OztJQUVqQix5Q0FBUTs7O0lBQVI7S0FDQzs7Z0JBZEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxzREFJVDtvQkFDRCxNQUFNLEVBQUUsRUFBRTtpQkFDWDs7O0lBUUQsNkJBQUM7Q0FBQTs7Ozs7Ozs7OztBQ2ZEOzs7Ozs7OztJQUFBOzs7O1FBSUksU0FBSSxHQUFXLEVBQUUsQ0FBQzs7OztRQUlsQixrQkFBYSxHQUFXLENBQUMsQ0FBQzs7OztRQUkxQixlQUFVLEdBQVcsQ0FBQyxDQUFDOzs7O1FBSXZCLFVBQUssR0FBWSxJQUFJLENBQUM7Ozs7UUFJdEIsU0FBSSxHQUFZLEtBQUssQ0FBQzs7OztRQUl0QixZQUFPLEdBQWEsRUFBRSxDQUFDOzs7O1FBSXZCLFdBQU0sR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDOzs7O1FBSTFCLFdBQU0sR0FBVyxDQUFDLENBQUM7S0FDdEI7SUFBRCxXQUFDO0NBQUEsSUFBQTs7OztBQUlEOzs7Ozs7O0lBQUE7UUFDSSxXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGFBQVEsR0FBWSxJQUFJLENBQUM7S0FDNUI7SUFBRCxXQUFDO0NBQUE7Ozs7Ozs7Ozs7QUN4Q0Q7Ozs7O0lBMEJJLDJCQUFZLEtBQWEsRUFBRSxJQUFZLEVBQUUsV0FBYyxFQUFFLElBQWtDLEVBQ3ZGLFVBQTBCLEVBQUUsV0FBMEI7UUFERCxxQkFBQSxFQUFBLDBCQUFrQztRQUN2RiwyQkFBQSxFQUFBLGlCQUEwQjtRQUFFLDRCQUFBLEVBQUEsa0JBQTBCOzs7O1FBSDFELGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBSXJCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxHQUFHLFdBQVcsR0FBRyxLQUFLLENBQUM7S0FDeEQ7SUFFTCx3QkFBQztDQUFBLElBQUE7Ozs7O0FBS0Q7Ozs7O0lBc0JJLGtCQUFZLElBQXFCO1FBQXJCLHFCQUFBLEVBQUEsYUFBcUI7Ozs7UUFsQmpDLFNBQUksR0FBVyxNQUFNLENBQUM7UUFtQmxCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUM7S0FDekI7SUFDTCxlQUFDO0NBQUEsSUFBQTs7OztBQUtEOzs7O0lBa0JJLHFCQUFZLElBQWdCLEVBQUUsSUFBZ0I7UUFBbEMscUJBQUEsRUFBQSxRQUFnQjtRQUFFLHFCQUFBLEVBQUEsUUFBZ0I7UUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUE7S0FDckI7SUFDTCxrQkFBQztDQUFBLElBQUE7Ozs7QUFLRDs7OztJQU1JLG1CQUFZLE9BQStCO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0tBQzFCO0lBRUwsZ0JBQUM7Q0FBQSxJQUFBOztJQVlHLHlCQUFZLEtBQWEsRUFBRSxJQUFtQjtRQUFuQixxQkFBQSxFQUFBLFdBQW1CO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7S0FDbkM7SUFFTCxzQkFBQztDQUFBOzs7Ozs7O0FDekhEO0lBOFJFLCtCQUFvQixlQUFzRSxFQUFVLFFBQWtCO1FBQWxHLG9CQUFlLEdBQWYsZUFBZSxDQUF1RDtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUExQjdHLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUN2QixzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDdkIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLDJCQUFzQixHQUFHLEtBQUssQ0FBQztRQUMvQixZQUFPLEdBQThCLEVBQUUsQ0FBQztRQUN4QyxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUV2Qix1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDM0IsNkJBQXdCLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLG9CQUFlLEdBQUcsWUFBWSxDQUFDO1FBQy9CLGtCQUFhLEdBQUcsVUFBVSxDQUFDO1FBRTFCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFDeEQscUJBQWdCLEdBQWtDLEVBQUUsQ0FBQztRQUU5RCxTQUFJLEdBQWMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUM3QixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ0osZUFBVSxHQUFHLElBQUksWUFBWSxFQUFjLENBQUM7UUFFdEQsV0FBTSxHQUFXLEVBQUUsQ0FBQztLQU1uQjs7Ozs7Ozs7SUFLRCx3Q0FBUTs7OztJQUFSOztZQUNRLEtBQUssR0FBRyxFQUFFO1FBQ2hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJOztnQkFDMUIsVUFBVSxHQUFlLEVBQUU7WUFDakMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNuQixVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN0QztZQUVELElBQUksSUFBSSxDQUFDLFdBQVcsWUFBWSxRQUFRLElBQUksSUFBSSxDQUFDLFdBQVcsWUFBWSxXQUFXLEVBQUU7Z0JBQ25GLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDbkU7WUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLFlBQVksUUFBUSxFQUFFO2dCQUN4QyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3ZEO1lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDcEQsQ0FBQyxDQUFDOztRQUVILEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVELEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDekQ7Ozs7Ozs7Ozs7SUFNRCw2Q0FBYTs7Ozs7SUFBYixVQUFjLEtBQXdCO1FBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pDOzs7Ozs7Ozs7Ozs7SUFPRCx3Q0FBUTs7Ozs7O0lBQVIsVUFBUyxRQUFRLEVBQUUsT0FBTztRQUExQixpQkF1QkM7UUF0QkMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsT0FBTztTQUNSOztZQUNHLE9BQXlCO1FBQzdCLElBQUksT0FBTyxFQUFFO1lBQ1gsT0FBTyxHQUFHLE9BQU8sQ0FBQztTQUNuQjthQUFNO1lBQ0wsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7U0FDckI7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHO2dCQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN6QixDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxRQUFRO1lBQ2pFLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUU7Z0JBQ3pCLEtBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQzthQUMzQjtTQUNGLENBQUMsQ0FBQztLQUVKOzs7Ozs7Ozs7O0lBTUQsd0NBQVE7Ozs7O0lBQVIsVUFBUyxFQUFVO1lBQVQsc0JBQVE7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxDQUFBLEtBQUEsSUFBSSxDQUFDLFFBQVEsRUFBQyxJQUFJLG9CQUFJLFFBQVEsR0FBRTtRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O0tBQ3JDOzs7OztJQUVELDBDQUFVOzs7O0lBQVYsVUFBVyxLQUFLO0tBRWY7Ozs7O0lBRUQsNENBQVk7Ozs7SUFBWixVQUFhLEtBQUs7S0FFakI7Ozs7Ozs7Ozs7OztJQU9ELDZDQUFhOzs7Ozs7SUFBYixVQUFjLElBQUk7OztZQUVWLENBQUMsR0FBcUIsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUUxRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ3hDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7O1NBRWxCO2FBQU07OztnQkFFQyxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDOztZQUV0RCxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUMxRDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7WUFDdEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OztTQUloQjthQUFNOzs7Z0JBRUMsRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQzs7WUFFcEQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7U0FDeEQ7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3JFOzs7Ozs7Ozs7O0lBTUQsdUNBQU87Ozs7O0lBQVAsVUFBUSxPQUFZO1FBQ2xCLE9BQU8sT0FBTyxZQUFZLFFBQVEsQ0FBQztLQUNwQzs7Ozs7Ozs7OztJQU1ELHdDQUFROzs7OztJQUFSLFVBQVMsT0FBWTtRQUNuQixPQUFPLE9BQU8sWUFBWSxTQUFTLENBQUM7S0FDckM7Ozs7SUFFRCxxQ0FBSzs7O0lBQUw7UUFDRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDakI7Ozs7Ozs7OztJQUtELDBDQUFVOzs7OztJQUFWLFVBQVcsT0FBWTtRQUNyQixPQUFPLE9BQU8sWUFBWSxXQUFXLENBQUM7S0FDdkM7Ozs7O0lBRUQsMkNBQVc7Ozs7SUFBWCxVQUFZLElBQVM7UUFDbkIsUUFBUSxFQUFFLEVBQUU7S0FDYjs7Ozs7Ozs7OztJQU1ELGdEQUFnQjs7Ozs7SUFBaEIsVUFBaUIsSUFBSTs7WUFDYixJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTs7WUFFM0IsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUU7UUFDNUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDOztZQUUzQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNuQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFFdkMsT0FBTyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0tBQ3ZDOzs7Ozs7SUFFRCw2Q0FBYTs7Ozs7SUFBYixVQUFjLElBQVksRUFBRSxLQUFVOztZQUM5QixDQUFDLEdBQWtCLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOztZQUNuQyxJQUFJLFFBQU8sS0FBSyxZQUFMLEtBQUsscUJBQVksQ0FBQyxLQUFDOztZQUM5QixLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1FBQzdDLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7Ozs7Ozs7Ozs7OztJQU9ELDhDQUFjOzs7Ozs7SUFBZCxVQUFlLElBQVMsRUFBRSxJQUFtQjtRQUE3QyxpQkFjQztRQWJDLElBQUksQ0FBQyxFQUFFLElBQUksWUFBWSxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3RELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4Qjs7WUFDRyxLQUFLLEdBQUcsSUFBSTtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDNUIsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsS0FBSyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxNQUFNLENBQUMsRUFBRTtnQkFDekQsS0FBSyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzlDO2lCQUFNLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQzVCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbkI7U0FDRixDQUFDLENBQUM7UUFDSCxPQUFPLEtBQUssQ0FBQztLQUVkOztnQkFuZUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxxallBOFBYO29CQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDYjs7O2dCQXpRTyxvQkFBb0I7Z0JBR3BCLFFBQVE7OztpQ0F3UWIsS0FBSztvQ0FDTCxLQUFLO29DQUNMLEtBQUs7dUNBQ0wsS0FBSzt5Q0FDTCxLQUFLOzBCQUNMLEtBQUs7aUNBQ0wsS0FBSzsyQkFDTCxLQUFLO3FDQUNMLEtBQUs7MkNBQ0wsS0FBSztnQ0FDTCxLQUFLO2tDQUNMLEtBQUs7Z0NBQ0wsS0FBSzs4QkFDTCxLQUFLO2lDQUNMLE1BQU07bUNBQ04sS0FBSzt5QkFDTCxLQUFLOzZCQUdMLE1BQU07d0JBQ04sU0FBUyxTQUFDLGtCQUFrQjs7SUE2TS9CLDRCQUFDO0NBQUEsSUFBQTs7OztBQTJERDs7OztJQWNFLHdCQUFZLE9BQWlDLEVBQUUsRUFBVyxFQUFFLElBQWE7Ozs7UUFWekUsU0FBSSxHQUFHLFNBQVMsQ0FBQzs7OztRQUlqQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQU9qQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztLQUN2QjtJQUVILHFCQUFDO0NBQUE7Ozs7OztBQ2hrQkQ7SUFVQTtLQW9CQzs7Ozs7SUFOUSwyQkFBTzs7OztJQUFkLFVBQWUsTUFBcUI7UUFDbEMsT0FBTztZQUNMLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUMsQ0FBQztTQUN4RCxDQUFDO0tBQ0g7O2dCQW5CRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixrQkFBa0I7d0JBQ2xCLFlBQVk7d0JBQ1osa0JBQWtCLENBQUMsT0FBTyxFQUFFO3dCQUM1QixnQkFBZ0I7cUJBQ2pCO29CQUNELFlBQVksRUFBRSxDQUFDLHNCQUFzQixFQUFFLHFCQUFxQixDQUFDO29CQUM3RCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxxQkFBcUIsQ0FBQztvQkFDeEQsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO2lCQUN0Qjs7SUFRRCwwQkFBQztDQUFBOzs7Ozs7Ozs7Ozs7OzsifQ==