import { NgModule } from '@angular/core';
import { StewardClientComponent } from './steward-client.component';
import { MlkDatatableComponent } from './mlk-datatable/mlk-datatable.component';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StewardConfig } from './steward-client.service';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    CommonModule,
    HttpClientModule
  ],
  declarations: [StewardClientComponent, MlkDatatableComponent],
  exports: [StewardClientComponent, MlkDatatableComponent]
})
export class StewardClientModule {
  static forRoot(config: StewardConfig) {
    return {
      ngModule: StewardClientModule,
      providers: [ {provide: StewardConfig, useValue: config} ]
    }
  }
 }
