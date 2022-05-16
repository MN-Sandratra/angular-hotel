import { Component, OnInit, Output } from '@angular/core';
import { faAdd, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { OutputService } from '../services/output.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {

  FaModif = faPencil;
  FaAdd = faAdd;
  FaDel = faTrash;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement: DataTableDirective | undefined;
  currentOutput: any;
  currentAction:String="Ajouter"

  constructor(private apiOutput:OutputService) { }
  outputs:any[]= []
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
    this.getAllOutputs();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    },100);
    
  }
  getAllOutputs(){
    this.apiOutput.getAllOutput().subscribe(
      data=>{
        this.outputs=data;
      },err=>{
        console.log(err);
      }
    )
  }
  getOutputById(id:number){
    this.apiOutput.getOutputById(id).subscribe(
      data=>{
        this.currentOutput=data;
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

  ModifierOutput(output:any){
    this.currentAction="Modifier"
    this.getOutputById(output.id);
  }
  ajouterOutput(){
    this.currentAction="Ajouter"
    this.currentOutput=new Output();
  }
  supprimerOutput(output:any){
    this.getOutputById(output.id);
  }


  updateOutput=():void=>{
    this.apiOutput.updateOutput(this.currentOutput).subscribe(
      data=>{
        this.getAllOutputs();
        this.rerender();
      },
      error=>{
        console.error(error);
      }
    )
  }

  addOutput=():void=>{
    this.apiOutput.createOutput(this.currentOutput).subscribe(
      data=>{
        this.getAllOutputs();
        this.rerender();
      },err=>{
        console.log(err);
      }
    )
  }

  deleteOutput(){
    this.apiOutput.deleteOutput(this.currentOutput.id).subscribe(
      data=>{
        this.getAllOutputs();
        this.rerender();
      },err=>{
        console.log(err);
      }
    )
  }

}
