import { Injectable, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  private dataCenterUrl = "https://oh-no-saurs.firebaseio.com/";
  private soursUrl = "/items";
  private methodUrl = ".json";
  constructor(private http: Http) {}

  allSaurs() {
    return this.http.get(this.dataCenterUrl + this.soursUrl + this.methodUrl).map(
      (res) => res.json()
    );
  }

}
