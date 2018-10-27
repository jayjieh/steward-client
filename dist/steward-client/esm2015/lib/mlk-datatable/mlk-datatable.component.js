/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Page } from '../entities/wrappers/page';
import { MlkInput, MlkTextarea, MlkSelect } from '../entities/wrappers/mlk-dynamic-control';
import { StewardClientService } from '../steward-client.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Queue } from 'queue-typescript';
//const { Queue } = require('queue-typescript');
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
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        let group = {};
        this.filterComponents.forEach(comp => {
            /** @type {?} */
            let validators = [];
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
        request.set("page", pageInfo.offset);
        request.set("size", pageInfo.limit);
        this.sterwardService.get(this.endpoint, request).subscribe(response => {
            if (response.code == 200) {
                this.page = response.data;
            }
        });
    }
    /**
     * Used to handle select option
     * @param {?} event
     * @return {?}
     */
    onSelect(event) {
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
        //@ts-ignore
        /** @type {?} */
        let f = new Map(Object.entries(this.filterForm.value));
        //validate date 
        if (!this.filterForm.get('from').touched) {
            f.delete('from');
            // this.filterForm.get('from').setValue('2018-01-01');
        }
        else {
            //f.get('from').setValue(new Date(this.filterForm.get('from').value));
            /** @type {?} */
            let fd = new Date(this.filterForm.get('from').value);
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
            let td = new Date(this.filterForm.get('to').value);
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
        var year = date.getFullYear();
        /** @type {?} */
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        /** @type {?} */
        var day = date.getDate().toString();
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
        var k = field.split(".");
        /** @type {?} */
        var keys = new Queue(...k);
        /** @type {?} */
        let value = this.getObjectValue(data, keys);
        return value;
    }
    /**
     * Used to find key value based on the key sequence provided
     * @param {?} data expects an object
     * @param {?} keys i.e. user.gender.type.type
     * @return {?}
     */
    getObjectValue(data, keys) {
        if ((!(data instanceof Object)) || (keys.length == 1)) {
            return data[keys.tail];
        }
        /** @type {?} */
        let value = null;
        Object.keys(data).forEach((key) => {
            if ((key == keys.front) && (data[key] instanceof Object)) {
                value = this.getObjectValue(data[key], keys);
            }
            else if (key == keys.tail) {
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
            <label for="from">{{control.label}}: </label>
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text  form-icon-default">
                  <i [class]="control.icon"></i>
                </span>
              </div>
  
              <select *ngIf="isSelect(control.controlType)" class="form-control form-control-sm checking-field" [formControlName]="control.name">
                <option value="" disabled selected>{{control.placeholder}}</option>
                <option *ngFor="let o of control.controlType.options">{{o.text}}</option>
              </select>
  
              <textarea *ngIf="isTextArea(control.controlType)" [cols]="control.controlType.cols" [rows]="control.controlType.rows" class="form-control form-control-sm checking-field"
                [placeholder]="control.placeholder" [formControlName]="control.name"></textarea>
  
              <input *ngIf="isInput(control.controlType)" [type]="control.controlType.type" [placeholder]="control.placeholder" class="form-control form-control-sm checking-field"
                [formControlName]="control.name" />
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
            <label for="from">From: </label>
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
                    <button class="btn btn-primary" type="button" (click)="dpfrom.toggle()" [attr.aria-expanded]="dpfrom.isOpen"><i class="fa fa-th"></i></button>
                  </div>
            </div>
            <span class="help-block" *ngIf="filterForm.get('from').touched">
                <span class="text-danger" *ngIf="filterForm.get('from').hasError('maxlength')">Maximum of 30 characters</span>
            </span>
          </div>
          <div class="col-md-3 mb-3">
            <label for="from">To: </label>
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
                    <button class="btn btn-primary" type="button" (click)="dpto.toggle()" [attr.aria-expanded]="dpto.isOpen"><i class="fa fa-th"></i></button>
                  </div>  
            </div>
            <span class="help-block" *ngIf="filterForm.get('to').touched">
                <span class="text-danger" *ngIf="filterForm.get('to').hasError('maxlength')">Maximum of 30 characters</span>
            </span>
          </div>
          <div class="col-md-3 mb-3">
            <label for="search">Search:</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text form-icon-default">
                  <i class="fa fa-search"></i>
                </span>
              </div>
              <input formControlName="needle" class="form-control form-control-sm checking-field" type="text"
                placeholder="Search..." (keyup)="updateFilter($event)" />
            </div>
          </div>
          <span class="help-block" *ngIf="filterForm.get('from').touched">
              <span class="text-danger" *ngIf="filterForm.get('from').hasError('maxlength')">Maximum of 200 characters</span>
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
    <ngx-datatable-column [summaryFunc]="summaryFunc" [width]="30" [sortable]="false" [canAutoResize]="false" [draggable]="true" [resizeable]="false" [headerCheckboxable]="true"
      [checkboxable]="true" *ngIf="enableCheckbox">
    </ngx-datatable-column>
    <ngx-datatable-column [summaryFunc]="(c.summaryFunc) ? c.summaryFunc : summaryFunc" [canAutoResize]="(c.canAutoResize) ? c.canAutoResize : true" [name]="c.columnName" [width]="c.width"
      [sortable]="(c.sortable) ? c.sortable : true" [draggable]="(c.draggable) ? c.draggable : true" [resizeable]="(c.resizeable) ? c.resizeable : true"
      *ngFor="let c of columns">
      <ng-template let-column="column" ngx-datatable-header-template>
        <strong>{{c.columnName}}</strong>
      </ng-template>
      <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row">
        <span>
            <!--{{(c.isDateColumn)?(getFieldValue(row, c.fieldName) | date:'medium') : getFieldValue(row, c.fieldName)}} -->
            <!--{{
              if(c.isDateColumn)
              { 
                (getFieldValue(row, c.fieldName) | date:'medium') 
              }
              else if(c.isCurrencyColumn)
              { 
                (getFieldValue(row, c.fieldName) | currency:'c.currencyText') 
              }
              else 
              {
                getFieldValue(row, c.fieldName)
              }
            }}-->
            <!--<div [ngSwitch]="c.isDateColumn">
              <div *ngSwitchCase="true">{{(getFieldValue(row, c.fieldName) | date:'medium')}}</div>
              <div *ngSwitchDefault></div>
            </div>
            <div [ngSwitch]="c.isCurrencyColumn">
              <div *ngSwitchCase="true">{{(getFieldValue(row, c.fieldName) | currency:'c.currencyText')}}</div>
              <div *ngSwitchDefault></div>
            </div> -->
            <ng-container *ngIf="c.isDateColumn; then t10"></ng-container>
            <ng-container *ngIf="c.isCurrencyColumn && c.currencyText; then t40"></ng-container>
            <ng-container *ngIf="!c.isDateColumn && !c.isCurrencyColumn; then t70"></ng-container>

            <ng-template #t10>
                {{(getFieldValue(row, c.fieldName) | date:'medium')}}
            </ng-template>
            <ng-template #t40>
                {{(getFieldValue(row, c.fieldName) | currency:'c.currencyText')}}
            </ng-template>
            <ng-template #t70>
                {{getFieldValue(row, c.fieldName)}}
            </ng-template>
        </span>
      </ng-template>
    </ngx-datatable-column>
    <ngx-datatable-column [summaryFunc]="summaryFunc" [name]="moreActions.name" *ngIf="moreActions" [sortable]="false" [canAutoResize]="false">
      <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row">
        <span>
          <div class="input-group-prepend">
            <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              <i class="fa fa-list-ul" aria-hidden="true"></i>
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" *ngFor="let action of moreActions.actions" href="javascript:;" (click)="onActionClick({id: row[moreActions.idFieldName], actionName: action.actionName, actionRow: row})">{{action.actionName}}</a>
              <!-- <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                            <div role="separator" class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Separated link</a> -->
            </div>
          </div>
        </span>
      </ng-template>
    </ngx-datatable-column>
    <!-- <ngx-datatable-column name="Description">
              <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row">
                <span>
                  {{value}}
                </span>
              </ng-template>
            </ngx-datatable-column>
            <ngx-datatable-column name="Actions">
              <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row">
                <span>
                  {{value}}
                </span>
              </ng-template>
            </ngx-datatable-column> -->
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
        this.name = "Actions";
        /**
         * Field name id from the server response e.g userId
         */
        this.idFieldName = "id";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWxrLWRhdGF0YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9zdGV3YXJkLWNsaWVudC8iLCJzb3VyY2VzIjpbImxpYi9tbGstZGF0YXRhYmxlL21say1kYXRhdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQVUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakQsT0FBTyxFQUFxQixRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBRS9HLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFzUHpDLE1BQU07Ozs7SUEyQkosWUFBb0IsZUFBc0U7UUFBdEUsb0JBQWUsR0FBZixlQUFlLENBQXVEO1FBekJqRixtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUM1QixzQkFBaUIsR0FBVyxFQUFFLENBQUM7UUFDL0Isc0JBQWlCLEdBQVcsRUFBRSxDQUFDO1FBQy9CLHlCQUFvQixHQUFZLEtBQUssQ0FBQztRQUN0QywyQkFBc0IsR0FBWSxLQUFLLENBQUM7UUFDeEMsWUFBTyxHQUE4QixFQUFFLENBQUM7UUFDeEMsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFFaEMsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBQ3BDLDZCQUF3QixHQUFZLEtBQUssQ0FBQztRQUMxQyxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixv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SUFLdEIseUNBQWtDOzs7OztBQU1wQyxNQUFNOzs7Ozs7SUFjSixZQUFZLE9BQWlDLEVBQUUsRUFBVyxFQUFFLElBQWE7UUFiekU7O1dBRUc7UUFDSCxTQUFJLEdBQVcsU0FBUyxDQUFDO1FBQ3pCOztXQUVHO1FBQ0gsZ0JBQVcsR0FBVyxJQUFJLENBQUM7UUFPekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztDQUVGOzs7Ozs7SUFoQkMsOEJBQXlCOzs7OztJQUl6QixxQ0FBMkI7Ozs7O0lBSTNCLGlDQUFrQzs7Ozs7QUFVcEMsdUNBY0M7Ozs7OztJQVZDLCtCQUFTOzs7OztJQUlULHVDQUFnQjs7Ozs7SUFLaEIsc0NBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0Zvcm0sIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi4vZW50aXRpZXMvd3JhcHBlcnMvcGFnZSc7XG5pbXBvcnQgeyBNbGtEeW5hbWljQ29udHJvbCwgTWxrSW5wdXQsIE1sa1RleHRhcmVhLCBNbGtTZWxlY3QgfSBmcm9tICcuLi9lbnRpdGllcy93cmFwcGVycy9tbGstZHluYW1pYy1jb250cm9sJztcbmltcG9ydCB7IFJlc3BvbnNlV3JhcHBlciB9IGZyb20gJy4uL2VudGl0aWVzL3dyYXBwZXJzL3Jlc3BvbnNlLXdyYXBwZXInO1xuaW1wb3J0IHsgU3Rld2FyZENsaWVudFNlcnZpY2UgfSBmcm9tICcuLi9zdGV3YXJkLWNsaWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGF0YWJsZUNvbXBvbmVudCB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcbmltcG9ydCB7IFF1ZXVlIH0gZnJvbSAncXVldWUtdHlwZXNjcmlwdCc7XG4vL2NvbnN0IHsgUXVldWUgfSA9IHJlcXVpcmUoJ3F1ZXVlLXR5cGVzY3JpcHQnKTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3R3LW1say1kYXRhdGFibGUnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjYXJkIGNhcmQtb3V0bGluZS1kZWZhdWx0XCIgKm5nSWY9XCJlbmFibGVGaWx0ZXJIZWFkZXJcIj5cbjxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cbjxmb3JtIChuZ1N1Ym1pdCk9XCJwcm9jZXNzRmlsdGVyKGZpbHRlckZvcm0pXCIgW2Zvcm1Hcm91cF09XCJmaWx0ZXJGb3JtXCI+XG5cbjxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgIG1iLTNcIiAqbmdGb3I9XCJsZXQgY29udHJvbCBvZiBmaWx0ZXJDb21wb25lbnRzXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZnJvbVwiPnt7Y29udHJvbC5sYWJlbH19OiA8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgIGZvcm0taWNvbi1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICA8aSBbY2xhc3NdPVwiY29udHJvbC5pY29uXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gIFxuICAgICAgICAgICAgICA8c2VsZWN0ICpuZ0lmPVwiaXNTZWxlY3QoY29udHJvbC5jb250cm9sVHlwZSlcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIiBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIiBkaXNhYmxlZCBzZWxlY3RlZD57e2NvbnRyb2wucGxhY2Vob2xkZXJ9fTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IG8gb2YgY29udHJvbC5jb250cm9sVHlwZS5vcHRpb25zXCI+e3tvLnRleHR9fTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgXG4gICAgICAgICAgICAgIDx0ZXh0YXJlYSAqbmdJZj1cImlzVGV4dEFyZWEoY29udHJvbC5jb250cm9sVHlwZSlcIiBbY29sc109XCJjb250cm9sLmNvbnRyb2xUeXBlLmNvbHNcIiBbcm93c109XCJjb250cm9sLmNvbnRyb2xUeXBlLnJvd3NcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIlxuICAgICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCIgW2Zvcm1Db250cm9sTmFtZV09XCJjb250cm9sLm5hbWVcIj48L3RleHRhcmVhPlxuICBcbiAgICAgICAgICAgICAgPGlucHV0ICpuZ0lmPVwiaXNJbnB1dChjb250cm9sLmNvbnRyb2xUeXBlKVwiIFt0eXBlXT1cImNvbnRyb2wuY29udHJvbFR5cGUudHlwZVwiIFtwbGFjZWhvbGRlcl09XCJjb250cm9sLnBsYWNlaG9sZGVyXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCJcbiAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImNvbnRyb2wubmFtZVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS50b3VjaGVkXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ3JlcXVpcmVkJylcIj57e2NvbnRyb2wucGxhY2Vob2xkZXJ9fSBpcyByZXF1aXJlZDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoY29udHJvbC5uYW1lKS5oYXNFcnJvcignbWlubGVuZ3RoJylcIj5NaW5pbXVtIG9mIHt7Y29udHJvbC5jb250cm9sVHlwZS5taW5MZW5ndGh9fSBjaGFyYWN0ZXJzPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZGFuZ2VyXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldChjb250cm9sLm5hbWUpLmhhc0Vycm9yKCdtYXhsZW5ndGgnKVwiPk1heGltdW0gb2Yge3tjb250cm9sLmNvbnRyb2xUeXBlLm1heExlbmd0aH19IGNoYXJhY3RlcnM8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21pbicpXCI+U2hvdWxkIGJlIGdyZWF0ZXIgdGhhbiB7e2NvbnRyb2wuY29udHJvbFR5cGUubWlufX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1kYW5nZXJcIiAqbmdJZj1cImZpbHRlckZvcm0uZ2V0KGNvbnRyb2wubmFtZSkuaGFzRXJyb3IoJ21heCcpXCI+U2hvdWxkIGJlIGxlc3MgdGhhbiB7e2NvbnRyb2wuY29udHJvbFR5cGUubWF4fX08L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cInJvd1wiICpuZ0lmPVwiZW5hYmxlRGVmYXVsdFRhYmxlSGVhZGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIG1iLTNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmcm9tXCI+RnJvbTogPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYXBwZW5kXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC10ZXh0IGZvcm0taWNvbi1kZWZhdWx0XCI+XG4gICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNhbGVuZGFyLW9cIj48L2k+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIiBcbiAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIiBcbiAgICAgICAgICAgICAgICBpZD1cImlucHV0VHJhdmVsRGF0ZVwiIFxuICAgICAgICAgICAgICAgIGZvcm1Db250cm9sTmFtZT1cImZyb21cIiBcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkZyb20uLi5cIlxuICAgICAgICAgICAgICAgICNkcGZyb209XCJic0RhdGVwaWNrZXJcIlxuICAgICAgICAgICAgICAgIGJzRGF0ZXBpY2tlclxuICAgICAgICAgICAgICAgIFtvdXRzaWRlQ2xpY2tdPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgIFtic0NvbmZpZ109XCJ7IGRhdGVJbnB1dEZvcm1hdDogJ0RELU1NLVlZWVknLCBjb250YWluZXJDbGFzczogJ3RoZW1lLXJlZCcgfVwiXG4gICAgICAgICAgICAgICAgbWF4bGVuZ3RoPVwiMzBcIlxuICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgcmVhZG9ubHlcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJkcGZyb20udG9nZ2xlKClcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImRwZnJvbS5pc09wZW5cIj48aSBjbGFzcz1cImZhIGZhLXRoXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGVscC1ibG9ja1wiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS50b3VjaGVkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDMwIGNoYXJhY3RlcnM8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIG1iLTNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmcm9tXCI+VG86IDwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFwcGVuZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dCBmb3JtLWljb24tZGVmYXVsdFwiPlxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jYWxlbmRhci1vXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIgXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtIGNoZWNraW5nLWZpZWxkXCIgXG4gICAgICAgICAgICAgICAgaWQ9XCJpbnB1dFRyYXZlbERhdGVcIiBcbiAgICAgICAgICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJ0b1wiIFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVG8uLi5cIlxuICAgICAgICAgICAgICAgICNkcHRvPVwiYnNEYXRlcGlja2VyXCJcbiAgICAgICAgICAgICAgICBic0RhdGVwaWNrZXJcbiAgICAgICAgICAgICAgICBbb3V0c2lkZUNsaWNrXT1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICBbYnNDb25maWddPVwieyBkYXRlSW5wdXRGb3JtYXQ6ICdERC1NTS1ZWVlZJywgY29udGFpbmVyQ2xhc3M6ICd0aGVtZS1yZWQnIH1cIlxuICAgICAgICAgICAgICAgIG1heGxlbmd0aD1cIjMwXCJcbiAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgIHJlYWRvbmx5XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hcHBlbmRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwiZHB0by50b2dnbGUoKVwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiZHB0by5pc09wZW5cIj48aSBjbGFzcz1cImZhIGZhLXRoXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+ICBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgndG8nKS50b3VjaGVkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ3RvJykuaGFzRXJyb3IoJ21heGxlbmd0aCcpXCI+TWF4aW11bSBvZiAzMCBjaGFyYWN0ZXJzPC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBtYi0zXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwic2VhcmNoXCI+U2VhcmNoOjwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLXByZXBlbmRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHQgZm9ybS1pY29uLWRlZmF1bHRcIj5cbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtc2VhcmNoXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxpbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJuZWVkbGVcIiBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc20gY2hlY2tpbmctZmllbGRcIiB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2guLi5cIiAoa2V5dXApPVwidXBkYXRlRmlsdGVyKCRldmVudClcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWxwLWJsb2NrXCIgKm5nSWY9XCJmaWx0ZXJGb3JtLmdldCgnZnJvbScpLnRvdWNoZWRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWRhbmdlclwiICpuZ0lmPVwiZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS5oYXNFcnJvcignbWF4bGVuZ3RoJylcIj5NYXhpbXVtIG9mIDIwMCBjaGFyYWN0ZXJzPC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwicm93XCI+XG5cdDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwdWxsLXJpZ2h0IGlubGluZS1idXR0b25zXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXdhcm5pbmcgYnRuLXNtXCIgdHlwZT1cInJlc2V0XCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1yZXBlYXRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgICAgUmVzZXRcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuLXNtIHB1bGwtcmlnaHRcIiB0eXBlPVwic3VibWl0XCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1maWx0ZXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgICAgRmlsdGVyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cdDwvZGl2PlxuPC9kaXY+XG4gICAgICBcbjwvZm9ybT5cbjwvZGl2PlxuPC9kaXY+XG4gIFxuICA8bmd4LWRhdGF0YWJsZSBcbiAgICAjdGFibGUgXG4gICAgW3Jvd0hlaWdodF09XCJ0YWJsZVJvd0hlaWdodFwiXG4gICAgW2Zvb3RlckhlaWdodF09XCJ0YWJsZUZvb3RlckhlaWdodFwiXG4gICAgW2hlYWRlckhlaWdodF09XCJ0YWJsZUhlYWRlckhlaWdodFwiIFxuICAgIFtzY3JvbGxiYXJWXT1cInZlcnRpY2FsU2Nyb2xsQWN0aXZlXCJcbiAgICBbc2Nyb2xsYmFySF09XCJob3Jpem9udGFsU2Nyb2xsQWN0aXZlXCJcbiAgICBbc3VtbWFyeVJvd109XCJlbmFibGVTdW1tYXJ5XCJcbiAgICBbc3VtbWFyeVBvc2l0aW9uXT1cInN1bW1hcnlQb3NpdGlvblwiXG4gICAgW3N1bW1hcnlIZWlnaHRdPVwic3VtbWFyeUhlaWdodFwiXG4gICAgY2xhc3M9XCJib290c3RyYXBcIiAgICBcbiAgICBbY29sdW1uTW9kZV09XCInZm9yY2UnXCJcbiAgICBbcm93c109XCJwYWdlLmNvbnRlbnRcIiBcbiAgICBbc2VsZWN0ZWRdPVwic2VsZWN0ZWRcIiBcbiAgICBbc2VsZWN0aW9uVHlwZV09XCInY2hlY2tib3gnXCIgXG4gICAgKGFjdGl2YXRlKT1cIm9uQWN0aXZhdGUoJGV2ZW50KVwiIFxuICAgIChzZWxlY3QpPSdvblNlbGVjdCgkZXZlbnQpJ1xuICAgIFtjb3VudF09XCJwYWdlLnRvdGFsRWxlbWVudHNcIiBcbiAgICBbb2Zmc2V0XT1cInBhZ2UubnVtYmVyXCIgXG4gICAgW2V4dGVybmFsUGFnaW5nXT1cInRydWVcIiBcbiAgICBbbGltaXRdPVwicGFnZS5zaXplXCIgXG4gICAgKHBhZ2UpPVwibG9hZFBhZ2UoJGV2ZW50LCBudWxsKVwiPlxuICAgIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBbc3VtbWFyeUZ1bmNdPVwic3VtbWFyeUZ1bmNcIiBbd2lkdGhdPVwiMzBcIiBbc29ydGFibGVdPVwiZmFsc2VcIiBbY2FuQXV0b1Jlc2l6ZV09XCJmYWxzZVwiIFtkcmFnZ2FibGVdPVwidHJ1ZVwiIFtyZXNpemVhYmxlXT1cImZhbHNlXCIgW2hlYWRlckNoZWNrYm94YWJsZV09XCJ0cnVlXCJcbiAgICAgIFtjaGVja2JveGFibGVdPVwidHJ1ZVwiICpuZ0lmPVwiZW5hYmxlQ2hlY2tib3hcIj5cbiAgICA8L25neC1kYXRhdGFibGUtY29sdW1uPlxuICAgIDxuZ3gtZGF0YXRhYmxlLWNvbHVtbiBbc3VtbWFyeUZ1bmNdPVwiKGMuc3VtbWFyeUZ1bmMpID8gYy5zdW1tYXJ5RnVuYyA6IHN1bW1hcnlGdW5jXCIgW2NhbkF1dG9SZXNpemVdPVwiKGMuY2FuQXV0b1Jlc2l6ZSkgPyBjLmNhbkF1dG9SZXNpemUgOiB0cnVlXCIgW25hbWVdPVwiYy5jb2x1bW5OYW1lXCIgW3dpZHRoXT1cImMud2lkdGhcIlxuICAgICAgW3NvcnRhYmxlXT1cIihjLnNvcnRhYmxlKSA/IGMuc29ydGFibGUgOiB0cnVlXCIgW2RyYWdnYWJsZV09XCIoYy5kcmFnZ2FibGUpID8gYy5kcmFnZ2FibGUgOiB0cnVlXCIgW3Jlc2l6ZWFibGVdPVwiKGMucmVzaXplYWJsZSkgPyBjLnJlc2l6ZWFibGUgOiB0cnVlXCJcbiAgICAgICpuZ0Zvcj1cImxldCBjIG9mIGNvbHVtbnNcIj5cbiAgICAgIDxuZy10ZW1wbGF0ZSBsZXQtY29sdW1uPVwiY29sdW1uXCIgbmd4LWRhdGF0YWJsZS1oZWFkZXItdGVtcGxhdGU+XG4gICAgICAgIDxzdHJvbmc+e3tjLmNvbHVtbk5hbWV9fTwvc3Ryb25nPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtdmFsdWU9XCJ2YWx1ZVwiIGxldC1yb3c9XCJyb3dcIj5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICA8IS0te3soYy5pc0RhdGVDb2x1bW4pPyhnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpIHwgZGF0ZTonbWVkaXVtJykgOiBnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpfX0gLS0+XG4gICAgICAgICAgICA8IS0te3tcbiAgICAgICAgICAgICAgaWYoYy5pc0RhdGVDb2x1bW4pXG4gICAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgKGdldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSkgfCBkYXRlOidtZWRpdW0nKSBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIGlmKGMuaXNDdXJyZW5jeUNvbHVtbilcbiAgICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICAoZ2V0RmllbGRWYWx1ZShyb3csIGMuZmllbGROYW1lKSB8IGN1cnJlbmN5OidjLmN1cnJlbmN5VGV4dCcpIFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2UgXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19LS0+XG4gICAgICAgICAgICA8IS0tPGRpdiBbbmdTd2l0Y2hdPVwiYy5pc0RhdGVDb2x1bW5cIj5cbiAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiPnt7KGdldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSkgfCBkYXRlOidtZWRpdW0nKX19PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoRGVmYXVsdD48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBbbmdTd2l0Y2hdPVwiYy5pc0N1cnJlbmN5Q29sdW1uXCI+XG4gICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cInRydWVcIj57eyhnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpIHwgY3VycmVuY3k6J2MuY3VycmVuY3lUZXh0Jyl9fTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaERlZmF1bHQ+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj4gLS0+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYy5pc0RhdGVDb2x1bW47IHRoZW4gdDEwXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYy5pc0N1cnJlbmN5Q29sdW1uICYmIGMuY3VycmVuY3lUZXh0OyB0aGVuIHQ0MFwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjLmlzRGF0ZUNvbHVtbiAmJiAhYy5pc0N1cnJlbmN5Q29sdW1uOyB0aGVuIHQ3MFwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI3QxMD5cbiAgICAgICAgICAgICAgICB7eyhnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpIHwgZGF0ZTonbWVkaXVtJyl9fVxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdDQwPlxuICAgICAgICAgICAgICAgIHt7KGdldEZpZWxkVmFsdWUocm93LCBjLmZpZWxkTmFtZSkgfCBjdXJyZW5jeTonYy5jdXJyZW5jeVRleHQnKX19XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICN0NzA+XG4gICAgICAgICAgICAgICAge3tnZXRGaWVsZFZhbHVlKHJvdywgYy5maWVsZE5hbWUpfX1cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj5cbiAgICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gW3N1bW1hcnlGdW5jXT1cInN1bW1hcnlGdW5jXCIgW25hbWVdPVwibW9yZUFjdGlvbnMubmFtZVwiICpuZ0lmPVwibW9yZUFjdGlvbnNcIiBbc29ydGFibGVdPVwiZmFsc2VcIiBbY2FuQXV0b1Jlc2l6ZV09XCJmYWxzZVwiPlxuICAgICAgPG5nLXRlbXBsYXRlIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZSBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiIGxldC12YWx1ZT1cInZhbHVlXCIgbGV0LXJvdz1cInJvd1wiPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtcHJlcGVuZFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc20gYnRuLW91dGxpbmUtc2Vjb25kYXJ5IGRyb3Bkb3duLXRvZ2dsZVwiIHR5cGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxuICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIj5cbiAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1saXN0LXVsXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPlxuICAgICAgICAgICAgICA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIG1vcmVBY3Rpb25zLmFjdGlvbnNcIiBocmVmPVwiamF2YXNjcmlwdDo7XCIgKGNsaWNrKT1cIm9uQWN0aW9uQ2xpY2soe2lkOiByb3dbbW9yZUFjdGlvbnMuaWRGaWVsZE5hbWVdLCBhY3Rpb25OYW1lOiBhY3Rpb24uYWN0aW9uTmFtZSwgYWN0aW9uUm93OiByb3d9KVwiPnt7YWN0aW9uLmFjdGlvbk5hbWV9fTwvYT5cbiAgICAgICAgICAgICAgPCEtLSA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiI1wiPkFub3RoZXIgYWN0aW9uPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCIjXCI+U29tZXRoaW5nIGVsc2UgaGVyZTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHJvbGU9XCJzZXBhcmF0b3JcIiBjbGFzcz1cImRyb3Bkb3duLWRpdmlkZXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImRyb3Bkb3duLWl0ZW1cIiBocmVmPVwiI1wiPlNlcGFyYXRlZCBsaW5rPC9hPiAtLT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XG4gICAgPCEtLSA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gbmFtZT1cIkRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ3gtZGF0YXRhYmxlLWNlbGwtdGVtcGxhdGUgbGV0LXJvd0luZGV4PVwicm93SW5kZXhcIiBsZXQtdmFsdWU9XCJ2YWx1ZVwiIGxldC1yb3c9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgIHt7dmFsdWV9fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvbmd4LWRhdGF0YWJsZS1jb2x1bW4+XG4gICAgICAgICAgICA8bmd4LWRhdGF0YWJsZS1jb2x1bW4gbmFtZT1cIkFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5neC1kYXRhdGFibGUtY2VsbC10ZW1wbGF0ZSBsZXQtcm93SW5kZXg9XCJyb3dJbmRleFwiIGxldC12YWx1ZT1cInZhbHVlXCIgbGV0LXJvdz1cInJvd1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAge3t2YWx1ZX19XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9uZ3gtZGF0YXRhYmxlLWNvbHVtbj4gLS0+XG4gIDwvbmd4LWRhdGF0YWJsZT5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBNbGtEYXRhdGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQgXG57XG4gIEBJbnB1dCgpIHRhYmxlUm93SGVpZ2h0OiBudW1iZXIgPSA1MDtcbiAgQElucHV0KCkgdGFibGVGb290ZXJIZWlnaHQ6IG51bWJlciA9IDUwO1xuICBASW5wdXQoKSB0YWJsZUhlYWRlckhlaWdodDogbnVtYmVyID0gNTA7XG4gIEBJbnB1dCgpIHZlcnRpY2FsU2Nyb2xsQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGhvcml6b250YWxTY3JvbGxBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY29sdW1uczogQXJyYXk8TWxrRGF0YVRhYmxlQ29sdW1uPiA9IFtdO1xuICBASW5wdXQoKSBlbmFibGVDaGVja2JveDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBlbmRwb2ludDogc3RyaW5nO1xuICBASW5wdXQoKSBlbmFibGVGaWx0ZXJIZWFkZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZW5hYmxlRGVmYXVsdFRhYmxlSGVhZGVyOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGVuYWJsZVN1bW1hcnk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgc3VtbWFyeVBvc2l0aW9uOiBzdHJpbmcgPSBcIidib3R0b20nXCI7XG4gIEBJbnB1dCgpIHN1bW1hcnlIZWlnaHQ6IHN0cmluZyA9IFwiJ2F1dG8nXCI7XG4gIEBJbnB1dCgpIG1vcmVBY3Rpb25zOiBNbGtNb3JlQWN0aW9ucztcbiAgQE91dHB1dCgpIG9uQWN0aW9uc0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxNbGtNb3JlQWN0aW9uRGF0YT4oKVxuICBASW5wdXQoKSBmaWx0ZXJDb21wb25lbnRzOiBBcnJheTxNbGtEeW5hbWljQ29udHJvbDxhbnk+PiA9IFtdO1xuICBASW5wdXQoKSBwYXJhbXM6IE1hcDxzdHJpbmcsIGFueT47XG4gIHBhZ2U6IFBhZ2U8YW55PiA9IG5ldyBQYWdlKCk7XG4gIHNlbGVjdGVkID0gW107XG4gIEBWaWV3Q2hpbGQoRGF0YXRhYmxlQ29tcG9uZW50KSB0YWJsZTogRGF0YXRhYmxlQ29tcG9uZW50O1xuICBmaWx0ZXI6IE9iamVjdCA9IHt9O1xuICBmaWx0ZXJGb3JtOiBGb3JtR3JvdXA7XG4gIGVtcHR5U3VtbWFyeUZ1bmM6ICgpID0+IG51bGw7XG4gIDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0ZXJ3YXJkU2VydmljZTogU3Rld2FyZENsaWVudFNlcnZpY2U8UmVzcG9uc2VXcmFwcGVyPFBhZ2U8YW55Pj4sIGFueT4pIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBmb3JtIGNvbnRyb2wgZnJvbSBmaWx0ZXJDb21wb25lbnRzIGFuZCBhbHNvIGFwcGVuZGluZyBkZWZhdWx0IGNvbnRyb2xzIGllLiBkYXRlIGZpbHRlciBhbmQgc2VhcmNoIGNvbnRyb2xzXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICBsZXQgZ3JvdXAgPSB7fTtcbiAgICB0aGlzLmZpbHRlckNvbXBvbmVudHMuZm9yRWFjaChjb21wID0+IHtcbiAgICAgIGxldCB2YWxpZGF0b3JzOiBBcnJheTxhbnk+ID0gW107XG4gICAgICBpZiAoY29tcC5pc1JlcXVpcmVkKSB7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICAgIH1cblxuICAgICAgaWYoY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIE1sa0lucHV0IHx8IGNvbXAuY29udHJvbFR5cGUgaW5zdGFuY2VvZiBNbGtUZXh0YXJlYSl7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbkxlbmd0aChjb21wLmNvbnRyb2xUeXBlLm1pbkxlbmd0aCkpO1xuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5tYXhMZW5ndGgoY29tcC5jb250cm9sVHlwZS5tYXhMZW5ndGgpKTtcbiAgICAgIH1cblxuICAgICAgaWYoY29tcC5jb250cm9sVHlwZSBpbnN0YW5jZW9mIE1sa0lucHV0KXtcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMubWF4KGNvbXAuY29udHJvbFR5cGUubWF4KSk7XG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLm1pbihjb21wLmNvbnRyb2xUeXBlLm1pbikpO1xuICAgICAgfVxuICAgICAgZ3JvdXBbY29tcC5uYW1lXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgdmFsaWRhdG9ycylcbiAgICB9KTtcbiAgICAvL2FkZCBkZWZhdWx0IGNvbnRyb2xzXG4gICAgZ3JvdXBbJ2Zyb20nXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMzApKTtcbiAgICBncm91cFsndG8nXSA9IG5ldyBGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5tYXhMZW5ndGgoMzApKTtcbiAgICBncm91cFsnbmVlZGxlJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMubWF4TGVuZ3RoKDIwMCkpO1xuICAgIHRoaXMuZmlsdGVyRm9ybSA9IG5ldyBGb3JtR3JvdXAoZ3JvdXApO1xuICAgIHRoaXMubG9hZFBhZ2UoeyBvZmZzZXQ6IDAsIGxpbWl0OiB0aGlzLnBhZ2Uuc2l6ZSB9LCBudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGVtaXQgY2xpY2sgZXZlbnQgb2YgdGhlIGFjdGlvbnNcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBvbkFjdGlvbkNsaWNrKGV2ZW50OiBNbGtNb3JlQWN0aW9uRGF0YSkge1xuICAgIHRoaXMub25BY3Rpb25zRXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICAvKipcbiAgICogUHJvY2VzcyBzZXJ2ZXIgcmVxdWVzdCBvZiBkYXRhYmxlXG4gICAqIEBwYXJhbSBwYWdlSW5mb1xuICAgKiBAcGFyYW0gZmlsdGVyc1xuICAgKi9cbiAgbG9hZFBhZ2UocGFnZUluZm8sIGZpbHRlcnMpIHtcbiAgICBpZiAoIXRoaXMuZW5kcG9pbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHJlcXVlc3Q6IE1hcDxzdHJpbmcsIGFueT47XG4gICAgaWYgKGZpbHRlcnMpIHtcbiAgICAgIHJlcXVlc3QgPSBmaWx0ZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBpZih0aGlzLnBhcmFtcyl7XG4gICAgICB0aGlzLnBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KT0+e1xuICAgICAgICByZXF1ZXN0LnNldChrZXksIHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXF1ZXN0LnNldChcInBhZ2VcIiwgcGFnZUluZm8ub2Zmc2V0KTtcbiAgICByZXF1ZXN0LnNldChcInNpemVcIiwgcGFnZUluZm8ubGltaXQpO1xuICAgIHRoaXMuc3RlcndhcmRTZXJ2aWNlLmdldCh0aGlzLmVuZHBvaW50LCByZXF1ZXN0KS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLmNvZGUgPT0gMjAwKSB7XG4gICAgICAgIHRoaXMucGFnZSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGhhbmRsZSBzZWxlY3Qgb3B0aW9uXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgb25TZWxlY3QoZXZlbnQpIHtcblxuICB9XG5cbiAgb25BY3RpdmF0ZShldmVudCkge1xuXG4gIH1cblxuICB1cGRhdGVGaWx0ZXIoZXZlbnQpIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gcHJvY2VzcyB0YWJsZSBmaWx0ZXIuIElmIGRhdGUgZmlsdGVyIGlzIG5vdCBwcm92aWRlIHRoZSBmcm9tIHZhbHVlIGlzIFxuICAgKiBzZXQgdG8gMjAxOC0wMS0wMSBhbmQgdG8gdmFsdWUgaXMgc2V0IHRvIDEgeWVhciBmcm9tIHRvZGF5XG4gICAqIEBwYXJhbSBmb3JtIFxuICAgKi9cbiAgcHJvY2Vzc0ZpbHRlcihmb3JtKSB7XG4gICAgLy9AdHMtaWdub3JlXG4gICAgbGV0IGY6IE1hcDxTdHJpbmcsIGFueT4gPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKHRoaXMuZmlsdGVyRm9ybS52YWx1ZSkpO1xuICAgIC8vdmFsaWRhdGUgZGF0ZSBcbiAgICBpZighdGhpcy5maWx0ZXJGb3JtLmdldCgnZnJvbScpLnRvdWNoZWQpXG4gICAgey8vaWYgZnJvbSBpcyBub3QgcG9wdWxhdGVkIHJlbW92ZSBmcm9tIHJlcXVlc3RcbiAgICAgIGYuZGVsZXRlKCdmcm9tJyk7XG4gICAgICAvLyB0aGlzLmZpbHRlckZvcm0uZ2V0KCdmcm9tJykuc2V0VmFsdWUoJzIwMTgtMDEtMDEnKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIC8vZi5nZXQoJ2Zyb20nKS5zZXRWYWx1ZShuZXcgRGF0ZSh0aGlzLmZpbHRlckZvcm0uZ2V0KCdmcm9tJykudmFsdWUpKTtcbiAgICAgIGxldCBmZCA9IG5ldyBEYXRlKHRoaXMuZmlsdGVyRm9ybS5nZXQoJ2Zyb20nKS52YWx1ZSk7XG4gICAgICBmLnNldCgnZnJvbScsIGZkLnRvSVNPU3RyaW5nKCkpO1xuICAgIH1cbiAgICBpZighdGhpcy5maWx0ZXJGb3JtLmdldCgndG8nKS50b3VjaGVkKVxuICAgIHsvL2lmIHRvIGlzIG5vdCBwb3B1bGF0ZWQgcmVtb3ZlIGZyb20gcmVxdWVzdFxuICAgICAgZi5kZWxldGUoJ3RvJyk7XG4gICAgICAvLyBsZXQgdG9EYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIC8vIHRvRGF0ZS5zZXREYXRlKHRvRGF0ZS5nZXRGdWxsWWVhcigpICsgMSk7XG4gICAgICAvLyB0aGlzLmZpbHRlckZvcm0uZ2V0KCd0bycpLnNldFZhbHVlKHRoaXMuZ2V0Rm9ybWF0dGVkRGF0ZSh0b0RhdGUpKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgIC8vZi5nZXQoJ3RvJykuc2V0VmFsdWUobmV3IERhdGUodGhpcy5maWx0ZXJGb3JtLmdldCgndG8nKS52YWx1ZSkpO1xuICAgICAgbGV0IHRkID0gbmV3IERhdGUodGhpcy5maWx0ZXJGb3JtLmdldCgndG8nKS52YWx1ZSk7XG4gICAgICBmLnNldCgndG8nLCB0ZC50b0lTT1N0cmluZygpKTtcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRQYWdlKHsgb2Zmc2V0OiB0aGlzLnBhZ2UubnVtYmVyLCBsaW1pdDogdGhpcy5wYWdlLnNpemUgfSwgZik7XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBjaGVjayBpZiBtaWxpa2kgY29udHJvbCBpcyBpbnB1dFxuICAgKiBAcGFyYW0gY29udHJvbFxuICAgKi9cbiAgaXNJbnB1dChjb250cm9sOiBhbnkpIHtcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIE1sa0lucHV0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY2hlY2sgaWYgbWlsaWtpIGNvbnRyb2wgaXMgc2VsZWN0XG4gICAqIEBwYXJhbSBjb250cm9sXG4gICAqL1xuICBpc1NlbGVjdChjb250cm9sOiBhbnkpIHtcbiAgICByZXR1cm4gY29udHJvbCBpbnN0YW5jZW9mIE1sa1NlbGVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGNoZWNrIGlmIG1pbGlraSBjb250cm9sIGlzIHRleHRhcmVhXG4gICAqL1xuICBpc1RleHRBcmVhKGNvbnRyb2w6IGFueSkge1xuICAgIHJldHVybiBjb250cm9sIGluc3RhbmNlb2YgTWxrVGV4dGFyZWE7XG4gIH1cblxuICBzdW1tYXJ5RnVuYyhjZWxsOiBhbnkpIHtcbiAgICByZXR1cm4oYGApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZm9ybWF0IGRhdGUgdG8gc3RyaW5nIHl5eXktTU0tZGRcbiAgICogQHBhcmFtIGRhdGVcbiAgICovXG4gIGdldEZvcm1hdHRlZERhdGUoZGF0ZSkge1xuICAgIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgdmFyIG1vbnRoID0gKDEgKyBkYXRlLmdldE1vbnRoKCkpLnRvU3RyaW5nKCk7XG4gICAgbW9udGggPSBtb250aC5sZW5ndGggPiAxID8gbW9udGggOiAnMCcgKyBtb250aDtcblxuICAgIHZhciBkYXkgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpO1xuICAgIGRheSA9IGRheS5sZW5ndGggPiAxID8gZGF5IDogJzAnICsgZGF5O1xuXG4gICAgcmV0dXJuIHllYXIgKyAnLScgKyBtb250aCArICctJyArIGRheTtcbiAgfVxuXG4gIGdldEZpZWxkVmFsdWUoZGF0YTogT2JqZWN0LCBmaWVsZDogYW55KXtcbiAgICB2YXIgazogQXJyYXk8c3RyaW5nPiA9IGZpZWxkLnNwbGl0KFwiLlwiKTtcbiAgICB2YXIga2V5cyA9IG5ldyBRdWV1ZTxzdHJpbmc+KC4uLmspO1xuICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0T2JqZWN0VmFsdWUoZGF0YSwga2V5cyk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gZmluZCBrZXkgdmFsdWUgYmFzZWQgb24gdGhlIGtleSBzZXF1ZW5jZSBwcm92aWRlZFxuICAgKiBAcGFyYW0gZGF0YSBleHBlY3RzIGFuIG9iamVjdFxuICAgKiBAcGFyYW0ga2V5cyBpLmUuIHVzZXIuZ2VuZGVyLnR5cGUudHlwZVxuICAgKi9cbiAgZ2V0T2JqZWN0VmFsdWUoZGF0YTogYW55LCBrZXlzOiBRdWV1ZTxzdHJpbmc+KSB7XG4gICAgaWYgKCghKGRhdGEgaW5zdGFuY2VvZiBPYmplY3QpKSB8fCAoa2V5cy5sZW5ndGggPT0gMSkpICB7XG4gICAgICByZXR1cm4gZGF0YVtrZXlzLnRhaWxdO1xuICAgIH1cbiAgICBsZXQgdmFsdWUgPSBudWxsO1xuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKChrZXkgPT0ga2V5cy5mcm9udCkgJiYgKGRhdGFba2V5XSBpbnN0YW5jZW9mIE9iamVjdCkpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmdldE9iamVjdFZhbHVlKGRhdGFba2V5XSwga2V5cyk7XG4gICAgICB9IGVsc2UgaWYoa2V5ID09IGtleXMudGFpbCl7XG4gICAgICAgIHZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2YWx1ZTtcblxuICB9XG5cbn1cbi8qKlxuICogVXNlZCB0byBkZWZpbmUgZGF0YXRhYmxlIGNvbHVtbnMgd2l0aCBhdHRyaWJ1dGVzIChjb2x1bW5OYW1lLCBmaWVsZE5hbWUsIHdpZHRoLCBzb3J0YWJsZSwgY2FuQXV0b1Jlc2l6ZSxcbiAqIGRyYWdnYWJsZSwgcmVzaXphYmxlLCBpc0RhdGVDb2x1bW4sIGlzQ3VycmVuY3lDb2x1bW4sIGN1cnJlbmN5VGV4dCwgc3VtbWFyeUZ1bmMpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWxrRGF0YVRhYmxlQ29sdW1uIHtcbiAgLyoqXG4gICAqIGNvbHVtbiB0aXRsZVxuICAgKi9cbiAgY29sdW1uTmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogU2VydmVyIHNpZGUgcmVzcG9uc2UgZmllbGQgY29ycmVzcG9uZGluZyB0byB0aGUgY29sdW1uIGkuZSBmdWxsTmFtZSBtYXkgY29ycmVzcG9uZCB0byBOYW1lIGNvbHVtblxuICAgKi9cbiAgZmllbGROYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBXaWR0aCBvZiB0aGUgY29sdW1uXG4gICAqL1xuICB3aWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIEVuYWJsZSBzb3J0aW5nIGluIGEgY29sdW1uXG4gICAqL1xuICBzb3J0YWJsZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBNYWtlcyBhIGNvbHVtbiByZXNpemFibGVcbiAgICovXG4gIGNhbkF1dG9SZXNpemU/OiBib29sZWFuO1xuICAvKipcbiAgICogRW5hYmxlcyBhIGNvbHVtbiB0byBiZSBkcmFnZ2FibGVcbiAgICovXG4gIGRyYWdnYWJsZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBNYWtlcyBhIGNvbHVtbiByZXNpemFibGVcbiAgICovXG4gIHJlc2l6ZWFibGU/OiBib29sZWFuO1xuICAvKipcbiAgICogVXNlZCB0byBlbmFibGUgZm9ybWF0aW5nIHRpbWVzdGFtcCB0byBzdHJpbmcgZGF0ZVxuICAgKi9cbiAgaXNEYXRlQ29sdW1uPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogVXNlZCB0byBlbmFibGUgZm9ybWF0aW5nIHN0cmluZyB0byBzdHJpbmcgY3VycmVuY3lcbiAgICovXG4gIGlzQ3VycmVuY3lDb2x1bW4/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBVc2VkIHRvIHNldCB0aGUgY3VycmVuY3kgc3RyaW5nXG4gICAqL1xuICBjdXJyZW5jeVRleHQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGNhbGwgYXQgdGhlIHN1bW1hcnkgcm93XG4gICAqL1xuICBzdW1tYXJ5RnVuYz86IChhbnk6IGFueVtdKSA9PiBhbnk7XG59XG5cbi8qKlxuICogVXNlZCB0byBkaXNwbGF5IG1vcmUgYWN0aW9ucyBjb2x1bW4gYW5kIHRoZSBlbmQgb2YgdGhlIHRhYmxlXG4gKi9cbmV4cG9ydCBjbGFzcyBNbGtNb3JlQWN0aW9ucyB7XG4gIC8qKlxuICAgKiBBY3Rpb24gQ29sdW1uIG5hbWUgZS5nLiBNb3JlIEFjdGlvbnNcbiAgICovXG4gIG5hbWU6IHN0cmluZyA9IFwiQWN0aW9uc1wiO1xuICAvKipcbiAgICogRmllbGQgbmFtZSBpZCBmcm9tIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgZS5nIHVzZXJJZFxuICAgKi9cbiAgaWRGaWVsZE5hbWU6IHN0cmluZyA9IFwiaWRcIjtcbiAgLyoqXG4gICAqIEFjdGlvbnMgZS5nLiBFZGl0LCBEZWxldGVcbiAgICovXG4gIGFjdGlvbnM6IEFycmF5PE1sa01vcmVBY3Rpb25EYXRhPjtcblxuICBjb25zdHJ1Y3RvcihhY3Rpb25zOiBBcnJheTxNbGtNb3JlQWN0aW9uRGF0YT4sIGlkPzogc3RyaW5nLCBuYW1lPzogc3RyaW5nKSB7XG4gICAgdGhpcy5hY3Rpb25zID0gYWN0aW9ucztcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaWRGaWVsZE5hbWUgPSBpZDtcbiAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWxrTW9yZUFjdGlvbkRhdGEge1xuICAvKipcbiAgICogTmV2ZXIgbWluZCB0aGlzIGZpZWxkIGl0IHdpbGwgYmUgdXNlZCBieSB0aGUgbGlicmFyeVxuICAgKi9cbiAgaWQ/OiBhbnk7XG4gIC8qKlxuICAgKiBBY3Rpb24gbmFtZSBlLmcuIEVkaXQsIERlbGV0ZVxuICAgKi9cbiAgYWN0aW9uTmFtZTogYW55O1xuXG4gIC8qKlxuICAgKiBBY3Rpb24gcm93IDogdGhlIGNsaWNrZWQgcm93XG4gICAqL1xuICBhY3Rpb25Sb3c/OiBhbnk7XG59Il19