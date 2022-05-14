import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}
  getAllCategory(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/category');
  }

  getCategoryById(id: any): Observable<any> {
    return this.http.get(this.baseUrl + '/api/category/' + id);
  }

  createCategory(cat: Category): Observable<any> {
    return this.http.post(this.baseUrl + '/api/category/', cat);
  }

  updateCategory(cat: any): Observable<any> {
    return this.http.put(this.baseUrl + '/api/category/' + cat.id, cat);
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + '/api/category/' + id);
  }
}
