import { Component, OnInit } from '@angular/core';
import { faAdd, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  FaModif = faPencil;
  FaAdd = faAdd;
  FaDel = faTrash;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement: DataTableDirective | undefined;
  currentOrder: any;
  currentAction: String="Ajouter"

  constructor(private apiOrder:OrderService) { }
  orders:any[]= []
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
      this.getAllOrders();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    },100);
    
  }
  getAllOrders(){
    this.apiOrder.getAllOrder().subscribe(
      data=>{
        this.orders=data;
      },err=>{
        console.log(err);
      }
    )
  }
  getOrderById(id:number){
    this.apiOrder.getOrderById(id).subscribe(
      data=>{
        this.currentOrder=data;
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

  ModifierOrder(order:any){
    this.currentAction="Modifier"
    this.getOrderById(order.id);
  }
  ajouterOrder(){
    this.currentAction="Ajouter"
    this.currentOrder=new Order ();
  }
  supprimerOrder(order:any){
    this.getOrderById(order.id);
  }


  updateOrder=():void=>{
    this.apiOrder.updateOrder(this.currentOrder).subscribe(
      data=>{
        this.getAllOrders();
        this.rerender();
      },
      error=>{
        console.error(error);
      }
    )
  }

  addOrder=():void=>{
    this.apiOrder.createOrder(this.currentOrder).subscribe(
      data=>{
        this.getAllOrders();
        this.rerender();
      },err=>{
        console.log(err);
      }
    )
  }

  deleteOrder(){
    this.apiOrder.deleteOrder(this.currentOrder.id).subscribe(
      data=>{
        this.getAllOrders();
        this.rerender();
      },err=>{
        console.log(err);
      }
    )
  }
}
