import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { data } from 'jquery';
import { faAdd, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit,OnDestroy {
  //font awesome
  FaModif=faPencil;
  FaAdd=faAdd;
  FaDel=faTrash;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement:DataTableDirective | undefined;
  response: any;

  constructor(private apiCateory:CategoryService,private toast:ToastrService) { }
  AllCategory:Category[]=[];
  currentCategory:Category=new Category();
  currentAction:String="Ajouter"
  @ViewChild("categoryForm") form:NgForm | undefined;

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
    this.getAllCategory();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  rechoose(){
    this.currentCategory.image="";
  }
  uploadFinished = (event:any) => { 
    this.response = event; 
    this.currentCategory.image=event.dbPath;
    console.log(event);
  }

  validation(){
    let res=true;
    if(this.currentCategory.designation.trim().length===0 ||
    this.currentCategory.designation.trim().length==0 || 
    this.currentCategory.image==""){
      res=false;
    }
    console.log(this.currentCategory);
    return res;
  }

  ngAfterViewInit(): void {
    this.getAllCategory();
    setTimeout(() => {
      this.dtTrigger.next();
    },500);
    
  }
  getAllCategory(){
    this.apiCateory.getAllCategory().subscribe(
      data=>{
        this.AllCategory=data;
      },err=>{
        console.log(err);
      }
    )
  }
  getCategoryById(id:number){
    this.apiCateory.getCategoryById(id).subscribe(
      data=>{
        this.currentCategory=data;
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

  ModifierCategory(category:Category){
    this.currentAction="Modifier"
    this.getCategoryById(category.id);
    this.form?.resetForm();
  }
  ajouterCategory(){
    this.currentAction="Ajouter"
    this.currentCategory=new Category();
    this.form?.resetForm();
  }
  supprimerCategory(category:Category){
    this.getCategoryById(category.id);
  }


  updateCategory=():void=>{
    if(this.validation()){
      this.apiCateory.updateCategory(this.currentCategory).subscribe(
        data=>{
          this.getAllCategory();
          this.rerender();
          this.toast.success("Modification de la categorie reussit","Felicitation")
        },
        error=>{
          console.error(error);
        }
      )
    }else{
      this.toast.error("Veuillez remplir tous les champs correctement","Attention")
    }
  }

  addCategory=():void=>{
    if(this.validation()){
    this.apiCateory.createCategory(this.currentCategory).subscribe(
      data=>{
        this.getAllCategory();
        this.rerender();
        this.toast.success("Ajout de la categorie avec succes","Felicitation")
      },err=>{
        console.log(err);
      }
    )
    }else{
      this.toast.error("Veuillez remplir tous les champs correctement","Attention")
    }
  }

  deleteCategory(){
    this.apiCateory.deleteCategory(this.currentCategory.id).subscribe(
      data=>{
        this.getAllCategory();
        this.rerender();
      },err=>{
        console.log(err);
      }
    )
  }

}
