(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('@angular/forms'), require('@swimlane/ngx-datatable'), require('queue-typescript'), require('@angular/common'), require('ngx-bootstrap/datepicker')) :
    typeof define === 'function' && define.amd ? define('steward-client', ['exports', '@angular/core', '@angular/common/http', 'rxjs', 'rxjs/operators', '@angular/forms', '@swimlane/ngx-datatable', 'queue-typescript', '@angular/common', 'ngx-bootstrap/datepicker'], factory) :
    (factory((global['steward-client'] = {}),global.ng.core,global.ng.common.http,global.rxjs,global.rxjs.operators,global.ng.forms,null,null,global.ng.common,null));
}(this, (function (exports,core,http,rxjs,operators,forms,ngxDatatable,queueTypescript,common,datepicker) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Wraps server response
     * @template T
     */
    var /**
     * Wraps server response
     * @template T
     */ ResponseWrapper = (function () {
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
    var StewardConfig = (function () {
        function StewardConfig() {
        }
        return StewardConfig;
    }());
    /**
     * @template T, E
     */
    var StewardClientService = (function () {
        function StewardClientService(http$$1, config) {
            this.http = http$$1;
            this.config = config;
            this.base_url = '/';
            this.base_url = config.base_url;
            if (config.headers) {
                // this.headers = config.headers.append('Content-Type', 'application/json; charset=utf-8');
                this.headers = config.headers;
            }
            else {
                this.headers = new http.HttpHeaders({
                    'Content-Type': 'application/json; charset=utf-8'
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
                return this.http.post(this.base_url + endpoint, JSON.stringify(data), { headers: this.headers.append('Content-Type', 'application/json; charset=utf-8') }).pipe(operators.catchError(this.handleError()));
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
                return this.http.put(this.base_url + endpoint, JSON.stringify(data), { headers: this.headers.append('Content-Type', 'application/json; charset=utf-8') }).pipe(operators.catchError(this.handleError()));
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
                return this.http.request('delete', this.base_url + endpoint, { headers: this.headers.append('Content-Type', 'application/json; charset=utf-8'), body: JSON.stringify(data) }).pipe(operators.catchError(this.handleError()));
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
                return this.http.get(this.base_url + endpoint, options).pipe(operators.catchError(this.handleError()));
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
                return this.http.get(this.base_url + endpoint + '?access_token=' + this.token, options).pipe(operators.catchError(this.handleError()));
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
                    headers = this.headers; // new HttpHeaders({'Authorization': 'Bearer ' + this.config.access_token});
                }
                else if (!headers) {
                    headers = new http.HttpHeaders();
                }
                return this.http.post(this.base_url + endpoint, formData, { headers: headers }).pipe(operators.catchError(this.handleError()));
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
                return this.http.post(this.base_url + endpoint, formData, { headers: this.headers }).pipe(operators.catchError(this.handleError()));
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
                return this.http.put(this.base_url + endpoint, formData, { headers: this.headers }).pipe(operators.catchError(this.handleError()));
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
                if (data === undefined) {
                    return new http.HttpParams();
                }
                /** @type {?} */
                var httpParams = new http.HttpParams();
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
                    if (error.status === 500) {
                        res.code = error.status;
                        res.message = 'Sorry internal server error occured please try again later';
                    }
                    else {
                        res.code = error.status;
                        res.message = error.error.message;
                        res.data = error.error.data;
                    }
                    return rxjs.of(res);
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
                return this.http.get(this.base_url + endpoint, options).pipe(operators.catchError(this.handleError()));
            };
        StewardClientService.decorators = [
            { type: core.Injectable },
        ];
        StewardClientService.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: StewardConfig }
            ];
        };
        return StewardClientService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var StewardClientComponent = (function () {
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
            { type: core.Component, args: [{
                        selector: 'stw-steward-client',
                        template: "\n    <p>\n      steward-client works!\n    </p>\n  ",
                        styles: []
                    },] },
        ];
        StewardClientComponent.ctorParameters = function () { return []; };
        return StewardClientComponent;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /**
     * Datable page used to wrapper server content response
     * @template T
     */
    var /**
     * Datable page used to wrapper server content response
     * @template T
     */ Page = (function () {
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
    var /**
     * used to map sort request
     */ Sort = (function () {
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
    var /**
     * Represents dynamic html controls (Input, TextArea and Select)
     * @template T
     */ MlkDynamicControl = (function () {
        function MlkDynamicControl(label, name, controlType, icon, isRequired, placeholder) {
            if (icon === void 0) {
                icon = "fa fa-file-text-o";
            }
            if (isRequired === void 0) {
                isRequired = true;
            }
            if (placeholder === void 0) {
                placeholder = null;
            }
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
    var /**
     * Used to represent html input with options:
     * type: default to text,  maxLength, minLength, min, max
     */ MlkInput = (function () {
        function MlkInput(type) {
            if (type === void 0) {
                type = "text";
            }
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
    var /**
     * Represents html textarea input
     */ MlkTextarea = (function () {
        function MlkTextarea(cols, rows) {
            if (cols === void 0) {
                cols = 5;
            }
            if (rows === void 0) {
                rows = 1;
            }
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
    var /**
     * Represents html select control
     */ MlkSelect = (function () {
        function MlkSelect(options) {
            this.options = options;
        }
        return MlkSelect;
    }());
    var MlkSelectOption = (function () {
        function MlkSelectOption(value, text) {
            if (text === void 0) {
                text = null;
            }
            this.value = value;
            this.text = text ? text : value;
        }
        return MlkSelectOption;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    // const { Queue } = require('queue-typescript');
    var MlkDatatableComponent = (function () {
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
            this.summaryPosition = '\'bottom\'';
            this.summaryHeight = '\'auto\'';
            this.onActionsEvent = new core.EventEmitter();
            this.filterComponents = [];
            this.page = new Page();
            this.selected = [];
            this.onSelected = new core.EventEmitter();
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
                        validators.push(forms.Validators.required);
                    }
                    if (comp.controlType instanceof MlkInput || comp.controlType instanceof MlkTextarea) {
                        validators.push(forms.Validators.minLength(comp.controlType.minLength));
                        validators.push(forms.Validators.maxLength(comp.controlType.maxLength));
                    }
                    if (comp.controlType instanceof MlkInput) {
                        validators.push(forms.Validators.max(comp.controlType.max));
                        validators.push(forms.Validators.min(comp.controlType.min));
                    }
                    group[comp.name] = new forms.FormControl('', validators);
                });
                // add default controls
                group['from'] = new forms.FormControl('', forms.Validators.maxLength(30));
                group['to'] = new forms.FormControl('', forms.Validators.maxLength(30));
                group['needle'] = new forms.FormControl('', forms.Validators.maxLength(200));
                this.filterForm = new forms.FormGroup(group);
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
                    f.set('from', fd.toISOString());
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
                var k = field.split('.');
                /** @type {?} */
                var keys = new (queueTypescript.Queue.bind.apply(queueTypescript.Queue, __spread([void 0], k)))();
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
            { type: core.Component, args: [{
                        selector: 'stw-mlk-datatable',
                        template: "<div class=\"card card-outline-default\" *ngIf=\"enableFilterHeader\">\n  <div class=\"card-body\">\n    <form (ngSubmit)=\"processFilter(filterForm)\" [formGroup]=\"filterForm\">\n\n      <div class=\"row\">\n        <div class=\"col-md-3  mb-3\" *ngFor=\"let control of filterComponents\">\n          <label for=\"from\">{{control.label}}: </label>\n          <div class=\"input-group\">\n            <div class=\"input-group-append\">\n                <span class=\"input-group-text  form-icon-default\">\n                  <i [class]=\"control.icon\"></i>\n                </span>\n            </div>\n\n            <select *ngIf=\"isSelect(control.controlType)\" class=\"form-control form-control-sm checking-field\"\n                    [formControlName]=\"control.name\">\n              <option value=\"\" disabled selected>{{control.placeholder}}</option>\n              <option *ngFor=\"let o of control.controlType.options\">{{o.text}}</option>\n            </select>\n\n            <textarea *ngIf=\"isTextArea(control.controlType)\" [cols]=\"control.controlType.cols\"\n                      [rows]=\"control.controlType.rows\" class=\"form-control form-control-sm checking-field\"\n                      [placeholder]=\"control.placeholder\" [formControlName]=\"control.name\"></textarea>\n\n            <input *ngIf=\"isInput(control.controlType)\" [type]=\"control.controlType.type\"\n                   [placeholder]=\"control.placeholder\" class=\"form-control form-control-sm checking-field\"\n                   [formControlName]=\"control.name\"/>\n          </div>\n          <span class=\"help-block\" *ngIf=\"filterForm.get(control.name).touched\">\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}} is required</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of {{control.controlType.minLength}} characters</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of {{control.controlType.maxLength}} characters</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('min')\">Should be greater than {{control.controlType.min}}</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('max')\">Should be less than {{control.controlType.max}}</span>\n            </span>\n        </div>\n      </div>\n\n      <div class=\"row\" *ngIf=\"enableDefaultTableHeader\">\n        <div class=\"col-md-3 mb-3\">\n          <label for=\"from\">From: </label>\n          <div class=\"input-group\">\n            <div class=\"input-group-append\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-calendar-o\"></i>\n                </span>\n            </div>\n            <input\n              type=\"text\"\n              class=\"form-control form-control-sm checking-field\"\n              id=\"inputTravelDate\"\n              formControlName=\"from\"\n              placeholder=\"From...\"\n              #dpfrom=\"bsDatepicker\"\n              bsDatepicker\n              [outsideClick]=\"false\"\n              [bsConfig]=\"{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }\"\n              maxlength=\"30\"\n              required\n              readonly\n            />\n            <div class=\"input-group-append\">\n              <button class=\"btn btn-primary\" type=\"button\" (click)=\"dpfrom.toggle()\"\n                      [attr.aria-expanded]=\"dpfrom.isOpen\"><i class=\"fa fa-th\"></i></button>\n            </div>\n          </div>\n          <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n                <span class=\"text-danger\"\n                      *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 30 characters</span>\n            </span>\n        </div>\n        <div class=\"col-md-3 mb-3\">\n          <label for=\"from\">To: </label>\n          <div class=\"input-group\">\n            <div class=\"input-group-append\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-calendar-o\"></i>\n                </span>\n            </div>\n            <input\n              type=\"text\"\n              class=\"form-control form-control-sm checking-field\"\n              id=\"inputTravelDate\"\n              formControlName=\"to\"\n              placeholder=\"To...\"\n              #dpto=\"bsDatepicker\"\n              bsDatepicker\n              [outsideClick]=\"false\"\n              [bsConfig]=\"{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }\"\n              maxlength=\"30\"\n              required\n              readonly\n            />\n            <div class=\"input-group-append\">\n              <button class=\"btn btn-primary\" type=\"button\" (click)=\"dpto.toggle()\" [attr.aria-expanded]=\"dpto.isOpen\">\n                <i class=\"fa fa-th\"></i></button>\n            </div>\n          </div>\n          <span class=\"help-block\" *ngIf=\"filterForm.get('to').touched\">\n                <span class=\"text-danger\"\n                      *ngIf=\"filterForm.get('to').hasError('maxlength')\">Maximum of 30 characters</span>\n            </span>\n        </div>\n        <div class=\"col-md-3 mb-3\">\n          <label for=\"search\">Search:</label>\n          <div class=\"input-group\">\n            <div class=\"input-group-prepend\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-search\"></i>\n                </span>\n            </div>\n            <input formControlName=\"needle\" class=\"form-control form-control-sm checking-field\" type=\"text\"\n                   placeholder=\"Search...\" (keyup)=\"updateFilter($event)\"/>\n          </div>\n        </div>\n        <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 200 characters</span>\n          </span>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"pull-right inline-buttons\">\n            <button class=\"btn btn-warning btn-sm\" type=\"reset\">\n              <i class=\"fa fa-repeat\" aria-hidden=\"true\"></i>\n              Reset\n            </button>\n            <button class=\"btn btn-success btn-sm pull-right\" type=\"submit\">\n              <i class=\"fa fa-filter\" aria-hidden=\"true\"></i>\n              Filter\n            </button>\n          </div>\n        </div>\n      </div>\n\n    </form>\n  </div>\n</div>\n\n<ngx-datatable\n  #table\n  [rowHeight]=\"tableRowHeight\"\n  [footerHeight]=\"tableFooterHeight\"\n  [headerHeight]=\"tableHeaderHeight\"\n  [scrollbarV]=\"verticalScrollActive\"\n  [scrollbarH]=\"horizontalScrollActive\"\n  [summaryRow]=\"enableSummary\"\n  [summaryPosition]=\"summaryPosition\"\n  [summaryHeight]=\"summaryHeight\"\n  class=\"bootstrap\"\n  [columnMode]=\"'force'\"\n  [rows]=\"page.content\"\n  [selected]=\"selected\"\n  [selectionType]=\"'checkbox'\"\n  (activate)=\"onActivate($event)\"\n  (select)='onSelect($event)'\n  [count]=\"page.totalElements\"\n  [offset]=\"page.number\"\n  [externalPaging]=\"true\"\n  [limit]=\"page.size\"\n  (page)=\"loadPage($event, null)\">\n  <ngx-datatable-column [summaryFunc]=\"summaryFunc\" [width]=\"30\" [sortable]=\"false\" [canAutoResize]=\"false\"\n                        [draggable]=\"true\" [resizeable]=\"false\" [headerCheckboxable]=\"true\"\n                        [checkboxable]=\"true\" *ngIf=\"enableCheckbox\">\n  </ngx-datatable-column>\n  <ngx-datatable-column [summaryFunc]=\"(c.summaryFunc) ? c.summaryFunc : summaryFunc\"\n                        [canAutoResize]=\"(c.canAutoResize) ? c.canAutoResize : true\" [name]=\"c.columnName\"\n                        [width]=\"c.width\"\n                        [sortable]=\"(c.sortable) ? c.sortable : true\" [draggable]=\"(c.draggable) ? c.draggable : true\"\n                        [resizeable]=\"(c.resizeable) ? c.resizeable : true\"\n                        *ngFor=\"let c of columns; index as i;\">\n    <ng-template let-column=\"column\" ngx-datatable-header-template *ngIf=\"i==0\">\n      <strong>#</strong>\n    </ng-template>\n    <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" *ngIf=\"i==0\">\n        <span>\n            {{rowIndex+1}}\n        </span>\n    </ng-template>\n\n    <ng-template let-column=\"column\" ngx-datatable-header-template>\n      <strong>{{c.columnName}}</strong>\n    </ng-template>\n    <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n        <span>\n            <ng-container *ngIf=\"c.isDateColumn; then t10\"></ng-container>\n            <ng-container *ngIf=\"c.isCurrencyColumn && c.currencyText; then t40\"></ng-container>\n            <ng-container *ngIf=\"c.isCurrencyColumn && !c.currencyText; then t70\"></ng-container>\n            <ng-container *ngIf=\"!c.isDateColumn && !c.isCurrencyColumn; then t70\"></ng-container>\n\n            <ng-template #t10>\n                {{(getFieldValue(row, c.fieldName) | date:'medium')}}\n            </ng-template>\n            <ng-template #t40>\n                {{(getFieldValue(row, c.fieldName) | currency:c.currencyText:'code')}}\n            </ng-template>\n            <ng-template #t70>\n                {{getFieldValue(row, c.fieldName)}}\n            </ng-template>\n        </span>\n    </ng-template>\n  </ngx-datatable-column>\n  <ngx-datatable-column [summaryFunc]=\"summaryFunc\" [name]=\"moreActions.name\" *ngIf=\"moreActions\" [sortable]=\"false\"\n                        [canAutoResize]=\"false\">\n    <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n        <span>\n          <div class=\"input-group-prepend\">\n            <button class=\"btn btn-sm btn-outline-secondary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\"\n                    aria-haspopup=\"true\"\n                    aria-expanded=\"false\">\n              <i class=\"fa fa-list-ul\" aria-hidden=\"true\"></i>\n            </button>\n            <div class=\"dropdown-menu\">\n              <a class=\"dropdown-item\" *ngFor=\"let action of moreActions.actions\" href=\"javascript:;\"\n                 (click)=\"onActionClick({id: row[moreActions.idFieldName], actionName: action.actionName, actionRow: row})\">{{action.actionName}}</a>\n            </div>\n          </div>\n        </span>\n    </ng-template>\n  </ngx-datatable-column>\n</ngx-datatable>\n",
                        styles: [""]
                    },] },
        ];
        MlkDatatableComponent.ctorParameters = function () {
            return [
                { type: StewardClientService }
            ];
        };
        MlkDatatableComponent.propDecorators = {
            tableRowHeight: [{ type: core.Input }],
            tableFooterHeight: [{ type: core.Input }],
            tableHeaderHeight: [{ type: core.Input }],
            verticalScrollActive: [{ type: core.Input }],
            horizontalScrollActive: [{ type: core.Input }],
            columns: [{ type: core.Input }],
            enableCheckbox: [{ type: core.Input }],
            endpoint: [{ type: core.Input }],
            enableFilterHeader: [{ type: core.Input }],
            enableDefaultTableHeader: [{ type: core.Input }],
            enableSummary: [{ type: core.Input }],
            summaryPosition: [{ type: core.Input }],
            summaryHeight: [{ type: core.Input }],
            moreActions: [{ type: core.Input }],
            onActionsEvent: [{ type: core.Output }],
            filterComponents: [{ type: core.Input }],
            params: [{ type: core.Input }],
            onSelected: [{ type: core.Output }],
            table: [{ type: core.ViewChild, args: [ngxDatatable.DatatableComponent,] }]
        };
        return MlkDatatableComponent;
    }());
    /**
     * Used to display more actions column and the end of the table
     */
    var /**
     * Used to display more actions column and the end of the table
     */ MlkMoreActions = (function () {
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var StewardClientModule = (function () {
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
            { type: core.NgModule, args: [{
                        imports: [
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            ngxDatatable.NgxDatatableModule,
                            common.CommonModule,
                            datepicker.BsDatepickerModule.forRoot(),
                            http.HttpClientModule
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

    exports.StewardConfig = StewardConfig;
    exports.StewardClientService = StewardClientService;
    exports.StewardClientComponent = StewardClientComponent;
    exports.MlkDatatableComponent = MlkDatatableComponent;
    exports.MlkMoreActions = MlkMoreActions;
    exports.StewardClientModule = StewardClientModule;
    exports.MlkDynamicControl = MlkDynamicControl;
    exports.MlkInput = MlkInput;
    exports.MlkTextarea = MlkTextarea;
    exports.MlkSelect = MlkSelect;
    exports.MlkSelectOption = MlkSelectOption;
    exports.Page = Page;
    exports.Sort = Sort;
    exports.ResponseWrapper = ResponseWrapper;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlci50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9zdGV3YXJkLWNsaWVudC5jb21wb25lbnQudHMiLG51bGwsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy93cmFwcGVycy9tbGstZHluYW1pYy1jb250cm9sLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvbWxrLWRhdGF0YWJsZS9tbGstZGF0YXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFdyYXBzIHNlcnZlciByZXNwb25zZVxuICovXG5leHBvcnQgY2xhc3MgUmVzcG9uc2VXcmFwcGVyPFQ+IHtcbiAgICAvKipcbiAgICAgKiBIdHRwIHN0YXR1cyBjb2RlIGUuZy4gMjAwXG4gICAgICovXG4gICAgY29kZTogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNlcnZlciBtZXNzYWdlXG4gICAgICovXG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEFjdHVhbCByZXNwb25zZSBkYXRhXG4gICAgICovXG4gICAgZGF0YTogVDtcbn1cbiIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwSGVhZGVycywgSHR0cFBhcmFtc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBvZn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2NhdGNoRXJyb3J9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7UmVzcG9uc2VXcmFwcGVyfSBmcm9tICcuL2VudGl0aWVzL3dyYXBwZXJzL3Jlc3BvbnNlLXdyYXBwZXInO1xuXG5leHBvcnQgY2xhc3MgU3Rld2FyZENvbmZpZyB7XG4gIGJhc2VfdXJsOiBzdHJpbmc7XG4gIGFjY2Vzc190b2tlbj86IHN0cmluZztcbiAgaGVhZGVycz86IEh0dHBIZWFkZXJzO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudFNlcnZpY2U8VCwgRT4ge1xuXG4gIHByaXZhdGUgaGVhZGVyczogSHR0cEhlYWRlcnM7XG4gIHRva2VuOiBzdHJpbmc7XG4gIGJhc2VfdXJsID0gJy8nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBjb25maWc6IFN0ZXdhcmRDb25maWcpIHtcbiAgICB0aGlzLmJhc2VfdXJsID0gY29uZmlnLmJhc2VfdXJsO1xuICAgIGlmIChjb25maWcuaGVhZGVycykge1xuICAgICAgLy8gdGhpcy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuICAgICAgdGhpcy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoY29uZmlnLmFjY2Vzc190b2tlbikgey8vIGFwcGVuZCBhY2Nlc3MgdG9rZW4gaWYgdGhlIGVudmlyb25tZW50IGhhcyBhY2Nlc3MgdG9rZW5cbiAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuaGVhZGVycy5hcHBlbmQoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyBjb25maWcuYWNjZXNzX3Rva2VuKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBoYW5kbGUgaHR0cCBwb3N0IHJlcXVlc3RzXG4gICAqL1xuICBwb3N0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7aGVhZGVyczogdGhpcy5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKX0pLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBoYW5kbGUgaHR0cCBwb3N0IHJlcXVlc3RzXG4gICAqL1xuICBwdXQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBKU09OLnN0cmluZ2lmeShkYXRhKSwge2hlYWRlcnM6IHRoaXMuaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyl9KS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICApO1xuICB9XG5cbiAgZGVsZXRlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdCgnZGVsZXRlJywgdGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCB7aGVhZGVyczogdGhpcy5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKSwgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSl9KS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICApO1xuICB9XG5cbiAgZ2V0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgcGFyYW1zOiB0aGlzLmdldEh0dHBQYXJhbXMoZGF0YSlcbiAgICB9O1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgb3B0aW9ucykucGlwZShcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgKTtcbiAgfVxuXG5cbiAgZ2V0RmlsZShlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQgKyAnP2FjY2Vzc190b2tlbj0nICsgdGhpcy50b2tlbiwgb3B0aW9ucykucGlwZShcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBpZlxuICAgKiBAcGFyYW0gZW5kcG9pbnRcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHBhcmFtIGhlYWRlcnNcbiAgICovXG4gIHBvc3RGb3JtRGF0YShlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBULCBoZWFkZXJzPzogSHR0cEhlYWRlcnMpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5oZWFkZXJzLmdldCgnQXV0aG9yaXphdGlvbicpICYmICghaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMgPSB0aGlzLmhlYWRlcnM7IC8vIG5ldyBIdHRwSGVhZGVycyh7J0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLmNvbmZpZy5hY2Nlc3NfdG9rZW59KTtcbiAgICB9IGVsc2UgaWYgKCFoZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIGZvcm1EYXRhLCB7aGVhZGVyczogaGVhZGVyc30pLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICk7XG4gIH1cblxuICBwb3N0Rm9ybURhdGFNdWx0aXBhcnQoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhW2tleV0pKSB7XG4gICAgICAgIGRhdGFba2V5XS5mb3JFYWNoKGsyID0+IHtcbiAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBrMik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBmb3JtRGF0YSwge2hlYWRlcnM6IHRoaXMuaGVhZGVyc30pLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICk7XG4gIH1cblxuICBwdXRGb3JtRGF0YU11bHRpUGFydChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFba2V5XSkpIHtcbiAgICAgICAgZGF0YVtrZXldLmZvckVhY2goazIgPT4ge1xuICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGsyKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgZm9ybURhdGEsIHtoZWFkZXJzOiB0aGlzLmhlYWRlcnN9KS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRIdHRwUGFyYW1zKGRhdGE6IE1hcDxzdHJpbmcsIHN0cmluZz4pOiBIdHRwUGFyYW1zIHtcbiAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICB9XG4gICAgbGV0IGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgIGRhdGEuZm9yRWFjaCgodmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaHR0cFBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGNhdGNoIGV4Y2VwdGlvbiB0aHJvd24gYnkgaHR0cCBjbGllbnQgcmV0dXJucyBpbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcbiAgICogaWYgc3RhdHVzIDUwMCBpcyBlbmNvdW50ZXJlZFxuICAgKi9cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcjxSZXNwb25zZVdyYXBwZXI+KCkge1xuICAgIHJldHVybiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IG5ldyBSZXNwb25zZVdyYXBwZXIoKTtcbiAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7IC8vIGxvZyB0byBjb25zb2xlIGluc3RlYWRcbiAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDUwMCkge1xuICAgICAgICByZXMuY29kZSA9IGVycm9yLnN0YXR1cztcbiAgICAgICAgcmVzLm1lc3NhZ2UgPSAnU29ycnkgaW50ZXJuYWwgc2VydmVyIGVycm9yIG9jY3VyZWQgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlcic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXMuY29kZSA9IGVycm9yLnN0YXR1cztcbiAgICAgICAgcmVzLm1lc3NhZ2UgPSBlcnJvci5lcnJvci5tZXNzYWdlO1xuICAgICAgICByZXMuZGF0YSA9IGVycm9yLmVycm9yLmRhdGE7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2YocmVzKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gcmVuZGVyIGFjdGlvbiBidXR0b25zXG4gICAqL1xuICBzdGF0aWMgcmVuZGVyTW9yZShpZDogYW55KSB7XG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVxcJ2FjdGlvbnMtYnV0dG9ucyBjZW50ZXJcXCcgaWQ9XFwnJyArIGlkICsgJ1xcJz48aSBjbGFzcz1cXCdmYSBmYS1jaGVja1xcJyB0aXRsZT1cXCdBcHByb3ZlXFwnPjwvaT4gPGkgY2xhc3M9XFwnZmEgZmEtYmFuXFwnIHRpdGxlPVxcJ0RlY2xpbmVcXCc+PC9pPjwvZGl2Pic7XG4gIH1cblxuICBwdWJsaWMgaW50aWF0ZURhdGFUYWJsZShlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPikge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBwYXJhbXM6IHRoaXMuZ2V0SHR0cFBhcmFtcyhkYXRhKVxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBvcHRpb25zKS5waXBlKFxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzdHctc3Rld2FyZC1jbGllbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgc3Rld2FyZC1jbGllbnQgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDbGllbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCIvKipcbiAqIERhdGFibGUgcGFnZSB1c2VkIHRvIHdyYXBwZXIgc2VydmVyIGNvbnRlbnQgcmVzcG9uc2VcbiAqL1xuZXhwb3J0IGNsYXNzIFBhZ2U8VD4ge1xuICAgIC8qKlxuICAgICAqIE51bWJlciBvZiBpdGVtcyBwZXIgcGFnZSBzYW1lIGFzIGxpbWl0XG4gICAgICovXG4gICAgc2l6ZTogbnVtYmVyID0gMTA7XG4gICAgLyoqXG4gICAgICogVG90YWwgaXRlbXMgYXZhaWxhYmxlIG9uIHRoZSBzZXJ2ZXJcbiAgICAgKi9cbiAgICB0b3RhbEVsZW1lbnRzOiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIFRvdGFsIG51bWJlciBvZiBwYWdlcyBwcmVzZW50XG4gICAgICovXG4gICAgdG90YWxQYWdlczogbnVtYmVyID0gMDtcbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgaXMgdGhlIGZpcnN0IHBhZ2VcbiAgICAgKi9cbiAgICBmaXJzdDogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGl0IGlzIHRoZSBsYXN0IHBhZ2VcbiAgICAgKi9cbiAgICBsYXN0OiBib29sZWFuID0gZmFsc2U7XG4gICAgLyoqXG4gICAgICogVGhlIGFjdHVhbCBwYWdlIGNvbnRlbnRcbiAgICAgKi9cbiAgICBjb250ZW50OiBBcnJheTxUPiA9IFtdO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gbWFwIHNvcnQgcGFyYW1ldGVyc1xuICAgICAqL1xuICAgIHNvcnRlZDogU29ydCA9IG5ldyBTb3J0KCk7XG4gICAgLyoqXG4gICAgICogQ3VycmVudCBwYWdlIG51bWJlclxuICAgICAqL1xuICAgIG51bWJlcjogbnVtYmVyID0gMDtcbn1cbi8qKlxuICogdXNlZCB0byBtYXAgc29ydCByZXF1ZXN0XG4gKi9cbmV4cG9ydCBjbGFzcyBTb3J0e1xuICAgIHNvcnRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHVuc29ydGVkOiBib29sZWFuID0gdHJ1ZTtcbn1cbiIsIi8qKlxuICogUmVwcmVzZW50cyBkeW5hbWljIGh0bWwgY29udHJvbHMgKElucHV0LCBUZXh0QXJlYSBhbmQgU2VsZWN0KVxuICovXG5leHBvcnQgY2xhc3MgTWxrRHluYW1pY0NvbnRyb2w8VD4ge1xuICAgIC8qKlxuICAgICAqIENvbnRyb2wgbGFiZWxcbiAgICAgKi9cbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEljb24gdG8gYmUgYXBwZW5kZWQgYmVmb3JlIHRoZSBjb250cm9sIChzdXBwb3J0cyBjbGFzcyBkZWZpbmVkIGljb25zKVxuICAgICAqL1xuICAgIGljb246IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBjb250cm9sIChwcm92aWRlIHZhcmlhYmxlIHZhbGlkIG5hbWVzIGllLiBubyBzcGFjZXMgcHJlZmFyYWJseSBhcGkgY29ycmVzcG9uZGluZyBuYW1lcyBlLmcuIHVzZXJOYW1lKVxuICAgICAqL1xuICAgIG5hbWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUaGUgYWN0dWFsIGNvbnRyb2wgKE1sa0lucHV0LCBNbGtUZXh0QXJlYSAmIE1sa1NlbGVjdClcbiAgICAgKi9cbiAgICBjb250cm9sVHlwZTogVDtcbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIGZpZWxkIGlzIHJlcXVpcmVkXG4gICAgICovXG4gICAgaXNSZXF1aXJlZDogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBDb250cm9sIHBsYWNlaG9sZGVyXG4gICAgICovXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZyA9IFwiXCI7XG5cbiAgICBjb25zdHJ1Y3RvcihsYWJlbDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGNvbnRyb2xUeXBlOiBULCBpY29uOiBzdHJpbmcgPSBcImZhIGZhLWZpbGUtdGV4dC1vXCIsXG4gICAgICAgIGlzUmVxdWlyZWQ6IGJvb2xlYW4gPSB0cnVlLCBwbGFjZWhvbGRlcjogc3RyaW5nID0gbnVsbCkge1xuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBjb250cm9sVHlwZTtcbiAgICAgICAgdGhpcy5pY29uID0gaWNvbjtcbiAgICAgICAgdGhpcy5pc1JlcXVpcmVkID0gaXNSZXF1aXJlZDtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyID8gcGxhY2Vob2xkZXIgOiBsYWJlbDtcbiAgICB9XG5cbn1cbi8qKlxuICogVXNlZCB0byByZXByZXNlbnQgaHRtbCBpbnB1dCB3aXRoIG9wdGlvbnM6XG4gKiB0eXBlOiBkZWZhdWx0IHRvIHRleHQsICBtYXhMZW5ndGgsIG1pbkxlbmd0aCwgbWluLCBtYXhcbiAqL1xuZXhwb3J0IGNsYXNzIE1sa0lucHV0e1xuICAgIC8qKlxuICAgICAqIFR5cGUgb2YgaW5wdXQgZS5nLiB0ZXh0LCBudW1iZXIsIGRhdGVcbiAgICAgKi9cbiAgICB0eXBlOiBzdHJpbmcgPSBcInRleHRcIjtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIGxlbmd0aCBvZiB0aGUgaW5wdXRcbiAgICAgKi9cbiAgICBtYXhMZW5ndGg6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIG1pbmltdW0gaW5wdXQgbGVuZ3RoXG4gICAgICovXG4gICAgbWluTGVuZ3RoOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBudW1iZXIgaW5wdXRzXG4gICAgICovXG4gICAgbWluOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBudW1iZXIgaW5wdXRzXG4gICAgICovXG4gICAgbWF4OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcgPSBcInRleHRcIikge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLm1pbkxlbmd0aCA9IHRoaXMubWluID0gMDtcbiAgICAgICAgdGhpcy5tYXhMZW5ndGggPSA0MDAwO1xuICAgICAgICB0aGlzLm1heCA9IDEwMDAwMDAwMDA7XG4gICAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgaHRtbCB0ZXh0YXJlYSBpbnB1dFxuICovXG5leHBvcnQgY2xhc3MgTWxrVGV4dGFyZWF7XG4gICAgLyoqXG4gICAgICogTnVtYmVyIHRleHRhcmVhIGNvbHVtbnNcbiAgICAgKi9cbiAgICBjb2xzPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIE51bWJlciBvZiB0ZXh0YXJlYSByb3dzXG4gICAgICovXG4gICAgcm93cz86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBtYXhpbXVtIGlucHV0IGxlbmd0aFxuICAgICAqL1xuICAgIG1heExlbmd0aDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIG1pbmltdW0gaW5wdXQgbGVuZ3RoXG4gICAgICovXG4gICAgbWluTGVuZ3RoOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb2xzOiBudW1iZXIgPSA1LCByb3dzOiBudW1iZXIgPSAxKXtcbiAgICAgICAgdGhpcy5jb2xzID0gY29scztcbiAgICAgICAgdGhpcy5yb3dzID0gcm93cztcbiAgICAgICAgdGhpcy5tYXhMZW5ndGggPSA0MDAwO1xuICAgICAgICB0aGlzLm1pbkxlbmd0aCA9IDBcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBodG1sIHNlbGVjdCBjb250cm9sXG4gKi9cbmV4cG9ydCBjbGFzcyBNbGtTZWxlY3Qge1xuICAgIC8qKlxuICAgICAqIFNlbGVjdCBvcHRpb25zXG4gICAgICovXG4gICAgb3B0aW9uczogQXJyYXk8TWxrU2VsZWN0T3B0aW9uPjtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEFycmF5PE1sa1NlbGVjdE9wdGlvbj4pe1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgTWxrU2VsZWN0T3B0aW9ue1xuICAgIC8qKlxuICAgICAqIE9wdGlvbiB2YWx1ZVxuICAgICAqL1xuICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogT3B0aW9uIHRleHQvbGFiZWxcbiAgICAgKi9cbiAgICB0ZXh0OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgPSBudWxsKXtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0ID8gdGV4dCA6IHZhbHVlO1xuICAgIH1cblxufVxuXG4iLCJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7UGFnZX0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcGFnZSc7XG5pbXBvcnQge01sa0R5bmFtaWNDb250cm9sLCBNbGtJbnB1dCwgTWxrU2VsZWN0LCBNbGtUZXh0YXJlYX0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvbWxrLWR5bmFtaWMtY29udHJvbCc7XG5pbXBvcnQge1Jlc3BvbnNlV3JhcHBlcn0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlcic7XG5pbXBvcnQge1N0ZXdhcmRDbGllbnRTZXJ2aWNlfSBmcm9tICcuLi9zdGV3YXJkLWNsaWVudC5zZXJ2aWNlJztcbmltcG9ydCB7RGF0YXRhYmxlQ29tcG9uZW50fSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XG5pbXBvcnQge1F1ZXVlfSBmcm9tICdxdWV1ZS10eXBlc2NyaXB0JztcblxuLy8gY29uc3QgeyBRdWV1ZSB9ID0gcmVxdWlyZSgncXVldWUtdHlwZXNjcmlwdCcpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzdHctbWxrLWRhdGF0YWJsZScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNhcmQgY2FyZC1vdXRsaW5lLWRlZmF1bHRcIiAqbmdJZj1cImVuYWJsZUZpbHRlckhlYWRlclwiPlxuICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG4gICAgPGZvcm0gKG5nU3VibWl0KT1cInByb2Nlc3NGaWx0ZXIoZmlsdGVyRm9ybSlcIiBbZm9ybUdyb3VwXT1cImZpbHRlckZvcm1cIj5cblxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgIG1iLTNcIiAqbmdGb3I9XCJsZXQgY29udHJvbCBvZiBmaWx0ZXJDb21wb25lbnRzXCI+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cImZyb21cIj57e2NvbnRyb2wubGFiZWx9fTogPC9sYWJlbD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgIGZvcm0taWNvbi1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICA8aSBbY2xhc3NdPVwiY29udHJvbC5pY29uXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8c2VsZWN0ICpuZ0lmPVwiaXNTZWxlY3QoY29udHJvbC5jb250cm9sVHlwZSlcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxuICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQgc2VsZWN0ZWQ+e3tjb250cm9sLnBsYWNlaG9sZGVyfX08L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgbyBvZiBjb250cm9sLmNvbnRyb2xUeXBlLm9wdGlvbnNcIj57e28udGV4dH19PC9vcHRpb24+XG4gICAgICAgICAgICA8L3NlbGVjdD5cblxuICAgICAgICAgICAgPHRleHRhcmVhICpuZ0lmPVwiaXNUZXh0QXJlYShjb250cm9sLmNvbnRyb2xUeXBlKVwiIFtjb2xzXT1cImNvbnRyb2wuY29udHJvbFR5cGUuY29sc1wiXG4gICAgICAgICAgICAgICAgICAgICAgW3Jvd3NdPVwiY29udHJvbC5jb250cm9sVHlwZS5yb3dzXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCJcbiAgICAgICAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCI+PC90ZXh0YXJlYT5cblxuICAgICAgICAgICAgPGlucHV0ICpuZ0lmPVwiaXNJbnB1dChjb250cm9sLmNvbnRyb2xUeXBlKVwiIFt0eXBlXT1cImNvbnRyb2wuY29udHJvbFR5cGUudHlwZVwiXG4gICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxuICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCIvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS50b3VjaGVkXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ3JlcXVpcmVkJylcIj57e2NvbnRyb2wucGxhY2Vob2xkZXJ9fSBpcyByZXF1aXJlZDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWlubGVuZ3RoJylcIj5NaW5pbXVtIG9mIHt7Y29udHJvbC5jb250cm9sVHlwZS5taW5MZW5ndGh9fSBjaGFyYWN0ZXJzPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2Yge3tjb250cm9sLmNvbnRyb2xUeXBlLm1heExlbmd0aH19IGNoYXJhY3RlcnM8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21pbicpXCI+U2hvdWxkIGJlIGdyZWF0ZXIgdGhhbiB7e2NvbnRyb2wuY29udHJvbFR5cGUubWlufX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heCcpXCI+U2hvdWxkIGJlIGxlc3MgdGhhbiB7e2NvbnRyb2wuY29udHJvbFR5cGUubWF4fX08L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIiAqbmdJZj1cImVuYWJsZURlZmF1bHRUYWJsZUhlYWRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgbWItM1wiPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJmcm9tXCI+RnJvbTogPC9sYWJlbD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgZm9ybS1pY29uLWRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXItb1wiPjwvaT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXG4gICAgICAgICAgICAgIGlkPVwiaW5wdXRUcmF2ZWxEYXRlXCJcbiAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwiZnJvbVwiXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRnJvbS4uLlwiXG4gICAgICAgICAgICAgICNkcGZyb209XCJic0RhdGVwaWNrZXJcIlxuICAgICAgICAgICAgICBic0RhdGVwaWNrZXJcbiAgICAgICAgICAgICAgW291dHNpZGVDbGlja109XCJmYWxzZVwiXG4gICAgICAgICAgICAgIFtic0NvbmZpZ109XCJ7IGRhdGVJbnB1dEZvcm1hdDogJ0RELU1NLVlZWVknLCBjb250YWluZXJDbGFzczogJ3RoZW1lLXJlZCcgfVwiXG4gICAgICAgICAgICAgIG1heGxlbmd0aD1cIjMwXCJcbiAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImRwZnJvbS50b2dnbGUoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJkcGZyb20uaXNPcGVuXCI+PGkgY2xhc3M9XCJmYSBmYS10aFwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS50b3VjaGVkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2YgMzAgY2hhcmFjdGVyczwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCI+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cImZyb21cIj5UbzogPC9sYWJlbD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgZm9ybS1pY29uLWRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXItb1wiPjwvaT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXG4gICAgICAgICAgICAgIGlkPVwiaW5wdXRUcmF2ZWxEYXRlXCJcbiAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwidG9cIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlRvLi4uXCJcbiAgICAgICAgICAgICAgI2RwdG89XCJic0RhdGVwaWNrZXJcIlxuICAgICAgICAgICAgICBic0RhdGVwaWNrZXJcbiAgICAgICAgICAgICAgW291dHNpZGVDbGlja109XCJmYWxzZVwiXG4gICAgICAgICAgICAgIFtic0NvbmZpZ109XCJ7IGRhdGVJbnB1dEZvcm1hdDogJ0RELU1NLVlZWVknLCBjb250YWluZXJDbGFzczogJ3RoZW1lLXJlZCcgfVwiXG4gICAgICAgICAgICAgIG1heGxlbmd0aD1cIjMwXCJcbiAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImRwdG8udG9nZ2xlKClcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImRwdG8uaXNPcGVuXCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS10aFwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ3RvJykudG91Y2hlZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ3RvJykuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiAzMCBjaGFyYWN0ZXJzPC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIG1iLTNcIj5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwic2VhcmNoXCI+U2VhcmNoOjwvbGFiZWw+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtcHJlcGVuZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCBmb3JtLWljb24tZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1zZWFyY2hcIj48L2k+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwibmVlZGxlXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCIgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCIgKGtleXVwKT1cInVwZGF0ZUZpbHRlcigkZXZlbnQpXCIvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLnRvdWNoZWRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDIwMCBjaGFyYWN0ZXJzPC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHVsbC1yaWdodCBpbmxpbmUtYnV0dG9uc1wiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4td2FybmluZyBidG4tc21cIiB0eXBlPVwicmVzZXRcIj5cbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1yZXBlYXRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgIFJlc2V0XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuLXNtIHB1bGwtcmlnaHRcIiB0eXBlPVwic3VibWl0XCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtZmlsdGVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICBGaWx0ZXJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9mb3JtPlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48bmd4LWRhdGF0YWJsZVxuICAjdGFibGVcbiAgW3Jvd0hlaWdodF09XCJ0YWJsZVJvd0hlaWdodFwiXG4gIFtmb290ZXJIZWlnaHRdPVwidGFibGVGb290ZXJIZWlnaHRcIlxuICBbaGVhZGVySGVpZ2h0XT1cInRhYmxlSGVhZGVySGVpZ2h0XCJcbiAgW3Njcm9sbGJhclZdPVwidmVydGljYWxTY3JvbGxBY3RpdmVcIlxuICBbc2Nyb2xsYmFySF09XCJob3Jpem9udGFsU2Nyb2xsQWN0aXZlXCJcbiAgW3N1bW1hcnlSb3ddPVwiZW5hYmxlU3VtbWFyeVwiXG4gIFtzdW1tYXJ5UG9zaXRpb25dPVwic3VtbWFyeVBvc2l0aW9uXCJcbiAgW3N1bW1hcnlIZWlnaHRdPVwic3VtbWFyeUhlaWdodFwiXG4gIGNsYXNzPVwiYm9vdHN0cmFwXCJcbiAgW2NvbHVtbk1vZGVdPVwiJ2ZvcmNlJ1wiXG4gIFtyb3dzXT1cInBhZ2UuY29udGVudFwiXG4gIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXG4gIFtzZWxlY3Rpb25UeXBlXT1cIidjaGVja2JveCdcIlxuICAoYWN0aXZhdGUpPVwib25BY3RpdmF0ZSgkZXZlbnQpXCJcbiAgKHNlbGVjdCk9J29uU2VsZWN0KCRldmVudCknXG4gIFtjb3VudF09XCJwYWdlLnRvdGFsRWxlbWVudHNcIlxuICBbb2Zmc2V0XT1cInBhZ2UubnVtYmVyXCJcbiAgW2V4dGVybmFsUGFnaW5nXT1cInRydWVcIlxuICBbbGltaXRdPVwicGFnZS5zaXplXCJcbiAgKHBhZ2UpPVwibG9hZFBhZ2UoJGV2ZW50LCBudWxsKVwiPlxuICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gW3N1bW1hcnlGdW5jXT1cInN1bW1hcnlGdW5jXCIgW3dpZHRoXT1cIjMwXCIgW3NvcnRhYmxlXT1cImZhbHNlXCIgW2NhbkF1dG9SZXNpemVdPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2RyYWdnYWJsZV09XCJ0cnVlXCIgW3Jlc2l6ZWFibGVdPVwiZmFsc2VcIiBbaGVhZGVyQ2hlY2tib3hhYmxlXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NoZWNrYm94YWJsZV09XCJ0cnVlXCIgKm5nSWY9XCJlbmFibGVDaGVja2JveFwiPlxuICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxuICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gW3N1bW1hcnlGdW5jXT1cIihjLnN1bW1hcnlGdW5jKSA/IGMuc3VtbWFyeUZ1bmMgOiBzdW1tYXJ5RnVuY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2FuQXV0b1Jlc2l6ZV09XCIoYy5jYW5BdXRvUmVzaXplKSA/IGMuY2FuQXV0b1Jlc2l6ZSA6IHRydWVcIiBbbmFtZV09XCJjLmNvbHVtbk5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3dpZHRoXT1cImMud2lkdGhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3NvcnRhYmxlXT1cIihjLnNvcnRhYmxlKSA/IGMuc29ydGFibGUgOiB0cnVlXCIgW2RyYWdnYWJsZV09XCIoYy5kcmFnZ2FibGUpID8gYy5kcmFnZ2FibGUgOiB0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtyZXNpemVhYmxlXT1cIihjLnJlc2l6ZWFibGUpID8gYy5yZXNpemVhYmxlIDogdHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgYyBvZiBjb2x1bW5zOyBpbmRleCBhcyBpO1wiPlxuICAgIDxuZy10ZW1wbGF0ZSBsZXQtY29sdW1uPVwiY29sdW1uXCIgbmd4LWRhdGF0YWJsZS1oZWFkZXItdGVtcGxhdGUgKm5nSWY9XCJpPT0wXCI+XG4gICAgICA8c3Ryb25nPiM8L3N0cm9uZz5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtcm93PVwicm93XCIgKm5nSWY9XCJpPT0wXCI+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgICAge3tyb3dJbmRleCsxfX1cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8bmctdGVtcGxhdGUgbGV0LWNvbHVtbj1cImNvbHVtblwiIG5neC1kYXRhdGFibGUtaGVhZGVyLXRlbXBsYXRlPlxuICAgICAgPHN0cm9uZz57e2MuY29sdW1uTmFtZX19PC9zdHJvbmc+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXZhbHVlPVwidmFsdWVcIiBsZXQtcm93PVwicm93XCI+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImMuaXNEYXRlQ29sdW1uOyB0aGVuIHQxMFwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImMuaXNDdXJyZW5jeUNvbHVtbiAmJiBjLmN1cnJlbmN5VGV4dDsgdGhlbiB0NDBcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjLmlzQ3VycmVuY3lDb2x1bW4gJiYgIWMuY3VycmVuY3lUZXh0OyB0aGVuIHQ3MFwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjLmlzRGF0ZUNvbHVtbiAmJiAhYy5pc0N1cnJlbmN5Q29sdW1uOyB0aGVuIHQ3MFwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI3QxMD5cbiAgICAgICAgICAgICAgICB7eyhnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpIHwgZGF0ZTonbWVkaXVtJyl9fVxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdDQwPlxuICAgICAgICAgICAgICAgIHt7KGdldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSkgfCBjdXJyZW5jeTpjLmN1cnJlbmN5VGV4dDonY29kZScpfX1cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI3Q3MD5cbiAgICAgICAgICAgICAgICB7e2dldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSl9fVxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XG4gIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBbc3VtbWFyeUZ1bmNdPVwic3VtbWFyeUZ1bmNcIiBbbmFtZV09XCJtb3JlQWN0aW9ucy5uYW1lXCIgKm5nSWY9XCJtb3JlQWN0aW9uc1wiIFtzb3J0YWJsZV09XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2FuQXV0b1Jlc2l6ZV09XCJmYWxzZVwiPlxuICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtdmFsdWU9XCJ2YWx1ZVwiIGxldC1yb3c9XCJyb3dcIj5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLXByZXBlbmRcIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBkcm9wZG93bi10b2dnbGVcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtbGlzdC11bFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj5cbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBtb3JlQWN0aW9ucy5hY3Rpb25zXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiXG4gICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkFjdGlvbkNsaWNrKHtpZDogcm93W21vcmVBY3Rpb25zLmlkRmllbGROYW1lXSwgYWN0aW9uTmFtZTogYWN0aW9uLmFjdGlvbk5hbWUsIGFjdGlvblJvdzogcm93fSlcIj57e2FjdGlvbi5hY3Rpb25OYW1lfX08L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XG48L25neC1kYXRhdGFibGU+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgTWxrRGF0YXRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgdGFibGVSb3dIZWlnaHQgPSA1MDtcbiAgQElucHV0KCkgdGFibGVGb290ZXJIZWlnaHQgPSA1MDtcbiAgQElucHV0KCkgdGFibGVIZWFkZXJIZWlnaHQgPSA1MDtcbiAgQElucHV0KCkgdmVydGljYWxTY3JvbGxBY3RpdmUgPSBmYWxzZTtcbiAgQElucHV0KCkgaG9yaXpvbnRhbFNjcm9sbEFjdGl2ZSA9IGZhbHNlO1xuICBASW5wdXQoKSBjb2x1bW5zOiBBcnJheTxNbGtEYXRhVGFibGVDb2x1bW4+ID0gW107XG4gIEBJbnB1dCgpIGVuYWJsZUNoZWNrYm94ID0gZmFsc2U7XG4gIEBJbnB1dCgpIGVuZHBvaW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGVuYWJsZUZpbHRlckhlYWRlciA9IGZhbHNlO1xuICBASW5wdXQoKSBlbmFibGVEZWZhdWx0VGFibGVIZWFkZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgZW5hYmxlU3VtbWFyeSA9IGZhbHNlO1xuICBASW5wdXQoKSBzdW1tYXJ5UG9zaXRpb24gPSAnXFwnYm90dG9tXFwnJztcbiAgQElucHV0KCkgc3VtbWFyeUhlaWdodCA9ICdcXCdhdXRvXFwnJztcbiAgQElucHV0KCkgbW9yZUFjdGlvbnM6IE1sa01vcmVBY3Rpb25zO1xuICBAT3V0cHV0KCkgb25BY3Rpb25zRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1sa01vcmVBY3Rpb25EYXRhPigpO1xuICBASW5wdXQoKSBmaWx0ZXJDb21wb25lbnRzOiBBcnJheTxNbGtEeW5hbWljQ29udHJvbDxhbnk+PiA9IFtdO1xuICBASW5wdXQoKSBwYXJhbXM6IE1hcDxzdHJpbmcsIGFueT47XG4gIHBhZ2U6IFBhZ2U8YW55PiA9IG5ldyBQYWdlKCk7XG4gIHNlbGVjdGVkID0gW107XG4gIEBPdXRwdXQoKSBvblNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xuICBAVmlld0NoaWxkKERhdGF0YWJsZUNvbXBvbmVudCkgdGFibGU6IERhdGF0YWJsZUNvbXBvbmVudDtcbiAgZmlsdGVyOiBPYmplY3QgPSB7fTtcbiAgZmlsdGVyRm9ybTogRm9ybUdyb3VwO1xuICBlbXB0eVN1bW1hcnlGdW5jOiAoKSA9PiBudWxsO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdGVyd2FyZFNlcnZpY2U6IFN0ZXdhcmRDbGllbnRTZXJ2aWNlPFJlc3BvbnNlV3JhcHBlcjxQYWdlPGFueT4+LCBhbnk+KSB7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgZm9ybSBjb250cm9sIGZyb20gZmlsdGVyQ29tcG9uZW50cyBhbmQgYWxzbyBhcHBlbmRpbmcgZGVmYXVsdCBjb250cm9scyBpZS4gZGF0ZSBmaWx0ZXIgYW5kIHNlYXJjaCBjb250cm9sc1xuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB7fTtcbiAgICB0aGlzLmZpbHRlckNvbXBvbmVudHMuZm9yRWFjaChjb21wID0+IHtcbiAgICAgIGNvbnN0IHZhbGlkYXRvcnM6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgIGlmIChjb21wLmlzUmVxdWlyZWQpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIE1sa0lucHV0IHx8IGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBNbGtUZXh0YXJlYSkge1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW5MZW5ndGgoY29tcC5jb250cm9sVHlwZS5taW5MZW5ndGgpKTtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4TGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWF4TGVuZ3RoKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgTWxrSW5wdXQpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4KGNvbXAuY29udHJvbFR5cGUubWF4KSk7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbihjb21wLmNvbnRyb2xUeXBlLm1pbikpO1xuICAgICAgfVxuICAgICAgZ3JvdXBbY29tcC5uYW1lXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgdmFsaWRhdG9ycyk7XG4gICAgfSk7XG4gICAgLy8gYWRkIGRlZmF1bHQgY29udHJvbHNcbiAgICBncm91cFsnZnJvbSddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgzMCkpO1xuICAgIGdyb3VwWyd0byddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgzMCkpO1xuICAgIGdyb3VwWyduZWVkbGUnXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMjAwKSk7XG4gICAgdGhpcy5maWx0ZXJGb3JtID0gbmV3IEZvcm1Hcm91cChncm91cCk7XG4gICAgdGhpcy5sb2FkUGFnZSh7b2Zmc2V0OiAwLCBsaW1pdDogdGhpcy5wYWdlLnNpemV9LCBudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGVtaXQgY2xpY2sgZXZlbnQgb2YgdGhlIGFjdGlvbnNcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBvbkFjdGlvbkNsaWNrKGV2ZW50OiBNbGtNb3JlQWN0aW9uRGF0YSkge1xuICAgIHRoaXMub25BY3Rpb25zRXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyBzZXJ2ZXIgcmVxdWVzdCBvZiBkYXRhYmxlXG4gICAqIEBwYXJhbSBwYWdlSW5mb1xuICAgKiBAcGFyYW0gZmlsdGVyc1xuICAgKi9cbiAgbG9hZFBhZ2UocGFnZUluZm8sIGZpbHRlcnMpIHtcbiAgICBpZiAoIXRoaXMuZW5kcG9pbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHJlcXVlc3Q6IE1hcDxzdHJpbmcsIGFueT47XG4gICAgaWYgKGZpbHRlcnMpIHtcbiAgICAgIHJlcXVlc3QgPSBmaWx0ZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXJhbXMpIHtcbiAgICAgIHRoaXMucGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgcmVxdWVzdC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmVxdWVzdC5zZXQoJ3BhZ2UnLCBwYWdlSW5mby5vZmZzZXQpO1xuICAgIHJlcXVlc3Quc2V0KCdzaXplJywgcGFnZUluZm8ubGltaXQpO1xuICAgIHRoaXMuc3RlcndhcmRTZXJ2aWNlLmdldCh0aGlzLmVuZHBvaW50LCByZXF1ZXN0KS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLmNvZGUgPT09IDIwMCkge1xuICAgICAgICB0aGlzLnBhZ2UgPSByZXNwb25zZS5kYXRhO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBoYW5kbGUgc2VsZWN0IG9wdGlvblxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIG9uU2VsZWN0KHtzZWxlY3RlZH0pIHtcbiAgICBjb25zb2xlLmxvZygnU2VsZWN0IEV2ZW50Jywgc2VsZWN0ZWQsIHRoaXMuc2VsZWN0ZWQpO1xuXG4gICAgdGhpcy5zZWxlY3RlZC5zcGxpY2UoMCwgdGhpcy5zZWxlY3RlZC5sZW5ndGgpO1xuICAgIHRoaXMuc2VsZWN0ZWQucHVzaCguLi5zZWxlY3RlZCk7XG4gICAgdGhpcy5vblNlbGVjdGVkLmVtaXQodGhpcy5zZWxlY3RlZCk7XG4gIH1cblxuICBvbkFjdGl2YXRlKGV2ZW50KSB7XG5cbiAgfVxuXG4gIHVwZGF0ZUZpbHRlcihldmVudCkge1xuXG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBwcm9jZXNzIHRhYmxlIGZpbHRlci4gSWYgZGF0ZSBmaWx0ZXIgaXMgbm90IHByb3ZpZGUgdGhlIGZyb20gdmFsdWUgaXNcbiAgICogc2V0IHRvIDIwMTgtMDEtMDEgYW5kIHRvIHZhbHVlIGlzIHNldCB0byAxIHllYXIgZnJvbSB0b2RheVxuICAgKiBAcGFyYW0gZm9ybVxuICAgKi9cbiAgcHJvY2Vzc0ZpbHRlcihmb3JtKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGY6IE1hcDxTdHJpbmcsIGFueT4gPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKHRoaXMuZmlsdGVyRm9ybS52YWx1ZSkpO1xuICAgIC8vIHZhbGlkYXRlIGRhdGVcbiAgICBpZiAoIXRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS50b3VjaGVkKSB7Ly8gaWYgZnJvbSBpcyBub3QgcG9wdWxhdGVkIHJlbW92ZSBmcm9tIHJlcXVlc3RcbiAgICAgIGYuZGVsZXRlKCdmcm9tJyk7XG4gICAgICAvLyB0aGlzLmZpbHRlckZvcm0uZ2V0KCdmcm9tJykuc2V0VmFsdWUoJzIwMTgtMDEtMDEnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZi5nZXQoJ2Zyb20nKS5zZXRWYWx1ZShuZXcgRGF0ZSh0aGlzLmZpbHRlckZvcm0uZ2V0KCdmcm9tJykudmFsdWUpKTtcbiAgICAgIGNvbnN0IGZkID0gbmV3IERhdGUodGhpcy5maWx0ZXJGb3JtLmdldCgnZnJvbScpLnZhbHVlKTtcbiAgICAgIGYuc2V0KCdmcm9tJywgZmQudG9JU09TdHJpbmcoKSk7XG4gICAgfVxuICAgIGlmICghdGhpcy5maWx0ZXJGb3JtLmdldCgndG8nKS50b3VjaGVkKSB7Ly8gaWYgdG8gaXMgbm90IHBvcHVsYXRlZCByZW1vdmUgZnJvbSByZXF1ZXN0XG4gICAgICBmLmRlbGV0ZSgndG8nKTtcbiAgICAgIC8vIGxldCB0b0RhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgLy8gdG9EYXRlLnNldERhdGUodG9EYXRlLmdldEZ1bGxZZWFyKCkgKyAxKTtcbiAgICAgIC8vIHRoaXMuZmlsdGVyRm9ybS5nZXQoJ3RvJykuc2V0VmFsdWUodGhpcy5nZXRGb3JtYXR0ZWREYXRlKHRvRGF0ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBmLmdldCgndG8nKS5zZXRWYWx1ZShuZXcgRGF0ZSh0aGlzLmZpbHRlckZvcm0uZ2V0KCd0bycpLnZhbHVlKSk7XG4gICAgICBjb25zdCB0ZCA9IG5ldyBEYXRlKHRoaXMuZmlsdGVyRm9ybS5nZXQoJ3RvJykudmFsdWUpO1xuICAgICAgZi5zZXQoJ3RvJywgdGQudG9JU09TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkUGFnZSh7b2Zmc2V0OiB0aGlzLnBhZ2UubnVtYmVyLCBsaW1pdDogdGhpcy5wYWdlLnNpemV9LCBmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIGlucHV0XG4gICAqIEBwYXJhbSBjb250cm9sXG4gICAqL1xuICBpc0lucHV0KGNvbnRyb2w6IGFueSkge1xuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgTWxrSW5wdXQ7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyBzZWxlY3RcbiAgICogQHBhcmFtIGNvbnRyb2xcbiAgICovXG4gIGlzU2VsZWN0KGNvbnRyb2w6IGFueSkge1xuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgTWxrU2VsZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgdGV4dGFyZWFcbiAgICovXG4gIGlzVGV4dEFyZWEoY29udHJvbDogYW55KSB7XG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBNbGtUZXh0YXJlYTtcbiAgfVxuXG4gIHN1bW1hcnlGdW5jKGNlbGw6IGFueSkge1xuICAgIHJldHVybiAoYGApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZm9ybWF0IGRhdGUgdG8gc3RyaW5nIHl5eXktTU0tZGRcbiAgICogQHBhcmFtIGRhdGVcbiAgICovXG4gIGdldEZvcm1hdHRlZERhdGUoZGF0ZSkge1xuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICBsZXQgbW9udGggPSAoMSArIGRhdGUuZ2V0TW9udGgoKSkudG9TdHJpbmcoKTtcbiAgICBtb250aCA9IG1vbnRoLmxlbmd0aCA+IDEgPyBtb250aCA6ICcwJyArIG1vbnRoO1xuXG4gICAgbGV0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgZGF5ID0gZGF5Lmxlbmd0aCA+IDEgPyBkYXkgOiAnMCcgKyBkYXk7XG5cbiAgICByZXR1cm4geWVhciArICctJyArIG1vbnRoICsgJy0nICsgZGF5O1xuICB9XG5cbiAgZ2V0RmllbGRWYWx1ZShkYXRhOiBPYmplY3QsIGZpZWxkOiBhbnkpIHtcbiAgICBjb25zdCBrOiBBcnJheTxzdHJpbmc+ID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICBjb25zdCBrZXlzID0gbmV3IFF1ZXVlPHN0cmluZz4oLi4uayk7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldE9iamVjdFZhbHVlKGRhdGEsIGtleXMpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGZpbmQga2V5IHZhbHVlIGJhc2VkIG9uIHRoZSBrZXkgc2VxdWVuY2UgcHJvdmlkZWRcbiAgICogQHBhcmFtIGRhdGEgZXhwZWN0cyBhbiBvYmplY3RcbiAgICogQHBhcmFtIGtleXMgaS5lLiB1c2VyLmdlbmRlci50eXBlLnR5cGVcbiAgICovXG4gIGdldE9iamVjdFZhbHVlKGRhdGE6IGFueSwga2V5czogUXVldWU8c3RyaW5nPikge1xuICAgIGlmICgoIShkYXRhIGluc3RhbmNlb2YgT2JqZWN0KSkgfHwgKGtleXMubGVuZ3RoID09PSAxKSkge1xuICAgICAgcmV0dXJuIGRhdGFba2V5cy50YWlsXTtcbiAgICB9XG4gICAgbGV0IHZhbHVlID0gbnVsbDtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICgoa2V5ID09PSBrZXlzLmZyb250KSAmJiAoZGF0YVtrZXldIGluc3RhbmNlb2YgT2JqZWN0KSkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZ2V0T2JqZWN0VmFsdWUoZGF0YVtrZXldLCBrZXlzKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBrZXlzLnRhaWwpIHtcbiAgICAgICAgdmFsdWUgPSBkYXRhW2tleV07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuXG4gIH1cblxufVxuXG4vKipcbiAqIFVzZWQgdG8gZGVmaW5lIGRhdGF0YWJsZSBjb2x1bW5zIHdpdGggYXR0cmlidXRlcyAoY29sdW1uTmFtZSwgZmllbGROYW1lLCB3aWR0aCwgc29ydGFibGUsIGNhbkF1dG9SZXNpemUsXG4gKiBkcmFnZ2FibGUsIHJlc2l6YWJsZSwgaXNEYXRlQ29sdW1uLCBpc0N1cnJlbmN5Q29sdW1uLCBjdXJyZW5jeVRleHQsIHN1bW1hcnlGdW5jKVxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1sa0RhdGFUYWJsZUNvbHVtbiB7XG4gIC8qKlxuICAgKiBjb2x1bW4gdGl0bGVcbiAgICovXG4gIGNvbHVtbk5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIFNlcnZlciBzaWRlIHJlc3BvbnNlIGZpZWxkIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGNvbHVtbiBpLmUgZnVsbE5hbWUgbWF5IGNvcnJlc3BvbmQgdG8gTmFtZSBjb2x1bW5cbiAgICovXG4gIGZpZWxkTmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogV2lkdGggb2YgdGhlIGNvbHVtblxuICAgKi9cbiAgd2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBFbmFibGUgc29ydGluZyBpbiBhIGNvbHVtblxuICAgKi9cbiAgc29ydGFibGU/OiBib29sZWFuO1xuICAvKipcbiAgICogTWFrZXMgYSBjb2x1bW4gcmVzaXphYmxlXG4gICAqL1xuICBjYW5BdXRvUmVzaXplPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEVuYWJsZXMgYSBjb2x1bW4gdG8gYmUgZHJhZ2dhYmxlXG4gICAqL1xuICBkcmFnZ2FibGU/OiBib29sZWFuO1xuICAvKipcbiAgICogTWFrZXMgYSBjb2x1bW4gcmVzaXphYmxlXG4gICAqL1xuICByZXNpemVhYmxlPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFVzZWQgdG8gZW5hYmxlIGZvcm1hdGluZyB0aW1lc3RhbXAgdG8gc3RyaW5nIGRhdGVcbiAgICovXG4gIGlzRGF0ZUNvbHVtbj86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZW5hYmxlIGZvcm1hdGluZyBzdHJpbmcgdG8gc3RyaW5nIGN1cnJlbmN5XG4gICAqL1xuICBpc0N1cnJlbmN5Q29sdW1uPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogVXNlZCB0byBzZXQgdGhlIGN1cnJlbmN5IHN0cmluZ1xuICAgKi9cbiAgY3VycmVuY3lUZXh0Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBjYWxsIGF0IHRoZSBzdW1tYXJ5IHJvd1xuICAgKi9cbiAgc3VtbWFyeUZ1bmM/OiAoYW55OiBhbnlbXSkgPT4gYW55O1xufVxuXG4vKipcbiAqIFVzZWQgdG8gZGlzcGxheSBtb3JlIGFjdGlvbnMgY29sdW1uIGFuZCB0aGUgZW5kIG9mIHRoZSB0YWJsZVxuICovXG5leHBvcnQgY2xhc3MgTWxrTW9yZUFjdGlvbnMge1xuICAvKipcbiAgICogQWN0aW9uIENvbHVtbiBuYW1lIGUuZy4gTW9yZSBBY3Rpb25zXG4gICAqL1xuICBuYW1lID0gJ0FjdGlvbnMnO1xuICAvKipcbiAgICogRmllbGQgbmFtZSBpZCBmcm9tIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgZS5nIHVzZXJJZFxuICAgKi9cbiAgaWRGaWVsZE5hbWUgPSAnaWQnO1xuICAvKipcbiAgICogQWN0aW9ucyBlLmcuIEVkaXQsIERlbGV0ZVxuICAgKi9cbiAgYWN0aW9uczogQXJyYXk8TWxrTW9yZUFjdGlvbkRhdGE+O1xuXG4gIGNvbnN0cnVjdG9yKGFjdGlvbnM6IEFycmF5PE1sa01vcmVBY3Rpb25EYXRhPiwgaWQ/OiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pZEZpZWxkTmFtZSA9IGlkO1xuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNbGtNb3JlQWN0aW9uRGF0YSB7XG4gIC8qKlxuICAgKiBOZXZlciBtaW5kIHRoaXMgZmllbGQgaXQgd2lsbCBiZSB1c2VkIGJ5IHRoZSBsaWJyYXJ5XG4gICAqL1xuICBpZD86IGFueTtcbiAgLyoqXG4gICAqIEFjdGlvbiBuYW1lIGUuZy4gRWRpdCwgRGVsZXRlXG4gICAqL1xuICBhY3Rpb25OYW1lOiBhbnk7XG5cbiAgLyoqXG4gICAqIEFjdGlvbiByb3cgOiB0aGUgY2xpY2tlZCByb3dcbiAgICovXG4gIGFjdGlvblJvdz86IGFueTtcbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdGV3YXJkQ2xpZW50Q29tcG9uZW50IH0gZnJvbSAnLi9zdGV3YXJkLWNsaWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWxrRGF0YXRhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9tbGstZGF0YXRhYmxlL21say1kYXRhdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ3hEYXRhdGFibGVNb2R1bGUgfSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTdGV3YXJkQ29uZmlnIH0gZnJvbSAnLi9zdGV3YXJkLWNsaWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IEJzRGF0ZXBpY2tlck1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAvZGF0ZXBpY2tlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE5neERhdGF0YWJsZU1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQnNEYXRlcGlja2VyTW9kdWxlLmZvclJvb3QoKSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1N0ZXdhcmRDbGllbnRDb21wb25lbnQsIE1sa0RhdGF0YWJsZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtTdGV3YXJkQ2xpZW50Q29tcG9uZW50LCBNbGtEYXRhdGFibGVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDbGllbnRNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IFN0ZXdhcmRDb25maWcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFN0ZXdhcmRDbGllbnRNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFsge3Byb3ZpZGU6IFN0ZXdhcmRDb25maWcsIHVzZVZhbHVlOiBjb25maWd9IF1cbiAgICB9XG4gIH1cbiB9XG4iXSwibmFtZXMiOlsiaHR0cCIsIkh0dHBIZWFkZXJzIiwiY2F0Y2hFcnJvciIsIkh0dHBQYXJhbXMiLCJvZiIsIkluamVjdGFibGUiLCJIdHRwQ2xpZW50IiwiQ29tcG9uZW50IiwiRXZlbnRFbWl0dGVyIiwiVmFsaWRhdG9ycyIsIkZvcm1Db250cm9sIiwiRm9ybUdyb3VwIiwiUXVldWUiLCJJbnB1dCIsIk91dHB1dCIsIlZpZXdDaGlsZCIsIkRhdGF0YWJsZUNvbXBvbmVudCIsIk5nTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiTmd4RGF0YXRhYmxlTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiQnNEYXRlcGlja2VyTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7Ozs7OztRQUFBO1NBYUM7UUFBRCxzQkFBQztJQUFELENBQUM7Ozs7OztBQ2hCRDtRQU1BO1NBSUM7UUFBRCxvQkFBQztJQUFELENBQUMsSUFBQTs7OztBQUVEO1FBT0UsOEJBQW9CQSxPQUFnQixFQUFVLE1BQXFCO1lBQS9DLFNBQUksR0FBSkEsT0FBSSxDQUFZO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtZQUZuRSxhQUFRLEdBQUcsR0FBRyxDQUFDO1lBR2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxN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