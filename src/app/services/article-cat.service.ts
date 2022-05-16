import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleCatService {

  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }
  getAllArticleCategory():Observable<any>{
    return this.http.get(this.baseUrl+"/api/articleCategory");
  }

  getArticleCategoryById(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/articleCategory/"+id);
  }

  createArticleCategory(articleCat:any):Observable<any>{
    return this.http.post(this.baseUrl+"/api/articleCategory/",articleCat);
  }

  updateArticleCategory(articleCat:any):Observable<any>{
    return this.http.put(this.baseUrl+"/api/articleCategory/"+articleCat.id,articleCat);
  }

  deleteArticleCategory(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/api/articleCategory/"+id);
  }
}
