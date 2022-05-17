import { Component, OnInit } from '@angular/core';
import { faAdd, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { OrderLine } from '../models/order-line';
import { OrderLineService } from '../services/order-line.service';

@Component({
  selector: 'app-order-line',
  templateUrl: './order-line.component.html',
  styleUrls: ['./order-line.component.scss']
})
export class OrderLineComponent implements OnInit {

  FaModif = faPencil;
  FaAdd = faAdd;
  FaDel = faTrash;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement: DataTableDirective | undefined;
  currentOrderLine: any;
  currentAction:String="Ajouter"

  constructor(private apiOrderLine:OrderLineService) { }
  orderLines:any[]= []
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
    this.getAllOrderLines();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    },100);
    
  }
  getAllOrderLines(){
    this.apiOrderLine.getAllOrderLine().subscribe(
      data=>{
        this.orderLines=data;
      },err=>{
        console.log(err);
      }
    )
  }
  getOrderLineById(id:number){
    this.apiOrderLine.getOrderLineById(id).subscribe(
      data=>{
        this.currentOrderLine=data;
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

  ModifierOrderLine(orderLine:any){
    this.currentAction="Modifier"
    this.getOrderLineById(orderLine.id);
  }
  ajouterOrderLine(){
    this.currentAction="Ajouter"
    this.currentOrderLine=new OrderLine();
  }
  supprimerOrderLine(orderLine:any){
    this.getOrderLineById(orderLine.id);
  }


  updateOrderLine=():void=>{
    this.apiOrderLine.updateOrderLine(this.currentOrderLine).subscribe(
      data=>{
        this.getAllOrderLines();
        this.rerender();
      },
      error=>{
        console.error(error);
      }
    )
  }

  addOrderLine=():void=>{
    this.apiOrderLine.createOrderLine(this.currentOrderLine).subscribe(
      data=>{
        this.getAllOrderLines();
        this.rerender();
      },err=>{
        console.log(err);
      }
    )
  }

  deleteOrderLine(){
    this.apiOrderLine.deleteOrderLine(this.currentOrderLine.id).subscribe(
      data=>{
        this.getAllOrderLines();
        this.rerender();
      },err=>{
        console.log(err);
      }
    )
  }
}
