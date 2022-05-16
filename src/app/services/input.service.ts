import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }
  getAllInput():Observable<any>{
    return this.http.get(this.baseUrl+"/api/input");
  }

  getInputById(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/input/"+id);
  }

  createInput(input:any):Observable<any>{
    return this.http.post(this.baseUrl+"/api/input/",input);
  }

  updateInput(input:any):Observable<any>{
    return this.http.put(this.baseUrl+"/api/input/"+input.id,input);
  }

  deleteInput(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/api/input/"+id);
  }
}
