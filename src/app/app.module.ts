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
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { HeaderComponent } from './acceuil/header/header.component';
import { AdminComponent } from './admin/admin.component';
import { DescriptionComponent } from './acceuil/description/description.component';
import { FootersComponent } from './acceuil/footers/footers.component';
import { FrontcategoryComponent } from './acceuil/frontcategory/frontcategory.component';
import { RoomsComponent } from './acceuil/rooms/rooms.component';
import { ListroomsComponent } from './acceuil/listrooms/listrooms.component';
import { NavigationComponent } from './acceuil/navigation/navigation.component';
import { UploadComponent } from './upload/upload.component';
import { DragDropDirective } from './drag-drop.directive';
import { ShowpicComponent } from './showpic/showpic.component';
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
import { ShowMouvementComponent } from './mouvement/show-mouvement/show-mouvement.component';
import { AddEditMouvementComponent } from './mouvement/add-edit-mouvement/add-edit-mouvement.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponent,
    AcceuilComponent,
    HeaderComponent,
    AdminComponent,
    DescriptionComponent,
    FootersComponent,
    FrontcategoryComponent,
    RoomsComponent,
    ListroomsComponent,
    NavigationComponent,
    UploadComponent,
    DragDropDirective,
    ShowpicComponent,
    JournalComponent,
    CompteComponent,
    MouvementComponent,
    FormCompteComponent,
    RoutingComponent,
    FormTypeCompteComponent,
    ShowMouvementComponent,
    AddEditMouvementComponent,
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
