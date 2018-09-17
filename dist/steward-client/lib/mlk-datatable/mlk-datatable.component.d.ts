import { OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Page } from '../entities/wrappers/page';
import { MlkDynamicControl } from '../entities/wrappers/mlk-dynamic-control';
import { ResponseWrapper } from '../entities/wrappers/response-wrapper';
import { StewardClientService } from '../steward-client.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Queue } from 'queue-typescript';
export declare class MlkDatatableComponent implements OnInit {
    private sterwardService;
    columns: Array<MlkDataTableColumn>;
    enableCheckbox: boolean;
    endpoint: string;
    enableSummary: boolean;
    summaryPosition: string;
    summaryHeight: string;
    moreActions: MlkMoreActions;
    onActionsEvent: EventEmitter<MlkMoreActionData>;
    filterComponents: Array<MlkDynamicControl<any>>;
    params: Map<string, any>;
    page: Page<any>;
    selected: any[];
    table: DatatableComponent;
    filter: Object;
    filterForm: FormGroup;
    emptySummaryFunc: () => null;
    constructor(sterwardService: StewardClientService<ResponseWrapper<Page<any>>, any>);
    /**
     * Generate form control from filterComponents and also appending default controls ie. date filter and search controls
     */
    ngOnInit(): void;
    /**
     * Used to emit click event of the actions
     * @param event
     */
    onActionClick(event: MlkMoreActionData): void;
    /**
     * Process server request of datable
     * @param pageInfo
     * @param filters
     */
    loadPage(pageInfo: any, filters: any): void;
    /**
     * Used to handle select option
     * @param event
     */
    onSelect(event: any): void;
    onActivate(event: any): void;
    updateFilter(event: any): void;
    /**
     * Used to process table filter. If date filter is not provide the from value is
     * set to 2018-01-01 and to value is set to 1 year from today
     * @param form
     */
    processFilter(form: any): void;
    /**
     * Used to check if miliki control is input
     * @param control
     */
    isInput(control: any): boolean;
    /**
     * Used to check if miliki control is select
     * @param control
     */
    isSelect(control: any): boolean;
    /**
     * Used to check if miliki control is textarea
     */
    isTextArea(control: any): boolean;
    summaryFunc(cell: any): string;
    /**
     * Used to format date to string yyyy-MM-dd
     * @param date
     */
    getFormattedDate(date: any): string;
    getFieldValue(data: Object, field: any): any;
    /**
     * Used to find key value based on the key sequence provided
     * @param data expects an object
     * @param keys i.e. user.gender.type.type
     */
    getObjectValue(data: any, keys: Queue<string>): any;
}
/**
 * Used to define datatable columns with attributes (columnName, fieldName, width, sortable, canAutoResize,
 * draggable, resizable, isDateColumn, summaryFunc)
 */
export interface MlkDataTableColumn {
    /**
     * column title
     */
    columnName: string;
    /**
     * Server side response field corresponding to the column i.e fullName may correspond to Name column
     */
    fieldName: string;
    /**
     * Width of the column
     */
    width?: number;
    /**
     * Enable sorting in a column
     */
    sortable?: boolean;
    /**
     * Makes a column resizable
     */
    canAutoResize?: boolean;
    /**
     * Enables a column to be draggable
     */
    draggable?: boolean;
    /**
     * Makes a column resizable
     */
    resizeable?: boolean;
    /**
     * Used to enable formating timestamp to string date
     */
    isDateColumn?: boolean;
    /**
     * Function to call at the summary row
     */
    summaryFunc?: (any: any[]) => any;
}
/**
 * Used to display more actions column and the end of the table
 */
export declare class MlkMoreActions {
    /**
     * Action Column name e.g. More Actions
     */
    name: string;
    /**
     * Field name id from the server response e.g userId
     */
    idFieldName: string;
    /**
     * Actions e.g. Edit, Delete
     */
    actions: Array<MlkMoreActionData>;
    constructor(actions: Array<MlkMoreActionData>, id?: string, name?: string);
}
export interface MlkMoreActionData {
    /**
     * Never mind this field it will be used by the library
     */
    id?: any;
    /**
     * Action name e.g. Edit, Delete
     */
    actionName: any;
}
