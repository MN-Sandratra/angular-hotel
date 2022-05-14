import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import component footer, navbar, sidebar
import { ComponentsModule } from './components/components.module';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JournalComponent } from './journal/journal.component';
import { CompteComponent } from './compte/compte.component';
import { FormCompteComponent } from './compte/form-compte/form-compte.component';
import { MouvementComponent } from './mouvement/mouvement.component';
import { ClasseCompteApiService } from './services/classe-compte-api.service';
import { CompteApiService } from './services/compte-api.service';
import { EcritureApiService } from './services/ecriture-api.service';
import { MouvementApiService } from './services/mouvement-api.service';
import { TypeCompteApiService } from './services/type-compte-api.service';
import { FormTypeCompteComponent } from './compte/form-type-compte/form-type-compte.component';

@NgModule({
  declarations: [
    AppComponent,
    JournalComponent,
    CompteComponent,
    MouvementComponent,
    FormCompteComponent,
    RoutingComponent,
    FormTypeCompteComponent,
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
    HttpClientModule,
  ],
  providers: [
    ClasseCompteApiService,
    CompteApiService,
    EcritureApiService,
    MouvementApiService,
    TypeCompteApiService,
  ],
  //Component
  bootstrap: [AppComponent],
})
export class AppModule {}
