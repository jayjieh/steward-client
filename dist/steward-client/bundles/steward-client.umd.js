(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('@angular/platform-browser'), require('@angular/forms'), require('@swimlane/ngx-datatable'), require('queue-typescript'), require('@angular/common'), require('ngx-bootstrap/datepicker')) :
    typeof define === 'function' && define.amd ? define('steward-client', ['exports', '@angular/core', '@angular/common/http', 'rxjs', 'rxjs/operators', '@angular/platform-browser', '@angular/forms', '@swimlane/ngx-datatable', 'queue-typescript', '@angular/common', 'ngx-bootstrap/datepicker'], factory) :
    (factory((global['steward-client'] = {}),global.ng.core,global.ng.common.http,global.rxjs,global.rxjs.operators,global.ng.platformBrowser,global.ng.forms,null,null,global.ng.common,null));
}(this, (function (exports,core,http,rxjs,operators,platformBrowser,forms,ngxDatatable,queueTypescript,common,datepicker) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        function StewardClientService(http$$1, config, meta) {
            this.http = http$$1;
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
                    this.headers = new http.HttpHeaders({
                        'Content-Type': 'application/json; charset=utf-8',
                        'X-CSRF-TOKEN': this.csrf
                    });
                }
                else {
                    this.headers = new http.HttpHeaders({
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
                this.headersPlain = new http.HttpHeaders({
                    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                    'X-CSRF-TOKEN': this.csrf
                });
            }
            else {
                this.headersPlain = new http.HttpHeaders({
                    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                });
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
         * @param {?} endpoint
         * @param {?} data
         * @return {?}
         */
        StewardClientService.prototype.postNoToken = /**
         * @param {?} endpoint
         * @param {?} data
         * @return {?}
         */
            function (endpoint, data) {
                return this.http.post(this.base_url + endpoint, JSON.stringify(data), { headers: new http.HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) }).pipe(operators.catchError(this.handleError()));
            };
        /**
         * @param {?} endpoint
         * @param {?} data
         * @return {?}
         */
        StewardClientService.prototype.postLogin = /**
         * @param {?} endpoint
         * @param {?} data
         * @return {?}
         */
            function (endpoint, data) {
                return this.http.post(endpoint, data, {
                    headers: this.headersPlain
                }).pipe(operators.catchError(this.handleError()));
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
                return this.http.request('delete', this.base_url + endpoint, {
                    headers: this.headers.append('Content-Type', 'application/json; charset=utf-8'),
                    body: JSON.stringify(data)
                }).pipe(operators.catchError(this.handleError()));
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
                    headers = new http.HttpHeaders();
                }
                return this.http.post(this.base_url + endpoint, formData, { headers: headers }).pipe(operators.catchError(this.handleError()));
            };
        /**
         * @param {?} endpoint
         * @param {?} data
         * @param {?=} headers
         * @return {?}
         */
        StewardClientService.prototype.postFormAuthorized = /**
         * @param {?} endpoint
         * @param {?} data
         * @param {?=} headers
         * @return {?}
         */
            function (endpoint, data, headers) {
                return this.http.post(this.base_url + endpoint, data, { headers: this.headersPlain }).pipe(operators.catchError(this.handleError()));
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
                if (this.config.csrf == true) {
                    return this.http.post(this.base_url + endpoint, formData, { headers: new http.HttpHeaders({ 'X-CSRF-TOKEN': this.csrf }) }).pipe(operators.catchError(this.handleError()));
                }
                else {
                    return this.http.post(this.base_url + endpoint, formData, { headers: new http.HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }) }).pipe(operators.catchError(this.handleError()));
                }
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
                { type: StewardConfig },
                { type: platformBrowser.Meta }
            ];
        };
        return StewardClientService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // const { Queue } = require('queue-typescript');
    var MlkDatatableComponent = (function () {
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
                        template: "<div class=\"card card-outline-default\" *ngIf=\"enableFilterHeader\">\n  <div class=\"card-body\">\n    <form (ngSubmit)=\"processFilter(filterForm)\" [formGroup]=\"filterForm\">\n\n      <div class=\"row\">\n        <div class=\"col-md-3  mb-3\" *ngFor=\"let control of filterComponents\">\n          <label>{{control.label}}: </label>\n          <div class=\"input-group\">\n            <div class=\"input-group-append\">\n                <span class=\"input-group-text  form-icon-default\">\n                  <i [class]=\"control.icon\"></i>\n                </span>\n            </div>\n\n            <select *ngIf=\"isSelect(control.controlType)\" class=\"form-control form-control-sm checking-field\"\n                    [formControlName]=\"control.name\">\n              <option value=\"\" disabled selected>{{control.placeholder}}</option>\n              <option *ngFor=\"let o of control.controlType.options\">{{o.text}}</option>\n            </select>\n\n            <textarea *ngIf=\"isTextArea(control.controlType)\" [cols]=\"control.controlType.cols\"\n                      [rows]=\"control.controlType.rows\" class=\"form-control form-control-sm checking-field\"\n                      [placeholder]=\"control.placeholder\" [formControlName]=\"control.name\"></textarea>\n\n            <input *ngIf=\"isInput(control.controlType)\" [type]=\"control.controlType.type\"\n                   [placeholder]=\"control.placeholder\" class=\"form-control form-control-sm checking-field\"\n                   [formControlName]=\"control.name\"/>\n          </div>\n          <span class=\"help-block\" *ngIf=\"filterForm.get(control.name).touched\">\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}} is required</span>\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of {{control.controlType.minLength}}\n                characters</span>\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of {{control.controlType.maxLength}}\n                characters</span>\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get(control.name).hasError('min')\">Should be greater than {{control.controlType.min}}</span>\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get(control.name).hasError('max')\">Should be less than {{control.controlType.max}}</span>\n            </span>\n        </div>\n      </div>\n\n      <div class=\"row\" *ngIf=\"enableDefaultTableHeader\">\n        <div class=\"col-md-3 mb-3\">\n          <label>From: </label>\n          <div class=\"input-group\">\n            <div class=\"input-group-append\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-calendar-o\"></i>\n                </span>\n            </div>\n            <input\n              type=\"text\"\n              class=\"form-control form-control-sm checking-field\"\n              id=\"inputFromDate\"\n              formControlName=\"from\"\n              placeholder=\"From...\"\n              #dpfrom=\"bsDatepicker\"\n              bsDatepicker\n              [outsideClick]=\"false\"\n              [bsConfig]=\"{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }\"\n              maxlength=\"30\"\n              required\n              readonly\n            />\n            <div class=\"input-group-append\">\n              <button class=\"btn btn-primary\" type=\"button\" (click)=\"dpfrom.toggle()\"\n                      [attr.aria-expanded]=\"dpfrom.isOpen\"><i class=\"fa fa-th\"></i></button>\n            </div>\n          </div>\n          <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n                <span class=\"text-danger\"\n                      *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 30 characters</span>\n            </span>\n        </div>\n        <div class=\"col-md-3 mb-3\">\n          <label>To: </label>\n          <div class=\"input-group\">\n            <div class=\"input-group-append\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-calendar-o\"></i>\n                </span>\n            </div>\n            <input\n              type=\"text\"\n              class=\"form-control form-control-sm checking-field\"\n              id=\"inputToDate\"\n              formControlName=\"to\"\n              placeholder=\"To...\"\n              #dpto=\"bsDatepicker\"\n              bsDatepicker\n              [outsideClick]=\"false\"\n              [bsConfig]=\"{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }\"\n              maxlength=\"30\"\n              required\n              readonly\n            />\n            <div class=\"input-group-append\">\n              <button class=\"btn btn-primary\" type=\"button\" (click)=\"dpto.toggle()\" [attr.aria-expanded]=\"dpto.isOpen\">\n                <i class=\"fa fa-th\"></i></button>\n            </div>\n          </div>\n          <span class=\"help-block\" *ngIf=\"filterForm.get('to').touched\">\n                <span class=\"text-danger\"\n                      *ngIf=\"filterForm.get('to').hasError('maxlength')\">Maximum of 30 characters</span>\n            </span>\n        </div>\n        <div class=\"col-md-3 mb-3\">\n          <label>Search:</label>\n          <div class=\"input-group\">\n            <div class=\"input-group-prepend\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-search\"></i>\n                </span>\n            </div>\n            <input formControlName=\"needle\" class=\"form-control form-control-sm checking-field\" type=\"text\"\n                   placeholder=\"Search...\" (keyup)=\"updateFilter($event)\"/>\n          </div>\n        </div>\n        <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 200 characters</span>\n          </span>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"pull-right inline-buttons\">\n            <button class=\"btn btn-warning btn-sm\" type=\"reset\" (click)=\"reset()\">\n              <i class=\"fa fa-repeat\" aria-hidden=\"true\"></i>\n              Reset\n            </button>\n            <button class=\"btn btn-success btn-sm pull-right\" type=\"submit\">\n              <i class=\"fa fa-filter\" aria-hidden=\"true\"></i>\n              Filter\n            </button>\n          </div>\n        </div>\n      </div>\n\n    </form>\n  </div>\n</div>\n\n<ngx-datatable\n  #table\n  [rowHeight]=\"tableRowHeight\"\n  [footerHeight]=\"tableFooterHeight\"\n  [headerHeight]=\"tableHeaderHeight\"\n  [scrollbarV]=\"verticalScrollActive\"\n  [scrollbarH]=\"horizontalScrollActive\"\n  [summaryRow]=\"enableSummary\"\n  [summaryPosition]=\"summaryPosition\"\n  [summaryHeight]=\"summaryHeight\"\n  class=\"bootstrap\"\n  [columnMode]=\"'force'\"\n  [rows]=\"page.content\"\n  [selected]=\"selected\"\n  [selectionType]=\"'checkbox'\"\n  (activate)=\"onActivate($event)\"\n  (select)='onSelect($event)'\n  [count]=\"page.totalElements\"\n  [offset]=\"page.number\"\n  [externalPaging]=\"true\"\n  [limit]=\"page.size\"\n  (page)=\"loadPage($event, null)\">\n  <ngx-datatable-column [summaryFunc]=\"summaryFunc\" [width]=\"30\" [sortable]=\"false\" [canAutoResize]=\"false\"\n                        [draggable]=\"true\" [resizeable]=\"false\" [headerCheckboxable]=\"true\"\n                        [checkboxable]=\"true\" *ngIf=\"enableCheckbox\">\n  </ngx-datatable-column>\n  <ngx-datatable-column [summaryFunc]=\"summaryFunc\" [width]=\"30\" [sortable]=\"false\" [canAutoResize]=\"false\"\n                        [draggable]=\"true\" [resizeable]=\"false\" [headerCheckboxable]=\"true\"\n                        *ngFor=\"let c of columns; index as i;\">\n    <ng-template let-column=\"column\" ngx-datatable-header-template *ngIf=\"i==0\">\n      <strong>#</strong>\n    </ng-template>\n    <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" *ngIf=\"i==0\">\n        <span>\n            {{rowIndex + 1}}\n        </span>\n    </ng-template>\n  </ngx-datatable-column>\n  <ngx-datatable-column [summaryFunc]=\"(c.summaryFunc) ? c.summaryFunc : summaryFunc\"\n                        [canAutoResize]=\"(c.canAutoResize) ? c.canAutoResize : true\" [name]=\"c.columnName\"\n                        [width]=\"c.width\"\n                        [sortable]=\"(c.sortable) ? c.sortable : true\" [draggable]=\"(c.draggable) ? c.draggable : true\"\n                        [resizeable]=\"(c.resizeable) ? c.resizeable : true\"\n                        *ngFor=\"let c of columns; index as i;\">\n    <ng-template let-column=\"column\" ngx-datatable-header-template *ngIf=\"i==0\">\n      <strong>{{c.columnName}}</strong>\n    </ng-template>\n    <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\" *ngIf=\"i==0\">\n        <span>\n            <ng-container *ngIf=\"c.isDateColumn; then t10\"></ng-container>\n            <ng-container *ngIf=\"c.isCurrencyColumn && c.currencyText; then t40\"></ng-container>\n            <ng-container *ngIf=\"c.isCurrencyColumn && !c.currencyText; then t70\"></ng-container>\n            <ng-container *ngIf=\"!c.isDateColumn && !c.isCurrencyColumn; then t70\"></ng-container>\n\n            <ng-template #t10>\n                {{(getFieldValue(row, c.fieldName) | date:'medium')}}\n            </ng-template>\n            <ng-template #t40>\n                {{(getFieldValue(row, c.fieldName) | currency:c.currencyText:'code')}}\n            </ng-template>\n            <ng-template #t70>\n                {{getFieldValue(row, c.fieldName)}}\n            </ng-template>\n        </span>\n    </ng-template>\n\n    <ng-template let-column=\"column\" ngx-datatable-header-template>\n      <strong>{{c.columnName}}</strong>\n    </ng-template>\n    <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n        <span>\n            <ng-container *ngIf=\"c.isDateColumn; then t10\"></ng-container>\n            <ng-container *ngIf=\"c.isCurrencyColumn && c.currencyText; then t40\"></ng-container>\n            <ng-container *ngIf=\"c.isCurrencyColumn && !c.currencyText; then t70\"></ng-container>\n            <ng-container *ngIf=\"!c.isDateColumn && !c.isCurrencyColumn; then t70\"></ng-container>\n\n            <ng-template #t10>\n                {{(getFieldValue(row, c.fieldName) | date:'medium')}}\n            </ng-template>\n            <ng-template #t40>\n                {{(getFieldValue(row, c.fieldName) | currency:c.currencyText:'code')}}\n            </ng-template>\n            <ng-template #t70>\n                {{getFieldValue(row, c.fieldName)}}\n            </ng-template>\n        </span>\n    </ng-template>\n  </ngx-datatable-column>\n  <ngx-datatable-column [summaryFunc]=\"summaryFunc\" [name]=\"moreActions.name\" *ngIf=\"moreActions\" [sortable]=\"false\"\n                        [canAutoResize]=\"false\">\n    <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n        <span>\n          <div class=\"input-group-prepend\">\n            <button class=\"btn btn-sm btn-outline-secondary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\"\n                    aria-haspopup=\"true\"\n                    aria-expanded=\"false\">\n              <i class=\"fa fa-list-ul\" aria-hidden=\"true\"></i>\n            </button>\n            <div class=\"dropdown-menu\">\n              <a class=\"dropdown-item\" *ngFor=\"let action of moreActions.actions\" href=\"javascript:;\"\n                 (click)=\"onActionClick({id: row[moreActions.idFieldName], actionName: action.actionName, actionRow: row})\">{{action.actionName}}</a>\n            </div>\n          </div>\n        </span>\n    </ng-template>\n  </ngx-datatable-column>\n</ngx-datatable>\n",
                        styles: [""]
                    },] },
        ];
        MlkDatatableComponent.ctorParameters = function () {
            return [
                { type: StewardClientService },
                { type: common.DatePipe }
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                        exports: [StewardClientComponent, MlkDatatableComponent],
                        providers: [common.DatePipe]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlci50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9zdGV3YXJkLWNsaWVudC5jb21wb25lbnQudHMiLG51bGwsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL2VudGl0aWVzL3dyYXBwZXJzL3BhZ2UudHMiLCJuZzovL3N0ZXdhcmQtY2xpZW50L2xpYi9lbnRpdGllcy93cmFwcGVycy9tbGstZHluYW1pYy1jb250cm9sLnRzIiwibmc6Ly9zdGV3YXJkLWNsaWVudC9saWIvbWxrLWRhdGF0YWJsZS9tbGstZGF0YXRhYmxlLmNvbXBvbmVudC50cyIsIm5nOi8vc3Rld2FyZC1jbGllbnQvbGliL3N0ZXdhcmQtY2xpZW50Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogV3JhcHMgc2VydmVyIHJlc3BvbnNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVzcG9uc2VXcmFwcGVyPFQ+IHtcclxuICAgIC8qKlxyXG4gICAgICogSHR0cCBzdGF0dXMgY29kZSBlLmcuIDIwMFxyXG4gICAgICovXHJcbiAgICBjb2RlOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFNlcnZlciBtZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogQWN0dWFsIHJlc3BvbnNlIGRhdGFcclxuICAgICAqL1xyXG4gICAgZGF0YTogVDtcclxufVxyXG4iLCJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0h0dHBDbGllbnQsIEh0dHBFcnJvclJlc3BvbnNlLCBIdHRwSGVhZGVycywgSHR0cFBhcmFtc30gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQge09ic2VydmFibGUsIG9mfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtjYXRjaEVycm9yfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7UmVzcG9uc2VXcmFwcGVyfSBmcm9tICcuL2VudGl0aWVzL3dyYXBwZXJzL3Jlc3BvbnNlLXdyYXBwZXInO1xyXG5pbXBvcnQge01ldGF9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDb25maWcge1xyXG4gIGJhc2VfdXJsOiBzdHJpbmc7XHJcbiAgYWNjZXNzX3Rva2VuPzogc3RyaW5nO1xyXG4gIGhlYWRlcnM/OiBIdHRwSGVhZGVycztcclxuICBjc3JmOiBib29sZWFuO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTdGV3YXJkQ2xpZW50U2VydmljZTxULCBFPiB7XHJcblxyXG4gIHByaXZhdGUgaGVhZGVyczogSHR0cEhlYWRlcnM7XHJcbiAgdG9rZW46IHN0cmluZztcclxuICBiYXNlX3VybCA9ICcvJztcclxuICBjc3JmOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgaGVhZGVyc1BsYWluOiBIdHRwSGVhZGVycztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGNvbmZpZzogU3Rld2FyZENvbmZpZywgcHJpdmF0ZSBtZXRhOiBNZXRhKSB7XHJcbiAgICBpZiAoY29uZmlnLmNzcmYgPT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmNzcmYgPSB0aGlzLm1ldGEuZ2V0VGFnKCduYW1lPV9jc3JmJykuY29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmJhc2VfdXJsID0gY29uZmlnLmJhc2VfdXJsO1xyXG4gICAgaWYgKGNvbmZpZy5oZWFkZXJzKSB7XHJcbiAgICAgIHRoaXMuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNvbmZpZy5jc3JmID09IHRydWUpIHtcclxuICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICdYLUNTUkYtVE9LRU4nOiB0aGlzLmNzcmZcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoe1xyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcclxuICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc190b2tlbicpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChjb25maWcuYWNjZXNzX3Rva2VuKSB7XHJcbiAgICAgIGlmIChjb25maWcuY3NyZiA9PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5oZWFkZXJzLmFwcGVuZCgnWC1DU1JGLVRPS0VOJywgdGhpcy5jc3JmKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmhlYWRlcnMuYXBwZW5kKCdBdXRob3JpemF0aW9uJywgJ0JlYXJlciAnICsgY29uZmlnLmFjY2Vzc190b2tlbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoY29uZmlnLmNzcmYgPT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmhlYWRlcnNQbGFpbiA9IG5ldyBIdHRwSGVhZGVycyh7XHJcbiAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICdYLUNTUkYtVE9LRU4nOiB0aGlzLmNzcmZcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmhlYWRlcnNQbGFpbiA9IG5ldyBIdHRwSGVhZGVycyh7XHJcbiAgICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc190b2tlbicpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBoYW5kbGUgaHR0cCBwb3N0IHJlcXVlc3RzXHJcbiAgICovXHJcbiAgcG9zdChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIEpTT04uc3RyaW5naWZ5KGRhdGEpLCB7aGVhZGVyczogdGhpcy5oZWFkZXJzLmFwcGVuZCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKX0pLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcG9zdE5vVG9rZW4oZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBKU09OLnN0cmluZ2lmeShkYXRhKSwge2hlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J30pfSkucGlwZShcclxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwb3N0TG9naW4oZW5kcG9pbnQ6IHN0cmluZywgZGF0YTogVCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoZW5kcG9pbnQsIGRhdGEsIHtcclxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzUGxhaW5cclxuICAgIH0pLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBoYW5kbGUgaHR0cCBwb3N0IHJlcXVlc3RzXHJcbiAgICovXHJcbiAgcHV0KGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBKU09OLnN0cmluZ2lmeShkYXRhKSwge2hlYWRlcnM6IHRoaXMuaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyl9KS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZShlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdCgnZGVsZXRlJywgdGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCB7XHJcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycy5hcHBlbmQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyksXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICB9KS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldChlbmRwb2ludDogc3RyaW5nLCBkYXRhPzogTWFwPHN0cmluZywgc3RyaW5nPik6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBvcHRpb25zKS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGlmXHJcbiAgICogQHBhcmFtIGVuZHBvaW50XHJcbiAgICogQHBhcmFtIGRhdGFcclxuICAgKiBAcGFyYW0gaGVhZGVyc1xyXG4gICAqL1xyXG4gIHBvc3RGb3JtRGF0YShlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBULCBoZWFkZXJzPzogSHR0cEhlYWRlcnMpOiBPYnNlcnZhYmxlPFJlc3BvbnNlV3JhcHBlcjxFPj4ge1xyXG4gICAgY29uc3QgZm9ybURhdGE6IEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMuaGVhZGVycy5nZXQoJ0F1dGhvcml6YXRpb24nKSAmJiAoIWhlYWRlcnMpKSB7XHJcbiAgICAgIGhlYWRlcnMgPSB0aGlzLmhlYWRlcnM7XHJcbiAgICB9IGVsc2UgaWYgKCFoZWFkZXJzKSB7XHJcbiAgICAgIGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIGZvcm1EYXRhLCB7aGVhZGVyczogaGVhZGVyc30pLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcG9zdEZvcm1BdXRob3JpemVkKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE6IFQsIGhlYWRlcnM/OiBIdHRwSGVhZGVycyk6IE9ic2VydmFibGU8UmVzcG9uc2VXcmFwcGVyPEU+PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBkYXRhLCB7aGVhZGVyczogdGhpcy5oZWFkZXJzUGxhaW59KS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHBvc3RGb3JtRGF0YU11bHRpcGFydChlbmRwb2ludDogc3RyaW5nLCBkYXRhOiBUKTogT2JzZXJ2YWJsZTxSZXNwb25zZVdyYXBwZXI8RT4+IHtcclxuICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFba2V5XSkpIHtcclxuICAgICAgICBkYXRhW2tleV0uZm9yRWFjaChrMiA9PiB7XHJcbiAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBrMik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5jb25maWcuY3NyZiA9PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmJhc2VfdXJsICsgZW5kcG9pbnQsIGZvcm1EYXRhLCB7aGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsnWC1DU1JGLVRPS0VOJzogdGhpcy5jc3JmfSl9KS5waXBlKFxyXG4gICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcjxhbnk+KCkpXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBmb3JtRGF0YSwge2hlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7J0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzX3Rva2VuJyl9KX0pLnBpcGUoXHJcbiAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yPGFueT4oKSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0SHR0cFBhcmFtcyhkYXRhOiBNYXA8c3RyaW5nLCBzdHJpbmc+KTogSHR0cFBhcmFtcyB7XHJcbiAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgfVxyXG4gICAgbGV0IGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgZGF0YS5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nLCBrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICBodHRwUGFyYW1zID0gaHR0cFBhcmFtcy5hcHBlbmQoa2V5LCB2YWx1ZSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBodHRwUGFyYW1zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBjYXRjaCBleGNlcHRpb24gdGhyb3duIGJ5IGh0dHAgY2xpZW50IHJldHVybnMgaW50ZXJuYWwgc2VydmVyIGVycm9yXHJcbiAgICogaWYgc3RhdHVzIDUwMCBpcyBlbmNvdW50ZXJlZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgaGFuZGxlRXJyb3I8UmVzcG9uc2VXcmFwcGVyPigpIHtcclxuICAgIHJldHVybiAoZXJyb3I6IEh0dHBFcnJvclJlc3BvbnNlKTogT2JzZXJ2YWJsZTxhbnk+ID0+IHtcclxuICAgICAgY29uc3QgcmVzID0gbmV3IFJlc3BvbnNlV3JhcHBlcigpO1xyXG4gICAgICAvLyAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpOyAvLyBsb2cgdG8gY29uc29sZSBpbnN0ZWFkXHJcbiAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDUwMCkge1xyXG4gICAgICAgIHJlcy5jb2RlID0gZXJyb3Iuc3RhdHVzO1xyXG4gICAgICAgIHJlcy5tZXNzYWdlID0gJ1NvcnJ5IGludGVybmFsIHNlcnZlciBlcnJvciBvY2N1cmVkIHBsZWFzZSB0cnkgYWdhaW4gbGF0ZXInO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlcy5jb2RlID0gZXJyb3Iuc3RhdHVzO1xyXG4gICAgICAgIHJlcy5tZXNzYWdlID0gZXJyb3IuZXJyb3IubWVzc2FnZTtcclxuICAgICAgICByZXMuZGF0YSA9IGVycm9yLmVycm9yLmRhdGE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG9mKHJlcyk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byByZW5kZXIgYWN0aW9uIGJ1dHRvbnNcclxuICAgKi9cclxuICBzdGF0aWMgcmVuZGVyTW9yZShpZDogYW55KSB7XHJcbiAgICByZXR1cm4gJzxkaXYgY2xhc3M9XFwnYWN0aW9ucy1idXR0b25zIGNlbnRlclxcJyBpZD1cXCcnICsgaWQgKyAnXFwnPjxpIGNsYXNzPVxcJ2ZhIGZhLWNoZWNrXFwnIHRpdGxlPVxcJ0FwcHJvdmVcXCc+PC9pPiA8aSBjbGFzcz1cXCdmYSBmYS1iYW5cXCcgdGl0bGU9XFwnRGVjbGluZVxcJz48L2k+PC9kaXY+JztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbnRpYXRlRGF0YVRhYmxlKGVuZHBvaW50OiBzdHJpbmcsIGRhdGE/OiBNYXA8c3RyaW5nLCBzdHJpbmc+KSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICAgIHBhcmFtczogdGhpcy5nZXRIdHRwUGFyYW1zKGRhdGEpXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5iYXNlX3VybCArIGVuZHBvaW50LCBvcHRpb25zKS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3I8YW55PigpKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc3R3LXN0ZXdhcmQtY2xpZW50JyxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPHA+XHJcbiAgICAgIHN0ZXdhcmQtY2xpZW50IHdvcmtzIVxyXG4gICAgPC9wPlxyXG4gIGAsXHJcbiAgc3R5bGVzOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCIvKipcclxuICogRGF0YWJsZSBwYWdlIHVzZWQgdG8gd3JhcHBlciBzZXJ2ZXIgY29udGVudCByZXNwb25zZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFBhZ2U8VD4ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBOdW1iZXIgb2YgaXRlbXMgcGVyIHBhZ2Ugc2FtZSBhcyBsaW1pdFxyXG4gICAgICovXHJcbiAgICBzaXplOiBudW1iZXIgPSAxMDtcclxuICAgIC8qKlxyXG4gICAgICogVG90YWwgaXRlbXMgYXZhaWxhYmxlIG9uIHRoZSBzZXJ2ZXJcclxuICAgICAqL1xyXG4gICAgdG90YWxFbGVtZW50czogbnVtYmVyID0gMDtcclxuICAgIC8qKlxyXG4gICAgICogVG90YWwgbnVtYmVyIG9mIHBhZ2VzIHByZXNlbnRcclxuICAgICAqL1xyXG4gICAgdG90YWxQYWdlczogbnVtYmVyID0gMDtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGlzIHRoZSBmaXJzdCBwYWdlXHJcbiAgICAgKi9cclxuICAgIGZpcnN0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGl0IGlzIHRoZSBsYXN0IHBhZ2VcclxuICAgICAqL1xyXG4gICAgbGFzdDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgYWN0dWFsIHBhZ2UgY29udGVudFxyXG4gICAgICovXHJcbiAgICBjb250ZW50OiBBcnJheTxUPiA9IFtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIG1hcCBzb3J0IHBhcmFtZXRlcnNcclxuICAgICAqL1xyXG4gICAgc29ydGVkOiBTb3J0ID0gbmV3IFNvcnQoKTtcclxuICAgIC8qKlxyXG4gICAgICogQ3VycmVudCBwYWdlIG51bWJlclxyXG4gICAgICovXHJcbiAgICBudW1iZXI6IG51bWJlciA9IDA7XHJcbn1cclxuLyoqXHJcbiAqIHVzZWQgdG8gbWFwIHNvcnQgcmVxdWVzdFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNvcnR7XHJcbiAgICBzb3J0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHVuc29ydGVkOiBib29sZWFuID0gdHJ1ZTtcclxufVxyXG4iLCIvKipcclxuICogUmVwcmVzZW50cyBkeW5hbWljIGh0bWwgY29udHJvbHMgKElucHV0LCBUZXh0QXJlYSBhbmQgU2VsZWN0KVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1sa0R5bmFtaWNDb250cm9sPFQ+IHtcclxuICAgIC8qKlxyXG4gICAgICogQ29udHJvbCBsYWJlbFxyXG4gICAgICovXHJcbiAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBJY29uIHRvIGJlIGFwcGVuZGVkIGJlZm9yZSB0aGUgY29udHJvbCAoc3VwcG9ydHMgY2xhc3MgZGVmaW5lZCBpY29ucylcclxuICAgICAqL1xyXG4gICAgaWNvbjogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBOYW1lIG9mIHRoZSBjb250cm9sIChwcm92aWRlIHZhcmlhYmxlIHZhbGlkIG5hbWVzIGllLiBubyBzcGFjZXMgcHJlZmFyYWJseSBhcGkgY29ycmVzcG9uZGluZyBuYW1lcyBlLmcuIHVzZXJOYW1lKVxyXG4gICAgICovXHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBhY3R1YWwgY29udHJvbCAoTWxrSW5wdXQsIE1sa1RleHRBcmVhICYgTWxrU2VsZWN0KVxyXG4gICAgICovXHJcbiAgICBjb250cm9sVHlwZTogVDtcclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBmaWVsZCBpcyByZXF1aXJlZFxyXG4gICAgICovXHJcbiAgICBpc1JlcXVpcmVkOiBib29sZWFuO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb250cm9sIHBsYWNlaG9sZGVyXHJcbiAgICAgKi9cclxuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGxhYmVsOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgY29udHJvbFR5cGU6IFQsIGljb246IHN0cmluZyA9IFwiZmEgZmEtZmlsZS10ZXh0LW9cIixcclxuICAgICAgICBpc1JlcXVpcmVkOiBib29sZWFuID0gdHJ1ZSwgcGxhY2Vob2xkZXI6IHN0cmluZyA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLmxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xUeXBlID0gY29udHJvbFR5cGU7XHJcbiAgICAgICAgdGhpcy5pY29uID0gaWNvbjtcclxuICAgICAgICB0aGlzLmlzUmVxdWlyZWQgPSBpc1JlcXVpcmVkO1xyXG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlciA/IHBsYWNlaG9sZGVyIDogbGFiZWw7XHJcbiAgICB9XHJcblxyXG59XHJcbi8qKlxyXG4gKiBVc2VkIHRvIHJlcHJlc2VudCBodG1sIGlucHV0IHdpdGggb3B0aW9uczpcclxuICogdHlwZTogZGVmYXVsdCB0byB0ZXh0LCAgbWF4TGVuZ3RoLCBtaW5MZW5ndGgsIG1pbiwgbWF4XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWxrSW5wdXR7XHJcbiAgICAvKipcclxuICAgICAqIFR5cGUgb2YgaW5wdXQgZS5nLiB0ZXh0LCBudW1iZXIsIGRhdGVcclxuICAgICAqL1xyXG4gICAgdHlwZTogc3RyaW5nID0gXCJ0ZXh0XCI7XHJcbiAgICAvKipcclxuICAgICAqIFVzZWQgdG8gdmFsaWRhdGUgbGVuZ3RoIG9mIHRoZSBpbnB1dFxyXG4gICAgICovXHJcbiAgICBtYXhMZW5ndGg6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBtaW5pbXVtIGlucHV0IGxlbmd0aFxyXG4gICAgICovXHJcbiAgICBtaW5MZW5ndGg6IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogVXNlZCB0byB2YWxpZGF0ZSBudW1iZXIgaW5wdXRzXHJcbiAgICAgKi9cclxuICAgIG1pbjogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIHRvIHZhbGlkYXRlIG51bWJlciBpbnB1dHNcclxuICAgICAqL1xyXG4gICAgbWF4OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nID0gXCJ0ZXh0XCIpIHtcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIHRoaXMubWluTGVuZ3RoID0gdGhpcy5taW4gPSAwO1xyXG4gICAgICAgIHRoaXMubWF4TGVuZ3RoID0gNDAwMDtcclxuICAgICAgICB0aGlzLm1heCA9IDEwMDAwMDAwMDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGh0bWwgdGV4dGFyZWEgaW5wdXRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNbGtUZXh0YXJlYXtcclxuICAgIC8qKlxyXG4gICAgICogTnVtYmVyIHRleHRhcmVhIGNvbHVtbnNcclxuICAgICAqL1xyXG4gICAgY29scz86IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogTnVtYmVyIG9mIHRleHRhcmVhIHJvd3NcclxuICAgICAqL1xyXG4gICAgcm93cz86IG51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogVmFsaWRhdGUgbWF4aW11bSBpbnB1dCBsZW5ndGhcclxuICAgICAqL1xyXG4gICAgbWF4TGVuZ3RoOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFZhbGlkYXRlIG1pbmltdW0gaW5wdXQgbGVuZ3RoXHJcbiAgICAgKi9cclxuICAgIG1pbkxlbmd0aDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbHM6IG51bWJlciA9IDUsIHJvd3M6IG51bWJlciA9IDEpe1xyXG4gICAgICAgIHRoaXMuY29scyA9IGNvbHM7XHJcbiAgICAgICAgdGhpcy5yb3dzID0gcm93cztcclxuICAgICAgICB0aGlzLm1heExlbmd0aCA9IDQwMDA7XHJcbiAgICAgICAgdGhpcy5taW5MZW5ndGggPSAwXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGh0bWwgc2VsZWN0IGNvbnRyb2xcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNbGtTZWxlY3Qge1xyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3Qgb3B0aW9uc1xyXG4gICAgICovXHJcbiAgICBvcHRpb25zOiBBcnJheTxNbGtTZWxlY3RPcHRpb24+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEFycmF5PE1sa1NlbGVjdE9wdGlvbj4pe1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWxrU2VsZWN0T3B0aW9ue1xyXG4gICAgLyoqXHJcbiAgICAgKiBPcHRpb24gdmFsdWVcclxuICAgICAqL1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogT3B0aW9uIHRleHQvbGFiZWxcclxuICAgICAqL1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlOiBzdHJpbmcsIHRleHQ6IHN0cmluZyA9IG51bGwpe1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0ID8gdGV4dCA6IHZhbHVlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIiwiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0Zvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtQYWdlfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9wYWdlJztcclxuaW1wb3J0IHtNbGtEeW5hbWljQ29udHJvbCwgTWxrSW5wdXQsIE1sa1NlbGVjdCwgTWxrVGV4dGFyZWF9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL21say1keW5hbWljLWNvbnRyb2wnO1xyXG5pbXBvcnQge1Jlc3BvbnNlV3JhcHBlcn0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlcic7XHJcbmltcG9ydCB7U3Rld2FyZENsaWVudFNlcnZpY2V9IGZyb20gJy4uL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQge0RhdGF0YWJsZUNvbXBvbmVudH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xyXG5pbXBvcnQge1F1ZXVlfSBmcm9tICdxdWV1ZS10eXBlc2NyaXB0JztcclxuaW1wb3J0IHtEYXRlUGlwZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbi8vIGNvbnN0IHsgUXVldWUgfSA9IHJlcXVpcmUoJ3F1ZXVlLXR5cGVzY3JpcHQnKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc3R3LW1say1kYXRhdGFibGUnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNhcmQgY2FyZC1vdXRsaW5lLWRlZmF1bHRcIiAqbmdJZj1cImVuYWJsZUZpbHRlckhlYWRlclwiPlxyXG4gIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgIDxmb3JtIChuZ1N1Ym1pdCk9XCJwcm9jZXNzRmlsdGVyKGZpbHRlckZvcm0pXCIgW2Zvcm1Hcm91cF09XCJmaWx0ZXJGb3JtXCI+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zICBtYi0zXCIgKm5nRm9yPVwibGV0IGNvbnRyb2wgb2YgZmlsdGVyQ29tcG9uZW50c1wiPlxyXG4gICAgICAgICAgPGxhYmVsPnt7Y29udHJvbC5sYWJlbH19OiA8L2xhYmVsPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCAgZm9ybS1pY29uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgPGkgW2NsYXNzXT1cImNvbnRyb2wuaWNvblwiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8c2VsZWN0ICpuZ0lmPVwiaXNTZWxlY3QoY29udHJvbC5jb250cm9sVHlwZSlcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCI+XHJcbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkIHNlbGVjdGVkPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgbyBvZiBjb250cm9sLmNvbnRyb2xUeXBlLm9wdGlvbnNcIj57e28udGV4dH19PC9vcHRpb24+XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG5cclxuICAgICAgICAgICAgPHRleHRhcmVhICpuZ0lmPVwiaXNUZXh0QXJlYShjb250cm9sLmNvbnRyb2xUeXBlKVwiIFtjb2xzXT1cImNvbnRyb2wuY29udHJvbFR5cGUuY29sc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICBbcm93c109XCJjb250cm9sLmNvbnRyb2xUeXBlLnJvd3NcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiPjwvdGV4dGFyZWE+XHJcblxyXG4gICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJpc0lucHV0KGNvbnRyb2wuY29udHJvbFR5cGUpXCIgW3R5cGVdPVwiY29udHJvbC5jb250cm9sVHlwZS50eXBlXCJcclxuICAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCJcclxuICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCIvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkudG91Y2hlZFwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcigncmVxdWlyZWQnKVwiPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19IGlzIHJlcXVpcmVkPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWlubGVuZ3RoJylcIj5NaW5pbXVtIG9mIHt7Y29udHJvbC5jb250cm9sVHlwZS5taW5MZW5ndGh9fVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyczwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiB7e2NvbnRyb2wuY29udHJvbFR5cGUubWF4TGVuZ3RofX1cclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcnM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtaW4nKVwiPlNob3VsZCBiZSBncmVhdGVyIHRoYW4ge3tjb250cm9sLmNvbnRyb2xUeXBlLm1pbn19PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWF4JylcIj5TaG91bGQgYmUgbGVzcyB0aGFuIHt7Y29udHJvbC5jb250cm9sVHlwZS5tYXh9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIiAqbmdJZj1cImVuYWJsZURlZmF1bHRUYWJsZUhlYWRlclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCI+XHJcbiAgICAgICAgICA8bGFiZWw+RnJvbTogPC9sYWJlbD5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgZm9ybS1pY29uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhci1vXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXHJcbiAgICAgICAgICAgICAgaWQ9XCJpbnB1dEZyb21EYXRlXCJcclxuICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJmcm9tXCJcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkZyb20uLi5cIlxyXG4gICAgICAgICAgICAgICNkcGZyb209XCJic0RhdGVwaWNrZXJcIlxyXG4gICAgICAgICAgICAgIGJzRGF0ZXBpY2tlclxyXG4gICAgICAgICAgICAgIFtvdXRzaWRlQ2xpY2tdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgIFtic0NvbmZpZ109XCJ7IGRhdGVJbnB1dEZvcm1hdDogJ0RELU1NLVlZWVknLCBjb250YWluZXJDbGFzczogJ3RoZW1lLXJlZCcgfVwiXHJcbiAgICAgICAgICAgICAgbWF4bGVuZ3RoPVwiMzBcIlxyXG4gICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgcmVhZG9ubHlcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImRwZnJvbS50b2dnbGUoKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImRwZnJvbS5pc09wZW5cIj48aSBjbGFzcz1cImZhIGZhLXRoXCI+PC9pPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLnRvdWNoZWRcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2YgMzAgY2hhcmFjdGVyczwvc3Bhbj5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCI+XHJcbiAgICAgICAgICA8bGFiZWw+VG86IDwvbGFiZWw+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IGZvcm0taWNvbi1kZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXItb1wiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxyXG4gICAgICAgICAgICAgIGlkPVwiaW5wdXRUb0RhdGVcIlxyXG4gICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInRvXCJcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlRvLi4uXCJcclxuICAgICAgICAgICAgICAjZHB0bz1cImJzRGF0ZXBpY2tlclwiXHJcbiAgICAgICAgICAgICAgYnNEYXRlcGlja2VyXHJcbiAgICAgICAgICAgICAgW291dHNpZGVDbGlja109XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgW2JzQ29uZmlnXT1cInsgZGF0ZUlucHV0Rm9ybWF0OiAnREQtTU0tWVlZWScsIGNvbnRhaW5lckNsYXNzOiAndGhlbWUtcmVkJyB9XCJcclxuICAgICAgICAgICAgICBtYXhsZW5ndGg9XCIzMFwiXHJcbiAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgICByZWFkb25seVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiZHB0by50b2dnbGUoKVwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiZHB0by5pc09wZW5cIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdGhcIj48L2k+PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCd0bycpLnRvdWNoZWRcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgndG8nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDMwIGNoYXJhY3RlcnM8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgbWItM1wiPlxyXG4gICAgICAgICAgPGxhYmVsPlNlYXJjaDo8L2xhYmVsPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgZm9ybS1pY29uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1zZWFyY2hcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8aW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwibmVlZGxlXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCIgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2guLi5cIiAoa2V5dXApPVwidXBkYXRlRmlsdGVyKCRldmVudClcIi8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykudG91Y2hlZFwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDIwMCBjaGFyYWN0ZXJzPC9zcGFuPlxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHVsbC1yaWdodCBpbmxpbmUtYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nIGJ0bi1zbVwiIHR5cGU9XCJyZXNldFwiIChjbGljayk9XCJyZXNldCgpXCI+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1yZXBlYXRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgUmVzZXRcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuLXNtIHB1bGwtcmlnaHRcIiB0eXBlPVwic3VibWl0XCI+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1maWx0ZXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgRmlsdGVyXHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgIDwvZm9ybT5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG48bmd4LWRhdGF0YWJsZVxyXG4gICN0YWJsZVxyXG4gIFtyb3dIZWlnaHRdPVwidGFibGVSb3dIZWlnaHRcIlxyXG4gIFtmb290ZXJIZWlnaHRdPVwidGFibGVGb290ZXJIZWlnaHRcIlxyXG4gIFtoZWFkZXJIZWlnaHRdPVwidGFibGVIZWFkZXJIZWlnaHRcIlxyXG4gIFtzY3JvbGxiYXJWXT1cInZlcnRpY2FsU2Nyb2xsQWN0aXZlXCJcclxuICBbc2Nyb2xsYmFySF09XCJob3Jpem9udGFsU2Nyb2xsQWN0aXZlXCJcclxuICBbc3VtbWFyeVJvd109XCJlbmFibGVTdW1tYXJ5XCJcclxuICBbc3VtbWFyeVBvc2l0aW9uXT1cInN1bW1hcnlQb3NpdGlvblwiXHJcbiAgW3N1bW1hcnlIZWlnaHRdPVwic3VtbWFyeUhlaWdodFwiXHJcbiAgY2xhc3M9XCJib290c3RyYXBcIlxyXG4gIFtjb2x1bW5Nb2RlXT1cIidmb3JjZSdcIlxyXG4gIFtyb3dzXT1cInBhZ2UuY29udGVudFwiXHJcbiAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcclxuICBbc2VsZWN0aW9uVHlwZV09XCInY2hlY2tib3gnXCJcclxuICAoYWN0aXZhdGUpPVwib25BY3RpdmF0ZSgkZXZlbnQpXCJcclxuICAoc2VsZWN0KT0nb25TZWxlY3QoJGV2ZW50KSdcclxuICBbY291bnRdPVwicGFnZS50b3RhbEVsZW1lbnRzXCJcclxuICBbb2Zmc2V0XT1cInBhZ2UubnVtYmVyXCJcclxuICBbZXh0ZXJuYWxQYWdpbmddPVwidHJ1ZVwiXHJcbiAgW2xpbWl0XT1cInBhZ2Uuc2l6ZVwiXHJcbiAgKHBhZ2UpPVwibG9hZFBhZ2UoJGV2ZW50LCBudWxsKVwiPlxyXG4gIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBbc3VtbWFyeUZ1bmNdPVwic3VtbWFyeUZ1bmNcIiBbd2lkdGhdPVwiMzBcIiBbc29ydGFibGVdPVwiZmFsc2VcIiBbY2FuQXV0b1Jlc2l6ZV09XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkcmFnZ2FibGVdPVwidHJ1ZVwiIFtyZXNpemVhYmxlXT1cImZhbHNlXCIgW2hlYWRlckNoZWNrYm94YWJsZV09XCJ0cnVlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2NoZWNrYm94YWJsZV09XCJ0cnVlXCIgKm5nSWY9XCJlbmFibGVDaGVja2JveFwiPlxyXG4gIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XHJcbiAgPG5neC1kYXRhdGFibGUtY29sdW1uIFtzdW1tYXJ5RnVuY109XCJzdW1tYXJ5RnVuY1wiIFt3aWR0aF09XCIzMFwiIFtzb3J0YWJsZV09XCJmYWxzZVwiIFtjYW5BdXRvUmVzaXplXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2RyYWdnYWJsZV09XCJ0cnVlXCIgW3Jlc2l6ZWFibGVdPVwiZmFsc2VcIiBbaGVhZGVyQ2hlY2tib3hhYmxlXT1cInRydWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgYyBvZiBjb2x1bW5zOyBpbmRleCBhcyBpO1wiPlxyXG4gICAgPG5nLXRlbXBsYXRlIGxldC1jb2x1bW49XCJjb2x1bW5cIiBuZ3gtZGF0YXRhYmxlLWhlYWRlci10ZW1wbGF0ZSAqbmdJZj1cImk9PTBcIj5cclxuICAgICAgPHN0cm9uZz4jPC9zdHJvbmc+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPG5nLXRlbXBsYXRlIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZSBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiIGxldC1yb3c9XCJyb3dcIiAqbmdJZj1cImk9PTBcIj5cclxuICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAge3tyb3dJbmRleCArIDF9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cclxuICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gW3N1bW1hcnlGdW5jXT1cIihjLnN1bW1hcnlGdW5jKSA/IGMuc3VtbWFyeUZ1bmMgOiBzdW1tYXJ5RnVuY1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjYW5BdXRvUmVzaXplXT1cIihjLmNhbkF1dG9SZXNpemUpID8gYy5jYW5BdXRvUmVzaXplIDogdHJ1ZVwiIFtuYW1lXT1cImMuY29sdW1uTmFtZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFt3aWR0aF09XCJjLndpZHRoXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3NvcnRhYmxlXT1cIihjLnNvcnRhYmxlKSA/IGMuc29ydGFibGUgOiB0cnVlXCIgW2RyYWdnYWJsZV09XCIoYy5kcmFnZ2FibGUpID8gYy5kcmFnZ2FibGUgOiB0cnVlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3Jlc2l6ZWFibGVdPVwiKGMucmVzaXplYWJsZSkgPyBjLnJlc2l6ZWFibGUgOiB0cnVlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGMgb2YgY29sdW1uczsgaW5kZXggYXMgaTtcIj5cclxuICAgIDxuZy10ZW1wbGF0ZSBsZXQtY29sdW1uPVwiY29sdW1uXCIgbmd4LWRhdGF0YWJsZS1oZWFkZXItdGVtcGxhdGUgKm5nSWY9XCJpPT0wXCI+XHJcbiAgICAgIDxzdHJvbmc+e3tjLmNvbHVtbk5hbWV9fTwvc3Ryb25nPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtdmFsdWU9XCJ2YWx1ZVwiIGxldC1yb3c9XCJyb3dcIiAqbmdJZj1cImk9PTBcIj5cclxuICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImMuaXNEYXRlQ29sdW1uOyB0aGVuIHQxMFwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYy5pc0N1cnJlbmN5Q29sdW1uICYmIGMuY3VycmVuY3lUZXh0OyB0aGVuIHQ0MFwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYy5pc0N1cnJlbmN5Q29sdW1uICYmICFjLmN1cnJlbmN5VGV4dDsgdGhlbiB0NzBcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjLmlzRGF0ZUNvbHVtbiAmJiAhYy5pc0N1cnJlbmN5Q29sdW1uOyB0aGVuIHQ3MFwiPjwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICN0MTA+XHJcbiAgICAgICAgICAgICAgICB7eyhnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpIHwgZGF0ZTonbWVkaXVtJyl9fVxyXG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI3Q0MD5cclxuICAgICAgICAgICAgICAgIHt7KGdldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSkgfCBjdXJyZW5jeTpjLmN1cnJlbmN5VGV4dDonY29kZScpfX1cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICN0NzA+XHJcbiAgICAgICAgICAgICAgICB7e2dldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSl9fVxyXG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcblxyXG4gICAgPG5nLXRlbXBsYXRlIGxldC1jb2x1bW49XCJjb2x1bW5cIiBuZ3gtZGF0YXRhYmxlLWhlYWRlci10ZW1wbGF0ZT5cclxuICAgICAgPHN0cm9uZz57e2MuY29sdW1uTmFtZX19PC9zdHJvbmc+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPG5nLXRlbXBsYXRlIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZSBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiIGxldC12YWx1ZT1cInZhbHVlXCIgbGV0LXJvdz1cInJvd1wiPlxyXG4gICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYy5pc0RhdGVDb2x1bW47IHRoZW4gdDEwXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjLmlzQ3VycmVuY3lDb2x1bW4gJiYgYy5jdXJyZW5jeVRleHQ7IHRoZW4gdDQwXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjLmlzQ3VycmVuY3lDb2x1bW4gJiYgIWMuY3VycmVuY3lUZXh0OyB0aGVuIHQ3MFwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWMuaXNEYXRlQ29sdW1uICYmICFjLmlzQ3VycmVuY3lDb2x1bW47IHRoZW4gdDcwXCI+PC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI3QxMD5cclxuICAgICAgICAgICAgICAgIHt7KGdldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSkgfCBkYXRlOidtZWRpdW0nKX19XHJcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdDQwPlxyXG4gICAgICAgICAgICAgICAge3soZ2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKSB8IGN1cnJlbmN5OmMuY3VycmVuY3lUZXh0Oidjb2RlJyl9fVxyXG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI3Q3MD5cclxuICAgICAgICAgICAgICAgIHt7Z2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKX19XHJcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxyXG4gIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBbc3VtbWFyeUZ1bmNdPVwic3VtbWFyeUZ1bmNcIiBbbmFtZV09XCJtb3JlQWN0aW9ucy5uYW1lXCIgKm5nSWY9XCJtb3JlQWN0aW9uc1wiIFtzb3J0YWJsZV09XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjYW5BdXRvUmVzaXplXT1cImZhbHNlXCI+XHJcbiAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXZhbHVlPVwidmFsdWVcIiBsZXQtcm93PVwicm93XCI+XHJcbiAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtcHJlcGVuZFwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tb3V0bGluZS1zZWNvbmRhcnkgZHJvcGRvd24tdG9nZ2xlXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIlxyXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCJcclxuICAgICAgICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cclxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWxpc3QtdWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPlxyXG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgbW9yZUFjdGlvbnMuYWN0aW9uc1wiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIlxyXG4gICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkFjdGlvbkNsaWNrKHtpZDogcm93W21vcmVBY3Rpb25zLmlkRmllbGROYW1lXSwgYWN0aW9uTmFtZTogYWN0aW9uLmFjdGlvbk5hbWUsIGFjdGlvblJvdzogcm93fSlcIj57e2FjdGlvbi5hY3Rpb25OYW1lfX08L2E+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxyXG48L25neC1kYXRhdGFibGU+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNbGtEYXRhdGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHRhYmxlUm93SGVpZ2h0ID0gNTA7XHJcbiAgQElucHV0KCkgdGFibGVGb290ZXJIZWlnaHQgPSA1MDtcclxuICBASW5wdXQoKSB0YWJsZUhlYWRlckhlaWdodCA9IDUwO1xyXG4gIEBJbnB1dCgpIHZlcnRpY2FsU2Nyb2xsQWN0aXZlID0gZmFsc2U7XHJcbiAgQElucHV0KCkgaG9yaXpvbnRhbFNjcm9sbEFjdGl2ZSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGNvbHVtbnM6IEFycmF5PE1sa0RhdGFUYWJsZUNvbHVtbj4gPSBbXTtcclxuICBASW5wdXQoKSBlbmFibGVDaGVja2JveCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGVuZHBvaW50OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZW5hYmxlRmlsdGVySGVhZGVyID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZW5hYmxlRGVmYXVsdFRhYmxlSGVhZGVyID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZW5hYmxlU3VtbWFyeSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHN1bW1hcnlQb3NpdGlvbiA9ICdcXCdib3R0b21cXCcnO1xyXG4gIEBJbnB1dCgpIHN1bW1hcnlIZWlnaHQgPSAnXFwnYXV0b1xcJyc7XHJcbiAgQElucHV0KCkgbW9yZUFjdGlvbnM6IE1sa01vcmVBY3Rpb25zO1xyXG4gIEBPdXRwdXQoKSBvbkFjdGlvbnNFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8TWxrTW9yZUFjdGlvbkRhdGE+KCk7XHJcbiAgQElucHV0KCkgZmlsdGVyQ29tcG9uZW50czogQXJyYXk8TWxrRHluYW1pY0NvbnRyb2w8YW55Pj4gPSBbXTtcclxuICBASW5wdXQoKSBwYXJhbXM6IE1hcDxzdHJpbmcsIGFueT47XHJcbiAgcGFnZTogUGFnZTxhbnk+ID0gbmV3IFBhZ2UoKTtcclxuICBzZWxlY3RlZCA9IFtdO1xyXG4gIEBPdXRwdXQoKSBvblNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xyXG4gIEBWaWV3Q2hpbGQoRGF0YXRhYmxlQ29tcG9uZW50KSB0YWJsZTogRGF0YXRhYmxlQ29tcG9uZW50O1xyXG4gIGZpbHRlcjogT2JqZWN0ID0ge307XHJcbiAgZmlsdGVyRm9ybTogRm9ybUdyb3VwO1xyXG4gIGVtcHR5U3VtbWFyeUZ1bmM6ICgpID0+IG51bGw7XHJcblxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0ZXJ3YXJkU2VydmljZTogU3Rld2FyZENsaWVudFNlcnZpY2U8UmVzcG9uc2VXcmFwcGVyPFBhZ2U8YW55Pj4sIGFueT4sIHByaXZhdGUgZGF0ZVBpcGU6IERhdGVQaXBlKSB7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZW5lcmF0ZSBmb3JtIGNvbnRyb2wgZnJvbSBmaWx0ZXJDb21wb25lbnRzIGFuZCBhbHNvIGFwcGVuZGluZyBkZWZhdWx0IGNvbnRyb2xzIGllLiBkYXRlIGZpbHRlciBhbmQgc2VhcmNoIGNvbnRyb2xzXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBncm91cCA9IHt9O1xyXG4gICAgdGhpcy5maWx0ZXJDb21wb25lbnRzLmZvckVhY2goY29tcCA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbGlkYXRvcnM6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgaWYgKGNvbXAuaXNSZXF1aXJlZCkge1xyXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBNbGtJbnB1dCB8fCBjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgTWxrVGV4dGFyZWEpIHtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW5MZW5ndGgoY29tcC5jb250cm9sVHlwZS5taW5MZW5ndGgpKTtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5tYXhMZW5ndGgoY29tcC5jb250cm9sVHlwZS5tYXhMZW5ndGgpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBNbGtJbnB1dCkge1xyXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heChjb21wLmNvbnRyb2xUeXBlLm1heCkpO1xyXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbihjb21wLmNvbnRyb2xUeXBlLm1pbikpO1xyXG4gICAgICB9XHJcbiAgICAgIGdyb3VwW2NvbXAubmFtZV0gPSBuZXcgRm9ybUNvbnRyb2woJycsIHZhbGlkYXRvcnMpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBhZGQgZGVmYXVsdCBjb250cm9sc1xyXG4gICAgZ3JvdXBbJ2Zyb20nXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMzApKTtcclxuICAgIGdyb3VwWyd0byddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgzMCkpO1xyXG4gICAgZ3JvdXBbJ25lZWRsZSddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgyMDApKTtcclxuICAgIHRoaXMuZmlsdGVyRm9ybSA9IG5ldyBGb3JtR3JvdXAoZ3JvdXApO1xyXG4gICAgdGhpcy5sb2FkUGFnZSh7b2Zmc2V0OiAwLCBsaW1pdDogdGhpcy5wYWdlLnNpemV9LCBudWxsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gZW1pdCBjbGljayBldmVudCBvZiB0aGUgYWN0aW9uc1xyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIG9uQWN0aW9uQ2xpY2soZXZlbnQ6IE1sa01vcmVBY3Rpb25EYXRhKSB7XHJcbiAgICB0aGlzLm9uQWN0aW9uc0V2ZW50LmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJvY2VzcyBzZXJ2ZXIgcmVxdWVzdCBvZiBkYXRhYmxlXHJcbiAgICogQHBhcmFtIHBhZ2VJbmZvXHJcbiAgICogQHBhcmFtIGZpbHRlcnNcclxuICAgKi9cclxuICBsb2FkUGFnZShwYWdlSW5mbywgZmlsdGVycykge1xyXG4gICAgaWYgKCF0aGlzLmVuZHBvaW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCByZXF1ZXN0OiBNYXA8c3RyaW5nLCBhbnk+O1xyXG4gICAgaWYgKGZpbHRlcnMpIHtcclxuICAgICAgcmVxdWVzdCA9IGZpbHRlcnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXF1ZXN0ID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucGFyYW1zKSB7XHJcbiAgICAgIHRoaXMucGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcclxuICAgICAgICByZXF1ZXN0LnNldChrZXksIHZhbHVlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXF1ZXN0LnNldCgncGFnZScsIHBhZ2VJbmZvLm9mZnNldCk7XHJcbiAgICByZXF1ZXN0LnNldCgnc2l6ZScsIHBhZ2VJbmZvLmxpbWl0KTtcclxuICAgIHRoaXMuc3RlcndhcmRTZXJ2aWNlLmdldCh0aGlzLmVuZHBvaW50LCByZXF1ZXN0KS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xyXG4gICAgICBpZiAocmVzcG9uc2UuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBoYW5kbGUgc2VsZWN0IG9wdGlvblxyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIG9uU2VsZWN0KHtzZWxlY3RlZH0pIHtcclxuICAgIGNvbnNvbGUubG9nKCdTZWxlY3QgRXZlbnQnLCBzZWxlY3RlZCwgdGhpcy5zZWxlY3RlZCk7XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZC5zcGxpY2UoMCwgdGhpcy5zZWxlY3RlZC5sZW5ndGgpO1xyXG4gICAgdGhpcy5zZWxlY3RlZC5wdXNoKC4uLnNlbGVjdGVkKTtcclxuICAgIHRoaXMub25TZWxlY3RlZC5lbWl0KHRoaXMuc2VsZWN0ZWQpO1xyXG4gIH1cclxuXHJcbiAgb25BY3RpdmF0ZShldmVudCkge1xyXG5cclxuICB9XHJcblxyXG4gIHVwZGF0ZUZpbHRlcihldmVudCkge1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gcHJvY2VzcyB0YWJsZSBmaWx0ZXIuIElmIGRhdGUgZmlsdGVyIGlzIG5vdCBwcm92aWRlIHRoZSBmcm9tIHZhbHVlIGlzXHJcbiAgICogc2V0IHRvIDIwMTgtMDEtMDEgYW5kIHRvIHZhbHVlIGlzIHNldCB0byAxIHllYXIgZnJvbSB0b2RheVxyXG4gICAqIEBwYXJhbSBmb3JtXHJcbiAgICovXHJcbiAgcHJvY2Vzc0ZpbHRlcihmb3JtKSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBjb25zdCBmOiBNYXA8U3RyaW5nLCBhbnk+ID0gbmV3IE1hcChPYmplY3QuZW50cmllcyh0aGlzLmZpbHRlckZvcm0udmFsdWUpKTtcclxuICAgIC8vIHZhbGlkYXRlIGRhdGVcclxuICAgIGlmICghdGhpcy5maWx0ZXJGb3JtLmdldCgnZnJvbScpLnRvdWNoZWQpIHsvLyBpZiBmcm9tIGlzIG5vdCBwb3B1bGF0ZWQgcmVtb3ZlIGZyb20gcmVxdWVzdFxyXG4gICAgICBmLmRlbGV0ZSgnZnJvbScpO1xyXG4gICAgICAvLyB0aGlzLmZpbHRlckZvcm0uZ2V0KCdmcm9tJykuc2V0VmFsdWUoJzIwMTgtMDEtMDEnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGYuZ2V0KCdmcm9tJykuc2V0VmFsdWUobmV3IERhdGUodGhpcy5maWx0ZXJGb3JtLmdldCgnZnJvbScpLnZhbHVlKSk7XHJcbiAgICAgIGNvbnN0IGZkID0gbmV3IERhdGUodGhpcy5maWx0ZXJGb3JtLmdldCgnZnJvbScpLnZhbHVlKTtcclxuICAgICAgLy8gZi5zZXQoJ2Zyb20nLCBmZC50b0lTT1N0cmluZygpKTtcclxuICAgICAgZi5zZXQoJ2Zyb20nLCB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShmZCwgJ2RkL01NL3l5eXknKSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuZmlsdGVyRm9ybS5nZXQoJ3RvJykudG91Y2hlZCkgey8vIGlmIHRvIGlzIG5vdCBwb3B1bGF0ZWQgcmVtb3ZlIGZyb20gcmVxdWVzdFxyXG4gICAgICBmLmRlbGV0ZSgndG8nKTtcclxuICAgICAgLy8gbGV0IHRvRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIC8vIHRvRGF0ZS5zZXREYXRlKHRvRGF0ZS5nZXRGdWxsWWVhcigpICsgMSk7XHJcbiAgICAgIC8vIHRoaXMuZmlsdGVyRm9ybS5nZXQoJ3RvJykuc2V0VmFsdWUodGhpcy5nZXRGb3JtYXR0ZWREYXRlKHRvRGF0ZSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gZi5nZXQoJ3RvJykuc2V0VmFsdWUobmV3IERhdGUodGhpcy5maWx0ZXJGb3JtLmdldCgndG8nKS52YWx1ZSkpO1xyXG4gICAgICBjb25zdCB0ZCA9IG5ldyBEYXRlKHRoaXMuZmlsdGVyRm9ybS5nZXQoJ3RvJykudmFsdWUpO1xyXG4gICAgICAvLyBmLnNldCgndG8nLCB0ZC50b0lTT1N0cmluZygpKTtcclxuICAgICAgZi5zZXQoJ3RvJywgdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0odGQsICdkZC9NTS95eXl5JykpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9hZFBhZ2Uoe29mZnNldDogdGhpcy5wYWdlLm51bWJlciwgbGltaXQ6IHRoaXMucGFnZS5zaXplfSwgZik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIGlucHV0XHJcbiAgICogQHBhcmFtIGNvbnRyb2xcclxuICAgKi9cclxuICBpc0lucHV0KGNvbnRyb2w6IGFueSkge1xyXG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBNbGtJbnB1dDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgc2VsZWN0XHJcbiAgICogQHBhcmFtIGNvbnRyb2xcclxuICAgKi9cclxuICBpc1NlbGVjdChjb250cm9sOiBhbnkpIHtcclxuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgTWxrU2VsZWN0O1xyXG4gIH1cclxuXHJcbiAgcmVzZXQoKSB7XHJcbiAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIHRleHRhcmVhXHJcbiAgICovXHJcbiAgaXNUZXh0QXJlYShjb250cm9sOiBhbnkpIHtcclxuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgTWxrVGV4dGFyZWE7XHJcbiAgfVxyXG5cclxuICBzdW1tYXJ5RnVuYyhjZWxsOiBhbnkpIHtcclxuICAgIHJldHVybiAoYGApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBmb3JtYXQgZGF0ZSB0byBzdHJpbmcgeXl5eS1NTS1kZFxyXG4gICAqIEBwYXJhbSBkYXRlXHJcbiAgICovXHJcbiAgZ2V0Rm9ybWF0dGVkRGF0ZShkYXRlKSB7XHJcbiAgICBjb25zdCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG5cclxuICAgIGxldCBtb250aCA9ICgxICsgZGF0ZS5nZXRNb250aCgpKS50b1N0cmluZygpO1xyXG4gICAgbW9udGggPSBtb250aC5sZW5ndGggPiAxID8gbW9udGggOiAnMCcgKyBtb250aDtcclxuXHJcbiAgICBsZXQgZGF5ID0gZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKTtcclxuICAgIGRheSA9IGRheS5sZW5ndGggPiAxID8gZGF5IDogJzAnICsgZGF5O1xyXG5cclxuICAgIHJldHVybiB5ZWFyICsgJy0nICsgbW9udGggKyAnLScgKyBkYXk7XHJcbiAgfVxyXG5cclxuICBnZXRGaWVsZFZhbHVlKGRhdGE6IE9iamVjdCwgZmllbGQ6IGFueSkge1xyXG4gICAgY29uc3QgazogQXJyYXk8c3RyaW5nPiA9IGZpZWxkLnNwbGl0KCcuJyk7XHJcbiAgICBjb25zdCBrZXlzID0gbmV3IFF1ZXVlPHN0cmluZz4oLi4uayk7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0T2JqZWN0VmFsdWUoZGF0YSwga2V5cyk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGZpbmQga2V5IHZhbHVlIGJhc2VkIG9uIHRoZSBrZXkgc2VxdWVuY2UgcHJvdmlkZWRcclxuICAgKiBAcGFyYW0gZGF0YSBleHBlY3RzIGFuIG9iamVjdFxyXG4gICAqIEBwYXJhbSBrZXlzIGkuZS4gdXNlci5nZW5kZXIudHlwZS50eXBlXHJcbiAgICovXHJcbiAgZ2V0T2JqZWN0VmFsdWUoZGF0YTogYW55LCBrZXlzOiBRdWV1ZTxzdHJpbmc+KSB7XHJcbiAgICBpZiAoKCEoZGF0YSBpbnN0YW5jZW9mIE9iamVjdCkpIHx8IChrZXlzLmxlbmd0aCA9PT0gMSkpIHtcclxuICAgICAgcmV0dXJuIGRhdGFba2V5cy50YWlsXTtcclxuICAgIH1cclxuICAgIGxldCB2YWx1ZSA9IG51bGw7XHJcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgaWYgKChrZXkgPT09IGtleXMuZnJvbnQpICYmIChkYXRhW2tleV0gaW5zdGFuY2VvZiBPYmplY3QpKSB7XHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLmdldE9iamVjdFZhbHVlKGRhdGFba2V5XSwga2V5cyk7XHJcbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBrZXlzLnRhaWwpIHtcclxuICAgICAgICB2YWx1ZSA9IGRhdGFba2V5XTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVc2VkIHRvIGRlZmluZSBkYXRhdGFibGUgY29sdW1ucyB3aXRoIGF0dHJpYnV0ZXMgKGNvbHVtbk5hbWUsIGZpZWxkTmFtZSwgd2lkdGgsIHNvcnRhYmxlLCBjYW5BdXRvUmVzaXplLFxyXG4gKiBkcmFnZ2FibGUsIHJlc2l6YWJsZSwgaXNEYXRlQ29sdW1uLCBpc0N1cnJlbmN5Q29sdW1uLCBjdXJyZW5jeVRleHQsIHN1bW1hcnlGdW5jKVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBNbGtEYXRhVGFibGVDb2x1bW4ge1xyXG4gIC8qKlxyXG4gICAqIGNvbHVtbiB0aXRsZVxyXG4gICAqL1xyXG4gIGNvbHVtbk5hbWU6IHN0cmluZztcclxuICAvKipcclxuICAgKiBTZXJ2ZXIgc2lkZSByZXNwb25zZSBmaWVsZCBjb3JyZXNwb25kaW5nIHRvIHRoZSBjb2x1bW4gaS5lIGZ1bGxOYW1lIG1heSBjb3JyZXNwb25kIHRvIE5hbWUgY29sdW1uXHJcbiAgICovXHJcbiAgZmllbGROYW1lOiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogV2lkdGggb2YgdGhlIGNvbHVtblxyXG4gICAqL1xyXG4gIHdpZHRoPzogbnVtYmVyO1xyXG4gIC8qKlxyXG4gICAqIEVuYWJsZSBzb3J0aW5nIGluIGEgY29sdW1uXHJcbiAgICovXHJcbiAgc29ydGFibGU/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIE1ha2VzIGEgY29sdW1uIHJlc2l6YWJsZVxyXG4gICAqL1xyXG4gIGNhbkF1dG9SZXNpemU/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIEVuYWJsZXMgYSBjb2x1bW4gdG8gYmUgZHJhZ2dhYmxlXHJcbiAgICovXHJcbiAgZHJhZ2dhYmxlPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBNYWtlcyBhIGNvbHVtbiByZXNpemFibGVcclxuICAgKi9cclxuICByZXNpemVhYmxlPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBVc2VkIHRvIGVuYWJsZSBmb3JtYXRpbmcgdGltZXN0YW1wIHRvIHN0cmluZyBkYXRlXHJcbiAgICovXHJcbiAgaXNEYXRlQ29sdW1uPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBlbmFibGUgZm9ybWF0aW5nIHN0cmluZyB0byBzdHJpbmcgY3VycmVuY3lcclxuICAgKi9cclxuICBpc0N1cnJlbmN5Q29sdW1uPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBzZXQgdGhlIGN1cnJlbmN5IHN0cmluZ1xyXG4gICAqL1xyXG4gIGN1cnJlbmN5VGV4dD86IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gdG8gY2FsbCBhdCB0aGUgc3VtbWFyeSByb3dcclxuICAgKi9cclxuICBzdW1tYXJ5RnVuYz86IChhbnk6IGFueVtdKSA9PiBhbnk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVc2VkIHRvIGRpc3BsYXkgbW9yZSBhY3Rpb25zIGNvbHVtbiBhbmQgdGhlIGVuZCBvZiB0aGUgdGFibGVcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNbGtNb3JlQWN0aW9ucyB7XHJcbiAgLyoqXHJcbiAgICogQWN0aW9uIENvbHVtbiBuYW1lIGUuZy4gTW9yZSBBY3Rpb25zXHJcbiAgICovXHJcbiAgbmFtZSA9ICdBY3Rpb25zJztcclxuICAvKipcclxuICAgKiBGaWVsZCBuYW1lIGlkIGZyb20gdGhlIHNlcnZlciByZXNwb25zZSBlLmcgdXNlcklkXHJcbiAgICovXHJcbiAgaWRGaWVsZE5hbWUgPSAnaWQnO1xyXG4gIC8qKlxyXG4gICAqIEFjdGlvbnMgZS5nLiBFZGl0LCBEZWxldGVcclxuICAgKi9cclxuICBhY3Rpb25zOiBBcnJheTxNbGtNb3JlQWN0aW9uRGF0YT47XHJcblxyXG4gIGNvbnN0cnVjdG9yKGFjdGlvbnM6IEFycmF5PE1sa01vcmVBY3Rpb25EYXRhPiwgaWQ/OiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcpIHtcclxuICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnM7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5pZEZpZWxkTmFtZSA9IGlkO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWxrTW9yZUFjdGlvbkRhdGEge1xyXG4gIC8qKlxyXG4gICAqIE5ldmVyIG1pbmQgdGhpcyBmaWVsZCBpdCB3aWxsIGJlIHVzZWQgYnkgdGhlIGxpYnJhcnlcclxuICAgKi9cclxuICBpZD86IGFueTtcclxuICAvKipcclxuICAgKiBBY3Rpb24gbmFtZSBlLmcuIEVkaXQsIERlbGV0ZVxyXG4gICAqL1xyXG4gIGFjdGlvbk5hbWU6IGFueTtcclxuXHJcbiAgLyoqXHJcbiAgICogQWN0aW9uIHJvdyA6IHRoZSBjbGlja2VkIHJvd1xyXG4gICAqL1xyXG4gIGFjdGlvblJvdz86IGFueTtcclxufVxyXG4iLCJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtTdGV3YXJkQ2xpZW50Q29tcG9uZW50fSBmcm9tICcuL3N0ZXdhcmQtY2xpZW50LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7TWxrRGF0YXRhYmxlQ29tcG9uZW50fSBmcm9tICcuL21say1kYXRhdGFibGUvbWxrLWRhdGF0YWJsZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZSwgRGF0ZVBpcGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7Tmd4RGF0YXRhYmxlTW9kdWxlfSBmcm9tICdAc3dpbWxhbmUvbmd4LWRhdGF0YWJsZSc7XHJcbmltcG9ydCB7UmVhY3RpdmVGb3Jtc01vZHVsZSwgRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7U3Rld2FyZENvbmZpZ30gZnJvbSAnLi9zdGV3YXJkLWNsaWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHtCc0RhdGVwaWNrZXJNb2R1bGV9IGZyb20gJ25neC1ib290c3RyYXAvZGF0ZXBpY2tlcic7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE5neERhdGF0YWJsZU1vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEJzRGF0ZXBpY2tlck1vZHVsZS5mb3JSb290KCksXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtTdGV3YXJkQ2xpZW50Q29tcG9uZW50LCBNbGtEYXRhdGFibGVDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtTdGV3YXJkQ2xpZW50Q29tcG9uZW50LCBNbGtEYXRhdGFibGVDb21wb25lbnRdLFxyXG4gIHByb3ZpZGVyczogW0RhdGVQaXBlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudE1vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBTdGV3YXJkQ29uZmlnKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogU3Rld2FyZENsaWVudE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IFN0ZXdhcmRDb25maWcsIHVzZVZhbHVlOiBjb25maWd9XVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImh0dHAiLCJIdHRwSGVhZGVycyIsImNhdGNoRXJyb3IiLCJIdHRwUGFyYW1zIiwib2YiLCJJbmplY3RhYmxlIiwiSHR0cENsaWVudCIsIk1ldGEiLCJDb21wb25lbnQiLCJFdmVudEVtaXR0ZXIiLCJWYWxpZGF0b3JzIiwiRm9ybUNvbnRyb2wiLCJGb3JtR3JvdXAiLCJRdWV1ZSIsIkRhdGVQaXBlIiwiSW5wdXQiLCJPdXRwdXQiLCJWaWV3Q2hpbGQiLCJEYXRhdGFibGVDb21wb25lbnQiLCJOZ01vZHVsZSIsIkZvcm1zTW9kdWxlIiwiUmVhY3RpdmVGb3Jtc01vZHVsZSIsIk5neERhdGF0YWJsZU1vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkJzRGF0ZXBpY2tlck1vZHVsZSIsIkh0dHBDbGllbnRNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7Ozs7UUFBQTtTQWFDO1FBQUQsc0JBQUM7SUFBRCxDQUFDOzs7Ozs7QUNoQkQ7UUFPQTtTQUtDO1FBQUQsb0JBQUM7SUFBRCxDQUFDLElBQUE7Ozs7QUFFRDtRQVVFLDhCQUFvQkEsT0FBZ0IsRUFBVSxNQUFxQixFQUFVLElBQVU7WUFBbkUsU0FBSSxHQUFKQSxPQUFJLENBQVk7WUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFlO1lBQVUsU0FBSSxHQUFKLElBQUksQ0FBTTtZQUx2RixhQUFRLEdBQUcsR0FBRyxDQUFDO1lBTWIsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtnQkFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUM7YUFDcEQ7WUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDaEMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7YUFDL0I7aUJBQU07Z0JBQ0wsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtvQkFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJQyxnQkFBVyxDQUFDO3dCQUM3QixjQUFjLEVBQUUs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