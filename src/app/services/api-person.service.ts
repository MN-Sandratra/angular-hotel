import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class ApiPersonService {
  private baseUrl = "http://localhost:3030";

  constructor(private http:HttpClient) { }
  getAllPerson():Observable<any>{
    return this.http.get(this.baseUrl+"/api/persons");
  }

  getPersonById(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/persons/"+id);
  }

  createPerson(pers:Person):Observable<any>{
    return this.http.post(this.baseUrl+"/api/persons/",pers);
  }

  updatePerson(pers:any):Observable<any>{
    return this.http.put(this.baseUrl+"/api/persons/"+pers.id,pers);
  }

  deletePerson(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/api/persons/"+id);
  }
}
