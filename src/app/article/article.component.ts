import { Component, OnInit } from '@angular/core';
import { faAdd, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { data } from 'jquery';
import { Subject } from 'rxjs';
import { Article } from '../models/article';

import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  FaModif = faPencil;
  FaAdd = faAdd;
  FaDel = faTrash;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtElement: DataTableDirective | undefined;
  currentArticle =new Article();
  currentAction:String="Ajouter"

  constructor(private apiArticle:ArticleService) { }
  articles:any[]= []
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
    this.getAllArticles();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    },100);
    
  }
  getAllArticles(){
    this.apiArticle.getAllArticle().subscribe(
      data=>{
        this.articles=data;
        console.log(this.articles)
      },err=>{
        console.log(err);
      }
    )
  }
  getArticleById(id:number){
    this.apiArticle.getArticleById(id).subscribe(
      data=>{
        this.currentArticle=data;
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

  ModifierArticle(article:any){
    this.currentAction="Modifier"
    this.getArticleById(article.id);
  }
  ajouterArticle(){
    this.currentAction="Ajouter"
    this.currentArticle=new Article();
  }
  supprimerArticle(article:any){
    this.getArticleById(article.id);
  }


  updateArticle=():void=>{
    this.apiArticle.updateArticle(this.currentArticle).subscribe(
      data=>{
        this.getAllArticles();
        this.rerender();
      },
      error=>{
        console.error(error);
      }
    )
  }

  addArticle=():void=>{
    this.apiArticle.createArticle(this.currentArticle).subscribe(
      data=>{
        this.getAllArticles();
        this.rerender();
      },err=>{
        console.log(err);
      }
    )
  }

  deleteArticle(){
    this.apiArticle.deleteArticle(this.currentArticle.id).subscribe(
      data=>{
        this.getAllArticles();
        this.rerender();
      },err=>{
        console.log(err);
      }
    )
  }
}
