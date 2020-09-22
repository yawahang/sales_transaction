import { InvoiceService } from './invoice.service';
import { UtilityService } from './../../core/services/utility.service';
import { InvoiceGenerateComponent } from './invoice-generate/invoice-generate.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MvInvoice } from './invoice.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<MvInvoice>;
  invoiceMsg = '';
  selectedInvoice: MvInvoice = <MvInvoice>{};
  selection = new SelectionModel<MvInvoice>(false, []);

  constructor(private is: InvoiceService,
    public dialog: MatDialog,
    private us: UtilityService) {

  }

  ngOnInit() {

    this.displayedColumns = ['invoiceId', 'invoiceNumber', 'customer', 'invoiceAmount'];
    this.getInvoice();
  }

  getInvoice() {

    this.invoiceMsg = '';
    this.is.getInvoice().subscribe((result: any) => {

      if (result && result.data) {

        // this.dataSource = result.data;
        this.dataSource = new MatTableDataSource<MvInvoice>(result.data);
      } else {

        // this.dataSource = [];
        this.dataSource = new MatTableDataSource<MvInvoice>();
        this.invoiceMsg = 'No Invoice!';
      }
    });
  }

  printInvoice() {

    if (this.selection.hasValue()) {

      const dialogRef = this.dialog.open(InvoiceGenerateComponent, {
        width: '800px',
        height: '500px',
        data: this.selectedInvoice
      });

      dialogRef.afterClosed().subscribe(result => {

        if (result === 'print') {

          this.us.openSnackBar('Invoice Printed Sucessfully!', 'success');
        } else {

          this.us.openSnackBar('Action Cancelled!', 'warning');
        }
      });
    } else {

      this.us.openSnackBar('Please Select A Row to Generate Invoice!', 'warning');
    }
  }

  rowClick(e: any, row: MvInvoice) {

    this.selectedInvoice = { ...row };
    this.selection.toggle(row);
  }
}
