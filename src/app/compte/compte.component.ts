import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

//Service
import { CompteApiService } from '../services/compte-api.service';
import { ClasseCompteApiService } from '../services/classe-compte-api.service';
import { TypeCompteApiService } from '../services/type-compte-api.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss'],
})
export class CompteComponent implements OnInit {
  allCompte!: Observable<any[]>;
  allClasseCompte!: Observable<any[]>;
  allTypeCompte!: Observable<any[]>;

  modalTitle!: string;
  constructor(
    private serviceCompte: CompteApiService,
    private serviceClassCompte: ClasseCompteApiService,
    private serviceTypeCompte: TypeCompteApiService
  ) {
    this.modalTitle = 'Ajouter Compte';
  }

  ngOnInit(): void {
    this.allCompte = this.serviceCompte.getAllCompte();
    this.allClasseCompte = this.serviceClassCompte.getAllClasseCompte();
    //this.allTypeCompte = this.serviceTypeCompte.getAllTypeCompte();
    this.getAllTypeCompte();
  }

  getAllTypeCompte() {
    this.allTypeCompte = this.serviceTypeCompte.getAllTypeCompte();
  }
}
