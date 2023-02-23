import { Client } from '../model/client';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {  first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private readonly API = 'api/clients';

  constructor(private httpClient : HttpClient) { }

  list() {
    return this.httpClient.get<Client[]>(this.API)
    .pipe(first());
  }

  loadById(id: string){
    return this.httpClient.get<Client>(`${this.API}/${id}`);
  }

  save(record: Partial<Client>){
    if(record._id){
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Client>){
    return this.httpClient.post<Client>(this.API, record);
  }

  private update(record: Partial<Client>){
    return this.httpClient.put<Client>(`${this.API}/${record._id}`, record).pipe(first());
  }

  remove(id: string){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

}
