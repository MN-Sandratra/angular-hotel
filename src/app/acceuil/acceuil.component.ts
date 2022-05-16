import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {

  categories:Category[]=[];
  Apropos={
    libelle:"A propos",
    designation:"Un hotel luxueux dans la nature",
    desci:"MadaHotel l’un des secrets les mieux gardés de Madagascar, un paradis sans artifices, où luxe naturel et charme exotique se conjuguent pour le plus grand plaisir des sens.Situé au bord du magnifique lagon, MadaHotel propose neuf bungalows spacieux de grand confort et un restaurant d’un charme fou. Un site d’une beauté à couper le souffle.Une découverte exceptionnelle qui marquera votre séjour à Madagascar !",
    img1:"../../../assets/img/about/about_1.png",
    img2:"../../../assets/img/about/about_2.png"
  };

  Restaurant={
    libelle:"Restaurant",
    designation:"De la nourriture bio et delicieuse",
    desci:"Nous vous proposons un diverse et large choix de nouriture de qualite ,delicieuse pour tous les gouts",
    img1:"../../../assets/img/about/1.png",
    img2:"../../../assets/img/about/2.png"
  };
  constructor(private categoryApi:CategoryService) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory(){
    this.categoryApi.getAllCategory().subscribe(
      (data)=>{
        this.categories=data;
      },err=>{
        console.log(err);
      }
    )
  }

}
