import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import component footer, navbar, sidebar
import { ComponentsModule } from './components/components.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent],

  //ComponentsModule importer
  imports: [BrowserModule, AppRoutingModule, ComponentsModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
