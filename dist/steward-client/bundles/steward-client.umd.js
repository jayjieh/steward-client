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
            this.base_url = "/";
            this.base_url = config.base_url;
            if (config.headers) {
                this.headers = config.headers.append('Content-Type', 'application/json; charset=utf-8');
            }
            else {
                this.headers = new http.HttpHeaders({
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
                return this.http.post(this.base_url + endpoint, JSON.stringify(data), { headers: this.headers }).pipe(operators.catchError(this.handleError()));
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
                return this.http.put(this.base_url + endpoint, JSON.stringify(data), { headers: this.headers }).pipe(operators.catchError(this.handleError()));
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
                return this.http.request('delete', this.base_url + endpoint, { headers: this.headers, body: JSON.stringify(data) }).pipe(operators.catchError(this.handleError()));
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
                if (this.headers.get("Authorization") && (!headers)) {
                    headers = new http.HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
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
                return this.http.post(this.base_url + endpoint, formData, { headers: new http.HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(operators.catchError(this.handleError()));
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
                return this.http.put(this.base_url + endpoint, formData, { headers: new http.HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(operators.catchError(this.handleError()));
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
                    if (error.status == 500) {
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
    //const { Queue } = require('queue-typescript');
    var MlkDatatableComponent = (function () {
        function MlkDatatableComponent(sterwardService) {
            this.sterwardService = sterwardService;
            this.columns = [];
            this.enableCheckbox = false;
            this.enableFilterHeader = false;
            this.enableDefaultTableHeader = false;
            this.enableSummary = false;
            this.summaryPosition = "'bottom'";
            this.summaryHeight = "'auto'";
            this.onActionsEvent = new core.EventEmitter();
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
                //add default controls
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
            { type: core.Component, args: [{
                        selector: 'stw-mlk-datatable',
                        template: "<div class=\"card card-outline-default\" *ngIf=\"enableFilterHeader\">\n<div class=\"card-body\">\n<form (ngSubmit)=\"processFilter(filterForm)\" [formGroup]=\"filterForm\">\n\n<div class=\"row\">\n          <div class=\"col-md-3  mb-3\" *ngFor=\"let control of filterComponents\">\n            <label for=\"from\">{{control.label}}: </label>\n            <div class=\"input-group\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text  form-icon-default\">\n                  <i [class]=\"control.icon\"></i>\n                </span>\n              </div>\n  \n              <select *ngIf=\"isSelect(control.controlType)\" class=\"form-control form-control-sm checking-field\" [formControlName]=\"control.name\">\n                <option value=\"\" disabled selected>{{control.placeholder}}</option>\n                <option *ngFor=\"let o of control.controlType.options\">{{o.text}}</option>\n              </select>\n  \n              <textarea *ngIf=\"isTextArea(control.controlType)\" [cols]=\"control.controlType.cols\" [rows]=\"control.controlType.rows\" class=\"form-control form-control-sm checking-field\"\n                [placeholder]=\"control.placeholder\" [formControlName]=\"control.name\"></textarea>\n  \n              <input *ngIf=\"isInput(control.controlType)\" [type]=\"control.controlType.type\" [placeholder]=\"control.placeholder\" class=\"form-control form-control-sm checking-field\"\n                [formControlName]=\"control.name\" />\n            </div>\n            <span class=\"help-block\" *ngIf=\"filterForm.get(control.name).touched\">\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}} is required</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of {{control.controlType.minLength}} characters</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of {{control.controlType.maxLength}} characters</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('min')\">Should be greater than {{control.controlType.min}}</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('max')\">Should be less than {{control.controlType.max}}</span>\n            </span>\n          </div>\n</div>\n\n<div class=\"row\" *ngIf=\"enableDefaultTableHeader\">\n          <div class=\"col-md-3 mb-3\">\n            <label for=\"from\">From: </label>\n            <div class=\"input-group\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-calendar-o\"></i>\n                </span>\n              </div>\n                <input \n                type=\"text\" \n                class=\"form-control form-control-sm checking-field\" \n                id=\"inputTravelDate\" \n                formControlName=\"from\" \n                placeholder=\"From...\"\n                #dpfrom=\"bsDatepicker\"\n                bsDatepicker\n                [outsideClick]=\"false\"\n                [bsConfig]=\"{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }\"\n                maxlength=\"30\"\n                required\n                readonly\n                />\n                  <div class=\"input-group-append\">\n                    <button class=\"btn btn-primary\" type=\"button\" (click)=\"dpfrom.toggle()\" [attr.aria-expanded]=\"dpfrom.isOpen\"><i class=\"fa fa-th\"></i></button>\n                  </div>\n            </div>\n            <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n                <span class=\"text-danger\" *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 30 characters</span>\n            </span>\n          </div>\n          <div class=\"col-md-3 mb-3\">\n            <label for=\"from\">To: </label>\n            <div class=\"input-group\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-calendar-o\"></i>\n                </span>\n              </div>\n                <input \n                type=\"text\" \n                class=\"form-control form-control-sm checking-field\" \n                id=\"inputTravelDate\" \n                formControlName=\"to\" \n                placeholder=\"To...\"\n                #dpto=\"bsDatepicker\"\n                bsDatepicker\n                [outsideClick]=\"false\"\n                [bsConfig]=\"{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }\"\n                maxlength=\"30\"\n                required\n                readonly\n                />\n                  <div class=\"input-group-append\">\n                    <button class=\"btn btn-primary\" type=\"button\" (click)=\"dpto.toggle()\" [attr.aria-expanded]=\"dpto.isOpen\"><i class=\"fa fa-th\"></i></button>\n                  </div>  \n            </div>\n            <span class=\"help-block\" *ngIf=\"filterForm.get('to').touched\">\n                <span class=\"text-danger\" *ngIf=\"filterForm.get('to').hasError('maxlength')\">Maximum of 30 characters</span>\n            </span>\n          </div>\n          <div class=\"col-md-3 mb-3\">\n            <label for=\"search\">Search:</label>\n            <div class=\"input-group\">\n              <div class=\"input-group-prepend\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-search\"></i>\n                </span>\n              </div>\n              <input formControlName=\"needle\" class=\"form-control form-control-sm checking-field\" type=\"text\"\n                placeholder=\"Search...\" (keyup)=\"updateFilter($event)\" />\n            </div>\n          </div>\n          <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n              <span class=\"text-danger\" *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 200 characters</span>\n          </span>\n</div>\n\n<div class=\"row\">\n\t<div class=\"col-md-12\">\n            <div class=\"pull-right inline-buttons\">\n              <button class=\"btn btn-warning btn-sm\" type=\"reset\">\n                <i class=\"fa fa-repeat\" aria-hidden=\"true\"></i>\n                Reset\n              </button>\n              <button class=\"btn btn-success btn-sm pull-right\" type=\"submit\">\n                <i class=\"fa fa-filter\" aria-hidden=\"true\"></i>\n                Filter\n              </button>\n            </div>\n\t</div>\n</div>\n      \n</form>\n</div>\n</div>\n  \n  <ngx-datatable \n    #table \n    [summaryRow]=\"enableSummary\"\n    [summaryPosition]=\"summaryPosition\"\n    [summaryHeight]=\"summaryHeight\"\n    class=\"bootstrap\" \n    [headerHeight]=\"50\" \n    [columnMode]=\"'force'\" \n    [footerHeight]=\"50\" \n    [rowHeight]=\"'auto'\"\n    [rows]=\"page.content\" \n    [selected]=\"selected\" \n    [selectionType]=\"'checkbox'\" \n    (activate)=\"onActivate($event)\" \n    (select)='onSelect($event)'\n    [count]=\"page.totalElements\" \n    [offset]=\"page.number\" \n    [externalPaging]=\"true\" \n    [limit]=\"page.size\" \n    (page)=\"loadPage($event, null)\">\n    <ngx-datatable-column [summaryFunc]=\"summaryFunc\" [width]=\"30\" [sortable]=\"false\" [canAutoResize]=\"false\" [draggable]=\"true\" [resizeable]=\"false\" [headerCheckboxable]=\"true\"\n      [checkboxable]=\"true\" *ngIf=\"enableCheckbox\">\n    </ngx-datatable-column>\n    <ngx-datatable-column [summaryFunc]=\"(c.summaryFunc) ? c.summaryFunc : summaryFunc\" [canAutoResize]=\"(c.canAutoResize) ? c.canAutoResize : true\" [name]=\"c.columnName\" [width]=\"c.width\"\n      [sortable]=\"(c.sortable) ? c.sortable : true\" [draggable]=\"(c.draggable) ? c.draggable : true\" [resizeable]=\"(c.resizeable) ? c.resizeable : true\"\n      *ngFor=\"let c of columns\">\n      <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <strong>{{c.columnName}}</strong>\n      </ng-template>\n      <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n        <span>\n            {{(c.isDateColumn)? (getFieldValue(row, c.fieldName) | date:'medium') : getFieldValue(row, c.fieldName)}}\n        </span>\n      </ng-template>\n    </ngx-datatable-column>\n    <ngx-datatable-column [summaryFunc]=\"summaryFunc\" [name]=\"moreActions.name\" *ngIf=\"moreActions\" [sortable]=\"false\" [canAutoResize]=\"false\">\n      <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n        <span>\n          <div class=\"input-group-prepend\">\n            <button class=\"btn btn-sm btn-outline-secondary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\n              aria-expanded=\"false\">\n              <i class=\"fa fa-list-ul\" aria-hidden=\"true\"></i>\n            </button>\n            <div class=\"dropdown-menu\">\n              <a class=\"dropdown-item\" *ngFor=\"let action of moreActions.actions\" href=\"javascript:;\" (click)=\"onActionClick({id: row[moreActions.idFieldName], actionName: action.actionName, actionRow: row})\">{{action.actionName}}</a>\n              <!-- <a class=\"dropdown-item\" href=\"#\">Another action</a>\n                            <a class=\"dropdown-item\" href=\"#\">Something else here</a>\n                            <div role=\"separator\" class=\"dropdown-divider\"></div>\n                            <a class=\"dropdown-item\" href=\"#\">Separated link</a> -->\n            </div>\n          </div>\n        </span>\n      </ng-template>\n    </ngx-datatable-column>\n    <!-- <ngx-datatable-column name=\"Description\">\n              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n                <span>\n                  {{value}}\n                </span>\n              </ng-template>\n            </ngx-datatable-column>\n            <ngx-datatable-column name=\"Actions\">\n              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n                <span>\n                  {{value}}\n                </span>\n              </ng-template>\n            </ngx-datatable-column> -->\n  </ngx-datatable>\n",
                        styles: [""]
                    },] },
        ];
        MlkDatatableComponent.ctorParameters = function () {
            return [
                { type: StewardClientService }
            ];
        };
        MlkDatatableComponent.propDecorators = {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlci50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9zdGV3YXJkLWNsaWVudC5jb21wb25lbnQudHMiLG51bGwsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy93cmFwcGVycy9tbGstZHluYW1pYy1jb250cm9sLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvbWxrLWRhdGF0YWJsZS9tbGstZGF0YXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFdyYXBzIHNlcnZlciByZXNwb25zZVxuICovXG5leHBvcnQgY2xhc3MgUmVzcG9uc2VXcmFwcGVyPFQ+IHtcbiAgICAvKipcbiAgICAgKiBIdHRwIHN0YXR1cyBjb2RlIGUuZy4gMjAwXG4gICAgICovXG4gICAgY29kZTogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFNlcnZlciBtZXNzYWdlXG4gICAgICovXG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEFjdHVhbCByZXNwb25zZSBkYXRhXG4gICAgICovXG4gICAgZGF0YTogVDtcbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwRXJyb3JSZXNwb25zZSwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFJlc3BvbnNlV3JhcHBlciB9IGZyb20gJy4vZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlcic7XG5cbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ29uZmlnIHtcbiAgICBiYXNlX3VybDogc3RyaW5nO1xuICAgIGFjY2Vzc190b2tlbj86IHN0cmluZztcbiAgICBoZWFkZXJzPzogSHR0cEhlYWRlcnM7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ2xpZW50U2VydmljZTxULCBFPiB7XG5cbiAgICBwcml2YXRlIGhlYWRlcnM6IEh0dHBIZWFkZXJzO1xuICAgIHRva2VuOiBzdHJpbmc7XG4gICAgYmFzZV91cmw6IHN0cmluZyA9IFwiL1wiO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBjb25maWc6IFN0ZXdhcmRDb25maWcpIHtcbiAgICAgICAgdGhpcy5iYXNlX3VybCA9IGNvbmZpZy5iYXNlX3VybDtcbiAgICAgICAgaWYgKGNvbmZpZy5oZWFkZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcuYWNjZXNzX3Rva2VuKSB7Ly9hcHBlbmQgYWNjZXNzIHRva2VuIGlmIHRoZSBlbnZpcm9ubWVudCBoYXMgYWNjZXNzIHRva2VuXG4gICAgICAgICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgXCJCZWFyZXIgXCIgKyBjb25maWcuYWNjZXNzX3Rva2VuKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGhhbmRsZSBodHRwIHBvc3QgcmVxdWVzdHNcbiAgICAgKi9cbiAgICBwb3N0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBKU09OLnN0cmluZ2lmeShkYXRhKSwgeyBoZWFkZXJzOiB0aGlzLmhlYWRlcnMgfSkucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBoYW5kbGUgaHR0cCBwb3N0IHJlcXVlc3RzXG4gICAgICovXG4gICAgcHV0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycyB9KS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBkZWxldGUoZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdCgnZGVsZXRlJywgdGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCB7IGhlYWRlcnM6IHRoaXMuaGVhZGVycywgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSkgfSkucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZ2V0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgb3B0aW9ucykucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXG4gICAgICAgICk7XG4gICAgfVxuXG5cbiAgICBnZXRGaWxlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCArICc/YWNjZXNzX3Rva2VuPScgKyB0aGlzLnRva2VuLCBvcHRpb25zKS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogaWZcbiAgICAgKiBAcGFyYW0gZW5kcG9pbnQgXG4gICAgICogQHBhcmFtIGRhdGEgXG4gICAgICogQHBhcmFtIGhlYWRlcnMgXG4gICAgICovXG4gICAgcG9zdEZvcm1EYXRhKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQsIGhlYWRlcnM/OiBIdHRwSGVhZGVycyk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZih0aGlzLmhlYWRlcnMuZ2V0KFwiQXV0aG9yaXphdGlvblwiKSAmJiAoIWhlYWRlcnMpKXtcbiAgICAgICAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoeyAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRoaXMudG9rZW4gfSk7XG4gICAgICAgIH0gZWxzZSBpZighaGVhZGVycyl7XG4gICAgICAgICAgICBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgZm9ybURhdGEsIHsgaGVhZGVyczogaGVhZGVyc30pLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHBvc3RGb3JtRGF0YU11bHRpcGFydChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcbiAgICAgICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSkge1xuICAgICAgICAgICAgICAgIGRhdGFba2V5XS5mb3JFYWNoKGsyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgazIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYmFzZV91cmwgKyBlbmRwb2ludCwgZm9ybURhdGEsIHsgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0aGlzLnRva2VuIH0pIH0pLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1dEZvcm1EYXRhTXVsdGlQYXJ0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xuICAgICAgICBjb25zdCBmb3JtRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgZGF0YVtrZXldLmZvckVhY2goazIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBrMik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIGZvcm1EYXRhLCB7IGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7ICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdGhpcy50b2tlbiB9KSB9KS5waXBlKFxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEh0dHBQYXJhbXMoZGF0YTogTWFwPHN0cmluZywgc3RyaW5nPik6IEh0dHBQYXJhbXMge1xuICAgICAgICBpZiAoZGF0YSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcygpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBodHRwUGFyYW1zOiBIdHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgZGF0YS5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gY2F0Y2ggZXhjZXB0aW9uIHRocm93biBieSBodHRwIGNsaWVudCByZXR1cm5zIGludGVybmFsIHNlcnZlciBlcnJvclxuICAgICAqIGlmIHN0YXR1cyA1MDAgaXMgZW5jb3VudGVyZWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGhhbmRsZUVycm9yPFJlc3BvbnNlV3JhcHBlcj4oKSB7XG4gICAgICAgIHJldHVybiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IG5ldyBSZXNwb25zZVdyYXBwZXIoKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7IC8vIGxvZyB0byBjb25zb2xlIGluc3RlYWRcbiAgICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT0gNTAwKSB7XG4gICAgICAgICAgICAgICAgcmVzLmNvZGUgPSBlcnJvci5zdGF0dXM7XG4gICAgICAgICAgICAgICAgcmVzLm1lc3NhZ2UgPSAnU29ycnkgaW50ZXJuYWwgc2VydmVyIGVycm9yIG9jY3VyZWQgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlcic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlcy5jb2RlID0gZXJyb3Iuc3RhdHVzO1xuICAgICAgICAgICAgICAgIHJlcy5tZXNzYWdlID0gZXJyb3IuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgICAgICByZXMuZGF0YSA9IGVycm9yLmVycm9yLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2YocmVzKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXNlZCB0byByZW5kZXIgYWN0aW9uIGJ1dHRvbnNcbiAgICAgKi9cbiAgICBzdGF0aWMgcmVuZGVyTW9yZShpZDogYW55KSB7XG4gICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cXCdhY3Rpb25zLWJ1dHRvbnMgY2VudGVyXFwnIGlkPVxcJycgKyBpZCArICdcXCc+PGkgY2xhc3M9XFwnZmEgZmEtY2hlY2tcXCcgdGl0bGU9XFwnQXBwcm92ZVxcJz48L2k+IDxpIGNsYXNzPVxcJ2ZhIGZhLWJhblxcJyB0aXRsZT1cXCdEZWNsaW5lXFwnPjwvaT48L2Rpdj4nO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbnRpYXRlRGF0YVRhYmxlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICAgICAgICBwYXJhbXM6IHRoaXMuZ2V0SHR0cFBhcmFtcyhkYXRhKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIG9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N0dy1zdGV3YXJkLWNsaWVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBzdGV3YXJkLWNsaWVudCB3b3JrcyFcbiAgICA8L3A+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIi8qKlxuICogRGF0YWJsZSBwYWdlIHVzZWQgdG8gd3JhcHBlciBzZXJ2ZXIgY29udGVudCByZXNwb25zZVxuICovXG5leHBvcnQgY2xhc3MgUGFnZTxUPiB7XG4gICAgLyoqXG4gICAgICogTnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlIHNhbWUgYXMgbGltaXRcbiAgICAgKi9cbiAgICBzaXplOiBudW1iZXIgPSAxMDtcbiAgICAvKipcbiAgICAgKiBUb3RhbCBpdGVtcyBhdmFpbGFibGUgb24gdGhlIHNlcnZlclxuICAgICAqL1xuICAgIHRvdGFsRWxlbWVudHM6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogVG90YWwgbnVtYmVyIG9mIHBhZ2VzIHByZXNlbnRcbiAgICAgKi9cbiAgICB0b3RhbFBhZ2VzOiBudW1iZXIgPSAwO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBpcyB0aGUgZmlyc3QgcGFnZVxuICAgICAqL1xuICAgIGZpcnN0OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgaXQgaXMgdGhlIGxhc3QgcGFnZVxuICAgICAqL1xuICAgIGxhc3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBUaGUgYWN0dWFsIHBhZ2UgY29udGVudFxuICAgICAqL1xuICAgIGNvbnRlbnQ6IEFycmF5PFQ+ID0gW107XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBtYXAgc29ydCBwYXJhbWV0ZXJzXG4gICAgICovXG4gICAgc29ydGVkOiBTb3J0ID0gbmV3IFNvcnQoKTtcbiAgICAvKipcbiAgICAgKiBDdXJyZW50IHBhZ2UgbnVtYmVyXG4gICAgICovXG4gICAgbnVtYmVyOiBudW1iZXIgPSAwO1xufVxuLyoqXG4gKiB1c2VkIHRvIG1hcCBzb3J0IHJlcXVlc3RcbiAqL1xuZXhwb3J0IGNsYXNzIFNvcnR7XG4gICAgc29ydGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgdW5zb3J0ZWQ6IGJvb2xlYW4gPSB0cnVlO1xufVxuIiwiLyoqXG4gKiBSZXByZXNlbnRzIGR5bmFtaWMgaHRtbCBjb250cm9scyAoSW5wdXQsIFRleHRBcmVhIGFuZCBTZWxlY3QpXG4gKi9cbmV4cG9ydCBjbGFzcyBNbGtEeW5hbWljQ29udHJvbDxUPiB7XG4gICAgLyoqXG4gICAgICogQ29udHJvbCBsYWJlbFxuICAgICAqL1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogSWNvbiB0byBiZSBhcHBlbmRlZCBiZWZvcmUgdGhlIGNvbnRyb2wgKHN1cHBvcnRzIGNsYXNzIGRlZmluZWQgaWNvbnMpXG4gICAgICovXG4gICAgaWNvbjogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGNvbnRyb2wgKHByb3ZpZGUgdmFyaWFibGUgdmFsaWQgbmFtZXMgaWUuIG5vIHNwYWNlcyBwcmVmYXJhYmx5IGFwaSBjb3JyZXNwb25kaW5nIG5hbWVzIGUuZy4gdXNlck5hbWUpXG4gICAgICovXG4gICAgbmFtZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRoZSBhY3R1YWwgY29udHJvbCAoTWxrSW5wdXQsIE1sa1RleHRBcmVhICYgTWxrU2VsZWN0KVxuICAgICAqL1xuICAgIGNvbnRyb2xUeXBlOiBUO1xuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgZmllbGQgaXMgcmVxdWlyZWRcbiAgICAgKi9cbiAgICBpc1JlcXVpcmVkOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIENvbnRyb2wgcGxhY2Vob2xkZXJcbiAgICAgKi9cbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nID0gXCJcIjtcblxuICAgIGNvbnN0cnVjdG9yKGxhYmVsOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY29udHJvbFR5cGU6IFQsIGljb246IHN0cmluZyA9IFwiZmEgZmEtZmlsZS10ZXh0LW9cIixcbiAgICAgICAgaXNSZXF1aXJlZDogYm9vbGVhbiA9IHRydWUsIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBudWxsKSB7XG4gICAgICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jb250cm9sVHlwZSA9IGNvbnRyb2xUeXBlO1xuICAgICAgICB0aGlzLmljb24gPSBpY29uO1xuICAgICAgICB0aGlzLmlzUmVxdWlyZWQgPSBpc1JlcXVpcmVkO1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXIgPyBwbGFjZWhvbGRlciA6IGxhYmVsO1xuICAgIH1cblxufVxuLyoqXG4gKiBVc2VkIHRvIHJlcHJlc2VudCBodG1sIGlucHV0IHdpdGggb3B0aW9uczpcbiAqIHR5cGU6IGRlZmF1bHQgdG8gdGV4dCwgIG1heExlbmd0aCwgbWluTGVuZ3RoLCBtaW4sIG1heFxuICovXG5leHBvcnQgY2xhc3MgTWxrSW5wdXR7XG4gICAgLyoqXG4gICAgICogVHlwZSBvZiBpbnB1dCBlLmcuIHRleHQsIG51bWJlciwgZGF0ZVxuICAgICAqL1xuICAgIHR5cGU6IHN0cmluZyA9IFwidGV4dFwiO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgbGVuZ3RoIG9mIHRoZSBpbnB1dFxuICAgICAqL1xuICAgIG1heExlbmd0aDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgbWluaW11bSBpbnB1dCBsZW5ndGhcbiAgICAgKi9cbiAgICBtaW5MZW5ndGg6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIG51bWJlciBpbnB1dHNcbiAgICAgKi9cbiAgICBtaW46IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIG51bWJlciBpbnB1dHNcbiAgICAgKi9cbiAgICBtYXg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZyA9IFwidGV4dFwiKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMubWluTGVuZ3RoID0gdGhpcy5taW4gPSAwO1xuICAgICAgICB0aGlzLm1heExlbmd0aCA9IDQwMDA7XG4gICAgICAgIHRoaXMubWF4ID0gMTAwMDAwMDAwMDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBodG1sIHRleHRhcmVhIGlucHV0XG4gKi9cbmV4cG9ydCBjbGFzcyBNbGtUZXh0YXJlYXtcbiAgICAvKipcbiAgICAgKiBOdW1iZXIgdGV4dGFyZWEgY29sdW1uc1xuICAgICAqL1xuICAgIGNvbHM/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogTnVtYmVyIG9mIHRleHRhcmVhIHJvd3NcbiAgICAgKi9cbiAgICByb3dzPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIG1heGltdW0gaW5wdXQgbGVuZ3RoXG4gICAgICovXG4gICAgbWF4TGVuZ3RoOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgbWluaW11bSBpbnB1dCBsZW5ndGhcbiAgICAgKi9cbiAgICBtaW5MZW5ndGg6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKGNvbHM6IG51bWJlciA9IDUsIHJvd3M6IG51bWJlciA9IDEpe1xuICAgICAgICB0aGlzLmNvbHMgPSBjb2xzO1xuICAgICAgICB0aGlzLnJvd3MgPSByb3dzO1xuICAgICAgICB0aGlzLm1heExlbmd0aCA9IDQwMDA7XG4gICAgICAgIHRoaXMubWluTGVuZ3RoID0gMFxuICAgIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGh0bWwgc2VsZWN0IGNvbnRyb2xcbiAqL1xuZXhwb3J0IGNsYXNzIE1sa1NlbGVjdCB7XG4gICAgLyoqXG4gICAgICogU2VsZWN0IG9wdGlvbnNcbiAgICAgKi9cbiAgICBvcHRpb25zOiBBcnJheTxNbGtTZWxlY3RPcHRpb24+O1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogQXJyYXk8TWxrU2VsZWN0T3B0aW9uPil7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBNbGtTZWxlY3RPcHRpb257XG4gICAgLyoqXG4gICAgICogT3B0aW9uIHZhbHVlXG4gICAgICovXG4gICAgdmFsdWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBPcHRpb24gdGV4dC9sYWJlbFxuICAgICAqL1xuICAgIHRleHQ6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBzdHJpbmcsIHRleHQ6IHN0cmluZyA9IG51bGwpe1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQgPyB0ZXh0IDogdmFsdWU7XG4gICAgfVxuXG59XG5cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdGb3JtLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UnO1xuaW1wb3J0IHsgTWxrRHluYW1pY0NvbnRyb2wsIE1sa0lucHV0LCBNbGtUZXh0YXJlYSwgTWxrU2VsZWN0IH0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvbWxrLWR5bmFtaWMtY29udHJvbCc7XG5pbXBvcnQgeyBSZXNwb25zZVdyYXBwZXIgfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9yZXNwb25zZS13cmFwcGVyJztcbmltcG9ydCB7IFN0ZXdhcmRDbGllbnRTZXJ2aWNlIH0gZnJvbSAnLi4vc3Rld2FyZC1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhdGFibGVDb21wb25lbnQgfSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XG5pbXBvcnQgeyBRdWV1ZSB9IGZyb20gJ3F1ZXVlLXR5cGVzY3JpcHQnO1xuLy9jb25zdCB7IFF1ZXVlIH0gPSByZXF1aXJlKCdxdWV1ZS10eXBlc2NyaXB0Jyk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N0dy1tbGstZGF0YXRhYmxlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY2FyZCBjYXJkLW91dGxpbmUtZGVmYXVsdFwiICpuZ0lmPVwiZW5hYmxlRmlsdGVySGVhZGVyXCI+XG48ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XG48Zm9ybSAobmdTdWJtaXQpPVwicHJvY2Vzc0ZpbHRlcihmaWx0ZXJGb3JtKVwiIFtmb3JtR3JvdXBdPVwiZmlsdGVyRm9ybVwiPlxuXG48ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zICBtYi0zXCIgKm5nRm9yPVwibGV0IGNvbnRyb2wgb2YgZmlsdGVyQ29tcG9uZW50c1wiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZyb21cIj57e2NvbnRyb2wubGFiZWx9fTogPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0ICBmb3JtLWljb24tZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgICAgPGkgW2NsYXNzXT1cImNvbnRyb2wuaWNvblwiPjwvaT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICBcbiAgICAgICAgICAgICAgPHNlbGVjdCAqbmdJZj1cImlzU2VsZWN0KGNvbnRyb2wuY29udHJvbFR5cGUpXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLm5hbWVcIj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQgc2VsZWN0ZWQ+e3tjb250cm9sLnBsYWNlaG9sZGVyfX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBvIG9mIGNvbnRyb2wuY29udHJvbFR5cGUub3B0aW9uc1wiPnt7by50ZXh0fX08L29wdGlvbj5cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gIFxuICAgICAgICAgICAgICA8dGV4dGFyZWEgKm5nSWY9XCJpc1RleHRBcmVhKGNvbnRyb2wuY29udHJvbFR5cGUpXCIgW2NvbHNdPVwiY29udHJvbC5jb250cm9sVHlwZS5jb2xzXCIgW3Jvd3NdPVwiY29udHJvbC5jb250cm9sVHlwZS5yb3dzXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCJcbiAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCI+PC90ZXh0YXJlYT5cbiAgXG4gICAgICAgICAgICAgIDxpbnB1dCAqbmdJZj1cImlzSW5wdXQoY29udHJvbC5jb250cm9sVHlwZSlcIiBbdHlwZV09XCJjb250cm9sLmNvbnRyb2xUeXBlLnR5cGVcIiBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXG4gICAgICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLm5hbWVcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkudG91Y2hlZFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdyZXF1aXJlZCcpXCI+e3tjb250cm9sLnBsYWNlaG9sZGVyfX0gaXMgcmVxdWlyZWQ8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21pbmxlbmd0aCcpXCI+TWluaW11bSBvZiB7e2NvbnRyb2wuY29udHJvbFR5cGUubWluTGVuZ3RofX0gY2hhcmFjdGVyczwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIHt7Y29udHJvbC5jb250cm9sVHlwZS5tYXhMZW5ndGh9fSBjaGFyYWN0ZXJzPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtaW4nKVwiPlNob3VsZCBiZSBncmVhdGVyIHRoYW4ge3tjb250cm9sLmNvbnRyb2xUeXBlLm1pbn19PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtYXgnKVwiPlNob3VsZCBiZSBsZXNzIHRoYW4ge3tjb250cm9sLmNvbnRyb2xUeXBlLm1heH19PC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJyb3dcIiAqbmdJZj1cImVuYWJsZURlZmF1bHRUYWJsZUhlYWRlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZnJvbVwiPkZyb206IDwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCBmb3JtLWljb24tZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhci1vXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCIgXG4gICAgICAgICAgICAgICAgaWQ9XCJpbnB1dFRyYXZlbERhdGVcIiBcbiAgICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJmcm9tXCIgXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJGcm9tLi4uXCJcbiAgICAgICAgICAgICAgICAjZHBmcm9tPVwiYnNEYXRlcGlja2VyXCJcbiAgICAgICAgICAgICAgICBic0RhdGVwaWNrZXJcbiAgICAgICAgICAgICAgICBbb3V0c2lkZUNsaWNrXT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICBbYnNDb25maWddPVwieyBkYXRlSW5wdXRGb3JtYXQ6ICdERC1NTS1ZWVlZJywgY29udGFpbmVyQ2xhc3M6ICd0aGVtZS1yZWQnIH1cIlxuICAgICAgICAgICAgICAgIG1heGxlbmd0aD1cIjMwXCJcbiAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiZHBmcm9tLnRvZ2dsZSgpXCIgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJkcGZyb20uaXNPcGVuXCI+PGkgY2xhc3M9XCJmYSBmYS10aFwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykudG91Y2hlZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiAzMCBjaGFyYWN0ZXJzPC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZnJvbVwiPlRvOiA8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgZm9ybS1pY29uLWRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXItb1wiPjwvaT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiIFxuICAgICAgICAgICAgICAgIGlkPVwiaW5wdXRUcmF2ZWxEYXRlXCIgXG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwidG9cIiBcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlRvLi4uXCJcbiAgICAgICAgICAgICAgICAjZHB0bz1cImJzRGF0ZXBpY2tlclwiXG4gICAgICAgICAgICAgICAgYnNEYXRlcGlja2VyXG4gICAgICAgICAgICAgICAgW291dHNpZGVDbGlja109XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgW2JzQ29uZmlnXT1cInsgZGF0ZUlucHV0Rm9ybWF0OiAnREQtTU0tWVlZWScsIGNvbnRhaW5lckNsYXNzOiAndGhlbWUtcmVkJyB9XCJcbiAgICAgICAgICAgICAgICBtYXhsZW5ndGg9XCIzMFwiXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImRwdG8udG9nZ2xlKClcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImRwdG8uaXNPcGVuXCI+PGkgY2xhc3M9XCJmYSBmYS10aFwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PiAgXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ3RvJykudG91Y2hlZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCd0bycpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2YgMzAgY2hhcmFjdGVyczwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgbWItM1wiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInNlYXJjaFwiPlNlYXJjaDo8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IGZvcm0taWNvbi1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXNlYXJjaFwiPjwvaT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwibmVlZGxlXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCIgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCIgKGtleXVwKT1cInVwZGF0ZUZpbHRlcigkZXZlbnQpXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS50b3VjaGVkXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiAyMDAgY2hhcmFjdGVyczwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cInJvd1wiPlxuXHQ8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHVsbC1yaWdodCBpbmxpbmUtYnV0dG9uc1wiPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nIGJ0bi1zbVwiIHR5cGU9XCJyZXNldFwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcmVwZWF0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICAgIFJlc2V0XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGJ0bi1zbSBwdWxsLXJpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtZmlsdGVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICAgIEZpbHRlclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXHQ8L2Rpdj5cbjwvZGl2PlxuICAgICAgXG48L2Zvcm0+XG48L2Rpdj5cbjwvZGl2PlxuICBcbiAgPG5neC1kYXRhdGFibGUgXG4gICAgI3RhYmxlIFxuICAgIFtzdW1tYXJ5Um93XT1cImVuYWJsZVN1bW1hcnlcIlxuICAgIFtzdW1tYXJ5UG9zaXRpb25dPVwic3VtbWFyeVBvc2l0aW9uXCJcbiAgICBbc3VtbWFyeUhlaWdodF09XCJzdW1tYXJ5SGVpZ2h0XCJcbiAgICBjbGFzcz1cImJvb3RzdHJhcFwiIFxuICAgIFtoZWFkZXJIZWlnaHRdPVwiNTBcIiBcbiAgICBbY29sdW1uTW9kZV09XCInZm9yY2UnXCIgXG4gICAgW2Zvb3RlckhlaWdodF09XCI1MFwiIFxuICAgIFtyb3dIZWlnaHRdPVwiJ2F1dG8nXCJcbiAgICBbcm93c109XCJwYWdlLmNvbnRlbnRcIiBcbiAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIiBcbiAgICBbc2VsZWN0aW9uVHlwZV09XCInY2hlY2tib3gnXCIgXG4gICAgKGFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50KVwiIFxuICAgIChzZWxlY3QpPSdvblNlbGVjdCgkZXZlbnQpJ1xuICAgIFtjb3VudF09XCJwYWdlLnRvdGFsRWxlbWVudHNcIiBcbiAgICBbb2Zmc2V0XT1cInBhZ2UubnVtYmVyXCIgXG4gICAgW2V4dGVybmFsUGFnaW5nXT1cInRydWVcIiBcbiAgICBbbGltaXRdPVwicGFnZS5zaXplXCIgXG4gICAgKHBhZ2UpPVwibG9hZFBhZ2UoJGV2ZW50LCBudWxsKVwiPlxuICAgIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBbc3VtbWFyeUZ1bmNdPVwic3VtbWFyeUZ1bmNcIiBbd2lkdGhdPVwiMzBcIiBbc29ydGFibGVdPVwiZmFsc2VcIiBbY2FuQXV0b1Jlc2l6ZV09XCJmYWxzZVwiIFtkcmFnZ2FibGVdPVwidHJ1ZVwiIFtyZXNpemVhYmxlXT1cImZhbHNlXCIgW2hlYWRlckNoZWNrYm94YWJsZV09XCJ0cnVlXCJcbiAgICAgIFtjaGVja2JveGFibGVdPVwidHJ1ZVwiICpuZ0lmPVwiZW5hYmxlQ2hlY2tib3hcIj5cbiAgICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxuICAgIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBbc3VtbWFyeUZ1bmNdPVwiKGMuc3VtbWFyeUZ1bmMpID8gYy5zdW1tYXJ5RnVuYyA6IHN1bW1hcnlGdW5jXCIgW2NhbkF1dG9SZXNpemVdPVwiKGMuY2FuQXV0b1Jlc2l6ZSkgPyBjLmNhbkF1dG9SZXNpemUgOiB0cnVlXCIgW25hbWVdPVwiYy5jb2x1bW5OYW1lXCIgW3dpZHRoXT1cImMud2lkdGhcIlxuICAgICAgW3NvcnRhYmxlXT1cIihjLnNvcnRhYmxlKSA/IGMuc29ydGFibGUgOiB0cnVlXCIgW2RyYWdnYWJsZV09XCIoYy5kcmFnZ2FibGUpID8gYy5kcmFnZ2FibGUgOiB0cnVlXCIgW3Jlc2l6ZWFibGVdPVwiKGMucmVzaXplYWJsZSkgPyBjLnJlc2l6ZWFibGUgOiB0cnVlXCJcbiAgICAgICpuZ0Zvcj1cImxldCBjIG9mIGNvbHVtbnNcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBsZXQtY29sdW1uPVwiY29sdW1uXCIgbmd4LWRhdGF0YWJsZS1oZWFkZXItdGVtcGxhdGU+XG4gICAgICAgIDxzdHJvbmc+e3tjLmNvbHVtbk5hbWV9fTwvc3Ryb25nPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtdmFsdWU9XCJ2YWx1ZVwiIGxldC1yb3c9XCJyb3dcIj5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICB7eyhjLmlzRGF0ZUNvbHVtbik/IChnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpIHwgZGF0ZTonbWVkaXVtJykgOiBnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpfX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxuICAgIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBbc3VtbWFyeUZ1bmNdPVwic3VtbWFyeUZ1bmNcIiBbbmFtZV09XCJtb3JlQWN0aW9ucy5uYW1lXCIgKm5nSWY9XCJtb3JlQWN0aW9uc1wiIFtzb3J0YWJsZV09XCJmYWxzZVwiIFtjYW5BdXRvUmVzaXplXT1cImZhbHNlXCI+XG4gICAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXZhbHVlPVwidmFsdWVcIiBsZXQtcm93PVwicm93XCI+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1zZWNvbmRhcnkgZHJvcGRvd24tdG9nZ2xlXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWxpc3QtdWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+XG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgbW9yZUFjdGlvbnMuYWN0aW9uc1wiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIiAoY2xpY2spPVwib25BY3Rpb25DbGljayh7aWQ6IHJvd1ttb3JlQWN0aW9ucy5pZEZpZWxkTmFtZV0sIGFjdGlvbk5hbWU6IGFjdGlvbi5hY3Rpb25OYW1lLCBhY3Rpb25Sb3c6IHJvd30pXCI+e3thY3Rpb24uYWN0aW9uTmFtZX19PC9hPlxuICAgICAgICAgICAgICA8IS0tIDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCIjXCI+QW5vdGhlciBhY3Rpb248L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgaHJlZj1cIiNcIj5Tb21ldGhpbmcgZWxzZSBoZXJlPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgcm9sZT1cInNlcGFyYXRvclwiIGNsYXNzPVwiZHJvcGRvd24tZGl2aWRlclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCIjXCI+U2VwYXJhdGVkIGxpbms8L2E+IC0tPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cbiAgICA8IS0tIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBuYW1lPVwiRGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZSBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiIGxldC12YWx1ZT1cInZhbHVlXCIgbGV0LXJvdz1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAge3t2YWx1ZX19XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cbiAgICAgICAgICAgIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBuYW1lPVwiQWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXZhbHVlPVwidmFsdWVcIiBsZXQtcm93PVwicm93XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICB7e3ZhbHVlfX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L25neC1kYXRhdGFibGUtY29sdW1uPiAtLT5cbiAgPC9uZ3gtZGF0YXRhYmxlPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIE1sa0RhdGF0YWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGNvbHVtbnM6IEFycmF5PE1sa0RhdGFUYWJsZUNvbHVtbj4gPSBbXTtcbiAgQElucHV0KCkgZW5hYmxlQ2hlY2tib3g6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZW5kcG9pbnQ6IHN0cmluZztcbiAgQElucHV0KCkgZW5hYmxlRmlsdGVySGVhZGVyOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGVuYWJsZURlZmF1bHRUYWJsZUhlYWRlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBlbmFibGVTdW1tYXJ5OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHN1bW1hcnlQb3NpdGlvbjogc3RyaW5nID0gXCInYm90dG9tJ1wiO1xuICBASW5wdXQoKSBzdW1tYXJ5SGVpZ2h0OiBzdHJpbmcgPSBcIidhdXRvJ1wiO1xuICBASW5wdXQoKSBtb3JlQWN0aW9uczogTWxrTW9yZUFjdGlvbnM7XG4gIEBPdXRwdXQoKSBvbkFjdGlvbnNFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8TWxrTW9yZUFjdGlvbkRhdGE+KClcbiAgQElucHV0KCkgZmlsdGVyQ29tcG9uZW50czogQXJyYXk8TWxrRHluYW1pY0NvbnRyb2w8YW55Pj4gPSBbXTtcbiAgQElucHV0KCkgcGFyYW1zOiBNYXA8c3RyaW5nLCBhbnk+O1xuICBwYWdlOiBQYWdlPGFueT4gPSBuZXcgUGFnZSgpO1xuICBzZWxlY3RlZCA9IFtdO1xuICBAVmlld0NoaWxkKERhdGF0YWJsZUNvbXBvbmVudCkgdGFibGU6IERhdGF0YWJsZUNvbXBvbmVudDtcbiAgZmlsdGVyOiBPYmplY3QgPSB7fTtcbiAgZmlsdGVyRm9ybTogRm9ybUdyb3VwO1xuICBlbXB0eVN1bW1hcnlGdW5jOiAoKSA9PiBudWxsO1xuICA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdGVyd2FyZFNlcnZpY2U6IFN0ZXdhcmRDbGllbnRTZXJ2aWNlPFJlc3BvbnNlV3JhcHBlcjxQYWdlPGFueT4+LCBhbnk+KSB7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgZm9ybSBjb250cm9sIGZyb20gZmlsdGVyQ29tcG9uZW50cyBhbmQgYWxzbyBhcHBlbmRpbmcgZGVmYXVsdCBjb250cm9scyBpZS4gZGF0ZSBmaWx0ZXIgYW5kIHNlYXJjaCBjb250cm9sc1xuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgbGV0IGdyb3VwID0ge307XG4gICAgdGhpcy5maWx0ZXJDb21wb25lbnRzLmZvckVhY2goY29tcCA9PiB7XG4gICAgICBsZXQgdmFsaWRhdG9yczogQXJyYXk8YW55PiA9IFtdO1xuICAgICAgaWYgKGNvbXAuaXNSZXF1aXJlZCkge1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgICB9XG5cbiAgICAgIGlmKGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBNbGtJbnB1dCB8fCBjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgTWxrVGV4dGFyZWEpe1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW5MZW5ndGgoY29tcC5jb250cm9sVHlwZS5taW5MZW5ndGgpKTtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4TGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWF4TGVuZ3RoKSk7XG4gICAgICB9XG5cbiAgICAgIGlmKGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBNbGtJbnB1dCl7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heChjb21wLmNvbnRyb2xUeXBlLm1heCkpO1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW4oY29tcC5jb250cm9sVHlwZS5taW4pKTtcbiAgICAgIH1cbiAgICAgIGdyb3VwW2NvbXAubmFtZV0gPSBuZXcgRm9ybUNvbnRyb2woJycsIHZhbGlkYXRvcnMpXG4gICAgfSk7XG4gICAgLy9hZGQgZGVmYXVsdCBjb250cm9sc1xuICAgIGdyb3VwWydmcm9tJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDMwKSk7XG4gICAgZ3JvdXBbJ3RvJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDMwKSk7XG4gICAgZ3JvdXBbJ25lZWRsZSddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgyMDApKTtcbiAgICB0aGlzLmZpbHRlckZvcm0gPSBuZXcgRm9ybUdyb3VwKGdyb3VwKTtcbiAgICB0aGlzLmxvYWRQYWdlKHsgb2Zmc2V0OiAwLCBsaW1pdDogdGhpcy5wYWdlLnNpemUgfSwgbnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBlbWl0IGNsaWNrIGV2ZW50IG9mIHRoZSBhY3Rpb25zXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgb25BY3Rpb25DbGljayhldmVudDogTWxrTW9yZUFjdGlvbkRhdGEpIHtcbiAgICB0aGlzLm9uQWN0aW9uc0V2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3Mgc2VydmVyIHJlcXVlc3Qgb2YgZGF0YWJsZVxuICAgKiBAcGFyYW0gcGFnZUluZm9cbiAgICogQHBhcmFtIGZpbHRlcnNcbiAgICovXG4gIGxvYWRQYWdlKHBhZ2VJbmZvLCBmaWx0ZXJzKSB7XG4gICAgaWYgKCF0aGlzLmVuZHBvaW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCByZXF1ZXN0OiBNYXA8c3RyaW5nLCBhbnk+O1xuICAgIGlmIChmaWx0ZXJzKSB7XG4gICAgICByZXF1ZXN0ID0gZmlsdGVycztcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWVzdCA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgaWYodGhpcy5wYXJhbXMpe1xuICAgICAgdGhpcy5wYXJhbXMuZm9yRWFjaCgodmFsdWUsIGtleSk9PntcbiAgICAgICAgcmVxdWVzdC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmVxdWVzdC5zZXQoXCJwYWdlXCIsIHBhZ2VJbmZvLm9mZnNldCk7XG4gICAgcmVxdWVzdC5zZXQoXCJzaXplXCIsIHBhZ2VJbmZvLmxpbWl0KTtcbiAgICB0aGlzLnN0ZXJ3YXJkU2VydmljZS5nZXQodGhpcy5lbmRwb2ludCwgcmVxdWVzdCkuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5jb2RlID09IDIwMCkge1xuICAgICAgICB0aGlzLnBhZ2UgPSByZXNwb25zZS5kYXRhO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBoYW5kbGUgc2VsZWN0IG9wdGlvblxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIG9uU2VsZWN0KGV2ZW50KSB7XG5cbiAgfVxuXG4gIG9uQWN0aXZhdGUoZXZlbnQpIHtcblxuICB9XG5cbiAgdXBkYXRlRmlsdGVyKGV2ZW50KSB7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIHByb2Nlc3MgdGFibGUgZmlsdGVyLiBJZiBkYXRlIGZpbHRlciBpcyBub3QgcHJvdmlkZSB0aGUgZnJvbSB2YWx1ZSBpcyBcbiAgICogc2V0IHRvIDIwMTgtMDEtMDEgYW5kIHRvIHZhbHVlIGlzIHNldCB0byAxIHllYXIgZnJvbSB0b2RheVxuICAgKiBAcGFyYW0gZm9ybSBcbiAgICovXG4gIHByb2Nlc3NGaWx0ZXIoZm9ybSkge1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIGxldCBmOiBNYXA8U3RyaW5nLCBhbnk+ID0gbmV3IE1hcChPYmplY3QuZW50cmllcyh0aGlzLmZpbHRlckZvcm0udmFsdWUpKTtcbiAgICAvL3ZhbGlkYXRlIGRhdGUgXG4gICAgaWYoIXRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS50b3VjaGVkKVxuICAgIHsvL2lmIGZyb20gaXMgbm90IHBvcHVsYXRlZCByZW1vdmUgZnJvbSByZXF1ZXN0XG4gICAgICBmLmRlbGV0ZSgnZnJvbScpO1xuICAgICAgLy8gdGhpcy5maWx0ZXJGb3JtLmdldCgnZnJvbScpLnNldFZhbHVlKCcyMDE4LTAxLTAxJyk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAvL2YuZ2V0KCdmcm9tJykuc2V0VmFsdWUobmV3IERhdGUodGhpcy5maWx0ZXJGb3JtLmdldCgnZnJvbScpLnZhbHVlKSk7XG4gICAgICBsZXQgZmQgPSBuZXcgRGF0ZSh0aGlzLmZpbHRlckZvcm0uZ2V0KCdmcm9tJykudmFsdWUpO1xuICAgICAgZi5zZXQoJ2Zyb20nLCBmZC50b0lTT1N0cmluZygpKTtcbiAgICB9XG4gICAgaWYoIXRoaXMuZmlsdGVyRm9ybS5nZXQoJ3RvJykudG91Y2hlZClcbiAgICB7Ly9pZiB0byBpcyBub3QgcG9wdWxhdGVkIHJlbW92ZSBmcm9tIHJlcXVlc3RcbiAgICAgIGYuZGVsZXRlKCd0bycpO1xuICAgICAgLy8gbGV0IHRvRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAvLyB0b0RhdGUuc2V0RGF0ZSh0b0RhdGUuZ2V0RnVsbFllYXIoKSArIDEpO1xuICAgICAgLy8gdGhpcy5maWx0ZXJGb3JtLmdldCgndG8nKS5zZXRWYWx1ZSh0aGlzLmdldEZvcm1hdHRlZERhdGUodG9EYXRlKSk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAvL2YuZ2V0KCd0bycpLnNldFZhbHVlKG5ldyBEYXRlKHRoaXMuZmlsdGVyRm9ybS5nZXQoJ3RvJykudmFsdWUpKTtcbiAgICAgIGxldCB0ZCA9IG5ldyBEYXRlKHRoaXMuZmlsdGVyRm9ybS5nZXQoJ3RvJykudmFsdWUpO1xuICAgICAgZi5zZXQoJ3RvJywgdGQudG9JU09TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkUGFnZSh7IG9mZnNldDogdGhpcy5wYWdlLm51bWJlciwgbGltaXQ6IHRoaXMucGFnZS5zaXplIH0sIGYpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgaW5wdXRcbiAgICogQHBhcmFtIGNvbnRyb2xcbiAgICovXG4gIGlzSW5wdXQoY29udHJvbDogYW55KSB7XG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBNbGtJbnB1dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIHNlbGVjdFxuICAgKiBAcGFyYW0gY29udHJvbFxuICAgKi9cbiAgaXNTZWxlY3QoY29udHJvbDogYW55KSB7XG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBNbGtTZWxlY3Q7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyB0ZXh0YXJlYVxuICAgKi9cbiAgaXNUZXh0QXJlYShjb250cm9sOiBhbnkpIHtcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIE1sa1RleHRhcmVhO1xuICB9XG5cbiAgc3VtbWFyeUZ1bmMoY2VsbDogYW55KSB7XG4gICAgcmV0dXJuKGBgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGZvcm1hdCBkYXRlIHRvIHN0cmluZyB5eXl5LU1NLWRkXG4gICAqIEBwYXJhbSBkYXRlXG4gICAqL1xuICBnZXRGb3JtYXR0ZWREYXRlKGRhdGUpIHtcbiAgICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgIHZhciBtb250aCA9ICgxICsgZGF0ZS5nZXRNb250aCgpKS50b1N0cmluZygpO1xuICAgIG1vbnRoID0gbW9udGgubGVuZ3RoID4gMSA/IG1vbnRoIDogJzAnICsgbW9udGg7XG5cbiAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKTtcbiAgICBkYXkgPSBkYXkubGVuZ3RoID4gMSA/IGRheSA6ICcwJyArIGRheTtcblxuICAgIHJldHVybiB5ZWFyICsgJy0nICsgbW9udGggKyAnLScgKyBkYXk7XG4gIH1cblxuICBnZXRGaWVsZFZhbHVlKGRhdGE6IE9iamVjdCwgZmllbGQ6IGFueSl7XG4gICAgdmFyIGs6IEFycmF5PHN0cmluZz4gPSBmaWVsZC5zcGxpdChcIi5cIik7XG4gICAgdmFyIGtleXMgPSBuZXcgUXVldWU8c3RyaW5nPiguLi5rKTtcbiAgICBsZXQgdmFsdWUgPSB0aGlzLmdldE9iamVjdFZhbHVlKGRhdGEsIGtleXMpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGZpbmQga2V5IHZhbHVlIGJhc2VkIG9uIHRoZSBrZXkgc2VxdWVuY2UgcHJvdmlkZWRcbiAgICogQHBhcmFtIGRhdGEgZXhwZWN0cyBhbiBvYmplY3RcbiAgICogQHBhcmFtIGtleXMgaS5lLiB1c2VyLmdlbmRlci50eXBlLnR5cGVcbiAgICovXG4gIGdldE9iamVjdFZhbHVlKGRhdGE6IGFueSwga2V5czogUXVldWU8c3RyaW5nPikge1xuICAgIGlmICgoIShkYXRhIGluc3RhbmNlb2YgT2JqZWN0KSkgfHwgKGtleXMubGVuZ3RoID09IDEpKSAge1xuICAgICAgcmV0dXJuIGRhdGFba2V5cy50YWlsXTtcbiAgICB9XG4gICAgbGV0IHZhbHVlID0gbnVsbDtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICgoa2V5ID09IGtleXMuZnJvbnQpICYmIChkYXRhW2tleV0gaW5zdGFuY2VvZiBPYmplY3QpKSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5nZXRPYmplY3RWYWx1ZShkYXRhW2tleV0sIGtleXMpO1xuICAgICAgfSBlbHNlIGlmKGtleSA9PSBrZXlzLnRhaWwpe1xuICAgICAgICB2YWx1ZSA9IGRhdGFba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdmFsdWU7XG5cbiAgfVxuXG59XG4vKipcbiAqIFVzZWQgdG8gZGVmaW5lIGRhdGF0YWJsZSBjb2x1bW5zIHdpdGggYXR0cmlidXRlcyAoY29sdW1uTmFtZSwgZmllbGROYW1lLCB3aWR0aCwgc29ydGFibGUsIGNhbkF1dG9SZXNpemUsXG4gKiBkcmFnZ2FibGUsIHJlc2l6YWJsZSwgaXNEYXRlQ29sdW1uLCBzdW1tYXJ5RnVuYylcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNbGtEYXRhVGFibGVDb2x1bW4ge1xuICAvKipcbiAgICogY29sdW1uIHRpdGxlXG4gICAqL1xuICBjb2x1bW5OYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBTZXJ2ZXIgc2lkZSByZXNwb25zZSBmaWVsZCBjb3JyZXNwb25kaW5nIHRvIHRoZSBjb2x1bW4gaS5lIGZ1bGxOYW1lIG1heSBjb3JyZXNwb25kIHRvIE5hbWUgY29sdW1uXG4gICAqL1xuICBmaWVsZE5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIFdpZHRoIG9mIHRoZSBjb2x1bW5cbiAgICovXG4gIHdpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogRW5hYmxlIHNvcnRpbmcgaW4gYSBjb2x1bW5cbiAgICovXG4gIHNvcnRhYmxlPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIE1ha2VzIGEgY29sdW1uIHJlc2l6YWJsZVxuICAgKi9cbiAgY2FuQXV0b1Jlc2l6ZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBFbmFibGVzIGEgY29sdW1uIHRvIGJlIGRyYWdnYWJsZVxuICAgKi9cbiAgZHJhZ2dhYmxlPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIE1ha2VzIGEgY29sdW1uIHJlc2l6YWJsZVxuICAgKi9cbiAgcmVzaXplYWJsZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBVc2VkIHRvIGVuYWJsZSBmb3JtYXRpbmcgdGltZXN0YW1wIHRvIHN0cmluZyBkYXRlXG4gICAqL1xuICBpc0RhdGVDb2x1bW4/OiBib29sZWFuO1xuICAvKipcbiAgICogRnVuY3Rpb24gdG8gY2FsbCBhdCB0aGUgc3VtbWFyeSByb3dcbiAgICovXG4gIHN1bW1hcnlGdW5jPzogKGFueTogYW55W10pID0+IGFueTtcbn1cblxuLyoqXG4gKiBVc2VkIHRvIGRpc3BsYXkgbW9yZSBhY3Rpb25zIGNvbHVtbiBhbmQgdGhlIGVuZCBvZiB0aGUgdGFibGVcbiAqL1xuZXhwb3J0IGNsYXNzIE1sa01vcmVBY3Rpb25zIHtcbiAgLyoqXG4gICAqIEFjdGlvbiBDb2x1bW4gbmFtZSBlLmcuIE1vcmUgQWN0aW9uc1xuICAgKi9cbiAgbmFtZTogc3RyaW5nID0gXCJBY3Rpb25zXCI7XG4gIC8qKlxuICAgKiBGaWVsZCBuYW1lIGlkIGZyb20gdGhlIHNlcnZlciByZXNwb25zZSBlLmcgdXNlcklkXG4gICAqL1xuICBpZEZpZWxkTmFtZTogc3RyaW5nID0gXCJpZFwiO1xuICAvKipcbiAgICogQWN0aW9ucyBlLmcuIEVkaXQsIERlbGV0ZVxuICAgKi9cbiAgYWN0aW9uczogQXJyYXk8TWxrTW9yZUFjdGlvbkRhdGE+O1xuXG4gIGNvbnN0cnVjdG9yKGFjdGlvbnM6IEFycmF5PE1sa01vcmVBY3Rpb25EYXRhPiwgaWQ/OiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcpIHtcbiAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pZEZpZWxkTmFtZSA9IGlkO1xuICB9XG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNbGtNb3JlQWN0aW9uRGF0YSB7XG4gIC8qKlxuICAgKiBOZXZlciBtaW5kIHRoaXMgZmllbGQgaXQgd2lsbCBiZSB1c2VkIGJ5IHRoZSBsaWJyYXJ5XG4gICAqL1xuICBpZD86IGFueTtcbiAgLyoqXG4gICAqIEFjdGlvbiBuYW1lIGUuZy4gRWRpdCwgRGVsZXRlXG4gICAqL1xuICBhY3Rpb25OYW1lOiBhbnk7XG5cbiAgLyoqXG4gICAqIEFjdGlvbiByb3cgOiB0aGUgY2xpY2tlZCByb3dcbiAgICovXG4gIGFjdGlvblJvdz86IGFueTtcbn0iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Rld2FyZENsaWVudENvbXBvbmVudCB9IGZyb20gJy4vc3Rld2FyZC1jbGllbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1sa0RhdGF0YWJsZUNvbXBvbmVudCB9IGZyb20gJy4vbWxrLWRhdGF0YWJsZS9tbGstZGF0YXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmd4RGF0YXRhYmxlTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU3Rld2FyZENvbmZpZyB9IGZyb20gJy4vc3Rld2FyZC1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJNb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2RhdGVwaWNrZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBOZ3hEYXRhdGFibGVNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEJzRGF0ZXBpY2tlck1vZHVsZS5mb3JSb290KCksXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtTdGV3YXJkQ2xpZW50Q29tcG9uZW50LCBNbGtEYXRhdGFibGVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbU3Rld2FyZENsaWVudENvbXBvbmVudCwgTWxrRGF0YXRhYmxlQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ2xpZW50TW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBTdGV3YXJkQ29uZmlnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBTdGV3YXJkQ2xpZW50TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbIHtwcm92aWRlOiBTdGV3YXJkQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnfSBdXG4gICAgfVxuICB9XG4gfVxuIl0sIm5hbWVzIjpbImh0dHAiLCJIdHRwSGVhZGVycyIsImNhdGNoRXJyb3IiLCJIdHRwUGFyYW1zIiwib2YiLCJJbmplY3RhYmxlIiwiSHR0cENsaWVudCIsIkNvbXBvbmVudCIsIkV2ZW50RW1pdHRlciIsIlZhbGlkYXRvcnMiLCJGb3JtQ29udHJvbCIsIkZvcm1Hcm91cCIsIlF1ZXVlIiwiSW5wdXQiLCJPdXRwdXQiLCJWaWV3Q2hpbGQiLCJEYXRhdGFibGVDb21wb25lbnQiLCJOZ01vZHVsZSIsIkZvcm1zTW9kdWxlIiwiUmVhY3RpdmVGb3Jtc01vZHVsZSIsIk5neERhdGF0YWJsZU1vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkJzRGF0ZXBpY2tlck1vZHVsZSIsIkh0dHBDbGllbnRNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7Ozs7UUFBQTtTQWFDO1FBQUQsc0JBQUM7SUFBRCxDQUFDOzs7Ozs7QUNoQkQ7UUFNQTtTQUlDO1FBQUQsb0JBQUM7SUFBRCxDQUFDLElBQUE7Ozs7QUFFRDtRQU9JLDhCQUFvQkEsT0FBZ0IsRUFBRSxNQUFxQjtZQUF2QyxTQUFJLEdBQUpBLE9BQUksQ0FBWTtZQUZwQyxhQUFRLEdBQVcsR0FBRyxDQUFDO1lBR25CLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNoQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGlDQUFpQyxDQUFDLENBQUM7YUFDM0Y7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJQyxnQkFBVyxDQUFDO29CQUMzQixjQUFjLEVBQUUsaUNBQWlDO2lCQUNwRCxDQUFDLENBQUM7YUFDTjtZQUNELElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtnQkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN4RjtTQUNK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