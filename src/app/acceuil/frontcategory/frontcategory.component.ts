import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-frontcategory',
  templateUrl: './frontcategory.component.html',
  styleUrls: ['./frontcategory.component.scss']
})
export class FrontcategoryComponent implements OnInit {

  @Input() categorie:Category=new Category();
  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  categoryDetail(id:any){
    let path="/listRoom/"+id;
    this.route.navigate([`${path}`]);
  }
  createImgPath = (image:any) => { 
    return environment.baseUrl+"/"+image;
  }

}
