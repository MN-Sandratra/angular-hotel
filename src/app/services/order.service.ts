import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }
  getAllOrder():Observable<any>{
    return this.http.get(this.baseUrl+"/api/order");
  }

  getOrderById(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/order/"+id);
  }

  createOrder(order:any):Observable<any>{
    return this.http.post(this.baseUrl+"/api/order/",order);
  }

  updateOrder(order:any):Observable<any>{
    return this.http.put(this.baseUrl+"/api/order/"+order.id,order);
  }

  deleteOrder(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/api/order/"+id);
  }
}
