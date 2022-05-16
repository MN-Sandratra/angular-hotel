import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faAdd, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Category } from '../models/category';
import { Room } from '../models/room';
import { CategoryService } from '../services/category.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  FaModif=faPencil;
  FaAdd=faAdd;
  FaDel=faTrash;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement:DataTableDirective | undefined;

  constructor(private apiRoom:RoomService,private apiCategory:CategoryService,private toast:ToastrService) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  Rooms:Room[]=[];
  Category:Category[]=[];
  response:any;
  currentRoom:Room=new Room();
  currentAction:String="Ajouter";
  @ViewChild("roomForm") form:NgForm | undefined;

  ngAfterViewInit(): void {
    this.getcategory();
    setTimeout(()=>this.dtTrigger.next(),500);
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
    this.currentRoom.category=new Category();
    this.getRooms();
    this.getcategory();
  }

  
  getcategory(){
    this.apiCategory.getAllCategory().subscribe(
      data=>{
        this.Category=data;
      },err=>{
        console.log("Impossible to get room");
      }
    )
  }
  getRooms(): void{
    this.apiRoom.getAllRoom().subscribe(
      data=>{
        this.Rooms=data;
      },error=>{
        console.log("Impossible to get room");
      }
    )
  }

  getRoomById(id:number){
    this.apiRoom.getRoomById(id).subscribe(
      data=>{
        console.log(data);
        this.currentRoom=data;
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

  modifierRoom(room:any){
    this.currentAction="Modifier";
    console.log(room.id);
    this.getRoomById(room.id);
    this.form?.resetForm();
  }
  ajoutRoom=():void=>{
    this.currentAction="Ajouter";
    this.currentRoom=new Room();
    this.currentRoom.category=new Category();
    this.form?.resetForm();
  }
  deleteRoom=(room:any):void=>{
    this.getRoomById(room.id);
  }
  rechoose(){
    this.currentRoom.image="";
  }
  uploadFinished = (event:any) => { 
    this.response = event; 
    this.currentRoom.image=event.dbPath;
    console.log(event);
  }
  validation(){
    let res=true;
    if(this.currentRoom.number==null ||
    this.currentRoom.type.trim().length==0 || 
    this.currentRoom.category.id==null || 
    this.currentRoom.image==""){
      res=false;
    }
    console.log(this.currentRoom);
    return res;
  }


  addRoom=()=>{
    if(this.validation()){
      let room={
        "number":this.currentRoom.number,
        "type":this.currentRoom.type,
        "categoryId":this.currentRoom.category.id,
        "image":this.currentRoom.image,
      };
      console.log(room);
      this.apiRoom.createRoom(room).subscribe(
        data=>{
          this.getRooms();
          this.rerender();
          this.toast.success("Ajout d'une nouvelle chambre","succes")
        },err=>{
          console.error(err);
        }
      ) 
    }else{
      this.toast.error("veuillez Remplir les champs correctement","Attention")
    }
  }
  updateRoom=():void=>{
    if(this.validation()){
    this.currentRoom.categoryId=this.currentRoom.category.id;
    console.log(this.currentRoom.id);
    this.apiRoom.updateRoom(this.currentRoom).subscribe(
      data=>{
        this.getRooms();
        this.rerender();
        this.toast.success("Modification de la chambre reussit","succes")
      },
      error=>{
        console.error(error);
      }
    )}else{
      this.toast.error("veuillez Remplir les champs correctement","Attention")
    }
  }

}
