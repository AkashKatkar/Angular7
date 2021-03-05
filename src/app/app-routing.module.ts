import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AddItemsComponent } from './add-items/add-items.component';

const routes: Routes = [
  {
    path: "index",
    component: IndexComponent
  },
  {
    path: "addItems",
    component: AddItemsComponent
  },
  { path: "", redirectTo: "/index", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
