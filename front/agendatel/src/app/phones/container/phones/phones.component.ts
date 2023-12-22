import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Phone } from '../../model/phone';
import { PhonesService } from '../../services/phones.service';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss']
})
export class PhonesComponent implements OnInit {

  phones$: Observable<Phone[]> | null = null;

  isOnlyFavorite: boolean = false;
  phonesFavorites: Array<Phone[]> = [];

  constructor(
    private phonesService: PhonesService,
    public dialog: MatDialog,
    public toogle: MatSlideToggleModule,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    this.phones$ = this.phonesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar contatos.')
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): (void) {
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(phone: Phone){
    this.router.navigate(['edit', phone._id], {relativeTo: this.route});
  }

  onFavorite(phone: Phone){
    this.phonesService.favorite(phone._id).subscribe(
      () => {
        this.refresh();
      },
      () => this.onError('Erro ao favoritar contato')
    );
  }

  onRemove(phone: Phone) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover este contato?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.phonesService.remove(phone._id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Removido com sucesso!', 'X', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            }
            );
          },
          () => this.onError('Erro ao remover contato')
        );
      }
    });
  }

  onClick(phone: Phone){
    console.log('linha clicada',phone);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Detalhes do contato'
    });
  }

  onlyFavorite(){
    console.log('apenas favoritos');
    this.isOnlyFavorite = !this.isOnlyFavorite;
    this.phones$?.source?.forEach((element) => {
      if(element.isFavorite === this.isOnlyFavorite)  this.phonesFavorites.push(element);
    });
    console.log(this.phonesFavorites);
  }

}
