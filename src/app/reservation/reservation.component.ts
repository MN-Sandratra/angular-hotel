import { Component, OnInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { faAdd, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { Client } from '../models/client';
import { Reservation } from '../models/reservation';
import { Room } from '../models/room';
import { ClientService } from '../services/client.service';
import { ReservationService } from '../services/reservation.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  FaModif=faPencil;
  FaAdd=faAdd;
  FaDel=faTrash;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement:DataTableDirective | undefined;

  constructor(private apiReservation:ReservationService,private toastr:ToastrService,private apiClient:ClientService,private apiRoom:RoomService) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  Reservations:Reservation[]=[];
  Room:Room[]=[];
  Clients:Client[]=[];
  currentReservation:Reservation=new Reservation();
  currentAction:String="Ajouter"
  @ViewChild("resForm") form:NgForm | undefined;

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
    this.initData();
    this.currentReservation.client=new Client();
    this.currentReservation.room=new Room();
  }
  ngAfterViewInit(): void {
    setTimeout(()=>this.dtTrigger.next(),500);
  }

  rerender(){
    this.dtElement?.dtInstance.then((dtInstance:DataTables.Api)=>{
      dtInstance.destroy();
      this.dtTrigger.next();
    })
  }
  initialistaion():void{
    this.currentReservation.client=new Client();
    this.currentReservation.room=new Room();
  }
  getAllReservation(): void{
    this.apiReservation.getAllReservation().subscribe(
      data=>{
        this.Reservations=data;
      },error=>{
        console.log("Impossible to get people");
      }
    )
  }
  getMyReservationById(id:number){
    this.apiReservation.getReservationById(id).subscribe(
      data=>{
        this.currentReservation=data;
        this.currentReservation.client=this.getClientById(this.currentReservation.client.id)[0];
        console.log(this.currentReservation);
      },err=>{
        console.error("Une erreur s'est produite");
      }
    )
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
  getClientById(id:any){
    let res=this.Clients.filter(x=>x.id==id);
    console.log(res);
    return res;
  }
  getRoom(){
    this.apiRoom.getAllRoom().subscribe(
      data=>{
        this.Room=data;
      },err=>{
        console.log(err);
      }
    )
  }
  getUsableClient=()=>{
    return Promise.resolve(this.getClient())
  }
  getUsableReservation=()=>{
    return Promise.resolve(this.getAllReservation())
  }

  initData=async()=>{
    try {
      await this.getUsableClient();
      await this.getUsableReservation();
      this.getRoom();
    } catch (error) {
      console.log(error);
    }
  }
  getClientName(client:Client){
    let data=this.Clients.filter(x=>x.id===client.id);
    return data[0].person.firstName +" "+data[0].person.lastName;
  }
   //bouton
   modifierReservation(res:any){
    this.currentAction="Modifier";
    this.currentReservation=res;
    this.currentReservation.client=this.getClientById(this.currentReservation.client.id)[0]
    this.currentReservation.dateDebut=(""+this.currentReservation.dateDebut).split('T')[0]
    this.currentReservation.dateReservation=(""+this.currentReservation.dateReservation).split('T')[0]
    this.currentReservation.dateFin=(""+this.currentReservation.dateFin).split('T')[0]
    //this.getMyReservationById(res.id);
  }
  ajoutReservation(){
    this.currentAction="Ajouter";
    this.form?.resetForm();
    this.currentReservation=new Reservation();
    this.initialistaion();
  }
  supprimerReservation(res:any){
    console.log(res);
    this.getMyReservationById(res.id);
  }

  //action with api
  updateReservation=():void=>{
    if(!this.validation() || this.form?.invalid || this.currentReservation.client.id<0 || this.currentReservation.room.id<0){
      this.toastr.error("Remplisser le champs correctement","Erreur")  
    }else{
    let reservationToUpdate={
      "id":this.currentReservation.id,
      "clientId": this.currentReservation.client.id,
      "roomId": this.currentReservation.room.id,
      "dateReservation":this.currentReservation.dateReservation,
      "dateDebut":this.currentReservation.dateDebut,
      "dateFin": this.currentReservation.dateFin,
      "nbrPerson": this.currentReservation.nbrPerson,
    }
    this.apiReservation.updateReservation(reservationToUpdate).subscribe(
      data=>{
        this.getAllReservation();
        this.toastr.success("Modification de la reservation reussit","Succes");
        this.rerender();
      },
      error=>{
        console.error(error);
      }
    )
  }
  }
  validation(){
    let res=true;
    if(this.currentReservation.dateDebut<this.currentReservation.dateReservation || this.currentReservation.dateDebut>this.currentReservation.dateFin)
      res=false;
    return res;
  }

  addReservation=()=>{
    let val=new Client();
    let rom=new Room()
    if(!this.validation() || this.form?.invalid || this.currentReservation.client== val|| this.currentReservation.room==rom){
      this.toastr.error("Remplisser le champs correctement","Erreur")  
    }else{
    let reservationToAdd={
    "clientId": this.currentReservation.client.id,
    "roomId": this.currentReservation.room.id,
    "dateReservation":this.currentReservation.dateReservation,
    "dateDebut":this.currentReservation.dateDebut,
    "dateFin": this.currentReservation.dateFin,
    "nbrPerson": this.currentReservation.nbrPerson,
  }
    this.apiReservation.createReservation(reservationToAdd).subscribe(
      data=>{
        this.getAllReservation();
        this.rerender();
        this.toastr.success(""+data,"Succes");
      },err=>{
        console.error(err);
      }
    )
  }
  }
  
  deleteReservation(){
    this.apiReservation.deleteReservation(this.currentReservation.id).subscribe(
      data=>{
        this.getAllReservation();
        this.rerender();
        this.toastr.info(""+data,"Sucess");
      },err=>{
        console.log(err);
      }
    )
  }

}
