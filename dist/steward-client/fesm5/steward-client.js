import { Injectable, Component, EventEmitter, Input, Output, ViewChild, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { __spread } from 'tslib';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatatableComponent, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Queue } from 'queue-typescript';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            this.headers = this.headers.append('Authorization', "Bearer " + config.access_token);
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
        return this.http.post(this.base_url + endpoint, JSON.stringify(data), { headers: this.headers }).pipe(catchError(this.handleError()));
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
        return this.http.put(this.base_url + endpoint, JSON.stringify(data), { headers: this.headers }).pipe(catchError(this.handleError()));
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
        return this.http.request('delete', this.base_url + endpoint, { headers: this.headers, body: JSON.stringify(data) }).pipe(catchError(this.handleError()));
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
     * @param {?} endpoint
     * @param {?=} data
     * @return {?}
     */
    StewardClientService.prototype.getFile = /**
     * @param {?} endpoint
     * @param {?=} data
     * @return {?}
     */
    function (endpoint, data) {
        /** @type {?} */
        var options = {
            params: this.getHttpParams(data)
        };
        return this.http.get(this.base_url + endpoint + '?access_token=' + this.token, options).pipe(catchError(this.handleError()));
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
        if (this.headers.get("Authorization") && (!headers)) {
            headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
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
        return this.http.post(this.base_url + endpoint, formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(catchError(this.handleError()));
    };
    /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    StewardClientService.prototype.putFormDataMultiPart = /**
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
        return this.http.put(this.base_url + endpoint, formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(catchError(this.handleError()));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    StewardClientService.prototype.getHttpParams = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (data == undefined) {
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
     * @template ResponseWrapper
     * @return {?}
     */
    StewardClientService.prototype.handleError = /**
     * Used to catch exception thrown by http client returns internal server error
     * if status 500 is encountered
     * @template ResponseWrapper
     * @return {?}
     */
    function () {
        return function (error) {
            /** @type {?} */
            var res = new ResponseWrapper();
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
//const { Queue } = require('queue-typescript');
var MlkDatatableComponent = /** @class */ (function () {
    function MlkDatatableComponent(sterwardService) {
        this.sterwardService = sterwardService;
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
        this.summaryPosition = "'bottom'";
        this.summaryHeight = "'auto'";
        this.onActionsEvent = new EventEmitter();
        this.filterComponents = [];
        this.page = new Page();
        this.selected = [];
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
        //add default controls
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
        request.set("page", pageInfo.offset);
        request.set("size", pageInfo.limit);
        this.sterwardService.get(this.endpoint, request).subscribe(function (response) {
            if (response.code == 200) {
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
     * @param {?} event
     * @return {?}
     */
    MlkDatatableComponent.prototype.onSelect = /**
     * Used to handle select option
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
        //@ts-ignore
        /** @type {?} */
        var f = new Map(Object.entries(this.filterForm.value));
        //validate date 
        if (!this.filterForm.get('from').touched) {
            f.delete('from');
            // this.filterForm.get('from').setValue('2018-01-01');
        }
        else {
            //f.get('from').setValue(new Date(this.filterForm.get('from').value));
            /** @type {?} */
            var fd = new Date(this.filterForm.get('from').value);
            f.set('from', fd.toISOString());
        }
        if (!this.filterForm.get('to').touched) {
            f.delete('to');
            // let toDate = new Date();
            // toDate.setDate(toDate.getFullYear() + 1);
            // this.filterForm.get('to').setValue(this.getFormattedDate(toDate));
        }
        else {
            //f.get('to').setValue(new Date(this.filterForm.get('to').value));
            /** @type {?} */
            var td = new Date(this.filterForm.get('to').value);
            f.set('to', td.toISOString());
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
        var k = field.split(".");
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
        if ((!(data instanceof Object)) || (keys.length == 1)) {
            return data[keys.tail];
        }
        /** @type {?} */
        var value = null;
        Object.keys(data).forEach(function (key) {
            if ((key == keys.front) && (data[key] instanceof Object)) {
                value = _this.getObjectValue(data[key], keys);
            }
            else if (key == keys.tail) {
                value = data[key];
            }
        });
        return value;
    };
    MlkDatatableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'stw-mlk-datatable',
                    template: "<div class=\"card card-outline-default\" *ngIf=\"enableFilterHeader\">\n<div class=\"card-body\">\n<form (ngSubmit)=\"processFilter(filterForm)\" [formGroup]=\"filterForm\">\n\n<div class=\"row\">\n          <div class=\"col-md-3  mb-3\" *ngFor=\"let control of filterComponents\">\n            <label for=\"from\">{{control.label}}: </label>\n            <div class=\"input-group\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text  form-icon-default\">\n                  <i [class]=\"control.icon\"></i>\n                </span>\n              </div>\n  \n              <select *ngIf=\"isSelect(control.controlType)\" class=\"form-control form-control-sm checking-field\" [formControlName]=\"control.name\">\n                <option value=\"\" disabled selected>{{control.placeholder}}</option>\n                <option *ngFor=\"let o of control.controlType.options\">{{o.text}}</option>\n              </select>\n  \n              <textarea *ngIf=\"isTextArea(control.controlType)\" [cols]=\"control.controlType.cols\" [rows]=\"control.controlType.rows\" class=\"form-control form-control-sm checking-field\"\n                [placeholder]=\"control.placeholder\" [formControlName]=\"control.name\"></textarea>\n  \n              <input *ngIf=\"isInput(control.controlType)\" [type]=\"control.controlType.type\" [placeholder]=\"control.placeholder\" class=\"form-control form-control-sm checking-field\"\n                [formControlName]=\"control.name\" />\n            </div>\n            <span class=\"help-block\" *ngIf=\"filterForm.get(control.name).touched\">\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}} is required</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of {{control.controlType.minLength}} characters</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of {{control.controlType.maxLength}} characters</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('min')\">Should be greater than {{control.controlType.min}}</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('max')\">Should be less than {{control.controlType.max}}</span>\n            </span>\n          </div>\n</div>\n\n<div class=\"row\" *ngIf=\"enableDefaultTableHeader\">\n          <div class=\"col-md-3 mb-3\">\n            <label for=\"from\">From: </label>\n            <div class=\"input-group\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-calendar-o\"></i>\n                </span>\n              </div>\n                <input \n                type=\"text\" \n                class=\"form-control form-control-sm checking-field\" \n                id=\"inputTravelDate\" \n                formControlName=\"from\" \n                placeholder=\"From...\"\n                #dpfrom=\"bsDatepicker\"\n                bsDatepicker\n                [outsideClick]=\"false\"\n                [bsConfig]=\"{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }\"\n                maxlength=\"30\"\n                required\n                readonly\n                />\n                  <div class=\"input-group-append\">\n                    <button class=\"btn btn-primary\" type=\"button\" (click)=\"dpfrom.toggle()\" [attr.aria-expanded]=\"dpfrom.isOpen\"><i class=\"fa fa-th\"></i></button>\n                  </div>\n            </div>\n            <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n                <span class=\"text-danger\" *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 30 characters</span>\n            </span>\n          </div>\n          <div class=\"col-md-3 mb-3\">\n            <label for=\"from\">To: </label>\n            <div class=\"input-group\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-calendar-o\"></i>\n                </span>\n              </div>\n                <input \n                type=\"text\" \n                class=\"form-control form-control-sm checking-field\" \n                id=\"inputTravelDate\" \n                formControlName=\"to\" \n                placeholder=\"To...\"\n                #dpto=\"bsDatepicker\"\n                bsDatepicker\n                [outsideClick]=\"false\"\n                [bsConfig]=\"{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }\"\n                maxlength=\"30\"\n                required\n                readonly\n                />\n                  <div class=\"input-group-append\">\n                    <button class=\"btn btn-primary\" type=\"button\" (click)=\"dpto.toggle()\" [attr.aria-expanded]=\"dpto.isOpen\"><i class=\"fa fa-th\"></i></button>\n                  </div>  \n            </div>\n            <span class=\"help-block\" *ngIf=\"filterForm.get('to').touched\">\n                <span class=\"text-danger\" *ngIf=\"filterForm.get('to').hasError('maxlength')\">Maximum of 30 characters</span>\n            </span>\n          </div>\n          <div class=\"col-md-3 mb-3\">\n            <label for=\"search\">Search:</label>\n            <div class=\"input-group\">\n              <div class=\"input-group-prepend\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-search\"></i>\n                </span>\n              </div>\n              <input formControlName=\"needle\" class=\"form-control form-control-sm checking-field\" type=\"text\"\n                placeholder=\"Search...\" (keyup)=\"updateFilter($event)\" />\n            </div>\n          </div>\n          <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n              <span class=\"text-danger\" *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 200 characters</span>\n          </span>\n</div>\n\n<div class=\"row\">\n\t<div class=\"col-md-12\">\n            <div class=\"pull-right inline-buttons\">\n              <button class=\"btn btn-warning btn-sm\" type=\"reset\">\n                <i class=\"fa fa-repeat\" aria-hidden=\"true\"></i>\n                Reset\n              </button>\n              <button class=\"btn btn-success btn-sm pull-right\" type=\"submit\">\n                <i class=\"fa fa-filter\" aria-hidden=\"true\"></i>\n                Filter\n              </button>\n            </div>\n\t</div>\n</div>\n      \n</form>\n</div>\n</div>\n  \n  <ngx-datatable \n    #table \n    [rowHeight]=\"tableRowHeight\"\n    [footerHeight]=\"tableFooterHeight\"\n    [headerHeight]=\"tableHeaderHeight\" \n    [scrollbarV]=\"verticalScrollActive\"\n    [scrollbarH]=\"horizontalScrollActive\"\n    [summaryRow]=\"enableSummary\"\n    [summaryPosition]=\"summaryPosition\"\n    [summaryHeight]=\"summaryHeight\"\n    class=\"bootstrap\"    \n    [columnMode]=\"'force'\"\n    [rows]=\"page.content\" \n    [selected]=\"selected\" \n    [selectionType]=\"'checkbox'\" \n    (activate)=\"onActivate($event)\" \n    (select)='onSelect($event)'\n    [count]=\"page.totalElements\" \n    [offset]=\"page.number\" \n    [externalPaging]=\"true\" \n    [limit]=\"page.size\" \n    (page)=\"loadPage($event, null)\">\n    <ngx-datatable-column [summaryFunc]=\"summaryFunc\" [width]=\"30\" [sortable]=\"false\" [canAutoResize]=\"false\" [draggable]=\"true\" [resizeable]=\"false\" [headerCheckboxable]=\"true\"\n      [checkboxable]=\"true\" *ngIf=\"enableCheckbox\">\n    </ngx-datatable-column>\n    <ngx-datatable-column [summaryFunc]=\"(c.summaryFunc) ? c.summaryFunc : summaryFunc\" [canAutoResize]=\"(c.canAutoResize) ? c.canAutoResize : true\" [name]=\"c.columnName\" [width]=\"c.width\"\n      [sortable]=\"(c.sortable) ? c.sortable : true\" [draggable]=\"(c.draggable) ? c.draggable : true\" [resizeable]=\"(c.resizeable) ? c.resizeable : true\"\n      *ngFor=\"let c of columns\">\n      <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <strong>{{c.columnName}}</strong>\n      </ng-template>\n      <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n        <span>\n            <!--{{(c.isDateColumn)?(getFieldValue(row, c.fieldName) | date:'medium') : getFieldValue(row, c.fieldName)}} -->\n            <!--{{\n              if(c.isDateColumn)\n              { \n                (getFieldValue(row, c.fieldName) | date:'medium') \n              }\n              else if(c.isCurrencyColumn)\n              { \n                (getFieldValue(row, c.fieldName) | currency:'c.currencyText') \n              }\n              else \n              {\n                getFieldValue(row, c.fieldName)\n              }\n            }}-->\n            <!--<div [ngSwitch]=\"c.isDateColumn\">\n              <div *ngSwitchCase=\"true\">{{(getFieldValue(row, c.fieldName) | date:'medium')}}</div>\n              <div *ngSwitchDefault></div>\n            </div>\n            <div [ngSwitch]=\"c.isCurrencyColumn\">\n              <div *ngSwitchCase=\"true\">{{(getFieldValue(row, c.fieldName) | currency:'c.currencyText')}}</div>\n              <div *ngSwitchDefault></div>\n            </div> -->\n            <ng-container *ngIf=\"c.isDateColumn; then t10\"></ng-container>\n            <ng-container *ngIf=\"c.isCurrencyColumn && c.currencyText; then t40\"></ng-container>\n            <ng-container *ngIf=\"!c.isDateColumn && !c.isCurrencyColumn; then t70\"></ng-container>\n\n            <ng-template #t10>\n                {{(getFieldValue(row, c.fieldName) | date:'medium')}}\n            </ng-template>\n            <ng-template #t40>\n                {{(getFieldValue(row, c.fieldName) | currency:'c.currencyText')}}\n            </ng-template>\n            <ng-template #t70>\n                {{getFieldValue(row, c.fieldName)}}\n            </ng-template>\n        </span>\n      </ng-template>\n    </ngx-datatable-column>\n    <ngx-datatable-column [summaryFunc]=\"summaryFunc\" [name]=\"moreActions.name\" *ngIf=\"moreActions\" [sortable]=\"false\" [canAutoResize]=\"false\">\n      <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n        <span>\n          <div class=\"input-group-prepend\">\n            <button class=\"btn btn-sm btn-outline-secondary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\n              aria-expanded=\"false\">\n              <i class=\"fa fa-list-ul\" aria-hidden=\"true\"></i>\n            </button>\n            <div class=\"dropdown-menu\">\n              <a class=\"dropdown-item\" *ngFor=\"let action of moreActions.actions\" href=\"javascript:;\" (click)=\"onActionClick({id: row[moreActions.idFieldName], actionName: action.actionName, actionRow: row})\">{{action.actionName}}</a>\n              <!-- <a class=\"dropdown-item\" href=\"#\">Another action</a>\n                            <a class=\"dropdown-item\" href=\"#\">Something else here</a>\n                            <div role=\"separator\" class=\"dropdown-divider\"></div>\n                            <a class=\"dropdown-item\" href=\"#\">Separated link</a> -->\n            </div>\n          </div>\n        </span>\n      </ng-template>\n    </ngx-datatable-column>\n    <!-- <ngx-datatable-column name=\"Description\">\n              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n                <span>\n                  {{value}}\n                </span>\n              </ng-template>\n            </ngx-datatable-column>\n            <ngx-datatable-column name=\"Actions\">\n              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n                <span>\n                  {{value}}\n                </span>\n              </ng-template>\n            </ngx-datatable-column> -->\n  </ngx-datatable>\n",
                    styles: [""]
                },] },
    ];
    MlkDatatableComponent.ctorParameters = function () { return [
        { type: StewardClientService }
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
        this.name = "Actions";
        /**
         * Field name id from the server response e.g userId
         */
        this.idFieldName = "id";
        this.actions = actions;
        this.name = name;
        this.idFieldName = id;
    }
    return MlkMoreActions;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                    exports: [StewardClientComponent, MlkDatatableComponent]
                },] },
    ];
    return StewardClientModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { StewardConfig, StewardClientService, StewardClientComponent, MlkDatatableComponent, MlkMoreActions, StewardClientModule, MlkDynamicControl, MlkInput, MlkTextarea, MlkSelect, MlkSelectOption, Page, Sort, ResponseWrapper };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQuanMubWFwIiwic291cmNlcyI6WyJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy93cmFwcGVycy9yZXNwb25zZS13cmFwcGVyLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvc3Rld2FyZC1jbGllbnQuc2VydmljZS50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50LmNvbXBvbmVudC50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy93cmFwcGVycy9tbGstZHluYW1pYy1jb250cm9sLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvbWxrLWRhdGF0YWJsZS9tbGstZGF0YXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFdyYXBzIHNlcnZlciByZXNwb25zZVxuICovXG5leHBvcnQgY2xhc3MgUmVzcG9uc2VXcmFwcGVyPFQ+IHtcbiAgICAvKipcbiAgICAgKiBIdHRwIHN0YXR1cyBjb2RlIGUuZy4gMjAwXG4gICAgICovXG4gICAgY29kZTogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNlcnZlciBtZXNzYWdlXG4gICAgICovXG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEFjdHVhbCByZXNwb25zZSBkYXRhXG4gICAgICovXG4gICAgZGF0YTogVDtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFJlc3BvbnNlV3JhcHBlciB9IGZyb20gJy4vZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlcic7XG5cbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ29uZmlnIHtcbiAgICBiYXNlX3VybDogc3RyaW5nO1xuICAgIGFjY2Vzc190b2tlbj86IHN0cmluZztcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ2xpZW50U2VydmljZTxULCBFPiB7XG5cbiAgICBwcml2YXRlIGhlYWRlcnM6IEh0dHBIZWFkZXJzO1xuICAgIHRva2VuOiBzdHJpbmc7XG4gICAgYmFzZV91cmw6IHN0cmluZyA9IFwiL1wiO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBjb25maWc6IFN0ZXdhcmRDb25maWcpIHtcbiAgICAgICAgdGhpcy5iYXNlX3VybCA9IGNvbmZpZy5iYXNlX3VybDtcbiAgICAgICAgaWYgKGNvbmZpZy5oZWFkZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcuYWNjZXNzX3Rva2VuKSB7Ly9hcHBlbmQgYWNjZXNzIHRva2VuIGlmIHRoZSBlbnZpcm9ubWVudCBoYXMgYWNjZXNzIHRva2VuXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgXCJCZWFyZXIgXCIgKyBjb25maWcuYWNjZXNzX3Rva2VuKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGhhbmRsZSBodHRwIHBvc3QgcmVxdWVzdHNcbiAgICAgKi9cbiAgICBwb3N0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBKU09OLnN0cmluZ2lmeShkYXRhKSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSkucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBoYW5kbGUgaHR0cCBwb3N0IHJlcXVlc3RzXG4gICAgICovXG4gICAgcHV0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkZWxldGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdCgnZGVsZXRlJywgdGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycywgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSkgfSkucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgb3B0aW9ucykucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICBnZXRGaWxlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCArICc/YWNjZXNzX3Rva2VuPScgKyB0aGlzLnRva2VuLCBvcHRpb25zKS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogaWZcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgXG4gICAgICogQHBhcmFtIGRhdGEgXG4gICAgICogQHBhcmFtIGhlYWRlcnMgXG4gICAgICovXG4gICAgcG9zdEZvcm1EYXRhKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQsIGhlYWRlcnM/OiBIdHRwSGVhZGVycyk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZih0aGlzLmhlYWRlcnMuZ2V0KFwiQXV0aG9yaXphdGlvblwiKSAmJiAoIWhlYWRlcnMpKXtcbiAgICAgICAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMudG9rZW4gfSk7XG4gICAgICAgIH0gZWxzZSBpZighaGVhZGVycyl7XG4gICAgICAgICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgZm9ybURhdGEsIHsgaGVhZGVyczogaGVhZGVyc30pLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHBvc3RGb3JtRGF0YU11bHRpcGFydChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICAgICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSkge1xuICAgICAgICAgICAgICAgIGRhdGFba2V5XS5mb3JFYWNoKGsyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgazIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgZm9ybURhdGEsIHsgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuIH0pIH0pLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1dEZvcm1EYXRhTXVsdGlQYXJ0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgZGF0YVtrZXldLmZvckVhY2goazIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBrMik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIGZvcm1EYXRhLCB7IGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7ICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy50b2tlbiB9KSB9KS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEh0dHBQYXJhbXMoZGF0YTogTWFwPHN0cmluZywgc3RyaW5nPik6IEh0dHBQYXJhbXMge1xuICAgICAgICBpZiAoZGF0YSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBodHRwUGFyYW1zOiBIdHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgZGF0YS5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gY2F0Y2ggZXhjZXB0aW9uIHRocm93biBieSBodHRwIGNsaWVudCByZXR1cm5zIGludGVybmFsIHNlcnZlciBlcnJvclxuICAgICAqIGlmIHN0YXR1cyA1MDAgaXMgZW5jb3VudGVyZWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGhhbmRsZUVycm9yPFJlc3BvbnNlV3JhcHBlcj4oKSB7XG4gICAgICAgIHJldHVybiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IG5ldyBSZXNwb25zZVdyYXBwZXIoKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7IC8vIGxvZyB0byBjb25zb2xlIGluc3RlYWRcbiAgICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT0gNTAwKSB7XG4gICAgICAgICAgICAgICAgcmVzLmNvZGUgPSBlcnJvci5zdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzLm1lc3NhZ2UgPSAnU29ycnkgaW50ZXJuYWwgc2VydmVyIGVycm9yIG9jY3VyZWQgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlcic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcy5jb2RlID0gZXJyb3Iuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlcy5tZXNzYWdlID0gZXJyb3IuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgICAgICByZXMuZGF0YSA9IGVycm9yLmVycm9yLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2YocmVzKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlZCB0byByZW5kZXIgYWN0aW9uIGJ1dHRvbnNcbiAgICAgKi9cbiAgICBzdGF0aWMgcmVuZGVyTW9yZShpZDogYW55KSB7XG4gICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cXCdhY3Rpb25zLWJ1dHRvbnMgY2VudGVyXFwnIGlkPVxcJycgKyBpZCArICdcXCc+PGkgY2xhc3M9XFwnZmEgZmEtY2hlY2tcXCcgdGl0bGU9XFwnQXBwcm92ZVxcJz48L2k+IDxpIGNsYXNzPVxcJ2ZhIGZhLWJhblxcJyB0aXRsZT1cXCdEZWNsaW5lXFwnPjwvaT48L2Rpdj4nO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbnRpYXRlRGF0YVRhYmxlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMuZ2V0SHR0cFBhcmFtcyhkYXRhKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIG9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N0dy1zdGV3YXJkLWNsaWVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBzdGV3YXJkLWNsaWVudCB3b3JrcyFcbiAgICA8L3A+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCIvKipcbiAqIERhdGFibGUgcGFnZSB1c2VkIHRvIHdyYXBwZXIgc2VydmVyIGNvbnRlbnQgcmVzcG9uc2VcbiAqL1xuZXhwb3J0IGNsYXNzIFBhZ2U8VD4ge1xuICAgIC8qKlxuICAgICAqIE51bWJlciBvZiBpdGVtcyBwZXIgcGFnZSBzYW1lIGFzIGxpbWl0XG4gICAgICovXG4gICAgc2l6ZTogbnVtYmVyID0gMTA7XG4gICAgLyoqXG4gICAgICogVG90YWwgaXRlbXMgYXZhaWxhYmxlIG9uIHRoZSBzZXJ2ZXJcbiAgICAgKi9cbiAgICB0b3RhbEVsZW1lbnRzOiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIFRvdGFsIG51bWJlciBvZiBwYWdlcyBwcmVzZW50XG4gICAgICovXG4gICAgdG90YWxQYWdlczogbnVtYmVyID0gMDtcbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgaXMgdGhlIGZpcnN0IHBhZ2VcbiAgICAgKi9cbiAgICBmaXJzdDogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGl0IGlzIHRoZSBsYXN0IHBhZ2VcbiAgICAgKi9cbiAgICBsYXN0OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogVGhlIGFjdHVhbCBwYWdlIGNvbnRlbnRcbiAgICAgKi9cbiAgICBjb250ZW50OiBBcnJheTxUPiA9IFtdO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gbWFwIHNvcnQgcGFyYW1ldGVyc1xuICAgICAqL1xuICAgIHNvcnRlZDogU29ydCA9IG5ldyBTb3J0KCk7XG4gICAgLyoqXG4gICAgICogQ3VycmVudCBwYWdlIG51bWJlclxuICAgICAqL1xuICAgIG51bWJlcjogbnVtYmVyID0gMDtcbn1cbi8qKlxuICogdXNlZCB0byBtYXAgc29ydCByZXF1ZXN0XG4gKi9cbmV4cG9ydCBjbGFzcyBTb3J0e1xuICAgIHNvcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHVuc29ydGVkOiBib29sZWFuID0gdHJ1ZTtcbn1cbiIsIi8qKlxuICogUmVwcmVzZW50cyBkeW5hbWljIGh0bWwgY29udHJvbHMgKElucHV0LCBUZXh0QXJlYSBhbmQgU2VsZWN0KVxuICovXG5leHBvcnQgY2xhc3MgTWxrRHluYW1pY0NvbnRyb2w8VD4ge1xuICAgIC8qKlxuICAgICAqIENvbnRyb2wgbGFiZWxcbiAgICAgKi9cbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEljb24gdG8gYmUgYXBwZW5kZWQgYmVmb3JlIHRoZSBjb250cm9sIChzdXBwb3J0cyBjbGFzcyBkZWZpbmVkIGljb25zKVxuICAgICAqL1xuICAgIGljb246IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBjb250cm9sIChwcm92aWRlIHZhcmlhYmxlIHZhbGlkIG5hbWVzIGllLiBubyBzcGFjZXMgcHJlZmFyYWJseSBhcGkgY29ycmVzcG9uZGluZyBuYW1lcyBlLmcuIHVzZXJOYW1lKVxuICAgICAqL1xuICAgIG5hbWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgYWN0dWFsIGNvbnRyb2wgKE1sa0lucHV0LCBNbGtUZXh0QXJlYSAmIE1sa1NlbGVjdClcbiAgICAgKi9cbiAgICBjb250cm9sVHlwZTogVDtcbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIGZpZWxkIGlzIHJlcXVpcmVkXG4gICAgICovXG4gICAgaXNSZXF1aXJlZDogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBDb250cm9sIHBsYWNlaG9sZGVyXG4gICAgICovXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZyA9IFwiXCI7XG5cbiAgICBjb25zdHJ1Y3RvcihsYWJlbDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNvbnRyb2xUeXBlOiBULCBpY29uOiBzdHJpbmcgPSBcImZhIGZhLWZpbGUtdGV4dC1vXCIsXG4gICAgICAgIGlzUmVxdWlyZWQ6IGJvb2xlYW4gPSB0cnVlLCBwbGFjZWhvbGRlcjogc3RyaW5nID0gbnVsbCkge1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBjb250cm9sVHlwZTtcbiAgICAgICAgdGhpcy5pY29uID0gaWNvbjtcbiAgICAgICAgdGhpcy5pc1JlcXVpcmVkID0gaXNSZXF1aXJlZDtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyID8gcGxhY2Vob2xkZXIgOiBsYWJlbDtcbiAgICB9XG5cbn1cbi8qKlxuICogVXNlZCB0byByZXByZXNlbnQgaHRtbCBpbnB1dCB3aXRoIG9wdGlvbnM6XG4gKiB0eXBlOiBkZWZhdWx0IHRvIHRleHQsICBtYXhMZW5ndGgsIG1pbkxlbmd0aCwgbWluLCBtYXhcbiAqL1xuZXhwb3J0IGNsYXNzIE1sa0lucHV0e1xuICAgIC8qKlxuICAgICAqIFR5cGUgb2YgaW5wdXQgZS5nLiB0ZXh0LCBudW1iZXIsIGRhdGVcbiAgICAgKi9cbiAgICB0eXBlOiBzdHJpbmcgPSBcInRleHRcIjtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIGxlbmd0aCBvZiB0aGUgaW5wdXRcbiAgICAgKi9cbiAgICBtYXhMZW5ndGg6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIG1pbmltdW0gaW5wdXQgbGVuZ3RoXG4gICAgICovXG4gICAgbWluTGVuZ3RoOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBudW1iZXIgaW5wdXRzXG4gICAgICovXG4gICAgbWluOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBudW1iZXIgaW5wdXRzXG4gICAgICovXG4gICAgbWF4OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcgPSBcInRleHRcIikge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLm1pbkxlbmd0aCA9IHRoaXMubWluID0gMDtcbiAgICAgICAgdGhpcy5tYXhMZW5ndGggPSA0MDAwO1xuICAgICAgICB0aGlzLm1heCA9IDEwMDAwMDAwMDA7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgaHRtbCB0ZXh0YXJlYSBpbnB1dFxuICovXG5leHBvcnQgY2xhc3MgTWxrVGV4dGFyZWF7XG4gICAgLyoqXG4gICAgICogTnVtYmVyIHRleHRhcmVhIGNvbHVtbnNcbiAgICAgKi9cbiAgICBjb2xzPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIE51bWJlciBvZiB0ZXh0YXJlYSByb3dzXG4gICAgICovXG4gICAgcm93cz86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBtYXhpbXVtIGlucHV0IGxlbmd0aFxuICAgICAqL1xuICAgIG1heExlbmd0aDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIG1pbmltdW0gaW5wdXQgbGVuZ3RoXG4gICAgICovXG4gICAgbWluTGVuZ3RoOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb2xzOiBudW1iZXIgPSA1LCByb3dzOiBudW1iZXIgPSAxKXtcbiAgICAgICAgdGhpcy5jb2xzID0gY29scztcbiAgICAgICAgdGhpcy5yb3dzID0gcm93cztcbiAgICAgICAgdGhpcy5tYXhMZW5ndGggPSA0MDAwO1xuICAgICAgICB0aGlzLm1pbkxlbmd0aCA9IDBcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBodG1sIHNlbGVjdCBjb250cm9sXG4gKi9cbmV4cG9ydCBjbGFzcyBNbGtTZWxlY3Qge1xuICAgIC8qKlxuICAgICAqIFNlbGVjdCBvcHRpb25zXG4gICAgICovXG4gICAgb3B0aW9uczogQXJyYXk8TWxrU2VsZWN0T3B0aW9uPjtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEFycmF5PE1sa1NlbGVjdE9wdGlvbj4pe1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgTWxrU2VsZWN0T3B0aW9ue1xuICAgIC8qKlxuICAgICAqIE9wdGlvbiB2YWx1ZVxuICAgICAqL1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogT3B0aW9uIHRleHQvbGFiZWxcbiAgICAgKi9cbiAgICB0ZXh0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgPSBudWxsKXtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0ID8gdGV4dCA6IHZhbHVlO1xuICAgIH1cblxufVxuXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nRm9ybSwgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9wYWdlJztcbmltcG9ydCB7IE1sa0R5bmFtaWNDb250cm9sLCBNbGtJbnB1dCwgTWxrVGV4dGFyZWEsIE1sa1NlbGVjdCB9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL21say1keW5hbWljLWNvbnRyb2wnO1xuaW1wb3J0IHsgUmVzcG9uc2VXcmFwcGVyIH0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlcic7XG5pbXBvcnQgeyBTdGV3YXJkQ2xpZW50U2VydmljZSB9IGZyb20gJy4uL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YXRhYmxlQ29tcG9uZW50IH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuaW1wb3J0IHsgUXVldWUgfSBmcm9tICdxdWV1ZS10eXBlc2NyaXB0Jztcbi8vY29uc3QgeyBRdWV1ZSB9ID0gcmVxdWlyZSgncXVldWUtdHlwZXNjcmlwdCcpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzdHctbWxrLWRhdGF0YWJsZScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNhcmQgY2FyZC1vdXRsaW5lLWRlZmF1bHRcIiAqbmdJZj1cImVuYWJsZUZpbHRlckhlYWRlclwiPlxuPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuPGZvcm0gKG5nU3VibWl0KT1cInByb2Nlc3NGaWx0ZXIoZmlsdGVyRm9ybSlcIiBbZm9ybUdyb3VwXT1cImZpbHRlckZvcm1cIj5cblxuPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyAgbWItM1wiICpuZ0Zvcj1cImxldCBjb250cm9sIG9mIGZpbHRlckNvbXBvbmVudHNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmcm9tXCI+e3tjb250cm9sLmxhYmVsfX06IDwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCAgZm9ybS1pY29uLWRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgIDxpIFtjbGFzc109XCJjb250cm9sLmljb25cIj48L2k+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgXG4gICAgICAgICAgICAgIDxzZWxlY3QgKm5nSWY9XCJpc1NlbGVjdChjb250cm9sLmNvbnRyb2xUeXBlKVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkIHNlbGVjdGVkPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgbyBvZiBjb250cm9sLmNvbnRyb2xUeXBlLm9wdGlvbnNcIj57e28udGV4dH19PC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICBcbiAgICAgICAgICAgICAgPHRleHRhcmVhICpuZ0lmPVwiaXNUZXh0QXJlYShjb250cm9sLmNvbnRyb2xUeXBlKVwiIFtjb2xzXT1cImNvbnRyb2wuY29udHJvbFR5cGUuY29sc1wiIFtyb3dzXT1cImNvbnRyb2wuY29udHJvbFR5cGUucm93c1wiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXG4gICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiPjwvdGV4dGFyZWE+XG4gIFxuICAgICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJpc0lucHV0KGNvbnRyb2wuY29udHJvbFR5cGUpXCIgW3R5cGVdPVwiY29udHJvbC5jb250cm9sVHlwZS50eXBlXCIgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxuICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLnRvdWNoZWRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcigncmVxdWlyZWQnKVwiPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19IGlzIHJlcXVpcmVkPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtaW5sZW5ndGgnKVwiPk1pbmltdW0gb2Yge3tjb250cm9sLmNvbnRyb2xUeXBlLm1pbkxlbmd0aH19IGNoYXJhY3RlcnM8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiB7e2NvbnRyb2wuY29udHJvbFR5cGUubWF4TGVuZ3RofX0gY2hhcmFjdGVyczwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWluJylcIj5TaG91bGQgYmUgZ3JlYXRlciB0aGFuIHt7Y29udHJvbC5jb250cm9sVHlwZS5taW59fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWF4JylcIj5TaG91bGQgYmUgbGVzcyB0aGFuIHt7Y29udHJvbC5jb250cm9sVHlwZS5tYXh9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwicm93XCIgKm5nSWY9XCJlbmFibGVEZWZhdWx0VGFibGVIZWFkZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgbWItM1wiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZyb21cIj5Gcm9tOiA8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgZm9ybS1pY29uLWRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXItb1wiPjwvaT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiIFxuICAgICAgICAgICAgICAgIGlkPVwiaW5wdXRUcmF2ZWxEYXRlXCIgXG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwiZnJvbVwiIFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRnJvbS4uLlwiXG4gICAgICAgICAgICAgICAgI2RwZnJvbT1cImJzRGF0ZXBpY2tlclwiXG4gICAgICAgICAgICAgICAgYnNEYXRlcGlja2VyXG4gICAgICAgICAgICAgICAgW291dHNpZGVDbGlja109XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgW2JzQ29uZmlnXT1cInsgZGF0ZUlucHV0Rm9ybWF0OiAnREQtTU0tWVlZWScsIGNvbnRhaW5lckNsYXNzOiAndGhlbWUtcmVkJyB9XCJcbiAgICAgICAgICAgICAgICBtYXhsZW5ndGg9XCIzMFwiXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImRwZnJvbS50b2dnbGUoKVwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiZHBmcm9tLmlzT3BlblwiPjxpIGNsYXNzPVwiZmEgZmEtdGhcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLnRvdWNoZWRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2YgMzAgY2hhcmFjdGVyczwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgbWItM1wiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZyb21cIj5UbzogPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IGZvcm0taWNvbi1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNhbGVuZGFyLW9cIj48L2k+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIiBcbiAgICAgICAgICAgICAgICBpZD1cImlucHV0VHJhdmVsRGF0ZVwiIFxuICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInRvXCIgXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUby4uLlwiXG4gICAgICAgICAgICAgICAgI2RwdG89XCJic0RhdGVwaWNrZXJcIlxuICAgICAgICAgICAgICAgIGJzRGF0ZXBpY2tlclxuICAgICAgICAgICAgICAgIFtvdXRzaWRlQ2xpY2tdPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgIFtic0NvbmZpZ109XCJ7IGRhdGVJbnB1dEZvcm1hdDogJ0RELU1NLVlZWVknLCBjb250YWluZXJDbGFzczogJ3RoZW1lLXJlZCcgfVwiXG4gICAgICAgICAgICAgICAgbWF4bGVuZ3RoPVwiMzBcIlxuICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJkcHRvLnRvZ2dsZSgpXCIgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJkcHRvLmlzT3BlblwiPjxpIGNsYXNzPVwiZmEgZmEtdGhcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj4gIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCd0bycpLnRvdWNoZWRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgndG8nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDMwIGNoYXJhY3RlcnM8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIG1iLTNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJzZWFyY2hcIj5TZWFyY2g6PC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtcHJlcGVuZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCBmb3JtLWljb24tZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1zZWFyY2hcIj48L2k+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGlucHV0IGZvcm1Db250cm9sTmFtZT1cIm5lZWRsZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaC4uLlwiIChrZXl1cCk9XCJ1cGRhdGVGaWx0ZXIoJGV2ZW50KVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykudG91Y2hlZFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2YgMjAwIGNoYXJhY3RlcnM8L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJyb3dcIj5cblx0PGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInB1bGwtcmlnaHQgaW5saW5lLWJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4td2FybmluZyBidG4tc21cIiB0eXBlPVwicmVzZXRcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXJlcGVhdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICBSZXNldFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG4tc20gcHVsbC1yaWdodFwiIHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWZpbHRlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICBGaWx0ZXJcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblx0PC9kaXY+XG48L2Rpdj5cbiAgICAgIFxuPC9mb3JtPlxuPC9kaXY+XG48L2Rpdj5cbiAgXG4gIDxuZ3gtZGF0YXRhYmxlIFxuICAgICN0YWJsZSBcbiAgICBbcm93SGVpZ2h0XT1cInRhYmxlUm93SGVpZ2h0XCJcbiAgICBbZm9vdGVySGVpZ2h0XT1cInRhYmxlRm9vdGVySGVpZ2h0XCJcbiAgICBbaGVhZGVySGVpZ2h0XT1cInRhYmxlSGVhZGVySGVpZ2h0XCIgXG4gICAgW3Njcm9sbGJhclZdPVwidmVydGljYWxTY3JvbGxBY3RpdmVcIlxuICAgIFtzY3JvbGxiYXJIXT1cImhvcml6b250YWxTY3JvbGxBY3RpdmVcIlxuICAgIFtzdW1tYXJ5Um93XT1cImVuYWJsZVN1bW1hcnlcIlxuICAgIFtzdW1tYXJ5UG9zaXRpb25dPVwic3VtbWFyeVBvc2l0aW9uXCJcbiAgICBbc3VtbWFyeUhlaWdodF09XCJzdW1tYXJ5SGVpZ2h0XCJcbiAgICBjbGFzcz1cImJvb3RzdHJhcFwiICAgIFxuICAgIFtjb2x1bW5Nb2RlXT1cIidmb3JjZSdcIlxuICAgIFtyb3dzXT1cInBhZ2UuY29udGVudFwiIFxuICAgIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiIFxuICAgIFtzZWxlY3Rpb25UeXBlXT1cIidjaGVja2JveCdcIiBcbiAgICAoYWN0aXZhdGUpPVwib25BY3RpdmF0ZSgkZXZlbnQpXCIgXG4gICAgKHNlbGVjdCk9J29uU2VsZWN0KCRldmVudCknXG4gICAgW2NvdW50XT1cInBhZ2UudG90YWxFbGVtZW50c1wiIFxuICAgIFtvZmZzZXRdPVwicGFnZS5udW1iZXJcIiBcbiAgICBbZXh0ZXJuYWxQYWdpbmddPVwidHJ1ZVwiIFxuICAgIFtsaW1pdF09XCJwYWdlLnNpemVcIiBcbiAgICAocGFnZSk9XCJsb2FkUGFnZSgkZXZlbnQsIG51bGwpXCI+XG4gICAgPG5neC1kYXRhdGFibGUtY29sdW1uIFtzdW1tYXJ5RnVuY109XCJzdW1tYXJ5RnVuY1wiIFt3aWR0aF09XCIzMFwiIFtzb3J0YWJsZV09XCJmYWxzZVwiIFtjYW5BdXRvUmVzaXplXT1cImZhbHNlXCIgW2RyYWdnYWJsZV09XCJ0cnVlXCIgW3Jlc2l6ZWFibGVdPVwiZmFsc2VcIiBbaGVhZGVyQ2hlY2tib3hhYmxlXT1cInRydWVcIlxuICAgICAgW2NoZWNrYm94YWJsZV09XCJ0cnVlXCIgKm5nSWY9XCJlbmFibGVDaGVja2JveFwiPlxuICAgIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XG4gICAgPG5neC1kYXRhdGFibGUtY29sdW1uIFtzdW1tYXJ5RnVuY109XCIoYy5zdW1tYXJ5RnVuYykgPyBjLnN1bW1hcnlGdW5jIDogc3VtbWFyeUZ1bmNcIiBbY2FuQXV0b1Jlc2l6ZV09XCIoYy5jYW5BdXRvUmVzaXplKSA/IGMuY2FuQXV0b1Jlc2l6ZSA6IHRydWVcIiBbbmFtZV09XCJjLmNvbHVtbk5hbWVcIiBbd2lkdGhdPVwiYy53aWR0aFwiXG4gICAgICBbc29ydGFibGVdPVwiKGMuc29ydGFibGUpID8gYy5zb3J0YWJsZSA6IHRydWVcIiBbZHJhZ2dhYmxlXT1cIihjLmRyYWdnYWJsZSkgPyBjLmRyYWdnYWJsZSA6IHRydWVcIiBbcmVzaXplYWJsZV09XCIoYy5yZXNpemVhYmxlKSA/IGMucmVzaXplYWJsZSA6IHRydWVcIlxuICAgICAgKm5nRm9yPVwibGV0IGMgb2YgY29sdW1uc1wiPlxuICAgICAgPG5nLXRlbXBsYXRlIGxldC1jb2x1bW49XCJjb2x1bW5cIiBuZ3gtZGF0YXRhYmxlLWhlYWRlci10ZW1wbGF0ZT5cbiAgICAgICAgPHN0cm9uZz57e2MuY29sdW1uTmFtZX19PC9zdHJvbmc+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPG5nLXRlbXBsYXRlIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZSBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiIGxldC12YWx1ZT1cInZhbHVlXCIgbGV0LXJvdz1cInJvd1wiPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIDwhLS17eyhjLmlzRGF0ZUNvbHVtbik/KGdldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSkgfCBkYXRlOidtZWRpdW0nKSA6IGdldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSl9fSAtLT5cbiAgICAgICAgICAgIDwhLS17e1xuICAgICAgICAgICAgICBpZihjLmlzRGF0ZUNvbHVtbilcbiAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAoZ2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKSB8IGRhdGU6J21lZGl1bScpIFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2UgaWYoYy5pc0N1cnJlbmN5Q29sdW1uKVxuICAgICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgIChnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpIHwgY3VycmVuY3k6J2MuY3VycmVuY3lUZXh0JykgXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSBcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGdldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX0tLT5cbiAgICAgICAgICAgIDwhLS08ZGl2IFtuZ1N3aXRjaF09XCJjLmlzRGF0ZUNvbHVtblwiPlxuICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+e3soZ2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKSB8IGRhdGU6J21lZGl1bScpfX08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hEZWZhdWx0PjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IFtuZ1N3aXRjaF09XCJjLmlzQ3VycmVuY3lDb2x1bW5cIj5cbiAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiPnt7KGdldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSkgfCBjdXJyZW5jeTonYy5jdXJyZW5jeVRleHQnKX19PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoRGVmYXVsdD48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PiAtLT5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjLmlzRGF0ZUNvbHVtbjsgdGhlbiB0MTBcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjLmlzQ3VycmVuY3lDb2x1bW4gJiYgYy5jdXJyZW5jeVRleHQ7IHRoZW4gdDQwXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWMuaXNEYXRlQ29sdW1uICYmICFjLmlzQ3VycmVuY3lDb2x1bW47IHRoZW4gdDcwXCI+PC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdDEwPlxuICAgICAgICAgICAgICAgIHt7KGdldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSkgfCBkYXRlOidtZWRpdW0nKX19XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICN0NDA+XG4gICAgICAgICAgICAgICAge3soZ2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKSB8IGN1cnJlbmN5OidjLmN1cnJlbmN5VGV4dCcpfX1cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI3Q3MD5cbiAgICAgICAgICAgICAgICB7e2dldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSl9fVxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxuICAgIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBbc3VtbWFyeUZ1bmNdPVwic3VtbWFyeUZ1bmNcIiBbbmFtZV09XCJtb3JlQWN0aW9ucy5uYW1lXCIgKm5nSWY9XCJtb3JlQWN0aW9uc1wiIFtzb3J0YWJsZV09XCJmYWxzZVwiIFtjYW5BdXRvUmVzaXplXT1cImZhbHNlXCI+XG4gICAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXZhbHVlPVwidmFsdWVcIiBsZXQtcm93PVwicm93XCI+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1zZWNvbmRhcnkgZHJvcGRvd24tdG9nZ2xlXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWxpc3QtdWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+XG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgbW9yZUFjdGlvbnMuYWN0aW9uc1wiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiAoY2xpY2spPVwib25BY3Rpb25DbGljayh7aWQ6IHJvd1ttb3JlQWN0aW9ucy5pZEZpZWxkTmFtZV0sIGFjdGlvbk5hbWU6IGFjdGlvbi5hY3Rpb25OYW1lLCBhY3Rpb25Sb3c6IHJvd30pXCI+e3thY3Rpb24uYWN0aW9uTmFtZX19PC9hPlxuICAgICAgICAgICAgICA8IS0tIDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCIjXCI+QW5vdGhlciBhY3Rpb248L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgaHJlZj1cIiNcIj5Tb21ldGhpbmcgZWxzZSBoZXJlPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcm9sZT1cInNlcGFyYXRvclwiIGNsYXNzPVwiZHJvcGRvd24tZGl2aWRlclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCIjXCI+U2VwYXJhdGVkIGxpbms8L2E+IC0tPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cbiAgICA8IS0tIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBuYW1lPVwiRGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZSBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiIGxldC12YWx1ZT1cInZhbHVlXCIgbGV0LXJvdz1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAge3t2YWx1ZX19XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cbiAgICAgICAgICAgIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBuYW1lPVwiQWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXZhbHVlPVwidmFsdWVcIiBsZXQtcm93PVwicm93XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICB7e3ZhbHVlfX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L25neC1kYXRhdGFibGUtY29sdW1uPiAtLT5cbiAgPC9uZ3gtZGF0YXRhYmxlPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIE1sa0RhdGF0YWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCBcbntcbiAgQElucHV0KCkgdGFibGVSb3dIZWlnaHQ6IG51bWJlciA9IDUwO1xuICBASW5wdXQoKSB0YWJsZUZvb3RlckhlaWdodDogbnVtYmVyID0gNTA7XG4gIEBJbnB1dCgpIHRhYmxlSGVhZGVySGVpZ2h0OiBudW1iZXIgPSA1MDtcbiAgQElucHV0KCkgdmVydGljYWxTY3JvbGxBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgaG9yaXpvbnRhbFNjcm9sbEFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBjb2x1bW5zOiBBcnJheTxNbGtEYXRhVGFibGVDb2x1bW4+ID0gW107XG4gIEBJbnB1dCgpIGVuYWJsZUNoZWNrYm94OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGVuZHBvaW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGVuYWJsZUZpbHRlckhlYWRlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBlbmFibGVEZWZhdWx0VGFibGVIZWFkZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZW5hYmxlU3VtbWFyeTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBzdW1tYXJ5UG9zaXRpb246IHN0cmluZyA9IFwiJ2JvdHRvbSdcIjtcbiAgQElucHV0KCkgc3VtbWFyeUhlaWdodDogc3RyaW5nID0gXCInYXV0bydcIjtcbiAgQElucHV0KCkgbW9yZUFjdGlvbnM6IE1sa01vcmVBY3Rpb25zO1xuICBAT3V0cHV0KCkgb25BY3Rpb25zRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1sa01vcmVBY3Rpb25EYXRhPigpXG4gIEBJbnB1dCgpIGZpbHRlckNvbXBvbmVudHM6IEFycmF5PE1sa0R5bmFtaWNDb250cm9sPGFueT4+ID0gW107XG4gIEBJbnB1dCgpIHBhcmFtczogTWFwPHN0cmluZywgYW55PjtcbiAgcGFnZTogUGFnZTxhbnk+ID0gbmV3IFBhZ2UoKTtcbiAgc2VsZWN0ZWQgPSBbXTtcbiAgQFZpZXdDaGlsZChEYXRhdGFibGVDb21wb25lbnQpIHRhYmxlOiBEYXRhdGFibGVDb21wb25lbnQ7XG4gIGZpbHRlcjogT2JqZWN0ID0ge307XG4gIGZpbHRlckZvcm06IEZvcm1Hcm91cDtcbiAgZW1wdHlTdW1tYXJ5RnVuYzogKCkgPT4gbnVsbDtcbiAgO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RlcndhcmRTZXJ2aWNlOiBTdGV3YXJkQ2xpZW50U2VydmljZTxSZXNwb25zZVdyYXBwZXI8UGFnZTxhbnk+PiwgYW55Pikge1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGZvcm0gY29udHJvbCBmcm9tIGZpbHRlckNvbXBvbmVudHMgYW5kIGFsc28gYXBwZW5kaW5nIGRlZmF1bHQgY29udHJvbHMgaWUuIGRhdGUgZmlsdGVyIGFuZCBzZWFyY2ggY29udHJvbHNcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIGxldCBncm91cCA9IHt9O1xuICAgIHRoaXMuZmlsdGVyQ29tcG9uZW50cy5mb3JFYWNoKGNvbXAgPT4ge1xuICAgICAgbGV0IHZhbGlkYXRvcnM6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgIGlmIChjb21wLmlzUmVxdWlyZWQpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgfVxuXG4gICAgICBpZihjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgTWxrSW5wdXQgfHwgY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIE1sa1RleHRhcmVhKXtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluTGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWluTGVuZ3RoKSk7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heExlbmd0aChjb21wLmNvbnRyb2xUeXBlLm1heExlbmd0aCkpO1xuICAgICAgfVxuXG4gICAgICBpZihjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgTWxrSW5wdXQpe1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5tYXgoY29tcC5jb250cm9sVHlwZS5tYXgpKTtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluKGNvbXAuY29udHJvbFR5cGUubWluKSk7XG4gICAgICB9XG4gICAgICBncm91cFtjb21wLm5hbWVdID0gbmV3IEZvcm1Db250cm9sKCcnLCB2YWxpZGF0b3JzKVxuICAgIH0pO1xuICAgIC8vYWRkIGRlZmF1bHQgY29udHJvbHNcbiAgICBncm91cFsnZnJvbSddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgzMCkpO1xuICAgIGdyb3VwWyd0byddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgzMCkpO1xuICAgIGdyb3VwWyduZWVkbGUnXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMjAwKSk7XG4gICAgdGhpcy5maWx0ZXJGb3JtID0gbmV3IEZvcm1Hcm91cChncm91cCk7XG4gICAgdGhpcy5sb2FkUGFnZSh7IG9mZnNldDogMCwgbGltaXQ6IHRoaXMucGFnZS5zaXplIH0sIG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZW1pdCBjbGljayBldmVudCBvZiB0aGUgYWN0aW9uc1xuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIG9uQWN0aW9uQ2xpY2soZXZlbnQ6IE1sa01vcmVBY3Rpb25EYXRhKSB7XG4gICAgdGhpcy5vbkFjdGlvbnNFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHNlcnZlciByZXF1ZXN0IG9mIGRhdGFibGVcbiAgICogQHBhcmFtIHBhZ2VJbmZvXG4gICAqIEBwYXJhbSBmaWx0ZXJzXG4gICAqL1xuICBsb2FkUGFnZShwYWdlSW5mbywgZmlsdGVycykge1xuICAgIGlmICghdGhpcy5lbmRwb2ludCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcmVxdWVzdDogTWFwPHN0cmluZywgYW55PjtcbiAgICBpZiAoZmlsdGVycykge1xuICAgICAgcmVxdWVzdCA9IGZpbHRlcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGlmKHRoaXMucGFyYW1zKXtcbiAgICAgIHRoaXMucGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpPT57XG4gICAgICAgIHJlcXVlc3Quc2V0KGtleSwgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJlcXVlc3Quc2V0KFwicGFnZVwiLCBwYWdlSW5mby5vZmZzZXQpO1xuICAgIHJlcXVlc3Quc2V0KFwic2l6ZVwiLCBwYWdlSW5mby5saW1pdCk7XG4gICAgdGhpcy5zdGVyd2FyZFNlcnZpY2UuZ2V0KHRoaXMuZW5kcG9pbnQsIHJlcXVlc3QpLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2UuY29kZSA9PSAyMDApIHtcbiAgICAgICAgdGhpcy5wYWdlID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gaGFuZGxlIHNlbGVjdCBvcHRpb25cbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBvblNlbGVjdChldmVudCkge1xuXG4gIH1cblxuICBvbkFjdGl2YXRlKGV2ZW50KSB7XG5cbiAgfVxuXG4gIHVwZGF0ZUZpbHRlcihldmVudCkge1xuXG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBwcm9jZXNzIHRhYmxlIGZpbHRlci4gSWYgZGF0ZSBmaWx0ZXIgaXMgbm90IHByb3ZpZGUgdGhlIGZyb20gdmFsdWUgaXMgXG4gICAqIHNldCB0byAyMDE4LTAxLTAxIGFuZCB0byB2YWx1ZSBpcyBzZXQgdG8gMSB5ZWFyIGZyb20gdG9kYXlcbiAgICogQHBhcmFtIGZvcm0gXG4gICAqL1xuICBwcm9jZXNzRmlsdGVyKGZvcm0pIHtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICBsZXQgZjogTWFwPFN0cmluZywgYW55PiA9IG5ldyBNYXAoT2JqZWN0LmVudHJpZXModGhpcy5maWx0ZXJGb3JtLnZhbHVlKSk7XG4gICAgLy92YWxpZGF0ZSBkYXRlIFxuICAgIGlmKCF0aGlzLmZpbHRlckZvcm0uZ2V0KCdmcm9tJykudG91Y2hlZClcbiAgICB7Ly9pZiBmcm9tIGlzIG5vdCBwb3B1bGF0ZWQgcmVtb3ZlIGZyb20gcmVxdWVzdFxuICAgICAgZi5kZWxldGUoJ2Zyb20nKTtcbiAgICAgIC8vIHRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS5zZXRWYWx1ZSgnMjAxOC0wMS0wMScpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgLy9mLmdldCgnZnJvbScpLnNldFZhbHVlKG5ldyBEYXRlKHRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS52YWx1ZSkpO1xuICAgICAgbGV0IGZkID0gbmV3IERhdGUodGhpcy5maWx0ZXJGb3JtLmdldCgnZnJvbScpLnZhbHVlKTtcbiAgICAgIGYuc2V0KCdmcm9tJywgZmQudG9JU09TdHJpbmcoKSk7XG4gICAgfVxuICAgIGlmKCF0aGlzLmZpbHRlckZvcm0uZ2V0KCd0bycpLnRvdWNoZWQpXG4gICAgey8vaWYgdG8gaXMgbm90IHBvcHVsYXRlZCByZW1vdmUgZnJvbSByZXF1ZXN0XG4gICAgICBmLmRlbGV0ZSgndG8nKTtcbiAgICAgIC8vIGxldCB0b0RhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgLy8gdG9EYXRlLnNldERhdGUodG9EYXRlLmdldEZ1bGxZZWFyKCkgKyAxKTtcbiAgICAgIC8vIHRoaXMuZmlsdGVyRm9ybS5nZXQoJ3RvJykuc2V0VmFsdWUodGhpcy5nZXRGb3JtYXR0ZWREYXRlKHRvRGF0ZSkpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgLy9mLmdldCgndG8nKS5zZXRWYWx1ZShuZXcgRGF0ZSh0aGlzLmZpbHRlckZvcm0uZ2V0KCd0bycpLnZhbHVlKSk7XG4gICAgICBsZXQgdGQgPSBuZXcgRGF0ZSh0aGlzLmZpbHRlckZvcm0uZ2V0KCd0bycpLnZhbHVlKTtcbiAgICAgIGYuc2V0KCd0bycsIHRkLnRvSVNPU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIHRoaXMubG9hZFBhZ2UoeyBvZmZzZXQ6IHRoaXMucGFnZS5udW1iZXIsIGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZSB9LCBmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIGlucHV0XG4gICAqIEBwYXJhbSBjb250cm9sXG4gICAqL1xuICBpc0lucHV0KGNvbnRyb2w6IGFueSkge1xuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgTWxrSW5wdXQ7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyBzZWxlY3RcbiAgICogQHBhcmFtIGNvbnRyb2xcbiAgICovXG4gIGlzU2VsZWN0KGNvbnRyb2w6IGFueSkge1xuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgTWxrU2VsZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgdGV4dGFyZWFcbiAgICovXG4gIGlzVGV4dEFyZWEoY29udHJvbDogYW55KSB7XG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBNbGtUZXh0YXJlYTtcbiAgfVxuXG4gIHN1bW1hcnlGdW5jKGNlbGw6IGFueSkge1xuICAgIHJldHVybihgYCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBmb3JtYXQgZGF0ZSB0byBzdHJpbmcgeXl5eS1NTS1kZFxuICAgKiBAcGFyYW0gZGF0ZVxuICAgKi9cbiAgZ2V0Rm9ybWF0dGVkRGF0ZShkYXRlKSB7XG4gICAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICB2YXIgbW9udGggPSAoMSArIGRhdGUuZ2V0TW9udGgoKSkudG9TdHJpbmcoKTtcbiAgICBtb250aCA9IG1vbnRoLmxlbmd0aCA+IDEgPyBtb250aCA6ICcwJyArIG1vbnRoO1xuXG4gICAgdmFyIGRheSA9IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgZGF5ID0gZGF5Lmxlbmd0aCA+IDEgPyBkYXkgOiAnMCcgKyBkYXk7XG5cbiAgICByZXR1cm4geWVhciArICctJyArIG1vbnRoICsgJy0nICsgZGF5O1xuICB9XG5cbiAgZ2V0RmllbGRWYWx1ZShkYXRhOiBPYmplY3QsIGZpZWxkOiBhbnkpe1xuICAgIHZhciBrOiBBcnJheTxzdHJpbmc+ID0gZmllbGQuc3BsaXQoXCIuXCIpO1xuICAgIHZhciBrZXlzID0gbmV3IFF1ZXVlPHN0cmluZz4oLi4uayk7XG4gICAgbGV0IHZhbHVlID0gdGhpcy5nZXRPYmplY3RWYWx1ZShkYXRhLCBrZXlzKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBmaW5kIGtleSB2YWx1ZSBiYXNlZCBvbiB0aGUga2V5IHNlcXVlbmNlIHByb3ZpZGVkXG4gICAqIEBwYXJhbSBkYXRhIGV4cGVjdHMgYW4gb2JqZWN0XG4gICAqIEBwYXJhbSBrZXlzIGkuZS4gdXNlci5nZW5kZXIudHlwZS50eXBlXG4gICAqL1xuICBnZXRPYmplY3RWYWx1ZShkYXRhOiBhbnksIGtleXM6IFF1ZXVlPHN0cmluZz4pIHtcbiAgICBpZiAoKCEoZGF0YSBpbnN0YW5jZW9mIE9iamVjdCkpIHx8IChrZXlzLmxlbmd0aCA9PSAxKSkgIHtcbiAgICAgIHJldHVybiBkYXRhW2tleXMudGFpbF07XG4gICAgfVxuICAgIGxldCB2YWx1ZSA9IG51bGw7XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoKGtleSA9PSBrZXlzLmZyb250KSAmJiAoZGF0YVtrZXldIGluc3RhbmNlb2YgT2JqZWN0KSkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZ2V0T2JqZWN0VmFsdWUoZGF0YVtrZXldLCBrZXlzKTtcbiAgICAgIH0gZWxzZSBpZihrZXkgPT0ga2V5cy50YWlsKXtcbiAgICAgICAgdmFsdWUgPSBkYXRhW2tleV07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuXG4gIH1cblxufVxuLyoqXG4gKiBVc2VkIHRvIGRlZmluZSBkYXRhdGFibGUgY29sdW1ucyB3aXRoIGF0dHJpYnV0ZXMgKGNvbHVtbk5hbWUsIGZpZWxkTmFtZSwgd2lkdGgsIHNvcnRhYmxlLCBjYW5BdXRvUmVzaXplLFxuICogZHJhZ2dhYmxlLCByZXNpemFibGUsIGlzRGF0ZUNvbHVtbiwgaXNDdXJyZW5jeUNvbHVtbiwgY3VycmVuY3lUZXh0LCBzdW1tYXJ5RnVuYylcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNbGtEYXRhVGFibGVDb2x1bW4ge1xuICAvKipcbiAgICogY29sdW1uIHRpdGxlXG4gICAqL1xuICBjb2x1bW5OYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTZXJ2ZXIgc2lkZSByZXNwb25zZSBmaWVsZCBjb3JyZXNwb25kaW5nIHRvIHRoZSBjb2x1bW4gaS5lIGZ1bGxOYW1lIG1heSBjb3JyZXNwb25kIHRvIE5hbWUgY29sdW1uXG4gICAqL1xuICBmaWVsZE5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIFdpZHRoIG9mIHRoZSBjb2x1bW5cbiAgICovXG4gIHdpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogRW5hYmxlIHNvcnRpbmcgaW4gYSBjb2x1bW5cbiAgICovXG4gIHNvcnRhYmxlPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIE1ha2VzIGEgY29sdW1uIHJlc2l6YWJsZVxuICAgKi9cbiAgY2FuQXV0b1Jlc2l6ZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBFbmFibGVzIGEgY29sdW1uIHRvIGJlIGRyYWdnYWJsZVxuICAgKi9cbiAgZHJhZ2dhYmxlPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIE1ha2VzIGEgY29sdW1uIHJlc2l6YWJsZVxuICAgKi9cbiAgcmVzaXplYWJsZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBVc2VkIHRvIGVuYWJsZSBmb3JtYXRpbmcgdGltZXN0YW1wIHRvIHN0cmluZyBkYXRlXG4gICAqL1xuICBpc0RhdGVDb2x1bW4/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGVuYWJsZSBmb3JtYXRpbmcgc3RyaW5nIHRvIHN0cmluZyBjdXJyZW5jeVxuICAgKi9cbiAgaXNDdXJyZW5jeUNvbHVtbj86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gc2V0IHRoZSBjdXJyZW5jeSBzdHJpbmdcbiAgICovXG4gIGN1cnJlbmN5VGV4dD86IHN0cmluZztcblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gY2FsbCBhdCB0aGUgc3VtbWFyeSByb3dcbiAgICovXG4gIHN1bW1hcnlGdW5jPzogKGFueTogYW55W10pID0+IGFueTtcbn1cblxuLyoqXG4gKiBVc2VkIHRvIGRpc3BsYXkgbW9yZSBhY3Rpb25zIGNvbHVtbiBhbmQgdGhlIGVuZCBvZiB0aGUgdGFibGVcbiAqL1xuZXhwb3J0IGNsYXNzIE1sa01vcmVBY3Rpb25zIHtcbiAgLyoqXG4gICAqIEFjdGlvbiBDb2x1bW4gbmFtZSBlLmcuIE1vcmUgQWN0aW9uc1xuICAgKi9cbiAgbmFtZTogc3RyaW5nID0gXCJBY3Rpb25zXCI7XG4gIC8qKlxuICAgKiBGaWVsZCBuYW1lIGlkIGZyb20gdGhlIHNlcnZlciByZXNwb25zZSBlLmcgdXNlcklkXG4gICAqL1xuICBpZEZpZWxkTmFtZTogc3RyaW5nID0gXCJpZFwiO1xuICAvKipcbiAgICogQWN0aW9ucyBlLmcuIEVkaXQsIERlbGV0ZVxuICAgKi9cbiAgYWN0aW9uczogQXJyYXk8TWxrTW9yZUFjdGlvbkRhdGE+O1xuXG4gIGNvbnN0cnVjdG9yKGFjdGlvbnM6IEFycmF5PE1sa01vcmVBY3Rpb25EYXRhPiwgaWQ/OiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pZEZpZWxkTmFtZSA9IGlkO1xuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNbGtNb3JlQWN0aW9uRGF0YSB7XG4gIC8qKlxuICAgKiBOZXZlciBtaW5kIHRoaXMgZmllbGQgaXQgd2lsbCBiZSB1c2VkIGJ5IHRoZSBsaWJyYXJ5XG4gICAqL1xuICBpZD86IGFueTtcbiAgLyoqXG4gICAqIEFjdGlvbiBuYW1lIGUuZy4gRWRpdCwgRGVsZXRlXG4gICAqL1xuICBhY3Rpb25OYW1lOiBhbnk7XG5cbiAgLyoqXG4gICAqIEFjdGlvbiByb3cgOiB0aGUgY2xpY2tlZCByb3dcbiAgICovXG4gIGFjdGlvblJvdz86IGFueTtcbn0iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Rld2FyZENsaWVudENvbXBvbmVudCB9IGZyb20gJy4vc3Rld2FyZC1jbGllbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1sa0RhdGF0YWJsZUNvbXBvbmVudCB9IGZyb20gJy4vbWxrLWRhdGF0YWJsZS9tbGstZGF0YXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmd4RGF0YXRhYmxlTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU3Rld2FyZENvbmZpZyB9IGZyb20gJy4vc3Rld2FyZC1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJNb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2RhdGVwaWNrZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBOZ3hEYXRhdGFibGVNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEJzRGF0ZXBpY2tlck1vZHVsZS5mb3JSb290KCksXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtTdGV3YXJkQ2xpZW50Q29tcG9uZW50LCBNbGtEYXRhdGFibGVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbU3Rld2FyZENsaWVudENvbXBvbmVudCwgTWxrRGF0YXRhYmxlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ2xpZW50TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBTdGV3YXJkQ29uZmlnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTdGV3YXJkQ2xpZW50TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbIHtwcm92aWRlOiBTdGV3YXJkQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnfSBdXG4gICAgfVxuICB9XG4gfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7Ozs7Ozs7SUFBQTtLQWFDO0lBQUQsc0JBQUM7Q0FBQTs7Ozs7O0FDaEJEO0lBTUE7S0FJQztJQUFELG9CQUFDO0NBQUEsSUFBQTs7OztBQUVEO0lBT0ksOEJBQW9CLElBQWdCLEVBQUUsTUFBcUI7UUFBdkMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUZwQyxh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