import { Component, OnInit } from '@angular/core';
import { faAdd, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Reception } from '../reception';
import { ReceptionService } from '../services/reception.service';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {

  FaModif = faPencil;
  FaAdd = faAdd;
  FaDel = faTrash;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement: DataTableDirective | undefined;
  currentReception: any;
  currentAction:String="Ajouter"

  constructor(private apiReception:ReceptionService) { }
 receptions:any[]= []
  ngOnInit(): void {
    this.dtOptions = {
      language: {
        processing: "Traitement en cours...",
        search: "Rechercher&nbsp;:",
        lengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
        info: "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
        infoEmpty: "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
        infoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        infoPostFix: "",
        loadingRecords: "Chargement en cours...",
        zeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
        emptyTable: "Aucune donnée disponible dans le tableau",
        paginate: {
          first: "Premier",
          previous: "Pr&eacute;c&eacute;dent",
          next: "Suivant",
          last: "Dernier"
        },
        aria: {
          sortAscending: ": activer pour trier la colonne par ordre croissant",
          sortDescending: ": activer pour trier la colonne par ordre décroissant"
        }
      },
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.getAllReceptions();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    },100);
    
  }
  getAllReceptions(){
    this.apiReception.getAllReception().subscribe(
      data=>{
        this.receptions=data;
      },err=>{
        console.log(err);
      }
    )
  }
  getReceptionById(id:number){
    this.apiReception.getReceptionById(id).subscribe(
      data=>{
        this.currentReception=data;
      },err=>{
        console.log(err);
      }
    )
  }
  //rendering datatable
  rerender(){
    this.dtElement?.dtInstance.then((dtInstance:DataTables.Api)=>{
      dtInstance.destroy();
      this.dtTrigger.next();
    })
  }

  ModifierReception(reception:any){
    this.currentAction="Modifier"
    this.getReceptionById(reception.id);
  }
  ajouterReception(){
    this.currentAction="Ajouter"
    this.currentReception=new Reception();
  }
  supprimerReception(reception:any ){
    this.getReceptionById(reception.id);
  }


  updateReception=():void=>{
    this.apiReception.updateReception(this.currentReception).subscribe(
      data=>{
        this.getAllReceptions();
        this.rerender();
      },
      error=>{
        console.error(error);
      }
    )
  }

  addReception=():void=>{
    this.apiReception.createReception(this.currentReception).subscribe(
      data=>{
        this.getAllReceptions();
        this.rerender();
      },err=>{
        console.log(err);
      }
    )
  }

  deleteReception(){
    this.apiReception.deleteReception(this.currentReception.id).subscribe(
      data=>{
        this.getAllReceptions();
        this.rerender();
      },err=>{
        console.log(err);
      }
    )
  }
}
