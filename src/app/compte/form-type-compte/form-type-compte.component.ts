import { Component, OnInit } from '@angular/core';
import { Typecompte } from 'src/app/models/typecompte';
import { Compte } from '../../models/compte';
import { TypeCompteApiService } from '../../services/type-compte-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-type-compte',
  templateUrl: './form-type-compte.component.html',
  styleUrls: ['./form-type-compte.component.scss'],
})
export class FormTypeCompteComponent implements OnInit {
  currentCompte = new Typecompte();
  constructor(
    private apiTypeCompte: TypeCompteApiService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {}

  saveTypeCompte() {
    if (this.currentCompte.nomTypeCompte.trim().length > 0)
      this.createTypeCompte();
    else this.toast.error('Veuillez remplir le champs correctement');
  }
  createTypeCompte() {
    this.apiTypeCompte.postTypeCompte(this.currentCompte).subscribe(
      (data) => {
        console.log('mety');
        //getalltypecompte
      },
      (err) => {
        console.log('erreur');
      }
    );
  }
}
