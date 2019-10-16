import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Http module from angular
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IDVerificationComponent } from './id-verification/id-verification.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './_components/header/header.component';
import { ViewDetailsComponent } from './view-details/view-details.component';

@NgModule({
  declarations: [
    AppComponent,
    IDVerificationComponent,
    CreateAccountComponent,
    HeaderComponent,
    ViewDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //Import Http Client module
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
