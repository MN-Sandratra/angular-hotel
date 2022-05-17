import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutputService {

  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }
  getAllOutput():Observable<any>{
    return this.http.get(this.baseUrl+"/api/output");
  }

  getOutputById(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/output/"+id);
  }

  createOutput(output:any):Observable<any>{
    return this.http.post(this.baseUrl+"/api/output/",output);
  }

  updateOutput(output:any):Observable<any>{
    return this.http.put(this.baseUrl+"/api/output/"+output.id,output);
  }

  deleteOutput(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/api/output/"+id);
  }
}
