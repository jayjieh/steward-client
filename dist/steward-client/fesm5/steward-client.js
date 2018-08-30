import { Injectable, Component, EventEmitter, Input, Output, ViewChild, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { __spread } from 'tslib';
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
var  /**
 * Wraps server response
 * @template T
 */
ResponseWrapper = /** @class */ (function () {
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
            //append access token if the environment has access token
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
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    StewardClientService.prototype.postFormData = /**
     * @param {?} endpoint
     * @param {?} data
     * @return {?}
     */
    function (endpoint, data) {
        /** @type {?} */
        var formData = new FormData();
        Object.keys(data).forEach(function (key) {
            formData.append(key, data[key]);
        });
        return this.http.post(this.base_url + endpoint, formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(catchError(this.handleError()));
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
    /** @nocollapse */
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
    /** @nocollapse */
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
var MlkDatatableComponent = /** @class */ (function () {
    function MlkDatatableComponent(sterwardService) {
        this.sterwardService = sterwardService;
        this.columns = [];
        this.enableCheckbox = true;
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
        group['from'] = new FormControl('', Validators.maxLength(100));
        group['to'] = new FormControl('', Validators.maxLength(100));
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
        /** @type {?} */
        var f = new Map(Object.entries(this.filterForm.value));
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
                    template: "<div class=\"card card-outline-default\">\n    <div class=\"card-body\">\n      <form (ngSubmit)=\"processFilter(filterForm)\" [formGroup]=\"filterForm\">\n        <div class=\"row\">\n          <div class=\"col-md-3  mb-3\" *ngFor=\"let control of filterComponents\">\n            <label for=\"from\">{{control.label}}: </label>\n            <div class=\"input-group\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text  form-icon-default\">\n                  <i [class]=\"control.icon\"></i>\n                </span>\n              </div>\n  \n              <select *ngIf=\"isSelect(control.controlType)\" class=\"form-control form-control-sm checking-field\" [formControlName]=\"control.name\">\n                <option value=\"\" disabled selected>{{control.placeholder}}</option>\n                <option *ngFor=\"let o of control.controlType.options\">{{o.text}}</option>\n              </select>\n  \n              <textarea *ngIf=\"isTextArea(control.controlType)\" [cols]=\"control.controlType.cols\" [rows]=\"control.controlType.rows\" class=\"form-control form-control-sm checking-field\"\n                [placeholder]=\"control.placeholder\" [formControlName]=\"control.name\"></textarea>\n  \n              <input *ngIf=\"isInput(control.controlType)\" [type]=\"control.controlType.type\" [placeholder]=\"control.placeholder\" class=\"form-control form-control-sm checking-field\"\n                [formControlName]=\"control.name\" />\n            </div>\n            <span class=\"help-block\" *ngIf=\"filterForm.get(control.name).touched\">\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}} is required</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of {{control.controlType.minLength}} characters</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of {{control.controlType.maxLength}} characters</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('min')\">Should be greater than {{control.controlType.min}}</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('max')\">Should be less than {{control.controlType.max}}</span>\n            </span>\n          </div>\n          <div class=\"col-md-3  mb-3\">\n            <label for=\"from\">From: </label>\n            <div class=\"input-group\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text  form-icon-default\">\n                  <i class=\"fa fa-calendar-o\"></i>\n                </span>\n              </div>\n              <input type=\"date\" placeholder=\"From...\" class=\"form-control form-control-sm checking-field\"\n                formControlName=\"from\" />\n            </div>\n            <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n                <span class=\"text-danger\" *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 100 characters</span>\n            </span>\n          </div>\n          <div class=\"col-md-3  mb-3\">\n            <label for=\"from\">To: </label>\n            <div class=\"input-group\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text  form-icon-default\">\n                  <i class=\"fa fa-calendar-o\"></i>\n                </span>\n              </div>\n              <input type=\"date\" placeholder=\"To...\" class=\"form-control form-control-sm checking-field\"\n                formControlName=\"to\" value=\"\" />\n            </div>\n            <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n                <span class=\"text-danger\" *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 100 characters</span>\n            </span>\n          </div>\n          <div class=\"col-md-3 mb-3\">\n            <label for=\"search\">Search:</label>\n            <div class=\"input-group\">\n              <div class=\"input-group-prepend\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-search\"></i>\n                </span>\n              </div>\n              <input formControlName=\"needle\" class=\"form-control form-control-sm checking-field\" type=\"text\"\n                placeholder=\"Search...\" (keyup)=\"updateFilter($event)\" />\n            </div>\n          </div>\n          <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n              <span class=\"text-danger\" *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 200 characters</span>\n          </span>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div class=\"pull-right inline-buttons\">\n              <button class=\"btn btn-secondary btn-sm\" type=\"reset\">\n                <i class=\"fa fa-repeat\" aria-hidden=\"true\"></i>\n                Reset\n              </button>\n              <button class=\"btn btn-primary btn-sm pull-right\" type=\"submit\">\n                <i class=\"fa fa-sort-amount-asc\" aria-hidden=\"true\"></i>\n                Filter\n              </button>\n            </div>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n  \n  <ngx-datatable #table class=\"bootstrap\" [headerHeight]=\"50\" [columnMode]=\"'force'\" [footerHeight]=\"50\" [rowHeight]=\"'auto'\"\n    [rows]=\"page.content\" [selected]=\"selected\" [selectionType]=\"'checkbox'\" (activate)=\"onActivate($event)\" (select)='onSelect($event)'\n    [count]=\"page.totalElements\" [offset]=\"page.number\" [externalPaging]=\"true\" [limit]=\"page.size\" (page)=\"loadPage($event, null)\">\n    <ngx-datatable-column [width]=\"30\" [sortable]=\"false\" [canAutoResize]=\"false\" [draggable]=\"true\" [resizeable]=\"false\" [headerCheckboxable]=\"true\"\n      [checkboxable]=\"true\" *ngIf=\"enableCheckbox\">\n    </ngx-datatable-column>\n    <ngx-datatable-column [canAutoResize]=\"(c.canAutoResize) ? c.canAutoResize : true\" [name]=\"c.columnName\" [width]=\"c.width\"\n      [sortable]=\"(c.sortable) ? c.sortable : true\" [draggable]=\"(c.draggable) ? c.draggable : true\" [resizeable]=\"(c.resizeable) ? c.resizeable : true\"\n      *ngFor=\"let c of columns\">\n      <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n        <span>\n            {{(c.isDateColumn)? (getFieldValue(row, c.fieldName) | date:'medium') : getFieldValue(row, c.fieldName)}}\n        </span>\n      </ng-template>\n    </ngx-datatable-column>\n    <ngx-datatable-column [name]=\"moreActions.name\" *ngIf=\"moreActions\" [sortable]=\"false\" [canAutoResize]=\"false\">\n      <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n        <span>\n          <div class=\"input-group-prepend\">\n            <button class=\"btn btn-sm btn-outline-secondary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\n              aria-expanded=\"false\">\n              <i class=\"fa fa-list-ul\" aria-hidden=\"true\"></i>\n            </button>\n            <div class=\"dropdown-menu\">\n              <a class=\"dropdown-item\" *ngFor=\"let action of moreActions.actions\" href=\"javascript:;\" (click)=\"onActionClick({id: row[moreActions.idFieldName], actionName: action.actionName})\">{{action.actionName}}</a>\n              <!-- <a class=\"dropdown-item\" href=\"#\">Another action</a>\n                            <a class=\"dropdown-item\" href=\"#\">Something else here</a>\n                            <div role=\"separator\" class=\"dropdown-divider\"></div>\n                            <a class=\"dropdown-item\" href=\"#\">Separated link</a> -->\n            </div>\n          </div>\n        </span>\n      </ng-template>\n    </ngx-datatable-column>\n    <!-- <ngx-datatable-column name=\"Description\">\n              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n                <span>\n                  {{value}}\n                </span>\n              </ng-template>\n            </ngx-datatable-column>\n            <ngx-datatable-column name=\"Actions\">\n              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n                <span>\n                  {{value}}\n                </span>\n              </ng-template>\n            </ngx-datatable-column> -->\n  </ngx-datatable>",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    MlkDatatableComponent.ctorParameters = function () { return [
        { type: StewardClientService }
    ]; };
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQuanMubWFwIiwic291cmNlcyI6WyJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy93cmFwcGVycy9yZXNwb25zZS13cmFwcGVyLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvc3Rld2FyZC1jbGllbnQuc2VydmljZS50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50LmNvbXBvbmVudC50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy93cmFwcGVycy9tbGstZHluYW1pYy1jb250cm9sLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvbWxrLWRhdGF0YWJsZS9tbGstZGF0YXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogV3JhcHMgc2VydmVyIHJlc3BvbnNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVzcG9uc2VXcmFwcGVyPFQ+IHtcclxuICAgIC8qKlxyXG4gICAgICogSHR0cCBzdGF0dXMgY29kZSBlLmcuIDIwMFxyXG4gICAgICovXHJcbiAgICBjb2RlOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFNlcnZlciBtZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogQWN0dWFsIHJlc3BvbnNlIGRhdGFcclxuICAgICAqL1xyXG4gICAgZGF0YTogVDtcclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cEVycm9yUmVzcG9uc2UsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBSZXNwb25zZVdyYXBwZXIgfSBmcm9tICcuL2VudGl0aWVzL3dyYXBwZXJzL3Jlc3BvbnNlLXdyYXBwZXInO1xuXG5leHBvcnQgY2xhc3MgU3Rld2FyZENvbmZpZyB7XG4gICAgYmFzZV91cmw6IHN0cmluZztcbiAgICBhY2Nlc3NfdG9rZW4/OiBzdHJpbmc7XG4gICAgaGVhZGVycz86IEh0dHBIZWFkZXJzO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudFNlcnZpY2U8VCwgRT4ge1xuXG4gICAgcHJpdmF0ZSBoZWFkZXJzOiBIdHRwSGVhZGVycztcbiAgICB0b2tlbjogc3RyaW5nO1xuICAgIGJhc2VfdXJsOiBzdHJpbmcgPSBcIi9cIjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgY29uZmlnOiBTdGV3YXJkQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuYmFzZV91cmwgPSBjb25maWcuYmFzZV91cmw7XG4gICAgICAgIGlmIChjb25maWcuaGVhZGVycykge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnLmFjY2Vzc190b2tlbikgey8vYXBwZW5kIGFjY2VzcyB0b2tlbiBpZiB0aGUgZW52aXJvbm1lbnQgaGFzIGFjY2VzcyB0b2tlblxuICAgICAgICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5oZWFkZXJzLmFwcGVuZCgnQXV0aG9yaXphdGlvbicsIFwiQmVhcmVyIFwiICsgY29uZmlnLmFjY2Vzc190b2tlbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBoYW5kbGUgaHR0cCBwb3N0IHJlcXVlc3RzXG4gICAgICovXG4gICAgcG9zdChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgSlNPTi5zdHJpbmdpZnkoZGF0YSksIHsgaGVhZGVyczogdGhpcy5oZWFkZXJzIH0pLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gaGFuZGxlIGh0dHAgcG9zdCByZXF1ZXN0c1xuICAgICAqL1xuICAgIHB1dChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBKU09OLnN0cmluZ2lmeShkYXRhKSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSkucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZGVsZXRlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3QoJ2RlbGV0ZScsIHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpIH0pLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGdldChlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMuZ2V0SHR0cFBhcmFtcyhkYXRhKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIG9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cblxuXG4gICAgZ2V0RmlsZShlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMuZ2V0SHR0cFBhcmFtcyhkYXRhKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQgKyAnP2FjY2Vzc190b2tlbj0nICsgdGhpcy50b2tlbiwgb3B0aW9ucykucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcG9zdEZvcm1EYXRhKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgZm9ybURhdGEsIHsgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuIH0pIH0pLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHBvc3RGb3JtRGF0YU11bHRpcGFydChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICAgICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSkge1xuICAgICAgICAgICAgICAgIGRhdGFba2V5XS5mb3JFYWNoKGsyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgazIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgZm9ybURhdGEsIHsgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuIH0pIH0pLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1dEZvcm1EYXRhTXVsdGlQYXJ0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgZGF0YVtrZXldLmZvckVhY2goazIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBrMik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIGZvcm1EYXRhLCB7IGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7ICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy50b2tlbiB9KSB9KS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEh0dHBQYXJhbXMoZGF0YTogTWFwPHN0cmluZywgc3RyaW5nPik6IEh0dHBQYXJhbXMge1xuICAgICAgICBpZiAoZGF0YSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBodHRwUGFyYW1zOiBIdHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgZGF0YS5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gY2F0Y2ggZXhjZXB0aW9uIHRocm93biBieSBodHRwIGNsaWVudCByZXR1cm5zIGludGVybmFsIHNlcnZlciBlcnJvclxuICAgICAqIGlmIHN0YXR1cyA1MDAgaXMgZW5jb3VudGVyZWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGhhbmRsZUVycm9yPFJlc3BvbnNlV3JhcHBlcj4oKSB7XG4gICAgICAgIHJldHVybiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IG5ldyBSZXNwb25zZVdyYXBwZXIoKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7IC8vIGxvZyB0byBjb25zb2xlIGluc3RlYWRcbiAgICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT0gNTAwKSB7XG4gICAgICAgICAgICAgICAgcmVzLmNvZGUgPSBlcnJvci5zdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzLm1lc3NhZ2UgPSAnU29ycnkgaW50ZXJuYWwgc2VydmVyIGVycm9yIG9jY3VyZWQgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlcic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcy5jb2RlID0gZXJyb3Iuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlcy5tZXNzYWdlID0gZXJyb3IuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgICAgICByZXMuZGF0YSA9IGVycm9yLmVycm9yLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2YocmVzKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlZCB0byByZW5kZXIgYWN0aW9uIGJ1dHRvbnNcbiAgICAgKi9cbiAgICBzdGF0aWMgcmVuZGVyTW9yZShpZDogYW55KSB7XG4gICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cXCdhY3Rpb25zLWJ1dHRvbnMgY2VudGVyXFwnIGlkPVxcJycgKyBpZCArICdcXCc+PGkgY2xhc3M9XFwnZmEgZmEtY2hlY2tcXCcgdGl0bGU9XFwnQXBwcm92ZVxcJz48L2k+IDxpIGNsYXNzPVxcJ2ZhIGZhLWJhblxcJyB0aXRsZT1cXCdEZWNsaW5lXFwnPjwvaT48L2Rpdj4nO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbnRpYXRlRGF0YVRhYmxlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMuZ2V0SHR0cFBhcmFtcyhkYXRhKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIG9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N0dy1zdGV3YXJkLWNsaWVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBzdGV3YXJkLWNsaWVudCB3b3JrcyFcbiAgICA8L3A+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCIvKipcclxuICogRGF0YWJsZSBwYWdlIHVzZWQgdG8gd3JhcHBlciBzZXJ2ZXIgY29udGVudCByZXNwb25zZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFBhZ2U8VD4ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBOdW1iZXIgb2YgaXRlbXMgcGVyIHBhZ2Ugc2FtZSBhcyBsaW1pdFxyXG4gICAgICovXHJcbiAgICBzaXplOiBudW1iZXIgPSAxMDtcclxuICAgIC8qKlxyXG4gICAgICogVG90YWwgaXRlbXMgYXZhaWxhYmxlIG9uIHRoZSBzZXJ2ZXJcclxuICAgICAqL1xyXG4gICAgdG90YWxFbGVtZW50czogbnVtYmVyID0gMDtcclxuICAgIC8qKlxyXG4gICAgICogVG90YWwgbnVtYmVyIG9mIHBhZ2VzIHByZXNlbnRcclxuICAgICAqL1xyXG4gICAgdG90YWxQYWdlczogbnVtYmVyID0gMDtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGlzIHRoZSBmaXJzdCBwYWdlXHJcbiAgICAgKi9cclxuICAgIGZpcnN0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGl0IGlzIHRoZSBsYXN0IHBhZ2VcclxuICAgICAqL1xyXG4gICAgbGFzdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgYWN0dWFsIHBhZ2UgY29udGVudFxyXG4gICAgICovXHJcbiAgICBjb250ZW50OiBBcnJheTxUPiA9IFtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIG1hcCBzb3J0IHBhcmFtZXRlcnNcclxuICAgICAqL1xyXG4gICAgc29ydGVkOiBTb3J0ID0gbmV3IFNvcnQoKTtcclxuICAgIC8qKlxyXG4gICAgICogQ3VycmVudCBwYWdlIG51bWJlclxyXG4gICAgICovXHJcbiAgICBudW1iZXI6IG51bWJlciA9IDA7XHJcbn1cclxuLyoqXHJcbiAqIHVzZWQgdG8gbWFwIHNvcnQgcmVxdWVzdFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNvcnR7XHJcbiAgICBzb3J0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHVuc29ydGVkOiBib29sZWFuID0gdHJ1ZTtcclxufVxyXG4iLCIvKipcbiAqIFJlcHJlc2VudHMgZHluYW1pYyBodG1sIGNvbnRyb2xzIChJbnB1dCwgVGV4dEFyZWEgYW5kIFNlbGVjdClcbiAqL1xuZXhwb3J0IGNsYXNzIE1sa0R5bmFtaWNDb250cm9sPFQ+IHtcbiAgICAvKipcbiAgICAgKiBDb250cm9sIGxhYmVsXG4gICAgICovXG4gICAgbGFiZWw6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBJY29uIHRvIGJlIGFwcGVuZGVkIGJlZm9yZSB0aGUgY29udHJvbCAoc3VwcG9ydHMgY2xhc3MgZGVmaW5lZCBpY29ucylcbiAgICAgKi9cbiAgICBpY29uOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgY29udHJvbCAocHJvdmlkZSB2YXJpYWJsZSB2YWxpZCBuYW1lcyBpZS4gbm8gc3BhY2VzIHByZWZhcmFibHkgYXBpIGNvcnJlc3BvbmRpbmcgbmFtZXMgZS5nLiB1c2VyTmFtZSlcbiAgICAgKi9cbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogVGhlIGFjdHVhbCBjb250cm9sIChNbGtJbnB1dCwgTWxrVGV4dEFyZWEgJiBNbGtTZWxlY3QpXG4gICAgICovXG4gICAgY29udHJvbFR5cGU6IFQ7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBmaWVsZCBpcyByZXF1aXJlZFxuICAgICAqL1xuICAgIGlzUmVxdWlyZWQ6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogQ29udHJvbCBwbGFjZWhvbGRlclxuICAgICAqL1xuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgY29uc3RydWN0b3IobGFiZWw6IHN0cmluZywgbmFtZTogc3RyaW5nLCBjb250cm9sVHlwZTogVCwgaWNvbjogc3RyaW5nID0gXCJmYSBmYS1maWxlLXRleHQtb1wiLFxuICAgICAgICBpc1JlcXVpcmVkOiBib29sZWFuID0gdHJ1ZSwgcGxhY2Vob2xkZXI6IHN0cmluZyA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gY29udHJvbFR5cGU7XG4gICAgICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgICAgIHRoaXMuaXNSZXF1aXJlZCA9IGlzUmVxdWlyZWQ7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlciA/IHBsYWNlaG9sZGVyIDogbGFiZWw7XG4gICAgfVxuXG59XG4vKipcbiAqIFVzZWQgdG8gcmVwcmVzZW50IGh0bWwgaW5wdXQgd2l0aCBvcHRpb25zOlxuICogdHlwZTogZGVmYXVsdCB0byB0ZXh0LCAgbWF4TGVuZ3RoLCBtaW5MZW5ndGgsIG1pbiwgbWF4XG4gKi9cbmV4cG9ydCBjbGFzcyBNbGtJbnB1dHtcbiAgICAvKipcbiAgICAgKiBUeXBlIG9mIGlucHV0IGUuZy4gdGV4dCwgbnVtYmVyLCBkYXRlXG4gICAgICovXG4gICAgdHlwZTogc3RyaW5nID0gXCJ0ZXh0XCI7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBsZW5ndGggb2YgdGhlIGlucHV0XG4gICAgICovXG4gICAgbWF4TGVuZ3RoOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBtaW5pbXVtIGlucHV0IGxlbmd0aFxuICAgICAqL1xuICAgIG1pbkxlbmd0aDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgbnVtYmVyIGlucHV0c1xuICAgICAqL1xuICAgIG1pbjogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgbnVtYmVyIGlucHV0c1xuICAgICAqL1xuICAgIG1heDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nID0gXCJ0ZXh0XCIpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5taW5MZW5ndGggPSB0aGlzLm1pbiA9IDA7XG4gICAgICAgIHRoaXMubWF4TGVuZ3RoID0gNDAwMDtcbiAgICAgICAgdGhpcy5tYXggPSAxMDAwMDAwMDAwO1xuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGh0bWwgdGV4dGFyZWEgaW5wdXRcbiAqL1xuZXhwb3J0IGNsYXNzIE1sa1RleHRhcmVhe1xuICAgIC8qKlxuICAgICAqIE51bWJlciB0ZXh0YXJlYSBjb2x1bW5zXG4gICAgICovXG4gICAgY29scz86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBOdW1iZXIgb2YgdGV4dGFyZWEgcm93c1xuICAgICAqL1xuICAgIHJvd3M/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgbWF4aW11bSBpbnB1dCBsZW5ndGhcbiAgICAgKi9cbiAgICBtYXhMZW5ndGg6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBtaW5pbXVtIGlucHV0IGxlbmd0aFxuICAgICAqL1xuICAgIG1pbkxlbmd0aDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoY29sczogbnVtYmVyID0gNSwgcm93czogbnVtYmVyID0gMSl7XG4gICAgICAgIHRoaXMuY29scyA9IGNvbHM7XG4gICAgICAgIHRoaXMucm93cyA9IHJvd3M7XG4gICAgICAgIHRoaXMubWF4TGVuZ3RoID0gNDAwMDtcbiAgICAgICAgdGhpcy5taW5MZW5ndGggPSAwXG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgaHRtbCBzZWxlY3QgY29udHJvbFxuICovXG5leHBvcnQgY2xhc3MgTWxrU2VsZWN0IHtcbiAgICAvKipcbiAgICAgKiBTZWxlY3Qgb3B0aW9uc1xuICAgICAqL1xuICAgIG9wdGlvbnM6IEFycmF5PE1sa1NlbGVjdE9wdGlvbj47XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBBcnJheTxNbGtTZWxlY3RPcHRpb24+KXtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIE1sa1NlbGVjdE9wdGlvbntcbiAgICAvKipcbiAgICAgKiBPcHRpb24gdmFsdWVcbiAgICAgKi9cbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIE9wdGlvbiB0ZXh0L2xhYmVsXG4gICAgICovXG4gICAgdGV4dDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IodmFsdWU6IHN0cmluZywgdGV4dDogc3RyaW5nID0gbnVsbCl7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dCA/IHRleHQgOiB2YWx1ZTtcbiAgICB9XG5cbn1cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0Zvcm0sIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcGFnZSc7XG5pbXBvcnQgeyBNbGtEeW5hbWljQ29udHJvbCwgTWxrSW5wdXQsIE1sa1RleHRhcmVhLCBNbGtTZWxlY3QgfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9tbGstZHluYW1pYy1jb250cm9sJztcbmltcG9ydCB7IFJlc3BvbnNlV3JhcHBlciB9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL3Jlc3BvbnNlLXdyYXBwZXInO1xuaW1wb3J0IHsgU3Rld2FyZENsaWVudFNlcnZpY2UgfSBmcm9tICcuLi9zdGV3YXJkLWNsaWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGF0YWJsZUNvbXBvbmVudCB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcbmltcG9ydCB7IFF1ZXVlIH0gZnJvbSAncXVldWUtdHlwZXNjcmlwdCc7XG4vL2NvbnN0IHsgUXVldWUgfSA9IHJlcXVpcmUoJ3F1ZXVlLXR5cGVzY3JpcHQnKTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3R3LW1say1kYXRhdGFibGUnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjYXJkIGNhcmQtb3V0bGluZS1kZWZhdWx0XCI+XG4gICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgPGZvcm0gKG5nU3VibWl0KT1cInByb2Nlc3NGaWx0ZXIoZmlsdGVyRm9ybSlcIiBbZm9ybUdyb3VwXT1cImZpbHRlckZvcm1cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyAgbWItM1wiICpuZ0Zvcj1cImxldCBjb250cm9sIG9mIGZpbHRlckNvbXBvbmVudHNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmcm9tXCI+e3tjb250cm9sLmxhYmVsfX06IDwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCAgZm9ybS1pY29uLWRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgIDxpIFtjbGFzc109XCJjb250cm9sLmljb25cIj48L2k+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgXG4gICAgICAgICAgICAgIDxzZWxlY3QgKm5nSWY9XCJpc1NlbGVjdChjb250cm9sLmNvbnRyb2xUeXBlKVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkIHNlbGVjdGVkPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgbyBvZiBjb250cm9sLmNvbnRyb2xUeXBlLm9wdGlvbnNcIj57e28udGV4dH19PC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICBcbiAgICAgICAgICAgICAgPHRleHRhcmVhICpuZ0lmPVwiaXNUZXh0QXJlYShjb250cm9sLmNvbnRyb2xUeXBlKVwiIFtjb2xzXT1cImNvbnRyb2wuY29udHJvbFR5cGUuY29sc1wiIFtyb3dzXT1cImNvbnRyb2wuY29udHJvbFR5cGUucm93c1wiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXG4gICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiPjwvdGV4dGFyZWE+XG4gIFxuICAgICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJpc0lucHV0KGNvbnRyb2wuY29udHJvbFR5cGUpXCIgW3R5cGVdPVwiY29udHJvbC5jb250cm9sVHlwZS50eXBlXCIgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxuICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLnRvdWNoZWRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcigncmVxdWlyZWQnKVwiPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19IGlzIHJlcXVpcmVkPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtaW5sZW5ndGgnKVwiPk1pbmltdW0gb2Yge3tjb250cm9sLmNvbnRyb2xUeXBlLm1pbkxlbmd0aH19IGNoYXJhY3RlcnM8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiB7e2NvbnRyb2wuY29udHJvbFR5cGUubWF4TGVuZ3RofX0gY2hhcmFjdGVyczwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWluJylcIj5TaG91bGQgYmUgZ3JlYXRlciB0aGFuIHt7Y29udHJvbC5jb250cm9sVHlwZS5taW59fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWF4JylcIj5TaG91bGQgYmUgbGVzcyB0aGFuIHt7Y29udHJvbC5jb250cm9sVHlwZS5tYXh9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgIG1iLTNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmcm9tXCI+RnJvbTogPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0ICBmb3JtLWljb24tZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhci1vXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIHBsYWNlaG9sZGVyPVwiRnJvbS4uLlwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwiZnJvbVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS50b3VjaGVkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDEwMCBjaGFyYWN0ZXJzPC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyAgbWItM1wiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZyb21cIj5UbzogPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0ICBmb3JtLWljb24tZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhci1vXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIHBsYWNlaG9sZGVyPVwiVG8uLi5cIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxuICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInRvXCIgdmFsdWU9XCJcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykudG91Y2hlZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiAxMDAgY2hhcmFjdGVyczwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgbWItM1wiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInNlYXJjaFwiPlNlYXJjaDo8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IGZvcm0taWNvbi1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXNlYXJjaFwiPjwvaT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwibmVlZGxlXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCIgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCIgKGtleXVwKT1cInVwZGF0ZUZpbHRlcigkZXZlbnQpXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS50b3VjaGVkXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiAyMDAgY2hhcmFjdGVyczwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInB1bGwtcmlnaHQgaW5saW5lLWJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiIHR5cGU9XCJyZXNldFwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcmVwZWF0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICAgIFJlc2V0XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbSBwdWxsLXJpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtc29ydC1hbW91bnQtYXNjXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICAgIEZpbHRlclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIFxuICA8bmd4LWRhdGF0YWJsZSAjdGFibGUgY2xhc3M9XCJib290c3RyYXBcIiBbaGVhZGVySGVpZ2h0XT1cIjUwXCIgW2NvbHVtbk1vZGVdPVwiJ2ZvcmNlJ1wiIFtmb290ZXJIZWlnaHRdPVwiNTBcIiBbcm93SGVpZ2h0XT1cIidhdXRvJ1wiXG4gICAgW3Jvd3NdPVwicGFnZS5jb250ZW50XCIgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCIgW3NlbGVjdGlvblR5cGVdPVwiJ2NoZWNrYm94J1wiIChhY3RpdmF0ZSk9XCJvbkFjdGl2YXRlKCRldmVudClcIiAoc2VsZWN0KT0nb25TZWxlY3QoJGV2ZW50KSdcbiAgICBbY291bnRdPVwicGFnZS50b3RhbEVsZW1lbnRzXCIgW29mZnNldF09XCJwYWdlLm51bWJlclwiIFtleHRlcm5hbFBhZ2luZ109XCJ0cnVlXCIgW2xpbWl0XT1cInBhZ2Uuc2l6ZVwiIChwYWdlKT1cImxvYWRQYWdlKCRldmVudCwgbnVsbClcIj5cbiAgICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gW3dpZHRoXT1cIjMwXCIgW3NvcnRhYmxlXT1cImZhbHNlXCIgW2NhbkF1dG9SZXNpemVdPVwiZmFsc2VcIiBbZHJhZ2dhYmxlXT1cInRydWVcIiBbcmVzaXplYWJsZV09XCJmYWxzZVwiIFtoZWFkZXJDaGVja2JveGFibGVdPVwidHJ1ZVwiXG4gICAgICBbY2hlY2tib3hhYmxlXT1cInRydWVcIiAqbmdJZj1cImVuYWJsZUNoZWNrYm94XCI+XG4gICAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cbiAgICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gW2NhbkF1dG9SZXNpemVdPVwiKGMuY2FuQXV0b1Jlc2l6ZSkgPyBjLmNhbkF1dG9SZXNpemUgOiB0cnVlXCIgW25hbWVdPVwiYy5jb2x1bW5OYW1lXCIgW3dpZHRoXT1cImMud2lkdGhcIlxuICAgICAgW3NvcnRhYmxlXT1cIihjLnNvcnRhYmxlKSA/IGMuc29ydGFibGUgOiB0cnVlXCIgW2RyYWdnYWJsZV09XCIoYy5kcmFnZ2FibGUpID8gYy5kcmFnZ2FibGUgOiB0cnVlXCIgW3Jlc2l6ZWFibGVdPVwiKGMucmVzaXplYWJsZSkgPyBjLnJlc2l6ZWFibGUgOiB0cnVlXCJcbiAgICAgICpuZ0Zvcj1cImxldCBjIG9mIGNvbHVtbnNcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtdmFsdWU9XCJ2YWx1ZVwiIGxldC1yb3c9XCJyb3dcIj5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICB7eyhjLmlzRGF0ZUNvbHVtbik/IChnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpIHwgZGF0ZTonbWVkaXVtJykgOiBnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpfX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxuICAgIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBbbmFtZV09XCJtb3JlQWN0aW9ucy5uYW1lXCIgKm5nSWY9XCJtb3JlQWN0aW9uc1wiIFtzb3J0YWJsZV09XCJmYWxzZVwiIFtjYW5BdXRvUmVzaXplXT1cImZhbHNlXCI+XG4gICAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXZhbHVlPVwidmFsdWVcIiBsZXQtcm93PVwicm93XCI+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1zZWNvbmRhcnkgZHJvcGRvd24tdG9nZ2xlXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWxpc3QtdWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+XG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgbW9yZUFjdGlvbnMuYWN0aW9uc1wiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiAoY2xpY2spPVwib25BY3Rpb25DbGljayh7aWQ6IHJvd1ttb3JlQWN0aW9ucy5pZEZpZWxkTmFtZV0sIGFjdGlvbk5hbWU6IGFjdGlvbi5hY3Rpb25OYW1lfSlcIj57e2FjdGlvbi5hY3Rpb25OYW1lfX08L2E+XG4gICAgICAgICAgICAgIDwhLS0gPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgaHJlZj1cIiNcIj5Bbm90aGVyIGFjdGlvbjwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiI1wiPlNvbWV0aGluZyBlbHNlIGhlcmU8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiByb2xlPVwic2VwYXJhdG9yXCIgY2xhc3M9XCJkcm9wZG93bi1kaXZpZGVyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgaHJlZj1cIiNcIj5TZXBhcmF0ZWQgbGluazwvYT4gLS0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxuICAgIDwhLS0gPG5neC1kYXRhdGFibGUtY29sdW1uIG5hbWU9XCJEZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXZhbHVlPVwidmFsdWVcIiBsZXQtcm93PVwicm93XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICB7e3ZhbHVlfX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxuICAgICAgICAgICAgPG5neC1kYXRhdGFibGUtY29sdW1uIG5hbWU9XCJBY3Rpb25zXCI+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtdmFsdWU9XCJ2YWx1ZVwiIGxldC1yb3c9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgIHt7dmFsdWV9fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+IC0tPlxuICA8L25neC1kYXRhdGFibGU+YCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIE1sa0RhdGF0YWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGNvbHVtbnM6IEFycmF5PE1sa0RhdGFUYWJsZUNvbHVtbj4gPSBbXTtcbiAgQElucHV0KCkgZW5hYmxlQ2hlY2tib3g6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBlbmRwb2ludDogc3RyaW5nO1xuICBASW5wdXQoKSBtb3JlQWN0aW9uczogTWxrTW9yZUFjdGlvbnM7XG4gIEBPdXRwdXQoKSBvbkFjdGlvbnNFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8TWxrTW9yZUFjdGlvbkRhdGE+KClcbiAgQElucHV0KCkgZmlsdGVyQ29tcG9uZW50czogQXJyYXk8TWxrRHluYW1pY0NvbnRyb2w8YW55Pj4gPSBbXTtcbiAgQElucHV0KCkgcGFyYW1zOiBNYXA8c3RyaW5nLCBhbnk+O1xuICBwYWdlOiBQYWdlPGFueT4gPSBuZXcgUGFnZSgpO1xuICBzZWxlY3RlZCA9IFtdO1xuICBAVmlld0NoaWxkKERhdGF0YWJsZUNvbXBvbmVudCkgdGFibGU6IERhdGF0YWJsZUNvbXBvbmVudDtcbiAgZmlsdGVyOiBPYmplY3QgPSB7fTtcbiAgZmlsdGVyRm9ybTogRm9ybUdyb3VwO1xuICA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdGVyd2FyZFNlcnZpY2U6IFN0ZXdhcmRDbGllbnRTZXJ2aWNlPFJlc3BvbnNlV3JhcHBlcjxQYWdlPGFueT4+LCBhbnk+KSB7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgZm9ybSBjb250cm9sIGZyb20gZmlsdGVyQ29tcG9uZW50cyBhbmQgYWxzbyBhcHBlbmRpbmcgZGVmYXVsdCBjb250cm9scyBpZS4gZGF0ZSBmaWx0ZXIgYW5kIHNlYXJjaCBjb250cm9sc1xuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgbGV0IGdyb3VwID0ge307XG4gICAgdGhpcy5maWx0ZXJDb21wb25lbnRzLmZvckVhY2goY29tcCA9PiB7XG4gICAgICBsZXQgdmFsaWRhdG9yczogQXJyYXk8YW55PiA9IFtdO1xuICAgICAgaWYgKGNvbXAuaXNSZXF1aXJlZCkge1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgICB9XG5cbiAgICAgIGlmKGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBNbGtJbnB1dCB8fCBjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgTWxrVGV4dGFyZWEpe1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW5MZW5ndGgoY29tcC5jb250cm9sVHlwZS5taW5MZW5ndGgpKTtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4TGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWF4TGVuZ3RoKSk7XG4gICAgICB9XG5cbiAgICAgIGlmKGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBNbGtJbnB1dCl7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heChjb21wLmNvbnRyb2xUeXBlLm1heCkpO1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW4oY29tcC5jb250cm9sVHlwZS5taW4pKTtcbiAgICAgIH1cbiAgICAgIGdyb3VwW2NvbXAubmFtZV0gPSBuZXcgRm9ybUNvbnRyb2woJycsIHZhbGlkYXRvcnMpXG4gICAgfSk7XG4gICAgLy9hZGQgZGVmYXVsdCBjb250cm9sc1xuICAgIGdyb3VwWydmcm9tJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDEwMCkpO1xuICAgIGdyb3VwWyd0byddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgxMDApKTtcbiAgICBncm91cFsnbmVlZGxlJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDIwMCkpO1xuICAgIHRoaXMuZmlsdGVyRm9ybSA9IG5ldyBGb3JtR3JvdXAoZ3JvdXApO1xuICAgIHRoaXMubG9hZFBhZ2UoeyBvZmZzZXQ6IDAsIGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZSB9LCBudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGVtaXQgY2xpY2sgZXZlbnQgb2YgdGhlIGFjdGlvbnNcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBvbkFjdGlvbkNsaWNrKGV2ZW50OiBNbGtNb3JlQWN0aW9uRGF0YSkge1xuICAgIHRoaXMub25BY3Rpb25zRXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyBzZXJ2ZXIgcmVxdWVzdCBvZiBkYXRhYmxlXG4gICAqIEBwYXJhbSBwYWdlSW5mb1xuICAgKiBAcGFyYW0gZmlsdGVyc1xuICAgKi9cbiAgbG9hZFBhZ2UocGFnZUluZm8sIGZpbHRlcnMpIHtcbiAgICBpZiAoIXRoaXMuZW5kcG9pbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHJlcXVlc3Q6IE1hcDxzdHJpbmcsIGFueT47XG4gICAgaWYgKGZpbHRlcnMpIHtcbiAgICAgIHJlcXVlc3QgPSBmaWx0ZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBpZih0aGlzLnBhcmFtcyl7XG4gICAgICB0aGlzLnBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KT0+e1xuICAgICAgICByZXF1ZXN0LnNldChrZXksIHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXF1ZXN0LnNldChcInBhZ2VcIiwgcGFnZUluZm8ub2Zmc2V0KTtcbiAgICByZXF1ZXN0LnNldChcInNpemVcIiwgcGFnZUluZm8ubGltaXQpO1xuICAgIHRoaXMuc3RlcndhcmRTZXJ2aWNlLmdldCh0aGlzLmVuZHBvaW50LCByZXF1ZXN0KS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLmNvZGUgPT0gMjAwKSB7XG4gICAgICAgIHRoaXMucGFnZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGhhbmRsZSBzZWxlY3Qgb3B0aW9uXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgb25TZWxlY3QoZXZlbnQpIHtcblxuICB9XG5cbiAgb25BY3RpdmF0ZShldmVudCkge1xuXG4gIH1cblxuICB1cGRhdGVGaWx0ZXIoZXZlbnQpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gcHJvY2VzcyB0YWJsZSBmaWx0ZXIuIElmIGRhdGUgZmlsdGVyIGlzIG5vdCBwcm92aWRlIHRoZSBmcm9tIHZhbHVlIGlzIFxuICAgKiBzZXQgdG8gMjAxOC0wMS0wMSBhbmQgdG8gdmFsdWUgaXMgc2V0IHRvIDEgeWVhciBmcm9tIHRvZGF5XG4gICAqIEBwYXJhbSBmb3JtIFxuICAgKi9cbiAgcHJvY2Vzc0ZpbHRlcihmb3JtKSB7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgbGV0IGY6IE1hcDxTdHJpbmcsIGFueT4gPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKHRoaXMuZmlsdGVyRm9ybS52YWx1ZSkpO1xuICAgIC8vdmFsaWRhdGUgZGF0ZSBcbiAgICBpZighdGhpcy5maWx0ZXJGb3JtLmdldCgnZnJvbScpLnRvdWNoZWQpey8vaWYgZnJvbSBpcyBub3QgcG9wdWxhdGVkIHJlbW92ZSBmcm9tIHJlcXVlc3RcbiAgICAgIGYuZGVsZXRlKCdmcm9tJyk7XG4gICAgICAvLyB0aGlzLmZpbHRlckZvcm0uZ2V0KCdmcm9tJykuc2V0VmFsdWUoJzIwMTgtMDEtMDEnKTtcbiAgICB9XG4gICAgaWYoIXRoaXMuZmlsdGVyRm9ybS5nZXQoJ3RvJykudG91Y2hlZCl7Ly9pZiB0byBpcyBub3QgcG9wdWxhdGVkIHJlbW92ZSBmcm9tIHJlcXVlc3RcbiAgICAgIGYuZGVsZXRlKCd0bycpO1xuICAgICAgLy8gbGV0IHRvRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAvLyB0b0RhdGUuc2V0RGF0ZSh0b0RhdGUuZ2V0RnVsbFllYXIoKSArIDEpO1xuICAgICAgLy8gdGhpcy5maWx0ZXJGb3JtLmdldCgndG8nKS5zZXRWYWx1ZSh0aGlzLmdldEZvcm1hdHRlZERhdGUodG9EYXRlKSk7XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkUGFnZSh7IG9mZnNldDogdGhpcy5wYWdlLm51bWJlciwgbGltaXQ6IHRoaXMucGFnZS5zaXplIH0sIGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgaW5wdXRcbiAgICogQHBhcmFtIGNvbnRyb2xcbiAgICovXG4gIGlzSW5wdXQoY29udHJvbDogYW55KSB7XG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBNbGtJbnB1dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIHNlbGVjdFxuICAgKiBAcGFyYW0gY29udHJvbFxuICAgKi9cbiAgaXNTZWxlY3QoY29udHJvbDogYW55KSB7XG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBNbGtTZWxlY3Q7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyB0ZXh0YXJlYVxuICAgKi9cbiAgaXNUZXh0QXJlYShjb250cm9sOiBhbnkpIHtcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIE1sa1RleHRhcmVhO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZm9ybWF0IGRhdGUgdG8gc3RyaW5nIHl5eXktTU0tZGRcbiAgICogQHBhcmFtIGRhdGVcbiAgICovXG4gIGdldEZvcm1hdHRlZERhdGUoZGF0ZSkge1xuICAgIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgdmFyIG1vbnRoID0gKDEgKyBkYXRlLmdldE1vbnRoKCkpLnRvU3RyaW5nKCk7XG4gICAgbW9udGggPSBtb250aC5sZW5ndGggPiAxID8gbW9udGggOiAnMCcgKyBtb250aDtcblxuICAgIHZhciBkYXkgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpO1xuICAgIGRheSA9IGRheS5sZW5ndGggPiAxID8gZGF5IDogJzAnICsgZGF5O1xuXG4gICAgcmV0dXJuIHllYXIgKyAnLScgKyBtb250aCArICctJyArIGRheTtcbiAgfVxuXG4gIGdldEZpZWxkVmFsdWUoZGF0YTogT2JqZWN0LCBmaWVsZDogYW55KXtcbiAgICB2YXIgazogQXJyYXk8c3RyaW5nPiA9IGZpZWxkLnNwbGl0KFwiLlwiKTtcbiAgICB2YXIga2V5cyA9IG5ldyBRdWV1ZTxzdHJpbmc+KC4uLmspO1xuICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0T2JqZWN0VmFsdWUoZGF0YSwga2V5cyk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZmluZCBrZXkgdmFsdWUgYmFzZWQgb24gdGhlIGtleSBzZXF1ZW5jZSBwcm92aWRlZFxuICAgKiBAcGFyYW0gZGF0YSBleHBlY3RzIGFuIG9iamVjdFxuICAgKiBAcGFyYW0ga2V5cyBpLmUuIHVzZXIuZ2VuZGVyLnR5cGUudHlwZVxuICAgKi9cbiAgZ2V0T2JqZWN0VmFsdWUoZGF0YTogYW55LCBrZXlzOiBRdWV1ZTxzdHJpbmc+KSB7XG4gICAgaWYgKCghKGRhdGEgaW5zdGFuY2VvZiBPYmplY3QpKSB8fCAoa2V5cy5sZW5ndGggPT0gMSkpICB7XG4gICAgICByZXR1cm4gZGF0YVtrZXlzLnRhaWxdO1xuICAgIH1cbiAgICBsZXQgdmFsdWUgPSBudWxsO1xuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKChrZXkgPT0ga2V5cy5mcm9udCkgJiYgKGRhdGFba2V5XSBpbnN0YW5jZW9mIE9iamVjdCkpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmdldE9iamVjdFZhbHVlKGRhdGFba2V5XSwga2V5cyk7XG4gICAgICB9IGVsc2UgaWYoa2V5ID09IGtleXMudGFpbCl7XG4gICAgICAgIHZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2YWx1ZTtcblxuICB9XG5cbn1cbi8qKlxuICogVXNlZCB0byBkZWZpbmUgZGF0YXRhYmxlIGNvbHVtbnMgd2l0aCBhdHRyaWJ1dGVzIChjb2x1bW5OYW1lLCBmaWVsZE5hbWUsIHdpZHRoLCBzb3J0YWJsZSwgY2FuQXV0b1Jlc2l6ZSxcbiAqIGRyYWdnYWJsZSwgcmVzaXphYmxlLCBpc0RhdGVDb2x1bW4pXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWxrRGF0YVRhYmxlQ29sdW1uIHtcbiAgLyoqXG4gICAqIGNvbHVtbiB0aXRsZVxuICAgKi9cbiAgY29sdW1uTmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogU2VydmVyIHNpZGUgcmVzcG9uc2UgZmllbGQgY29ycmVzcG9uZGluZyB0byB0aGUgY29sdW1uIGkuZSBmdWxsTmFtZSBtYXkgY29ycmVzcG9uZCB0byBOYW1lIGNvbHVtblxuICAgKi9cbiAgZmllbGROYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBXaWR0aCBvZiB0aGUgY29sdW1uXG4gICAqL1xuICB3aWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIEVuYWJsZSBzb3J0aW5nIGluIGEgY29sdW1uXG4gICAqL1xuICBzb3J0YWJsZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBNYWtlcyBhIGNvbHVtbiByZXNpemFibGVcbiAgICovXG4gIGNhbkF1dG9SZXNpemU/OiBib29sZWFuO1xuICAvKipcbiAgICogRW5hYmxlcyBhIGNvbHVtbiB0byBiZSBkcmFnZ2FibGVcbiAgICovXG4gIGRyYWdnYWJsZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBNYWtlcyBhIGNvbHVtbiByZXNpemFibGVcbiAgICovXG4gIHJlc2l6ZWFibGU/OiBib29sZWFuO1xuICAvKipcbiAgICogVXNlZCB0byBlbmFibGUgZm9ybWF0aW5nIHRpbWVzdGFtcCB0byBzdHJpbmcgZGF0ZVxuICAgKi9cbiAgaXNEYXRlQ29sdW1uPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBVc2VkIHRvIGRpc3BsYXkgbW9yZSBhY3Rpb25zIGNvbHVtbiBhbmQgdGhlIGVuZCBvZiB0aGUgdGFibGVcbiAqL1xuZXhwb3J0IGNsYXNzIE1sa01vcmVBY3Rpb25zIHtcbiAgLyoqXG4gICAqIEFjdGlvbiBDb2x1bW4gbmFtZSBlLmcuIE1vcmUgQWN0aW9uc1xuICAgKi9cbiAgbmFtZTogc3RyaW5nID0gXCJBY3Rpb25zXCI7XG4gIC8qKlxuICAgKiBGaWVsZCBuYW1lIGlkIGZyb20gdGhlIHNlcnZlciByZXNwb25zZSBlLmcgdXNlcklkXG4gICAqL1xuICBpZEZpZWxkTmFtZTogc3RyaW5nID0gXCJpZFwiO1xuICAvKipcbiAgICogQWN0aW9ucyBlLmcuIEVkaXQsIERlbGV0ZVxuICAgKi9cbiAgYWN0aW9uczogQXJyYXk8TWxrTW9yZUFjdGlvbkRhdGE+O1xuXG4gIGNvbnN0cnVjdG9yKGFjdGlvbnM6IEFycmF5PE1sa01vcmVBY3Rpb25EYXRhPiwgaWQ/OiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pZEZpZWxkTmFtZSA9IGlkO1xuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNbGtNb3JlQWN0aW9uRGF0YSB7XG4gIC8qKlxuICAgKiBOZXZlciBtaW5kIHRoaXMgZmllbGQgaXQgd2lsbCBiZSB1c2VkIGJ5IHRoZSBsaWJyYXJ5XG4gICAqL1xuICBpZD86IGFueTtcbiAgLyoqXG4gICAqIEFjdGlvbiBuYW1lIGUuZy4gRWRpdCwgRGVsZXRlXG4gICAqL1xuICBhY3Rpb25OYW1lOiBhbnk7XG59IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0ZXdhcmRDbGllbnRDb21wb25lbnQgfSBmcm9tICcuL3N0ZXdhcmQtY2xpZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNbGtEYXRhdGFibGVDb21wb25lbnQgfSBmcm9tICcuL21say1kYXRhdGFibGUvbWxrLWRhdGF0YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neERhdGF0YWJsZU1vZHVsZSB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUsIEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFN0ZXdhcmRDb25maWcgfSBmcm9tICcuL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBOZ3hEYXRhdGFibGVNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbU3Rld2FyZENsaWVudENvbXBvbmVudCwgTWxrRGF0YXRhYmxlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1N0ZXdhcmRDbGllbnRDb21wb25lbnQsIE1sa0RhdGF0YWJsZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogU3Rld2FyZENvbmZpZykge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU3Rld2FyZENsaWVudE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogWyB7cHJvdmlkZTogU3Rld2FyZENvbmZpZywgdXNlVmFsdWU6IGNvbmZpZ30gXVxuICAgIH1cbiAgfVxuIH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUFBOzs7MEJBSEE7SUFnQkM7Ozs7OztBQ2hCRCxJQU1BOzs7d0JBTkE7SUFVQyxDQUFBO0FBSkQ7Ozs7SUFhSSw4QkFBb0IsSUFBZ0IsRUFBRSxNQUFxQjtRQUF2QyxTQUFJLEdBQUosSUFBSSxDQUFZO3dCQUZqQixHQUFHO1FBR2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztTQUMzRjthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBQztnQkFDM0IsY0FBYyxFQUFFLGlDQUFpQzthQUNwRCxDQUFDLENBQUM7U0FDTjtRQUNELElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTs7WUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN4RjtLQUNKOzs7Ozs7Ozs7O0lBSUQsbUNBQUk7Ozs7OztJQUFKLFVBQUssUUFBZ0IsRUFBRSxJQUFPO1FBQzFCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ2pHLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFPLENBQUMsQ0FDdEMsQ0FBQztLQUNMOzs7Ozs7Ozs7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