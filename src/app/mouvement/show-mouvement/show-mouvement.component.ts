import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { CompteApiService } from 'src/app/services/compte-api.service';
import { EcritureApiService } from 'src/app/services/ecriture-api.service';
import { MouvementApiService } from 'src/app/services/mouvement-api.service';

@Component({
  selector: 'app-show-mouvement',
  templateUrl: './show-mouvement.component.html',
  styleUrls: ['./show-mouvement.component.scss'],
})
export class ShowMouvementComponent implements OnInit {
  mouvementList$!: Observable<any[]>;
  mouvement_compteTypesList$!: Observable<any[]>;
  mouvement_ecritureTypesList$!: Observable<any[]>;
  mouvement_compteTypesList: any = [];
  mouvement_ecritureTypesList: any = [];

  mouvement_compteTypesMap: Map<number, string> = new Map();
  mouvement_ecritureTypesMap: Map<number, string> = new Map();
  constructor(
    private servicemouvement: MouvementApiService,
    private servicecompte: CompteApiService,
    private serviceecriture: EcritureApiService
  ) {}

  ngOnInit(): void {
    this.mouvementList$ = this.servicemouvement.getAllMouvement();
    this.mouvement_compteTypesList$ = this.servicecompte.getAllCompte();
    this.mouvement_ecritureTypesList$ = this.serviceecriture.getAllEcriture();
    this.refresh_mouvement_compte_TypesMap();
    this.refresh_mouvement_ecriture_TypesMap();
  }

  modalTitle: String = '';
  activateAddEditMouvementComponent: boolean = false;
  mouvement: any;

  modalAdd() {
    this.mouvement = {
      Id: 0,
      credit: null,
      debit: null,
      compteId: null,
      ecritureId: null,
    };

    this.modalTitle = 'Ajouter Mouvement';
    this.activateAddEditMouvementComponent = true;
  }

  modalEdit(item: any) {
    this.mouvement = item;
    this.modalTitle = 'Modifier Mouvement';
    this.activateAddEditMouvementComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete mouvement ${item.id}`)) {
      this.servicemouvement.deleteMouvement(item.id).subscribe((res) => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }

        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = 'block';
        }
        setTimeout(function () {
          if (showDeleteSuccess) {
            showDeleteSuccess.style.display = 'none';
          }
        }, 4000);
        this.mouvementList$ = this.servicemouvement.getAllMouvement();
      });
    }
  }

  modalClose() {
    this.activateAddEditMouvementComponent = false;
    this.mouvementList$ = this.servicemouvement.getAllMouvement();
  }

  refresh_mouvement_compte_TypesMap() {
    this.servicecompte.getAllCompte().subscribe((data) => {
      this.mouvement_compteTypesList = data;

      for (let i = 0; i < data.length; i++) {
        this.mouvement_compteTypesMap.set(
          this.mouvement_compteTypesList[i].Id,
          this.mouvement_compteTypesList[i].intituleCompte
        );
      }
    });
  }

  refresh_mouvement_ecriture_TypesMap() {
    this.serviceecriture.getAllEcriture().subscribe((data) => {
      this.mouvement_ecritureTypesList = data;

      for (let i = 0; i < data.length; i++) {
        this.mouvement_ecritureTypesMap.set(
          this.mouvement_ecritureTypesList[i].Id,
          this.mouvement_ecritureTypesList[i].libelleEcriture
        );
      }
    });
  }
}
