/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Page } from '../entities/wrappers/page';
import { MlkInput, MlkSelect, MlkTextarea } from '../entities/wrappers/mlk-dynamic-control';
import { StewardClientService } from '../steward-client.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Queue } from 'queue-typescript';
import { DatePipe } from '@angular/common';
import { ExportAsService } from 'ngx-export-as';
// const { Queue } = require('queue-typescript');
var MlkDatatableComponent = /** @class */ (function () {
    function MlkDatatableComponent(sterwardService, datePipe, exportAsService) {
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
    MlkDatatableComponent.prototype.exportAs = /**
     * @param {?} type
     * @param {?=} opt
     * @return {?}
     */
    function (type, opt) {
        this.config.type = type;
        if (opt) {
            this.config.options.jsPDF.orientation = opt;
        }
        this.exportAsService.save(this.config, 'DataExport');
        // this.exportAsService.get(this.config).subscribe(content => {
        //   console.log(content);
        // });
    };
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
        (_b = this.selected).push.apply(_b, tslib_1.__spread(selected));
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
                    template: "<div class=\"card card-outline-default\" *ngIf=\"enableFilterHeader\">\n  <div class=\"card-body\">\n    <form (ngSubmit)=\"processFilter(filterForm)\" [formGroup]=\"filterForm\">\n\n      <div class=\"row\">\n        <div class=\"col-md-3  mb-3\" *ngFor=\"let control of filterComponents\">\n          <label>{{control.label}}: </label>\n          <div class=\"input-group\">\n            <div class=\"input-group-append\">\n                <span class=\"input-group-text  form-icon-default\">\n                  <i [class]=\"control.icon\"></i>\n                </span>\n            </div>\n\n            <select *ngIf=\"isSelect(control.controlType)\" class=\"form-control form-control-sm checking-field\"\n                    [formControlName]=\"control.name\">\n              <option value=\"\" disabled selected>{{control.placeholder}}</option>\n              <option *ngFor=\"let o of control.controlType.options\">{{o.text}}</option>\n            </select>\n\n            <textarea *ngIf=\"isTextArea(control.controlType)\" [cols]=\"control.controlType.cols\"\n                      [rows]=\"control.controlType.rows\" class=\"form-control form-control-sm checking-field\"\n                      [placeholder]=\"control.placeholder\" [formControlName]=\"control.name\"></textarea>\n\n            <input *ngIf=\"isInput(control.controlType)\" [type]=\"control.controlType.type\"\n                   [placeholder]=\"control.placeholder\" class=\"form-control form-control-sm checking-field\"\n                   [formControlName]=\"control.name\"/>\n          </div>\n          <span class=\"help-block\" *ngIf=\"filterForm.get(control.name).touched\">\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get(control.name).hasError('required')\">{{control.placeholder}} is required</span>\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get(control.name).hasError('minlength')\">Minimum of {{control.controlType.minLength}}\n                characters</span>\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get(control.name).hasError('maxlength')\">Maximum of {{control.controlType.maxLength}}\n                characters</span>\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get(control.name).hasError('min')\">Should be greater than {{control.controlType.min}}</span>\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get(control.name).hasError('max')\">Should be less than {{control.controlType.max}}</span>\n            </span>\n        </div>\n      </div>\n\n      <div class=\"row\" *ngIf=\"enableDefaultTableHeader\">\n        <div class=\"col-md-3 mb-3\">\n          <label>From: </label>\n          <div class=\"input-group\">\n            <div class=\"input-group-append\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-calendar-o\"></i>\n                </span>\n            </div>\n            <input\n              type=\"text\"\n              class=\"form-control form-control-sm checking-field\"\n              id=\"inputFromDate\"\n              formControlName=\"from\"\n              placeholder=\"From...\"\n              #dpfrom=\"bsDatepicker\"\n              bsDatepicker\n              [outsideClick]=\"false\"\n              [bsConfig]=\"{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }\"\n              maxlength=\"30\"\n              required\n              readonly\n            />\n            <div class=\"input-group-append\">\n              <button class=\"btn btn-primary\" type=\"button\" (click)=\"dpfrom.toggle()\"\n                      [attr.aria-expanded]=\"dpfrom.isOpen\"><i class=\"fa fa-th\"></i></button>\n            </div>\n          </div>\n          <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n                <span class=\"text-danger\"\n                      *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 30 characters</span>\n            </span>\n        </div>\n        <div class=\"col-md-3 mb-3\">\n          <label>To: </label>\n          <div class=\"input-group\">\n            <div class=\"input-group-append\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-calendar-o\"></i>\n                </span>\n            </div>\n            <input\n              type=\"text\"\n              class=\"form-control form-control-sm checking-field\"\n              id=\"inputToDate\"\n              formControlName=\"to\"\n              placeholder=\"To...\"\n              #dpto=\"bsDatepicker\"\n              bsDatepicker\n              [outsideClick]=\"false\"\n              [bsConfig]=\"{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }\"\n              maxlength=\"30\"\n              required\n              readonly\n            />\n            <div class=\"input-group-append\">\n              <button class=\"btn btn-primary\" type=\"button\" (click)=\"dpto.toggle()\" [attr.aria-expanded]=\"dpto.isOpen\">\n                <i class=\"fa fa-th\"></i></button>\n            </div>\n          </div>\n          <span class=\"help-block\" *ngIf=\"filterForm.get('to').touched\">\n                <span class=\"text-danger\"\n                      *ngIf=\"filterForm.get('to').hasError('maxlength')\">Maximum of 30 characters</span>\n            </span>\n        </div>\n        <div class=\"col-md-3 mb-3\">\n          <label>Search:</label>\n          <div class=\"input-group\">\n            <div class=\"input-group-prepend\">\n                <span class=\"input-group-text form-icon-default\">\n                  <i class=\"fa fa-search\"></i>\n                </span>\n            </div>\n            <input formControlName=\"needle\" class=\"form-control form-control-sm checking-field\" type=\"text\"\n                   placeholder=\"Search...\" (keyup)=\"updateFilter($event)\"/>\n          </div>\n        </div>\n        <span class=\"help-block\" *ngIf=\"filterForm.get('from').touched\">\n              <span class=\"text-danger\"\n                    *ngIf=\"filterForm.get('from').hasError('maxlength')\">Maximum of 200 characters</span>\n          </span>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-md-12\">\n          <div class=\"pull-right inline-buttons\">\n            <button class=\"btn btn-warning btn-sm\" type=\"reset\" (click)=\"reset()\">\n              <i class=\"fa fa-repeat\" aria-hidden=\"true\"></i>\n              Reset\n            </button>\n            <button class=\"btn btn-success btn-sm pull-right\" type=\"submit\">\n              <i class=\"fa fa-filter\" aria-hidden=\"true\"></i>\n              Filter\n            </button>\n          </div>\n        </div>\n      </div>\n\n    </form>\n  </div>\n</div>\n\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n    <div class=\"pull-left inline-buttons\">\n      <button class=\"btn btn-outline-success btn-sm pull-left\" style=\"margin-right: 1em;\" (click)=\"exportAs('pdf', 'landscape')\">Export pdf</button>\n      <button class=\"btn btn-outline-primary btn-sm pull-left\" style=\"margin-right: 1em;\" (click)=\"exportAs('csv')\">Export csv</button>\n      <button class=\"btn btn-outline-info btn-sm pull-left\" style=\"margin-right: 1em;\" (click)=\"exportAs('xml')\">Export xml</button>\n    </div>\n  </div>\n</div>\n\n<ngx-datatable\n  #table\n  [rowHeight]=\"tableRowHeight\"\n  [footerHeight]=\"tableFooterHeight\"\n  [headerHeight]=\"tableHeaderHeight\"\n  [scrollbarV]=\"verticalScrollActive\"\n  [scrollbarH]=\"horizontalScrollActive\"\n  [summaryRow]=\"enableSummary\"\n  [summaryPosition]=\"summaryPosition\"\n  [summaryHeight]=\"summaryHeight\"\n  class=\"bootstrap\"\n  [columnMode]=\"'force'\"\n  [rows]=\"page.content\"\n  [selected]=\"selected\"\n  [selectionType]=\"'checkbox'\"\n  (activate)=\"onActivate($event)\"\n  (select)='onSelect($event)'\n  [count]=\"page.totalElements\"\n  [offset]=\"page.number\"\n  [externalPaging]=\"true\"\n  [limit]=\"page.size\"\n  (page)=\"loadPage($event, null)\"\n  id=\"myTable\">\n  <ngx-datatable-column [summaryFunc]=\"summaryFunc\" [width]=\"30\" [sortable]=\"false\" [canAutoResize]=\"false\"\n                        [draggable]=\"true\" [resizeable]=\"false\" [headerCheckboxable]=\"true\"\n                        [checkboxable]=\"true\" *ngIf=\"enableCheckbox\">\n  </ngx-datatable-column>\n  <ngx-datatable-column [summaryFunc]=\"summaryFunc\" [width]=\"30\" [sortable]=\"false\" [canAutoResize]=\"false\"\n                        [draggable]=\"true\" [resizeable]=\"false\" [headerCheckboxable]=\"true\"\n                        *ngFor=\"let c of columns; index as i;\">\n    <ng-template let-column=\"column\" ngx-datatable-header-template *ngIf=\"i==0\">\n      <strong>#</strong>\n    </ng-template>\n    <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-row=\"row\" *ngIf=\"i==0\">\n        <span>\n            {{rowIndex + 1}}\n        </span>\n    </ng-template>\n  </ngx-datatable-column>\n  <ngx-datatable-column [summaryFunc]=\"(c.summaryFunc) ? c.summaryFunc : summaryFunc\"\n                        [canAutoResize]=\"(c.canAutoResize) ? c.canAutoResize : true\" [name]=\"c.columnName\"\n                        [width]=\"c.width\"\n                        [sortable]=\"(c.sortable) ? c.sortable : true\" [draggable]=\"(c.draggable) ? c.draggable : true\"\n                        [resizeable]=\"(c.resizeable) ? c.resizeable : true\"\n                        *ngFor=\"let c of columns; index as i;\">\n    <ng-template let-column=\"column\" ngx-datatable-header-template *ngIf=\"i==0\">\n      <strong>{{c.columnName}}</strong>\n    </ng-template>\n    <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\" *ngIf=\"i==0\">\n        <span>\n            <ng-container *ngIf=\"c.isDateColumn; then t10\"></ng-container>\n            <ng-container *ngIf=\"c.isCurrencyColumn && c.currencyText; then t40\"></ng-container>\n            <ng-container *ngIf=\"c.isCurrencyColumn && !c.currencyText; then t70\"></ng-container>\n            <ng-container *ngIf=\"!c.isDateColumn && !c.isCurrencyColumn; then t70\"></ng-container>\n\n            <ng-template #t10>\n                {{(getFieldValue(row, c.fieldName) | date:'medium')}}\n            </ng-template>\n            <ng-template #t40>\n                {{(getFieldValue(row, c.fieldName) | currency:c.currencyText:'code')}}\n            </ng-template>\n            <ng-template #t70>\n                {{getFieldValue(row, c.fieldName)}}\n            </ng-template>\n        </span>\n    </ng-template>\n\n    <ng-template let-column=\"column\" ngx-datatable-header-template>\n      <strong>{{c.columnName}}</strong>\n    </ng-template>\n    <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n        <span>\n            <ng-container *ngIf=\"c.isDateColumn; then t10\"></ng-container>\n            <ng-container *ngIf=\"c.isCurrencyColumn && c.currencyText; then t40\"></ng-container>\n            <ng-container *ngIf=\"c.isCurrencyColumn && !c.currencyText; then t70\"></ng-container>\n            <ng-container *ngIf=\"!c.isDateColumn && !c.isCurrencyColumn; then t70\"></ng-container>\n\n            <ng-template #t10>\n                {{(getFieldValue(row, c.fieldName) | date:'medium')}}\n            </ng-template>\n            <ng-template #t40>\n                {{(getFieldValue(row, c.fieldName) | currency:c.currencyText:'code')}}\n            </ng-template>\n            <ng-template #t70>\n                {{getFieldValue(row, c.fieldName)}}\n            </ng-template>\n        </span>\n    </ng-template>\n  </ngx-datatable-column>\n  <ngx-datatable-column [summaryFunc]=\"summaryFunc\" [name]=\"moreActions.name\" *ngIf=\"moreActions\" [sortable]=\"false\"\n                        [canAutoResize]=\"false\">\n    <ng-template ngx-datatable-cell-template let-rowIndex=\"rowIndex\" let-value=\"value\" let-row=\"row\">\n        <span>\n          <div class=\"input-group-prepend\">\n            <button class=\"btn btn-sm btn-outline-secondary dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\"\n                    aria-haspopup=\"true\"\n                    aria-expanded=\"false\">\n              <i class=\"fa fa-list-ul\" aria-hidden=\"true\"></i>\n            </button>\n            <div class=\"dropdown-menu\">\n              <a class=\"dropdown-item\" *ngFor=\"let action of moreActions.actions\" href=\"javascript:;\"\n                 (click)=\"onActionClick({id: row[moreActions.idFieldName], actionName: action.actionName, actionRow: row})\">{{action.actionName}}</a>\n            </div>\n          </div>\n        </span>\n    </ng-template>\n  </ngx-datatable-column>\n</ngx-datatable>\n",
                    styles: [""]
                },] },
    ];
    MlkDatatableComponent.ctorParameters = function () { return [
        { type: StewardClientService },
        { type: DatePipe },
        { type: ExportAsService }
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
export { MlkDatatableComponent };
if (false) {
    /** @type {?} */
    MlkDatatableComponent.prototype.tableRowHeight;
    /** @type {?} */
    MlkDatatableComponent.prototype.tableFooterHeight;
    /** @type {?} */
    MlkDatatableComponent.prototype.tableHeaderHeight;
    /** @type {?} */
    MlkDatatableComponent.prototype.verticalScrollActive;
    /** @type {?} */
    MlkDatatableComponent.prototype.horizontalScrollActive;
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
    MlkDatatableComponent.prototype.onSelected;
    /** @type {?} */
    MlkDatatableComponent.prototype.table;
    /** @type {?} */
    MlkDatatableComponent.prototype.filter;
    /** @type {?} */
    MlkDatatableComponent.prototype.filterForm;
    /** @type {?} */
    MlkDatatableComponent.prototype.emptySummaryFunc;
    /** @type {?} */
    MlkDatatableComponent.prototype.config;
    /**
     * @type {?}
     * @private
     */
    MlkDatatableComponent.prototype.sterwardService;
    /**
     * @type {?}
     * @private
     */
    MlkDatatableComponent.prototype.datePipe;
    /**
     * @type {?}
     * @private
     */
    MlkDatatableComponent.prototype.exportAsService;
}
/**
 * Used to define datatable columns with attributes (columnName, fieldName, width, sortable, canAutoResize,
 * draggable, resizable, isDateColumn, isCurrencyColumn, currencyText, summaryFunc)
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
     * Used to enable formating string to string currency
     * @type {?|undefined}
     */
    MlkDataTableColumn.prototype.isCurrencyColumn;
    /**
     * Used to set the currency string
     * @type {?|undefined}
     */
    MlkDataTableColumn.prototype.currencyText;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWxrLWRhdGF0YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdGV3YXJkLWNsaWVudC8iLCJzb3VyY2VzIjpbImxpYi9tbGstZGF0YXRhYmxlL21say1kYXRhdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEYsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQy9DLE9BQU8sRUFBb0IsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUU3RyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDdkMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBaUIsZUFBZSxFQUFzQixNQUFNLGVBQWUsQ0FBQzs7QUFJbkY7SUFxVEUsK0JBQW9CLGVBQXNFLEVBQVUsUUFBa0IsRUFBVSxlQUFnQztRQUE1SSxvQkFBZSxHQUFmLGVBQWUsQ0FBdUQ7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBckN2SixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDdkIsc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QiwyQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFDL0IsWUFBTyxHQUE4QixFQUFFLENBQUM7UUFDeEMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFdkIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNqQyxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixvQkFBZSxHQUFHLFlBQVksQ0FBQztRQUMvQixrQkFBYSxHQUFHLFVBQVUsQ0FBQztRQUUxQixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO1FBQ3hELHFCQUFnQixHQUFrQyxFQUFFLENBQUM7UUFFOUQsU0FBSSxHQUFjLElBQUksSUFBSSxFQUFFLENBQUM7UUFDN0IsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNKLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBRXRELFdBQU0sR0FBVyxFQUFFLENBQUM7UUFLcEIsV0FBTSxHQUFtQjtZQUN2QixJQUFJLEVBQUUsS0FBSztZQUNYLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUU7b0JBQ0wsV0FBVyxFQUFFLFdBQVc7aUJBQ3pCO2FBQ0Y7U0FDRixDQUFDO0lBSUYsQ0FBQzs7Ozs7O0lBR0Qsd0NBQVE7Ozs7O0lBQVIsVUFBUyxJQUF5QixFQUFFLEdBQVk7UUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUM5QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNyRCwrREFBK0Q7UUFDL0QsMEJBQTBCO1FBQzFCLE1BQU07SUFDUixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsd0NBQVE7Ozs7SUFBUjs7WUFDUSxLQUFLLEdBQUcsRUFBRTtRQUNoQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTs7Z0JBQzFCLFVBQVUsR0FBZSxFQUFFO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2QyxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsWUFBWSxRQUFRLElBQUksSUFBSSxDQUFDLFdBQVcsWUFBWSxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNwRixVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxZQUFZLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBQ0gsdUJBQXVCO1FBQ3ZCLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFNB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OztJQUM3Qix5Q0FBYzs7SUFDZCwyQ0FBc0Q7O0lBQ3RELHNDQUF5RDs7SUFDekQsdUNBQW9COztJQUNwQiwyQ0FBc0I7O0lBQ3RCLGlEQUE2Qjs7SUFHN0IsdUNBUUU7Ozs7O0lBR1UsZ0RBQThFOzs7OztJQUFFLHlDQUEwQjs7Ozs7SUFBRSxnREFBd0M7Ozs7Ozs7QUF5TmxLLHdDQWdEQzs7Ozs7O0lBNUNDLHdDQUFtQjs7Ozs7SUFJbkIsdUNBQWtCOzs7OztJQUlsQixtQ0FBZTs7Ozs7SUFJZixzQ0FBbUI7Ozs7O0lBSW5CLDJDQUF3Qjs7Ozs7SUFJeEIsdUNBQW9COzs7OztJQUlwQix3Q0FBcUI7Ozs7O0lBSXJCLDBDQUF1Qjs7Ozs7SUFLdkIsOENBQTJCOzs7OztJQUszQiwwQ0FBc0I7Ozs7O0lBS3RCLHlDQUFrQzs7Ozs7QUFNcEM7Ozs7SUFjRSx3QkFBWSxPQUFpQyxFQUFFLEVBQVcsRUFBRSxJQUFhO1FBYnpFOztXQUVHO1FBQ0gsU0FBSSxHQUFHLFNBQVMsQ0FBQztRQUNqQjs7V0FFRztRQUNILGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBT2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFSCxxQkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7Ozs7Ozs7Ozs7SUFoQkMsOEJBQWlCOzs7OztJQUlqQixxQ0FBbUI7Ozs7O0lBSW5CLGlDQUFrQzs7Ozs7QUFVcEMsdUNBY0M7Ozs7OztJQVZDLCtCQUFTOzs7OztJQUlULHVDQUFnQjs7Ozs7SUFLaEIsc0NBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0Zvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtQYWdlfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9wYWdlJztcclxuaW1wb3J0IHtNbGtEeW5hbWljQ29udHJvbCwgTWxrSW5wdXQsIE1sa1NlbGVjdCwgTWxrVGV4dGFyZWF9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL21say1keW5hbWljLWNvbnRyb2wnO1xyXG5pbXBvcnQge1Jlc3BvbnNlV3JhcHBlcn0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlcic7XHJcbmltcG9ydCB7U3Rld2FyZENsaWVudFNlcnZpY2V9IGZyb20gJy4uL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQge0RhdGF0YWJsZUNvbXBvbmVudH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xyXG5pbXBvcnQge1F1ZXVlfSBmcm9tICdxdWV1ZS10eXBlc2NyaXB0JztcclxuaW1wb3J0IHtEYXRlUGlwZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtFeHBvcnRBc0NvbmZpZywgRXhwb3J0QXNTZXJ2aWNlLCBTdXBwb3J0ZWRFeHRlbnNpb25zfSBmcm9tICduZ3gtZXhwb3J0LWFzJztcclxuXHJcbi8vIGNvbnN0IHsgUXVldWUgfSA9IHJlcXVpcmUoJ3F1ZXVlLXR5cGVzY3JpcHQnKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc3R3LW1say1kYXRhdGFibGUnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNhcmQgY2FyZC1vdXRsaW5lLWRlZmF1bHRcIiAqbmdJZj1cImVuYWJsZUZpbHRlckhlYWRlclwiPlxyXG4gIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgIDxmb3JtIChuZ1N1Ym1pdCk9XCJwcm9jZXNzRmlsdGVyKGZpbHRlckZvcm0pXCIgW2Zvcm1Hcm91cF09XCJmaWx0ZXJGb3JtXCI+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zICBtYi0zXCIgKm5nRm9yPVwibGV0IGNvbnRyb2wgb2YgZmlsdGVyQ29tcG9uZW50c1wiPlxyXG4gICAgICAgICAgPGxhYmVsPnt7Y29udHJvbC5sYWJlbH19OiA8L2xhYmVsPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCAgZm9ybS1pY29uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgPGkgW2NsYXNzXT1cImNvbnRyb2wuaWNvblwiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8c2VsZWN0ICpuZ0lmPVwiaXNTZWxlY3QoY29udHJvbC5jb250cm9sVHlwZSlcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCI+XHJcbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkIHNlbGVjdGVkPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgbyBvZiBjb250cm9sLmNvbnRyb2xUeXBlLm9wdGlvbnNcIj57e28udGV4dH19PC9vcHRpb24+XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG5cclxuICAgICAgICAgICAgPHRleHRhcmVhICpuZ0lmPVwiaXNUZXh0QXJlYShjb250cm9sLmNvbnRyb2xUeXBlKVwiIFtjb2xzXT1cImNvbnRyb2wuY29udHJvbFR5cGUuY29sc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICBbcm93c109XCJjb250cm9sLmNvbnRyb2xUeXBlLnJvd3NcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiPjwvdGV4dGFyZWE+XHJcblxyXG4gICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJpc0lucHV0KGNvbnRyb2wuY29udHJvbFR5cGUpXCIgW3R5cGVdPVwiY29udHJvbC5jb250cm9sVHlwZS50eXBlXCJcclxuICAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCJcclxuICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCIvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkudG91Y2hlZFwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcigncmVxdWlyZWQnKVwiPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19IGlzIHJlcXVpcmVkPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWlubGVuZ3RoJylcIj5NaW5pbXVtIG9mIHt7Y29udHJvbC5jb250cm9sVHlwZS5taW5MZW5ndGh9fVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyczwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiB7e2NvbnRyb2wuY29udHJvbFR5cGUubWF4TGVuZ3RofX1cclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcnM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtaW4nKVwiPlNob3VsZCBiZSBncmVhdGVyIHRoYW4ge3tjb250cm9sLmNvbnRyb2xUeXBlLm1pbn19PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWF4JylcIj5TaG91bGQgYmUgbGVzcyB0aGFuIHt7Y29udHJvbC5jb250cm9sVHlwZS5tYXh9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIiAqbmdJZj1cImVuYWJsZURlZmF1bHRUYWJsZUhlYWRlclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCI+XHJcbiAgICAgICAgICA8bGFiZWw+RnJvbTogPC9sYWJlbD5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgZm9ybS1pY29uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhci1vXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXHJcbiAgICAgICAgICAgICAgaWQ9XCJpbnB1dEZyb21EYXRlXCJcclxuICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJmcm9tXCJcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkZyb20uLi5cIlxyXG4gICAgICAgICAgICAgICNkcGZyb209XCJic0RhdGVwaWNrZXJcIlxyXG4gICAgICAgICAgICAgIGJzRGF0ZXBpY2tlclxyXG4gICAgICAgICAgICAgIFtvdXRzaWRlQ2xpY2tdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgIFtic0NvbmZpZ109XCJ7IGRhdGVJbnB1dEZvcm1hdDogJ0RELU1NLVlZWVknLCBjb250YWluZXJDbGFzczogJ3RoZW1lLXJlZCcgfVwiXHJcbiAgICAgICAgICAgICAgbWF4bGVuZ3RoPVwiMzBcIlxyXG4gICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgcmVhZG9ubHlcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImRwZnJvbS50b2dnbGUoKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImRwZnJvbS5pc09wZW5cIj48aSBjbGFzcz1cImZhIGZhLXRoXCI+PC9pPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLnRvdWNoZWRcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2YgMzAgY2hhcmFjdGVyczwvc3Bhbj5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCI+XHJcbiAgICAgICAgICA8bGFiZWw+VG86IDwvbGFiZWw+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IGZvcm0taWNvbi1kZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXItb1wiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxyXG4gICAgICAgICAgICAgIGlkPVwiaW5wdXRUb0RhdGVcIlxyXG4gICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInRvXCJcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlRvLi4uXCJcclxuICAgICAgICAgICAgICAjZHB0bz1cImJzRGF0ZXBpY2tlclwiXHJcbiAgICAgICAgICAgICAgYnNEYXRlcGlja2VyXHJcbiAgICAgICAgICAgICAgW291dHNpZGVDbGlja109XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgW2JzQ29uZmlnXT1cInsgZGF0ZUlucHV0Rm9ybWF0OiAnREQtTU0tWVlZWScsIGNvbnRhaW5lckNsYXNzOiAndGhlbWUtcmVkJyB9XCJcclxuICAgICAgICAgICAgICBtYXhsZW5ndGg9XCIzMFwiXHJcbiAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgICByZWFkb25seVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiZHB0by50b2dnbGUoKVwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiZHB0by5pc09wZW5cIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdGhcIj48L2k+PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCd0bycpLnRvdWNoZWRcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgndG8nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDMwIGNoYXJhY3RlcnM8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgbWItM1wiPlxyXG4gICAgICAgICAgPGxhYmVsPlNlYXJjaDo8L2xhYmVsPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgZm9ybS1pY29uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1zZWFyY2hcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8aW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwibmVlZGxlXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCIgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2guLi5cIiAoa2V5dXApPVwidXBkYXRlRmlsdGVyKCRldmVudClcIi8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykudG91Y2hlZFwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDIwMCBjaGFyYWN0ZXJzPC9zcGFuPlxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHVsbC1yaWdodCBpbmxpbmUtYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nIGJ0bi1zbVwiIHR5cGU9XCJyZXNldFwiIChjbGljayk9XCJyZXNldCgpXCI+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1yZXBlYXRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgUmVzZXRcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuLXNtIHB1bGwtcmlnaHRcIiB0eXBlPVwic3VibWl0XCI+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1maWx0ZXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgRmlsdGVyXHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgIDwvZm9ybT5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG5cclxuPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJwdWxsLWxlZnQgaW5saW5lLWJ1dHRvbnNcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1zdWNjZXNzIGJ0bi1zbSBwdWxsLWxlZnRcIiBzdHlsZT1cIm1hcmdpbi1yaWdodDogMWVtO1wiIChjbGljayk9XCJleHBvcnRBcygncGRmJywgJ2xhbmRzY2FwZScpXCI+RXhwb3J0IHBkZjwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnkgYnRuLXNtIHB1bGwtbGVmdFwiIHN0eWxlPVwibWFyZ2luLXJpZ2h0OiAxZW07XCIgKGNsaWNrKT1cImV4cG9ydEFzKCdjc3YnKVwiPkV4cG9ydCBjc3Y8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tb3V0bGluZS1pbmZvIGJ0bi1zbSBwdWxsLWxlZnRcIiBzdHlsZT1cIm1hcmdpbi1yaWdodDogMWVtO1wiIChjbGljayk9XCJleHBvcnRBcygneG1sJylcIj5FeHBvcnQgeG1sPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG48bmd4LWRhdGF0YWJsZVxyXG4gICN0YWJsZVxyXG4gIFtyb3dIZWlnaHRdPVwidGFibGVSb3dIZWlnaHRcIlxyXG4gIFtmb290ZXJIZWlnaHRdPVwidGFibGVGb290ZXJIZWlnaHRcIlxyXG4gIFtoZWFkZXJIZWlnaHRdPVwidGFibGVIZWFkZXJIZWlnaHRcIlxyXG4gIFtzY3JvbGxiYXJWXT1cInZlcnRpY2FsU2Nyb2xsQWN0aXZlXCJcclxuICBbc2Nyb2xsYmFySF09XCJob3Jpem9udGFsU2Nyb2xsQWN0aXZlXCJcclxuICBbc3VtbWFyeVJvd109XCJlbmFibGVTdW1tYXJ5XCJcclxuICBbc3VtbWFyeVBvc2l0aW9uXT1cInN1bW1hcnlQb3NpdGlvblwiXHJcbiAgW3N1bW1hcnlIZWlnaHRdPVwic3VtbWFyeUhlaWdodFwiXHJcbiAgY2xhc3M9XCJib290c3RyYXBcIlxyXG4gIFtjb2x1bW5Nb2RlXT1cIidmb3JjZSdcIlxyXG4gIFtyb3dzXT1cInBhZ2UuY29udGVudFwiXHJcbiAgW3NlbGVjdGVkXT1cInNlbGVjdGVkXCJcclxuICBbc2VsZWN0aW9uVHlwZV09XCInY2hlY2tib3gnXCJcclxuICAoYWN0aXZhdGUpPVwib25BY3RpdmF0ZSgkZXZlbnQpXCJcclxuICAoc2VsZWN0KT0nb25TZWxlY3QoJGV2ZW50KSdcclxuICBbY291bnRdPVwicGFnZS50b3RhbEVsZW1lbnRzXCJcclxuICBbb2Zmc2V0XT1cInBhZ2UubnVtYmVyXCJcclxuICBbZXh0ZXJuYWxQYWdpbmddPVwidHJ1ZVwiXHJcbiAgW2xpbWl0XT1cInBhZ2Uuc2l6ZVwiXHJcbiAgKHBhZ2UpPVwibG9hZFBhZ2UoJGV2ZW50LCBudWxsKVwiXHJcbiAgaWQ9XCJteVRhYmxlXCI+XHJcbiAgPG5neC1kYXRhdGFibGUtY29sdW1uIFtzdW1tYXJ5RnVuY109XCJzdW1tYXJ5RnVuY1wiIFt3aWR0aF09XCIzMFwiIFtzb3J0YWJsZV09XCJmYWxzZVwiIFtjYW5BdXRvUmVzaXplXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2RyYWdnYWJsZV09XCJ0cnVlXCIgW3Jlc2l6ZWFibGVdPVwiZmFsc2VcIiBbaGVhZGVyQ2hlY2tib3hhYmxlXT1cInRydWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2hlY2tib3hhYmxlXT1cInRydWVcIiAqbmdJZj1cImVuYWJsZUNoZWNrYm94XCI+XHJcbiAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cclxuICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gW3N1bW1hcnlGdW5jXT1cInN1bW1hcnlGdW5jXCIgW3dpZHRoXT1cIjMwXCIgW3NvcnRhYmxlXT1cImZhbHNlXCIgW2NhbkF1dG9SZXNpemVdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbZHJhZ2dhYmxlXT1cInRydWVcIiBbcmVzaXplYWJsZV09XCJmYWxzZVwiIFtoZWFkZXJDaGVja2JveGFibGVdPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjIG9mIGNvbHVtbnM7IGluZGV4IGFzIGk7XCI+XHJcbiAgICA8bmctdGVtcGxhdGUgbGV0LWNvbHVtbj1cImNvbHVtblwiIG5neC1kYXRhdGFibGUtaGVhZGVyLXRlbXBsYXRlICpuZ0lmPVwiaT09MFwiPlxyXG4gICAgICA8c3Ryb25nPiM8L3N0cm9uZz5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXJvdz1cInJvd1wiICpuZ0lmPVwiaT09MFwiPlxyXG4gICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICB7e3Jvd0luZGV4ICsgMX19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxyXG4gIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBbc3VtbWFyeUZ1bmNdPVwiKGMuc3VtbWFyeUZ1bmMpID8gYy5zdW1tYXJ5RnVuYyA6IHN1bW1hcnlGdW5jXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2NhbkF1dG9SZXNpemVdPVwiKGMuY2FuQXV0b1Jlc2l6ZSkgPyBjLmNhbkF1dG9SZXNpemUgOiB0cnVlXCIgW25hbWVdPVwiYy5jb2x1bW5OYW1lXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3dpZHRoXT1cImMud2lkdGhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbc29ydGFibGVdPVwiKGMuc29ydGFibGUpID8gYy5zb3J0YWJsZSA6IHRydWVcIiBbZHJhZ2dhYmxlXT1cIihjLmRyYWdnYWJsZSkgPyBjLmRyYWdnYWJsZSA6IHRydWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbcmVzaXplYWJsZV09XCIoYy5yZXNpemVhYmxlKSA/IGMucmVzaXplYWJsZSA6IHRydWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdGb3I9XCJsZXQgYyBvZiBjb2x1bW5zOyBpbmRleCBhcyBpO1wiPlxyXG4gICAgPG5nLXRlbXBsYXRlIGxldC1jb2x1bW49XCJjb2x1bW5cIiBuZ3gtZGF0YXRhYmxlLWhlYWRlci10ZW1wbGF0ZSAqbmdJZj1cImk9PTBcIj5cclxuICAgICAgPHN0cm9uZz57e2MuY29sdW1uTmFtZX19PC9zdHJvbmc+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPG5nLXRlbXBsYXRlIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZSBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiIGxldC12YWx1ZT1cInZhbHVlXCIgbGV0LXJvdz1cInJvd1wiICpuZ0lmPVwiaT09MFwiPlxyXG4gICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYy5pc0RhdGVDb2x1bW47IHRoZW4gdDEwXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjLmlzQ3VycmVuY3lDb2x1bW4gJiYgYy5jdXJyZW5jeVRleHQ7IHRoZW4gdDQwXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjLmlzQ3VycmVuY3lDb2x1bW4gJiYgIWMuY3VycmVuY3lUZXh0OyB0aGVuIHQ3MFwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWMuaXNEYXRlQ29sdW1uICYmICFjLmlzQ3VycmVuY3lDb2x1bW47IHRoZW4gdDcwXCI+PC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI3QxMD5cclxuICAgICAgICAgICAgICAgIHt7KGdldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSkgfCBkYXRlOidtZWRpdW0nKX19XHJcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdDQwPlxyXG4gICAgICAgICAgICAgICAge3soZ2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKSB8IGN1cnJlbmN5OmMuY3VycmVuY3lUZXh0Oidjb2RlJyl9fVxyXG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI3Q3MD5cclxuICAgICAgICAgICAgICAgIHt7Z2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKX19XHJcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgICA8bmctdGVtcGxhdGUgbGV0LWNvbHVtbj1cImNvbHVtblwiIG5neC1kYXRhdGFibGUtaGVhZGVyLXRlbXBsYXRlPlxyXG4gICAgICA8c3Ryb25nPnt7Yy5jb2x1bW5OYW1lfX08L3N0cm9uZz5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXZhbHVlPVwidmFsdWVcIiBsZXQtcm93PVwicm93XCI+XHJcbiAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjLmlzRGF0ZUNvbHVtbjsgdGhlbiB0MTBcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImMuaXNDdXJyZW5jeUNvbHVtbiAmJiBjLmN1cnJlbmN5VGV4dDsgdGhlbiB0NDBcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImMuaXNDdXJyZW5jeUNvbHVtbiAmJiAhYy5jdXJyZW5jeVRleHQ7IHRoZW4gdDcwXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhYy5pc0RhdGVDb2x1bW4gJiYgIWMuaXNDdXJyZW5jeUNvbHVtbjsgdGhlbiB0NzBcIj48L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdDEwPlxyXG4gICAgICAgICAgICAgICAge3soZ2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKSB8IGRhdGU6J21lZGl1bScpfX1cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICN0NDA+XHJcbiAgICAgICAgICAgICAgICB7eyhnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpIHwgY3VycmVuY3k6Yy5jdXJyZW5jeVRleHQ6J2NvZGUnKX19XHJcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdDcwPlxyXG4gICAgICAgICAgICAgICAge3tnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpfX1cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XHJcbiAgPG5neC1kYXRhdGFibGUtY29sdW1uIFtzdW1tYXJ5RnVuY109XCJzdW1tYXJ5RnVuY1wiIFtuYW1lXT1cIm1vcmVBY3Rpb25zLm5hbWVcIiAqbmdJZj1cIm1vcmVBY3Rpb25zXCIgW3NvcnRhYmxlXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2NhbkF1dG9SZXNpemVdPVwiZmFsc2VcIj5cclxuICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtdmFsdWU9XCJ2YWx1ZVwiIGxldC1yb3c9XCJyb3dcIj5cclxuICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBkcm9wZG93bi10b2dnbGVcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxyXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxyXG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtbGlzdC11bFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+XHJcbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBtb3JlQWN0aW9ucy5hY3Rpb25zXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiXHJcbiAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQWN0aW9uQ2xpY2soe2lkOiByb3dbbW9yZUFjdGlvbnMuaWRGaWVsZE5hbWVdLCBhY3Rpb25OYW1lOiBhY3Rpb24uYWN0aW9uTmFtZSwgYWN0aW9uUm93OiByb3d9KVwiPnt7YWN0aW9uLmFjdGlvbk5hbWV9fTwvYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XHJcbjwvbmd4LWRhdGF0YWJsZT5cclxuYCxcclxuICBzdHlsZXM6IFtgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1sa0RhdGF0YWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgdGFibGVSb3dIZWlnaHQgPSA1MDtcclxuICBASW5wdXQoKSB0YWJsZUZvb3RlckhlaWdodCA9IDUwO1xyXG4gIEBJbnB1dCgpIHRhYmxlSGVhZGVySGVpZ2h0ID0gNTA7XHJcbiAgQElucHV0KCkgdmVydGljYWxTY3JvbGxBY3RpdmUgPSBmYWxzZTtcclxuICBASW5wdXQoKSBob3Jpem9udGFsU2Nyb2xsQWN0aXZlID0gZmFsc2U7XHJcbiAgQElucHV0KCkgY29sdW1uczogQXJyYXk8TWxrRGF0YVRhYmxlQ29sdW1uPiA9IFtdO1xyXG4gIEBJbnB1dCgpIGVuYWJsZUNoZWNrYm94ID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZW5kcG9pbnQ6IHN0cmluZztcclxuICBASW5wdXQoKSBlbmFibGVGaWx0ZXJIZWFkZXIgPSBmYWxzZTtcclxuICBASW5wdXQoKSBlbmFibGVEZWZhdWx0VGFibGVIZWFkZXIgPSBmYWxzZTtcclxuICBASW5wdXQoKSBlbmFibGVTdW1tYXJ5ID0gZmFsc2U7XHJcbiAgQElucHV0KCkgc3VtbWFyeVBvc2l0aW9uID0gJ1xcJ2JvdHRvbVxcJyc7XHJcbiAgQElucHV0KCkgc3VtbWFyeUhlaWdodCA9ICdcXCdhdXRvXFwnJztcclxuICBASW5wdXQoKSBtb3JlQWN0aW9uczogTWxrTW9yZUFjdGlvbnM7XHJcbiAgQE91dHB1dCgpIG9uQWN0aW9uc0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxNbGtNb3JlQWN0aW9uRGF0YT4oKTtcclxuICBASW5wdXQoKSBmaWx0ZXJDb21wb25lbnRzOiBBcnJheTxNbGtEeW5hbWljQ29udHJvbDxhbnk+PiA9IFtdO1xyXG4gIEBJbnB1dCgpIHBhcmFtczogTWFwPHN0cmluZywgYW55PjtcclxuICBwYWdlOiBQYWdlPGFueT4gPSBuZXcgUGFnZSgpO1xyXG4gIHNlbGVjdGVkID0gW107XHJcbiAgQE91dHB1dCgpIG9uU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XHJcbiAgQFZpZXdDaGlsZChEYXRhdGFibGVDb21wb25lbnQpIHRhYmxlOiBEYXRhdGFibGVDb21wb25lbnQ7XHJcbiAgZmlsdGVyOiBPYmplY3QgPSB7fTtcclxuICBmaWx0ZXJGb3JtOiBGb3JtR3JvdXA7XHJcbiAgZW1wdHlTdW1tYXJ5RnVuYzogKCkgPT4gbnVsbDtcclxuXHJcblxyXG4gIGNvbmZpZzogRXhwb3J0QXNDb25maWcgPSB7XHJcbiAgICB0eXBlOiAncGRmJyxcclxuICAgIGVsZW1lbnRJZDogJ215VGFibGUnLFxyXG4gICAgb3B0aW9uczoge1xyXG4gICAgICBqc1BERjoge1xyXG4gICAgICAgIG9yaWVudGF0aW9uOiAnbGFuZHNjYXBlJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RlcndhcmRTZXJ2aWNlOiBTdGV3YXJkQ2xpZW50U2VydmljZTxSZXNwb25zZVdyYXBwZXI8UGFnZTxhbnk+PiwgYW55PiwgcHJpdmF0ZSBkYXRlUGlwZTogRGF0ZVBpcGUsIHByaXZhdGUgZXhwb3J0QXNTZXJ2aWNlOiBFeHBvcnRBc1NlcnZpY2UpIHtcclxuICB9XHJcblxyXG5cclxuICBleHBvcnRBcyh0eXBlOiBTdXBwb3J0ZWRFeHRlbnNpb25zLCBvcHQ/OiBzdHJpbmcpIHtcclxuICAgIHRoaXMuY29uZmlnLnR5cGUgPSB0eXBlO1xyXG4gICAgaWYgKG9wdCkge1xyXG4gICAgICB0aGlzLmNvbmZpZy5vcHRpb25zLmpzUERGLm9yaWVudGF0aW9uID0gb3B0O1xyXG4gICAgfVxyXG4gICAgdGhpcy5leHBvcnRBc1NlcnZpY2Uuc2F2ZSh0aGlzLmNvbmZpZywgJ0RhdGFFeHBvcnQnKTtcclxuICAgIC8vIHRoaXMuZXhwb3J0QXNTZXJ2aWNlLmdldCh0aGlzLmNvbmZpZykuc3Vic2NyaWJlKGNvbnRlbnQgPT4ge1xyXG4gICAgLy8gICBjb25zb2xlLmxvZyhjb250ZW50KTtcclxuICAgIC8vIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2VuZXJhdGUgZm9ybSBjb250cm9sIGZyb20gZmlsdGVyQ29tcG9uZW50cyBhbmQgYWxzbyBhcHBlbmRpbmcgZGVmYXVsdCBjb250cm9scyBpZS4gZGF0ZSBmaWx0ZXIgYW5kIHNlYXJjaCBjb250cm9sc1xyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3QgZ3JvdXAgPSB7fTtcclxuICAgIHRoaXMuZmlsdGVyQ29tcG9uZW50cy5mb3JFYWNoKGNvbXAgPT4ge1xyXG4gICAgICBjb25zdCB2YWxpZGF0b3JzOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICAgIGlmIChjb21wLmlzUmVxdWlyZWQpIHtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgTWxrSW5wdXQgfHwgY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIE1sa1RleHRhcmVhKSB7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluTGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWluTGVuZ3RoKSk7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4TGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWF4TGVuZ3RoKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgTWxrSW5wdXQpIHtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5tYXgoY29tcC5jb250cm9sVHlwZS5tYXgpKTtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW4oY29tcC5jb250cm9sVHlwZS5taW4pKTtcclxuICAgICAgfVxyXG4gICAgICBncm91cFtjb21wLm5hbWVdID0gbmV3IEZvcm1Db250cm9sKCcnLCB2YWxpZGF0b3JzKTtcclxuICAgIH0pO1xyXG4gICAgLy8gYWRkIGRlZmF1bHQgY29udHJvbHNcclxuICAgIGdyb3VwWydmcm9tJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDMwKSk7XHJcbiAgICBncm91cFsndG8nXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMzApKTtcclxuICAgIGdyb3VwWyduZWVkbGUnXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMjAwKSk7XHJcbiAgICB0aGlzLmZpbHRlckZvcm0gPSBuZXcgRm9ybUdyb3VwKGdyb3VwKTtcclxuICAgIHRoaXMubG9hZFBhZ2Uoe29mZnNldDogMCwgbGltaXQ6IHRoaXMucGFnZS5zaXplfSwgbnVsbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGVtaXQgY2xpY2sgZXZlbnQgb2YgdGhlIGFjdGlvbnNcclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKi9cclxuICBvbkFjdGlvbkNsaWNrKGV2ZW50OiBNbGtNb3JlQWN0aW9uRGF0YSkge1xyXG4gICAgdGhpcy5vbkFjdGlvbnNFdmVudC5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2Nlc3Mgc2VydmVyIHJlcXVlc3Qgb2YgZGF0YWJsZVxyXG4gICAqIEBwYXJhbSBwYWdlSW5mb1xyXG4gICAqIEBwYXJhbSBmaWx0ZXJzXHJcbiAgICovXHJcbiAgbG9hZFBhZ2UocGFnZUluZm8sIGZpbHRlcnMpIHtcclxuICAgIGlmICghdGhpcy5lbmRwb2ludCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgcmVxdWVzdDogTWFwPHN0cmluZywgYW55PjtcclxuICAgIGlmIChmaWx0ZXJzKSB7XHJcbiAgICAgIHJlcXVlc3QgPSBmaWx0ZXJzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVxdWVzdCA9IG5ldyBNYXAoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnBhcmFtcykge1xyXG4gICAgICB0aGlzLnBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgICAgcmVxdWVzdC5zZXQoa2V5LCB2YWx1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVxdWVzdC5zZXQoJ3BhZ2UnLCBwYWdlSW5mby5vZmZzZXQpO1xyXG4gICAgcmVxdWVzdC5zZXQoJ3NpemUnLCBwYWdlSW5mby5saW1pdCk7XHJcbiAgICB0aGlzLnN0ZXJ3YXJkU2VydmljZS5nZXQodGhpcy5lbmRwb2ludCwgcmVxdWVzdCkuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcclxuICAgICAgaWYgKHJlc3BvbnNlLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgIHRoaXMucGFnZSA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gaGFuZGxlIHNlbGVjdCBvcHRpb25cclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKi9cclxuICBvblNlbGVjdCh7c2VsZWN0ZWR9KSB7XHJcbiAgICBjb25zb2xlLmxvZygnU2VsZWN0IEV2ZW50Jywgc2VsZWN0ZWQsIHRoaXMuc2VsZWN0ZWQpO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWQuc3BsaWNlKDAsIHRoaXMuc2VsZWN0ZWQubGVuZ3RoKTtcclxuICAgIHRoaXMuc2VsZWN0ZWQucHVzaCguLi5zZWxlY3RlZCk7XHJcbiAgICB0aGlzLm9uU2VsZWN0ZWQuZW1pdCh0aGlzLnNlbGVjdGVkKTtcclxuICB9XHJcblxyXG4gIG9uQWN0aXZhdGUoZXZlbnQpIHtcclxuXHJcbiAgfVxyXG5cclxuICB1cGRhdGVGaWx0ZXIoZXZlbnQpIHtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIHByb2Nlc3MgdGFibGUgZmlsdGVyLiBJZiBkYXRlIGZpbHRlciBpcyBub3QgcHJvdmlkZSB0aGUgZnJvbSB2YWx1ZSBpc1xyXG4gICAqIHNldCB0byAyMDE4LTAxLTAxIGFuZCB0byB2YWx1ZSBpcyBzZXQgdG8gMSB5ZWFyIGZyb20gdG9kYXlcclxuICAgKiBAcGFyYW0gZm9ybVxyXG4gICAqL1xyXG4gIHByb2Nlc3NGaWx0ZXIoZm9ybSkge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgY29uc3QgZjogTWFwPFN0cmluZywgYW55PiA9IG5ldyBNYXAoT2JqZWN0LmVudHJpZXModGhpcy5maWx0ZXJGb3JtLnZhbHVlKSk7XHJcbiAgICAvLyB2YWxpZGF0ZSBkYXRlXHJcbiAgICBpZiAoIXRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS50b3VjaGVkKSB7Ly8gaWYgZnJvbSBpcyBub3QgcG9wdWxhdGVkIHJlbW92ZSBmcm9tIHJlcXVlc3RcclxuICAgICAgZi5kZWxldGUoJ2Zyb20nKTtcclxuICAgICAgLy8gdGhpcy5maWx0ZXJGb3JtLmdldCgnZnJvbScpLnNldFZhbHVlKCcyMDE4LTAxLTAxJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBmLmdldCgnZnJvbScpLnNldFZhbHVlKG5ldyBEYXRlKHRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS52YWx1ZSkpO1xyXG4gICAgICBjb25zdCBmZCA9IG5ldyBEYXRlKHRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS52YWx1ZSk7XHJcbiAgICAgIC8vIGYuc2V0KCdmcm9tJywgZmQudG9JU09TdHJpbmcoKSk7XHJcbiAgICAgIGYuc2V0KCdmcm9tJywgdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZmQsICdkZC9NTS95eXl5JykpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLmZpbHRlckZvcm0uZ2V0KCd0bycpLnRvdWNoZWQpIHsvLyBpZiB0byBpcyBub3QgcG9wdWxhdGVkIHJlbW92ZSBmcm9tIHJlcXVlc3RcclxuICAgICAgZi5kZWxldGUoJ3RvJyk7XHJcbiAgICAgIC8vIGxldCB0b0RhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAvLyB0b0RhdGUuc2V0RGF0ZSh0b0RhdGUuZ2V0RnVsbFllYXIoKSArIDEpO1xyXG4gICAgICAvLyB0aGlzLmZpbHRlckZvcm0uZ2V0KCd0bycpLnNldFZhbHVlKHRoaXMuZ2V0Rm9ybWF0dGVkRGF0ZSh0b0RhdGUpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGYuZ2V0KCd0bycpLnNldFZhbHVlKG5ldyBEYXRlKHRoaXMuZmlsdGVyRm9ybS5nZXQoJ3RvJykudmFsdWUpKTtcclxuICAgICAgY29uc3QgdGQgPSBuZXcgRGF0ZSh0aGlzLmZpbHRlckZvcm0uZ2V0KCd0bycpLnZhbHVlKTtcclxuICAgICAgLy8gZi5zZXQoJ3RvJywgdGQudG9JU09TdHJpbmcoKSk7XHJcbiAgICAgIGYuc2V0KCd0bycsIHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKHRkLCAnZGQvTU0veXl5eScpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvYWRQYWdlKHtvZmZzZXQ6IHRoaXMucGFnZS5udW1iZXIsIGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZX0sIGYpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyBpbnB1dFxyXG4gICAqIEBwYXJhbSBjb250cm9sXHJcbiAgICovXHJcbiAgaXNJbnB1dChjb250cm9sOiBhbnkpIHtcclxuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgTWxrSW5wdXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIHNlbGVjdFxyXG4gICAqIEBwYXJhbSBjb250cm9sXHJcbiAgICovXHJcbiAgaXNTZWxlY3QoY29udHJvbDogYW55KSB7XHJcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIE1sa1NlbGVjdDtcclxuICB9XHJcblxyXG4gIHJlc2V0KCkge1xyXG4gICAgdGhpcy5uZ09uSW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyB0ZXh0YXJlYVxyXG4gICAqL1xyXG4gIGlzVGV4dEFyZWEoY29udHJvbDogYW55KSB7XHJcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIE1sa1RleHRhcmVhO1xyXG4gIH1cclxuXHJcbiAgc3VtbWFyeUZ1bmMoY2VsbDogYW55KSB7XHJcbiAgICByZXR1cm4gKGBgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gZm9ybWF0IGRhdGUgdG8gc3RyaW5nIHl5eXktTU0tZGRcclxuICAgKiBAcGFyYW0gZGF0ZVxyXG4gICAqL1xyXG4gIGdldEZvcm1hdHRlZERhdGUoZGF0ZSkge1xyXG4gICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICBsZXQgbW9udGggPSAoMSArIGRhdGUuZ2V0TW9udGgoKSkudG9TdHJpbmcoKTtcclxuICAgIG1vbnRoID0gbW9udGgubGVuZ3RoID4gMSA/IG1vbnRoIDogJzAnICsgbW9udGg7XHJcblxyXG4gICAgbGV0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICBkYXkgPSBkYXkubGVuZ3RoID4gMSA/IGRheSA6ICcwJyArIGRheTtcclxuXHJcbiAgICByZXR1cm4geWVhciArICctJyArIG1vbnRoICsgJy0nICsgZGF5O1xyXG4gIH1cclxuXHJcbiAgZ2V0RmllbGRWYWx1ZShkYXRhOiBPYmplY3QsIGZpZWxkOiBhbnkpIHtcclxuICAgIGNvbnN0IGs6IEFycmF5PHN0cmluZz4gPSBmaWVsZC5zcGxpdCgnLicpO1xyXG4gICAgY29uc3Qga2V5cyA9IG5ldyBRdWV1ZTxzdHJpbmc+KC4uLmspO1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldE9iamVjdFZhbHVlKGRhdGEsIGtleXMpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBmaW5kIGtleSB2YWx1ZSBiYXNlZCBvbiB0aGUga2V5IHNlcXVlbmNlIHByb3ZpZGVkXHJcbiAgICogQHBhcmFtIGRhdGEgZXhwZWN0cyBhbiBvYmplY3RcclxuICAgKiBAcGFyYW0ga2V5cyBpLmUuIHVzZXIuZ2VuZGVyLnR5cGUudHlwZVxyXG4gICAqL1xyXG4gIGdldE9iamVjdFZhbHVlKGRhdGE6IGFueSwga2V5czogUXVldWU8c3RyaW5nPikge1xyXG4gICAgaWYgKCghKGRhdGEgaW5zdGFuY2VvZiBPYmplY3QpKSB8fCAoa2V5cy5sZW5ndGggPT09IDEpKSB7XHJcbiAgICAgIHJldHVybiBkYXRhW2tleXMudGFpbF07XHJcbiAgICB9XHJcbiAgICBsZXQgdmFsdWUgPSBudWxsO1xyXG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgIGlmICgoa2V5ID09PSBrZXlzLmZyb250KSAmJiAoZGF0YVtrZXldIGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgIHZhbHVlID0gdGhpcy5nZXRPYmplY3RWYWx1ZShkYXRhW2tleV0sIGtleXMpO1xyXG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0ga2V5cy50YWlsKSB7XHJcbiAgICAgICAgdmFsdWUgPSBkYXRhW2tleV07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG5cclxuICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogVXNlZCB0byBkZWZpbmUgZGF0YXRhYmxlIGNvbHVtbnMgd2l0aCBhdHRyaWJ1dGVzIChjb2x1bW5OYW1lLCBmaWVsZE5hbWUsIHdpZHRoLCBzb3J0YWJsZSwgY2FuQXV0b1Jlc2l6ZSxcclxuICogZHJhZ2dhYmxlLCByZXNpemFibGUsIGlzRGF0ZUNvbHVtbiwgaXNDdXJyZW5jeUNvbHVtbiwgY3VycmVuY3lUZXh0LCBzdW1tYXJ5RnVuYylcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWxrRGF0YVRhYmxlQ29sdW1uIHtcclxuICAvKipcclxuICAgKiBjb2x1bW4gdGl0bGVcclxuICAgKi9cclxuICBjb2x1bW5OYW1lOiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogU2VydmVyIHNpZGUgcmVzcG9uc2UgZmllbGQgY29ycmVzcG9uZGluZyB0byB0aGUgY29sdW1uIGkuZSBmdWxsTmFtZSBtYXkgY29ycmVzcG9uZCB0byBOYW1lIGNvbHVtblxyXG4gICAqL1xyXG4gIGZpZWxkTmFtZTogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIFdpZHRoIG9mIHRoZSBjb2x1bW5cclxuICAgKi9cclxuICB3aWR0aD86IG51bWJlcjtcclxuICAvKipcclxuICAgKiBFbmFibGUgc29ydGluZyBpbiBhIGNvbHVtblxyXG4gICAqL1xyXG4gIHNvcnRhYmxlPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBNYWtlcyBhIGNvbHVtbiByZXNpemFibGVcclxuICAgKi9cclxuICBjYW5BdXRvUmVzaXplPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBFbmFibGVzIGEgY29sdW1uIHRvIGJlIGRyYWdnYWJsZVxyXG4gICAqL1xyXG4gIGRyYWdnYWJsZT86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogTWFrZXMgYSBjb2x1bW4gcmVzaXphYmxlXHJcbiAgICovXHJcbiAgcmVzaXplYWJsZT86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBlbmFibGUgZm9ybWF0aW5nIHRpbWVzdGFtcCB0byBzdHJpbmcgZGF0ZVxyXG4gICAqL1xyXG4gIGlzRGF0ZUNvbHVtbj86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gZW5hYmxlIGZvcm1hdGluZyBzdHJpbmcgdG8gc3RyaW5nIGN1cnJlbmN5XHJcbiAgICovXHJcbiAgaXNDdXJyZW5jeUNvbHVtbj86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gc2V0IHRoZSBjdXJyZW5jeSBzdHJpbmdcclxuICAgKi9cclxuICBjdXJyZW5jeVRleHQ/OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHRvIGNhbGwgYXQgdGhlIHN1bW1hcnkgcm93XHJcbiAgICovXHJcbiAgc3VtbWFyeUZ1bmM/OiAoYW55OiBhbnlbXSkgPT4gYW55O1xyXG59XHJcblxyXG4vKipcclxuICogVXNlZCB0byBkaXNwbGF5IG1vcmUgYWN0aW9ucyBjb2x1bW4gYW5kIHRoZSBlbmQgb2YgdGhlIHRhYmxlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWxrTW9yZUFjdGlvbnMge1xyXG4gIC8qKlxyXG4gICAqIEFjdGlvbiBDb2x1bW4gbmFtZSBlLmcuIE1vcmUgQWN0aW9uc1xyXG4gICAqL1xyXG4gIG5hbWUgPSAnQWN0aW9ucyc7XHJcbiAgLyoqXHJcbiAgICogRmllbGQgbmFtZSBpZCBmcm9tIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgZS5nIHVzZXJJZFxyXG4gICAqL1xyXG4gIGlkRmllbGROYW1lID0gJ2lkJztcclxuICAvKipcclxuICAgKiBBY3Rpb25zIGUuZy4gRWRpdCwgRGVsZXRlXHJcbiAgICovXHJcbiAgYWN0aW9uczogQXJyYXk8TWxrTW9yZUFjdGlvbkRhdGE+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihhY3Rpb25zOiBBcnJheTxNbGtNb3JlQWN0aW9uRGF0YT4sIGlkPzogc3RyaW5nLCBuYW1lPzogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuaWRGaWVsZE5hbWUgPSBpZDtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1sa01vcmVBY3Rpb25EYXRhIHtcclxuICAvKipcclxuICAgKiBOZXZlciBtaW5kIHRoaXMgZmllbGQgaXQgd2lsbCBiZSB1c2VkIGJ5IHRoZSBsaWJyYXJ5XHJcbiAgICovXHJcbiAgaWQ/OiBhbnk7XHJcbiAgLyoqXHJcbiAgICogQWN0aW9uIG5hbWUgZS5nLiBFZGl0LCBEZWxldGVcclxuICAgKi9cclxuICBhY3Rpb25OYW1lOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGlvbiByb3cgOiB0aGUgY2xpY2tlZCByb3dcclxuICAgKi9cclxuICBhY3Rpb25Sb3c/OiBhbnk7XHJcbn1cclxuIl19