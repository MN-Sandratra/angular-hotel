import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }
  getAllRoom():Observable<any>{
    return this.http.get(this.baseUrl+"/api/rooms");
  }

  getRoomById(id:any):Observable<any>{
    return this.http.get(this.baseUrl+"/api/rooms/"+id);
  }

  createRoom(room:any):Observable<any>{
    return this.http.post(this.baseUrl+"/api/rooms/",room);
  }

  updateRoom(room:any):Observable<any>{
    return this.http.put(this.baseUrl+"/api/rooms/"+room.id,room);
  }

  deleteRoom(id:any):Observable<any>{
    return this.http.delete(this.baseUrl+"/api/rooms/"+id);
  }
}
