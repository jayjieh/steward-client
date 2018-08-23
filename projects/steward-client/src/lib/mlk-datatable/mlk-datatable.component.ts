import { Component, OnInit, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Page } from '../entities/wrappers/page';
import { MlkDynamicControl, MlkInput, MlkTextarea, MlkSelect } from '../entities/wrappers/mlk-dynamic-control';
import { ResponseWrapper } from '../entities/wrappers/response-wrapper';
import { StewardClientService } from '../steward-client.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'stw-mlk-datatable',
  templateUrl: './mlk-datatable.component.html',
  styleUrls: ['./mlk-datatable.component.css']
})
export class MlkDatatableComponent implements OnInit {
  @Input() columns: Array<MlkDataTableColumn> = [];
  @Input() enableCheckbox: boolean = true;
  @Input() endpoint: string;
  @Input() moreActions: MlkMoreActions;
  @Output() onActionsEvent = new EventEmitter<MlkMoreActionData>()
  @Input() filterComponents: Array<MlkDynamicControl<any>> = [];
  page: Page<any> = new Page();
  selected = [];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  filter: Object = {};
  filterForm: FormGroup;
  private sterwardService: StewardClientService<ResponseWrapper<Page<any>>, any>;

  // constructor(private http: HttpClient, config: StewardConfig) {
  //   this.sterwardService = new CmStewardService(http, config);
  // }

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
    group['from'] = new FormControl('2018-01-01', Validators.maxLength(100));
    let toDate = new Date();
    toDate.setDate(toDate.getFullYear() + 1);
    group['to'] = new FormControl(this.getFormattedDate(toDate), Validators.maxLength(100));
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
    request.set("page", pageInfo.offset);
    request.set("size", pageInfo.limit);
    console.debug("Paging record using ", request);
    this.sterwardService.get(this.endpoint, request).subscribe(response => {
      if (response.code == 200) {
        this.page = response.data;
        console.debug("Current page: ", this.page);
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

  processFilter(form) {
    //@ts-ignore
    let f: Map<String, any> = new Map(Object.entries(this.filterForm.value));
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

}
/**
 * Used to define datatable columns with attributes (columnName, fieldName, width, sortable, canAutoResize,
 * draggable, resizable, isDateColumn)
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
}