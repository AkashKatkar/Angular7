import { Component, OnInit } from '@angular/core';
import { ProductService } from './../services/product.service';

@Component({
  selector: 'app-delete-restore-dialog-box',
  templateUrl: './delete-restore-dialog-box.component.html',
  styleUrls: ['./delete-restore-dialog-box.component.css']
})
export class DeleteRestoreDialogBoxComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  restoreRecords() {
    const formData = new FormData();
    if (this.productService.recordTo === 'category') {
      formData.append('func', 'category');
      formData.append('code', this.productService.idCode);
      formData.append('operation', 'restore_records');
    } else if (this.productService.recordTo === 'sub_category') {
      formData.append('func', 'sub_category');
      formData.append('code', this.productService.idCode);
    } else {
      formData.append('func', 'product');
      formData.append('code', this.productService.idCode);
    }
    this.productService.setRestoreRecords(formData).subscribe(data => {
      this.productService.onAddRecordsButtonClick();
      alert(data);
    });
  }

  permanentDeleteRecords() {
    const formData = new FormData();
    if (this.productService.recordTo === 'category') {
      formData.append('func', 'category');
      formData.append('code', this.productService.idCode);
      formData.append('operation', 'permanent_delete_data');
    } else if (this.productService.recordTo === 'sub_category') {
      formData.append('func', 'sub_category');
      formData.append('code', this.productService.idCode);
    } else {
      formData.append('func', 'product');
      formData.append('code', this.productService.idCode);
    }
    this.productService.permanentDeleteRecords(formData).subscribe(data => {
      this.productService.onAddRecordsButtonClick();
      alert(data);
    });
  }
}
