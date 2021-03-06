import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  categoryNav() {
    $('.product_nav').css('color', 'rgba(255, 255, 255, 0.6)');
    $('.subcategory_nav').css('color', 'rgba(255, 255, 255, 0.6)');
    $('.category_nav').css('color', '#fff');
  }

  subCategoryNav() {
    $('.product_nav').css('color', 'rgba(255, 255, 255, 0.6)');
    $('.category_nav').css('color', 'rgba(255, 255, 255, 0.6)');
    $('.subcategory_nav').css('color', '#fff');
  }

  productNav() {
    $('.category_nav').css('color', 'rgba(255, 255, 255, 0.6)');
    $('.subcategory_nav').css('color', 'rgba(255, 255, 255, 0.6)');
    $('.product_nav').css('color', '#fff');
  }
}
