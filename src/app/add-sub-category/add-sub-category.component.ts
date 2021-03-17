import { DeleteRestoreDialogBoxComponent } from './../delete-restore-dialog-box/delete-restore-dialog-box.component';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

export interface RestoreSubCategoryData {
  name: string;
  code: string;
}

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css']
})

export class AddSubCategoryComponent implements OnInit {
  category: string[];
  selectedOption: string;
  public restoreData: RestoreSubCategoryData[];

  constructor(private productService: ProductService, public dialog: MatDialog) {
    $('.category_nav').css('color', '');
    $('.subcategory_nav').css('color', '#fff');
    $('.product_nav').css('color', '');
   }

  ngOnInit() {
    this.getCategory();

    this.getRestoreSubCategory();
    this.productService.invokeAddRecordsFunction.subscribe((name: string) => {
      this.getRestoreSubCategory();
    });

    if (this.productService.redirectValue !== undefined) {
      this.selectedOption = this.productService.redirectValue;
    }
  }

  getCategory() {
    this.productService.getCategoryNames().subscribe((data: []) => {
      this.category = data;
    });
  }

  getVal(event: any) {
    document.getElementById('file-upload-wrapper').setAttribute('data-text', event.target.value.replace(/.*(\/|\\)/, '').substring(0, 30));
  }

  addSubCategory(name: string, code: string, category: string) {
    const formData = new FormData();
    formData.append('func', 'sub_category');
    formData.append('name', name);
    formData.append('code', code);
    formData.append('category', category);
    this.productService.addRecords(formData).subscribe(data => {
      alert(data);
      location.reload();
    });
  }

  restoreSubCategoryBtn() {
    $('#toggleTag mat-card-actions').hide();
    $('#toggleTag mat-form-field').show();
  }

  getRestoreSubCategory() {
    this.productService.getRestoreRecords('sub_category').subscribe((data: []) => {
      this.restoreData = data;
      if (data.length === 0) {
        $('#toggleTag').remove();
      }
      this.dialog.closeAll();
    });
  }

  restoreConformationBox(event: any) {
    this.productService.recordTo = 'sub_category';
    this.dialog.open(DeleteRestoreDialogBoxComponent, {
      width: '470px'
    });
    this.productService.idCode = event.value;
  }
}
