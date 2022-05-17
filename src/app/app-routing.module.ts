import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ListroomsComponent } from './acceuil/listrooms/listrooms.component';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { ClientComponent } from './client/client.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RoomComponent } from './room/room.component';
import { CompteComponent } from './compte/compte.component';
import { MouvementComponent } from './mouvement/mouvement.component';
import { JournalComponent } from './journal/journal.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'client', component: ClientComponent },
      { path: 'room', component: RoomComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'reservation', component: ReservationComponent },
      { path: 'compte', component: CompteComponent },
      { path: 'mouvement', component: MouvementComponent },
      { path: 'journal', component: JournalComponent },
    ]
  },
  { path: '', component: AcceuilComponent },
  { path: 'listRoom/:id', component: ListroomsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const RoutingComponent = [ClientComponent, RoomComponent, CategoryComponent, ReservationComponent];
