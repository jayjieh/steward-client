# Steward Client
1. add the following package to your package.json
    "queue-typescript": "^1.0.1",

2. replace the file path  in your package.json with the new path
e.g "steward-client": "./steward-service/steward-client-0.0.5.tgz",

3. execute npm install

4. In your code:
	a) html:

		<stw-mlk-datatable
		  [endpoint]="'/supplier-service/suppliers'"
		  [columns]="columns"
		  (onActionsEvent)="onActionsEvent($event)"
		  [moreActions]="moreActions"
		  [enableSummary]="enableSummary"
		  [summaryPosition]="summaryPosition"
		  [summaryHeight]="'auto'"
		  [enableCheckbox]=false
		  [enableFilterHeader]=true
		  [enableDefaultTableHeader]=true
		  [filterComponents]="filterControls"
		  [tableRowHeight] = 50;
  		  [tableFooterHeight] = 50;
  		  [tableHeaderHeight] = 50;
  		  [verticalScrollActive] = false;
  		  [horizontalScrollActive] = false;
		  >
		</stw-mlk-datatable>

		where:
			/** summary row **/
			[enableSummary]="enableSummary" /** true or false **/
		  	[summaryPosition]="summaryPosition" /** top or bottom **/
		  	[summaryHeight]="'auto'" /** auto or a number **/

			/** table header **/
			[enableFilterHeader]=true /** true or false -- show the filter header**/
		  	[enableDefaultTableHeader]=true /** true or false -- show the default filter fields**/

	b) ts

		columns: Array<MlkDataTableColumn> = [
		    {columnName: 'SERIAL NO', fieldName: 'deviceId'},
		    {columnName: 'TAXPAYER NAME', fieldName:'businessName'},
		    {columnName: 'REG. DATE', isDateColumn: true, fieldName: 'taxpayerId.createdAt'}
			{columnName: 'Tax Amo', isCurrencyColumn: true, currencyText: 'KES', fieldName: 'taxpayerId.createdAt'}
		  ];

		filterControls: Array<MlkDynamicControl<any>>;
  		moreActions: MlkMoreActions;

		constructor(private client: StewardClientService<any, any>,  private routes: Router) 
		{
			const deviceId: MlkInput = new MlkInput();
    			deviceId.type = 'number';

			this.filterControls = [
				new MlkDynamicControl<MlkInput>('Device ID', 'deviceId', deviceId),
			];

			this.moreActions = new MlkMoreActions([
					{actionName: 'View'}
				], 'id', 'More Actions');
  		}

		onActionsEvent(event: MlkMoreActionData) {
    			if(event.actionName === 'View') {
         			this.routes.navigate(['/pages/reports/suppliers', event.id]);
      			}

		}












