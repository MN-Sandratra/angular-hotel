import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ClientComponent } from './client/client.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {path:'client',component:ClientComponent},
  {path:'room',component:RoomComponent},
  {path:'category',component:CategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent=[ClientComponent,RoomComponent,CategoryComponent];
