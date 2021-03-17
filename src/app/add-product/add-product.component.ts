import { DeleteRestoreDialogBoxComponent } from './../delete-restore-dialog-box/delete-restore-dialog-box.component';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';


export interface RestoreProductData {
  name: string;
  id: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  subCategory: string[];
  selectedOption: string;
  selectedFile: File;
  public restoreData: RestoreProductData[];

  constructor(private productService: ProductService, public dialog: MatDialog) {
    $('.category_nav').css('color', '');
    $('.subcategory_nav').css('color', '');
    $('.product_nav').css('color', '#fff');
  }

  ngOnInit() {
    this.getSubCategory();

    this.getRestoreProduct();

    this.productService.invokeAddRecordsFunction.subscribe((name: string) => {
        this.getRestoreProduct();
    });

    if (this.productService.redirectValue !== undefined) {
      this.selectedOption = this.productService.redirectValue;
    }
  }

  getSubCategory() {
    this.productService.getSubCategoryNames().subscribe((data: []) => {
      this.subCategory = data;
    });
  }

  getVal(event: any) {
    this.selectedFile = event.target.files[0];
    document.getElementById('file-upload-wrapper').setAttribute('data-text', event.target.value.replace(/.*(\/|\\)/, '').substring(0, 30));
  }

  addProduct(name: string, subCategory: string, price: string) {
    const formData = new FormData();
    formData.append('func', 'product');
    formData.append('name', name);
    formData.append('subCategory', subCategory);
    formData.append('price', price);
    formData.append('image', this.selectedFile);
    this.productService.addRecords(formData).subscribe(data => {
      alert(data);
      location.reload();
    });
  }

  restoreProductBtn() {
    $('#toggleTag mat-card-actions').hide();
    $('#toggleTag mat-form-field').show();
  }

  getRestoreProduct() {
    this.productService.getRestoreRecords('product').subscribe((data: []) => {
      this.restoreData = data;
      if (data.length === 0) {
        $('#toggleTag').remove();
      }
      this.dialog.closeAll();
    });
  }

  restoreConformationBox(event: any) {
    this.productService.recordTo = 'product';
    this.dialog.open(DeleteRestoreDialogBoxComponent, {
      width: '470px'
    });
    this.productService.idCode = event.value;
  }
}
