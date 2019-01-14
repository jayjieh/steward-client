/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Page } from '../entities/wrappers/page';
import { MlkInput, MlkSelect, MlkTextarea } from '../entities/wrappers/mlk-dynamic-control';
import { StewardClientService } from '../steward-client.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Queue } from 'queue-typescript';
// const { Queue } = require('queue-typescript');
export class MlkDatatableComponent {
    /**
     * @param {?} sterwardService
     */
    constructor(sterwardService) {
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
        this.onActionsEvent = new EventEmitter();
        this.filterComponents = [];
        this.page = new Page();
        this.selected = [];
        this.onSelected = new EventEmitter();
        this.filter = {};
    }
    /**
     * Generate form control from filterComponents and also appending default controls ie. date filter and search controls
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const group = {};
        this.filterComponents.forEach(comp => {
            /** @type {?} */
            const validators = [];
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
        request.set('page', pageInfo.offset);
        request.set('size', pageInfo.limit);
        this.sterwardService.get(this.endpoint, request).subscribe(response => {
            if (response.code === 200) {
                this.page = response.data;
            }
        });
    }
    /**
     * Used to handle select option
     * @param {?} __0
     * @return {?}
     */
    onSelect({ selected }) {
        console.log('Select Event', selected, this.selected);
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
        this.onSelected.emit(this.selected);
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
        // @ts-ignore
        /** @type {?} */
        const f = new Map(Object.entries(this.filterForm.value));
        // validate date
        if (!this.filterForm.get('from').touched) {
            f.delete('from');
            // this.filterForm.get('from').setValue('2018-01-01');
        }
        else {
            // f.get('from').setValue(new Date(this.filterForm.get('from').value));
            /** @type {?} */
            const fd = new Date(this.filterForm.get('from').value);
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
            const td = new Date(this.filterForm.get('to').value);
            f.set('to', td.toISOString());
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
     * @param {?} cell
     * @return {?}
     */
    summaryFunc(cell) {
        return (``);
    }
    /**
     * Used to format date to string yyyy-MM-dd
     * @param {?} date
     * @return {?}
     */
    getFormattedDate(date) {
        /** @type {?} */
        const year = date.getFullYear();
        /** @type {?} */
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        /** @type {?} */
        let day = date.getDate().toString();
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
        const k = field.split('.');
        /** @type {?} */
        const keys = new Queue(...k);
        /** @type {?} */
        const value = this.getObjectValue(data, keys);
        return value;
    }
    /**
     * Used to find key value based on the key sequence provided
     * @param {?} data expects an object
     * @param {?} keys i.e. user.gender.type.type
     * @return {?}
     */
    getObjectValue(data, keys) {
        if ((!(data instanceof Object)) || (keys.length === 1)) {
            return data[keys.tail];
        }
        /** @type {?} */
        let value = null;
        Object.keys(data).forEach((key) => {
            if ((key === keys.front) && (data[key] instanceof Object)) {
                value = this.getObjectValue(data[key], keys);
            }
            else if (key === keys.tail) {
                value = data[key];
            }
        });
        return value;
    }
}
MlkDatatableComponent.decorators = [
    { type: Component, args: [{
                selector: 'stw-mlk-datatable',
                template: `<div class="card card-outline-default" *ngIf="enableFilterHeader">
  <div class="card-body">
    <form (ngSubmit)="processFilter(filterForm)" [formGroup]="filterForm">

      <div class="row">
        <div class="col-md-3  mb-3" *ngFor="let control of filterComponents">
          <label>{{control.label}}: </label>
          <div class="input-group">
            <div class="input-group-append">
                <span class="input-group-text  form-icon-default">
                  <i [class]="control.icon"></i>
                </span>
            </div>

            <select *ngIf="isSelect(control.controlType)" class="form-control form-control-sm checking-field"
                    [formControlName]="control.name">
              <option value="" disabled selected>{{control.placeholder}}</option>
              <option *ngFor="let o of control.controlType.options">{{o.text}}</option>
            </select>

            <textarea *ngIf="isTextArea(control.controlType)" [cols]="control.controlType.cols"
                      [rows]="control.controlType.rows" class="form-control form-control-sm checking-field"
                      [placeholder]="control.placeholder" [formControlName]="control.name"></textarea>

            <input *ngIf="isInput(control.controlType)" [type]="control.controlType.type"
                   [placeholder]="control.placeholder" class="form-control form-control-sm checking-field"
                   [formControlName]="control.name"/>
          </div>
          <span class="help-block" *ngIf="filterForm.get(control.name).touched">
              <span class="text-danger"
                    *ngIf="filterForm.get(control.name).hasError('required')">{{control.placeholder}} is required</span>
              <span class="text-danger"
                    *ngIf="filterForm.get(control.name).hasError('minlength')">Minimum of {{control.controlType.minLength}}
                characters</span>
              <span class="text-danger"
                    *ngIf="filterForm.get(control.name).hasError('maxlength')">Maximum of {{control.controlType.maxLength}}
                characters</span>
              <span class="text-danger"
                    *ngIf="filterForm.get(control.name).hasError('min')">Should be greater than {{control.controlType.min}}</span>
              <span class="text-danger"
                    *ngIf="filterForm.get(control.name).hasError('max')">Should be less than {{control.controlType.max}}</span>
            </span>
        </div>
      </div>

      <div class="row" *ngIf="enableDefaultTableHeader">
        <div class="col-md-3 mb-3">
          <label>From: </label>
          <div class="input-group">
            <div class="input-group-append">
                <span class="input-group-text form-icon-default">
                  <i class="fa fa-calendar-o"></i>
                </span>
            </div>
            <input
              type="text"
              class="form-control form-control-sm checking-field"
              id="inputTravelDate"
              formControlName="from"
              placeholder="From..."
              #dpfrom="bsDatepicker"
              bsDatepicker
              [outsideClick]="false"
              [bsConfig]="{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }"
              maxlength="30"
              required
              readonly
            />
            <div class="input-group-append">
              <button class="btn btn-primary" type="button" (click)="dpfrom.toggle()"
                      [attr.aria-expanded]="dpfrom.isOpen"><i class="fa fa-th"></i></button>
            </div>
          </div>
          <span class="help-block" *ngIf="filterForm.get('from').touched">
                <span class="text-danger"
                      *ngIf="filterForm.get('from').hasError('maxlength')">Maximum of 30 characters</span>
            </span>
        </div>
        <div class="col-md-3 mb-3">
          <label>To: </label>
          <div class="input-group">
            <div class="input-group-append">
                <span class="input-group-text form-icon-default">
                  <i class="fa fa-calendar-o"></i>
                </span>
            </div>
            <input
              type="text"
              class="form-control form-control-sm checking-field"
              id="inputTravelDate"
              formControlName="to"
              placeholder="To..."
              #dpto="bsDatepicker"
              bsDatepicker
              [outsideClick]="false"
              [bsConfig]="{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'theme-red' }"
              maxlength="30"
              required
              readonly
            />
            <div class="input-group-append">
              <button class="btn btn-primary" type="button" (click)="dpto.toggle()" [attr.aria-expanded]="dpto.isOpen">
                <i class="fa fa-th"></i></button>
            </div>
          </div>
          <span class="help-block" *ngIf="filterForm.get('to').touched">
                <span class="text-danger"
                      *ngIf="filterForm.get('to').hasError('maxlength')">Maximum of 30 characters</span>
            </span>
        </div>
        <div class="col-md-3 mb-3">
          <label>Search:</label>
          <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text form-icon-default">
                  <i class="fa fa-search"></i>
                </span>
            </div>
            <input formControlName="needle" class="form-control form-control-sm checking-field" type="text"
                   placeholder="Search..." (keyup)="updateFilter($event)"/>
          </div>
        </div>
        <span class="help-block" *ngIf="filterForm.get('from').touched">
              <span class="text-danger"
                    *ngIf="filterForm.get('from').hasError('maxlength')">Maximum of 200 characters</span>
          </span>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="pull-right inline-buttons">
            <button class="btn btn-warning btn-sm" type="reset">
              <i class="fa fa-repeat" aria-hidden="true"></i>
              Reset
            </button>
            <button class="btn btn-success btn-sm pull-right" type="submit">
              <i class="fa fa-filter" aria-hidden="true"></i>
              Filter
            </button>
          </div>
        </div>
      </div>

    </form>
  </div>
</div>

<ngx-datatable
  #table
  [rowHeight]="tableRowHeight"
  [footerHeight]="tableFooterHeight"
  [headerHeight]="tableHeaderHeight"
  [scrollbarV]="verticalScrollActive"
  [scrollbarH]="horizontalScrollActive"
  [summaryRow]="enableSummary"
  [summaryPosition]="summaryPosition"
  [summaryHeight]="summaryHeight"
  class="bootstrap"
  [columnMode]="'force'"
  [rows]="page.content"
  [selected]="selected"
  [selectionType]="'checkbox'"
  (activate)="onActivate($event)"
  (select)='onSelect($event)'
  [count]="page.totalElements"
  [offset]="page.number"
  [externalPaging]="true"
  [limit]="page.size"
  (page)="loadPage($event, null)">
  <ngx-datatable-column [summaryFunc]="summaryFunc" [width]="30" [sortable]="false" [canAutoResize]="false"
                        [draggable]="true" [resizeable]="false" [headerCheckboxable]="true"
                        [checkboxable]="true" *ngIf="enableCheckbox">
  </ngx-datatable-column>
  <ngx-datatable-column [summaryFunc]="summaryFunc" [width]="30" [sortable]="false" [canAutoResize]="false"
                        [draggable]="true" [resizeable]="false" [headerCheckboxable]="true"
                        *ngFor="let c of columns; index as i;">
    <ng-template let-column="column" ngx-datatable-header-template *ngIf="i==0">
      <strong>#</strong>
    </ng-template>
    <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-row="row" *ngIf="i==0">
        <span>
            {{rowIndex + 1}}
        </span>
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column [summaryFunc]="(c.summaryFunc) ? c.summaryFunc : summaryFunc"
                        [canAutoResize]="(c.canAutoResize) ? c.canAutoResize : true" [name]="c.columnName"
                        [width]="c.width"
                        [sortable]="(c.sortable) ? c.sortable : true" [draggable]="(c.draggable) ? c.draggable : true"
                        [resizeable]="(c.resizeable) ? c.resizeable : true"
                        *ngFor="let c of columns; index as i;">
    <ng-template let-column="column" ngx-datatable-header-template *ngIf="i==0">
      <strong>{{c.columnName}}</strong>
    </ng-template>
    <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row" *ngIf="i==0">
        <span>
            <ng-container *ngIf="c.isDateColumn; then t10"></ng-container>
            <ng-container *ngIf="c.isCurrencyColumn && c.currencyText; then t40"></ng-container>
            <ng-container *ngIf="c.isCurrencyColumn && !c.currencyText; then t70"></ng-container>
            <ng-container *ngIf="!c.isDateColumn && !c.isCurrencyColumn; then t70"></ng-container>

            <ng-template #t10>
                {{(getFieldValue(row, c.fieldName) | date:'medium')}}
            </ng-template>
            <ng-template #t40>
                {{(getFieldValue(row, c.fieldName) | currency:c.currencyText:'code')}}
            </ng-template>
            <ng-template #t70>
                {{getFieldValue(row, c.fieldName)}}
            </ng-template>
        </span>
    </ng-template>

    <ng-template let-column="column" ngx-datatable-header-template>
      <strong>{{c.columnName}}</strong>
    </ng-template>
    <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row">
        <span>
            <ng-container *ngIf="c.isDateColumn; then t10"></ng-container>
            <ng-container *ngIf="c.isCurrencyColumn && c.currencyText; then t40"></ng-container>
            <ng-container *ngIf="c.isCurrencyColumn && !c.currencyText; then t70"></ng-container>
            <ng-container *ngIf="!c.isDateColumn && !c.isCurrencyColumn; then t70"></ng-container>

            <ng-template #t10>
                {{(getFieldValue(row, c.fieldName) | date:'medium')}}
            </ng-template>
            <ng-template #t40>
                {{(getFieldValue(row, c.fieldName) | currency:c.currencyText:'code')}}
            </ng-template>
            <ng-template #t70>
                {{getFieldValue(row, c.fieldName)}}
            </ng-template>
        </span>
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column [summaryFunc]="summaryFunc" [name]="moreActions.name" *ngIf="moreActions" [sortable]="false"
                        [canAutoResize]="false">
    <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row">
        <span>
          <div class="input-group-prepend">
            <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
              <i class="fa fa-list-ul" aria-hidden="true"></i>
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" *ngFor="let action of moreActions.actions" href="javascript:;"
                 (click)="onActionClick({id: row[moreActions.idFieldName], actionName: action.actionName, actionRow: row})">{{action.actionName}}</a>
            </div>
          </div>
        </span>
    </ng-template>
  </ngx-datatable-column>
</ngx-datatable>
`,
                styles: [``]
            },] },
];
MlkDatatableComponent.ctorParameters = () => [
    { type: StewardClientService }
];
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
    /**
     * @type {?}
     * @private
     */
    MlkDatatableComponent.prototype.sterwardService;
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
export class MlkMoreActions {
    /**
     * @param {?} actions
     * @param {?=} id
     * @param {?=} name
     */
    constructor(actions, id, name) {
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
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWxrLWRhdGF0YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdGV3YXJkLWNsaWVudC8iLCJzb3VyY2VzIjpbImxpYi9tbGstZGF0YXRhYmxlL21say1kYXRhdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RixPQUFPLEVBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDL0MsT0FBTyxFQUFvQixRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBRTdHLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7QUF1UXZDLE1BQU07Ozs7SUEyQkosWUFBb0IsZUFBc0U7UUFBdEUsb0JBQWUsR0FBZixlQUFlLENBQXVEO1FBMUJqRixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDdkIsc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QiwyQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFDL0IsWUFBTyxHQUE4QixFQUFFLENBQUM7UUFDeEMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFdkIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNqQyxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0Qixv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cUM7O0lBQ3JDLCtDQUFpRTs7SUFDakUsaURBQThEOztJQUM5RCx1Q0FBa0M7O0lBQ2xDLHFDQUE2Qjs7SUFDN0IseUNBQWM7O0lBQ2QsMkNBQXNEOztJQUN0RCxzQ0FBeUQ7O0lBQ3pELHVDQUFvQjs7SUFDcEIsMkNBQXNCOztJQUN0QixpREFBNkI7Ozs7O0lBR2pCLGdEQUE4RTs7Ozs7OztBQXVNNUYsd0NBZ0RDOzs7Ozs7SUE1Q0Msd0NBQW1COzs7OztJQUluQix1Q0FBa0I7Ozs7O0lBSWxCLG1DQUFlOzs7OztJQUlmLHNDQUFtQjs7Ozs7SUFJbkIsMkNBQXdCOzs7OztJQUl4Qix1Q0FBb0I7Ozs7O0lBSXBCLHdDQUFxQjs7Ozs7SUFJckIsMENBQXVCOzs7OztJQUt2Qiw4Q0FBMkI7Ozs7O0lBSzNCLDBDQUFzQjs7Ozs7SUFLdEIseUNBQWtDOzs7OztBQU1wQyxNQUFNOzs7Ozs7SUFjSixZQUFZLE9BQWlDLEVBQUUsRUFBVyxFQUFFLElBQWE7UUFiekU7O1dBRUc7UUFDSCxTQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ2pCOztXQUVHO1FBQ0gsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFPakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztDQUVGOzs7Ozs7SUFoQkMsOEJBQWlCOzs7OztJQUlqQixxQ0FBbUI7Ozs7O0lBSW5CLGlDQUFrQzs7Ozs7QUFVcEMsdUNBY0M7Ozs7OztJQVZDLCtCQUFTOzs7OztJQUlULHVDQUFnQjs7Ozs7SUFLaEIsc0NBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0Zvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtQYWdlfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9wYWdlJztcclxuaW1wb3J0IHtNbGtEeW5hbWljQ29udHJvbCwgTWxrSW5wdXQsIE1sa1NlbGVjdCwgTWxrVGV4dGFyZWF9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL21say1keW5hbWljLWNvbnRyb2wnO1xyXG5pbXBvcnQge1Jlc3BvbnNlV3JhcHBlcn0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcmVzcG9uc2Utd3JhcHBlcic7XHJcbmltcG9ydCB7U3Rld2FyZENsaWVudFNlcnZpY2V9IGZyb20gJy4uL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQge0RhdGF0YWJsZUNvbXBvbmVudH0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xyXG5pbXBvcnQge1F1ZXVlfSBmcm9tICdxdWV1ZS10eXBlc2NyaXB0JztcclxuXHJcbi8vIGNvbnN0IHsgUXVldWUgfSA9IHJlcXVpcmUoJ3F1ZXVlLXR5cGVzY3JpcHQnKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc3R3LW1say1kYXRhdGFibGUnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNhcmQgY2FyZC1vdXRsaW5lLWRlZmF1bHRcIiAqbmdJZj1cImVuYWJsZUZpbHRlckhlYWRlclwiPlxyXG4gIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgIDxmb3JtIChuZ1N1Ym1pdCk9XCJwcm9jZXNzRmlsdGVyKGZpbHRlckZvcm0pXCIgW2Zvcm1Hcm91cF09XCJmaWx0ZXJGb3JtXCI+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zICBtYi0zXCIgKm5nRm9yPVwibGV0IGNvbnRyb2wgb2YgZmlsdGVyQ29tcG9uZW50c1wiPlxyXG4gICAgICAgICAgPGxhYmVsPnt7Y29udHJvbC5sYWJlbH19OiA8L2xhYmVsPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCAgZm9ybS1pY29uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgPGkgW2NsYXNzXT1cImNvbnRyb2wuaWNvblwiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8c2VsZWN0ICpuZ0lmPVwiaXNTZWxlY3QoY29udHJvbC5jb250cm9sVHlwZSlcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCI+XHJcbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkIHNlbGVjdGVkPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgbyBvZiBjb250cm9sLmNvbnRyb2xUeXBlLm9wdGlvbnNcIj57e28udGV4dH19PC9vcHRpb24+XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG5cclxuICAgICAgICAgICAgPHRleHRhcmVhICpuZ0lmPVwiaXNUZXh0QXJlYShjb250cm9sLmNvbnRyb2xUeXBlKVwiIFtjb2xzXT1cImNvbnRyb2wuY29udHJvbFR5cGUuY29sc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICBbcm93c109XCJjb250cm9sLmNvbnRyb2xUeXBlLnJvd3NcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNvbnRyb2wucGxhY2Vob2xkZXJcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiPjwvdGV4dGFyZWE+XHJcblxyXG4gICAgICAgICAgICA8aW5wdXQgKm5nSWY9XCJpc0lucHV0KGNvbnRyb2wuY29udHJvbFR5cGUpXCIgW3R5cGVdPVwiY29udHJvbC5jb250cm9sVHlwZS50eXBlXCJcclxuICAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCJcclxuICAgICAgICAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiY29udHJvbC5uYW1lXCIvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkudG91Y2hlZFwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcigncmVxdWlyZWQnKVwiPnt7Y29udHJvbC5wbGFjZWhvbGRlcn19IGlzIHJlcXVpcmVkPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWlubGVuZ3RoJylcIj5NaW5pbXVtIG9mIHt7Y29udHJvbC5jb250cm9sVHlwZS5taW5MZW5ndGh9fVxyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyczwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiB7e2NvbnRyb2wuY29udHJvbFR5cGUubWF4TGVuZ3RofX1cclxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcnM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtaW4nKVwiPlNob3VsZCBiZSBncmVhdGVyIHRoYW4ge3tjb250cm9sLmNvbnRyb2xUeXBlLm1pbn19PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWF4JylcIj5TaG91bGQgYmUgbGVzcyB0aGFuIHt7Y29udHJvbC5jb250cm9sVHlwZS5tYXh9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIiAqbmdJZj1cImVuYWJsZURlZmF1bHRUYWJsZUhlYWRlclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCI+XHJcbiAgICAgICAgICA8bGFiZWw+RnJvbTogPC9sYWJlbD5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgZm9ybS1pY29uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhci1vXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXHJcbiAgICAgICAgICAgICAgaWQ9XCJpbnB1dFRyYXZlbERhdGVcIlxyXG4gICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cImZyb21cIlxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRnJvbS4uLlwiXHJcbiAgICAgICAgICAgICAgI2RwZnJvbT1cImJzRGF0ZXBpY2tlclwiXHJcbiAgICAgICAgICAgICAgYnNEYXRlcGlja2VyXHJcbiAgICAgICAgICAgICAgW291dHNpZGVDbGlja109XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgW2JzQ29uZmlnXT1cInsgZGF0ZUlucHV0Rm9ybWF0OiAnREQtTU0tWVlZWScsIGNvbnRhaW5lckNsYXNzOiAndGhlbWUtcmVkJyB9XCJcclxuICAgICAgICAgICAgICBtYXhsZW5ndGg9XCIzMFwiXHJcbiAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgICByZWFkb25seVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiZHBmcm9tLnRvZ2dsZSgpXCJcclxuICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiZHBmcm9tLmlzT3BlblwiPjxpIGNsYXNzPVwiZmEgZmEtdGhcIj48L2k+PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykudG91Y2hlZFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiAzMCBjaGFyYWN0ZXJzPC9zcGFuPlxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIG1iLTNcIj5cclxuICAgICAgICAgIDxsYWJlbD5UbzogPC9sYWJlbD5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgZm9ybS1pY29uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhci1vXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXHJcbiAgICAgICAgICAgICAgaWQ9XCJpbnB1dFRyYXZlbERhdGVcIlxyXG4gICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cInRvXCJcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlRvLi4uXCJcclxuICAgICAgICAgICAgICAjZHB0bz1cImJzRGF0ZXBpY2tlclwiXHJcbiAgICAgICAgICAgICAgYnNEYXRlcGlja2VyXHJcbiAgICAgICAgICAgICAgW291dHNpZGVDbGlja109XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgW2JzQ29uZmlnXT1cInsgZGF0ZUlucHV0Rm9ybWF0OiAnREQtTU0tWVlZWScsIGNvbnRhaW5lckNsYXNzOiAndGhlbWUtcmVkJyB9XCJcclxuICAgICAgICAgICAgICBtYXhsZW5ndGg9XCIzMFwiXHJcbiAgICAgICAgICAgICAgcmVxdWlyZWRcclxuICAgICAgICAgICAgICByZWFkb25seVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiZHB0by50b2dnbGUoKVwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiZHB0by5pc09wZW5cIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdGhcIj48L2k+PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCd0bycpLnRvdWNoZWRcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgndG8nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDMwIGNoYXJhY3RlcnM8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgbWItM1wiPlxyXG4gICAgICAgICAgPGxhYmVsPlNlYXJjaDo8L2xhYmVsPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgZm9ybS1pY29uLWRlZmF1bHRcIj5cclxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1zZWFyY2hcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8aW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwibmVlZGxlXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCIgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2guLi5cIiAoa2V5dXApPVwidXBkYXRlRmlsdGVyKCRldmVudClcIi8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImhlbHAtYmxvY2tcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykudG91Y2hlZFwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDIwMCBjaGFyYWN0ZXJzPC9zcGFuPlxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHVsbC1yaWdodCBpbmxpbmUtYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nIGJ0bi1zbVwiIHR5cGU9XCJyZXNldFwiPlxyXG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcmVwZWF0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxyXG4gICAgICAgICAgICAgIFJlc2V0XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGJ0bi1zbSBwdWxsLXJpZ2h0XCIgdHlwZT1cInN1Ym1pdFwiPlxyXG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtZmlsdGVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxyXG4gICAgICAgICAgICAgIEZpbHRlclxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICA8L2Zvcm0+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG5cclxuPG5neC1kYXRhdGFibGVcclxuICAjdGFibGVcclxuICBbcm93SGVpZ2h0XT1cInRhYmxlUm93SGVpZ2h0XCJcclxuICBbZm9vdGVySGVpZ2h0XT1cInRhYmxlRm9vdGVySGVpZ2h0XCJcclxuICBbaGVhZGVySGVpZ2h0XT1cInRhYmxlSGVhZGVySGVpZ2h0XCJcclxuICBbc2Nyb2xsYmFyVl09XCJ2ZXJ0aWNhbFNjcm9sbEFjdGl2ZVwiXHJcbiAgW3Njcm9sbGJhckhdPVwiaG9yaXpvbnRhbFNjcm9sbEFjdGl2ZVwiXHJcbiAgW3N1bW1hcnlSb3ddPVwiZW5hYmxlU3VtbWFyeVwiXHJcbiAgW3N1bW1hcnlQb3NpdGlvbl09XCJzdW1tYXJ5UG9zaXRpb25cIlxyXG4gIFtzdW1tYXJ5SGVpZ2h0XT1cInN1bW1hcnlIZWlnaHRcIlxyXG4gIGNsYXNzPVwiYm9vdHN0cmFwXCJcclxuICBbY29sdW1uTW9kZV09XCInZm9yY2UnXCJcclxuICBbcm93c109XCJwYWdlLmNvbnRlbnRcIlxyXG4gIFtzZWxlY3RlZF09XCJzZWxlY3RlZFwiXHJcbiAgW3NlbGVjdGlvblR5cGVdPVwiJ2NoZWNrYm94J1wiXHJcbiAgKGFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50KVwiXHJcbiAgKHNlbGVjdCk9J29uU2VsZWN0KCRldmVudCknXHJcbiAgW2NvdW50XT1cInBhZ2UudG90YWxFbGVtZW50c1wiXHJcbiAgW29mZnNldF09XCJwYWdlLm51bWJlclwiXHJcbiAgW2V4dGVybmFsUGFnaW5nXT1cInRydWVcIlxyXG4gIFtsaW1pdF09XCJwYWdlLnNpemVcIlxyXG4gIChwYWdlKT1cImxvYWRQYWdlKCRldmVudCwgbnVsbClcIj5cclxuICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gW3N1bW1hcnlGdW5jXT1cInN1bW1hcnlGdW5jXCIgW3dpZHRoXT1cIjMwXCIgW3NvcnRhYmxlXT1cImZhbHNlXCIgW2NhbkF1dG9SZXNpemVdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbZHJhZ2dhYmxlXT1cInRydWVcIiBbcmVzaXplYWJsZV09XCJmYWxzZVwiIFtoZWFkZXJDaGVja2JveGFibGVdPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjaGVja2JveGFibGVdPVwidHJ1ZVwiICpuZ0lmPVwiZW5hYmxlQ2hlY2tib3hcIj5cclxuICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxyXG4gIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBbc3VtbWFyeUZ1bmNdPVwic3VtbWFyeUZ1bmNcIiBbd2lkdGhdPVwiMzBcIiBbc29ydGFibGVdPVwiZmFsc2VcIiBbY2FuQXV0b1Jlc2l6ZV09XCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkcmFnZ2FibGVdPVwidHJ1ZVwiIFtyZXNpemVhYmxlXT1cImZhbHNlXCIgW2hlYWRlckNoZWNrYm94YWJsZV09XCJ0cnVlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGMgb2YgY29sdW1uczsgaW5kZXggYXMgaTtcIj5cclxuICAgIDxuZy10ZW1wbGF0ZSBsZXQtY29sdW1uPVwiY29sdW1uXCIgbmd4LWRhdGF0YWJsZS1oZWFkZXItdGVtcGxhdGUgKm5nSWY9XCJpPT0wXCI+XHJcbiAgICAgIDxzdHJvbmc+Izwvc3Ryb25nPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtcm93PVwicm93XCIgKm5nSWY9XCJpPT0wXCI+XHJcbiAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgIHt7cm93SW5kZXggKyAxfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XHJcbiAgPG5neC1kYXRhdGFibGUtY29sdW1uIFtzdW1tYXJ5RnVuY109XCIoYy5zdW1tYXJ5RnVuYykgPyBjLnN1bW1hcnlGdW5jIDogc3VtbWFyeUZ1bmNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2FuQXV0b1Jlc2l6ZV09XCIoYy5jYW5BdXRvUmVzaXplKSA/IGMuY2FuQXV0b1Jlc2l6ZSA6IHRydWVcIiBbbmFtZV09XCJjLmNvbHVtbk5hbWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbd2lkdGhdPVwiYy53aWR0aFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtzb3J0YWJsZV09XCIoYy5zb3J0YWJsZSkgPyBjLnNvcnRhYmxlIDogdHJ1ZVwiIFtkcmFnZ2FibGVdPVwiKGMuZHJhZ2dhYmxlKSA/IGMuZHJhZ2dhYmxlIDogdHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtyZXNpemVhYmxlXT1cIihjLnJlc2l6ZWFibGUpID8gYy5yZXNpemVhYmxlIDogdHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjIG9mIGNvbHVtbnM7IGluZGV4IGFzIGk7XCI+XHJcbiAgICA8bmctdGVtcGxhdGUgbGV0LWNvbHVtbj1cImNvbHVtblwiIG5neC1kYXRhdGFibGUtaGVhZGVyLXRlbXBsYXRlICpuZ0lmPVwiaT09MFwiPlxyXG4gICAgICA8c3Ryb25nPnt7Yy5jb2x1bW5OYW1lfX08L3N0cm9uZz5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXZhbHVlPVwidmFsdWVcIiBsZXQtcm93PVwicm93XCIgKm5nSWY9XCJpPT0wXCI+XHJcbiAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjLmlzRGF0ZUNvbHVtbjsgdGhlbiB0MTBcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImMuaXNDdXJyZW5jeUNvbHVtbiAmJiBjLmN1cnJlbmN5VGV4dDsgdGhlbiB0NDBcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImMuaXNDdXJyZW5jeUNvbHVtbiAmJiAhYy5jdXJyZW5jeVRleHQ7IHRoZW4gdDcwXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhYy5pc0RhdGVDb2x1bW4gJiYgIWMuaXNDdXJyZW5jeUNvbHVtbjsgdGhlbiB0NzBcIj48L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdDEwPlxyXG4gICAgICAgICAgICAgICAge3soZ2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKSB8IGRhdGU6J21lZGl1bScpfX1cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICN0NDA+XHJcbiAgICAgICAgICAgICAgICB7eyhnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpIHwgY3VycmVuY3k6Yy5jdXJyZW5jeVRleHQ6J2NvZGUnKX19XHJcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdDcwPlxyXG4gICAgICAgICAgICAgICAge3tnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpfX1cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG5cclxuICAgIDxuZy10ZW1wbGF0ZSBsZXQtY29sdW1uPVwiY29sdW1uXCIgbmd4LWRhdGF0YWJsZS1oZWFkZXItdGVtcGxhdGU+XHJcbiAgICAgIDxzdHJvbmc+e3tjLmNvbHVtbk5hbWV9fTwvc3Ryb25nPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtdmFsdWU9XCJ2YWx1ZVwiIGxldC1yb3c9XCJyb3dcIj5cclxuICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImMuaXNEYXRlQ29sdW1uOyB0aGVuIHQxMFwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYy5pc0N1cnJlbmN5Q29sdW1uICYmIGMuY3VycmVuY3lUZXh0OyB0aGVuIHQ0MFwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYy5pc0N1cnJlbmN5Q29sdW1uICYmICFjLmN1cnJlbmN5VGV4dDsgdGhlbiB0NzBcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjLmlzRGF0ZUNvbHVtbiAmJiAhYy5pc0N1cnJlbmN5Q29sdW1uOyB0aGVuIHQ3MFwiPjwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICN0MTA+XHJcbiAgICAgICAgICAgICAgICB7eyhnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpIHwgZGF0ZTonbWVkaXVtJyl9fVxyXG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI3Q0MD5cclxuICAgICAgICAgICAgICAgIHt7KGdldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSkgfCBjdXJyZW5jeTpjLmN1cnJlbmN5VGV4dDonY29kZScpfX1cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICN0NzA+XHJcbiAgICAgICAgICAgICAgICB7e2dldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSl9fVxyXG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cclxuICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gW3N1bW1hcnlGdW5jXT1cInN1bW1hcnlGdW5jXCIgW25hbWVdPVwibW9yZUFjdGlvbnMubmFtZVwiICpuZ0lmPVwibW9yZUFjdGlvbnNcIiBbc29ydGFibGVdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2FuQXV0b1Jlc2l6ZV09XCJmYWxzZVwiPlxyXG4gICAgPG5nLXRlbXBsYXRlIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZSBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiIGxldC12YWx1ZT1cInZhbHVlXCIgbGV0LXJvdz1cInJvd1wiPlxyXG4gICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLXByZXBlbmRcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc20gYnRuLW91dGxpbmUtc2Vjb25kYXJ5IGRyb3Bkb3duLXRvZ2dsZVwiIHR5cGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJcclxuICAgICAgICAgICAgICAgICAgICBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCI+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1saXN0LXVsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj5cclxuICAgICAgICAgICAgICA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIG1vcmVBY3Rpb25zLmFjdGlvbnNcIiBocmVmPVwiamF2YXNjcmlwdDo7XCJcclxuICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25BY3Rpb25DbGljayh7aWQ6IHJvd1ttb3JlQWN0aW9ucy5pZEZpZWxkTmFtZV0sIGFjdGlvbk5hbWU6IGFjdGlvbi5hY3Rpb25OYW1lLCBhY3Rpb25Sb3c6IHJvd30pXCI+e3thY3Rpb24uYWN0aW9uTmFtZX19PC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cclxuPC9uZ3gtZGF0YXRhYmxlPlxyXG5gLFxyXG4gIHN0eWxlczogW2BgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWxrRGF0YXRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSB0YWJsZVJvd0hlaWdodCA9IDUwO1xyXG4gIEBJbnB1dCgpIHRhYmxlRm9vdGVySGVpZ2h0ID0gNTA7XHJcbiAgQElucHV0KCkgdGFibGVIZWFkZXJIZWlnaHQgPSA1MDtcclxuICBASW5wdXQoKSB2ZXJ0aWNhbFNjcm9sbEFjdGl2ZSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGhvcml6b250YWxTY3JvbGxBY3RpdmUgPSBmYWxzZTtcclxuICBASW5wdXQoKSBjb2x1bW5zOiBBcnJheTxNbGtEYXRhVGFibGVDb2x1bW4+ID0gW107XHJcbiAgQElucHV0KCkgZW5hYmxlQ2hlY2tib3ggPSBmYWxzZTtcclxuICBASW5wdXQoKSBlbmRwb2ludDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGVuYWJsZUZpbHRlckhlYWRlciA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGVuYWJsZURlZmF1bHRUYWJsZUhlYWRlciA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGVuYWJsZVN1bW1hcnkgPSBmYWxzZTtcclxuICBASW5wdXQoKSBzdW1tYXJ5UG9zaXRpb24gPSAnXFwnYm90dG9tXFwnJztcclxuICBASW5wdXQoKSBzdW1tYXJ5SGVpZ2h0ID0gJ1xcJ2F1dG9cXCcnO1xyXG4gIEBJbnB1dCgpIG1vcmVBY3Rpb25zOiBNbGtNb3JlQWN0aW9ucztcclxuICBAT3V0cHV0KCkgb25BY3Rpb25zRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPE1sa01vcmVBY3Rpb25EYXRhPigpO1xyXG4gIEBJbnB1dCgpIGZpbHRlckNvbXBvbmVudHM6IEFycmF5PE1sa0R5bmFtaWNDb250cm9sPGFueT4+ID0gW107XHJcbiAgQElucHV0KCkgcGFyYW1zOiBNYXA8c3RyaW5nLCBhbnk+O1xyXG4gIHBhZ2U6IFBhZ2U8YW55PiA9IG5ldyBQYWdlKCk7XHJcbiAgc2VsZWN0ZWQgPSBbXTtcclxuICBAT3V0cHV0KCkgb25TZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4oKTtcclxuICBAVmlld0NoaWxkKERhdGF0YWJsZUNvbXBvbmVudCkgdGFibGU6IERhdGF0YWJsZUNvbXBvbmVudDtcclxuICBmaWx0ZXI6IE9iamVjdCA9IHt9O1xyXG4gIGZpbHRlckZvcm06IEZvcm1Hcm91cDtcclxuICBlbXB0eVN1bW1hcnlGdW5jOiAoKSA9PiBudWxsO1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdGVyd2FyZFNlcnZpY2U6IFN0ZXdhcmRDbGllbnRTZXJ2aWNlPFJlc3BvbnNlV3JhcHBlcjxQYWdlPGFueT4+LCBhbnk+KSB7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZW5lcmF0ZSBmb3JtIGNvbnRyb2wgZnJvbSBmaWx0ZXJDb21wb25lbnRzIGFuZCBhbHNvIGFwcGVuZGluZyBkZWZhdWx0IGNvbnRyb2xzIGllLiBkYXRlIGZpbHRlciBhbmQgc2VhcmNoIGNvbnRyb2xzXHJcbiAgICovXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBncm91cCA9IHt9O1xyXG4gICAgdGhpcy5maWx0ZXJDb21wb25lbnRzLmZvckVhY2goY29tcCA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbGlkYXRvcnM6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgaWYgKGNvbXAuaXNSZXF1aXJlZCkge1xyXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBNbGtJbnB1dCB8fCBjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgTWxrVGV4dGFyZWEpIHtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW5MZW5ndGgoY29tcC5jb250cm9sVHlwZS5taW5MZW5ndGgpKTtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5tYXhMZW5ndGgoY29tcC5jb250cm9sVHlwZS5tYXhMZW5ndGgpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBNbGtJbnB1dCkge1xyXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1heChjb21wLmNvbnRyb2xUeXBlLm1heCkpO1xyXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbihjb21wLmNvbnRyb2xUeXBlLm1pbikpO1xyXG4gICAgICB9XHJcbiAgICAgIGdyb3VwW2NvbXAubmFtZV0gPSBuZXcgRm9ybUNvbnRyb2woJycsIHZhbGlkYXRvcnMpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBhZGQgZGVmYXVsdCBjb250cm9sc1xyXG4gICAgZ3JvdXBbJ2Zyb20nXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMzApKTtcclxuICAgIGdyb3VwWyd0byddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgzMCkpO1xyXG4gICAgZ3JvdXBbJ25lZWRsZSddID0gbmV3IEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLm1heExlbmd0aCgyMDApKTtcclxuICAgIHRoaXMuZmlsdGVyRm9ybSA9IG5ldyBGb3JtR3JvdXAoZ3JvdXApO1xyXG4gICAgdGhpcy5sb2FkUGFnZSh7b2Zmc2V0OiAwLCBsaW1pdDogdGhpcy5wYWdlLnNpemV9LCBudWxsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gZW1pdCBjbGljayBldmVudCBvZiB0aGUgYWN0aW9uc1xyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIG9uQWN0aW9uQ2xpY2soZXZlbnQ6IE1sa01vcmVBY3Rpb25EYXRhKSB7XHJcbiAgICB0aGlzLm9uQWN0aW9uc0V2ZW50LmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJvY2VzcyBzZXJ2ZXIgcmVxdWVzdCBvZiBkYXRhYmxlXHJcbiAgICogQHBhcmFtIHBhZ2VJbmZvXHJcbiAgICogQHBhcmFtIGZpbHRlcnNcclxuICAgKi9cclxuICBsb2FkUGFnZShwYWdlSW5mbywgZmlsdGVycykge1xyXG4gICAgaWYgKCF0aGlzLmVuZHBvaW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCByZXF1ZXN0OiBNYXA8c3RyaW5nLCBhbnk+O1xyXG4gICAgaWYgKGZpbHRlcnMpIHtcclxuICAgICAgcmVxdWVzdCA9IGZpbHRlcnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXF1ZXN0ID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucGFyYW1zKSB7XHJcbiAgICAgIHRoaXMucGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcclxuICAgICAgICByZXF1ZXN0LnNldChrZXksIHZhbHVlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXF1ZXN0LnNldCgncGFnZScsIHBhZ2VJbmZvLm9mZnNldCk7XHJcbiAgICByZXF1ZXN0LnNldCgnc2l6ZScsIHBhZ2VJbmZvLmxpbWl0KTtcclxuICAgIHRoaXMuc3RlcndhcmRTZXJ2aWNlLmdldCh0aGlzLmVuZHBvaW50LCByZXF1ZXN0KS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xyXG4gICAgICBpZiAocmVzcG9uc2UuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBoYW5kbGUgc2VsZWN0IG9wdGlvblxyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqL1xyXG4gIG9uU2VsZWN0KHtzZWxlY3RlZH0pIHtcclxuICAgIGNvbnNvbGUubG9nKCdTZWxlY3QgRXZlbnQnLCBzZWxlY3RlZCwgdGhpcy5zZWxlY3RlZCk7XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZC5zcGxpY2UoMCwgdGhpcy5zZWxlY3RlZC5sZW5ndGgpO1xyXG4gICAgdGhpcy5zZWxlY3RlZC5wdXNoKC4uLnNlbGVjdGVkKTtcclxuICAgIHRoaXMub25TZWxlY3RlZC5lbWl0KHRoaXMuc2VsZWN0ZWQpO1xyXG4gIH1cclxuXHJcbiAgb25BY3RpdmF0ZShldmVudCkge1xyXG5cclxuICB9XHJcblxyXG4gIHVwZGF0ZUZpbHRlcihldmVudCkge1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gcHJvY2VzcyB0YWJsZSBmaWx0ZXIuIElmIGRhdGUgZmlsdGVyIGlzIG5vdCBwcm92aWRlIHRoZSBmcm9tIHZhbHVlIGlzXHJcbiAgICogc2V0IHRvIDIwMTgtMDEtMDEgYW5kIHRvIHZhbHVlIGlzIHNldCB0byAxIHllYXIgZnJvbSB0b2RheVxyXG4gICAqIEBwYXJhbSBmb3JtXHJcbiAgICovXHJcbiAgcHJvY2Vzc0ZpbHRlcihmb3JtKSB7XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBjb25zdCBmOiBNYXA8U3RyaW5nLCBhbnk+ID0gbmV3IE1hcChPYmplY3QuZW50cmllcyh0aGlzLmZpbHRlckZvcm0udmFsdWUpKTtcclxuICAgIC8vIHZhbGlkYXRlIGRhdGVcclxuICAgIGlmICghdGhpcy5maWx0ZXJGb3JtLmdldCgnZnJvbScpLnRvdWNoZWQpIHsvLyBpZiBmcm9tIGlzIG5vdCBwb3B1bGF0ZWQgcmVtb3ZlIGZyb20gcmVxdWVzdFxyXG4gICAgICBmLmRlbGV0ZSgnZnJvbScpO1xyXG4gICAgICAvLyB0aGlzLmZpbHRlckZvcm0uZ2V0KCdmcm9tJykuc2V0VmFsdWUoJzIwMTgtMDEtMDEnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGYuZ2V0KCdmcm9tJykuc2V0VmFsdWUobmV3IERhdGUodGhpcy5maWx0ZXJGb3JtLmdldCgnZnJvbScpLnZhbHVlKSk7XHJcbiAgICAgIGNvbnN0IGZkID0gbmV3IERhdGUodGhpcy5maWx0ZXJGb3JtLmdldCgnZnJvbScpLnZhbHVlKTtcclxuICAgICAgZi5zZXQoJ2Zyb20nLCBmZC50b0lTT1N0cmluZygpKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5maWx0ZXJGb3JtLmdldCgndG8nKS50b3VjaGVkKSB7Ly8gaWYgdG8gaXMgbm90IHBvcHVsYXRlZCByZW1vdmUgZnJvbSByZXF1ZXN0XHJcbiAgICAgIGYuZGVsZXRlKCd0bycpO1xyXG4gICAgICAvLyBsZXQgdG9EYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgLy8gdG9EYXRlLnNldERhdGUodG9EYXRlLmdldEZ1bGxZZWFyKCkgKyAxKTtcclxuICAgICAgLy8gdGhpcy5maWx0ZXJGb3JtLmdldCgndG8nKS5zZXRWYWx1ZSh0aGlzLmdldEZvcm1hdHRlZERhdGUodG9EYXRlKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBmLmdldCgndG8nKS5zZXRWYWx1ZShuZXcgRGF0ZSh0aGlzLmZpbHRlckZvcm0uZ2V0KCd0bycpLnZhbHVlKSk7XHJcbiAgICAgIGNvbnN0IHRkID0gbmV3IERhdGUodGhpcy5maWx0ZXJGb3JtLmdldCgndG8nKS52YWx1ZSk7XHJcbiAgICAgIGYuc2V0KCd0bycsIHRkLnRvSVNPU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubG9hZFBhZ2Uoe29mZnNldDogdGhpcy5wYWdlLm51bWJlciwgbGltaXQ6IHRoaXMucGFnZS5zaXplfSwgZik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIGlucHV0XHJcbiAgICogQHBhcmFtIGNvbnRyb2xcclxuICAgKi9cclxuICBpc0lucHV0KGNvbnRyb2w6IGFueSkge1xyXG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBNbGtJbnB1dDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgc2VsZWN0XHJcbiAgICogQHBhcmFtIGNvbnRyb2xcclxuICAgKi9cclxuICBpc1NlbGVjdChjb250cm9sOiBhbnkpIHtcclxuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgTWxrU2VsZWN0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyB0ZXh0YXJlYVxyXG4gICAqL1xyXG4gIGlzVGV4dEFyZWEoY29udHJvbDogYW55KSB7XHJcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIE1sa1RleHRhcmVhO1xyXG4gIH1cclxuXHJcbiAgc3VtbWFyeUZ1bmMoY2VsbDogYW55KSB7XHJcbiAgICByZXR1cm4gKGBgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gZm9ybWF0IGRhdGUgdG8gc3RyaW5nIHl5eXktTU0tZGRcclxuICAgKiBAcGFyYW0gZGF0ZVxyXG4gICAqL1xyXG4gIGdldEZvcm1hdHRlZERhdGUoZGF0ZSkge1xyXG4gICAgY29uc3QgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICBsZXQgbW9udGggPSAoMSArIGRhdGUuZ2V0TW9udGgoKSkudG9TdHJpbmcoKTtcclxuICAgIG1vbnRoID0gbW9udGgubGVuZ3RoID4gMSA/IG1vbnRoIDogJzAnICsgbW9udGg7XHJcblxyXG4gICAgbGV0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCk7XHJcbiAgICBkYXkgPSBkYXkubGVuZ3RoID4gMSA/IGRheSA6ICcwJyArIGRheTtcclxuXHJcbiAgICByZXR1cm4geWVhciArICctJyArIG1vbnRoICsgJy0nICsgZGF5O1xyXG4gIH1cclxuXHJcbiAgZ2V0RmllbGRWYWx1ZShkYXRhOiBPYmplY3QsIGZpZWxkOiBhbnkpIHtcclxuICAgIGNvbnN0IGs6IEFycmF5PHN0cmluZz4gPSBmaWVsZC5zcGxpdCgnLicpO1xyXG4gICAgY29uc3Qga2V5cyA9IG5ldyBRdWV1ZTxzdHJpbmc+KC4uLmspO1xyXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldE9iamVjdFZhbHVlKGRhdGEsIGtleXMpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBmaW5kIGtleSB2YWx1ZSBiYXNlZCBvbiB0aGUga2V5IHNlcXVlbmNlIHByb3ZpZGVkXHJcbiAgICogQHBhcmFtIGRhdGEgZXhwZWN0cyBhbiBvYmplY3RcclxuICAgKiBAcGFyYW0ga2V5cyBpLmUuIHVzZXIuZ2VuZGVyLnR5cGUudHlwZVxyXG4gICAqL1xyXG4gIGdldE9iamVjdFZhbHVlKGRhdGE6IGFueSwga2V5czogUXVldWU8c3RyaW5nPikge1xyXG4gICAgaWYgKCghKGRhdGEgaW5zdGFuY2VvZiBPYmplY3QpKSB8fCAoa2V5cy5sZW5ndGggPT09IDEpKSB7XHJcbiAgICAgIHJldHVybiBkYXRhW2tleXMudGFpbF07XHJcbiAgICB9XHJcbiAgICBsZXQgdmFsdWUgPSBudWxsO1xyXG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgIGlmICgoa2V5ID09PSBrZXlzLmZyb250KSAmJiAoZGF0YVtrZXldIGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgIHZhbHVlID0gdGhpcy5nZXRPYmplY3RWYWx1ZShkYXRhW2tleV0sIGtleXMpO1xyXG4gICAgICB9IGVsc2UgaWYgKGtleSA9PT0ga2V5cy50YWlsKSB7XHJcbiAgICAgICAgdmFsdWUgPSBkYXRhW2tleV07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG5cclxuICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICogVXNlZCB0byBkZWZpbmUgZGF0YXRhYmxlIGNvbHVtbnMgd2l0aCBhdHRyaWJ1dGVzIChjb2x1bW5OYW1lLCBmaWVsZE5hbWUsIHdpZHRoLCBzb3J0YWJsZSwgY2FuQXV0b1Jlc2l6ZSxcclxuICogZHJhZ2dhYmxlLCByZXNpemFibGUsIGlzRGF0ZUNvbHVtbiwgaXNDdXJyZW5jeUNvbHVtbiwgY3VycmVuY3lUZXh0LCBzdW1tYXJ5RnVuYylcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWxrRGF0YVRhYmxlQ29sdW1uIHtcclxuICAvKipcclxuICAgKiBjb2x1bW4gdGl0bGVcclxuICAgKi9cclxuICBjb2x1bW5OYW1lOiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogU2VydmVyIHNpZGUgcmVzcG9uc2UgZmllbGQgY29ycmVzcG9uZGluZyB0byB0aGUgY29sdW1uIGkuZSBmdWxsTmFtZSBtYXkgY29ycmVzcG9uZCB0byBOYW1lIGNvbHVtblxyXG4gICAqL1xyXG4gIGZpZWxkTmFtZTogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIFdpZHRoIG9mIHRoZSBjb2x1bW5cclxuICAgKi9cclxuICB3aWR0aD86IG51bWJlcjtcclxuICAvKipcclxuICAgKiBFbmFibGUgc29ydGluZyBpbiBhIGNvbHVtblxyXG4gICAqL1xyXG4gIHNvcnRhYmxlPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBNYWtlcyBhIGNvbHVtbiByZXNpemFibGVcclxuICAgKi9cclxuICBjYW5BdXRvUmVzaXplPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBFbmFibGVzIGEgY29sdW1uIHRvIGJlIGRyYWdnYWJsZVxyXG4gICAqL1xyXG4gIGRyYWdnYWJsZT86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogTWFrZXMgYSBjb2x1bW4gcmVzaXphYmxlXHJcbiAgICovXHJcbiAgcmVzaXplYWJsZT86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBlbmFibGUgZm9ybWF0aW5nIHRpbWVzdGFtcCB0byBzdHJpbmcgZGF0ZVxyXG4gICAqL1xyXG4gIGlzRGF0ZUNvbHVtbj86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gZW5hYmxlIGZvcm1hdGluZyBzdHJpbmcgdG8gc3RyaW5nIGN1cnJlbmN5XHJcbiAgICovXHJcbiAgaXNDdXJyZW5jeUNvbHVtbj86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gc2V0IHRoZSBjdXJyZW5jeSBzdHJpbmdcclxuICAgKi9cclxuICBjdXJyZW5jeVRleHQ/OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZ1bmN0aW9uIHRvIGNhbGwgYXQgdGhlIHN1bW1hcnkgcm93XHJcbiAgICovXHJcbiAgc3VtbWFyeUZ1bmM/OiAoYW55OiBhbnlbXSkgPT4gYW55O1xyXG59XHJcblxyXG4vKipcclxuICogVXNlZCB0byBkaXNwbGF5IG1vcmUgYWN0aW9ucyBjb2x1bW4gYW5kIHRoZSBlbmQgb2YgdGhlIHRhYmxlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWxrTW9yZUFjdGlvbnMge1xyXG4gIC8qKlxyXG4gICAqIEFjdGlvbiBDb2x1bW4gbmFtZSBlLmcuIE1vcmUgQWN0aW9uc1xyXG4gICAqL1xyXG4gIG5hbWUgPSAnQWN0aW9ucyc7XHJcbiAgLyoqXHJcbiAgICogRmllbGQgbmFtZSBpZCBmcm9tIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgZS5nIHVzZXJJZFxyXG4gICAqL1xyXG4gIGlkRmllbGROYW1lID0gJ2lkJztcclxuICAvKipcclxuICAgKiBBY3Rpb25zIGUuZy4gRWRpdCwgRGVsZXRlXHJcbiAgICovXHJcbiAgYWN0aW9uczogQXJyYXk8TWxrTW9yZUFjdGlvbkRhdGE+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihhY3Rpb25zOiBBcnJheTxNbGtNb3JlQWN0aW9uRGF0YT4sIGlkPzogc3RyaW5nLCBuYW1lPzogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuaWRGaWVsZE5hbWUgPSBpZDtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE1sa01vcmVBY3Rpb25EYXRhIHtcclxuICAvKipcclxuICAgKiBOZXZlciBtaW5kIHRoaXMgZmllbGQgaXQgd2lsbCBiZSB1c2VkIGJ5IHRoZSBsaWJyYXJ5XHJcbiAgICovXHJcbiAgaWQ/OiBhbnk7XHJcbiAgLyoqXHJcbiAgICogQWN0aW9uIG5hbWUgZS5nLiBFZGl0LCBEZWxldGVcclxuICAgKi9cclxuICBhY3Rpb25OYW1lOiBhbnk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFjdGlvbiByb3cgOiB0aGUgY2xpY2tlZCByb3dcclxuICAgKi9cclxuICBhY3Rpb25Sb3c/OiBhbnk7XHJcbn1cclxuIl19