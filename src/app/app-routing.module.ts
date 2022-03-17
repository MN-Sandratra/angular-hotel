import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompteComponent } from './compte/compte.component';
import { MouvementComponent } from './mouvement/mouvement.component';
import { JournalComponent } from './journal/journal.component';

const routes: Routes = [
  { path: 'compte', component: CompteComponent },
  { path: 'mouvement', component: MouvementComponent },
  { path: 'journal', component: JournalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
