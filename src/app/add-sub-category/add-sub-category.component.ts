import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css']
})
export class AddSubCategoryComponent implements OnInit {
  category: string[];

  constructor(private productService: ProductService) {
    $('.subcategory_nav').css('color', '#fff');
   }

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.productService.getCategoryNames().subscribe((data: []) => {
      this.category = data;
    });
  }

  getVal(event: any) {
    document.getElementById('file-upload-wrapper').setAttribute('data-text', event.target.value.replace(/.*(\/|\\)/, '').substring(0, 30));
  }
}
