/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { StewardClientComponent } from './steward-client.component';
import { MlkDatatableComponent } from './mlk-datatable/mlk-datatable.component';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StewardConfig } from './steward-client.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ExportAsModule } from 'ngx-export-as';
export class StewardClientModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: StewardClientModule,
            providers: [{ provide: StewardConfig, useValue: config }]
        };
    }
}
StewardClientModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    NgxDatatableModule,
                    CommonModule,
                    BsDatepickerModule.forRoot(),
                    HttpClientModule,
                    ExportAsModule
                ],
                declarations: [StewardClientComponent, MlkDatatableComponent],
                exports: [StewardClientComponent, MlkDatatableComponent],
                providers: [DatePipe]
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc3Rld2FyZC1jbGllbnQvIiwic291cmNlcyI6WyJsaWIvc3Rld2FyZC1jbGllbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxZQUFZLEVBQUUsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDM0QsT0FBTyxFQUFDLG1CQUFtQixFQUFFLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBZ0I3QyxNQUFNOzs7OztJQUNKLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBcUI7UUFDbEMsTUFBTSxDQUFDO1lBQ0wsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQyxDQUFDO1NBQ3hELENBQUM7SUFDSixDQUFDOzs7WUFwQkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxXQUFXO29CQUNYLG1CQUFtQjtvQkFDbkIsa0JBQWtCO29CQUNsQixZQUFZO29CQUNaLGtCQUFrQixDQUFDLE9BQU8sRUFBRTtvQkFDNUIsZ0JBQWdCO29CQUNoQixjQUFjO2lCQUNmO2dCQUNELFlBQVksRUFBRSxDQUFDLHNCQUFzQixFQUFFLHFCQUFxQixDQUFDO2dCQUM3RCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxxQkFBcUIsQ0FBQztnQkFDeEQsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO2FBQ3RCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7U3Rld2FyZENsaWVudENvbXBvbmVudH0gZnJvbSAnLi9zdGV3YXJkLWNsaWVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQge01sa0RhdGF0YWJsZUNvbXBvbmVudH0gZnJvbSAnLi9tbGstZGF0YXRhYmxlL21say1kYXRhdGFibGUuY29tcG9uZW50JztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGUsIERhdGVQaXBlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge05neERhdGF0YWJsZU1vZHVsZX0gZnJvbSAnQHN3aW1sYW5lL25neC1kYXRhdGFibGUnO1xyXG5pbXBvcnQge1JlYWN0aXZlRm9ybXNNb2R1bGUsIEZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQge1N0ZXdhcmRDb25maWd9IGZyb20gJy4vc3Rld2FyZC1jbGllbnQuc2VydmljZSc7XHJcbmltcG9ydCB7QnNEYXRlcGlja2VyTW9kdWxlfSBmcm9tICduZ3gtYm9vdHN0cmFwL2RhdGVwaWNrZXInO1xyXG5pbXBvcnQge0V4cG9ydEFzTW9kdWxlfSBmcm9tICduZ3gtZXhwb3J0LWFzJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgTmd4RGF0YXRhYmxlTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgQnNEYXRlcGlja2VyTW9kdWxlLmZvclJvb3QoKSxcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBFeHBvcnRBc01vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbU3Rld2FyZENsaWVudENvbXBvbmVudCwgTWxrRGF0YXRhYmxlQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbU3Rld2FyZENsaWVudENvbXBvbmVudCwgTWxrRGF0YXRhYmxlQ29tcG9uZW50XSxcclxuICBwcm92aWRlcnM6IFtEYXRlUGlwZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0ZXdhcmRDbGllbnRNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogU3Rld2FyZENvbmZpZykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmdNb2R1bGU6IFN0ZXdhcmRDbGllbnRNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW3twcm92aWRlOiBTdGV3YXJkQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnfV1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==