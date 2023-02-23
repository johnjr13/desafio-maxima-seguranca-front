import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { Client } from './../../model/client';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ClientsService } from '../../services/clients.service';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {

  clients$: Observable<Client[]> | null = null;

  displayedColumns = ['name', 'cpf', 'idade', 'actions'];


  constructor(
    private clientsService: ClientsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {
      this.refresh();
  }

  refresh() {
    this.clients$ = this.clientsService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar os dados!')
        return of([])
      })
    );
  }

  onError (errorMsg: string){
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {}

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
}

  onEdit(client: Client) {
    this.router.navigate(['edit', client._id], {relativeTo: this.route});
}

  onRemove(client: Client){

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse cliente?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.refresh();
        this.clientsService.remove(client._id).subscribe(() =>{
          this.snackBar.open('Cliente removido com sucesso!','', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          })
        },
        () => this.onError('Erro ao tentar remover cliente!')
        );
      }
    });
}
}
