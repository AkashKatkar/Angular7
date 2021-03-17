import { DeleteRestoreDialogBoxComponent } from './../delete-restore-dialog-box/delete-restore-dialog-box.component';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {Md5} from 'md5-typescript';

export interface RestoreCategoryData {
  name: string;
  code: string;
}

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent implements OnInit {
  public restoreData: RestoreCategoryData[];

  constructor(private productService: ProductService, public dialog: MatDialog) {
    $('.category_nav').css('color', '#fff');
    $('.subcategory_nav').css('color', '');
    $('.product_nav').css('color', '');
  }

  ngOnInit() {
    this.getRestoreCategory();

    this.productService.invokeAddRecordsFunction.subscribe((name: string) => {
        this.getRestoreCategory();
    });
   }

  addCategory(name: string, code: string) {
    const formData = new FormData();
    formData.append('func', 'category');
    formData.append('name', name);
    formData.append('code', code);
    this.productService.addRecords(formData).subscribe(data => {
      alert(data);
      location.reload();
    });
  }

  restoreCategoryBtn() {
    $('#toggleTag mat-card-actions').hide();
    $('#toggleTag mat-form-field').show();
  }

  getRestoreCategory() {
    this.productService.getRestoreRecords('category').subscribe((data: []) => {
      this.restoreData = data;
      if (data.length === 0) {
        $('#toggleTag').remove();
      }
      this.dialog.closeAll();
    });
  }

  restoreConformationBox(event: any) {
    this.productService.recordTo = 'category';
    this.dialog.open(DeleteRestoreDialogBoxComponent, {
      width: '470px'
    });
    this.productService.idCode = event.value;
  }
}
