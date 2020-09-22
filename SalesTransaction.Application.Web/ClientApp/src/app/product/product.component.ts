import { UtilityService } from './../../core/services/utility.service';
import { ProductService } from './product.service';
import { Component, OnInit } from '@angular/core';
import { MvNewProduct, MvProduct } from './product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from './product-form/product-form.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<MvProduct>;
  productMsg = '';
  selectedProduct: MvNewProduct = <MvNewProduct>{};
  selection = new SelectionModel<MvNewProduct>(false, []);

  constructor(private ps: ProductService,
    public dialog: MatDialog,
    private us: UtilityService) {

  }

  ngOnInit() {

    this.displayedColumns = ['productId', 'name', 'rate', 'quantityStock'];
    this.getProducts();
  }

  getProducts() {

    this.productMsg = '';
    this.ps.getProduct().subscribe((result: any) => {

      if (result && result.data) {

        // this.dataSource = result.data;
        this.dataSource = new MatTableDataSource<MvProduct>(result.data);
      } else {

        // this.dataSource = [];
        this.dataSource = new MatTableDataSource<MvProduct>();
        this.productMsg = 'No Products!';
      }
    });
  }

  addProduct() {

    this.selection.clear();
    this.selectedProduct = <MvNewProduct>{};
    this.openDialog('Add');
  }

  editProduct() {

    this.openDialog('Edit');
  }

  openDialog(action: string) {

    if (action === 'Edit' && !this.selection.hasValue()) {

      this.us.openSnackBar('Please Select A Row to Edit Product!', 'warning');
      return;
    }

    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '250px',
      data: { data: this.selectedProduct, action: action }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.selectedProduct = result;
        this.us.openSnackBar('Product Added Sucessfully!', 'success');
      } else {

        this.us.openSnackBar('Action Cancelled!', 'warning');
      }
    });
  }

  rowClick(e: any, row: MvProduct) {

    this.selectedProduct = { ...row };
    this.selection.toggle(row);
  }
}
