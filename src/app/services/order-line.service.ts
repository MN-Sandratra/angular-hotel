import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderLineService {
  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }
  getAllOrderLine():Observable<any>{
    return this.http.get(this.baseUrl+"/api/orderLine");
  }

  getOrderLineById(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/orderLine/"+id);
  }

  createOrderLine(orderLine:any):Observable<any>{
    return this.http.post(this.baseUrl+"/api/orderLine/",orderLine);
  }

  updateOrderLine(orderLine:any):Observable<any>{
    return this.http.put(this.baseUrl+"/api/OrderLine/"+orderLine.id,orderLine);
  }

  deleteOrderLine(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/api/orderLine/"+id);
  }
}
