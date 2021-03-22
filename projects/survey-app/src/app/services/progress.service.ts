import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressComponent } from '../components/progress/progress.component';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
 
  dialogRef?:MatDialogRef<ProgressComponent>;;

  constructor(private dialogService: MatDialog) {
  }

  start() {
    this.dialogRef = this.dialogService.open(ProgressComponent);    
  }

  end(){
    this.dialogRef?.close();
  }
}
