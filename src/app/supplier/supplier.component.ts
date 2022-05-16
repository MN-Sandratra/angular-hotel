import { Component, OnInit } from '@angular/core';
import { faAdd, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SupplierService } from '../services/supplier.service';
import { Supplier } from '../models/supplier';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  Suppliers:Supplier[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement:DataTableDirective | undefined;
  FaModif=faPencil;
  FaAdd=faAdd;
  FaDel=faTrash;
  
  currentSupplier: Supplier= new Supplier ;
  constructor(private apiSupplier:SupplierService) { }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  currentAction:String="Ajouter";

  ngAfterViewInit(): void {
    setTimeout(()=>this.dtTrigger.next(),100);
  }

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        processing:     "Traitement en cours...",
        search:         "Rechercher&nbsp;:",
        lengthMenu:    "Afficher _MENU_ &eacute;l&eacute;ments",
        info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
        infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
        infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        infoPostFix:    "",
        loadingRecords: "Chargement en cours...",
        zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
        emptyTable:     "Aucune donnée disponible dans le tableau",
        paginate: {
            first:      "Premier",
            previous:   "Pr&eacute;c&eacute;dent",
            next:       "Suivant",
            last:       "Dernier"
        },
        aria: {
            sortAscending:  ": activer pour trier la colonne par ordre croissant",
            sortDescending: ": activer pour trier la colonne par ordre décroissant"
        }
    },
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.getAllSupplier();

  }
  getAllSupplier(){
    this.apiSupplier.getAllSupplier().subscribe(
      data=>{
        this.Suppliers=data;
        console.log(this.Suppliers);
      },
      err=>{
        console.log(err);
      }
    )
  }
  getSupplierById(id:number){
    this.apiSupplier.getSupplierById(id).subscribe(
      data=>{
        this.currentSupplier=data;
      },
      err=>{
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

  ModifierSupplier(supplier:any){
    this.currentAction="Modifier"
    this.getSupplierById(supplier.id);
  }
  ajouterSupplier(){
    this.currentAction="Ajouter"
    this.currentSupplier=new Supplier();
  }
  supprimerSupplier(supplier:any ){
    this.getSupplierById(supplier.id);
  }


  updateSupplier=():void=>{
    this.apiSupplier.updateSupplier(this.currentSupplier).subscribe(
      data=>{
        this.getAllSupplier();
        this.rerender();
      },
      err=>{
        console.error(err);
      }
    )
  }

  addSupplier=():void=>{
    this.apiSupplier.createSupplier(this.currentSupplier).subscribe(
      data=>{
        this.getAllSupplier();
        this.rerender();
      },err=>{
        console.log(err);
      }
    )
  }

  deleteSupplier(){
    this.apiSupplier.deleteSupplier(this.currentSupplier.id).subscribe(
      data=>{
        this.getAllSupplier();
        this.rerender();
      },err=>{
        console.log(err);
      }
    )
  }
}
