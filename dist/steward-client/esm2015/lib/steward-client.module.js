/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { StewardClientComponent } from './steward-client.component';
import { MlkDatatableComponent } from './mlk-datatable/mlk-datatable.component';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StewardConfig } from './steward-client.service';
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
                    HttpClientModule
                ],
                declarations: [StewardClientComponent, MlkDatatableComponent],
                exports: [StewardClientComponent, MlkDatatableComponent]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rld2FyZC1jbGllbnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vc3Rld2FyZC1jbGllbnQvIiwic291cmNlcyI6WyJsaWIvc3Rld2FyZC1jbGllbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBYXpELE1BQU07Ozs7O0lBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFxQjtRQUNsQyxNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFNBQVMsRUFBRSxDQUFFLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDLENBQUU7U0FDMUQsQ0FBQTtLQUNGOzs7WUFqQkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxXQUFXO29CQUNYLG1CQUFtQjtvQkFDbkIsa0JBQWtCO29CQUNsQixZQUFZO29CQUNaLGdCQUFnQjtpQkFDakI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsc0JBQXNCLEVBQUUscUJBQXFCLENBQUM7Z0JBQzdELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixFQUFFLHFCQUFxQixDQUFDO2FBQ3pEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0ZXdhcmRDbGllbnRDb21wb25lbnQgfSBmcm9tICcuL3N0ZXdhcmQtY2xpZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNbGtEYXRhdGFibGVDb21wb25lbnQgfSBmcm9tICcuL21say1kYXRhdGFibGUvbWxrLWRhdGF0YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neERhdGF0YWJsZU1vZHVsZSB9IGZyb20gJ0Bzd2ltbGFuZS9uZ3gtZGF0YXRhYmxlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUsIEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFN0ZXdhcmRDb25maWcgfSBmcm9tICcuL3N0ZXdhcmQtY2xpZW50LnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBOZ3hEYXRhdGFibGVNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbU3Rld2FyZENsaWVudENvbXBvbmVudCwgTWxrRGF0YXRhYmxlQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1N0ZXdhcmRDbGllbnRDb21wb25lbnQsIE1sa0RhdGF0YWJsZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgU3Rld2FyZENsaWVudE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogU3Rld2FyZENvbmZpZykge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU3Rld2FyZENsaWVudE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogWyB7cHJvdmlkZTogU3Rld2FyZENvbmZpZywgdXNlVmFsdWU6IGNvbmZpZ30gXVxuICAgIH1cbiAgfVxuIH1cbiJdfQ==