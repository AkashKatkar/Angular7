import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  p = 1;
  itemsPerPage = 5;
  character: string[];
  displayedColumns: string[] = ['id', 'categoryName', 'code', 'action'];
  selectedRows = '5';
  searchFilter: string;

  constructor(private productService: ProductService) {
    $('.category_nav').css('color', '#fff');
    $('.subcategory_nav').css('color', '');
    $('.product_nav').css('color', '');
  }

  ngOnInit() {
    this.getCategory();
  }

  selectRows(event: any) {
    this.selectedRows = event.target.value;
    this.itemsPerPage = event.target.value;
    this.getCategory();
  }

  getCategory() {
    const formData = new FormData();
    formData.append('func', 'category');
    this.productService.getRecords(formData).subscribe((data: []) => {
      this.character = data;
    });
  }

  deleteCategory(getCode: string, getName: string, position: string): void {
    if ($('#delete_category' + position).attr('btn') === 'delete') {
      const formData = new FormData();
      formData.append('func', 'category');
      formData.append('operation', 'delete_record');
      formData.append('code', getCode);
      this.productService.deleteRecords(formData).subscribe(data => {
        this.character = this.character.filter(u => u !== getCode);
        this.getCategory();
        alert(data);
      });
    } else {
      $('#edit_category' + position).attr('btn', 'edit');
      $('#delete_category' + position).attr('btn', 'delete');
      $('#category_name' + position).attr('contenteditable', 'false').text(getName);
      $('#category_code' + position).attr('contenteditable', 'false').text(getCode);
      $('#edit_' + position).text('edit');
      $('#delete_' + position).text('delete');
    }
  }

  editCategory(getCode: string, position: string): void {
    if ($('#edit_category' + position).attr('btn') === 'edit') {
      $('#edit_category' + position).attr('btn', 'done');
      $('#delete_category' + position).attr('btn', 'close');
      $('#category_name' + position).attr('contenteditable', 'true');
      $('#category_code' + position).attr('contenteditable', 'true');
      $('#edit_' + position).text('done');
      $('#delete_' + position).text('close');
    } else {
      const formData = new FormData();
      formData.append('func', 'category');
      formData.append('categ_name', $('#category_name' + position).text());
      formData.append('categ_code', $('#category_code' + position).text());
      formData.append('oldCode', getCode);
      this.productService.editRecords(formData).subscribe(data => {
        this.getCategory();
        alert(data);
      });
    }
  }

  redirectAddSubCategory(value: string) {
    this.productService.redirectValue = value;
  }
}
