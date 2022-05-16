import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ClientComponent } from './client/client.component';
import { RoomComponent } from './room/room.component';
import { SupplierComponent } from './supplier/supplier.component';
import {ArticleComponent} from './article/article.component';
import { ArticleCatComponent } from './article-cat/article-cat.component';
import { OrderComponent } from './order/order.component';
import { OrderLineComponent } from './order-line/order-line.component';
import { InputComponent } from './input/input.component';
import { OutputComponent } from './output/output.component';
import { ReceptionComponent } from './reception/reception.component';

const routes: Routes = [
  {path:'client',component:ClientComponent},
  {path:'room',component:RoomComponent},
  {path:'category',component:CategoryComponent},
  {path: 'supplier', component:SupplierComponent},
  {path: 'articleCat', component:ArticleCatComponent},
  {path: 'order' , component:OrderComponent},
  {path: 'orderLine' , component:OrderLineComponent},
  {path: 'input', component:InputComponent},
  {path: 'output', component:OutputComponent},
  {path: 'reception', component:ReceptionComponent},
  {path: 'article' , component:ArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent=[ClientComponent,RoomComponent,CategoryComponent];
