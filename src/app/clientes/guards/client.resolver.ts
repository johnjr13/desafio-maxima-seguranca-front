import { Client } from './../model/client';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClientsService } from '../services/clients.service';

@Injectable({
  providedIn: 'root'
})
export class ClientResolver implements Resolve<Client> {

  constructor(private service: ClientsService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Client> {

    if(route.params && route.params['id']){
      return this.service.loadById(route.params['id']);
    }
    return of({_id: '', name: '', category: ''});
  }
}
