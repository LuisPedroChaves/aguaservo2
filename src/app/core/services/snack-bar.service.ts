import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { LoadingComponent } from '../components/snackBars/loading/loading.component';
import { SnackBarComponent } from '../components/snackBars/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  loading(duration?: number): MatSnackBarRef<any> {
    const CONFIG: MatSnackBarConfig = {
      duration: duration ? duration : 0,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    };

    return this._snackBar.openFromComponent(LoadingComponent, CONFIG);
  }

  show(
    type: string = 'SUCCESS',
    message: string,
    duration?: number
  ): MatSnackBarRef<any> {
    const CONFIG: MatSnackBarConfig = {
      duration: duration ? duration : 0,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: {
        message,
        type,
      },
    };

    return this._snackBar.openFromComponent(SnackBarComponent, CONFIG);
  }
}
