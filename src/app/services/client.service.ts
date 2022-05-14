import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}
  getAllClient(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/clients');
  }

  getClientById(id: any): Observable<any> {
    return this.http.get(this.baseUrl + '/api/clients/' + id);
  }

  createClient(client: Client): Observable<any> {
    return this.http.post(this.baseUrl + '/api/clients/', client);
  }

  updateClient(client: any): Observable<any> {
    return this.http.put(
      this.baseUrl + '/api/persons/' + client.person.id,
      client.person
    );
  }

  deleteClient(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + '/api/clients/' + id);
  }
}
