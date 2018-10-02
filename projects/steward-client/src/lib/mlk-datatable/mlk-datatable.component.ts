import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Page } from '../entities/wrappers/page';
import { MlkDynamicControl, MlkInput, MlkTextarea, MlkSelect } from '../entities/wrappers/mlk-dynamic-control';
import { ResponseWrapper } from '../entities/wrappers/response-wrapper';
import { StewardClientService } from '../steward-client.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Queue } from 'queue-typescript';
//const { Queue } = require('queue-typescript');

@Component({
  selector: 'stw-mlk-datatable',
  templateUrl: './mlk-datatable.component.html',
  styleUrls: ['./mlk-datatable.component.css']
})
export class MlkDatatableComponent implements OnInit {
  @Input() columns: Array<MlkDataTableColumn> = [];
  @Input() enableCheckbox: boolean = false;
  @Input() endpoint: string;
  @Input() enableFilterHeader: boolean = false;
  @Input() enableDefaultTableHeader: boolean = false;
  @Input() enableSummary: boolean = false;
  @Input() summaryPosition: string = "'bottom'";
  @Input() summaryHeight: string = "'auto'";
  @Input() moreActions: MlkMoreActions;
  @Output() onActionsEvent = new EventEmitter<MlkMoreActionData>()
  @Input() filterComponents: Array<MlkDynamicControl<any>> = [];
  @Input() params: Map<string, any>;
  page: Page<any> = new Page();
  selected = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  filter: Object = {};
  filterForm: FormGroup;
  emptySummaryFunc: () => null;
  ;

  constructor(private sterwardService: StewardClientService<ResponseWrapper<Page<any>>, any>) {
  }

  /**
   * Generate form control from filterComponents and also appending default controls ie. date filter and search controls
   */
  ngOnInit() {
    let group = {};
    this.filterComponents.forEach(comp => {
      let validators: Array<any> = [];
      if (comp.isRequired) {
        validators.push(Validators.required);
      }

      if(comp.controlType instanceof MlkInput || comp.controlType instanceof MlkTextarea){
        validators.push(Validators.minLength(comp.controlType.minLength));
        validators.push(Validators.maxLength(comp.controlType.maxLength));
      }

      if(comp.controlType instanceof MlkInput){
        validators.push(Validators.max(comp.controlType.max));
        validators.push(Validators.min(comp.controlType.min));
      }
      group[comp.name] = new FormControl('', validators)
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
   * @param event
   */
  onActionClick(event: MlkMoreActionData) {
    this.onActionsEvent.emit(event);
  }

  /**
   * Process server request of datable
   * @param pageInfo
   * @param filters
   */
  loadPage(pageInfo, filters) {
    if (!this.endpoint) {
      return;
    }
    let request: Map<string, any>;
    if (filters) {
      request = filters;
    } else {
      request = new Map();
    }
    if(this.params){
      this.params.forEach((value, key)=>{
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
   * @param event
   */
  onSelect(event) {

  }

  onActivate(event) {

  }

  updateFilter(event) {

  }

  /**
   * Used to process table filter. If date filter is not provide the from value is 
   * set to 2018-01-01 and to value is set to 1 year from today
   * @param form 
   */
  processFilter(form) {
    //@ts-ignore
    let f: Map<String, any> = new Map(Object.entries(this.filterForm.value));
    //validate date 
    if(!this.filterForm.get('from').touched){//if from is not populated remove from request
      f.delete('from');
      // this.filterForm.get('from').setValue('2018-01-01');
    }
    if(!this.filterForm.get('to').touched){//if to is not populated remove from request
      f.delete('to');
      // let toDate = new Date();
      // toDate.setDate(toDate.getFullYear() + 1);
      // this.filterForm.get('to').setValue(this.getFormattedDate(toDate));
    }

    this.loadPage({ offset: this.page.number, limit: this.page.size }, f);
  }

  /**
   * Used to check if miliki control is input
   * @param control
   */
  isInput(control: any) {
    return control instanceof MlkInput;
  }

  /**
   * Used to check if miliki control is select
   * @param control
   */
  isSelect(control: any) {
    return control instanceof MlkSelect;
  }

  /**
   * Used to check if miliki control is textarea
   */
  isTextArea(control: any) {
    return control instanceof MlkTextarea;
  }

  summaryFunc(cell: any) {
    return(``);
  }

  /**
   * Used to format date to string yyyy-MM-dd
   * @param date
   */
  getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return year + '-' + month + '-' + day;
  }

  getFieldValue(data: Object, field: any){
    var k: Array<string> = field.split(".");
    var keys = new Queue<string>(...k);
    let value = this.getObjectValue(data, keys);
    return value;
  }

  /**
   * Used to find key value based on the key sequence provided
   * @param data expects an object
   * @param keys i.e. user.gender.type.type
   */
  getObjectValue(data: any, keys: Queue<string>) {
    if ((!(data instanceof Object)) || (keys.length == 1))  {
      return data[keys.tail];
    }
    let value = null;
    Object.keys(data).forEach((key) => {
      if ((key == keys.front) && (data[key] instanceof Object)) {
        value = this.getObjectValue(data[key], keys);
      } else if(key == keys.tail){
        value = data[key];
      }
    });
    return value;

  }

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
export class MlkMoreActions {
  /**
   * Action Column name e.g. More Actions
   */
  name: string = "Actions";
  /**
   * Field name id from the server response e.g userId
   */
  idFieldName: string = "id";
  /**
   * Actions e.g. Edit, Delete
   */
  actions: Array<MlkMoreActionData>;

  constructor(actions: Array<MlkMoreActionData>, id?: string, name?: string) {
    this.actions = actions;
    this.name = name;
    this.idFieldName = id;
  }

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

  /**
   * Action row : the clicked row
   */
  actionRow?: any;
}