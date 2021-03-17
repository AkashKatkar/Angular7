import { Router } from '@angular/router';
import { ProductService } from './services/product.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerceWebsite';

  constructor(private productService: ProductService, private router: Router) {}

  logout() {
    const formData = new FormData();
    formData.append('id', localStorage.getItem('userid'));
    this.productService.logout(formData).subscribe(data => {
      localStorage.removeItem('userid');
    });
    this.router.navigate(['/login']);
    $('mat-nav-list a').css('color', '');
  }
}
