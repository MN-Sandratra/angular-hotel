import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TypeCompteApiService {
  readonly typecompteApiUrl = environment.baseUrl + '/api/typecomptes';
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
