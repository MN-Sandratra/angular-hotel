import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {

  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }
  getAllReception():Observable<any>{
    return this.http.get(this.baseUrl+"/api/reception");
  }

  getReceptionById(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/reception/"+id);
  }

  createReception(reception:any):Observable<any>{
    return this.http.post(this.baseUrl+"/api/reception/",reception);
  }

  updateReception(reception:any):Observable<any>{
    return this.http.put(this.baseUrl+"/api/Reception/"+reception.id,reception);
  }

  deleteReception(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/api/reception/"+id);
  }
}
