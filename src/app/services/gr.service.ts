import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Variables from '../Variables';

@Injectable({
  providedIn: 'root'
})
export class GrService {

  public url = environment.web_api_url_base;
  constructor(private http: HttpClient) { }

  getRecords() {
    return this.http.get<Variables[]>(this.url + 'getRecords.php');
  }
}
