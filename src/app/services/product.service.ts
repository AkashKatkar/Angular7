import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public url = environment.web_api_url_base;
  constructor(private http: HttpClient) { }

  getCategory(selectedRows: number, searchVal: string) {
    return this.http.get(
      this.url + 'getRecords.php?func=category&selectedRows=' + selectedRows + '&searchVal=' + searchVal);
  }

  deleteCategory(code: string) {
    return this.http.delete(
      this.url + 'deleteRecords.php?func=category&operation=delete_record&code=' + code);
  }

  editCategoryRecords(name: string, code: string, oldCode: string) {
    return this.http.get(
      this.url + 'editRecords.php?func=category&categ_name=' + name + '&categ_code=' + code + '&oldCode=' + oldCode);
  }

  getSubCategory(selectedRows: number, searchVal: string) {
    return this.http.get(
      this.url + 'getRecords.php?func=sub_category&selectedRows=' + selectedRows + '&searchVal=' + searchVal);
  }

  deleteSubCategory(code: string) {
    return this.http.delete(
      this.url + 'deleteRecords.php?func=sub_category&code=' + code);
  }

  editSubCategoryRecords(name: string, code: string, parentName: string, oldCode: string) {
    return this.http.get(
      this.url + 'editRecords.php?func=sub_category&categ_name=' + name +
      '&categ_code=' + code + '&oldCode=' + oldCode + '&parentName=' + parentName);
  }

  getProduct(selectedRows: number, searchVal: string) {
    return this.http.get(
      this.url + 'getRecords.php?func=product&selectedRows=' + selectedRows + '&searchVal=' + searchVal);
  }

  deleteProduct(id: string) {
    return this.http.delete(
      this.url + 'deleteRecords.php?func=product&id=' + id);
  }

  editProductRecords(formData: FormData) {
    return this.http.post(this.url + 'editRecords.php', formData);
  }

  getCategoryNames() {
    return this.http.get(this.url + 'getCategoryNames.php');
  }

  getSubCategoryNames() {
    return this.http.get(this.url + 'getSubCategoryNames.php');
  }
}
