import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ClientComponent } from './client/client.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RoomComponent } from './room/room.component';
import { CompteComponent } from './compte/compte.component';
import { MouvementComponent } from './mouvement/mouvement.component';
import { JournalComponent } from './journal/journal.component';

const routes: Routes = [
  {path:'client',component:ClientComponent},
  {path:'room',component:RoomComponent},
  {path:'category',component:CategoryComponent},
  {path:'reservation',component:ReservationComponent},
  { path: 'compte', component: CompteComponent },
  { path: 'mouvement', component: MouvementComponent },
  { path: 'journal', component: JournalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const RoutingComponent=[ClientComponent,RoomComponent,CategoryComponent,ReservationComponent];
