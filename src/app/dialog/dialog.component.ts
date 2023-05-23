import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      employee: any;
      message: string;
      action: string;
      type: string;
    }
  ) {}

  employee: any = {};
  message = '';
  action = '';
  type = '';

  ngOnInit() {
    this.employee = this.data.employee;
    this.message = this.data.message;
    this.action = this.data.action;
    this.type = this.data.type;
    console.log(this.data);
  }
}
