import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import component footer, navbar, sidebar
import { ComponentsModule } from './components/components.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Component
import { JournalComponent } from './journal/journal.component';
import { CompteComponent } from './compte/compte.component';
import { MouvementComponent } from './mouvement/mouvement.component';

//Service
import { ClasseCompteApiService } from './services/classe-compte-api.service';
import { CompteApiService } from './services/compte-api.service';
import { EcritureApiService } from './services/ecriture-api.service';
import { MouvementApiService } from './services/mouvement-api.service';
import { TypeCompteApiService } from './services/type-compte-api.service';
import { FormCompteComponent } from './compte/form-compte/form-compte.component';

@NgModule({
  declarations: [
    AppComponent,
    JournalComponent,
    CompteComponent,
    MouvementComponent,
    FormCompteComponent,
  ],

  //ComponentsModule importer
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgbModule,
  ],
  providers: [
    ClasseCompteApiService,
    CompteApiService,
    EcritureApiService,
    MouvementApiService,
    TypeCompteApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
