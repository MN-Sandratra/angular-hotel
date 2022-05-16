import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }
  getAllReservation():Observable<any>{
    return this.http.get(this.baseUrl+"/api/reservations");
  }

  getReservationById(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/reservations/"+id);
  }

  createReservation(reservation:Reservation):Observable<any>{
    return this.http.post(this.baseUrl+"/api/reservations/",reservation);
  }

  updateReservation(reservation:any):Observable<any>{
    return this.http.put(this.baseUrl+"/api/reservations/"+reservation.id,reservation);
  }

  deleteReservation(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/api/reservations/"+id);
  }
}
