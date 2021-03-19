import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  p = 1;
  itemsPerPage = 5;
  searchFilter: string;
  character: string[];
  displayedColumns: string[] = ['id', 'productName', 'productCategory', 'productPrice', 'productImage', 'action'];
  selectedRows = '5';
  searchVal = '';
  selectedImage: File = File[''];

  constructor(private productService: ProductService) {
    $('.category_nav').css('color', '');
    $('.subcategory_nav').css('color', '');
    $('.product_nav').css('color', '#fff');
  }

  ngOnInit() {
    this.getProduct();
  }

  selectRows(event: any) {
    this.selectedRows = event.target.value;
    this.itemsPerPage = event.target.value;
    this.getProduct();
  }

  getProduct() {
    const formData = new FormData();
    formData.append('func', 'product');
    formData.append('searchVal', this.searchVal);
    this.productService.getRecords(formData).subscribe((data: []) => {
      this.character = data;
    });
  }

  deleteProduct(getId: string, position: string): void {
    if ($('#delete_product' + position).attr('btn') === 'delete') {
      const formData = new FormData();
      formData.append('func', 'product');
      formData.append('id', getId);
      this.productService.deleteRecords(formData).subscribe(data => {
        this.character = this.character.filter(u => u !== getId);
        this.getProduct();
        alert(data);
      });
    } else {
      this.getProduct();
    }
  }

  editProduct(getId: string, categoryName: string, image: string, position: string): void {
    if ($('#edit_product' + position).attr('btn') === 'edit') {
      $('#edit_product' + position).attr('btn', 'done');
      $('#delete_product' + position).attr('btn', 'close');
      $('#product_name' + position).attr('contenteditable', 'true');
      $('#product_price' + position).attr('contenteditable', 'true');
      $('.replaceVal' + position).replaceWith(
                '<select class="parentSubCategoryName' + position + '" style="border:1px solid rgba(0,0,0,0.5);"></select>');
      $('#edit_' + position).text('done');
      $('#delete_' + position).text('close');
      $('#new_product_image' + position).css('display', 'block');
      $('#product_image' + position).css('display', 'none');
      this.getSubCategoryNames(position, categoryName);
    } else {
      const formData = new FormData();
      formData.append('func', 'product');
      formData.append('prod_name', $('#product_name' + position).text().trim());
      formData.append('prod_price', $('#product_price' + position).text().trim());
      formData.append('id', getId);
      formData.append('prodCategory', $('.parentSubCategoryName' + position).val().toString());
      formData.append('productImageName', image);
      formData.append('productImage' + getId, this.selectedImage);
      this.productService.editRecords(formData).subscribe(data => {
        this.getProduct();
        alert(data);
      });
    }
  }

  getSubCategoryNames(position: string, categoryName: string) {
    this.productService.getSubCategoryNames().subscribe((data: string) => {
      for (let i = 0; i < (data.length); i++) {
        if (categoryName === data[i]) {
          $('<option selected></option>').text(data[i].trim()).attr('value', data[i].trim()).appendTo('.parentSubCategoryName' + position);
        } else {
          $('<option></option>').text(data[i].trim()).attr('value', data[i].trim()).appendTo('.parentSubCategoryName' + position);
        }
      }
    });
  }

  changeImage(event) {
    $('.file-upload-wrapper').attr('data-text', event.target.value.replace(/.*(\/|\\)/, '').substring(0, 30));
    this.selectedImage = event.target.files[0];
  }
}
