import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StewardClientModule, StewardClientService } from 'steward-client';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StewardClientModule.forRoot(
      {base_url: "http://192.168.1.84:8763/miliki-oauth-service", access_token: "07c9dcd2-7eac-44c1-b126-22d14f80938c"}
    )
  ],
  providers: [StewardClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
