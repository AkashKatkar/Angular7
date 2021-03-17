import { Md5 } from 'md5-typescript';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    const formData = new FormData();
    if (localStorage.getItem('userid') != null) {
      formData.append('id', localStorage.getItem('userid'));
      this.productService.loginAuth(formData).subscribe(data => {
        if (data !== 'logout' && data !== '0') {
          this.router.navigate(['/index']);
        }
      });
    }
  }

  login(userid: string, password: string) {
    if (userid !== '' && password !== '') {
      const formData = new FormData();
      formData.append('id', userid);
      formData.append('password', password);
      this.productService.login(formData).subscribe(data => {
        if (data === 'yes') {
          this.router.navigate(['/index']);
          localStorage.setItem('userid', userid);
        } else {
          alert(data);
        }
      });
    } else {
      alert('Fill up all credential');
    }
    $('.category_nav').css('color', '');
    $('.subcategory_nav').css('color', '');
    $('.product_nav').css('color', '');
  }
}
