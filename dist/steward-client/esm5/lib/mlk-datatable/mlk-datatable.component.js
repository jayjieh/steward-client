/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Page } from '../entities/wrappers/page';
import { MlkInput, MlkTextarea, MlkSelect } from '../entities/wrappers/mlk-dynamic-control';
import { StewardClientService } from '../steward-client.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Queue } from 'queue-typescript';
//const { Queue } = require('queue-typescript');
var MlkDatatableComponent = /** @class */ (function () {
    function MlkDatatableComponent(sterwardService) {
        this.sterwardService = sterwardService;
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
    ;
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
        var keys = new (Queue.bind.apply(Queue, tslib_1.__spread([void 0], k)))();
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
                    template: "<div class=\"card card-outline-default\" *ngIf=\"enableFilterHeader\">\n<div class=\"card-body\">\n<form (ngSubmit)=\"processFilter(filterForm)\" [formGroup]=\"filterForm\">\n\n<div class=\"row\">\n          <div class=\"col-md-3  mb-3\" *ngFor=\"let control of filterComponents\">\n            <label for=\"from\">{{control.label}}: </label>\n            <div class=\"input-group\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text  form-icon-default\">\n                  <i [class]=\"control.icon\"></i>\n                </span>\n              </div>\n  \n              <select *ngIf=\"isSelect(control.controlType)\" class=\"form-control form-control-sm checking-field\" [formControlName]=\"control.name\">\n                <option value=\"\" disabled selected>{{control.placeholder}}</option>\n                <option *ngFor=\"let o of control.controlType.options\">{{o.text}}</option>\n              </select>\n  \n              <textarea *ngIf=\"isTextArea(control.controlType)\" [cols]=\"control.controlType.cols\" [rows]=\"control.controlType.rows\" class=\"form-control form-control-sm checking-field\"\n                [placeholder]=\"control.placeholder\" [formControlName]=\"control.name\"></textarea>\n  \n              <input *ngIf=\"isInput(control.controlType)\" [type]=\"control.controlType.type\" [placeholder]=\"control.placeholder\" class=\"form-control form-control-sm checking-field\"\n                [formControlName]=\"control.name\" />\n            </div>\n            <span class=\"help-block\" *ngIf=\"filterForm.get(control.name).touched\">\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}} is required</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of {{control.controlType.minLength}} characters</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of {{control.controlType.maxLength}} characters</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('min')\">Should be greater than {{control.controlType.min}}</span>\n              <span class=\"text-danger\" *ngIf=\"filterForm.get(control.name).hasError('max')\">Should be less than {{control.controlType.max}}</span>\n            </span>\n          </div>\n</div>\n\n<div class=\"row\" *ngIf=\"enableDefaultTableHeader\">\n          <div class=\"col-md-3 mb-3\">\n            <label for=\"from\">From: </label>\n            <div class=\"input-group\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-calendar-o\"></i>\n                </span>\n              </div>\n                <input \n                type=\"text\" \n                class=\"form-control form-control-sm checking-field\" \n                id=\"inputTravelDate\" \n                formControlName=\"from\" \n                placeholder=\"From...\"\n                #dpfrom=\"bsDatepicker\"\n                bsDatepicker\n                [outsideClick]=\"false\"\n                [bsConfig]=\"{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }\"\n                maxlength=\"30\"\n                required\n                readonly\n                />\n                  <div class=\"input-group-append\">\n                    <button class=\"btn btn-primary\" type=\"button\" (click)=\"dpfrom.toggle()\" [attr.aria-expanded]=\"dpfrom.isOpen\"><i class=\"fa fa-th\"></i></button>\n                  </div>\n            </div>\n            <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n                <span class=\"text-danger\" *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 30 characters</span>\n            </span>\n          </div>\n          <div class=\"col-md-3 mb-3\">\n            <label for=\"from\">To: </label>\n            <div class=\"input-group\">\n              <div class=\"input-group-append\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-calendar-o\"></i>\n                </span>\n              </div>\n                <input \n                type=\"text\" \n                class=\"form-control form-control-sm checking-field\" \n                id=\"inputTravelDate\" \n                formControlName=\"to\" \n                placeholder=\"To...\"\n                #dpto=\"bsDatepicker\"\n                bsDatepicker\n                [outsideClick]=\"false\"\n                [bsConfig]=\"{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }\"\n                maxlength=\"30\"\n                required\n                readonly\n                />\n                  <div class=\"input-group-append\">\n                    <button class=\"btn btn-primary\" type=\"button\" (click)=\"dpto.toggle()\" [attr.aria-expanded]=\"dpto.isOpen\"><i class=\"fa fa-th\"></i></button>\n                  </div>  \n            </div>\n            <span class=\"help-block\" *ngIf=\"filterForm.get('to').touched\">\n                <span class=\"text-danger\" *ngIf=\"filterForm.get('to').hasError('maxlength')\">Maximum of 30 characters</span>\n            </span>\n          </div>\n          <div class=\"col-md-3 mb-3\">\n            <label for=\"search\">Search:</label>\n            <div class=\"input-group\">\n              <div class=\"input-group-prepend\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-search\"></i>\n                </span>\n              </div>\n              <input formControlName=\"needle\" class=\"form-control form-control-sm checking-field\" type=\"text\"\n                placeholder=\"Search...\" (keyup)=\"updateFilter($event)\" />\n            </div>\n          </div>\n          <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n              <span class=\"text-danger\" *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 200 characters</span>\n          </span>\n</div>\n\n<div class=\"row\">\n\t<div class=\"col-md-12\">\n            <div class=\"pull-right inline-buttons\">\n              <button class=\"btn btn-warning btn-sm\" type=\"reset\">\n                <i class=\"fa fa-repeat\" aria-hidden=\"true\"></i>\n                Reset\n              </button>\n              <button class=\"btn btn-success btn-sm pull-right\" type=\"submit\">\n                <i class=\"fa fa-filter\" aria-hidden=\"true\"></i>\n                Filter\n              </button>\n            </div>\n\t</div>\n</div>\n      \n</form>\n</div>\n</div>\n  \n  <ngx-datatable \n    #table \n    [summaryRow]=\"enableSummary\"\n    [summaryPosition]=\"summaryPosition\"\n    [summaryHeight]=\"summaryHeight\"\n    class=\"bootstrap\" \n    [headerHeight]=\"50\" \n    [columnMode]=\"'force'\" \n    [footerHeight]=\"50\" \n    [rowHeight]=\"'auto'\"\n    [rows]=\"page.content\" \n    [selected]=\"selected\" \n    [selectionType]=\"'checkbox'\" \n    (activate)=\"onActivate($event)\" \n    (select)='onSelect($event)'\n    [count]=\"page.totalElements\" \n    [offset]=\"page.number\" \n    [externalPaging]=\"true\" \n    [limit]=\"page.size\" \n    (page)=\"loadPage($event, null)\">\n    <ngx-datatable-column [summaryFunc]=\"summaryFunc\" [width]=\"30\" [sortable]=\"false\" [canAutoResize]=\"false\" [draggable]=\"true\" [resizeable]=\"false\" [headerCheckboxable]=\"true\"\n      [checkboxable]=\"true\" *ngIf=\"enableCheckbox\">\n    </ngx-datatable-column>\n    <ngx-datatable-column [summaryFunc]=\"(c.summaryFunc) ? c.summaryFunc : summaryFunc\" [canAutoResize]=\"(c.canAutoResize) ? c.canAutoResize : true\" [name]=\"c.columnName\" [width]=\"c.width\"\n      [sortable]=\"(c.sortable) ? c.sortable : true\" [draggable]=\"(c.draggable) ? c.draggable : true\" [resizeable]=\"(c.resizeable) ? c.resizeable : true\"\n      *ngFor=\"let c of columns\">\n      <ng-template let-column=\"column\" ngx-datatable-header-template>\n        <strong>{{c.columnName}}</strong>\n      </ng-template>\n      <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n        <span>\n            {{(c.isDateColumn)? (getFieldValue(row, c.fieldName) | date:'medium') : getFieldValue(row, c.fieldName)}}\n        </span>\n      </ng-template>\n    </ngx-datatable-column>\n    <ngx-datatable-column [summaryFunc]=\"summaryFunc\" [name]=\"moreActions.name\" *ngIf=\"moreActions\" [sortable]=\"false\" [canAutoResize]=\"false\">\n      <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n        <span>\n          <div class=\"input-group-prepend\">\n            <button class=\"btn btn-sm btn-outline-secondary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\n              aria-expanded=\"false\">\n              <i class=\"fa fa-list-ul\" aria-hidden=\"true\"></i>\n            </button>\n            <div class=\"dropdown-menu\">\n              <a class=\"dropdown-item\" *ngFor=\"let action of moreActions.actions\" href=\"javascript:;\" (click)=\"onActionClick({id: row[moreActions.idFieldName], actionName: action.actionName, actionRow: row})\">{{action.actionName}}</a>\n              <!-- <a class=\"dropdown-item\" href=\"#\">Another action</a>\n                            <a class=\"dropdown-item\" href=\"#\">Something else here</a>\n                            <div role=\"separator\" class=\"dropdown-divider\"></div>\n                            <a class=\"dropdown-item\" href=\"#\">Separated link</a> -->\n            </div>\n          </div>\n        </span>\n      </ng-template>\n    </ngx-datatable-column>\n    <!-- <ngx-datatable-column name=\"Description\">\n              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n                <span>\n                  {{value}}\n                </span>\n              </ng-template>\n            </ngx-datatable-column>\n            <ngx-datatable-column name=\"Actions\">\n              <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n                <span>\n                  {{value}}\n                </span>\n              </ng-template>\n            </ngx-datatable-column> -->\n  </ngx-datatable>\n",
                    styles: [""]
                },] },
    ];
    MlkDatatableComponent.ctorParameters = function () { return [
        { type: StewardClientService }
    ]; };
    MlkDatatableComponent.propDecorators = {
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
export { MlkDatatableComponent };
if (false) {
    /** @type {?} */
    MlkDatatableComponent.prototype.columns;
    /** @type {?} */
    MlkDatatableComponent.prototype.enableCheckbox;
    /** @type {?} */
    MlkDatatableComponent.prototype.endpoint;
    /** @type {?} */
    MlkDatatableComponent.prototype.enableFilterHeader;
    /** @type {?} */
    MlkDatatableComponent.prototype.enableDefaultTableHeader;
    /** @type {?} */
    MlkDatatableComponent.prototype.enableSummary;
    /** @type {?} */
    MlkDatatableComponent.prototype.summaryPosition;
    /** @type {?} */
    MlkDatatableComponent.prototype.summaryHeight;
    /** @type {?} */
    MlkDatatableComponent.prototype.moreActions;
    /** @type {?} */
    MlkDatatableComponent.prototype.onActionsEvent;
    /** @type {?} */
    MlkDatatableComponent.prototype.filterComponents;
    /** @type {?} */
    MlkDatatableComponent.prototype.params;
    /** @type {?} */
    MlkDatatableComponent.prototype.page;
    /** @type {?} */
    MlkDatatableComponent.prototype.selected;
    /** @type {?} */
    MlkDatatableComponent.prototype.table;
    /** @type {?} */
    MlkDatatableComponent.prototype.filter;
    /** @type {?} */
    MlkDatatableComponent.prototype.filterForm;
    /** @type {?} */
    MlkDatatableComponent.prototype.emptySummaryFunc;
    /** @type {?} */
    MlkDatatableComponent.prototype.sterwardService;
    /* Skipping unhandled member: ;*/
}
/**
 * Used to define datatable columns with attributes (columnName, fieldName, width, sortable, canAutoResize,
 * draggable, resizable, isDateColumn, summaryFunc)
 * @record
 */
export function MlkDataTableColumn() { }
if (false) {
    /**
     * column title
     * @type {?}
     */
    MlkDataTableColumn.prototype.columnName;
    /**
     * Server side response field corresponding to the column i.e fullName may correspond to Name column
     * @type {?}
     */
    MlkDataTableColumn.prototype.fieldName;
    /**
     * Width of the column
     * @type {?|undefined}
     */
    MlkDataTableColumn.prototype.width;
    /**
     * Enable sorting in a column
     * @type {?|undefined}
     */
    MlkDataTableColumn.prototype.sortable;
    /**
     * Makes a column resizable
     * @type {?|undefined}
     */
    MlkDataTableColumn.prototype.canAutoResize;
    /**
     * Enables a column to be draggable
     * @type {?|undefined}
     */
    MlkDataTableColumn.prototype.draggable;
    /**
     * Makes a column resizable
     * @type {?|undefined}
     */
    MlkDataTableColumn.prototype.resizeable;
    /**
     * Used to enable formating timestamp to string date
     * @type {?|undefined}
     */
    MlkDataTableColumn.prototype.isDateColumn;
    /**
     * Function to call at the summary row
     * @type {?|undefined}
     */
    MlkDataTableColumn.prototype.summaryFunc;
}
/**
 * Used to display more actions column and the end of the table
 */
var /**
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
 * Used to display more actions column and the end of the table
 */
export { MlkMoreActions };
if (false) {
    /**
     * Action Column name e.g. More Actions
     * @type {?}
     */
    MlkMoreActions.prototype.name;
    /**
     * Field name id from the server response e.g userId
     * @type {?}
     */
    MlkMoreActions.prototype.idFieldName;
    /**
     * Actions e.g. Edit, Delete
     * @type {?}
     */
    MlkMoreActions.prototype.actions;
}
/**
 * @record
 */
export function MlkMoreActionData() { }
if (false) {
    /**
     * Never mind this field it will be used by the library
     * @type {?|undefined}
     */
    MlkMoreActionData.prototype.id;
    /**
     * Action name e.g. Edit, Delete
     * @type {?}
     */
    MlkMoreActionData.prototype.actionName;
    /**
     * Action row : the clicked row
     * @type {?|undefined}
     */
    MlkMoreActionData.prototype.actionRow;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWxrLWRhdGF0YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdGV3YXJkLWNsaWVudC8iLCJzb3VyY2VzIjpbImxpYi9tbGstZGF0YXRhYmxlL21say1kYXRhdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFVLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pELE9BQU8sRUFBcUIsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUUvRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBR3pDO0lBbU9FLCtCQUFvQixlQUFzRTtRQUF0RSxvQkFBZSxHQUFmLGVBQWUsQ0FBdUQ7UUFwQmpGLFlBQU8sR0FBOEIsRUFBRSxDQUFDO1FBQ3hDLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBRWhDLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUNwQyw2QkFBd0IsR0FBWSxLQUFLLENBQUM7UUFDMUMsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0Isb0JBQWUsR0FBVyxVQUFVLENBQUM7UUFDckMsa0JBQWEsR0FBVyxRQUFRLENBQUM7UUFFaEMsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQTtRQUN2RCxxQkFBZ0IsR0FBa0MsRUFBRSxDQUFDO1FBRTlELFNBQUksR0FBYyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzdCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFFZCxXQUFNLEdBQVcsRUFBRSxDQUFDO0lBTXBCLENBQUM7SUFIRCxDQUFDO0lBS0Q7O09BRUc7Ozs7O0lBQ0gsd0NBQVE7Ozs7SUFBUjs7WUFDTSxLQUFLLEdBQUcsRUFBRTtRQUNkLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJOztnQkFDNUIsVUFBVSxHQUFlLEVBQUU7WUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7WUFFRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxZQUFZLFFBQVEsSUFBSSxJQUFJLENBQUMsV0FBVyxZQUFZLFdBQVcsQ0FBQyxDQUFBLENBQUM7Z0JBQ2xGLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEUsQ0FBQztZQUVELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxXQUFXLFlBQVksUUFBUSxDQUFDLENBQUEsQ0FBQztnQkFDdkMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4RCxDQUFDO1lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUE7UUFDcEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxzQkFBc0I7UUFDdEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUQsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCw2Q0FBYTs7Ozs7SUFBYixVQUFjLEtBQXdCO1FBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsd0NBQVE7Ozs7OztJQUFSLFVBQVMsUUFBUSxFQUFFLE9BQU87UUFBMUIsaUJBdUJDO1FBdEJDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDO1FBQ1QsQ0FBQzs7WUFDRyxPQUF5QjtRQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1osT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNwQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBQ0QsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBRSxHQUFHO2dCQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsUUFBUTtZQUNqRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUM1QixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCx3Q0FBUTs7Ozs7SUFBUixVQUFTLEtBQUs7SUFFZCxDQUFDOzs7OztJQUVELDBDQUFVOzs7O0lBQVYsVUFBVyxLQUFLO0lBRWhCLENBQUM7Ozs7O0lBRUQsNENBQVk7Ozs7SUFBWixVQUFhLEtBQUs7SUFFbEIsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCw2Q0FBYTs7Ozs7O0lBQWIsVUFBYyxJQUFJOzs7WUFFWixDQUFDLEdBQXFCLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RSxnQkFBZ0I7UUFDaEIsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FDeEMsQ0FBQztZQUNDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakIsc0RBQXNEO1FBQ3hELENBQUM7UUFDRCxJQUFJLENBQ0osQ0FBQzs7O2dCQUVLLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDcEQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUNELEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQ3RDLENBQUM7WUFDQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2YsMkJBQTJCO1lBQzNCLDRDQUE0QztZQUM1QyxxRUFBcUU7UUFDdkUsQ0FBQztRQUNELElBQUksQ0FDSixDQUFDOzs7Z0JBRUssRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNsRCxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCx1Q0FBTzs7Ozs7SUFBUCxVQUFRLE9BQVk7UUFDbEIsTUFBTSxDQUFDLE9BQU8sWUFBWSxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsd0NBQVE7Ozs7O0lBQVIsVUFBUyxPQUFZO1FBQ25CLE1BQU0sQ0FBQyxPQUFPLFlBQVksU0FBUyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsMENBQVU7Ozs7O0lBQVYsVUFBVyxPQUFZO1FBQ3JCLE1BQU0sQ0FBQyxPQUFPLFlBQVksV0FBVyxDQUFDO0lBQ3hDLENBQUM7Ozs7O0lBRUQsMkNBQVc7Ozs7SUFBWCxVQUFZLElBQVM7UUFDbkIsTUFBTSxDQUFBLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxnREFBZ0I7Ozs7O0lBQWhCLFVBQWlCLElBQUk7O1lBQ2YsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7O1lBRXpCLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUU7UUFDNUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7O1lBRTNDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFO1FBQ25DLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRXZDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3hDLENBQUM7Ozs7OztJQUVELDZDQUFhOzs7OztJQUFiLFVBQWMsSUFBWSxFQUFFLEtBQVU7O1lBQ2hDLENBQUMsR0FBa0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7O1lBQ25DLElBQUksUUFBTyxLQUFLLFlBQUwsS0FBSyw2QkFBWSxDQUFDLEtBQUM7O1lBQzlCLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7UUFDM0MsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gsOENBQWM7Ozs7OztJQUFkLFVBQWUsSUFBUyxFQUFFLElBQW1CO1FBQTdDLGlCQWNDO1FBYkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxZQUFZLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQztZQUN2RCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixDQUFDOztZQUNHLEtBQUssR0FBRyxJQUFJO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztZQUM1QixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RCxLQUFLLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7Z0JBQzFCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUVmLENBQUM7O2dCQXBhRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLGl6VUF5TVg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNiOzs7Z0JBbE5RLG9CQUFvQjs7OzBCQW9OMUIsS0FBSztpQ0FDTCxLQUFLOzJCQUNMLEtBQUs7cUNBQ0wsS0FBSzsyQ0FDTCxLQUFLO2dDQUNMLEtBQUs7a0NBQ0wsS0FBSztnQ0FDTCxLQUFLOzhCQUNMLEtBQUs7aUNBQ0wsTUFBTTttQ0FDTixLQUFLO3lCQUNMLEtBQUs7d0JBR0wsU0FBUyxTQUFDLGtCQUFrQjs7SUF5TS9CLDRCQUFDO0NBQUEsQUF0YUQsSUFzYUM7U0F4TlkscUJBQXFCOzs7SUFDaEMsd0NBQWlEOztJQUNqRCwrQ0FBeUM7O0lBQ3pDLHlDQUEwQjs7SUFDMUIsbURBQTZDOztJQUM3Qyx5REFBbUQ7O0lBQ25ELDhDQUF3Qzs7SUFDeEMsZ0RBQThDOztJQUM5Qyw4Q0FBMEM7O0lBQzFDLDRDQUFxQzs7SUFDckMsK0NBQWdFOztJQUNoRSxpREFBOEQ7O0lBQzlELHVDQUFrQzs7SUFDbEMscUNBQTZCOztJQUM3Qix5Q0FBYzs7SUFDZCxzQ0FBeUQ7O0lBQ3pELHVDQUFvQjs7SUFDcEIsMkNBQXNCOztJQUN0QixpREFBNkI7O0lBR2pCLGdEQUE4RTs7Ozs7Ozs7QUF3TTVGLHdDQXFDQzs7Ozs7O0lBakNDLHdDQUFtQjs7Ozs7SUFJbkIsdUNBQWtCOzs7OztJQUlsQixtQ0FBZTs7Ozs7SUFJZixzQ0FBbUI7Ozs7O0lBSW5CLDJDQUF3Qjs7Ozs7SUFJeEIsdUNBQW9COzs7OztJQUlwQix3Q0FBcUI7Ozs7O0lBSXJCLDBDQUF1Qjs7Ozs7SUFJdkIseUNBQWtDOzs7OztBQU1wQzs7OztJQWNFLHdCQUFZLE9BQWlDLEVBQUUsRUFBVyxFQUFFLElBQWE7UUFiekU7O1dBRUc7UUFDSCxTQUFJLEdBQVcsU0FBUyxDQUFDO1FBQ3pCOztXQUVHO1FBQ0gsZ0JBQVcsR0FBVyxJQUFJLENBQUM7UUFPekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVILHFCQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQzs7Ozs7Ozs7OztJQWhCQyw4QkFBeUI7Ozs7O0lBSXpCLHFDQUEyQjs7Ozs7SUFJM0IsaUNBQWtDOzs7OztBQVVwQyx1Q0FjQzs7Ozs7O0lBVkMsK0JBQVM7Ozs7O0lBSVQsdUNBQWdCOzs7OztJQUtoQixzQ0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nRm9ybSwgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9wYWdlJztcbmltcG9ydCB7IE1sa0R5bmFtaWNDb250cm9sLCBNbGtJbnB1dCwgTWxrVGV4dGFyZWEsIE1sa1NlbGVjdCB9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL21say1keW5hbWljLWNvbnRyb2wnO1xuaW1wb3J0IHsgUmVzcG9uc2VXcmFwcGVyIH0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlcic7XG5pbXBvcnQgeyBTdGV3YXJkQ2xpZW50U2VydmljZSB9IGZyb20gJy4uL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YXRhYmxlQ29tcG9uZW50IH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xuaW1wb3J0IHsgUXVldWUgfSBmcm9tICdxdWV1ZS10eXBlc2NyaXB0Jztcbi8vY29uc3QgeyBRdWV1ZSB9ID0gcmVxdWlyZSgncXVldWUtdHlwZXNjcmlwdCcpO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzdHctbWxrLWRhdGF0YWJsZScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNhcmQgY2FyZC1vdXRsaW5lLWRlZmF1bHRcIiAqbmdJZj1cImVuYWJsZUZpbHRlckhlYWRlclwiPlxuPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuPGZvcm0gKG5nU3VibWl0KT1cInByb2Nlc3NGaWx0ZXIoZmlsdGVyRm9ybSlcIiBbZm9ybUdyb3VwXT1cImZpbHRlckZvcm1cIj5cblxuPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyAgbWItM1wiICpuZ0Zvcj1cImxldCBjb250cm9sIG9mIGZpbHRlckNvbXBvbmVudHNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmcm9tXCI+e3tjb250cm9sLmxhYmVsfX06IDwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCAgZm9ybS1pY29uLWRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgIDxpIFtjbGFzc109XCJjb250cm9sLmljb25cIj48L2k+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgXG4gICAgICAgICAgICAgIDxzZWxlY3QgKm5nSWY9XCJpc1NlbGVjdChjb250cm9sLmNvbnRyb2xUeXBlKVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkIHNlbGVjdGVkPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgbyBvZiBjb250cm9sLmNvbnRyb2xUeXBlLm9wdGlvbnNcIj57e28udGV4dH19PC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICBcbiAgICAgICAgICAgICAgPHRleHRhcmVhICpuZ0lmPVwiaXNUZXh0QXJlYShjb250cm9sLmNvbnRyb2xUeXBlKVwiIFtjb2xzXT1cImNvbnRyb2wuY29udHJvbFR5cGUuY29sc1wiIFtyb3dzXT1cImNvbnRyb2wuY29udHJvbFR5cGUucm93c1wiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXG4gICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiPjwvdGV4dGFyZWE+XG4gIFxuICAgICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJpc0lucHV0KGNvbnRyb2wuY29udHJvbFR5cGUpXCIgW3R5cGVdPVwiY29udHJvbC5jb250cm9sVHlwZS50eXBlXCIgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxuICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLnRvdWNoZWRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcigncmVxdWlyZWQnKVwiPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19IGlzIHJlcXVpcmVkPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtaW5sZW5ndGgnKVwiPk1pbmltdW0gb2Yge3tjb250cm9sLmNvbnRyb2xUeXBlLm1pbkxlbmd0aH19IGNoYXJhY3RlcnM8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiB7e2NvbnRyb2wuY29udHJvbFR5cGUubWF4TGVuZ3RofX0gY2hhcmFjdGVyczwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWluJylcIj5TaG91bGQgYmUgZ3JlYXRlciB0aGFuIHt7Y29udHJvbC5jb250cm9sVHlwZS5taW59fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWF4JylcIj5TaG91bGQgYmUgbGVzcyB0aGFuIHt7Y29udHJvbC5jb250cm9sVHlwZS5tYXh9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwicm93XCIgKm5nSWY9XCJlbmFibGVEZWZhdWx0VGFibGVIZWFkZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgbWItM1wiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZyb21cIj5Gcm9tOiA8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgZm9ybS1pY29uLWRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXItb1wiPjwvaT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiIFxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiIFxuICAgICAgICAgICAgICAgIGlkPVwiaW5wdXRUcmF2ZWxEYXRlXCIgXG4gICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwiZnJvbVwiIFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRnJvbS4uLlwiXG4gICAgICAgICAgICAgICAgI2RwZnJvbT1cImJzRGF0ZXBpY2tlclwiXG4gICAgICAgICAgICAgICAgYnNEYXRlcGlja2VyXG4gICAgICAgICAgICAgICAgW291dHNpZGVDbGlja109XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgW2JzQ29uZmlnXT1cInsgZGF0ZUlucHV0Rm9ybWF0OiAnREQtTU0tWVlZWScsIGNvbnRhaW5lckNsYXNzOiAndGhlbWUtcmVkJyB9XCJcbiAgICAgICAgICAgICAgICBtYXhsZW5ndGg9XCIzMFwiXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImRwZnJvbS50b2dnbGUoKVwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiZHBmcm9tLmlzT3BlblwiPjxpIGNsYXNzPVwiZmEgZmEtdGhcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLnRvdWNoZWRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2YgMzAgY2hhcmFjdGVyczwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgbWItM1wiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImZyb21cIj5UbzogPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IGZvcm0taWNvbi1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNhbGVuZGFyLW9cIj48L2k+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIiBcbiAgICAgICAgICAgICAgICBpZD1cImlucHV0VHJhdmVsRGF0ZVwiIFxuICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInRvXCIgXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUby4uLlwiXG4gICAgICAgICAgICAgICAgI2RwdG89XCJic0RhdGVwaWNrZXJcIlxuICAgICAgICAgICAgICAgIGJzRGF0ZXBpY2tlclxuICAgICAgICAgICAgICAgIFtvdXRzaWRlQ2xpY2tdPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgIFtic0NvbmZpZ109XCJ7IGRhdGVJbnB1dEZvcm1hdDogJ0RELU1NLVlZWVknLCBjb250YWluZXJDbGFzczogJ3RoZW1lLXJlZCcgfVwiXG4gICAgICAgICAgICAgICAgbWF4bGVuZ3RoPVwiMzBcIlxuICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJkcHRvLnRvZ2dsZSgpXCIgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJkcHRvLmlzT3BlblwiPjxpIGNsYXNzPVwiZmEgZmEtdGhcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj4gIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCd0bycpLnRvdWNoZWRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgndG8nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDMwIGNoYXJhY3RlcnM8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIG1iLTNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJzZWFyY2hcIj5TZWFyY2g6PC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtcHJlcGVuZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCBmb3JtLWljb24tZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1zZWFyY2hcIj48L2k+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGlucHV0IGZvcm1Db250cm9sTmFtZT1cIm5lZWRsZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaC4uLlwiIChrZXl1cCk9XCJ1cGRhdGVGaWx0ZXIoJGV2ZW50KVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykudG91Y2hlZFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2YgMjAwIGNoYXJhY3RlcnM8L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJyb3dcIj5cblx0PGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInB1bGwtcmlnaHQgaW5saW5lLWJ1dHRvbnNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4td2FybmluZyBidG4tc21cIiB0eXBlPVwicmVzZXRcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXJlcGVhdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICBSZXNldFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG4tc20gcHVsbC1yaWdodFwiIHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWZpbHRlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICBGaWx0ZXJcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblx0PC9kaXY+XG48L2Rpdj5cbiAgICAgIFxuPC9mb3JtPlxuPC9kaXY+XG48L2Rpdj5cbiAgXG4gIDxuZ3gtZGF0YXRhYmxlIFxuICAgICN0YWJsZSBcbiAgICBbc3VtbWFyeVJvd109XCJlbmFibGVTdW1tYXJ5XCJcbiAgICBbc3VtbWFyeVBvc2l0aW9uXT1cInN1bW1hcnlQb3NpdGlvblwiXG4gICAgW3N1bW1hcnlIZWlnaHRdPVwic3VtbWFyeUhlaWdodFwiXG4gICAgY2xhc3M9XCJib290c3RyYXBcIiBcbiAgICBbaGVhZGVySGVpZ2h0XT1cIjUwXCIgXG4gICAgW2NvbHVtbk1vZGVdPVwiJ2ZvcmNlJ1wiIFxuICAgIFtmb290ZXJIZWlnaHRdPVwiNTBcIiBcbiAgICBbcm93SGVpZ2h0XT1cIidhdXRvJ1wiXG4gICAgW3Jvd3NdPVwicGFnZS5jb250ZW50XCIgXG4gICAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCIgXG4gICAgW3NlbGVjdGlvblR5cGVdPVwiJ2NoZWNrYm94J1wiIFxuICAgIChhY3RpdmF0ZSk9XCJvbkFjdGl2YXRlKCRldmVudClcIiBcbiAgICAoc2VsZWN0KT0nb25TZWxlY3QoJGV2ZW50KSdcbiAgICBbY291bnRdPVwicGFnZS50b3RhbEVsZW1lbnRzXCIgXG4gICAgW29mZnNldF09XCJwYWdlLm51bWJlclwiIFxuICAgIFtleHRlcm5hbFBhZ2luZ109XCJ0cnVlXCIgXG4gICAgW2xpbWl0XT1cInBhZ2Uuc2l6ZVwiIFxuICAgIChwYWdlKT1cImxvYWRQYWdlKCRldmVudCwgbnVsbClcIj5cbiAgICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gW3N1bW1hcnlGdW5jXT1cInN1bW1hcnlGdW5jXCIgW3dpZHRoXT1cIjMwXCIgW3NvcnRhYmxlXT1cImZhbHNlXCIgW2NhbkF1dG9SZXNpemVdPVwiZmFsc2VcIiBbZHJhZ2dhYmxlXT1cInRydWVcIiBbcmVzaXplYWJsZV09XCJmYWxzZVwiIFtoZWFkZXJDaGVja2JveGFibGVdPVwidHJ1ZVwiXG4gICAgICBbY2hlY2tib3hhYmxlXT1cInRydWVcIiAqbmdJZj1cImVuYWJsZUNoZWNrYm94XCI+XG4gICAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cbiAgICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gW3N1bW1hcnlGdW5jXT1cIihjLnN1bW1hcnlGdW5jKSA/IGMuc3VtbWFyeUZ1bmMgOiBzdW1tYXJ5RnVuY1wiIFtjYW5BdXRvUmVzaXplXT1cIihjLmNhbkF1dG9SZXNpemUpID8gYy5jYW5BdXRvUmVzaXplIDogdHJ1ZVwiIFtuYW1lXT1cImMuY29sdW1uTmFtZVwiIFt3aWR0aF09XCJjLndpZHRoXCJcbiAgICAgIFtzb3J0YWJsZV09XCIoYy5zb3J0YWJsZSkgPyBjLnNvcnRhYmxlIDogdHJ1ZVwiIFtkcmFnZ2FibGVdPVwiKGMuZHJhZ2dhYmxlKSA/IGMuZHJhZ2dhYmxlIDogdHJ1ZVwiIFtyZXNpemVhYmxlXT1cIihjLnJlc2l6ZWFibGUpID8gYy5yZXNpemVhYmxlIDogdHJ1ZVwiXG4gICAgICAqbmdGb3I9XCJsZXQgYyBvZiBjb2x1bW5zXCI+XG4gICAgICA8bmctdGVtcGxhdGUgbGV0LWNvbHVtbj1cImNvbHVtblwiIG5neC1kYXRhdGFibGUtaGVhZGVyLXRlbXBsYXRlPlxuICAgICAgICA8c3Ryb25nPnt7Yy5jb2x1bW5OYW1lfX08L3N0cm9uZz5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXZhbHVlPVwidmFsdWVcIiBsZXQtcm93PVwicm93XCI+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgICAge3soYy5pc0RhdGVDb2x1bW4pPyAoZ2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKSB8IGRhdGU6J21lZGl1bScpIDogZ2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKX19XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cbiAgICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gW3N1bW1hcnlGdW5jXT1cInN1bW1hcnlGdW5jXCIgW25hbWVdPVwibW9yZUFjdGlvbnMubmFtZVwiICpuZ0lmPVwibW9yZUFjdGlvbnNcIiBbc29ydGFibGVdPVwiZmFsc2VcIiBbY2FuQXV0b1Jlc2l6ZV09XCJmYWxzZVwiPlxuICAgICAgPG5nLXRlbXBsYXRlIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZSBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiIGxldC12YWx1ZT1cInZhbHVlXCIgbGV0LXJvdz1cInJvd1wiPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtcHJlcGVuZFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc20gYnRuLW91dGxpbmUtc2Vjb25kYXJ5IGRyb3Bkb3duLXRvZ2dsZVwiIHR5cGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxuICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1saXN0LXVsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPlxuICAgICAgICAgICAgICA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIG1vcmVBY3Rpb25zLmFjdGlvbnNcIiBocmVmPVwiamF2YXNjcmlwdDo7XCIgKGNsaWNrKT1cIm9uQWN0aW9uQ2xpY2soe2lkOiByb3dbbW9yZUFjdGlvbnMuaWRGaWVsZE5hbWVdLCBhY3Rpb25OYW1lOiBhY3Rpb24uYWN0aW9uTmFtZSwgYWN0aW9uUm93OiByb3d9KVwiPnt7YWN0aW9uLmFjdGlvbk5hbWV9fTwvYT5cbiAgICAgICAgICAgICAgPCEtLSA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiI1wiPkFub3RoZXIgYWN0aW9uPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCIjXCI+U29tZXRoaW5nIGVsc2UgaGVyZTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJvbGU9XCJzZXBhcmF0b3JcIiBjbGFzcz1cImRyb3Bkb3duLWRpdmlkZXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiI1wiPlNlcGFyYXRlZCBsaW5rPC9hPiAtLT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XG4gICAgPCEtLSA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gbmFtZT1cIkRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtdmFsdWU9XCJ2YWx1ZVwiIGxldC1yb3c9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgIHt7dmFsdWV9fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XG4gICAgICAgICAgICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gbmFtZT1cIkFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZSBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiIGxldC12YWx1ZT1cInZhbHVlXCIgbGV0LXJvdz1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAge3t2YWx1ZX19XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj4gLS0+XG4gIDwvbmd4LWRhdGF0YWJsZT5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBNbGtEYXRhdGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBjb2x1bW5zOiBBcnJheTxNbGtEYXRhVGFibGVDb2x1bW4+ID0gW107XG4gIEBJbnB1dCgpIGVuYWJsZUNoZWNrYm94OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGVuZHBvaW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGVuYWJsZUZpbHRlckhlYWRlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBlbmFibGVEZWZhdWx0VGFibGVIZWFkZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZW5hYmxlU3VtbWFyeTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBzdW1tYXJ5UG9zaXRpb246IHN0cmluZyA9IFwiJ2JvdHRvbSdcIjtcbiAgQElucHV0KCkgc3VtbWFyeUhlaWdodDogc3RyaW5nID0gXCInYXV0bydcIjtcbiAgQElucHV0KCkgbW9yZUFjdGlvbnM6IE1sa01vcmVBY3Rpb25zO1xuICBAT3V0cHV0KCkgb25BY3Rpb25zRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1sa01vcmVBY3Rpb25EYXRhPigpXG4gIEBJbnB1dCgpIGZpbHRlckNvbXBvbmVudHM6IEFycmF5PE1sa0R5bmFtaWNDb250cm9sPGFueT4+ID0gW107XG4gIEBJbnB1dCgpIHBhcmFtczogTWFwPHN0cmluZywgYW55PjtcbiAgcGFnZTogUGFnZTxhbnk+ID0gbmV3IFBhZ2UoKTtcbiAgc2VsZWN0ZWQgPSBbXTtcbiAgQFZpZXdDaGlsZChEYXRhdGFibGVDb21wb25lbnQpIHRhYmxlOiBEYXRhdGFibGVDb21wb25lbnQ7XG4gIGZpbHRlcjogT2JqZWN0ID0ge307XG4gIGZpbHRlckZvcm06IEZvcm1Hcm91cDtcbiAgZW1wdHlTdW1tYXJ5RnVuYzogKCkgPT4gbnVsbDtcbiAgO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RlcndhcmRTZXJ2aWNlOiBTdGV3YXJkQ2xpZW50U2VydmljZTxSZXNwb25zZVdyYXBwZXI8UGFnZTxhbnk+PiwgYW55Pikge1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGZvcm0gY29udHJvbCBmcm9tIGZpbHRlckNvbXBvbmVudHMgYW5kIGFsc28gYXBwZW5kaW5nIGRlZmF1bHQgY29udHJvbHMgaWUuIGRhdGUgZmlsdGVyIGFuZCBzZWFyY2ggY29udHJvbHNcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIGxldCBncm91cCA9IHt9O1xuICAgIHRoaXMuZmlsdGVyQ29tcG9uZW50cy5mb3JFYWNoKGNvbXAgPT4ge1xuICAgICAgbGV0IHZhbGlkYXRvcnM6IEFycmF5PGFueT4gPSBbXTtcbiAgICAgIGlmIChjb21wLmlzUmVxdWlyZWQpIHtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xuICAgICAgfVxuXG4gICAgICBpZihjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgTWxrSW5wdXQgfHwgY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIE1sa1RleHRhcmVhKXtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluTGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWluTGVuZ3RoKSk7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heExlbmd0aChjb21wLmNvbnRyb2xUeXBlLm1heExlbmd0aCkpO1xuICAgICAgfVxuXG4gICAgICBpZihjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgTWxrSW5wdXQpe1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5tYXgoY29tcC5jb250cm9sVHlwZS5tYXgpKTtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluKGNvbXAuY29udHJvbFR5cGUubWluKSk7XG4gICAgICB9XG4gICAgICBncm91cFtjb21wLm5hbWVdID0gbmV3IEZvcm1Db250cm9sKCcnLCB2YWxpZGF0b3JzKVxuICAgIH0pO1xuICAgIC8vYWRkIGRlZmF1bHQgY29udHJvbHNcbiAgICBncm91cFsnZnJvbSddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgzMCkpO1xuICAgIGdyb3VwWyd0byddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgzMCkpO1xuICAgIGdyb3VwWyduZWVkbGUnXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMjAwKSk7XG4gICAgdGhpcy5maWx0ZXJGb3JtID0gbmV3IEZvcm1Hcm91cChncm91cCk7XG4gICAgdGhpcy5sb2FkUGFnZSh7IG9mZnNldDogMCwgbGltaXQ6IHRoaXMucGFnZS5zaXplIH0sIG51bGwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZW1pdCBjbGljayBldmVudCBvZiB0aGUgYWN0aW9uc1xuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIG9uQWN0aW9uQ2xpY2soZXZlbnQ6IE1sa01vcmVBY3Rpb25EYXRhKSB7XG4gICAgdGhpcy5vbkFjdGlvbnNFdmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzIHNlcnZlciByZXF1ZXN0IG9mIGRhdGFibGVcbiAgICogQHBhcmFtIHBhZ2VJbmZvXG4gICAqIEBwYXJhbSBmaWx0ZXJzXG4gICAqL1xuICBsb2FkUGFnZShwYWdlSW5mbywgZmlsdGVycykge1xuICAgIGlmICghdGhpcy5lbmRwb2ludCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcmVxdWVzdDogTWFwPHN0cmluZywgYW55PjtcbiAgICBpZiAoZmlsdGVycykge1xuICAgICAgcmVxdWVzdCA9IGZpbHRlcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGlmKHRoaXMucGFyYW1zKXtcbiAgICAgIHRoaXMucGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpPT57XG4gICAgICAgIHJlcXVlc3Quc2V0KGtleSwgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJlcXVlc3Quc2V0KFwicGFnZVwiLCBwYWdlSW5mby5vZmZzZXQpO1xuICAgIHJlcXVlc3Quc2V0KFwic2l6ZVwiLCBwYWdlSW5mby5saW1pdCk7XG4gICAgdGhpcy5zdGVyd2FyZFNlcnZpY2UuZ2V0KHRoaXMuZW5kcG9pbnQsIHJlcXVlc3QpLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2UuY29kZSA9PSAyMDApIHtcbiAgICAgICAgdGhpcy5wYWdlID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gaGFuZGxlIHNlbGVjdCBvcHRpb25cbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBvblNlbGVjdChldmVudCkge1xuXG4gIH1cblxuICBvbkFjdGl2YXRlKGV2ZW50KSB7XG5cbiAgfVxuXG4gIHVwZGF0ZUZpbHRlcihldmVudCkge1xuXG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBwcm9jZXNzIHRhYmxlIGZpbHRlci4gSWYgZGF0ZSBmaWx0ZXIgaXMgbm90IHByb3ZpZGUgdGhlIGZyb20gdmFsdWUgaXMgXG4gICAqIHNldCB0byAyMDE4LTAxLTAxIGFuZCB0byB2YWx1ZSBpcyBzZXQgdG8gMSB5ZWFyIGZyb20gdG9kYXlcbiAgICogQHBhcmFtIGZvcm0gXG4gICAqL1xuICBwcm9jZXNzRmlsdGVyKGZvcm0pIHtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICBsZXQgZjogTWFwPFN0cmluZywgYW55PiA9IG5ldyBNYXAoT2JqZWN0LmVudHJpZXModGhpcy5maWx0ZXJGb3JtLnZhbHVlKSk7XG4gICAgLy92YWxpZGF0ZSBkYXRlIFxuICAgIGlmKCF0aGlzLmZpbHRlckZvcm0uZ2V0KCdmcm9tJykudG91Y2hlZClcbiAgICB7Ly9pZiBmcm9tIGlzIG5vdCBwb3B1bGF0ZWQgcmVtb3ZlIGZyb20gcmVxdWVzdFxuICAgICAgZi5kZWxldGUoJ2Zyb20nKTtcbiAgICAgIC8vIHRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS5zZXRWYWx1ZSgnMjAxOC0wMS0wMScpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgLy9mLmdldCgnZnJvbScpLnNldFZhbHVlKG5ldyBEYXRlKHRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS52YWx1ZSkpO1xuICAgICAgbGV0IGZkID0gbmV3IERhdGUodGhpcy5maWx0ZXJGb3JtLmdldCgnZnJvbScpLnZhbHVlKTtcbiAgICAgIGYuc2V0KCdmcm9tJywgZmQudG9JU09TdHJpbmcoKSk7XG4gICAgfVxuICAgIGlmKCF0aGlzLmZpbHRlckZvcm0uZ2V0KCd0bycpLnRvdWNoZWQpXG4gICAgey8vaWYgdG8gaXMgbm90IHBvcHVsYXRlZCByZW1vdmUgZnJvbSByZXF1ZXN0XG4gICAgICBmLmRlbGV0ZSgndG8nKTtcbiAgICAgIC8vIGxldCB0b0RhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgLy8gdG9EYXRlLnNldERhdGUodG9EYXRlLmdldEZ1bGxZZWFyKCkgKyAxKTtcbiAgICAgIC8vIHRoaXMuZmlsdGVyRm9ybS5nZXQoJ3RvJykuc2V0VmFsdWUodGhpcy5nZXRGb3JtYXR0ZWREYXRlKHRvRGF0ZSkpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgLy9mLmdldCgndG8nKS5zZXRWYWx1ZShuZXcgRGF0ZSh0aGlzLmZpbHRlckZvcm0uZ2V0KCd0bycpLnZhbHVlKSk7XG4gICAgICBsZXQgdGQgPSBuZXcgRGF0ZSh0aGlzLmZpbHRlckZvcm0uZ2V0KCd0bycpLnZhbHVlKTtcbiAgICAgIGYuc2V0KCd0bycsIHRkLnRvSVNPU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIHRoaXMubG9hZFBhZ2UoeyBvZmZzZXQ6IHRoaXMucGFnZS5udW1iZXIsIGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZSB9LCBmKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIGlucHV0XG4gICAqIEBwYXJhbSBjb250cm9sXG4gICAqL1xuICBpc0lucHV0KGNvbnRyb2w6IGFueSkge1xuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgTWxrSW5wdXQ7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyBzZWxlY3RcbiAgICogQHBhcmFtIGNvbnRyb2xcbiAgICovXG4gIGlzU2VsZWN0KGNvbnRyb2w6IGFueSkge1xuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgTWxrU2VsZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgdGV4dGFyZWFcbiAgICovXG4gIGlzVGV4dEFyZWEoY29udHJvbDogYW55KSB7XG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBNbGtUZXh0YXJlYTtcbiAgfVxuXG4gIHN1bW1hcnlGdW5jKGNlbGw6IGFueSkge1xuICAgIHJldHVybihgYCk7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBmb3JtYXQgZGF0ZSB0byBzdHJpbmcgeXl5eS1NTS1kZFxuICAgKiBAcGFyYW0gZGF0ZVxuICAgKi9cbiAgZ2V0Rm9ybWF0dGVkRGF0ZShkYXRlKSB7XG4gICAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICB2YXIgbW9udGggPSAoMSArIGRhdGUuZ2V0TW9udGgoKSkudG9TdHJpbmcoKTtcbiAgICBtb250aCA9IG1vbnRoLmxlbmd0aCA+IDEgPyBtb250aCA6ICcwJyArIG1vbnRoO1xuXG4gICAgdmFyIGRheSA9IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCk7XG4gICAgZGF5ID0gZGF5Lmxlbmd0aCA+IDEgPyBkYXkgOiAnMCcgKyBkYXk7XG5cbiAgICByZXR1cm4geWVhciArICctJyArIG1vbnRoICsgJy0nICsgZGF5O1xuICB9XG5cbiAgZ2V0RmllbGRWYWx1ZShkYXRhOiBPYmplY3QsIGZpZWxkOiBhbnkpe1xuICAgIHZhciBrOiBBcnJheTxzdHJpbmc+ID0gZmllbGQuc3BsaXQoXCIuXCIpO1xuICAgIHZhciBrZXlzID0gbmV3IFF1ZXVlPHN0cmluZz4oLi4uayk7XG4gICAgbGV0IHZhbHVlID0gdGhpcy5nZXRPYmplY3RWYWx1ZShkYXRhLCBrZXlzKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBmaW5kIGtleSB2YWx1ZSBiYXNlZCBvbiB0aGUga2V5IHNlcXVlbmNlIHByb3ZpZGVkXG4gICAqIEBwYXJhbSBkYXRhIGV4cGVjdHMgYW4gb2JqZWN0XG4gICAqIEBwYXJhbSBrZXlzIGkuZS4gdXNlci5nZW5kZXIudHlwZS50eXBlXG4gICAqL1xuICBnZXRPYmplY3RWYWx1ZShkYXRhOiBhbnksIGtleXM6IFF1ZXVlPHN0cmluZz4pIHtcbiAgICBpZiAoKCEoZGF0YSBpbnN0YW5jZW9mIE9iamVjdCkpIHx8IChrZXlzLmxlbmd0aCA9PSAxKSkgIHtcbiAgICAgIHJldHVybiBkYXRhW2tleXMudGFpbF07XG4gICAgfVxuICAgIGxldCB2YWx1ZSA9IG51bGw7XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAoKGtleSA9PSBrZXlzLmZyb250KSAmJiAoZGF0YVtrZXldIGluc3RhbmNlb2YgT2JqZWN0KSkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZ2V0T2JqZWN0VmFsdWUoZGF0YVtrZXldLCBrZXlzKTtcbiAgICAgIH0gZWxzZSBpZihrZXkgPT0ga2V5cy50YWlsKXtcbiAgICAgICAgdmFsdWUgPSBkYXRhW2tleV07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuXG4gIH1cblxufVxuLyoqXG4gKiBVc2VkIHRvIGRlZmluZSBkYXRhdGFibGUgY29sdW1ucyB3aXRoIGF0dHJpYnV0ZXMgKGNvbHVtbk5hbWUsIGZpZWxkTmFtZSwgd2lkdGgsIHNvcnRhYmxlLCBjYW5BdXRvUmVzaXplLFxuICogZHJhZ2dhYmxlLCByZXNpemFibGUsIGlzRGF0ZUNvbHVtbiwgc3VtbWFyeUZ1bmMpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWxrRGF0YVRhYmxlQ29sdW1uIHtcbiAgLyoqXG4gICAqIGNvbHVtbiB0aXRsZVxuICAgKi9cbiAgY29sdW1uTmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogU2VydmVyIHNpZGUgcmVzcG9uc2UgZmllbGQgY29ycmVzcG9uZGluZyB0byB0aGUgY29sdW1uIGkuZSBmdWxsTmFtZSBtYXkgY29ycmVzcG9uZCB0byBOYW1lIGNvbHVtblxuICAgKi9cbiAgZmllbGROYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBXaWR0aCBvZiB0aGUgY29sdW1uXG4gICAqL1xuICB3aWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIEVuYWJsZSBzb3J0aW5nIGluIGEgY29sdW1uXG4gICAqL1xuICBzb3J0YWJsZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBNYWtlcyBhIGNvbHVtbiByZXNpemFibGVcbiAgICovXG4gIGNhbkF1dG9SZXNpemU/OiBib29sZWFuO1xuICAvKipcbiAgICogRW5hYmxlcyBhIGNvbHVtbiB0byBiZSBkcmFnZ2FibGVcbiAgICovXG4gIGRyYWdnYWJsZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBNYWtlcyBhIGNvbHVtbiByZXNpemFibGVcbiAgICovXG4gIHJlc2l6ZWFibGU/OiBib29sZWFuO1xuICAvKipcbiAgICogVXNlZCB0byBlbmFibGUgZm9ybWF0aW5nIHRpbWVzdGFtcCB0byBzdHJpbmcgZGF0ZVxuICAgKi9cbiAgaXNEYXRlQ29sdW1uPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGNhbGwgYXQgdGhlIHN1bW1hcnkgcm93XG4gICAqL1xuICBzdW1tYXJ5RnVuYz86IChhbnk6IGFueVtdKSA9PiBhbnk7XG59XG5cbi8qKlxuICogVXNlZCB0byBkaXNwbGF5IG1vcmUgYWN0aW9ucyBjb2x1bW4gYW5kIHRoZSBlbmQgb2YgdGhlIHRhYmxlXG4gKi9cbmV4cG9ydCBjbGFzcyBNbGtNb3JlQWN0aW9ucyB7XG4gIC8qKlxuICAgKiBBY3Rpb24gQ29sdW1uIG5hbWUgZS5nLiBNb3JlIEFjdGlvbnNcbiAgICovXG4gIG5hbWU6IHN0cmluZyA9IFwiQWN0aW9uc1wiO1xuICAvKipcbiAgICogRmllbGQgbmFtZSBpZCBmcm9tIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgZS5nIHVzZXJJZFxuICAgKi9cbiAgaWRGaWVsZE5hbWU6IHN0cmluZyA9IFwiaWRcIjtcbiAgLyoqXG4gICAqIEFjdGlvbnMgZS5nLiBFZGl0LCBEZWxldGVcbiAgICovXG4gIGFjdGlvbnM6IEFycmF5PE1sa01vcmVBY3Rpb25EYXRhPjtcblxuICBjb25zdHJ1Y3RvcihhY3Rpb25zOiBBcnJheTxNbGtNb3JlQWN0aW9uRGF0YT4sIGlkPzogc3RyaW5nLCBuYW1lPzogc3RyaW5nKSB7XG4gICAgdGhpcy5hY3Rpb25zID0gYWN0aW9ucztcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaWRGaWVsZE5hbWUgPSBpZDtcbiAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWxrTW9yZUFjdGlvbkRhdGEge1xuICAvKipcbiAgICogTmV2ZXIgbWluZCB0aGlzIGZpZWxkIGl0IHdpbGwgYmUgdXNlZCBieSB0aGUgbGlicmFyeVxuICAgKi9cbiAgaWQ/OiBhbnk7XG4gIC8qKlxuICAgKiBBY3Rpb24gbmFtZSBlLmcuIEVkaXQsIERlbGV0ZVxuICAgKi9cbiAgYWN0aW9uTmFtZTogYW55O1xuXG4gIC8qKlxuICAgKiBBY3Rpb24gcm93IDogdGhlIGNsaWNrZWQgcm93XG4gICAqL1xuICBhY3Rpb25Sb3c/OiBhbnk7XG59Il19