import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  character: string[];
  selected = '5';
  displayedColumns: string[] = ['id', 'categoryName', 'code', 'action'];
  selectedRows = 5;
  searchVal = '';

  constructor(private productService: ProductService) {
    $('.category_nav').css('color', '#fff');
  }

  ngOnInit() {
    this.getCategory();
  }

  selectRows(event: any) {
    this.selectedRows = event.target.value;
    this.getCategory();
  }

  getCategory() {
    this.productService.getCategory(this.selectedRows, this.searchVal).subscribe((data: []) => {
      this.character = data;
    });
  }

  deleteCategory(getCode: string, getName: string, position: string): void {
    if ($('#delete_category' + position).attr('btn') === 'delete') {
      this.productService.deleteCategory(getCode).subscribe(data => {
        this.character = this.character.filter(u => u !== getCode);
        this.getCategory();
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
      this.productService.editCategoryRecords(
        $('#category_name' + position).text(), $('#category_code' + position).text(), getCode).subscribe(data => {
        this.getCategory();
      });
    }
  }

  searchCategory(event: any) {
    this.searchVal = event.target.value;
    this.getCategory();
  }
}
