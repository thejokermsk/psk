import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { OwlModule } from 'ngx-owl-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CallbackDialogComponent } from './dialog/callback-dialog/callback-dialog.component';
import { AdditionalPageComponent } from './pages/additional-page/additional-page.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CallbackDialogComponent,
    AdditionalPageComponent,
    MainLayoutComponent,
    IndexPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    OwlModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
