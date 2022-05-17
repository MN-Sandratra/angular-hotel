import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }
  getAllArticle():Observable<any>{
    return this.http.get(this.baseUrl+"/api/article");
  }

  getArticleById(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/article/"+id);
  }

  createArticle(article:any):Observable<any>{
    return this.http.post(this.baseUrl+"/api/article/",article);
  }

  updateArticle(article:any):Observable<any>{
    return this.http.put(this.baseUrl+"/api/article/"+article.id,article);
  }

  deleteArticle(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/api/article/"+id);
  }
}
