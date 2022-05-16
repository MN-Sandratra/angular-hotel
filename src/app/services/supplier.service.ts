import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(private http:HttpClient) { }
  private baseUrl = "http://localhost:3030";
  
  deleteSupplier(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/api/supplier/"+id);
  }
  
  createSupplier(supplier:any):Observable<any>{
    return this.http.post(this.baseUrl+"/api/supplier/",supplier);
  }
  updateSupplier(supplier:any):Observable<any>{
    return this.http.put(this.baseUrl+"/api/supplier/"+supplier.id,supplier);
  }
  getSupplierById(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/supplier/"+id);
  }
  getAllSupplier():Observable<any>{
    return this.http.get(this.baseUrl+"/api/supplier");
  }

}
