import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//import component footer, navbar, sidebar
import { ComponentsModule } from './components/components.module';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';
import { ReservationComponent } from './reservation/reservation.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { SupplierComponent } from './supplier/supplier.component';
import { ArticleComponent } from './article/article.component';
import { ArticleCatComponent } from './article-cat/article-cat.component';
import { OrderComponent } from './order/order.component';
import { OrderLineComponent } from './order-line/order-line.component';
import { ReceptionComponent } from './reception/reception.component';
import { InputComponent } from './input/input.component';
import { OutputComponent } from './output/output.component'


@NgModule({
  declarations: [
    AppComponent,
    RoutingComponent,
    ReservationComponent,
    SupplierComponent,
    ArticleComponent,
    ArticleCatComponent,
    OrderComponent,
    OrderLineComponent,
    ReceptionComponent,
    InputComponent,
    OutputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DataTablesModule,
    ComponentsModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
