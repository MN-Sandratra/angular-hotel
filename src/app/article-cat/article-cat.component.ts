import { Component, OnInit } from '@angular/core';
import { faAdd, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ArticleCat } from '../models/article-cat';
import { Category } from '../models/category';
import { ArticleCatService } from '../services/article-cat.service';

@Component({
  selector: 'app-article-cat',
  templateUrl: './article-cat.component.html',
  styleUrls: ['./article-cat.component.scss']
})
export class ArticleCatComponent implements OnInit {
  FaModif = faPencil;
  FaAdd = faAdd;
  FaDel = faTrash;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement: DataTableDirective | undefined;
 

  currentArticleCategory = new ArticleCat();
  currentAction:String="Ajouter"

  constructor(private apiArticleCat:ArticleCatService) { }
  articlecategories:any[]= []
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
    this.getAllArticleCategories();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    },100);
    
  }
  getAllArticleCategories(){
    this.apiArticleCat.getAllArticleCategory().subscribe(
      data=>{
        this.articlecategories=data;
      },err=>{
        console.log(err);
      }
    )
  }
  getArticleCategoryById(id:number){
    this.apiArticleCat.getArticleCategoryById(id).subscribe(
      data=>{
        this.currentArticleCategory=data;
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

  ModifierArticleCategory(articleCategory: any){
    this.currentAction="Modifier"
    this.getArticleCategoryById(articleCategory.id);
  }
  ajouterArticleCategory(): void{
    this.currentAction="Ajouter"
    this.currentArticleCategory=new ArticleCat();
  }
  supprimerArticleCategory(articleCategory: any){
    this.getArticleCategoryById(articleCategory.id);
  }


  updateArticleCategory=():void=>{
    this.apiArticleCat.updateArticleCategory(this.currentArticleCategory).subscribe(
      data=>{
        this.getAllArticleCategories();
        this.rerender();
      },
      error=>{
        console.error(error);
      }
    )
  }

  addArticleCategory=():void=>{
    this.apiArticleCat.createArticleCategory(this.currentArticleCategory).subscribe(
      data=>{
        this.getAllArticleCategories();
        this.rerender();
      },err=>{
        console.log(err);
      }
    )
  }

  deleteArticleCategory(){
    this.apiArticleCat.deleteArticleCategory(this.currentArticleCategory.id).subscribe(
      data=>{
        this.getAllArticleCategories();
        this.rerender();
      },err=>{
        console.log(err);
      }
    )
  }
}
