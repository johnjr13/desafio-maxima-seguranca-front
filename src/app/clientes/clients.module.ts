import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './containers/clientes/clients.component';
import { SharedModule } from '../shared/shared.module';
import { ClientFormComponent } from './containers/client-form/client-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientsListComponent } from './components/clients-list/clients-list.component';




@NgModule({
  declarations: [
    ClientsComponent,
    ClientFormComponent,
    ClientsListComponent,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ClientsModule { }
