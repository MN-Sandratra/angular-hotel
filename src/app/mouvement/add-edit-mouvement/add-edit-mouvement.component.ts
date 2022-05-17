import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { CompteApiService } from 'src/app/services/compte-api.service';
import { EcritureApiService } from 'src/app/services/ecriture-api.service';
import { MouvementApiService } from 'src/app/services/mouvement-api.service';

@Component({
  selector: 'app-add-edit-mouvement',
  templateUrl: './add-edit-mouvement.component.html',
  styleUrls: ['./add-edit-mouvement.component.scss'],
})
export class AddEditMouvementComponent implements OnInit {
  mouvementList$!: Observable<any[]>;
  mouvement_compteTypesList$!: Observable<any[]>;
  mouvement_ecritureTypesList$!: Observable<any[]>;
  constructor(
    private servicemouvement: MouvementApiService,
    private servicecompte: CompteApiService,
    private serviceecriture: EcritureApiService
  ) {}

  @Input() mouvement: any;
  Id: number = 0;
  credit!: number;
  debit!: number;
  compteId!: number;
  ecritureId!: number;
  ngOnInit(): void {
    this.Id = this.mouvement.Id;
    this.credit = this.mouvement.credit;
    this.debit = this.mouvement.debit;
    this.compteId = this.mouvement.compteId;
    this.ecritureId = this.mouvement.ecritureId;

    this.mouvementList$ = this.servicemouvement.getAllMouvement();
    this.mouvement_compteTypesList$ = this.servicecompte.getAllCompte();
    this.mouvement_ecritureTypesList$ = this.serviceecriture.getAllEcriture();
  }

  addMouvement() {
    var mouvement = {
      debit: this.debit,
      credit: this.credit,
      compteId: this.compteId,
      ecritureId: this.ecritureId,
    };
    this.servicemouvement.postMouvement(mouvement).subscribe((res) => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if (showAddSuccess) {
        showAddSuccess.style.display = 'block';
      }

      setTimeout(function () {
        if (showAddSuccess) {
          showAddSuccess.style.display = 'none';
        }
      }, 4000);
    });
  }

  updateMouvement() {
    var mouvement = {
      debit: this.debit,
      credit: this.credit,
      compteId: this.compteId,
      ecritureId: this.ecritureId,
    };

    var idd: number = this.Id;
    // alert(inspection.status);
    this.servicemouvement.putMouvement(idd, mouvement).subscribe((ress) => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');

      if (closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if (showUpdateSuccess) {
        showUpdateSuccess.style.display = 'block';
      }

      setTimeout(function () {
        if (showUpdateSuccess) {
          showUpdateSuccess.style.display = 'none';
        }
      }, 4000);
    });
  }
}
