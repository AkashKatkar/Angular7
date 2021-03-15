import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent implements OnInit {

  constructor(private productService: ProductService) {
    $('.category_nav').css('color', '#fff');
  }

  ngOnInit() { }
}
