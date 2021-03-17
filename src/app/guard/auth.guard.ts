import { ProductService } from './../services/product.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {

  constructor(private productService: ProductService, private router: Router) {}

  canActivate(): boolean {
    const formData = new FormData();
    if (localStorage.getItem('userid') != null) {
      formData.append('id', localStorage.getItem('userid'));
      this.productService.loginAuth(formData).subscribe(data => {
        if (data === 'logout' || data === '0') {
          this.router.navigate(['/login']);
          $('mat-nav-list a').css('color', '');
        }
      });
      return true;
    } else {
      this.router.navigate(['/login']);
      $('mat-nav-list a').css('color', '');
    }
  }
}
