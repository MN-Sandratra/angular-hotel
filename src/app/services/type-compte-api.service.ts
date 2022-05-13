import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TypeCompteApiService {
  readonly typecompteApiUrl = 'http://localhost:58379/api/typecomptes';
  constructor(private http: HttpClient) {}
  getAllTypeCompte(): Observable<any[]> {
    return this.http.get<any>(this.typecompteApiUrl);
  }
  postTypeCompte(typecompte: any) {
    return this.http.post(this.typecompteApiUrl, typecompte);
  }
  putTypeCompte(id: number | string, typecompte: any) {
    return this.http.put(this.typecompteApiUrl + `${id}`, typecompte);
  }
  deleteTypeCompte(id: number | string) {
    return this.http.delete(this.typecompteApiUrl + `${id}`);
  }
}
