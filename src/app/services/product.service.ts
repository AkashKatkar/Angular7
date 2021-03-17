import { environment } from '../../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  idCode: string;
  recordTo: string;
  redirectValue: string;
  public url = environment.web_api_url_base;

  invokeAddRecordsFunction = new EventEmitter();

  onAddRecordsButtonClick() {
    this.invokeAddRecordsFunction.emit();
  }

  getRecords(formData: FormData) {
    return this.http.post(this.url + 'getRecords.php', formData);
  }

  deleteRecords(formData: FormData) {
    return this.http.post(this.url + 'deleteRecords.php', formData);
  }

  editRecords(formData: FormData) {
    return this.http.post(this.url + 'editRecords.php', formData);
  }

  getCategoryNames() {
    return this.http.get(this.url + 'getCategoryNames.php');
  }

  getSubCategoryNames() {
    return this.http.get(this.url + 'getSubCategoryNames.php');
  }

  addRecords(formData: FormData) {
    return this.http.post(this.url + 'addRecords.php', formData);
  }

  getRestoreRecords(func: string) {
    return this.http.get(this.url + 'getRestoreRecords.php?func=' + func);
  }

  setRestoreRecords(formData: FormData) {
    return this.http.post(this.url + 'setRestoreRecords.php', formData);
  }

  permanentDeleteRecords(formData: FormData) {
    return this.http.post(this.url + 'permanentDeleteRecords.php', formData);
  }

  login(formData: FormData) {
    return this.http.post(this.url + 'login.php', formData);
  }

  loginAuth(formData: FormData) {
    return this.http.post(this.url + 'getLoginToken.php', formData);
  }

  logout(formData: FormData) {
    return this.http.post(this.url + 'logout.php', formData);
  }
}
