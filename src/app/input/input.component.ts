import { Component, Input, OnInit } from '@angular/core';
import { faAdd, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { InputService } from '../services/input.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  FaModif = faPencil;
  FaAdd = faAdd;
  FaDel = faTrash;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement: DataTableDirective | undefined;
  currentInput: any;
  currentAction:String="Ajouter"

  constructor(private apiInput:InputService) { }
  inputs:any[]= []
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
    this.getAllInputs();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    },100);
    
  }
  getAllInputs(){
    this.apiInput.getAllInput().subscribe(
      data=>{
        this.inputs=data;
      },err=>{
        console.log(err);
      }
    )
  }
  getInputById(id:number){
    this.apiInput.getInputById(id).subscribe(
      data=>{
        this.currentInput=data;
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

  ModifierInput(input:any){
    this.currentAction="Modifier"
    this.getInputById(input.id);
  }
  ajouterInput(){
    this.currentAction="Ajouter"
    this.currentInput=new Input();
  }
  supprimerInput(input:any){
    this.getInputById(input.id);
  }


  updateInput=():void=>{
    this.apiInput.updateInput(this.currentInput).subscribe(
      data=>{
        this.getAllInputs();
        this.rerender();
      },
      error=>{
        console.error(error);
      }
    )
  }

  addInput=():void=>{
    this.apiInput.createInput(this.currentInput).subscribe(
      data=>{
        this.getAllInputs();
        this.rerender();
      },err=>{
        console.log(err);
      }
    )
  }

  deleteInput(){
    this.apiInput.deleteInput(this.currentInput.id).subscribe(
      data=>{
        this.getAllInputs();
        this.rerender();
      },err=>{
        console.log(err);
      }
    )
  }
}
