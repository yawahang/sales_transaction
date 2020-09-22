import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MvInvoice } from '../invoice.model';

@Component({
  selector: 'app-invoice-generate',
  templateUrl: './invoice-generate.component.html',
  styleUrls: ['./invoice-generate.component.scss']
})
export class InvoiceGenerateComponent implements OnInit {

  selectedInvoice: MvInvoice = <MvInvoice>{};
  allTotal = 0;

  constructor(
    public dialogRef: MatDialogRef<InvoiceGenerateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    dialogRef.disableClose = true;
    this.selectedInvoice = data || {};

    this.selectedInvoice.invoiceDetail.forEach(d => {
      this.allTotal += d.total;
    });
  }

  cancelClick() {

    this.dialogRef.close('close');
  }

  printInvoice() {

    this.dialogRef.close('print');
  }

  ngOnInit() {
  }

}
