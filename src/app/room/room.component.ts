import { Component, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
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

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement:DataTableDirective | undefined;

  constructor(private apiRoom:RoomService,private apiCategory:CategoryService) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  Rooms:Room[]=[];
  Category:Category[]=[];
  currentRoom:Room=new Room();
  currentAction:String="Ajouter";

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dtTrigger.next();
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
    this.getRoomById(room.number);
  }
  ajoutRoom=():void=>{
    this.currentAction="Ajouter";
    this.currentRoom=new Room();
    this.currentRoom.category=new Category();
  }

  addRoom=()=>{
    let room={
      "number":this.currentRoom.number,
      "type":this.currentRoom.type,
      "categoryId":this.currentRoom.categoryId
    };
    this.apiRoom.createRoom(room).subscribe(
      data=>{
        this.getRooms();
        this.rerender();
      },err=>{
        console.error(err);
      }
    )
  }
  updateRoom=():void=>{
    this.currentRoom.categoryId=this.currentRoom.category.id;
    this.apiRoom.updateRoom(this.currentRoom).subscribe(
      data=>{
        this.getRooms();
        this.rerender();
      },
      error=>{
        console.error(error);
      }
    )
    console.log(this.currentRoom);
  }

}
