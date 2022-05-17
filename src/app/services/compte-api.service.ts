import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompteApiService {
  readonly compteApiUrl = environment.baseUrl + '/api/comptes';
  constructor(private http: HttpClient) {}
  getAllCompte(): Observable<any[]> {
    return this.http.get<any>(this.compteApiUrl);
  }
  postCompte(compte: any) {
    return this.http.post(this.compteApiUrl, compte);
  }
  putCompte(id: number | string, compte: any) {
    return this.http.put(this.compteApiUrl + `${id}`, compte);
  }
  deleteCompte(id: number | string) {
    return this.http.delete(this.compteApiUrl + `${id}`);
  }
}
