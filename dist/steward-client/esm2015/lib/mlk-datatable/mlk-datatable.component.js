/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
              <span class="text-danger" *ngIf="filterForm.get(control.name).hasError('required')">{{control.placeholder}} is required</span>
              <span class="text-danger" *ngIf="filterForm.get(control.name).hasError('minlength')">Minimum of {{control.controlType.minLength}} characters</span>
              <span class="text-danger" *ngIf="filterForm.get(control.name).hasError('maxlength')">Maximum of {{control.controlType.maxLength}} characters</span>
              <span class="text-danger" *ngIf="filterForm.get(control.name).hasError('min')">Should be greater than {{control.controlType.min}}</span>
              <span class="text-danger" *ngIf="filterForm.get(control.name).hasError('max')">Should be less than {{control.controlType.max}}</span>
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
  <ngx-datatable-column [summaryFunc]="(c.summaryFunc) ? c.summaryFunc : summaryFunc"
                        [canAutoResize]="(c.canAutoResize) ? c.canAutoResize : true" [name]="c.columnName"
                        [width]="c.width"
                        [sortable]="(c.sortable) ? c.sortable : true" [draggable]="(c.draggable) ? c.draggable : true"
                        [resizeable]="(c.resizeable) ? c.resizeable : true"
                        *ngFor="let c of columns; index as i;">
    <ng-template let-column="column" ngx-datatable-header-template *ngIf="i==0">
      <strong>#</strong>
    </ng-template>
    <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-row="row" *ngIf="i==0">
        <span>
            {{rowIndex+1}}
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
    /** @type {?} */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWxrLWRhdGF0YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdGV3YXJkLWNsaWVudC8iLCJzb3VyY2VzIjpbImxpYi9tbGstZGF0YXRhYmxlL21say1kYXRhdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RixPQUFPLEVBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDL0MsT0FBTyxFQUFvQixRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBRTdHLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7QUF1T3ZDLE1BQU07Ozs7SUEyQkosWUFBb0IsZUFBc0U7UUFBdEUsb0JBQWUsR0FBZixlQUFlLENBQXVEO1FBMUJqRixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFDdkIsc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QiwyQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFDL0IsWUFBTyxHQUE4QixFQUFFLENBQUM7UUFDeEMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFdkIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNqQyxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixvQkFBZSxHQUFHLFlBQVksQ0FBQztRQUMvQixrQkFBYSxHQUFHLFVBQVUsQ0FBQztRQUUxQixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO1FBQ3hELHFCQUFnQixHQUFrQyxFQUFFLENBQUM7UUFFOUQsU0FBSSxHQUFjLElBQUksSUFBSSxFQUFFLENBQUM7UUFDN0IsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNKLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBRXRELFdBQU0sR0FBVyxFQUFFLENBQUM7SUFNcEIsQ0FBQzs7Ozs7SUFLRCxRQUFROztjQUNBLEtBQUssR0FBRyxFQUFFO1FBQ2hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7O2tCQUM3QixVQUFVLEdBQWUsRUFBRTtZQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLFlBQVksUUFBUSxJQUFJLElBQUksQ0FBQyxXQUFXLFlBQVksV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDcEYsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDbEUsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNwRSxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsWUFBWSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hELENBQUM7WUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztRQUNILHVCQUF1QjtRQUN2QixLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5RCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7Ozs7OztJQU1ELGFBQWEsQ0FBQyxLQUF3QjtRQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7Ozs7O0lBT0QsUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDO1FBQ1QsQ0FBQzs7WUFDRyxPQUF5QjtRQUM3QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1osT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNwQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0JBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDcEUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDNUIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQzs7Ozs7O0lBTUQsUUFBUSxDQUFDLEVBQUMsUUFBUSxFQUFDO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBSztJQUVoQixDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxLQUFLO0lBRWxCLENBQUM7Ozs7Ozs7SUFPRCxhQUFhLENBQUMsSUFBSTs7O2NBRVYsQ0FBQyxHQUFxQixJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUUsZ0JBQWdCO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pCLHNEQUFzRDtRQUN4RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7OztrQkFFQSxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNmLDJCQUEyQjtZQUMzQiw0Q0FBNEM7WUFDNUMscUVBQXFFO1FBQ3ZFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQzs7O2tCQUVBLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDcEQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7Ozs7O0lBTUQsT0FBTyxDQUFDLE9BQVk7UUFDbEIsTUFBTSxDQUFDLE9BQU8sWUFBWSxRQUFRLENBQUM7SUFDckMsQ0FBQzs7Ozs7O0lBTUQsUUFBUSxDQUFDLE9BQVk7UUFDbkIsTUFBTSxDQUFDLE9BQU8sWUFBWSxTQUFTLENBQUM7SUFDdEMsQ0FBQzs7Ozs7O0lBS0QsVUFBVSxDQUFDLE9BQVk7UUFDckIsTUFBTSxDQUFDLE9BQU8sWUFBWSxXQUFXLENBQUM7SUFDeEMsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsSUFBUztRQUNuQixNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNkLENBQUM7Ozs7OztJQU1ELGdCQUFnQixDQUFDLElBQUk7O2NBQ2IsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7O1lBRTNCLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUU7UUFDNUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7O1lBRTNDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFO1FBQ25DLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRXZDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3hDLENBQUM7Ozs7OztJQUVELGFBQWEsQ0FBQyxJQUFZLEVBQUUsS0FBVTs7Y0FDOUIsQ0FBQyxHQUFrQixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7Y0FDbkMsSUFBSSxHQUFHLElBQUksS0FBSyxDQUFTLEdBQUcsQ0FBQyxDQUFDOztjQUM5QixLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDOzs7Ozs7O0lBT0QsY0FBYyxDQUFDLElBQVMsRUFBRSxJQUFtQjtRQUMzQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFlBQVksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLENBQUM7O1lBQ0csS0FBSyxHQUFHLElBQUk7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUVmLENBQUM7OztZQTdiRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0E4Tlg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2I7OztZQXhPTyxvQkFBb0I7Ozs2QkEwT3pCLEtBQUs7Z0NBQ0wsS0FBSztnQ0FDTCxLQUFLO21DQUNMLEtBQUs7cUNBQ0wsS0FBSztzQkFDTCxLQUFLOzZCQUNMLEtBQUs7dUJBQ0wsS0FBSztpQ0FDTCxLQUFLO3VDQUNMLEtBQUs7NEJBQ0wsS0FBSzs4QkFDTCxLQUFLOzRCQUNMLEtBQUs7MEJBQ0wsS0FBSzs2QkFDTCxNQUFNOytCQUNOLEtBQUs7cUJBQ0wsS0FBSzt5QkFHTCxNQUFNO29CQUNOLFNBQVMsU0FBQyxrQkFBa0I7Ozs7SUFwQjdCLCtDQUE2Qjs7SUFDN0Isa0RBQWdDOztJQUNoQyxrREFBZ0M7O0lBQ2hDLHFEQUFzQzs7SUFDdEMsdURBQXdDOztJQUN4Qyx3Q0FBaUQ7O0lBQ2pELCtDQUFnQzs7SUFDaEMseUNBQTBCOztJQUMxQixtREFBb0M7O0lBQ3BDLHlEQUEwQzs7SUFDMUMsOENBQStCOztJQUMvQixnREFBd0M7O0lBQ3hDLDhDQUFvQzs7SUFDcEMsNENBQXFDOztJQUNyQywrQ0FBaUU7O0lBQ2pFLGlEQUE4RDs7SUFDOUQsdUNBQWtDOztJQUNsQyxxQ0FBNkI7O0lBQzdCLHlDQUFjOztJQUNkLDJDQUFzRDs7SUFDdEQsc0NBQXlEOztJQUN6RCx1Q0FBb0I7O0lBQ3BCLDJDQUFzQjs7SUFDdEIsaURBQTZCOztJQUdqQixnREFBOEU7Ozs7Ozs7QUF1TTVGLHdDQWdEQzs7Ozs7O0lBNUNDLHdDQUFtQjs7Ozs7SUFJbkIsdUNBQWtCOzs7OztJQUlsQixtQ0FBZTs7Ozs7SUFJZixzQ0FBbUI7Ozs7O0lBSW5CLDJDQUF3Qjs7Ozs7SUFJeEIsdUNBQW9COzs7OztJQUlwQix3Q0FBcUI7Ozs7O0lBSXJCLDBDQUF1Qjs7Ozs7SUFLdkIsOENBQTJCOzs7OztJQUszQiwwQ0FBc0I7Ozs7O0lBS3RCLHlDQUFrQzs7Ozs7QUFNcEMsTUFBTTs7Ozs7O0lBY0osWUFBWSxPQUFpQyxFQUFFLEVBQVcsRUFBRSxJQUFhO1FBYnpFOztXQUVHO1FBQ0gsU0FBSSxHQUFHLFNBQVMsQ0FBQztRQUNqQjs7V0FFRztRQUNILGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBT2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FFRjs7Ozs7O0lBaEJDLDhCQUFpQjs7Ozs7SUFJakIscUNBQW1COzs7OztJQUluQixpQ0FBa0M7Ozs7O0FBVXBDLHVDQWNDOzs7Ozs7SUFWQywrQkFBUzs7Ozs7SUFJVCx1Q0FBZ0I7Ozs7O0lBS2hCLHNDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7UGFnZX0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcGFnZSc7XHJcbmltcG9ydCB7TWxrRHluYW1pY0NvbnRyb2wsIE1sa0lucHV0LCBNbGtTZWxlY3QsIE1sa1RleHRhcmVhfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9tbGstZHluYW1pYy1jb250cm9sJztcclxuaW1wb3J0IHtSZXNwb25zZVdyYXBwZXJ9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL3Jlc3BvbnNlLXdyYXBwZXInO1xyXG5pbXBvcnQge1N0ZXdhcmRDbGllbnRTZXJ2aWNlfSBmcm9tICcuLi9zdGV3YXJkLWNsaWVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHtEYXRhdGFibGVDb21wb25lbnR9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcclxuaW1wb3J0IHtRdWV1ZX0gZnJvbSAncXVldWUtdHlwZXNjcmlwdCc7XHJcblxyXG4vLyBjb25zdCB7IFF1ZXVlIH0gPSByZXF1aXJlKCdxdWV1ZS10eXBlc2NyaXB0Jyk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3N0dy1tbGstZGF0YXRhYmxlJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjYXJkIGNhcmQtb3V0bGluZS1kZWZhdWx0XCIgKm5nSWY9XCJlbmFibGVGaWx0ZXJIZWFkZXJcIj5cclxuICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XHJcbiAgICA8Zm9ybSAobmdTdWJtaXQpPVwicHJvY2Vzc0ZpbHRlcihmaWx0ZXJGb3JtKVwiIFtmb3JtR3JvdXBdPVwiZmlsdGVyRm9ybVwiPlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyAgbWItM1wiICpuZ0Zvcj1cImxldCBjb250cm9sIG9mIGZpbHRlckNvbXBvbmVudHNcIj5cclxuICAgICAgICAgIDxsYWJlbD57e2NvbnRyb2wubGFiZWx9fTogPC9sYWJlbD5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgIGZvcm0taWNvbi1kZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpIFtjbGFzc109XCJjb250cm9sLmljb25cIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPHNlbGVjdCAqbmdJZj1cImlzU2VsZWN0KGNvbnRyb2wuY29udHJvbFR5cGUpXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCJcclxuICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiPlxyXG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZCBzZWxlY3RlZD57e2NvbnRyb2wucGxhY2Vob2xkZXJ9fTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IG8gb2YgY29udHJvbC5jb250cm9sVHlwZS5vcHRpb25zXCI+e3tvLnRleHR9fTwvb3B0aW9uPlxyXG4gICAgICAgICAgICA8L3NlbGVjdD5cclxuXHJcbiAgICAgICAgICAgIDx0ZXh0YXJlYSAqbmdJZj1cImlzVGV4dEFyZWEoY29udHJvbC5jb250cm9sVHlwZSlcIiBbY29sc109XCJjb250cm9sLmNvbnRyb2xUeXBlLmNvbHNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgW3Jvd3NdPVwiY29udHJvbC5jb250cm9sVHlwZS5yb3dzXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCJcclxuICAgICAgICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLm5hbWVcIj48L3RleHRhcmVhPlxyXG5cclxuICAgICAgICAgICAgPGlucHV0ICpuZ0lmPVwiaXNJbnB1dChjb250cm9sLmNvbnRyb2xUeXBlKVwiIFt0eXBlXT1cImNvbnRyb2wuY29udHJvbFR5cGUudHlwZVwiXHJcbiAgICAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29udHJvbC5wbGFjZWhvbGRlclwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiXHJcbiAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLnRvdWNoZWRcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdyZXF1aXJlZCcpXCI+e3tjb250cm9sLnBsYWNlaG9sZGVyfX0gaXMgcmVxdWlyZWQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWlubGVuZ3RoJylcIj5NaW5pbXVtIG9mIHt7Y29udHJvbC5jb250cm9sVHlwZS5taW5MZW5ndGh9fSBjaGFyYWN0ZXJzPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiB7e2NvbnRyb2wuY29udHJvbFR5cGUubWF4TGVuZ3RofX0gY2hhcmFjdGVyczwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtaW4nKVwiPlNob3VsZCBiZSBncmVhdGVyIHRoYW4ge3tjb250cm9sLmNvbnRyb2xUeXBlLm1pbn19PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heCcpXCI+U2hvdWxkIGJlIGxlc3MgdGhhbiB7e2NvbnRyb2wuY29udHJvbFR5cGUubWF4fX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCIgKm5nSWY9XCJlbmFibGVEZWZhdWx0VGFibGVIZWFkZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgbWItM1wiPlxyXG4gICAgICAgICAgPGxhYmVsPkZyb206IDwvbGFiZWw+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IGZvcm0taWNvbi1kZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXItb1wiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxyXG4gICAgICAgICAgICAgIGlkPVwiaW5wdXRUcmF2ZWxEYXRlXCJcclxuICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJmcm9tXCJcclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkZyb20uLi5cIlxyXG4gICAgICAgICAgICAgICNkcGZyb209XCJic0RhdGVwaWNrZXJcIlxyXG4gICAgICAgICAgICAgIGJzRGF0ZXBpY2tlclxyXG4gICAgICAgICAgICAgIFtvdXRzaWRlQ2xpY2tdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgIFtic0NvbmZpZ109XCJ7IGRhdGVJbnB1dEZvcm1hdDogJ0RELU1NLVlZWVknLCBjb250YWluZXJDbGFzczogJ3RoZW1lLXJlZCcgfVwiXHJcbiAgICAgICAgICAgICAgbWF4bGVuZ3RoPVwiMzBcIlxyXG4gICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgcmVhZG9ubHlcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImRwZnJvbS50b2dnbGUoKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImRwZnJvbS5pc09wZW5cIj48aSBjbGFzcz1cImZhIGZhLXRoXCI+PC9pPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLnRvdWNoZWRcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2YgMzAgY2hhcmFjdGVyczwvc3Bhbj5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCI+XHJcbiAgICAgICAgICA8bGFiZWw+VG86IDwvbGFiZWw+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IGZvcm0taWNvbi1kZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXItb1wiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxyXG4gICAgICAgICAgICAgIGlkPVwiaW5wdXRUcmF2ZWxEYXRlXCJcclxuICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJ0b1wiXHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJUby4uLlwiXHJcbiAgICAgICAgICAgICAgI2RwdG89XCJic0RhdGVwaWNrZXJcIlxyXG4gICAgICAgICAgICAgIGJzRGF0ZXBpY2tlclxyXG4gICAgICAgICAgICAgIFtvdXRzaWRlQ2xpY2tdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICAgIFtic0NvbmZpZ109XCJ7IGRhdGVJbnB1dEZvcm1hdDogJ0RELU1NLVlZWVknLCBjb250YWluZXJDbGFzczogJ3RoZW1lLXJlZCcgfVwiXHJcbiAgICAgICAgICAgICAgbWF4bGVuZ3RoPVwiMzBcIlxyXG4gICAgICAgICAgICAgIHJlcXVpcmVkXHJcbiAgICAgICAgICAgICAgcmVhZG9ubHlcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImRwdG8udG9nZ2xlKClcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImRwdG8uaXNPcGVuXCI+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXRoXCI+PC9pPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgndG8nKS50b3VjaGVkXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ3RvJykuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiAzMCBjaGFyYWN0ZXJzPC9zcGFuPlxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIG1iLTNcIj5cclxuICAgICAgICAgIDxsYWJlbD5TZWFyY2g6PC9sYWJlbD5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtcHJlcGVuZFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IGZvcm0taWNvbi1kZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtc2VhcmNoXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGlucHV0IGZvcm1Db250cm9sTmFtZT1cIm5lZWRsZVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1zbSBjaGVja2luZy1maWVsZFwiIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCIgKGtleXVwKT1cInVwZGF0ZUZpbHRlcigkZXZlbnQpXCIvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLnRvdWNoZWRcIj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KCdmcm9tJykuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiAyMDAgY2hhcmFjdGVyczwvc3Bhbj5cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInB1bGwtcmlnaHQgaW5saW5lLWJ1dHRvbnNcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4td2FybmluZyBidG4tc21cIiB0eXBlPVwicmVzZXRcIj5cclxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXJlcGVhdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cclxuICAgICAgICAgICAgICBSZXNldFxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG4tc20gcHVsbC1yaWdodFwiIHR5cGU9XCJzdWJtaXRcIj5cclxuICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWZpbHRlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cclxuICAgICAgICAgICAgICBGaWx0ZXJcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgPC9mb3JtPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuXHJcbjxuZ3gtZGF0YXRhYmxlXHJcbiAgI3RhYmxlXHJcbiAgW3Jvd0hlaWdodF09XCJ0YWJsZVJvd0hlaWdodFwiXHJcbiAgW2Zvb3RlckhlaWdodF09XCJ0YWJsZUZvb3RlckhlaWdodFwiXHJcbiAgW2hlYWRlckhlaWdodF09XCJ0YWJsZUhlYWRlckhlaWdodFwiXHJcbiAgW3Njcm9sbGJhclZdPVwidmVydGljYWxTY3JvbGxBY3RpdmVcIlxyXG4gIFtzY3JvbGxiYXJIXT1cImhvcml6b250YWxTY3JvbGxBY3RpdmVcIlxyXG4gIFtzdW1tYXJ5Um93XT1cImVuYWJsZVN1bW1hcnlcIlxyXG4gIFtzdW1tYXJ5UG9zaXRpb25dPVwic3VtbWFyeVBvc2l0aW9uXCJcclxuICBbc3VtbWFyeUhlaWdodF09XCJzdW1tYXJ5SGVpZ2h0XCJcclxuICBjbGFzcz1cImJvb3RzdHJhcFwiXHJcbiAgW2NvbHVtbk1vZGVdPVwiJ2ZvcmNlJ1wiXHJcbiAgW3Jvd3NdPVwicGFnZS5jb250ZW50XCJcclxuICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIlxyXG4gIFtzZWxlY3Rpb25UeXBlXT1cIidjaGVja2JveCdcIlxyXG4gIChhY3RpdmF0ZSk9XCJvbkFjdGl2YXRlKCRldmVudClcIlxyXG4gIChzZWxlY3QpPSdvblNlbGVjdCgkZXZlbnQpJ1xyXG4gIFtjb3VudF09XCJwYWdlLnRvdGFsRWxlbWVudHNcIlxyXG4gIFtvZmZzZXRdPVwicGFnZS5udW1iZXJcIlxyXG4gIFtleHRlcm5hbFBhZ2luZ109XCJ0cnVlXCJcclxuICBbbGltaXRdPVwicGFnZS5zaXplXCJcclxuICAocGFnZSk9XCJsb2FkUGFnZSgkZXZlbnQsIG51bGwpXCI+XHJcbiAgPG5neC1kYXRhdGFibGUtY29sdW1uIFtzdW1tYXJ5RnVuY109XCJzdW1tYXJ5RnVuY1wiIFt3aWR0aF09XCIzMFwiIFtzb3J0YWJsZV09XCJmYWxzZVwiIFtjYW5BdXRvUmVzaXplXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2RyYWdnYWJsZV09XCJ0cnVlXCIgW3Jlc2l6ZWFibGVdPVwiZmFsc2VcIiBbaGVhZGVyQ2hlY2tib3hhYmxlXT1cInRydWVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2hlY2tib3hhYmxlXT1cInRydWVcIiAqbmdJZj1cImVuYWJsZUNoZWNrYm94XCI+XHJcbiAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cclxuICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gW3N1bW1hcnlGdW5jXT1cIihjLnN1bW1hcnlGdW5jKSA/IGMuc3VtbWFyeUZ1bmMgOiBzdW1tYXJ5RnVuY1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjYW5BdXRvUmVzaXplXT1cIihjLmNhbkF1dG9SZXNpemUpID8gYy5jYW5BdXRvUmVzaXplIDogdHJ1ZVwiIFtuYW1lXT1cImMuY29sdW1uTmFtZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFt3aWR0aF09XCJjLndpZHRoXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3NvcnRhYmxlXT1cIihjLnNvcnRhYmxlKSA/IGMuc29ydGFibGUgOiB0cnVlXCIgW2RyYWdnYWJsZV09XCIoYy5kcmFnZ2FibGUpID8gYy5kcmFnZ2FibGUgOiB0cnVlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW3Jlc2l6ZWFibGVdPVwiKGMucmVzaXplYWJsZSkgPyBjLnJlc2l6ZWFibGUgOiB0cnVlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IGMgb2YgY29sdW1uczsgaW5kZXggYXMgaTtcIj5cclxuICAgIDxuZy10ZW1wbGF0ZSBsZXQtY29sdW1uPVwiY29sdW1uXCIgbmd4LWRhdGF0YWJsZS1oZWFkZXItdGVtcGxhdGUgKm5nSWY9XCJpPT0wXCI+XHJcbiAgICAgIDxzdHJvbmc+Izwvc3Ryb25nPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtcm93PVwicm93XCIgKm5nSWY9XCJpPT0wXCI+XHJcbiAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgIHt7cm93SW5kZXgrMX19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgICA8bmctdGVtcGxhdGUgbGV0LWNvbHVtbj1cImNvbHVtblwiIG5neC1kYXRhdGFibGUtaGVhZGVyLXRlbXBsYXRlPlxyXG4gICAgICA8c3Ryb25nPnt7Yy5jb2x1bW5OYW1lfX08L3N0cm9uZz5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8bmctdGVtcGxhdGUgbmd4LWRhdGF0YWJsZS1jZWxsLXRlbXBsYXRlIGxldC1yb3dJbmRleD1cInJvd0luZGV4XCIgbGV0LXZhbHVlPVwidmFsdWVcIiBsZXQtcm93PVwicm93XCI+XHJcbiAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjLmlzRGF0ZUNvbHVtbjsgdGhlbiB0MTBcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImMuaXNDdXJyZW5jeUNvbHVtbiAmJiBjLmN1cnJlbmN5VGV4dDsgdGhlbiB0NDBcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImMuaXNDdXJyZW5jeUNvbHVtbiAmJiAhYy5jdXJyZW5jeVRleHQ7IHRoZW4gdDcwXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhYy5pc0RhdGVDb2x1bW4gJiYgIWMuaXNDdXJyZW5jeUNvbHVtbjsgdGhlbiB0NzBcIj48L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdDEwPlxyXG4gICAgICAgICAgICAgICAge3soZ2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKSB8IGRhdGU6J21lZGl1bScpfX1cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICN0NDA+XHJcbiAgICAgICAgICAgICAgICB7eyhnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpIHwgY3VycmVuY3k6Yy5jdXJyZW5jeVRleHQ6J2NvZGUnKX19XHJcbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdDcwPlxyXG4gICAgICAgICAgICAgICAge3tnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpfX1cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XHJcbiAgPG5neC1kYXRhdGFibGUtY29sdW1uIFtzdW1tYXJ5RnVuY109XCJzdW1tYXJ5RnVuY1wiIFtuYW1lXT1cIm1vcmVBY3Rpb25zLm5hbWVcIiAqbmdJZj1cIm1vcmVBY3Rpb25zXCIgW3NvcnRhYmxlXT1cImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2NhbkF1dG9SZXNpemVdPVwiZmFsc2VcIj5cclxuICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtdmFsdWU9XCJ2YWx1ZVwiIGxldC1yb3c9XCJyb3dcIj5cclxuICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1wcmVwZW5kXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBkcm9wZG93bi10b2dnbGVcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxyXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPlxyXG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtbGlzdC11bFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93bi1tZW51XCI+XHJcbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBtb3JlQWN0aW9ucy5hY3Rpb25zXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiXHJcbiAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQWN0aW9uQ2xpY2soe2lkOiByb3dbbW9yZUFjdGlvbnMuaWRGaWVsZE5hbWVdLCBhY3Rpb25OYW1lOiBhY3Rpb24uYWN0aW9uTmFtZSwgYWN0aW9uUm93OiByb3d9KVwiPnt7YWN0aW9uLmFjdGlvbk5hbWV9fTwvYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICA8L25nLXRlbXBsYXRlPlxyXG4gIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XHJcbjwvbmd4LWRhdGF0YWJsZT5cclxuYCxcclxuICBzdHlsZXM6IFtgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1sa0RhdGF0YWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgdGFibGVSb3dIZWlnaHQgPSA1MDtcclxuICBASW5wdXQoKSB0YWJsZUZvb3RlckhlaWdodCA9IDUwO1xyXG4gIEBJbnB1dCgpIHRhYmxlSGVhZGVySGVpZ2h0ID0gNTA7XHJcbiAgQElucHV0KCkgdmVydGljYWxTY3JvbGxBY3RpdmUgPSBmYWxzZTtcclxuICBASW5wdXQoKSBob3Jpem9udGFsU2Nyb2xsQWN0aXZlID0gZmFsc2U7XHJcbiAgQElucHV0KCkgY29sdW1uczogQXJyYXk8TWxrRGF0YVRhYmxlQ29sdW1uPiA9IFtdO1xyXG4gIEBJbnB1dCgpIGVuYWJsZUNoZWNrYm94ID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZW5kcG9pbnQ6IHN0cmluZztcclxuICBASW5wdXQoKSBlbmFibGVGaWx0ZXJIZWFkZXIgPSBmYWxzZTtcclxuICBASW5wdXQoKSBlbmFibGVEZWZhdWx0VGFibGVIZWFkZXIgPSBmYWxzZTtcclxuICBASW5wdXQoKSBlbmFibGVTdW1tYXJ5ID0gZmFsc2U7XHJcbiAgQElucHV0KCkgc3VtbWFyeVBvc2l0aW9uID0gJ1xcJ2JvdHRvbVxcJyc7XHJcbiAgQElucHV0KCkgc3VtbWFyeUhlaWdodCA9ICdcXCdhdXRvXFwnJztcclxuICBASW5wdXQoKSBtb3JlQWN0aW9uczogTWxrTW9yZUFjdGlvbnM7XHJcbiAgQE91dHB1dCgpIG9uQWN0aW9uc0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxNbGtNb3JlQWN0aW9uRGF0YT4oKTtcclxuICBASW5wdXQoKSBmaWx0ZXJDb21wb25lbnRzOiBBcnJheTxNbGtEeW5hbWljQ29udHJvbDxhbnk+PiA9IFtdO1xyXG4gIEBJbnB1dCgpIHBhcmFtczogTWFwPHN0cmluZywgYW55PjtcclxuICBwYWdlOiBQYWdlPGFueT4gPSBuZXcgUGFnZSgpO1xyXG4gIHNlbGVjdGVkID0gW107XHJcbiAgQE91dHB1dCgpIG9uU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XHJcbiAgQFZpZXdDaGlsZChEYXRhdGFibGVDb21wb25lbnQpIHRhYmxlOiBEYXRhdGFibGVDb21wb25lbnQ7XHJcbiAgZmlsdGVyOiBPYmplY3QgPSB7fTtcclxuICBmaWx0ZXJGb3JtOiBGb3JtR3JvdXA7XHJcbiAgZW1wdHlTdW1tYXJ5RnVuYzogKCkgPT4gbnVsbDtcclxuXHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RlcndhcmRTZXJ2aWNlOiBTdGV3YXJkQ2xpZW50U2VydmljZTxSZXNwb25zZVdyYXBwZXI8UGFnZTxhbnk+PiwgYW55Pikge1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2VuZXJhdGUgZm9ybSBjb250cm9sIGZyb20gZmlsdGVyQ29tcG9uZW50cyBhbmQgYWxzbyBhcHBlbmRpbmcgZGVmYXVsdCBjb250cm9scyBpZS4gZGF0ZSBmaWx0ZXIgYW5kIHNlYXJjaCBjb250cm9sc1xyXG4gICAqL1xyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3QgZ3JvdXAgPSB7fTtcclxuICAgIHRoaXMuZmlsdGVyQ29tcG9uZW50cy5mb3JFYWNoKGNvbXAgPT4ge1xyXG4gICAgICBjb25zdCB2YWxpZGF0b3JzOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICAgIGlmIChjb21wLmlzUmVxdWlyZWQpIHtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgTWxrSW5wdXQgfHwgY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIE1sa1RleHRhcmVhKSB7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWluTGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWluTGVuZ3RoKSk7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4TGVuZ3RoKGNvbXAuY29udHJvbFR5cGUubWF4TGVuZ3RoKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjb21wLmNvbnRyb2xUeXBlIGluc3RhbmNlb2YgTWxrSW5wdXQpIHtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5tYXgoY29tcC5jb250cm9sVHlwZS5tYXgpKTtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5taW4oY29tcC5jb250cm9sVHlwZS5taW4pKTtcclxuICAgICAgfVxyXG4gICAgICBncm91cFtjb21wLm5hbWVdID0gbmV3IEZvcm1Db250cm9sKCcnLCB2YWxpZGF0b3JzKTtcclxuICAgIH0pO1xyXG4gICAgLy8gYWRkIGRlZmF1bHQgY29udHJvbHNcclxuICAgIGdyb3VwWydmcm9tJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDMwKSk7XHJcbiAgICBncm91cFsndG8nXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMzApKTtcclxuICAgIGdyb3VwWyduZWVkbGUnXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMjAwKSk7XHJcbiAgICB0aGlzLmZpbHRlckZvcm0gPSBuZXcgRm9ybUdyb3VwKGdyb3VwKTtcclxuICAgIHRoaXMubG9hZFBhZ2Uoe29mZnNldDogMCwgbGltaXQ6IHRoaXMucGFnZS5zaXplfSwgbnVsbCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGVtaXQgY2xpY2sgZXZlbnQgb2YgdGhlIGFjdGlvbnNcclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKi9cclxuICBvbkFjdGlvbkNsaWNrKGV2ZW50OiBNbGtNb3JlQWN0aW9uRGF0YSkge1xyXG4gICAgdGhpcy5vbkFjdGlvbnNFdmVudC5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2Nlc3Mgc2VydmVyIHJlcXVlc3Qgb2YgZGF0YWJsZVxyXG4gICAqIEBwYXJhbSBwYWdlSW5mb1xyXG4gICAqIEBwYXJhbSBmaWx0ZXJzXHJcbiAgICovXHJcbiAgbG9hZFBhZ2UocGFnZUluZm8sIGZpbHRlcnMpIHtcclxuICAgIGlmICghdGhpcy5lbmRwb2ludCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgcmVxdWVzdDogTWFwPHN0cmluZywgYW55PjtcclxuICAgIGlmIChmaWx0ZXJzKSB7XHJcbiAgICAgIHJlcXVlc3QgPSBmaWx0ZXJzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVxdWVzdCA9IG5ldyBNYXAoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnBhcmFtcykge1xyXG4gICAgICB0aGlzLnBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgICAgcmVxdWVzdC5zZXQoa2V5LCB2YWx1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVxdWVzdC5zZXQoJ3BhZ2UnLCBwYWdlSW5mby5vZmZzZXQpO1xyXG4gICAgcmVxdWVzdC5zZXQoJ3NpemUnLCBwYWdlSW5mby5saW1pdCk7XHJcbiAgICB0aGlzLnN0ZXJ3YXJkU2VydmljZS5nZXQodGhpcy5lbmRwb2ludCwgcmVxdWVzdCkuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcclxuICAgICAgaWYgKHJlc3BvbnNlLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgIHRoaXMucGFnZSA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gaGFuZGxlIHNlbGVjdCBvcHRpb25cclxuICAgKiBAcGFyYW0gZXZlbnRcclxuICAgKi9cclxuICBvblNlbGVjdCh7c2VsZWN0ZWR9KSB7XHJcbiAgICBjb25zb2xlLmxvZygnU2VsZWN0IEV2ZW50Jywgc2VsZWN0ZWQsIHRoaXMuc2VsZWN0ZWQpO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWQuc3BsaWNlKDAsIHRoaXMuc2VsZWN0ZWQubGVuZ3RoKTtcclxuICAgIHRoaXMuc2VsZWN0ZWQucHVzaCguLi5zZWxlY3RlZCk7XHJcbiAgICB0aGlzLm9uU2VsZWN0ZWQuZW1pdCh0aGlzLnNlbGVjdGVkKTtcclxuICB9XHJcblxyXG4gIG9uQWN0aXZhdGUoZXZlbnQpIHtcclxuXHJcbiAgfVxyXG5cclxuICB1cGRhdGVGaWx0ZXIoZXZlbnQpIHtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIHByb2Nlc3MgdGFibGUgZmlsdGVyLiBJZiBkYXRlIGZpbHRlciBpcyBub3QgcHJvdmlkZSB0aGUgZnJvbSB2YWx1ZSBpc1xyXG4gICAqIHNldCB0byAyMDE4LTAxLTAxIGFuZCB0byB2YWx1ZSBpcyBzZXQgdG8gMSB5ZWFyIGZyb20gdG9kYXlcclxuICAgKiBAcGFyYW0gZm9ybVxyXG4gICAqL1xyXG4gIHByb2Nlc3NGaWx0ZXIoZm9ybSkge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgY29uc3QgZjogTWFwPFN0cmluZywgYW55PiA9IG5ldyBNYXAoT2JqZWN0LmVudHJpZXModGhpcy5maWx0ZXJGb3JtLnZhbHVlKSk7XHJcbiAgICAvLyB2YWxpZGF0ZSBkYXRlXHJcbiAgICBpZiAoIXRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS50b3VjaGVkKSB7Ly8gaWYgZnJvbSBpcyBub3QgcG9wdWxhdGVkIHJlbW92ZSBmcm9tIHJlcXVlc3RcclxuICAgICAgZi5kZWxldGUoJ2Zyb20nKTtcclxuICAgICAgLy8gdGhpcy5maWx0ZXJGb3JtLmdldCgnZnJvbScpLnNldFZhbHVlKCcyMDE4LTAxLTAxJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBmLmdldCgnZnJvbScpLnNldFZhbHVlKG5ldyBEYXRlKHRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS52YWx1ZSkpO1xyXG4gICAgICBjb25zdCBmZCA9IG5ldyBEYXRlKHRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS52YWx1ZSk7XHJcbiAgICAgIGYuc2V0KCdmcm9tJywgZmQudG9JU09TdHJpbmcoKSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuZmlsdGVyRm9ybS5nZXQoJ3RvJykudG91Y2hlZCkgey8vIGlmIHRvIGlzIG5vdCBwb3B1bGF0ZWQgcmVtb3ZlIGZyb20gcmVxdWVzdFxyXG4gICAgICBmLmRlbGV0ZSgndG8nKTtcclxuICAgICAgLy8gbGV0IHRvRGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgIC8vIHRvRGF0ZS5zZXREYXRlKHRvRGF0ZS5nZXRGdWxsWWVhcigpICsgMSk7XHJcbiAgICAgIC8vIHRoaXMuZmlsdGVyRm9ybS5nZXQoJ3RvJykuc2V0VmFsdWUodGhpcy5nZXRGb3JtYXR0ZWREYXRlKHRvRGF0ZSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gZi5nZXQoJ3RvJykuc2V0VmFsdWUobmV3IERhdGUodGhpcy5maWx0ZXJGb3JtLmdldCgndG8nKS52YWx1ZSkpO1xyXG4gICAgICBjb25zdCB0ZCA9IG5ldyBEYXRlKHRoaXMuZmlsdGVyRm9ybS5nZXQoJ3RvJykudmFsdWUpO1xyXG4gICAgICBmLnNldCgndG8nLCB0ZC50b0lTT1N0cmluZygpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxvYWRQYWdlKHtvZmZzZXQ6IHRoaXMucGFnZS5udW1iZXIsIGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZX0sIGYpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyBpbnB1dFxyXG4gICAqIEBwYXJhbSBjb250cm9sXHJcbiAgICovXHJcbiAgaXNJbnB1dChjb250cm9sOiBhbnkpIHtcclxuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgTWxrSW5wdXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIHNlbGVjdFxyXG4gICAqIEBwYXJhbSBjb250cm9sXHJcbiAgICovXHJcbiAgaXNTZWxlY3QoY29udHJvbDogYW55KSB7XHJcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIE1sa1NlbGVjdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgdGV4dGFyZWFcclxuICAgKi9cclxuICBpc1RleHRBcmVhKGNvbnRyb2w6IGFueSkge1xyXG4gICAgcmV0dXJuIGNvbnRyb2wgaW5zdGFuY2VvZiBNbGtUZXh0YXJlYTtcclxuICB9XHJcblxyXG4gIHN1bW1hcnlGdW5jKGNlbGw6IGFueSkge1xyXG4gICAgcmV0dXJuIChgYCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGZvcm1hdCBkYXRlIHRvIHN0cmluZyB5eXl5LU1NLWRkXHJcbiAgICogQHBhcmFtIGRhdGVcclxuICAgKi9cclxuICBnZXRGb3JtYXR0ZWREYXRlKGRhdGUpIHtcclxuICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgbGV0IG1vbnRoID0gKDEgKyBkYXRlLmdldE1vbnRoKCkpLnRvU3RyaW5nKCk7XHJcbiAgICBtb250aCA9IG1vbnRoLmxlbmd0aCA+IDEgPyBtb250aCA6ICcwJyArIG1vbnRoO1xyXG5cclxuICAgIGxldCBkYXkgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgZGF5ID0gZGF5Lmxlbmd0aCA+IDEgPyBkYXkgOiAnMCcgKyBkYXk7XHJcblxyXG4gICAgcmV0dXJuIHllYXIgKyAnLScgKyBtb250aCArICctJyArIGRheTtcclxuICB9XHJcblxyXG4gIGdldEZpZWxkVmFsdWUoZGF0YTogT2JqZWN0LCBmaWVsZDogYW55KSB7XHJcbiAgICBjb25zdCBrOiBBcnJheTxzdHJpbmc+ID0gZmllbGQuc3BsaXQoJy4nKTtcclxuICAgIGNvbnN0IGtleXMgPSBuZXcgUXVldWU8c3RyaW5nPiguLi5rKTtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRPYmplY3RWYWx1ZShkYXRhLCBrZXlzKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gZmluZCBrZXkgdmFsdWUgYmFzZWQgb24gdGhlIGtleSBzZXF1ZW5jZSBwcm92aWRlZFxyXG4gICAqIEBwYXJhbSBkYXRhIGV4cGVjdHMgYW4gb2JqZWN0XHJcbiAgICogQHBhcmFtIGtleXMgaS5lLiB1c2VyLmdlbmRlci50eXBlLnR5cGVcclxuICAgKi9cclxuICBnZXRPYmplY3RWYWx1ZShkYXRhOiBhbnksIGtleXM6IFF1ZXVlPHN0cmluZz4pIHtcclxuICAgIGlmICgoIShkYXRhIGluc3RhbmNlb2YgT2JqZWN0KSkgfHwgKGtleXMubGVuZ3RoID09PSAxKSkge1xyXG4gICAgICByZXR1cm4gZGF0YVtrZXlzLnRhaWxdO1xyXG4gICAgfVxyXG4gICAgbGV0IHZhbHVlID0gbnVsbDtcclxuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICBpZiAoKGtleSA9PT0ga2V5cy5mcm9udCkgJiYgKGRhdGFba2V5XSBpbnN0YW5jZW9mIE9iamVjdCkpIHtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuZ2V0T2JqZWN0VmFsdWUoZGF0YVtrZXldLCBrZXlzKTtcclxuICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGtleXMudGFpbCkge1xyXG4gICAgICAgIHZhbHVlID0gZGF0YVtrZXldO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuXHJcbiAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFVzZWQgdG8gZGVmaW5lIGRhdGF0YWJsZSBjb2x1bW5zIHdpdGggYXR0cmlidXRlcyAoY29sdW1uTmFtZSwgZmllbGROYW1lLCB3aWR0aCwgc29ydGFibGUsIGNhbkF1dG9SZXNpemUsXHJcbiAqIGRyYWdnYWJsZSwgcmVzaXphYmxlLCBpc0RhdGVDb2x1bW4sIGlzQ3VycmVuY3lDb2x1bW4sIGN1cnJlbmN5VGV4dCwgc3VtbWFyeUZ1bmMpXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE1sa0RhdGFUYWJsZUNvbHVtbiB7XHJcbiAgLyoqXHJcbiAgICogY29sdW1uIHRpdGxlXHJcbiAgICovXHJcbiAgY29sdW1uTmFtZTogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIFNlcnZlciBzaWRlIHJlc3BvbnNlIGZpZWxkIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGNvbHVtbiBpLmUgZnVsbE5hbWUgbWF5IGNvcnJlc3BvbmQgdG8gTmFtZSBjb2x1bW5cclxuICAgKi9cclxuICBmaWVsZE5hbWU6IHN0cmluZztcclxuICAvKipcclxuICAgKiBXaWR0aCBvZiB0aGUgY29sdW1uXHJcbiAgICovXHJcbiAgd2lkdGg/OiBudW1iZXI7XHJcbiAgLyoqXHJcbiAgICogRW5hYmxlIHNvcnRpbmcgaW4gYSBjb2x1bW5cclxuICAgKi9cclxuICBzb3J0YWJsZT86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogTWFrZXMgYSBjb2x1bW4gcmVzaXphYmxlXHJcbiAgICovXHJcbiAgY2FuQXV0b1Jlc2l6ZT86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogRW5hYmxlcyBhIGNvbHVtbiB0byBiZSBkcmFnZ2FibGVcclxuICAgKi9cclxuICBkcmFnZ2FibGU/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIE1ha2VzIGEgY29sdW1uIHJlc2l6YWJsZVxyXG4gICAqL1xyXG4gIHJlc2l6ZWFibGU/OiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIFVzZWQgdG8gZW5hYmxlIGZvcm1hdGluZyB0aW1lc3RhbXAgdG8gc3RyaW5nIGRhdGVcclxuICAgKi9cclxuICBpc0RhdGVDb2x1bW4/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIGVuYWJsZSBmb3JtYXRpbmcgc3RyaW5nIHRvIHN0cmluZyBjdXJyZW5jeVxyXG4gICAqL1xyXG4gIGlzQ3VycmVuY3lDb2x1bW4/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBVc2VkIHRvIHNldCB0aGUgY3VycmVuY3kgc3RyaW5nXHJcbiAgICovXHJcbiAgY3VycmVuY3lUZXh0Pzogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB0byBjYWxsIGF0IHRoZSBzdW1tYXJ5IHJvd1xyXG4gICAqL1xyXG4gIHN1bW1hcnlGdW5jPzogKGFueTogYW55W10pID0+IGFueTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVzZWQgdG8gZGlzcGxheSBtb3JlIGFjdGlvbnMgY29sdW1uIGFuZCB0aGUgZW5kIG9mIHRoZSB0YWJsZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE1sa01vcmVBY3Rpb25zIHtcclxuICAvKipcclxuICAgKiBBY3Rpb24gQ29sdW1uIG5hbWUgZS5nLiBNb3JlIEFjdGlvbnNcclxuICAgKi9cclxuICBuYW1lID0gJ0FjdGlvbnMnO1xyXG4gIC8qKlxyXG4gICAqIEZpZWxkIG5hbWUgaWQgZnJvbSB0aGUgc2VydmVyIHJlc3BvbnNlIGUuZyB1c2VySWRcclxuICAgKi9cclxuICBpZEZpZWxkTmFtZSA9ICdpZCc7XHJcbiAgLyoqXHJcbiAgICogQWN0aW9ucyBlLmcuIEVkaXQsIERlbGV0ZVxyXG4gICAqL1xyXG4gIGFjdGlvbnM6IEFycmF5PE1sa01vcmVBY3Rpb25EYXRhPjtcclxuXHJcbiAgY29uc3RydWN0b3IoYWN0aW9uczogQXJyYXk8TWxrTW9yZUFjdGlvbkRhdGE+LCBpZD86IHN0cmluZywgbmFtZT86IHN0cmluZykge1xyXG4gICAgdGhpcy5hY3Rpb25zID0gYWN0aW9ucztcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmlkRmllbGROYW1lID0gaWQ7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNbGtNb3JlQWN0aW9uRGF0YSB7XHJcbiAgLyoqXHJcbiAgICogTmV2ZXIgbWluZCB0aGlzIGZpZWxkIGl0IHdpbGwgYmUgdXNlZCBieSB0aGUgbGlicmFyeVxyXG4gICAqL1xyXG4gIGlkPzogYW55O1xyXG4gIC8qKlxyXG4gICAqIEFjdGlvbiBuYW1lIGUuZy4gRWRpdCwgRGVsZXRlXHJcbiAgICovXHJcbiAgYWN0aW9uTmFtZTogYW55O1xyXG5cclxuICAvKipcclxuICAgKiBBY3Rpb24gcm93IDogdGhlIGNsaWNrZWQgcm93XHJcbiAgICovXHJcbiAgYWN0aW9uUm93PzogYW55O1xyXG59XHJcbiJdfQ==