import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MouvementApiService {
  readonly mouvementApiUrl = 'http://localhost:58379/api/mouvements';
  constructor(private http: HttpClient) {}
  getAllMouvement(): Observable<any[]> {
    return this.http.get<any>(this.mouvementApiUrl);
  }
  postMouvement(mouvement: any) {
    return this.http.post(this.mouvementApiUrl, mouvement);
  }
  putMouvement(id: number | string, mouvement: any) {
    return this.http.put(this.mouvementApiUrl + `${id}`, mouvement);
  }
  deleteMouvement(id: number | string) {
    return this.http.delete(this.mouvementApiUrl + `${id}`);
  }
}
