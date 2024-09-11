import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-message',
  standalone: true,
  imports: [MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,],
  templateUrl: './modal-message.component.html',
  styleUrl: './modal-message.component.scss'
})
export class ModalMessageComponent {
  data!:any;

  constructor(public dialogRef: MatDialogRef<ModalMessageComponent>){}

  ngOnInit(): void {
    console.log(this.data);  
    setTimeout(() => {
      this.dialogRef.close();
    }, 3000);  
  }
}

