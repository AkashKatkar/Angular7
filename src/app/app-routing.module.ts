import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ProductComponent } from './product/product.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  {
    path: 'index',
    component: CategoryComponent
  },
  {
    path: 'sub-category-component',
    component: SubCategoryComponent
  },
  {
    path: 'product-component',
    component: ProductComponent
  },
  {
    path: 'add-category',
    component: AddCategoryComponent
  },
  {
    path: 'add-sub-category',
    component: AddSubCategoryComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent
  },
  { path: '', redirectTo: '/index', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
