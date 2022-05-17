import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClasseCompteApiService {
  readonly classecompteApiUrl = environment.baseUrl + '/api/classecomptes';
  constructor(private http: HttpClient) {}
  getAllClasseCompte(): Observable<any[]> {
    return this.http.get<any>(this.classecompteApiUrl);
  }
  postClasseCompte(classecompte: any) {
    return this.http.post(this.classecompteApiUrl, classecompte);
  }
  putClasseCompte(id: number | string, classecompte: any) {
    return this.http.put(this.classecompteApiUrl + `${id}`, classecompte);
  }
  deleteClasseCompte(id: number | string) {
    return this.http.delete(this.classecompteApiUrl + `${id}`);
  }
}
