import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})

export class SubCategoryComponent implements OnInit {
  p = 1;
  itemsPerPage = 5;
  searchFilter: string;
  character: string[];
  displayedColumns: string[] = ['id', 'subCategoryName', 'code', 'categoryName', 'action'];
  selectedRows = '5';
  searchVal = '';

  constructor(private productService: ProductService) {
    $('.category_nav').css('color', '');
    $('.subcategory_nav').css('color', '#fff');
    $('.product_nav').css('color', '');
   }

  ngOnInit() {
    this.getSubCategory();
  }

  selectRows(event: any) {
    this.selectedRows = event.target.value;
    this.itemsPerPage = event.target.value;
    this.getSubCategory();
  }

  getSubCategory() {
    const formData = new FormData();
    formData.append('func', 'sub_category');
    formData.append('searchVal', this.searchVal);
    this.productService.getRecords(formData).subscribe((data: []) => {
      this.character = data;
    });
  }

  deleteSubCategory(getCode: string, getName: string, getParentName: string, position: string): void {
    if ($('#delete_sub_category' + position).attr('btn') === 'delete') {
      const formData = new FormData();
      formData.append('func', 'sub_category');
      formData.append('code', getCode);
      this.productService.deleteRecords(formData).subscribe(data => {
        this.character = this.character.filter(u => u !== getCode);
        this.getSubCategory();
        alert(data);
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
      const formData = new FormData();
      formData.append('func', 'sub_category');
      formData.append('categ_name', $('#sub_category_name' + position).text().trim());
      formData.append('categ_code', $('#sub_category_code' + position).text().trim());
      formData.append('parentName', $('.parentCategoryName' + position).val().toString());
      formData.append('oldCode', getCode);
      this.productService.editRecords(formData).subscribe(data => {
        this.getSubCategory();
        alert(data);
      });
    }
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

  redirectAddProduct(value: string) {
    this.productService.redirectValue = value;
  }
}
