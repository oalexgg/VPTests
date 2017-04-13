import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Database } from './database';
/*
  Generated class for the VPApi provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class VPApi {

  constructor(public http: Http, private db: Database) {
  }

  isUpToDate() {
  }

  update() {
  	
  }

  applyUpdate() {

  }

}
