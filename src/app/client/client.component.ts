import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client';
import { Person } from '../models/person';
import { DataTableDirective } from 'angular-datatables';
import {ToastrService} from 'ngx-toastr';
import {faPencil,faAdd,faTrash} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit,OnDestroy {

  FaModif=faPencil;
  FaAdd=faAdd;
  FaDel=faTrash;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement:DataTableDirective | undefined;

  constructor(private apiClient:ClientService,private toastr:ToastrService) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  Clients:Client[]=[];
  currentClient:Client=new Client();
  currentAction:String="Ajouter"
  
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
    this.getClient();
    this.initialistaion();
  }
  ngAfterViewInit(): void {
    setTimeout(()=>this.dtTrigger.next(),100);
  }

  initialistaion():void{
    this.currentClient.person=new Person();
    // this.currentClient.person.id=0;
    // this.currentClient.person.firstName='';
    // this.currentClient.person.lastName='';
    // this.currentClient.person.cin='';
    // this.currentClient.person.phone='';
  }

  getClient(): void{
    this.apiClient.getAllClient().subscribe(
      data=>{
        this.Clients=data;
        //this.dtTrigger.next();
      },error=>{
        console.log("Impossible to get people");
      }
    )
  }

  getClientById(id:number){
    this.apiClient.getClientById(id).subscribe(
      data=>{
        this.currentClient=data;
      },err=>{
        console.error("Une erreur s'est produite");       
      }
    )
  }
  rerender(){
    this.dtElement?.dtInstance.then((dtInstance:DataTables.Api)=>{
      dtInstance.destroy();
      this.dtTrigger.next();
    })
  }

  //bouton
  modifierClient(client:any){
    this.currentAction="Modifier";
    this.getClientById(client.id);
  }
  ajoutClient(){
    this.currentAction="Ajouter";
    this.currentClient=new Client();
    this.initialistaion();
  }
  supprimerClient(client:any){
    this.getClientById(client.id);
  }

  //action with api
  updateClient=():void=>{
    this.apiClient.updateClient(this.currentClient).subscribe(
      data=>{
        this.getClient();
        this.toastr.success("Modification du client reussit","Succes");
        this.rerender();
      },
      error=>{
        console.error(error);
      }
    )
  }

  addClient=()=>{
    this.apiClient.createClient(this.currentClient).subscribe(
      data=>{
        this.getClient();
        this.rerender();
        this.toastr.success(""+data,"Succes");
      },err=>{
        console.error(err);
      }
    )
  }
  
  deleteClient(){
    this.apiClient.deleteClient(this.currentClient.id).subscribe(
      data=>{
        this.getClient();
        this.rerender();
        this.toastr.info(""+data,"Sucess");
      },err=>{
        console.log(err);
      }
    )
  }


}
