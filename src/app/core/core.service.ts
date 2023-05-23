import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private _snackBar: MatSnackBar) {}

  // openFromComponent() permette di aggiungere come argomento direttamente un componente invece di un messaggio
  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
    });
  }
}
