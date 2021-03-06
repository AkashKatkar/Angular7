import { Component, OnInit } from '@angular/core';

export interface Product {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})

export class AddItemsComponent implements OnInit {
  selectedValue: string;

  products: Product[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor() { }

  ngOnInit() {
  }

  getVal(val: { target: { value: string; }; }) {
    document.getElementById('file-upload-wrapper').setAttribute('data-text', val.target.value.replace(/.*(\/|\\)/, '').substring(0, 30));
  }
}
