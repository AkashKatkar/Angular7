import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ProductComponent } from './product/product.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'index',
    component: CategoryComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'sub-category-component',
    component: SubCategoryComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'product-component',
    component: ProductComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'add-sub-category',
    component: AddSubCategoryComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [ AuthGuard ]
  },
  { path: '', redirectTo: '/index', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
