import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  character: string[];
  selected = '5';
  displayedColumns: string[] = ['id', 'subCategoryName', 'code', 'categoryName', 'action'];
  selectedRows = 5;
  searchVal = '';

  constructor(private productService: ProductService) {
    $('.subcategory_nav').css('color', '#fff');
   }

  ngOnInit() {
    this.getSubCategory();
  }

  selectRows(event: any) {
    this.selectedRows = event.target.value;
    this.getSubCategory();
  }

  getSubCategory() {
    this.productService.getSubCategory(this.selectedRows, this.searchVal).subscribe((data: []) => {
      this.character = data;
    });
  }

  deleteSubCategory(getCode: string, getName: string, getParentName: string, position: string): void {
    if ($('#delete_sub_category' + position).attr('btn') === 'delete') {
      this.productService.deleteCategory(getCode).subscribe(data => {
        this.character = this.character.filter(u => u !== getCode);
        this.getSubCategory();
      });
    } else {
      this.getSubCategory();
    }
  }

  editSubCategory(getCode: string, categoryName: string, position: string): void {
    if ($('#edit_sub_category' + position).attr('btn') === 'edit') {
      $('#edit_sub_category' + position).attr('btn', 'done');
      $('#delete_sub_category' + position).attr('btn', 'close');
      $('#sub_category_name' + position).attr('contenteditable', 'true');
      $('#sub_category_code' + position).attr('contenteditable', 'true');
      $('.replaceVal' + position).replaceWith(
                '<select class="parentCategoryName' + position + '" style="border:1px solid rgba(0,0,0,0.5);"></select>');
      $('#edit_' + position).text('done');
      $('#delete_' + position).text('close');
      this.getCategoryNames(position, categoryName);
    } else {
      console.log($('.parentCategoryName' + position).val());
      this.productService.editSubCategoryRecords($('#sub_category_name' + position).text().trim(),
        $('#sub_category_code' + position).text().trim(), $('.parentCategoryName' + position).val().toString(), getCode).subscribe(data => {
        this.getSubCategory();
      });
    }
  }

  searchSubCategory(event: any) {
    this.searchVal = event.target.value;
    this.getSubCategory();
  }

  getCategoryNames(position: string, categoryName: string) {
    this.productService.getCategoryNames().subscribe((data: string) => {
      for (let i = 0; i < (data.length); i++) {
        if (categoryName === data[i]) {
          $('<option selected></option>').text(data[i].trim()).attr('value', data[i].trim()).appendTo('.parentCategoryName' + position);
        } else {
            $('<option></option>').text(data[i].trim()).attr('value', data[i].trim()).appendTo('.parentCategoryName' + position);
        }
      }
    });
  }
}
