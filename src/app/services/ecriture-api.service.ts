import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EcritureApiService {
  readonly ecritureApiUrl = environment.baseUrl + '/api/ecritures';
  constructor(private http: HttpClient) {}
  getAllEcriture(): Observable<any[]> {
    return this.http.get<any>(this.ecritureApiUrl);
  }
  postEcriture(ecriture: any) {
    return this.http.post(this.ecritureApiUrl, ecriture);
  }
  putEcriture(id: number | string, ecriture: any) {
    return this.http.put(this.ecritureApiUrl + `${id}`, ecriture);
  }
  deleteEcriture(id: number | string) {
    return this.http.delete(this.ecritureApiUrl + `${id}`);
  }
}
