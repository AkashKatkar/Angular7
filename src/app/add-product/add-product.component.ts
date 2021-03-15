import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  subCategory: string[];

  constructor(private productService: ProductService) {
    $('.product_nav').css('color', '#fff');
  }

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.productService.getSubCategoryNames().subscribe((data: []) => {
      this.subCategory = data;
    });
  }

  getVal(event: any) {
    document.getElementById('file-upload-wrapper').setAttribute('data-text', event.target.value.replace(/.*(\/|\\)/, '').substring(0, 30));
  }
}
