import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionModalComponent } from './confirmacion-modal/confirmacion-modal.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { Observable } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  constructor(private dialog: MatDialog, private overlay: Overlay) {}

  public mostrarError(mensaje: string) {
    this.dialog.open(ErrorModalComponent, {
      width: '300px',
      data: { message: mensaje },
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
  }

  public mostrarConfirmacion(message: string, title?: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmacionModalComponent, {
      width: '350px',
      data: { message, title },
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
    return dialogRef.afterClosed();
  }
}
