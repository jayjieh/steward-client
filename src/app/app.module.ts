import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MlkDatatableComponent } from './mlk-datatable/mlk-datatable.component';
import {StewardClientModule } from 'steward-client';

@NgModule({
  declarations: [
    AppComponent,
    MlkDatatableComponent
  ],
  imports: [
    BrowserModule,
    StewardClientModule.forRoot(
      {base_url: "http://localhost:8762", access_token: "fab6b0ed-1a85-4e7f-9491-ccc40ba69fe7"}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
