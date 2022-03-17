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
  constructor(
    private serviceCompte: CompteApiService,
    private serviceClassCompte: ClasseCompteApiService,
    private serviceTypeCompte: TypeCompteApiService
  ) {}

  ngOnInit(): void {
    this.allCompte = this.serviceCompte.getAllCompte();
    this.allClasseCompte = this.serviceClassCompte.getAllClasseCompte();
    this.allTypeCompte = this.serviceTypeCompte.getAllTypeCompte();
  }
}
